import { AuthApi } from "../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../domain/admin/product/product-api";
import { AdminInventoryApi } from "../../../domain/admin/inventory/inventory-api";
import { CartApi } from "../../../domain/cart/cart-api";
import { CheckoutOrdersApi } from "../../../domain/checkoutOrders/checkout-orders-api";
import {
  CARD_NUMBERS,
  OrderFactory,
} from "../../../domain/checkoutOrders/factories/order-factory";
import { OrderScenario } from "../../../domain/checkoutOrders/order-scenarios";
import { expectApiError } from "../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../shared/request-options";
import { PRICING } from "../../../fixtures/entities/pricing";
import { NON_EXISTENT_ID } from "../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../fixtures/users/system-accounts";

// npx jest src/tests/checkoutOrders/actions/checkout-orders-actions.spec.ts
describe("Checkout and orders - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  const sessions = () => ({ admin: asAdmin, customer: asCustomer });
  const createdIds: number[] = [];

  /** Creates a product priced at `price` and puts `quantity` units in the customer's cart. */
  const cartWith = async (price: number, quantity = 1, stock = 10) => {
    const product = await OrderScenario.createProduct(asAdmin, {
      price,
      stock,
    });
    createdIds.push(product.id);
    await OrderScenario.fillCart(asCustomer, product, quantity);
    return product;
  };

  const placeOrder = async (
    options: Parameters<typeof OrderScenario.placeOrder>[1] = {},
  ) => {
    const placed = await OrderScenario.placeOrder(sessions(), options);
    createdIds.push(placed.product.id);
    return placed;
  };

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  afterAll(async () => {
    await CartApi.clear(asCustomer);
    await Promise.all(
      createdIds.map((id) => AdminProductApi.delete(id, asAdmin)),
    );
  });

  describe("POST /checkout/quote", () => {
    it("returns 200 adding the fixed shipping to a subtotal up to the free shipping threshold", async () => {
      await cartWith(50, 2);

      const response = await CheckoutOrdersApi.quote({}, asCustomer);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        totalItems: 2,
        subtotal: 100,
        discount: 0,
        shipping: PRICING.SHIPPING_FEE,
        total: 100 + PRICING.SHIPPING_FEE,
        couponCode: null,
      });
    });

    it("gives free shipping when the subtotal is above the threshold", async () => {
      await cartWith(PRICING.FREE_SHIPPING_THRESHOLD + 0.01);

      const response = await CheckoutOrdersApi.quote({}, asCustomer);

      expect(response.status).toBe(200);
      expect(response.data.shipping).toBe(0);
    });

    it("keeps the shipping fee when the subtotal equals the threshold", async () => {
      await cartWith(PRICING.FREE_SHIPPING_THRESHOLD);

      const response = await CheckoutOrdersApi.quote({}, asCustomer);

      expect(response.data.shipping).toBe(PRICING.SHIPPING_FEE);
    });

    it("applies 10% off with the PROMO10 coupon", async () => {
      await cartWith(100);

      const response = await CheckoutOrdersApi.quote(
        { couponCode: PRICING.COUPONS.PERCENT_OFF },
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        discount: 10,
        shipping: PRICING.SHIPPING_FEE,
        total: 100 - 10 + PRICING.SHIPPING_FEE,
        couponCode: "PROMO10",
      });
    });

    it("removes the shipping with the FRETEGRATIS coupon and ignores the coupon case", async () => {
      await cartWith(100);

      const response = await CheckoutOrdersApi.quote(
        { couponCode: "fretegratis" },
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        shipping: 0,
        total: 100,
        couponCode: "FRETEGRATIS",
      });
    });

    it("returns 400 VALIDATION_ERROR for a coupon longer than 30 characters", async () => {
      await cartWith(100);

      expectApiError(
        await CheckoutOrdersApi.quote(
          { couponCode: "X".repeat(31) },
          asCustomer,
        ),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CheckoutOrdersApi.quote({}, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CheckoutOrdersApi.quote({}, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 422 CART_EMPTY when the cart has no items", async () => {
      await CartApi.clear(asCustomer);

      expectApiError(
        await CheckoutOrdersApi.quote({}, asCustomer),
        422,
        "CART_EMPTY",
      );
    });

    it("returns 422 INVALID_COUPON for an unknown coupon", async () => {
      await cartWith(100);

      expectApiError(
        await CheckoutOrdersApi.quote(
          { couponCode: PRICING.INVALID_COUPON },
          asCustomer,
        ),
        422,
        "INVALID_COUPON",
      );
    });
  });

  describe("POST /orders", () => {
    it("returns 201 with a PAID order, empties the cart and decrements the stock", async () => {
      const product = await cartWith(50, 2, 10);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create(),
        asCustomer,
      );

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        status: "PAID",
        subtotal: 100,
        shipping: PRICING.SHIPPING_FEE,
        total: 100 + PRICING.SHIPPING_FEE,
        paymentMethod: "PIX",
        cardLast4: null,
      });
      expect(response.data.items).toEqual([
        expect.objectContaining({
          productId: product.id,
          quantity: 2,
          price: 50,
          subtotal: 100,
        }),
      ]);
      expect((await CartApi.get(asCustomer)).data.items).toHaveLength(0);
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(8);
    });

    it("stores the last 4 digits of an approved credit card", async () => {
      await cartWith(50);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create({ payment: OrderFactory.card() }),
        asCustomer,
      );

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        paymentMethod: "CREDIT_CARD",
        cardLast4: "4242",
      });
    });

    it("accepts BOLETO and applies the coupon to the order", async () => {
      await cartWith(100);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create({
          payment: OrderFactory.boleto(),
          couponCode: PRICING.COUPONS.PERCENT_OFF,
        }),
        asCustomer,
      );

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        paymentMethod: "BOLETO",
        discount: 10,
        couponCode: "PROMO10",
      });
    });

    it.each([
      ["a missing address", { address: undefined }],
      ["a missing payment", { payment: undefined }],
      [
        "an invalid ZIP code",
        { address: OrderFactory.address({ zip: "123" }) },
      ],
      [
        "a state with more than 2 letters",
        { address: OrderFactory.address({ state: "SPX" }) },
      ],
      [
        "a street shorter than 2 characters",
        { address: OrderFactory.address({ street: "R" }) },
      ],
      ["an unknown payment method", { payment: { method: "CASH" } }],
      ["a credit card without number", { payment: { method: "CREDIT_CARD" } }],
      [
        "a card number with fewer than 13 digits",
        { payment: OrderFactory.card("4242") },
      ],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, override) => {
      await cartWith(50);

      const response = await CheckoutOrdersApi.createOrder(
        { ...OrderFactory.create(), ...override },
        asCustomer,
      );

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CheckoutOrdersApi.createOrder(OrderFactory.create(), NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CheckoutOrdersApi.createOrder(OrderFactory.create(), asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 409 OUT_OF_STOCK and changes nothing when the stock dropped after the item was added", async () => {
      const product = await cartWith(50, 2, 10);
      await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ADJUSTMENT", quantity: 1, reason: "Estoque reduzido" },
        asAdmin,
      );

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create(),
        asCustomer,
      );

      expectApiError(response, 409, "OUT_OF_STOCK");
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(1);
      expect((await CartApi.get(asCustomer)).data.items).toHaveLength(1);
    });

    it("returns 422 CART_EMPTY when the cart has no items", async () => {
      await CartApi.clear(asCustomer);

      expectApiError(
        await CheckoutOrdersApi.createOrder(OrderFactory.create(), asCustomer),
        422,
        "CART_EMPTY",
      );
    });

    it("returns 422 INVALID_COUPON for an unknown coupon", async () => {
      await cartWith(50);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create({ couponCode: PRICING.INVALID_COUPON }),
        asCustomer,
      );

      expectApiError(response, 422, "INVALID_COUPON");
    });

    it("returns 422 PAYMENT_DECLINED for a declined card and keeps the stock", async () => {
      const product = await cartWith(50, 1, 10);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create({
          payment: OrderFactory.card(CARD_NUMBERS.DECLINED),
        }),
        asCustomer,
      );

      expectApiError(response, 422, "PAYMENT_DECLINED");
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(10);
    });

    it("returns 503 PAYMENT_UNAVAILABLE when the payment gateway is down", async () => {
      await cartWith(50);

      const response = await CheckoutOrdersApi.createOrder(
        OrderFactory.create({
          payment: OrderFactory.card(CARD_NUMBERS.GATEWAY_UNAVAILABLE),
        }),
        asCustomer,
      );

      expectApiError(response, 503, "PAYMENT_UNAVAILABLE");
    });
  });

  describe("GET /orders", () => {
    it("returns 200 with only the orders of the logged customer", async () => {
      const { order } = await placeOrder();

      const response = await CheckoutOrdersApi.listOrders(
        { pageSize: 100 },
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.map((o) => o.id)).toContain(order.id);
      expect(response.data.data.every((o) => o.userId === order.userId)).toBe(
        true,
      );
    });

    it("filters by status", async () => {
      const { order } = await placeOrder();
      await CheckoutOrdersApi.cancelOrder(order.id, asCustomer);

      const response = await CheckoutOrdersApi.listOrders(
        { status: "CANCELLED", pageSize: 100 },
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.map((o) => o.id)).toContain(order.id);
      expect(response.data.data.every((o) => o.status === "CANCELLED")).toBe(
        true,
      );
    });

    it.each([
      ["an unknown status", { status: "SHIPPED" }],
      ["page 0", { page: 0 }],
      ["pageSize above 100", { pageSize: 101 }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, query) => {
      expectApiError(
        await CheckoutOrdersApi.listOrders(query, asCustomer),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CheckoutOrdersApi.listOrders({}, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CheckoutOrdersApi.listOrders({}, asAdmin),
        403,
        "FORBIDDEN",
      );
    });
  });

  describe("GET /orders/{id}", () => {
    it("returns 200 with the order", async () => {
      const { order } = await placeOrder();

      const response = await CheckoutOrdersApi.getOrder(order.id, asCustomer);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({ id: order.id, status: "PAID" });
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CheckoutOrdersApi.getOrder(1, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CheckoutOrdersApi.getOrder(1, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 ORDER_NOT_FOUND for an unknown order", async () => {
      expectApiError(
        await CheckoutOrdersApi.getOrder(NON_EXISTENT_ID, asCustomer),
        404,
        "ORDER_NOT_FOUND",
      );
    });
  });

  describe("POST /orders/{id}/cancel", () => {
    it("returns 200 with a CANCELLED order and returns the stock", async () => {
      const { order, product } = await placeOrder({ quantity: 3 });
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(7);

      const response = await CheckoutOrdersApi.cancelOrder(
        order.id,
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data.status).toBe("CANCELLED");
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(10);
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CheckoutOrdersApi.cancelOrder(1, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CheckoutOrdersApi.cancelOrder(1, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 ORDER_NOT_FOUND for an unknown order", async () => {
      expectApiError(
        await CheckoutOrdersApi.cancelOrder(NON_EXISTENT_ID, asCustomer),
        404,
        "ORDER_NOT_FOUND",
      );
    });

    it("returns 409 INVALID_ORDER_STATE when the order is already cancelled", async () => {
      const { order } = await placeOrder();
      await CheckoutOrdersApi.cancelOrder(order.id, asCustomer);

      expectApiError(
        await CheckoutOrdersApi.cancelOrder(order.id, asCustomer),
        409,
        "INVALID_ORDER_STATE",
      );
    });
  });
});

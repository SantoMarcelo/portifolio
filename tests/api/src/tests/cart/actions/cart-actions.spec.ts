import { AuthApi } from "../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../domain/admin/product/product-api";
import { ProductType } from "../../../domain/admin/product/product-types";
import { CartApi } from "../../../domain/cart/cart-api";
import { OrderScenario } from "../../../domain/checkoutOrders/order-scenarios";
import { expectApiError } from "../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../shared/request-options";
import {
  NON_EXISTENT_ID,
  SEED_PRODUCTS,
} from "../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../fixtures/users/system-accounts";

// npx jest src/tests/cart/actions/cart-actions.spec.ts
describe("Cart - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  const createdIds: number[] = [];

  const newProduct = async (stock = 10) => {
    const product = await OrderScenario.createProduct(asAdmin, { stock });
    createdIds.push(product.id);
    return product;
  };

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  beforeEach(async () => {
    await CartApi.clear(asCustomer);
  });

  afterAll(async () => {
    await CartApi.clear(asCustomer);
    await Promise.all(
      createdIds.map((id) => AdminProductApi.delete(id, asAdmin)),
    );
  });

  describe("GET /cart", () => {
    it("returns 200 with an empty cart", async () => {
      const response = await CartApi.get(asCustomer);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        items: [],
        totalItems: 0,
        total: 0,
      });
    });

    it("returns 200 with the items and totals of the cart", async () => {
      const product = await newProduct();
      await CartApi.addItem({ productId: product.id, quantity: 3 }, asCustomer);

      const response = await CartApi.get(asCustomer);

      expect(response.status).toBe(200);
      expect(response.data.totalItems).toBe(3);
      expect(response.data.total).toBeCloseTo(product.price * 3, 2);
      expect(response.data.items[0]).toMatchObject({
        productId: product.id,
        quantity: 3,
        unitPrice: product.price,
        available: true,
      });
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(await CartApi.get(NO_AUTH), 401, "UNAUTHORIZED");
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(await CartApi.get(asAdmin), 403, "FORBIDDEN");
    });
  });

  describe("DELETE /cart", () => {
    it("returns 204 and empties the cart", async () => {
      const product = await newProduct();
      await CartApi.addItem({ productId: product.id }, asCustomer);

      const response = await CartApi.clear(asCustomer);

      expect(response.status).toBe(204);
      expect((await CartApi.get(asCustomer)).data.items).toHaveLength(0);
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(await CartApi.clear(NO_AUTH), 401, "UNAUTHORIZED");
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(await CartApi.clear(asAdmin), 403, "FORBIDDEN");
    });
  });

  describe("POST /cart/items", () => {
    it("returns 201 and defaults the quantity to 1", async () => {
      const product = await newProduct();

      const response = await CartApi.addItem(
        { productId: product.id },
        asCustomer,
      );

      expect(response.status).toBe(201);
      expect(response.data.items).toHaveLength(1);
      expect(response.data.items[0]).toMatchObject({
        productId: product.id,
        quantity: 1,
      });
    });

    it("sums the quantity when the product is already in the cart", async () => {
      const product = await newProduct();
      await CartApi.addItem({ productId: product.id, quantity: 2 }, asCustomer);

      const response = await CartApi.addItem(
        { productId: product.id, quantity: 3 },
        asCustomer,
      );

      expect(response.status).toBe(201);
      expect(response.data.items).toHaveLength(1);
      expect(response.data.items[0].quantity).toBe(5);
    });

    it.each([
      ["a missing productId", { quantity: 1 }],
      ["a non numeric productId", { productId: "abc" }],
      ["a zero quantity", { productId: 1, quantity: 0 }],
      ["a quantity above 999", { productId: 1, quantity: 1000 }],
      ["a fractional quantity", { productId: 1, quantity: 1.5 }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, body) => {
      expectApiError(
        await CartApi.addItem(body, asCustomer),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CartApi.addItem({ productId: SEED_PRODUCTS.inStock.id }, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CartApi.addItem({ productId: SEED_PRODUCTS.inStock.id }, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown product", async () => {
      expectApiError(
        await CartApi.addItem({ productId: NON_EXISTENT_ID }, asCustomer),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });

    it("returns 404 PRODUCT_NOT_FOUND for an inactive product", async () => {
      expectApiError(
        await CartApi.addItem(
          { productId: SEED_PRODUCTS.inactive.id },
          asCustomer,
        ),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });

    it("returns 409 OUT_OF_STOCK for a product without stock", async () => {
      const product = await newProduct(0);

      expectApiError(
        await CartApi.addItem({ productId: product.id }, asCustomer),
        409,
        "OUT_OF_STOCK",
      );
    });

    it("returns 409 INSUFFICIENT_STOCK when the quantity exceeds the stock", async () => {
      const product = await newProduct(2);

      expectApiError(
        await CartApi.addItem(
          { productId: product.id, quantity: 3 },
          asCustomer,
        ),
        409,
        "INSUFFICIENT_STOCK",
      );
    });

    it("returns 409 INSUFFICIENT_STOCK when the summed quantity exceeds the stock", async () => {
      const product = await newProduct(2);
      await CartApi.addItem({ productId: product.id, quantity: 2 }, asCustomer);

      expectApiError(
        await CartApi.addItem({ productId: product.id }, asCustomer),
        409,
        "INSUFFICIENT_STOCK",
      );
    });
  });

  describe("PATCH /cart/items/{productId}", () => {
    let product: ProductType;

    beforeEach(async () => {
      product = await newProduct(5);
      await CartApi.addItem({ productId: product.id, quantity: 1 }, asCustomer);
    });

    it("returns 200 and sets the absolute quantity", async () => {
      const response = await CartApi.updateItem(
        product.id,
        { quantity: 4 },
        asCustomer,
      );

      expect(response.status).toBe(200);
      expect(response.data.items[0].quantity).toBe(4);
      expect(response.data.totalItems).toBe(4);
    });

    it.each([
      ["a zero quantity", { quantity: 0 }],
      ["a quantity above 999", { quantity: 1000 }],
      ["a missing quantity", {}],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, body) => {
      expectApiError(
        await CartApi.updateItem(product.id, body, asCustomer),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 400 VALIDATION_ERROR for a non numeric productId", async () => {
      expectApiError(
        await CartApi.updateItem("abc", { quantity: 1 }, asCustomer),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CartApi.updateItem(product.id, { quantity: 1 }, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CartApi.updateItem(product.id, { quantity: 1 }, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 CART_ITEM_NOT_FOUND for a product that is not in the cart", async () => {
      expectApiError(
        await CartApi.updateItem(NON_EXISTENT_ID, { quantity: 1 }, asCustomer),
        404,
        "CART_ITEM_NOT_FOUND",
      );
    });

    it("returns 409 INSUFFICIENT_STOCK when the quantity exceeds the stock", async () => {
      expectApiError(
        await CartApi.updateItem(product.id, { quantity: 6 }, asCustomer),
        409,
        "INSUFFICIENT_STOCK",
      );
    });
  });

  describe("DELETE /cart/items/{productId}", () => {
    it("returns 200 and removes only that item", async () => {
      const kept = await newProduct();
      const removed = await newProduct();
      await CartApi.addItem({ productId: kept.id }, asCustomer);
      await CartApi.addItem({ productId: removed.id }, asCustomer);

      const response = await CartApi.removeItem(removed.id, asCustomer);

      expect(response.status).toBe(200);
      expect(response.data.items.map((i) => i.productId)).toEqual([kept.id]);
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await CartApi.removeItem(SEED_PRODUCTS.inStock.id, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for an ADMIN", async () => {
      expectApiError(
        await CartApi.removeItem(SEED_PRODUCTS.inStock.id, asAdmin),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 CART_ITEM_NOT_FOUND for a product that is not in the cart", async () => {
      expectApiError(
        await CartApi.removeItem(NON_EXISTENT_ID, asCustomer),
        404,
        "CART_ITEM_NOT_FOUND",
      );
    });
  });
});

import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { AdminOrdersApi } from "../../../../domain/admin/orders/admin-orders-api";
import { CartApi } from "../../../../domain/cart/cart-api";
import { CheckoutOrdersApi } from "../../../../domain/checkoutOrders/checkout-orders-api";
import { OrderScenario } from "../../../../domain/checkoutOrders/order-scenarios";
import { expectApiError } from "../../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import { NON_EXISTENT_ID } from "../../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

// npx jest src/tests/admin/orders/actions/admin-orders-actions.spec.ts
describe("Admin orders - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  const createdIds: number[] = [];

  const placeOrder = async (quantity = 1) => {
    const placed = await OrderScenario.placeOrder(
      { admin: asAdmin, customer: asCustomer },
      { quantity },
    );
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

  describe("GET /admin/orders", () => {
    it("returns 200 with orders from customers, including the customer data", async () => {
      const { order } = await placeOrder();

      const response = await AdminOrdersApi.list({ pageSize: 100 }, asAdmin);

      expect(response.status).toBe(200);
      const found = response.data.data.find((o) => o.id === order.id);
      expect(found?.user).toMatchObject({
        email: defaultUserCredentials.userName,
      });
    });

    it("filters by status", async () => {
      const { order } = await placeOrder();
      await AdminOrdersApi.cancel(order.id, asAdmin);

      const response = await AdminOrdersApi.list(
        { status: "CANCELLED", pageSize: 100 },
        asAdmin,
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
        await AdminOrdersApi.list(query, asAdmin),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminOrdersApi.list({}, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminOrdersApi.list({}, asCustomer),
        403,
        "FORBIDDEN",
      );
    });
  });

  describe("GET /admin/orders/{id}", () => {
    it("returns 200 with the order of any customer", async () => {
      const { order } = await placeOrder();

      const response = await AdminOrdersApi.getById(order.id, asAdmin);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: order.id,
        userId: order.userId,
      });
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminOrdersApi.getById(1, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminOrdersApi.getById(1, asCustomer),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 ORDER_NOT_FOUND for an unknown order", async () => {
      expectApiError(
        await AdminOrdersApi.getById(NON_EXISTENT_ID, asAdmin),
        404,
        "ORDER_NOT_FOUND",
      );
    });
  });

  describe("POST /admin/orders/{id}/cancel", () => {
    it("returns 200 with a CANCELLED order and returns the stock", async () => {
      const { order, product } = await placeOrder(2);

      const response = await AdminOrdersApi.cancel(order.id, asAdmin);

      expect(response.status).toBe(200);
      expect(response.data.status).toBe("CANCELLED");
      expect(
        (await AdminProductApi.getById(product.id, asAdmin)).data.stock,
      ).toBe(10);
      expect(
        (await CheckoutOrdersApi.getOrder(order.id, asCustomer)).data.status,
      ).toBe("CANCELLED");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminOrdersApi.cancel(1, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminOrdersApi.cancel(1, asCustomer),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 ORDER_NOT_FOUND for an unknown order", async () => {
      expectApiError(
        await AdminOrdersApi.cancel(NON_EXISTENT_ID, asAdmin),
        404,
        "ORDER_NOT_FOUND",
      );
    });

    it("returns 409 INVALID_ORDER_STATE when the order is already cancelled", async () => {
      const { order } = await placeOrder();
      await AdminOrdersApi.cancel(order.id, asAdmin);

      expectApiError(
        await AdminOrdersApi.cancel(order.id, asAdmin),
        409,
        "INVALID_ORDER_STATE",
      );
    });
  });
});

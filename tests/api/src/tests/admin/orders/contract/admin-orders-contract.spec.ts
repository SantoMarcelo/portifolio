import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { AdminOrdersApi } from "../../../../domain/admin/orders/admin-orders-api";
import { CartApi } from "../../../../domain/cart/cart-api";
import { ErrorResponseSchema } from "../../../../domain/common/common-types";
import {
  OrderPageSchema,
  OrderSchema,
} from "../../../../domain/checkoutOrders/checkout-orders-types";
import { OrderScenario } from "../../../../domain/checkoutOrders/order-scenarios";
import SchemaValidator from "../../../../shared/schema-validator-adapter";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import { NON_EXISTENT_ID } from "../../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

const matches = (
  schema: Parameters<typeof SchemaValidator.validateSchema>[0],
  data: unknown,
) => SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/admin/orders/contract/admin-orders-contract.spec.ts
describe("Admin orders - Contract", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  const createdIds: number[] = [];

  const placeOrder = async () => {
    const placed = await OrderScenario.placeOrder({
      admin: asAdmin,
      customer: asCustomer,
    });
    createdIds.push(placed.product.id);
    return placed.order;
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

  it("GET /admin/orders - 200 matches the order page schema", async () => {
    await placeOrder();

    const response = await AdminOrdersApi.list({}, asAdmin);

    expect(matches(OrderPageSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/orders - 400 matches the error schema", async () => {
    const response = await AdminOrdersApi.list({ status: "SHIPPED" }, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/orders - 401 matches the error schema", async () => {
    expect(
      matches(
        ErrorResponseSchema,
        (await AdminOrdersApi.list({}, NO_AUTH)).data,
      ),
    ).toBeUndefined();
  });

  it("GET /admin/orders/{id} - 200 matches the order schema", async () => {
    const order = await placeOrder();

    const response = await AdminOrdersApi.getById(order.id, asAdmin);

    expect(matches(OrderSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/orders/{id} - 404 matches the error schema", async () => {
    const response = await AdminOrdersApi.getById(NON_EXISTENT_ID, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/orders/{id}/cancel - 200 matches the order schema", async () => {
    const order = await placeOrder();

    const response = await AdminOrdersApi.cancel(order.id, asAdmin);

    expect(matches(OrderSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/orders/{id}/cancel - 409 matches the error schema", async () => {
    const order = await placeOrder();
    await AdminOrdersApi.cancel(order.id, asAdmin);

    const response = await AdminOrdersApi.cancel(order.id, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});

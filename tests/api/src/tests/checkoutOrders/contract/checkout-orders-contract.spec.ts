import { AuthApi } from "../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../domain/admin/product/product-api";
import { CartApi } from "../../../domain/cart/cart-api";
import { ErrorResponseSchema } from "../../../domain/common/common-types";
import { CheckoutOrdersApi } from "../../../domain/checkoutOrders/checkout-orders-api";
import {
  OrderPageSchema,
  OrderSchema,
  QuoteSchema,
} from "../../../domain/checkoutOrders/checkout-orders-types";
import {
  CARD_NUMBERS,
  OrderFactory,
} from "../../../domain/checkoutOrders/factories/order-factory";
import { OrderScenario } from "../../../domain/checkoutOrders/order-scenarios";
import SchemaValidator from "../../../shared/schema-validator-adapter";
import { bearer, NO_AUTH } from "../../../shared/request-options";
import { NON_EXISTENT_ID } from "../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../fixtures/users/system-accounts";

const matches = (
  schema: Parameters<typeof SchemaValidator.validateSchema>[0],
  data: unknown,
) => SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/checkoutOrders/contract/checkout-orders-contract.spec.ts
describe("Checkout and orders - Contract", () => {
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

  it("POST /checkout/quote - 200 matches the quote schema", async () => {
    const product = await OrderScenario.createProduct(asAdmin);
    createdIds.push(product.id);
    await OrderScenario.fillCart(asCustomer, product);

    const response = await CheckoutOrdersApi.quote({}, asCustomer);

    expect(matches(QuoteSchema, response.data)).toBeUndefined();
  });

  it("POST /checkout/quote - 422 matches the error schema", async () => {
    await CartApi.clear(asCustomer);

    const response = await CheckoutOrdersApi.quote({}, asCustomer);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /orders - 201 matches the order schema", async () => {
    const product = await OrderScenario.createProduct(asAdmin);
    createdIds.push(product.id);
    await OrderScenario.fillCart(asCustomer, product);

    const response = await CheckoutOrdersApi.createOrder(
      OrderFactory.create({ payment: OrderFactory.card() }),
      asCustomer,
    );

    expect(response.status).toBe(201);
    expect(matches(OrderSchema, response.data)).toBeUndefined();
  });

  it("POST /orders - 400 matches the error schema", async () => {
    const response = await CheckoutOrdersApi.createOrder({}, asCustomer);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /orders - 422 matches the error schema", async () => {
    const product = await OrderScenario.createProduct(asAdmin);
    createdIds.push(product.id);
    await OrderScenario.fillCart(asCustomer, product);

    const response = await CheckoutOrdersApi.createOrder(
      OrderFactory.create({
        payment: OrderFactory.card(CARD_NUMBERS.DECLINED),
      }),
      asCustomer,
    );

    expect(response.status).toBe(422);
    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /orders - 503 matches the error schema", async () => {
    const product = await OrderScenario.createProduct(asAdmin);
    createdIds.push(product.id);
    await OrderScenario.fillCart(asCustomer, product);

    const response = await CheckoutOrdersApi.createOrder(
      OrderFactory.create({
        payment: OrderFactory.card(CARD_NUMBERS.GATEWAY_UNAVAILABLE),
      }),
      asCustomer,
    );

    expect(response.status).toBe(503);
    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /orders - 200 matches the order page schema", async () => {
    await placeOrder();

    const response = await CheckoutOrdersApi.listOrders({}, asCustomer);

    expect(matches(OrderPageSchema, response.data)).toBeUndefined();
  });

  it("GET /orders - 400 matches the error schema", async () => {
    const response = await CheckoutOrdersApi.listOrders(
      { status: "SHIPPED" },
      asCustomer,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /orders/{id} - 200 matches the order schema", async () => {
    const order = await placeOrder();

    const response = await CheckoutOrdersApi.getOrder(order.id, asCustomer);

    expect(matches(OrderSchema, response.data)).toBeUndefined();
  });

  it("GET /orders/{id} - 404 matches the error schema", async () => {
    const response = await CheckoutOrdersApi.getOrder(
      NON_EXISTENT_ID,
      asCustomer,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /orders/{id}/cancel - 200 matches the order schema", async () => {
    const order = await placeOrder();

    const response = await CheckoutOrdersApi.cancelOrder(order.id, asCustomer);

    expect(matches(OrderSchema, response.data)).toBeUndefined();
  });

  it("POST /orders/{id}/cancel - 409 matches the error schema", async () => {
    const order = await placeOrder();
    await CheckoutOrdersApi.cancelOrder(order.id, asCustomer);

    const response = await CheckoutOrdersApi.cancelOrder(order.id, asCustomer);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /orders - 401 matches the error schema", async () => {
    const response = await CheckoutOrdersApi.listOrders({}, NO_AUTH);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});

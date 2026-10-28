import { AuthApi } from "../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../domain/admin/product/product-api";
import { CartApi } from "../../../domain/cart/cart-api";
import { CartSchema } from "../../../domain/cart/cart-types";
import { ErrorResponseSchema } from "../../../domain/common/common-types";
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

// npx jest src/tests/cart/contract/cart-contract.spec.ts
describe("Cart - Contract", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  let productId: number;

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
    productId = (await OrderScenario.createProduct(asAdmin, { stock: 10 })).id;
  });

  beforeEach(async () => {
    await CartApi.clear(asCustomer);
  });

  afterAll(async () => {
    await CartApi.clear(asCustomer);
    await AdminProductApi.delete(productId, asAdmin);
  });

  it("GET /cart - 200 matches the cart schema", async () => {
    await CartApi.addItem({ productId }, asCustomer);

    const response = await CartApi.get(asCustomer);

    expect(response.data.items).toHaveLength(1);
    expect(matches(CartSchema, response.data)).toBeUndefined();
  });

  it("GET /cart - 401 matches the error schema", async () => {
    expect(
      matches(ErrorResponseSchema, (await CartApi.get(NO_AUTH)).data),
    ).toBeUndefined();
  });

  it("GET /cart - 403 matches the error schema", async () => {
    expect(
      matches(ErrorResponseSchema, (await CartApi.get(asAdmin)).data),
    ).toBeUndefined();
  });

  it("POST /cart/items - 201 matches the cart schema", async () => {
    const response = await CartApi.addItem({ productId }, asCustomer);

    expect(matches(CartSchema, response.data)).toBeUndefined();
  });

  it("POST /cart/items - 400 matches the error schema", async () => {
    const response = await CartApi.addItem({}, asCustomer);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /cart/items - 404 matches the error schema", async () => {
    const response = await CartApi.addItem(
      { productId: NON_EXISTENT_ID },
      asCustomer,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("PATCH /cart/items/{productId} - 200 matches the cart schema", async () => {
    await CartApi.addItem({ productId }, asCustomer);

    const response = await CartApi.updateItem(
      productId,
      { quantity: 2 },
      asCustomer,
    );

    expect(matches(CartSchema, response.data)).toBeUndefined();
  });

  it("PATCH /cart/items/{productId} - 404 matches the error schema", async () => {
    const response = await CartApi.updateItem(
      NON_EXISTENT_ID,
      { quantity: 2 },
      asCustomer,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("DELETE /cart/items/{productId} - 200 matches the cart schema", async () => {
    await CartApi.addItem({ productId }, asCustomer);

    const response = await CartApi.removeItem(productId, asCustomer);

    expect(matches(CartSchema, response.data)).toBeUndefined();
  });

  it("DELETE /cart/items/{productId} - 404 matches the error schema", async () => {
    const response = await CartApi.removeItem(NON_EXISTENT_ID, asCustomer);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("DELETE /cart - 401 matches the error schema", async () => {
    expect(
      matches(ErrorResponseSchema, (await CartApi.clear(NO_AUTH)).data),
    ).toBeUndefined();
  });
});

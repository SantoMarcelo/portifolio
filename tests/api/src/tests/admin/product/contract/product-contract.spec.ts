import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { ProductFactory } from "../../../../domain/admin/product/factories/product-factory";
import {
  ProductPageSchema,
  ProductSchema,
} from "../../../../domain/admin/product/product-types";
import { ErrorResponseSchema } from "../../../../domain/common/common-types";
import SchemaValidator from "../../../../shared/schema-validator-adapter";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import {
  NON_EXISTENT_ID,
  SEED_PRODUCTS,
} from "../../../../fixtures/entities/products";
import { adminUserCredentials } from "../../../../fixtures/users/system-accounts";

const matches = (
  schema: Parameters<typeof SchemaValidator.validateSchema>[0],
  data: unknown,
) => SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/admin/product/contract/product-contract.spec.ts
describe("Admin products - Contract", () => {
  let asAdmin: ReturnType<typeof bearer>;
  const createdIds: number[] = [];

  beforeAll(async () => {
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  afterAll(async () => {
    await Promise.all(
      createdIds.map((id) => AdminProductApi.delete(id, asAdmin)),
    );
  });

  it("GET /admin/products - 200 matches the product page schema", async () => {
    const response = await AdminProductApi.list({}, asAdmin);

    expect(matches(ProductPageSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/products - 401 matches the error schema", async () => {
    const response = await AdminProductApi.list({}, NO_AUTH);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/products - 201 matches the product schema", async () => {
    const response = await AdminProductApi.create(
      ProductFactory.create(),
      asAdmin,
    );
    createdIds.push(response.data.id);

    expect(response.status).toBe(201);
    expect(matches(ProductSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/products - 400 matches the error schema", async () => {
    const response = await AdminProductApi.create({}, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/products/{id} - 200 matches the product schema", async () => {
    const response = await AdminProductApi.getById(
      SEED_PRODUCTS.inStock.id,
      asAdmin,
    );

    expect(matches(ProductSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/products/{id} - 404 matches the error schema", async () => {
    const response = await AdminProductApi.getById(NON_EXISTENT_ID, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("PUT /admin/products/{id} - 200 matches the product schema", async () => {
    const created = await AdminProductApi.create(
      ProductFactory.create(),
      asAdmin,
    );
    createdIds.push(created.data.id);
    const payload = ProductFactory.update({
      sku: created.data.sku,
    });

    const response = await AdminProductApi.update(
      created.data.id,
      payload,
      asAdmin,
    );

    expect(matches(ProductSchema, response.data)).toBeUndefined();
  });

  it("PUT /admin/products/{id} - 404 matches the error schema", async () => {
    const response = await AdminProductApi.update(
      NON_EXISTENT_ID,
      ProductFactory.create(),
      asAdmin,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("DELETE /admin/products/{id} - 404 matches the error schema", async () => {
    const response = await AdminProductApi.delete(NON_EXISTENT_ID, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});

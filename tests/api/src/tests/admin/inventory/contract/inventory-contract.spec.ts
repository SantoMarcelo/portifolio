import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminInventoryApi } from "../../../../domain/admin/inventory/inventory-api";
import {
  StockAdjustResponseSchema,
  StockMovementPageSchema,
} from "../../../../domain/admin/inventory/inventory-types";
import { ErrorResponseSchema } from "../../../../domain/common/common-types";
import SchemaValidator from "../../../../shared/schema-validator-adapter";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import { NON_EXISTENT_ID } from "../../../../fixtures/entities/products";
import { adminUserCredentials } from "../../../../fixtures/users/system-accounts";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { ProductFactory } from "../../../../domain/admin/product/factories/product-factory";

const matches = (
  schema: Parameters<typeof SchemaValidator.validateSchema>[0],
  data: unknown,
) => SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/admin/inventory/contract/inventory-contract.spec.ts
describe("Admin inventory - Contract", () => {
  let asAdmin: ReturnType<typeof bearer>;

  beforeAll(async () => {
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  it("POST /admin/products/{id}/stock - 201 matches the adjust response schema", async () => {
    const product = await AdminProductApi.create(
      ProductFactory.create(),
      asAdmin,
    );

    const response = await AdminInventoryApi.adjustStock(
      product.data.id,
      { type: "ENTRY", quantity: 1, reason: "Reposição" },
      asAdmin,
    );
    await AdminProductApi.delete(product.data.id, asAdmin);

    expect(response.status).toBe(201);
    expect(matches(StockAdjustResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/products/{id}/stock - 400 matches the error schema", async () => {
    const response = await AdminInventoryApi.adjustStock(1, {}, asAdmin);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/products/{id}/stock - 401 matches the error schema", async () => {
    const response = await AdminInventoryApi.adjustStock(1, {}, NO_AUTH);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("POST /admin/products/{id}/stock - 404 matches the error schema", async () => {
    const response = await AdminInventoryApi.adjustStock(
      NON_EXISTENT_ID,
      { type: "ENTRY", quantity: 1, reason: "Reposição" },
      asAdmin,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/stock/movements - 200 matches the movement page schema", async () => {
    const response = await AdminInventoryApi.listMovements({}, asAdmin);

    expect(matches(StockMovementPageSchema, response.data)).toBeUndefined();
  });

  it("GET /admin/stock/movements - 400 matches the error schema", async () => {
    const response = await AdminInventoryApi.listMovements(
      { type: "TRANSFER" },
      asAdmin,
    );

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});

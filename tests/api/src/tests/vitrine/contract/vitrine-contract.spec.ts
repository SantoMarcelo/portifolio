import { z } from "zod";
import { VitrineApi } from "../../../domain/vitrine/vitrine-api";
import {
  ProductPageSchema,
  ProductSchema,
} from "../../../domain/admin/product/product-types";
import { ErrorResponseSchema } from "../../../domain/common/common-types";
import SchemaValidator from "../../../shared/schema-validator-adapter";
import {
  NON_EXISTENT_ID,
  SEED_PRODUCTS,
} from "../../../fixtures/entities/products";

const matches = (schema: z.ZodType, data: unknown) =>
  SchemaValidator.validateSchema(schema, data).error;

// npx jest src/tests/vitrine/contract/vitrine-contract.spec.ts
describe("Vitrine - Contract", () => {
  it("GET /categories - 200 is a list of strings", async () => {
    const response = await VitrineApi.categories();

    expect(matches(z.array(z.string()), response.data)).toBeUndefined();
  });

  it("GET /products - 200 matches the product page schema", async () => {
    const response = await VitrineApi.listProducts();

    expect(matches(ProductPageSchema, response.data)).toBeUndefined();
  });

  it("GET /products - 400 matches the error schema", async () => {
    const response = await VitrineApi.listProducts({ page: 0 });

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /products/{id} - 200 matches the product schema", async () => {
    const response = await VitrineApi.getProduct(SEED_PRODUCTS.inStock.id);

    expect(matches(ProductSchema, response.data)).toBeUndefined();
  });

  it("GET /products/{id} - 400 matches the error schema", async () => {
    const response = await VitrineApi.getProduct("abc");

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });

  it("GET /products/{id} - 404 matches the error schema", async () => {
    const response = await VitrineApi.getProduct(NON_EXISTENT_ID);

    expect(matches(ErrorResponseSchema, response.data)).toBeUndefined();
  });
});

import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { ProductFactory } from "../../../../domain/admin/product/factories/product-factory";
import { VitrineApi } from "../../../../domain/vitrine/vitrine-api";
import { expectApiError } from "../../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import {
  NON_EXISTENT_ID,
  SEED_PRODUCTS,
} from "../../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

// npx jest src/tests/admin/product/actions/product-actions.spec.ts
describe("Admin products - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  const createdIds: number[] = [];

  const createProduct = async (overrides = {}) => {
    const response = await AdminProductApi.create(
      ProductFactory.create(overrides),
      asAdmin,
    );
    expect(response.status).toBe(201);
    createdIds.push(response.data.id);
    return response.data;
  };

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  // DELETE is a soft delete, so cleaning up keeps the storefront free of QA leftovers.
  afterAll(async () => {
    await Promise.all(
      createdIds.map((id) => AdminProductApi.delete(id, asAdmin)),
    );
  });

  describe("GET /admin/products", () => {
    it("returns 200 including inactive products", async () => {
      const response = await AdminProductApi.list({ pageSize: 100 }, asAdmin);

      expect(response.status).toBe(200);
      expect(response.data.data.map((p) => p.sku)).toContain(
        SEED_PRODUCTS.inactive.sku,
      );
    });

    it("filters by active=false", async () => {
      const response = await AdminProductApi.list(
        { active: false, pageSize: 100 },
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data.every((p) => !p.active)).toBe(true);
    });

    it("filters by active=true", async () => {
      const response = await AdminProductApi.list(
        { active: true, pageSize: 100 },
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.every((p) => p.active)).toBe(true);
    });

    it("returns 400 VALIDATION_ERROR for an invalid active flag", async () => {
      const response = await AdminProductApi.list({ active: "maybe" }, asAdmin);

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 400 VALIDATION_ERROR for an invalid page", async () => {
      const response = await AdminProductApi.list({ page: 0 }, asAdmin);

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminProductApi.list({}, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminProductApi.list({}, asCustomer),
        403,
        "FORBIDDEN",
      );
    });
  });

  describe("POST /admin/products", () => {
    it("returns 201 and persists the product with its initial stock", async () => {
      const payload = ProductFactory.create({ stock: 7 });

      const response = await AdminProductApi.create(payload, asAdmin);
      createdIds.push(response.data.id);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        sku: payload.sku,
        name: payload.name,
        price: payload.price,
        stock: 7,
        active: true,
      });

      const stored = await AdminProductApi.getById(response.data.id, asAdmin);
      expect(stored.status).toBe(200);
      expect(stored.data.sku).toBe(payload.sku);
    });

    it("applies defaults when only the required fields are sent", async () => {
      const { name, price, sku, category } = ProductFactory.create();

      const response = await AdminProductApi.create(
        { name, price, sku, category },
        asAdmin,
      );
      createdIds.push(response.data.id);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        stock: 0,
        active: true,
        description: "",
      });
    });

    it.each([
      ["a name shorter than 3 characters", { name: "ab" }],
      ["a zero price", { price: 0 }],
      ["a negative price", { price: -1 }],
      ["a price with more than 2 decimals", { price: 10.123 }],
      ["a negative stock", { stock: -1 }],
      ["a fractional stock", { stock: 1.5 }],
      ["an empty SKU", { sku: "" }],
      ["an empty category", { category: "" }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, override) => {
      const response = await AdminProductApi.create(
        ProductFactory.create(override),
        asAdmin,
      );

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminProductApi.create(ProductFactory.create(), NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminProductApi.create(ProductFactory.create(), asCustomer),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 409 SKU_ALREADY_EXISTS for a duplicated SKU", async () => {
      const existing = await createProduct();

      const response = await AdminProductApi.create(
        ProductFactory.create({ sku: existing.sku }),
        asAdmin,
      );

      expectApiError(response, 409, "SKU_ALREADY_EXISTS");
    });
  });

  describe("GET /admin/products/{id}", () => {
    it("returns 200 for an active product", async () => {
      const product = await createProduct();

      const response = await AdminProductApi.getById(product.id, asAdmin);

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(product.id);
    });

    it("returns 200 for an inactive product", async () => {
      const response = await AdminProductApi.getById(
        SEED_PRODUCTS.inactive.id,
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.active).toBe(false);
    });

    it("returns 400 VALIDATION_ERROR for a non numeric id", async () => {
      expectApiError(
        await AdminProductApi.getById("abc", asAdmin),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminProductApi.getById(SEED_PRODUCTS.inStock.id, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminProductApi.getById(SEED_PRODUCTS.inStock.id, asCustomer),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown id", async () => {
      expectApiError(
        await AdminProductApi.getById(NON_EXISTENT_ID, asAdmin),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });
  });

  describe("PUT /admin/products/{id}", () => {
    it("returns 200 and updates the product without touching its stock", async () => {
      const product = await createProduct({ stock: 4 });
      const payload = ProductFactory.update({
        name: "Produto QA Atualizado",
        price: 99.9,
        sku: product.sku,
        category: "QA Atualizada",
      });

      const response = await AdminProductApi.update(
        product.id,
        payload,
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        name: "Produto QA Atualizado",
        price: 99.9,
        category: "QA Atualizada",
        stock: 4,
      });
    });

    it("hides the product from the storefront when it is deactivated", async () => {
      const product = await createProduct();
      const payload = ProductFactory.update({
        sku: product.sku,
        active: false,
      });

      const response = await AdminProductApi.update(
        product.id,
        payload,
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.active).toBe(false);
      expectApiError(
        await VitrineApi.getProduct(product.id),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });

    it("returns 400 VALIDATION_ERROR for an invalid payload", async () => {
      const product = await createProduct();

      const response = await AdminProductApi.update(
        product.id,
        { name: "ab" },
        asAdmin,
      );

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminProductApi.update(
          SEED_PRODUCTS.inStock.id,
          ProductFactory.create(),
          NO_AUTH,
        ),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminProductApi.update(
          SEED_PRODUCTS.inStock.id,
          ProductFactory.create(),
          asCustomer,
        ),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown id", async () => {
      expectApiError(
        await AdminProductApi.update(
          NON_EXISTENT_ID,
          ProductFactory.create(),
          asAdmin,
        ),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });

    it("returns 409 SKU_ALREADY_EXISTS when the SKU belongs to another product", async () => {
      const first = await createProduct();
      const second = await createProduct();
      const payload = ProductFactory.update({
        sku: first.sku,
      });

      const response = await AdminProductApi.update(
        second.id,
        payload,
        asAdmin,
      );

      expectApiError(response, 409, "SKU_ALREADY_EXISTS");
    });
  });

  describe("DELETE /admin/products/{id}", () => {
    it("returns 204 and deactivates the product (soft delete)", async () => {
      const product = await createProduct();

      const response = await AdminProductApi.delete(product.id, asAdmin);

      expect(response.status).toBe(204);
      const stored = await AdminProductApi.getById(product.id, asAdmin);
      expect(stored.data.active).toBe(false);
      expectApiError(
        await VitrineApi.getProduct(product.id),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });

    it("returns 400 VALIDATION_ERROR for a non numeric id", async () => {
      expectApiError(
        await AdminProductApi.delete("abc", asAdmin),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminProductApi.delete(SEED_PRODUCTS.inStock.id, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminProductApi.delete(SEED_PRODUCTS.inStock.id, asCustomer),
        403,
        "FORBIDDEN",
      );
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown id", async () => {
      expectApiError(
        await AdminProductApi.delete(NON_EXISTENT_ID, asAdmin),
        404,
        "PRODUCT_NOT_FOUND",
      );
    });
  });
});

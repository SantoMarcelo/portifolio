import { AuthApi } from "../../../../domain/auth/auth-api";
import { AdminProductApi } from "../../../../domain/admin/product/product-api";
import { ProductFactory } from "../../../../domain/admin/product/factories/product-factory";
import { ProductType } from "../../../../domain/admin/product/product-types";
import { AdminInventoryApi } from "../../../../domain/admin/inventory/inventory-api";
import { expectApiError } from "../../../../shared/assertions";
import { bearer, NO_AUTH } from "../../../../shared/request-options";
import { NON_EXISTENT_ID } from "../../../../fixtures/entities/products";
import {
  adminUserCredentials,
  defaultUserCredentials,
} from "../../../../fixtures/users/system-accounts";

// npx jest src/tests/admin/inventory/actions/inventory-actions.spec.ts
describe("Admin inventory - Actions", () => {
  let asAdmin: ReturnType<typeof bearer>;
  let asCustomer: ReturnType<typeof bearer>;
  let product: ProductType;

  beforeAll(async () => {
    asCustomer = bearer(await AuthApi.loginAndGetToken(defaultUserCredentials));
    asAdmin = bearer(await AuthApi.loginAndGetToken(adminUserCredentials));
  });

  // A fresh product with 10 units for every test keeps the stock arithmetic independent.
  beforeEach(async () => {
    const created = await AdminProductApi.create(
      ProductFactory.create({ stock: 10 }),
      asAdmin,
    );
    product = created.data;
  });

  afterEach(async () => {
    await AdminProductApi.delete(product.id, asAdmin);
  });

  describe("POST /admin/products/{id}/stock", () => {
    it("ENTRY adds the quantity and registers the movement", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ENTRY", quantity: 5, reason: "Reposição de estoque" },
        asAdmin,
      );

      expect(response.status).toBe(201);
      expect(response.data.product.stock).toBe(15);
      expect(response.data.movement).toMatchObject({
        productId: product.id,
        type: "ENTRY",
        quantity: 5,
        previousStock: 10,
        newStock: 15,
        reason: "Reposição de estoque",
      });
    });

    it("EXIT subtracts the quantity and registers the movement", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "EXIT", quantity: 4, reason: "Perda no depósito" },
        asAdmin,
      );

      expect(response.status).toBe(201);
      expect(response.data.product.stock).toBe(6);
      expect(response.data.movement).toMatchObject({
        previousStock: 10,
        newStock: 6,
      });
    });

    it("ADJUSTMENT sets the absolute stock", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ADJUSTMENT", quantity: 3, reason: "Contagem de inventário" },
        asAdmin,
      );

      expect(response.status).toBe(201);
      expect(response.data.product.stock).toBe(3);
      expect(response.data.product.lowStock).toBe(true);
    });

    it("ADJUSTMENT to zero marks the product as out of stock", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ADJUSTMENT", quantity: 0, reason: "Produto esgotado" },
        asAdmin,
      );

      expect(response.status).toBe(201);
      expect(response.data.product).toMatchObject({ stock: 0, inStock: false });
    });

    it.each([
      [
        "an unknown type",
        { type: "TRANSFER", quantity: 1, reason: "Motivo válido" },
      ],
      [
        "a zero ENTRY quantity",
        { type: "ENTRY", quantity: 0, reason: "Motivo válido" },
      ],
      [
        "a negative EXIT quantity",
        { type: "EXIT", quantity: -1, reason: "Motivo válido" },
      ],
      [
        "a negative ADJUSTMENT",
        { type: "ADJUSTMENT", quantity: -1, reason: "Motivo válido" },
      ],
      [
        "a fractional quantity",
        { type: "ENTRY", quantity: 1.5, reason: "Motivo válido" },
      ],
      [
        "a reason shorter than 3 characters",
        { type: "ENTRY", quantity: 1, reason: "ab" },
      ],
      ["a missing reason", { type: "ENTRY", quantity: 1 }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, body) => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        body,
        asAdmin,
      );

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ENTRY", quantity: 1, reason: "Reposição" },
        NO_AUTH,
      );

      expectApiError(response, 401, "UNAUTHORIZED");
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ENTRY", quantity: 1, reason: "Reposição" },
        asCustomer,
      );

      expectApiError(response, 403, "FORBIDDEN");
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown product", async () => {
      const response = await AdminInventoryApi.adjustStock(
        NON_EXISTENT_ID,
        { type: "ENTRY", quantity: 1, reason: "Reposição" },
        asAdmin,
      );

      expectApiError(response, 404, "PRODUCT_NOT_FOUND");
    });

    it("returns 409 INSUFFICIENT_STOCK when an EXIT would make the stock negative", async () => {
      const response = await AdminInventoryApi.adjustStock(
        product.id,
        { type: "EXIT", quantity: 11, reason: "Saída maior que o estoque" },
        asAdmin,
      );

      expectApiError(response, 409, "INSUFFICIENT_STOCK");
      const stored = await AdminProductApi.getById(product.id, asAdmin);
      expect(stored.data.stock).toBe(10);
    });
  });

  describe("GET /admin/stock/movements", () => {
    it("returns 200 with the movements of one product, newest data included", async () => {
      await AdminInventoryApi.adjustStock(
        product.id,
        { type: "ENTRY", quantity: 2, reason: "Reposição" },
        asAdmin,
      );

      const response = await AdminInventoryApi.listMovements(
        { productId: product.id },
        asAdmin,
      );

      expect(response.status).toBe(200);
      // initial stock (ENTRY on creation) + the manual ENTRY
      expect(response.data.pagination.total).toBe(2);
      expect(response.data.data.every((m) => m.productId === product.id)).toBe(
        true,
      );
    });

    it("filters by movement type", async () => {
      await AdminInventoryApi.adjustStock(
        product.id,
        { type: "EXIT", quantity: 1, reason: "Saída avulsa" },
        asAdmin,
      );

      const response = await AdminInventoryApi.listMovements(
        { productId: product.id, type: "EXIT" },
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.data).toHaveLength(1);
      expect(response.data.data[0].type).toBe("EXIT");
    });

    it("filters by product name search", async () => {
      const response = await AdminInventoryApi.listMovements(
        { search: product.name, pageSize: 100 },
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(
        response.data.data.every((m) => m.product.name.includes(product.name)),
      ).toBe(true);
    });

    it("honours pagination", async () => {
      const response = await AdminInventoryApi.listMovements(
        { page: 1, pageSize: 1 },
        asAdmin,
      );

      expect(response.status).toBe(200);
      expect(response.data.pagination.pageSize).toBe(1);
      expect(response.data.data).toHaveLength(1);
    });

    it.each([
      ["an unknown type", { type: "TRANSFER" }],
      ["a non numeric productId", { productId: "abc" }],
      ["pageSize above 100", { pageSize: 101 }],
      ["page 0", { page: 0 }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, query) => {
      expectApiError(
        await AdminInventoryApi.listMovements(query, asAdmin),
        400,
        "VALIDATION_ERROR",
      );
    });

    it("returns 401 UNAUTHORIZED without a token", async () => {
      expectApiError(
        await AdminInventoryApi.listMovements({}, NO_AUTH),
        401,
        "UNAUTHORIZED",
      );
    });

    it("returns 403 FORBIDDEN for a CUSTOMER", async () => {
      expectApiError(
        await AdminInventoryApi.listMovements({}, asCustomer),
        403,
        "FORBIDDEN",
      );
    });
  });
});

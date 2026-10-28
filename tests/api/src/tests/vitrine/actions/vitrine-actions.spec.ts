import { VitrineApi } from "../../../domain/vitrine/vitrine-api";
import { expectApiError } from "../../../shared/assertions";
import {
  NON_EXISTENT_ID,
  SEED_CATEGORIES,
  SEED_PRODUCTS,
} from "../../../fixtures/entities/products";

// npx jest src/tests/vitrine/actions/vitrine-actions.spec.ts
describe("Vitrine - Actions", () => {
  describe("GET /categories", () => {
    it("returns 200 with the seed categories", async () => {
      const response = await VitrineApi.categories();

      expect(response.status).toBe(200);
      expect(response.data).toEqual(
        expect.arrayContaining([...SEED_CATEGORIES]),
      );
    });
  });

  describe("GET /products", () => {
    it("returns 200 with the first page using the default pagination", async () => {
      const response = await VitrineApi.listProducts();

      expect(response.status).toBe(200);
      expect(response.data.pagination.page).toBe(1);
      expect(response.data.pagination.pageSize).toBe(10);
      expect(response.data.data.length).toBeLessThanOrEqual(10);
    });

    it("only lists active products", async () => {
      const response = await VitrineApi.listProducts({ pageSize: 100 });

      expect(response.status).toBe(200);
      expect(response.data.data.every((p) => p.active)).toBe(true);
      expect(response.data.data.map((p) => p.sku)).not.toContain(
        SEED_PRODUCTS.inactive.sku,
      );
    });

    it("honours page and pageSize", async () => {
      const response = await VitrineApi.listProducts({ page: 2, pageSize: 5 });

      expect(response.status).toBe(200);
      expect(response.data.pagination).toMatchObject({ page: 2, pageSize: 5 });
      expect(response.data.data).toHaveLength(5);
    });

    it("filters by category", async () => {
      const response = await VitrineApi.listProducts({
        category: "Livros",
        pageSize: 100,
      });

      expect(response.status).toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data.every((p) => p.category === "Livros")).toBe(
        true,
      );
    });

    it("filters by name search", async () => {
      const response = await VitrineApi.listProducts({ search: "Clean Code" });

      expect(response.status).toBe(200);
      expect(response.data.data.map((p) => p.sku)).toContain("LIV-001");
    });

    it("sorts by price ascending", async () => {
      const response = await VitrineApi.listProducts({
        sort: "price_asc",
        pageSize: 100,
      });

      const prices = response.data.data.map((p) => p.price);
      expect(response.status).toBe(200);
      expect(prices).toEqual([...prices].sort((a, b) => a - b));
    });

    it("sorts by price descending", async () => {
      const response = await VitrineApi.listProducts({
        sort: "price_desc",
        pageSize: 100,
      });

      const prices = response.data.data.map((p) => p.price);
      expect(response.status).toBe(200);
      expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });

    it.each([
      ["page 0", { page: 0 }],
      ["pageSize above 100", { pageSize: 101 }],
      ["non numeric page", { page: "abc" }],
      ["unknown sort", { sort: "random" }],
    ])("returns 400 VALIDATION_ERROR for %s", async (_label, query) => {
      const response = await VitrineApi.listProducts(query);

      expectApiError(response, 400, "VALIDATION_ERROR");
    });
  });

  describe("GET /products/{id}", () => {
    it("returns 200 with the requested product", async () => {
      const response = await VitrineApi.getProduct(SEED_PRODUCTS.inStock.id);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        id: SEED_PRODUCTS.inStock.id,
        sku: SEED_PRODUCTS.inStock.sku,
        active: true,
      });
    });

    it("flags a product without stock as not inStock", async () => {
      const response = await VitrineApi.getProduct(SEED_PRODUCTS.outOfStock.id);

      expect(response.status).toBe(200);
      expect(response.data.inStock).toBe(false);
    });

    it("returns 400 VALIDATION_ERROR for a non numeric id", async () => {
      const response = await VitrineApi.getProduct("abc");

      expectApiError(response, 400, "VALIDATION_ERROR");
    });

    it("returns 404 PRODUCT_NOT_FOUND for an unknown id", async () => {
      const response = await VitrineApi.getProduct(NON_EXISTENT_ID);

      expectApiError(response, 404, "PRODUCT_NOT_FOUND");
    });

    it("returns 404 PRODUCT_NOT_FOUND for an inactive product", async () => {
      const response = await VitrineApi.getProduct(SEED_PRODUCTS.inactive.id);

      expectApiError(response, 404, "PRODUCT_NOT_FOUND");
    });
  });
});

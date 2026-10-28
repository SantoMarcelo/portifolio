/**
 * Products created by the backend seed (`backend/src/prisma/seed-data.ts`).
 * IDs are deterministic after `POST /api/test/reset` (insertion order). Use these only for
 * read-only checks — specs that change stock, price or status must create their own product
 * with `ProductFactory` so they never depend on (or corrupt) the seed.
 */
export const SEED_PRODUCTS = {
  /** Plenty of stock. */
  inStock: {
    id: 1,
    sku: "ELE-001",
    name: "Fone de Ouvido Bluetooth",
    category: "Eletrônicos",
    price: 199.9,
  },
  /** Stock is 0 (adding to cart returns OUT_OF_STOCK). */
  outOfStock: {
    id: 7,
    sku: "ELE-007",
    name: "Webcam Full HD",
    category: "Eletrônicos",
    price: 159,
  },
  /** Inactive: hidden from the storefront and cannot be added to the cart. */
  inactive: {
    id: 29,
    sku: "CAS-008",
    name: "Produto Descontinuado",
    category: "Casa",
    price: 10,
  },
} as const;

export const SEED_CATEGORIES = [
  "Eletrônicos",
  "Livros",
  "Roupas",
  "Casa",
] as const;

/** An id that never exists. */
export const NON_EXISTENT_ID = 999999;

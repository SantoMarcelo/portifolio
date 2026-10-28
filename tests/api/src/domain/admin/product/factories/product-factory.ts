import { randomUUID } from "crypto";
import { CreateProductPayload, ProductPayload } from "../product-types";

export class ProductFactory {
  /** Unique SKU so repeated runs never collide with leftovers from previous ones. */
  static uniqueSku(prefix = "QA") {
    return `${prefix}-${randomUUID().slice(0, 8).toUpperCase()}`;
  }

  /** Valid create payload; every field can be overridden. */
  static create(
    overrides: Partial<CreateProductPayload> = {},
  ): CreateProductPayload {
    return {
      name: "Produto QA Automação",
      description: "Produto criado pela automação de testes",
      price: 49.9,
      sku: this.uniqueSku(),
      category: "QA",
      imageUrl: "",
      active: true,
      stock: 10,
      ...overrides,
    };
  }

  /** Valid update payload (PUT does not accept `stock`; it only changes through the inventory API). */
  static update(overrides: Partial<ProductPayload> = {}): ProductPayload {
    const { name, description, price, sku, category, imageUrl, active } =
      this.create();
    return {
      name,
      description,
      price,
      sku,
      category,
      imageUrl,
      active,
      ...overrides,
    };
  }
}

import { z } from "zod";
import { DateTimeSchema, PageQuery, pageOf } from "../../common/common-types";

export const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  sku: z.string(),
  category: z.string(),
  imageUrl: z.string(),
  stock: z.number().int(),
  active: z.boolean(),
  inStock: z.boolean(),
  lowStock: z.boolean(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const ProductPageSchema = pageOf(ProductSchema);

export type ProductType = z.infer<typeof ProductSchema>;

export type ProductSort = "id_asc" | "price_asc" | "price_desc" | "name_asc";

export type ProductsQuery = PageQuery & {
  search?: string;
  category?: string;
  sort?: ProductSort | string;
};

export type AdminProductsQuery = ProductsQuery & { active?: boolean | string };

export type ProductPayload = {
  name: string;
  description?: string;
  price: number;
  sku: string;
  category: string;
  imageUrl?: string;
  active?: boolean;
};

export type CreateProductPayload = ProductPayload & { stock?: number };

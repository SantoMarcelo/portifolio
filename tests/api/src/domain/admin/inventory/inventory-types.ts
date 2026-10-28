import { z } from "zod";
import { DateTimeSchema, PageQuery, pageOf } from "../../common/common-types";
import { ProductSchema } from "../product/product-types";

export const StockMovementTypeSchema = z.enum(["ENTRY", "EXIT", "ADJUSTMENT"]);

export const StockMovementSchema = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  type: StockMovementTypeSchema,
  quantity: z.number().int(),
  previousStock: z.number().int(),
  newStock: z.number().int(),
  reason: z.string(),
  userId: z.number().int(),
  createdAt: DateTimeSchema,
  product: z.object({
    id: z.number().int(),
    name: z.string(),
    sku: z.string(),
  }),
  user: z.object({ id: z.number().int(), name: z.string() }),
});

// The adjust endpoint returns the movement without the `product`/`user` relations that
// swagger.yaml documents (they only come back from the movements list).
export const StockAdjustResponseSchema = z.object({
  product: ProductSchema,
  movement: StockMovementSchema.omit({ product: true, user: true }),
});

export const StockMovementPageSchema = pageOf(StockMovementSchema);

export type StockMovementType = z.infer<typeof StockMovementTypeSchema>;
export type StockMovementEntity = z.infer<typeof StockMovementSchema>;
export type StockAdjustResponseType = z.infer<typeof StockAdjustResponseSchema>;

/** ENTRY/EXIT: amount to add/remove (> 0). ADJUSTMENT: new absolute stock (>= 0). */
export type StockAdjustPayload = {
  type: StockMovementType | string;
  quantity: number;
  reason: string;
};

export type MovementsQuery = PageQuery & {
  productId?: number | string;
  search?: string;
  type?: StockMovementType | string;
};

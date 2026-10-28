import { z } from "zod";

export const CartItemSchema = z.object({
  productId: z.number().int(),
  name: z.string(),
  sku: z.string(),
  imageUrl: z.string(),
  unitPrice: z.number(),
  quantity: z.number().int(),
  subtotal: z.number(),
  stock: z.number().int(),
  available: z.boolean(),
});

export const CartSchema = z.object({
  id: z.number().int(),
  items: z.array(CartItemSchema),
  totalItems: z.number().int(),
  total: z.number(),
});

export type CartType = z.infer<typeof CartSchema>;
export type AddCartItemPayload = { productId: number; quantity?: number };
export type UpdateCartItemPayload = { quantity: number };

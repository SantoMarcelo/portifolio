import { z } from 'zod';

const quantity = z
  .number('Quantidade deve ser um número')
  .int('Quantidade deve ser inteira')
  .min(1, 'Quantidade deve ser no mínimo 1')
  .max(999, 'Quantidade máxima é 999');

export const addItemSchema = z.object({
  productId: z.number('productId deve ser um número').int().positive('productId inválido'),
  quantity: quantity.default(1),
});

export const updateItemSchema = z.object({ quantity });

export const productIdParamSchema = z.object({
  productId: z.coerce.number('productId deve ser numérico').int().positive('productId inválido'),
});

export type AddItemInput = z.infer<typeof addItemSchema>;

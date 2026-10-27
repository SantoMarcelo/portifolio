import { z } from 'zod';
import { paginationSchema } from '../../utils/pagination';

const price = z
  .number('Preço deve ser um número')
  .positive('Preço deve ser maior que zero')
  .max(1_000_000, 'Preço máximo é 1.000.000')
  .refine((v) => Math.round(v * 100) / 100 === v, 'Preço deve ter no máximo 2 casas decimais');

const fields = {
  name: z.string('Nome obrigatório').trim().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z.string().trim().max(1000, 'Descrição deve ter no máximo 1000 caracteres').default(''),
  price,
  sku: z.string('SKU obrigatório').trim().min(1, 'SKU obrigatório').max(50, 'SKU deve ter no máximo 50 caracteres'),
  category: z.string('Categoria obrigatória').trim().min(1, 'Categoria obrigatória').max(50),
  imageUrl: z.string().trim().max(500).default(''),
  active: z.boolean().default(true),
};

/** Criação: aceita estoque inicial (gera movimentação ENTRY). */
export const createProductSchema = z.object({
  ...fields,
  stock: z.number('Estoque deve ser um número').int('Estoque deve ser inteiro').min(0, 'Estoque não pode ser negativo').default(0),
});

/** Edição: o estoque só muda pelos endpoints de estoque (para manter o histórico). */
export const updateProductSchema = z.object(fields);

export const PRODUCT_SORTS = ['id_asc', 'price_asc', 'price_desc', 'name_asc'] as const;

export const listProductsQuerySchema = paginationSchema.extend({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  sort: z.enum(PRODUCT_SORTS).default('id_asc'),
});

export const adminListProductsQuerySchema = listProductsQuerySchema.extend({
  active: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ListProductsQuery = z.infer<typeof adminListProductsQuerySchema>;

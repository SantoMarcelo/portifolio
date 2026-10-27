import { z } from 'zod';
import { STOCK_MOVEMENT_TYPES } from '../../constants';
import { paginationSchema } from '../../utils/pagination';

export const stockAdjustSchema = z.object({
  type: z.enum(STOCK_MOVEMENT_TYPES, 'Tipo deve ser ENTRY, EXIT ou ADJUSTMENT'),
  // ENTRY/EXIT: quantidade a somar/subtrair (> 0). ADJUSTMENT: novo estoque absoluto (>= 0).
  quantity: z.number('Quantidade deve ser um número').int('Quantidade deve ser inteira'),
  reason: z.string('Motivo obrigatório').trim().min(3, 'Motivo deve ter no mínimo 3 caracteres').max(200),
}).superRefine((v, ctx) => {
  if (v.type === 'ADJUSTMENT' && v.quantity < 0) {
    ctx.addIssue({ code: 'custom', path: ['quantity'], message: 'Novo estoque não pode ser negativo' });
  }
  if (v.type !== 'ADJUSTMENT' && v.quantity <= 0) {
    ctx.addIssue({ code: 'custom', path: ['quantity'], message: 'Quantidade deve ser maior que zero' });
  }
});

export const movementsQuerySchema = paginationSchema.extend({
  productId: z.coerce.number().int().positive().optional(),
  type: z.enum(STOCK_MOVEMENT_TYPES).optional(),
});

export type StockAdjustInput = z.infer<typeof stockAdjustSchema>;
export type MovementsQuery = z.infer<typeof movementsQuerySchema>;

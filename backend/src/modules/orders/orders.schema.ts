import { z } from 'zod';
import { ORDER_STATUSES } from '../../constants';
import { paginationSchema } from '../../utils/pagination';
import { paymentSchema } from '../payments/payments.schema';

const optionalCoupon = z.string().trim().max(30).optional();

export const quoteSchema = z.object({ couponCode: optionalCoupon });

export const addressSchema = z.object({
  street: z.string('Rua obrigatória').trim().min(2, 'Rua obrigatória').max(150),
  number: z.string('Número obrigatório').trim().min(1, 'Número obrigatório').max(10),
  complement: z.string().trim().max(100).optional(),
  district: z.string('Bairro obrigatório').trim().min(2, 'Bairro obrigatório').max(100),
  city: z.string('Cidade obrigatória').trim().min(2, 'Cidade obrigatória').max(100),
  state: z.string('UF obrigatória').trim().toUpperCase().length(2, 'UF deve ter 2 letras'),
  zip: z.string('CEP obrigatório').trim().regex(/^\d{5}-?\d{3}$/, 'CEP inválido (use 00000-000)'),
});

export const createOrderSchema = z.object({
  address: addressSchema,
  payment: paymentSchema,
  couponCode: optionalCoupon,
});

export const listOrdersQuerySchema = paginationSchema.extend({
  status: z.enum(ORDER_STATUSES).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type ListOrdersQuery = z.infer<typeof listOrdersQuerySchema>;

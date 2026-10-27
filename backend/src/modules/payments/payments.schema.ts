import { z } from 'zod';

const cardNumber = z
  .string('Número do cartão obrigatório')
  .refine((v) => /^\d{13,19}$/.test(v.replace(/[\s-]/g, '')), 'Número do cartão deve ter de 13 a 19 dígitos');

export const paymentSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('CREDIT_CARD'),
    cardNumber,
    cardHolder: z.string().trim().min(2).max(100).optional(),
  }),
  z.object({ method: z.literal('PIX') }),
  z.object({ method: z.literal('BOLETO') }),
]);

export type PaymentInput = z.infer<typeof paymentSchema>;

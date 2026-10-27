import type { PaymentInput } from './payments.schema';

export type PaymentOutcome = 'APPROVED' | 'DECLINED' | 'UNAVAILABLE';

export interface PaymentResult {
  outcome: PaymentOutcome;
  cardLast4: string | null;
}

/**
 * Pagamento simulado e determinístico (nenhuma integração externa):
 *  - cartão final 0000 → aprovado | 1111 → recusado | 2222 → indisponível (503) | outros → aprovado
 *  - PIX e boleto → sempre aprovados
 */
export function processPayment(payment: PaymentInput): PaymentResult {
  if (payment.method !== 'CREDIT_CARD') return { outcome: 'APPROVED', cardLast4: null };

  const cardLast4 = payment.cardNumber.replace(/\D/g, '').slice(-4);
  if (cardLast4 === '1111') return { outcome: 'DECLINED', cardLast4 };
  if (cardLast4 === '2222') return { outcome: 'UNAVAILABLE', cardLast4 };
  return { outcome: 'APPROVED', cardLast4 };
}

import { describe, expect, it } from 'vitest';
import { processPayment } from './payments.service';

const card = (cardNumber: string) => processPayment({ method: 'CREDIT_CARD', cardNumber });

describe('processPayment', () => {
  it.each([
    ['4111111111110000', 'APPROVED'],
    ['4111 1111 1111 1111', 'DECLINED'],
    ['4111-1111-1111-2222', 'UNAVAILABLE'],
    ['4111111111113333', 'APPROVED'],
  ])('cartão %s → %s', (n, outcome) => expect(card(n).outcome).toBe(outcome));

  it('guarda apenas os 4 últimos dígitos', () => expect(card('4111 1111 1111 0000').cardLast4).toBe('0000'));
  it('PIX e boleto sempre aprovados', () => {
    expect(processPayment({ method: 'PIX' })).toEqual({ outcome: 'APPROVED', cardLast4: null });
    expect(processPayment({ method: 'BOLETO' }).outcome).toBe('APPROVED');
  });
});

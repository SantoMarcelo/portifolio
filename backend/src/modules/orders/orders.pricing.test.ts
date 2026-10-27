import { describe, expect, it } from 'vitest';
import { calculateTotals } from './orders.pricing';

describe('calculateTotals', () => {
  it('frete fixo de 15 abaixo de 200', () => {
    expect(calculateTotals(100)).toEqual({ subtotal: 100, discount: 0, shipping: 15, total: 115, couponCode: null });
  });
  it('subtotal exatamente 200 ainda paga frete', () => expect(calculateTotals(200).shipping).toBe(15));
  it('subtotal acima de 200 tem frete grátis', () => expect(calculateTotals(200.01).shipping).toBe(0));
  it('PROMO10 dá 10% sobre o subtotal', () => {
    expect(calculateTotals(100, 'PROMO10')).toMatchObject({ discount: 10, shipping: 15, total: 105 });
  });
  it('PROMO10 + subtotal > 200: desconto e frete grátis', () => {
    expect(calculateTotals(300, 'promo10')).toMatchObject({ discount: 30, shipping: 0, total: 270, couponCode: 'PROMO10' });
  });
  it('frete grátis é avaliado antes do desconto (210 com PROMO10 → frete 0)', () => {
    expect(calculateTotals(210, 'PROMO10')).toMatchObject({ discount: 21, shipping: 0, total: 189 });
  });
  it('FRETEGRATIS zera o frete sem desconto', () => {
    expect(calculateTotals(50, ' fretegratis ')).toMatchObject({ discount: 0, shipping: 0, total: 50 });
  });
  it('cupom vazio é ignorado', () => expect(calculateTotals(50, '  ').couponCode).toBeNull());
  it('cupom desconhecido → 422 INVALID_COUPON', () => {
    expect(() => calculateTotals(50, 'XPTO')).toThrowError(expect.objectContaining({ status: 422, code: 'INVALID_COUPON' }));
  });
});

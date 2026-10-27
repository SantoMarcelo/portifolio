import { AppError } from '../../utils/app-error';
import { round2 } from '../../utils/money';

export const SHIPPING_FEE = 15;
/** Frete grátis para subtotal ESTRITAMENTE maior que este valor (antes do desconto). */
export const FREE_SHIPPING_THRESHOLD = 200;
export const COUPONS = ['PROMO10', 'FRETEGRATIS'] as const;

export function normalizeCoupon(code?: string | null): string | null {
  const normalized = code?.trim().toUpperCase();
  return normalized ? normalized : null;
}

export interface Totals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode: string | null;
}

/** Regras de preço: cupom (PROMO10 = 10% do subtotal; FRETEGRATIS = frete zero) e frete fixo. */
export function calculateTotals(subtotal: number, couponInput?: string | null): Totals {
  const couponCode = normalizeCoupon(couponInput);
  if (couponCode && !(COUPONS as readonly string[]).includes(couponCode)) {
    throw AppError.unprocessable('INVALID_COUPON', 'Cupom inválido');
  }

  const sub = round2(subtotal);
  const discount = couponCode === 'PROMO10' ? round2(sub * 0.1) : 0;
  const freeShipping = couponCode === 'FRETEGRATIS' || sub > FREE_SHIPPING_THRESHOLD;
  const shipping = freeShipping ? 0 : SHIPPING_FEE;

  return { subtotal: sub, discount, shipping, total: round2(sub - discount + shipping), couponCode };
}

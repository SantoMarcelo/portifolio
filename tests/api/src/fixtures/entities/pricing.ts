/** Pricing rules of the backend (`backend/src/modules/orders/orders.pricing.ts`). */
export const PRICING = {
  SHIPPING_FEE: 15,
  /** Free shipping when the subtotal is strictly greater than this value. */
  FREE_SHIPPING_THRESHOLD: 200,
  /** `PROMO10` = 10% off the subtotal, `FRETEGRATIS` = free shipping. */
  COUPONS: { PERCENT_OFF: "PROMO10", FREE_SHIPPING: "FRETEGRATIS" },
  INVALID_COUPON: "CUPOMINVALIDO",
} as const;

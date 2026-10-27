export const ROLES = ['ADMIN', 'CUSTOMER'] as const;
export type Role = (typeof ROLES)[number];

export const STOCK_MOVEMENT_TYPES = ['ENTRY', 'EXIT', 'ADJUSTMENT'] as const;
export type StockMovementType = (typeof STOCK_MOVEMENT_TYPES)[number];

export const ORDER_STATUSES = ['PENDING', 'PAID', 'PAYMENT_FAILED', 'CANCELLED'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_METHODS = ['CREDIT_CARD', 'PIX', 'BOLETO'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const LOW_STOCK_THRESHOLD = 5;

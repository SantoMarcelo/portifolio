import { z } from "zod";
import { DateTimeSchema, PageQuery, pageOf } from "../common/common-types";

export const OrderStatusSchema = z.enum([
  "PENDING",
  "PAID",
  "PAYMENT_FAILED",
  "CANCELLED",
]);
export const PaymentMethodSchema = z.enum(["CREDIT_CARD", "PIX", "BOLETO"]);

export const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complement: z.string().nullable().optional(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const OrderItemSchema = z.object({
  productId: z.number().int(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  subtotal: z.number(),
});

export const OrderSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  // Only present in the admin view.
  user: z
    .object({ id: z.number().int(), name: z.string(), email: z.string() })
    .optional(),
  status: OrderStatusSchema,
  subtotal: z.number(),
  discount: z.number(),
  shipping: z.number(),
  total: z.number(),
  couponCode: z.string().nullable(),
  paymentMethod: PaymentMethodSchema,
  cardLast4: z.string().nullable(),
  address: AddressSchema,
  items: z.array(OrderItemSchema),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
});

export const OrderPageSchema = pageOf(OrderSchema);

export const QuoteSchema = z.object({
  items: z.array(z.looseObject({})),
  totalItems: z.number().int(),
  subtotal: z.number(),
  discount: z.number(),
  shipping: z.number(),
  total: z.number(),
  couponCode: z.string().nullable(),
});

export type OrderType = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
export type QuoteType = z.infer<typeof QuoteSchema>;

export type AddressPayload = {
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  zip: string;
};

export type PaymentPayload =
  | { method: "CREDIT_CARD"; cardNumber: string; cardHolder?: string }
  | { method: "PIX" }
  | { method: "BOLETO" };

export type CreateOrderPayload = {
  address: AddressPayload;
  payment: PaymentPayload;
  couponCode?: string;
};

export type OrdersQuery = PageQuery & { status?: OrderStatus | string };

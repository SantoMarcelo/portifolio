import {
  AddressPayload,
  CreateOrderPayload,
  PaymentPayload,
} from "../checkout-orders-types";

/**
 * Card numbers are decided by their last 4 digits (see backend `payments.service.ts`):
 * `1111` is declined, `2222` makes the gateway unavailable, anything else is approved.
 */
export const CARD_NUMBERS = {
  APPROVED: "4242424242424242",
  DECLINED: "4111111111111111",
  GATEWAY_UNAVAILABLE: "4111111111112222",
} as const;

export class OrderFactory {
  static address(overrides: Partial<AddressPayload> = {}): AddressPayload {
    return {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      district: "Centro",
      city: "São Paulo",
      state: "SP",
      zip: "01001-000",
      ...overrides,
    };
  }

  static pix(): PaymentPayload {
    return { method: "PIX" };
  }

  static boleto(): PaymentPayload {
    return { method: "BOLETO" };
  }

  static card(cardNumber: string = CARD_NUMBERS.APPROVED): PaymentPayload {
    return { method: "CREDIT_CARD", cardNumber, cardHolder: "Cliente Teste" };
  }

  /** Valid order paid with PIX; every part can be overridden. */
  static create(
    overrides: Partial<CreateOrderPayload> = {},
  ): CreateOrderPayload {
    return {
      address: this.address(),
      payment: this.pix(),
      ...overrides,
    };
  }
}

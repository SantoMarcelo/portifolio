import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { CheckoutOrdersEndpoints } from "../../shared/endpoints";
import { buildEndpoint } from "../../shared/helpers";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import { anyStatus } from "../../shared/request-options";
import { PageOf } from "../common/common-types";
import {
  CreateOrderPayload,
  OrdersQuery,
  OrderType,
  QuoteType,
} from "./checkout-orders-types";

/** Customer checkout and order history. CUSTOMER only: 401 without token, 403 for ADMIN. */
export class CheckoutOrdersApi {
  /** Prices the current cart (subtotal, coupon, shipping) without creating an order. */
  static quote(
    body: { couponCode?: string } | object = {},
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<QuoteType>(
      `${config.baseURL}${CheckoutOrdersEndpoints.QUOTE}`,
      body,
      anyStatus(options),
    );
  }

  /** Turns the current cart into an order and charges the payment. */
  static createOrder(
    body: CreateOrderPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<OrderType>(
      `${config.baseURL}${CheckoutOrdersEndpoints.ORDERS}`,
      body,
      anyStatus(options),
    );
  }

  static listOrders(query?: OrdersQuery, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<PageOf<OrderType>>(
      `${config.baseURL}${CheckoutOrdersEndpoints.ORDERS}`,
      anyStatus({ params: query, ...options }),
    );
  }

  static getOrder(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<OrderType>(
      `${config.baseURL}${buildEndpoint(CheckoutOrdersEndpoints.ORDER_BY_ID, { id })}`,
      anyStatus(options),
    );
  }

  /** Only `PAID` orders can be cancelled; the stock is returned. */
  static cancelOrder(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<OrderType>(
      `${config.baseURL}${buildEndpoint(CheckoutOrdersEndpoints.CANCEL, { id })}`,
      undefined,
      anyStatus(options),
    );
  }
}

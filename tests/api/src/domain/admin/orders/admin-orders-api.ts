import { AxiosRequestConfig } from "axios";
import { config } from "../../../config/config";
import { AdminOrdersEndpoints } from "../../../shared/endpoints";
import { buildEndpoint } from "../../../shared/helpers";
import { HttpClientAdapter } from "../../../shared/http-client-adapter";
import { anyStatus } from "../../../shared/request-options";
import { PageOf } from "../../common/common-types";
import {
  OrdersQuery,
  OrderType,
} from "../../checkoutOrders/checkout-orders-types";

/** Orders of every customer. Requires an ADMIN session (401 without token, 403 for CUSTOMER). */
export class AdminOrdersApi {
  static list(query?: OrdersQuery, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<PageOf<OrderType>>(
      `${config.baseURL}${AdminOrdersEndpoints.ORDERS}`,
      anyStatus({ params: query, ...options }),
    );
  }

  static getById(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<OrderType>(
      `${config.baseURL}${buildEndpoint(AdminOrdersEndpoints.ORDER_BY_ID, { id })}`,
      anyStatus(options),
    );
  }

  static cancel(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.post<OrderType>(
      `${config.baseURL}${buildEndpoint(AdminOrdersEndpoints.CANCEL, { id })}`,
      undefined,
      anyStatus(options),
    );
  }
}

import { AxiosRequestConfig } from "axios";
import { config } from "../../../config/config";
import { AdminInventoryEndpoints } from "../../../shared/endpoints";
import { buildEndpoint } from "../../../shared/helpers";
import { HttpClientAdapter } from "../../../shared/http-client-adapter";
import { anyStatus } from "../../../shared/request-options";
import { PageOf } from "../../common/common-types";
import {
  MovementsQuery,
  StockAdjustPayload,
  StockAdjustResponseType,
  StockMovementEntity,
} from "./inventory-types";

/** Admin stock control. Requires an ADMIN session (401 without token, 403 for CUSTOMER). */
export class AdminInventoryApi {
  static adjustStock(
    productId: number | string,
    body: StockAdjustPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<StockAdjustResponseType>(
      `${config.baseURL}${buildEndpoint(AdminInventoryEndpoints.PRODUCT_STOCK, { id: productId })}`,
      body,
      anyStatus(options),
    );
  }

  static listMovements(query?: MovementsQuery, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<PageOf<StockMovementEntity>>(
      `${config.baseURL}${AdminInventoryEndpoints.MOVEMENTS}`,
      anyStatus({ params: query, ...options }),
    );
  }
}

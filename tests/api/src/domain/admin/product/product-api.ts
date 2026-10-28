import { AxiosRequestConfig } from "axios";
import { config } from "../../../config/config";
import { AdminProductEndpoints } from "../../../shared/endpoints";
import { buildEndpoint } from "../../../shared/helpers";
import { HttpClientAdapter } from "../../../shared/http-client-adapter";
import { anyStatus } from "../../../shared/request-options";
import { PageOf } from "../../common/common-types";
import {
  AdminProductsQuery,
  CreateProductPayload,
  ProductPayload,
  ProductType,
} from "./product-types";

/** Admin catalogue management. Requires an ADMIN session (401 without token, 403 for CUSTOMER). */
export class AdminProductApi {
  static list(query?: AdminProductsQuery, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<PageOf<ProductType>>(
      `${config.baseURL}${AdminProductEndpoints.PRODUCTS}`,
      anyStatus({ params: query, ...options }),
    );
  }

  static getById(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<ProductType>(
      `${config.baseURL}${buildEndpoint(AdminProductEndpoints.PRODUCT_BY_ID, { id })}`,
      anyStatus(options),
    );
  }

  static create(
    body: CreateProductPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<ProductType>(
      `${config.baseURL}${AdminProductEndpoints.PRODUCTS}`,
      body,
      anyStatus(options),
    );
  }

  static update(
    id: number | string,
    body: ProductPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.put<ProductType>(
      `${config.baseURL}${buildEndpoint(AdminProductEndpoints.PRODUCT_BY_ID, { id })}`,
      body,
      anyStatus(options),
    );
  }

  /** Soft delete: the product is only marked `active: false`. */
  static delete(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.delete<void>(
      `${config.baseURL}${buildEndpoint(AdminProductEndpoints.PRODUCT_BY_ID, { id })}`,
      undefined,
      anyStatus(options),
    );
  }
}

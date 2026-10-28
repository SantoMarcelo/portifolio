import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { VitrineEndpoints } from "../../shared/endpoints";
import { buildEndpoint } from "../../shared/helpers";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import { anyStatus } from "../../shared/request-options";
import { PageOf } from "../common/common-types";
import { ProductsQuery, ProductType } from "../admin/product/product-types";

/** Public storefront: no authentication required, only active products are visible. */
export class VitrineApi {
  static categories(options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<string[]>(
      `${config.baseURL}${VitrineEndpoints.CATEGORIES}`,
      anyStatus(options),
    );
  }

  static listProducts(query?: ProductsQuery, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<PageOf<ProductType>>(
      `${config.baseURL}${VitrineEndpoints.PRODUCTS}`,
      anyStatus({ params: query, ...options }),
    );
  }

  static getProduct(id: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<ProductType>(
      `${config.baseURL}${buildEndpoint(VitrineEndpoints.PRODUCT_BY_ID, { id })}`,
      anyStatus(options),
    );
  }
}

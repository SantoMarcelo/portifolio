import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { CartEndpoints } from "../../shared/endpoints";
import { buildEndpoint } from "../../shared/helpers";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import { anyStatus } from "../../shared/request-options";
import {
  AddCartItemPayload,
  CartType,
  UpdateCartItemPayload,
} from "./cart-types";

/** Shopping cart. CUSTOMER only: 401 without token, 403 for ADMIN. */
export class CartApi {
  static get(options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<CartType>(
      `${config.baseURL}${CartEndpoints.CART}`,
      anyStatus(options),
    );
  }

  static clear(options?: AxiosRequestConfig) {
    return HttpClientAdapter.delete<void>(
      `${config.baseURL}${CartEndpoints.CART}`,
      undefined,
      anyStatus(options),
    );
  }

  /** Adds `quantity` (default 1); when the product is already in the cart the quantity is summed. */
  static addItem(
    body: AddCartItemPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.post<CartType>(
      `${config.baseURL}${CartEndpoints.ITEMS}`,
      body,
      anyStatus(options),
    );
  }

  /** Sets the absolute quantity of an item already in the cart. */
  static updateItem(
    productId: number | string,
    body: UpdateCartItemPayload | object,
    options?: AxiosRequestConfig,
  ) {
    return HttpClientAdapter.patch<CartType>(
      `${config.baseURL}${buildEndpoint(CartEndpoints.ITEM_BY_PRODUCT, { productId })}`,
      body,
      anyStatus(options),
    );
  }

  static removeItem(productId: number | string, options?: AxiosRequestConfig) {
    return HttpClientAdapter.delete<CartType>(
      `${config.baseURL}${buildEndpoint(CartEndpoints.ITEM_BY_PRODUCT, { productId })}`,
      undefined,
      anyStatus(options),
    );
  }
}

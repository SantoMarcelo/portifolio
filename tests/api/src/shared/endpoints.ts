/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
/**
 * Endpoint enums.
 *
 * One enum per domain/feature, values are paths relative to `config.baseURL`.
 * Never hardcode URL strings elsewhere — reference these enums. Path parameters use the
 * `{param}` syntax and are resolved with `buildEndpoint()` from `helpers.ts`.
 *
 * Exception: `HealthEndpoints` and `TestUtilsEndpoints` are served outside the versioned API
 * prefix, so they are relative to `config.serverURL` instead.
 */

/** Relative to `config.serverURL`. */
export enum HealthEndpoints {
  HEALTH = "/api/health",
}

/** Relative to `config.serverURL`. Only available when the backend is not in production. */
export enum TestUtilsEndpoints {
  RESET = "/api/test/reset",
  SEED = "/api/test/seed",
  TOKEN = "/api/test/token",
  EXPIRED_TOKEN = "/api/test/expired-token",
}

export enum AuthEndpoints {
  REGISTER = "/auth/register",
  LOGIN = "/auth/login",
  LOGOUT = "/auth/logout",
  ME = "/auth/me",
}

/** Public storefront. */
export enum VitrineEndpoints {
  CATEGORIES = "/categories",
  PRODUCTS = "/products",
  PRODUCT_BY_ID = "/products/{id}",
}

export enum AdminProductEndpoints {
  PRODUCTS = "/admin/products",
  PRODUCT_BY_ID = "/admin/products/{id}",
}

export enum AdminInventoryEndpoints {
  PRODUCT_STOCK = "/admin/products/{id}/stock",
  MOVEMENTS = "/admin/stock/movements",
}

export enum AdminDashboardEndpoints {
  DASHBOARD = "/admin/dashboard",
}

export enum AdminOrdersEndpoints {
  ORDERS = "/admin/orders",
  ORDER_BY_ID = "/admin/orders/{id}",
  CANCEL = "/admin/orders/{id}/cancel",
}

export enum CartEndpoints {
  CART = "/cart",
  ITEMS = "/cart/items",
  ITEM_BY_PRODUCT = "/cart/items/{productId}",
}

export enum CheckoutOrdersEndpoints {
  QUOTE = "/checkout/quote",
  ORDERS = "/orders",
  ORDER_BY_ID = "/orders/{id}",
  CANCEL = "/orders/{id}/cancel",
}

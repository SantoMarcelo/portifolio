import { AxiosRequestConfig } from "axios";
import { AdminProductApi } from "../admin/product/product-api";
import { ProductFactory } from "../admin/product/factories/product-factory";
import {
  CreateProductPayload,
  ProductType,
} from "../admin/product/product-types";
import { CartApi } from "../cart/cart-api";
import { CheckoutOrdersApi } from "./checkout-orders-api";
import { OrderFactory } from "./factories/order-factory";
import { CreateOrderPayload, OrderType } from "./checkout-orders-types";

/**
 * Multi-step setups shared by the order specs. They throw on any unexpected status so a broken
 * setup surfaces as a clear error instead of a misleading assertion later in the test.
 */
export class OrderScenario {
  /** Creates a fresh, active product through the admin API. */
  static async createProduct(
    admin: AxiosRequestConfig,
    overrides: Partial<CreateProductPayload> = {},
  ): Promise<ProductType> {
    const response = await AdminProductApi.create(
      ProductFactory.create(overrides),
      admin,
    );
    if (response.status !== 201) {
      throw new Error(
        `Setup failed: could not create product (${response.status})`,
      );
    }
    return response.data;
  }

  /** Empties the customer's cart and adds `quantity` units of `product`. */
  static async fillCart(
    customer: AxiosRequestConfig,
    product: ProductType,
    quantity = 1,
  ) {
    await CartApi.clear(customer);
    const response = await CartApi.addItem(
      { productId: product.id, quantity },
      customer,
    );
    if (response.status !== 201) {
      throw new Error(
        `Setup failed: could not add product ${product.id} to cart (${response.status})`,
      );
    }
  }

  /** Creates a product, fills the customer's cart with it and places a PAID order. */
  static async placeOrder(
    sessions: { admin: AxiosRequestConfig; customer: AxiosRequestConfig },
    options: {
      quantity?: number;
      productOverrides?: Partial<CreateProductPayload>;
      order?: Partial<CreateOrderPayload>;
    } = {},
  ): Promise<{ product: ProductType; order: OrderType }> {
    const { quantity = 1, productOverrides = {}, order = {} } = options;
    const product = await this.createProduct(sessions.admin, {
      stock: 10,
      ...productOverrides,
    });
    await this.fillCart(sessions.customer, product, quantity);

    const response = await CheckoutOrdersApi.createOrder(
      OrderFactory.create(order),
      sessions.customer,
    );
    if (response.status !== 201) {
      throw new Error(
        `Setup failed: could not place order (${response.status})`,
      );
    }
    return { product, order: response.data };
  }
}

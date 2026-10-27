import { HttpService } from "../../services/httpService";
import { config } from "../../config/config";

describe("Health - Health Check", () => {
  it("GET /api/health deve retornar 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/health`);
    expect(response.status).toBe(200);
  });
});

describe("Auth - Health Check", () => {
  it("POST /api/v1/auth/register deve retornar 200", async () => {
    const body = {
      name: "string",
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/register`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/auth/login deve retornar 200", async () => {
    const body = {
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/login`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/auth/logout deve retornar 200", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/logout`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/auth/me deve retornar 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/auth/me`);
    expect(response.status).toBe(200);
  });
});

describe("Vitrine - Health Check", () => {
  it("GET /api/v1/categories deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/categories`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/products?search=example&category=example&sort=example&page=1&pageSize=1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products?search=example&category=example&sort=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/products/1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products/1`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Admin - Produtos - Health Check", () => {
  it("GET /api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/admin/products deve retornar 200", async () => {
    const body = {
      name: "string",
      description: "string",
      price: 0,
      sku: "string",
      category: "string",
      imageUrl: "string",
      active: true,
      stock: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/products/1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(200);
  });

  it("PUT /api/v1/admin/products/1 deve retornar 200", async () => {
    const body = {
      name: "string",
      description: "string",
      price: 0,
      sku: "string",
      category: "string",
      imageUrl: "string",
      active: true,
    };
    const response = await HttpService.put(
      `${config.baseURL}/api/v1/admin/products/1`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("DELETE /api/v1/admin/products/1 deve retornar 200", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Admin - Estoque - Health Check", () => {
  it("POST /api/v1/admin/products/1/stock deve retornar 200", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/dashboard deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/dashboard`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Carrinho - Health Check", () => {
  it("GET /api/v1/cart deve retornar 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(200);
  });

  it("DELETE /api/v1/cart deve retornar 200", async () => {
    const response = await HttpService.delete(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/cart/items deve retornar 200", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("PATCH /api/v1/cart/items/1 deve retornar 200", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("DELETE /api/v1/cart/items/1 deve retornar 200", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Checkout e Pedidos - Health Check", () => {
  it("POST /api/v1/checkout/quote deve retornar 200", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/orders deve retornar 200", async () => {
    const body = {
      address: {
        street: "string",
        number: "string",
        complement: "string",
        district: "string",
        city: "string",
        state: "string",
        zip: "string",
      },
      payment: null,
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/orders?status=example&page=1&pageSize=1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/orders/1 deve retornar 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/orders/1/cancel deve retornar 200", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Admin - Pedidos - Health Check", () => {
  it("GET /api/v1/admin/orders?status=example&page=1&pageSize=1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/orders/1 deve retornar 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/admin/orders/1/cancel deve retornar 200", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(200);
  });
});

describe("Test utils - Health Check", () => {
  it("POST /api/test/reset deve retornar 200", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/reset`);
    expect(response.status).toBe(200);
  });

  it("POST /api/test/seed deve retornar 200", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/seed`);
    expect(response.status).toBe(200);
  });

  it("POST /api/test/token deve retornar 200", async () => {
    const body = {
      email: "string",
      expiresInSeconds: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/token`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/test/expired-token deve retornar 200", async () => {
    const body = {
      email: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/expired-token`,
      body,
    );
    expect(response.status).toBe(200);
  });
});

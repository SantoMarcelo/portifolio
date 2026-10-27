import { HttpService } from "../../services/httpService";
import { config } from "../../config/config";

describe("Health - Functional Tests", () => {
  it("GET /api/health - deve retornar status 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/health`);
    expect(response.status).toBe(200);
  });

  it("GET /api/health - deve retornar status 503", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/health`);
    expect(response.status).toBe(503);
  });
});

describe("Auth - Functional Tests", () => {
  it("POST /api/v1/auth/register - deve retornar status 201", async () => {
    const body = {
      name: "string",
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/register`,
      body,
    );
    expect(response.status).toBe(201);
  });

  it("POST /api/v1/auth/register - deve retornar status 400", async () => {
    const body = {
      name: "string",
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/register`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/auth/register - deve retornar status 409", async () => {
    const body = {
      name: "string",
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/register`,
      body,
    );
    expect(response.status).toBe(409);
  });

  it("POST /api/v1/auth/login - deve retornar status 200", async () => {
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

  it("POST /api/v1/auth/login - deve retornar status 400", async () => {
    const body = {
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/login`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/auth/login - deve retornar status 401", async () => {
    const body = {
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/login`,
      body,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/auth/logout - deve retornar status 204", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/logout`,
    );
    expect(response.status).toBe(204);
  });

  it("POST /api/v1/auth/logout - deve retornar status 401", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/logout`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/auth/me - deve retornar status 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/auth/me`);
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/auth/me - deve retornar status 401", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/auth/me`);
    expect(response.status).toBe(401);
  });
});

describe("Vitrine - Functional Tests", () => {
  it("GET /api/v1/categories - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/categories`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/products - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products?search=example&category=example&sort=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/products - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products?search=example&category=example&sort=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/products/{id} - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products/1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/products/{id} - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products/1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/products/{id} - deve retornar status 404", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products/1`,
    );
    expect(response.status).toBe(404);
  });
});

describe("Admin - Produtos - Functional Tests", () => {
  it("GET /api/v1/admin/products - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/products - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/admin/products - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/products - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/admin/products - deve retornar status 201", async () => {
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
    expect(response.status).toBe(201);
  });

  it("POST /api/v1/admin/products - deve retornar status 400", async () => {
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
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/admin/products - deve retornar status 401", async () => {
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
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/admin/products - deve retornar status 403", async () => {
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
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/admin/products - deve retornar status 409", async () => {
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
    expect(response.status).toBe(409);
  });

  it("GET /api/v1/admin/products/{id} - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/products/{id} - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/admin/products/{id} - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/products/{id} - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/admin/products/{id} - deve retornar status 404", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(404);
  });

  it("PUT /api/v1/admin/products/{id} - deve retornar status 200", async () => {
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

  it("PUT /api/v1/admin/products/{id} - deve retornar status 400", async () => {
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
    expect(response.status).toBe(400);
  });

  it("PUT /api/v1/admin/products/{id} - deve retornar status 401", async () => {
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
    expect(response.status).toBe(401);
  });

  it("PUT /api/v1/admin/products/{id} - deve retornar status 403", async () => {
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
    expect(response.status).toBe(403);
  });

  it("PUT /api/v1/admin/products/{id} - deve retornar status 404", async () => {
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
    expect(response.status).toBe(404);
  });

  it("PUT /api/v1/admin/products/{id} - deve retornar status 409", async () => {
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
    expect(response.status).toBe(409);
  });

  it("DELETE /api/v1/admin/products/{id} - deve retornar status 204", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(204);
  });

  it("DELETE /api/v1/admin/products/{id} - deve retornar status 400", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(400);
  });

  it("DELETE /api/v1/admin/products/{id} - deve retornar status 401", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(401);
  });

  it("DELETE /api/v1/admin/products/{id} - deve retornar status 403", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(403);
  });

  it("DELETE /api/v1/admin/products/{id} - deve retornar status 404", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    expect(response.status).toBe(404);
  });
});

describe("Admin - Estoque - Functional Tests", () => {
  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 201", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(201);
  });

  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 400", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 401", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 403", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 404", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/admin/products/{id}/stock - deve retornar status 409", async () => {
    const body = {
      type: "string",
      quantity: 0,
      reason: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/products/1/stock`,
      body,
    );
    expect(response.status).toBe(409);
  });

  it("GET /api/v1/admin/stock/movements - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/stock/movements - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/admin/stock/movements - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/stock/movements - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/admin/dashboard - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/dashboard`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/dashboard - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/dashboard`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/dashboard - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/dashboard`,
    );
    expect(response.status).toBe(403);
  });
});

describe("Carrinho - Functional Tests", () => {
  it("GET /api/v1/cart - deve retornar status 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/cart - deve retornar status 401", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/cart - deve retornar status 403", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(403);
  });

  it("DELETE /api/v1/cart - deve retornar status 204", async () => {
    const response = await HttpService.delete(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(204);
  });

  it("DELETE /api/v1/cart - deve retornar status 401", async () => {
    const response = await HttpService.delete(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(401);
  });

  it("DELETE /api/v1/cart - deve retornar status 403", async () => {
    const response = await HttpService.delete(`${config.baseURL}/api/v1/cart`);
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/cart/items - deve retornar status 201", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(201);
  });

  it("POST /api/v1/cart/items - deve retornar status 400", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/cart/items - deve retornar status 401", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/cart/items - deve retornar status 403", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/cart/items - deve retornar status 404", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/cart/items - deve retornar status 409", async () => {
    const body = {
      productId: 0,
      quantity: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/cart/items`,
      body,
    );
    expect(response.status).toBe(409);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 200", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 400", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 401", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(401);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 403", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(403);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 404", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(404);
  });

  it("PATCH /api/v1/cart/items/{productId} - deve retornar status 409", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    expect(response.status).toBe(409);
  });

  it("DELETE /api/v1/cart/items/{productId} - deve retornar status 200", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    expect(response.status).toBe(200);
  });

  it("DELETE /api/v1/cart/items/{productId} - deve retornar status 401", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    expect(response.status).toBe(401);
  });

  it("DELETE /api/v1/cart/items/{productId} - deve retornar status 403", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    expect(response.status).toBe(403);
  });

  it("DELETE /api/v1/cart/items/{productId} - deve retornar status 404", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    expect(response.status).toBe(404);
  });
});

describe("Checkout e Pedidos - Functional Tests", () => {
  it("POST /api/v1/checkout/quote - deve retornar status 200", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/checkout/quote - deve retornar status 400", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/checkout/quote - deve retornar status 401", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/checkout/quote - deve retornar status 403", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/checkout/quote - deve retornar status 422", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    expect(response.status).toBe(422);
  });

  it("POST /api/v1/orders - deve retornar status 201", async () => {
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
    expect(response.status).toBe(201);
  });

  it("POST /api/v1/orders - deve retornar status 400", async () => {
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
    expect(response.status).toBe(400);
  });

  it("POST /api/v1/orders - deve retornar status 401", async () => {
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
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/orders - deve retornar status 403", async () => {
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
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/orders - deve retornar status 409", async () => {
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
    expect(response.status).toBe(409);
  });

  it("POST /api/v1/orders - deve retornar status 422", async () => {
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
    expect(response.status).toBe(422);
  });

  it("POST /api/v1/orders - deve retornar status 503", async () => {
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
    expect(response.status).toBe(503);
  });

  it("GET /api/v1/orders - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/orders - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/orders - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/orders - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/orders/{id} - deve retornar status 200", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/orders/{id} - deve retornar status 401", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/orders/{id} - deve retornar status 403", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/orders/{id} - deve retornar status 404", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/orders/{id}/cancel - deve retornar status 200", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/orders/{id}/cancel - deve retornar status 401", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/orders/{id}/cancel - deve retornar status 403", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/orders/{id}/cancel - deve retornar status 404", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/orders/{id}/cancel - deve retornar status 409", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    expect(response.status).toBe(409);
  });
});

describe("Admin - Pedidos - Functional Tests", () => {
  it("GET /api/v1/admin/orders - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/orders - deve retornar status 400", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(400);
  });

  it("GET /api/v1/admin/orders - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/orders - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/admin/orders/{id} - deve retornar status 200", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    expect(response.status).toBe(200);
  });

  it("GET /api/v1/admin/orders/{id} - deve retornar status 401", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    expect(response.status).toBe(401);
  });

  it("GET /api/v1/admin/orders/{id} - deve retornar status 403", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    expect(response.status).toBe(403);
  });

  it("GET /api/v1/admin/orders/{id} - deve retornar status 404", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - deve retornar status 200", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(200);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - deve retornar status 401", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(401);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - deve retornar status 403", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(403);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - deve retornar status 404", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - deve retornar status 409", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    expect(response.status).toBe(409);
  });
});

describe("Test utils - Functional Tests", () => {
  it("POST /api/test/reset - deve retornar status 200", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/reset`);
    expect(response.status).toBe(200);
  });

  it("POST /api/test/seed - deve retornar status 200", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/seed`);
    expect(response.status).toBe(200);
  });

  it("POST /api/test/token - deve retornar status 201", async () => {
    const body = {
      email: "string",
      expiresInSeconds: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/token`,
      body,
    );
    expect(response.status).toBe(201);
  });

  it("POST /api/test/token - deve retornar status 404", async () => {
    const body = {
      email: "string",
      expiresInSeconds: 0,
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/token`,
      body,
    );
    expect(response.status).toBe(404);
  });

  it("POST /api/test/expired-token - deve retornar status 201", async () => {
    const body = {
      email: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/expired-token`,
      body,
    );
    expect(response.status).toBe(201);
  });

  it("POST /api/test/expired-token - deve retornar status 404", async () => {
    const body = {
      email: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/test/expired-token`,
      body,
    );
    expect(response.status).toBe(404);
  });
});

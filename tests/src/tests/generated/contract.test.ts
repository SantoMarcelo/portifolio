import { HttpService } from "../../services/httpService";
import { config } from "../../config/config";
import Ajv from "ajv";

describe("Health - Contract Tests", () => {
  it("GET /api/health - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/health`);
    const schema = {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "ok",
        },
        uptime: {
          type: "number",
        },
        timestamp: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Auth - Contract Tests", () => {
  it("POST /api/v1/auth/login - contrato da resposta deve ser válido", async () => {
    const body = {
      email: "string",
      password: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/auth/login`,
      body,
    );
    const schema = {
      type: "object",
      properties: {
        token: {
          type: "string",
        },
        expiresIn: {
          type: "integer",
          description: "Validade em segundos (24h = 86400)",
        },
        expiresAt: {
          type: "string",
          format: "date-time",
        },
        user: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Cliente Teste",
            },
            email: {
              type: "string",
              example: "cliente@loja.com",
            },
            role: {
              type: "string",
              enum: ["ADMIN", "CUSTOMER"],
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/auth/me - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/auth/me`);
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "Cliente Teste",
        },
        email: {
          type: "string",
          example: "cliente@loja.com",
        },
        role: {
          type: "string",
          enum: ["ADMIN", "CUSTOMER"],
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Vitrine - Contract Tests", () => {
  it("GET /api/v1/categories - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/categories`,
    );
    const schema = {
      type: "array",
      items: {
        type: "string",
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/products - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products?search=example&category=example&sort=example&page=1&pageSize=1`,
    );
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Fone de Ouvido Bluetooth",
              },
              description: {
                type: "string",
              },
              price: {
                type: "number",
                example: 199.9,
              },
              sku: {
                type: "string",
                example: "ELE-001",
              },
              category: {
                type: "string",
                example: "Eletrônicos",
              },
              imageUrl: {
                type: "string",
              },
              stock: {
                type: "integer",
                example: 50,
              },
              active: {
                type: "boolean",
              },
              inStock: {
                type: "boolean",
                description: "stock > 0",
              },
              lowStock: {
                type: "boolean",
                description: "stock < 5",
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            pageSize: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/products/{id} - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/products/1`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "Fone de Ouvido Bluetooth",
        },
        description: {
          type: "string",
        },
        price: {
          type: "number",
          example: 199.9,
        },
        sku: {
          type: "string",
          example: "ELE-001",
        },
        category: {
          type: "string",
          example: "Eletrônicos",
        },
        imageUrl: {
          type: "string",
        },
        stock: {
          type: "integer",
          example: 50,
        },
        active: {
          type: "boolean",
        },
        inStock: {
          type: "boolean",
          description: "stock > 0",
        },
        lowStock: {
          type: "boolean",
          description: "stock < 5",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Admin - Produtos - Contract Tests", () => {
  it("GET /api/v1/admin/products - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products?search=example&category=example&sort=example&page=1&pageSize=1&active=example`,
    );
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Fone de Ouvido Bluetooth",
              },
              description: {
                type: "string",
              },
              price: {
                type: "number",
                example: 199.9,
              },
              sku: {
                type: "string",
                example: "ELE-001",
              },
              category: {
                type: "string",
                example: "Eletrônicos",
              },
              imageUrl: {
                type: "string",
              },
              stock: {
                type: "integer",
                example: 50,
              },
              active: {
                type: "boolean",
              },
              inStock: {
                type: "boolean",
                description: "stock > 0",
              },
              lowStock: {
                type: "boolean",
                description: "stock < 5",
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            pageSize: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/admin/products/{id} - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/products/1`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "Fone de Ouvido Bluetooth",
        },
        description: {
          type: "string",
        },
        price: {
          type: "number",
          example: 199.9,
        },
        sku: {
          type: "string",
          example: "ELE-001",
        },
        category: {
          type: "string",
          example: "Eletrônicos",
        },
        imageUrl: {
          type: "string",
        },
        stock: {
          type: "integer",
          example: 50,
        },
        active: {
          type: "boolean",
        },
        inStock: {
          type: "boolean",
          description: "stock > 0",
        },
        lowStock: {
          type: "boolean",
          description: "stock < 5",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("PUT /api/v1/admin/products/{id} - contrato da resposta deve ser válido", async () => {
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
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },
        name: {
          type: "string",
          example: "Fone de Ouvido Bluetooth",
        },
        description: {
          type: "string",
        },
        price: {
          type: "number",
          example: 199.9,
        },
        sku: {
          type: "string",
          example: "ELE-001",
        },
        category: {
          type: "string",
          example: "Eletrônicos",
        },
        imageUrl: {
          type: "string",
        },
        stock: {
          type: "integer",
          example: 50,
        },
        active: {
          type: "boolean",
        },
        inStock: {
          type: "boolean",
          description: "stock > 0",
        },
        lowStock: {
          type: "boolean",
          description: "stock < 5",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Admin - Estoque - Contract Tests", () => {
  it("GET /api/v1/admin/stock/movements - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/stock/movements?productId=1&search=example&type=example&page=1&pageSize=1`,
    );
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              productId: {
                type: "integer",
              },
              type: {
                type: "string",
                enum: ["ENTRY", "EXIT", "ADJUSTMENT"],
              },
              quantity: {
                type: "integer",
                description:
                  "ENTRY/EXIT: quantidade; ADJUSTMENT: novo estoque informado",
              },
              previousStock: {
                type: "integer",
              },
              newStock: {
                type: "integer",
              },
              reason: {
                type: "string",
              },
              userId: {
                type: "integer",
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              product: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  sku: {
                    type: "string",
                  },
                },
              },
              user: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            pageSize: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/admin/dashboard - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/dashboard`,
    );
    const schema = {
      type: "object",
      properties: {
        totalProducts: {
          type: "integer",
          description: "Produtos ativos",
        },
        inactiveProducts: {
          type: "integer",
        },
        lowStockProducts: {
          type: "integer",
          description: "Ativos com estoque < 5 (inclui zerados)",
        },
        outOfStockProducts: {
          type: "integer",
        },
        totalOrders: {
          type: "integer",
        },
        ordersByStatus: {
          type: "object",
          additionalProperties: {
            type: "integer",
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Carrinho - Contract Tests", () => {
  it("GET /api/v1/cart - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/cart`);
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              sku: {
                type: "string",
              },
              imageUrl: {
                type: "string",
              },
              unitPrice: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
              stock: {
                type: "integer",
              },
              available: {
                type: "boolean",
                description: "false se inativo ou estoque < quantidade",
              },
            },
          },
        },
        totalItems: {
          type: "integer",
          description: "Soma das quantidades (contador do header)",
        },
        total: {
          type: "number",
          description: "Calculado no backend",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("PATCH /api/v1/cart/items/{productId} - contrato da resposta deve ser válido", async () => {
    const body = {
      quantity: 0,
    };
    const response = await HttpService.patch(
      `${config.baseURL}/api/v1/cart/items/1`,
      body,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              sku: {
                type: "string",
              },
              imageUrl: {
                type: "string",
              },
              unitPrice: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
              stock: {
                type: "integer",
              },
              available: {
                type: "boolean",
                description: "false se inativo ou estoque < quantidade",
              },
            },
          },
        },
        totalItems: {
          type: "integer",
          description: "Soma das quantidades (contador do header)",
        },
        total: {
          type: "number",
          description: "Calculado no backend",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("DELETE /api/v1/cart/items/{productId} - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.delete(
      `${config.baseURL}/api/v1/cart/items/1`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              sku: {
                type: "string",
              },
              imageUrl: {
                type: "string",
              },
              unitPrice: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
              stock: {
                type: "integer",
              },
              available: {
                type: "boolean",
                description: "false se inativo ou estoque < quantidade",
              },
            },
          },
        },
        totalItems: {
          type: "integer",
          description: "Soma das quantidades (contador do header)",
        },
        total: {
          type: "number",
          description: "Calculado no backend",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Checkout e Pedidos - Contract Tests", () => {
  it("POST /api/v1/checkout/quote - contrato da resposta deve ser válido", async () => {
    const body = {
      couponCode: "string",
    };
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/checkout/quote`,
      body,
    );
    const schema = {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
          },
        },
        totalItems: {
          type: "integer",
        },
        subtotal: {
          type: "number",
        },
        discount: {
          type: "number",
        },
        shipping: {
          type: "number",
        },
        total: {
          type: "number",
        },
        couponCode: {
          type: "string",
          nullable: true,
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/orders - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/orders?status=example&page=1&pageSize=1`,
    );
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              user: {
                type: "object",
                description: "Somente em rotas /admin",
                properties: {
                  id: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
              status: {
                type: "string",
                enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
              },
              subtotal: {
                type: "number",
              },
              discount: {
                type: "number",
              },
              shipping: {
                type: "number",
              },
              total: {
                type: "number",
              },
              couponCode: {
                type: "string",
                nullable: true,
              },
              paymentMethod: {
                type: "string",
                enum: ["CREDIT_CARD", "PIX", "BOLETO"],
              },
              cardLast4: {
                type: "string",
                nullable: true,
              },
              address: {
                type: "object",
                properties: {
                  street: {
                    type: "string",
                  },
                  number: {
                    type: "string",
                  },
                  complement: {
                    type: "string",
                    nullable: true,
                  },
                  district: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                    example: "SP",
                  },
                  zip: {
                    type: "string",
                    example: "01310-100",
                  },
                },
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    productId: {
                      type: "integer",
                    },
                    name: {
                      type: "string",
                    },
                    price: {
                      type: "number",
                    },
                    quantity: {
                      type: "integer",
                    },
                    subtotal: {
                      type: "number",
                    },
                  },
                },
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            pageSize: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/orders/{id} - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(`${config.baseURL}/api/v1/orders/1`);
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        userId: {
          type: "integer",
        },
        user: {
          type: "object",
          description: "Somente em rotas /admin",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        status: {
          type: "string",
          enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
        },
        subtotal: {
          type: "number",
        },
        discount: {
          type: "number",
        },
        shipping: {
          type: "number",
        },
        total: {
          type: "number",
        },
        couponCode: {
          type: "string",
          nullable: true,
        },
        paymentMethod: {
          type: "string",
          enum: ["CREDIT_CARD", "PIX", "BOLETO"],
        },
        cardLast4: {
          type: "string",
          nullable: true,
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            number: {
              type: "string",
            },
            complement: {
              type: "string",
              nullable: true,
            },
            district: {
              type: "string",
            },
            city: {
              type: "string",
            },
            state: {
              type: "string",
              example: "SP",
            },
            zip: {
              type: "string",
              example: "01310-100",
            },
          },
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              price: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
            },
          },
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("POST /api/v1/orders/{id}/cancel - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/orders/1/cancel`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        userId: {
          type: "integer",
        },
        user: {
          type: "object",
          description: "Somente em rotas /admin",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        status: {
          type: "string",
          enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
        },
        subtotal: {
          type: "number",
        },
        discount: {
          type: "number",
        },
        shipping: {
          type: "number",
        },
        total: {
          type: "number",
        },
        couponCode: {
          type: "string",
          nullable: true,
        },
        paymentMethod: {
          type: "string",
          enum: ["CREDIT_CARD", "PIX", "BOLETO"],
        },
        cardLast4: {
          type: "string",
          nullable: true,
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            number: {
              type: "string",
            },
            complement: {
              type: "string",
              nullable: true,
            },
            district: {
              type: "string",
            },
            city: {
              type: "string",
            },
            state: {
              type: "string",
              example: "SP",
            },
            zip: {
              type: "string",
              example: "01310-100",
            },
          },
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              price: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
            },
          },
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Admin - Pedidos - Contract Tests", () => {
  it("GET /api/v1/admin/orders - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders?status=example&page=1&pageSize=1`,
    );
    const schema = {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              user: {
                type: "object",
                description: "Somente em rotas /admin",
                properties: {
                  id: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
              status: {
                type: "string",
                enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
              },
              subtotal: {
                type: "number",
              },
              discount: {
                type: "number",
              },
              shipping: {
                type: "number",
              },
              total: {
                type: "number",
              },
              couponCode: {
                type: "string",
                nullable: true,
              },
              paymentMethod: {
                type: "string",
                enum: ["CREDIT_CARD", "PIX", "BOLETO"],
              },
              cardLast4: {
                type: "string",
                nullable: true,
              },
              address: {
                type: "object",
                properties: {
                  street: {
                    type: "string",
                  },
                  number: {
                    type: "string",
                  },
                  complement: {
                    type: "string",
                    nullable: true,
                  },
                  district: {
                    type: "string",
                  },
                  city: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                    example: "SP",
                  },
                  zip: {
                    type: "string",
                    example: "01310-100",
                  },
                },
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    productId: {
                      type: "integer",
                    },
                    name: {
                      type: "string",
                    },
                    price: {
                      type: "number",
                    },
                    quantity: {
                      type: "integer",
                    },
                    subtotal: {
                      type: "number",
                    },
                  },
                },
              },
              createdAt: {
                type: "string",
                format: "date-time",
              },
              updatedAt: {
                type: "string",
                format: "date-time",
              },
            },
          },
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "integer",
            },
            pageSize: {
              type: "integer",
            },
            total: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
          },
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("GET /api/v1/admin/orders/{id} - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.get(
      `${config.baseURL}/api/v1/admin/orders/1`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        userId: {
          type: "integer",
        },
        user: {
          type: "object",
          description: "Somente em rotas /admin",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        status: {
          type: "string",
          enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
        },
        subtotal: {
          type: "number",
        },
        discount: {
          type: "number",
        },
        shipping: {
          type: "number",
        },
        total: {
          type: "number",
        },
        couponCode: {
          type: "string",
          nullable: true,
        },
        paymentMethod: {
          type: "string",
          enum: ["CREDIT_CARD", "PIX", "BOLETO"],
        },
        cardLast4: {
          type: "string",
          nullable: true,
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            number: {
              type: "string",
            },
            complement: {
              type: "string",
              nullable: true,
            },
            district: {
              type: "string",
            },
            city: {
              type: "string",
            },
            state: {
              type: "string",
              example: "SP",
            },
            zip: {
              type: "string",
              example: "01310-100",
            },
          },
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              price: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
            },
          },
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("POST /api/v1/admin/orders/{id}/cancel - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.post(
      `${config.baseURL}/api/v1/admin/orders/1/cancel`,
    );
    const schema = {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        userId: {
          type: "integer",
        },
        user: {
          type: "object",
          description: "Somente em rotas /admin",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            email: {
              type: "string",
            },
          },
        },
        status: {
          type: "string",
          enum: ["PENDING", "PAID", "PAYMENT_FAILED", "CANCELLED"],
        },
        subtotal: {
          type: "number",
        },
        discount: {
          type: "number",
        },
        shipping: {
          type: "number",
        },
        total: {
          type: "number",
        },
        couponCode: {
          type: "string",
          nullable: true,
        },
        paymentMethod: {
          type: "string",
          enum: ["CREDIT_CARD", "PIX", "BOLETO"],
        },
        cardLast4: {
          type: "string",
          nullable: true,
        },
        address: {
          type: "object",
          properties: {
            street: {
              type: "string",
            },
            number: {
              type: "string",
            },
            complement: {
              type: "string",
              nullable: true,
            },
            district: {
              type: "string",
            },
            city: {
              type: "string",
            },
            state: {
              type: "string",
              example: "SP",
            },
            zip: {
              type: "string",
              example: "01310-100",
            },
          },
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              price: {
                type: "number",
              },
              quantity: {
                type: "integer",
              },
              subtotal: {
                type: "number",
              },
            },
          },
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

describe("Test utils - Contract Tests", () => {
  it("POST /api/test/reset - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/reset`);
    const schema = {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });

  it("POST /api/test/seed - contrato da resposta deve ser válido", async () => {
    const response = await HttpService.post(`${config.baseURL}/api/test/seed`);
    const schema = {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    };
    const validate = new Ajv({ allErrors: true, strict: false }).compile(
      schema,
    );
    const valid = validate(response.data);
    if (!valid) {
      console.error(validate.errors);
    }
    expect(valid).toBe(true);
  });
});

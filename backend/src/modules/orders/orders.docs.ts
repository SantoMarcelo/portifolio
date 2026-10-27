import {
  adminErrors, bearer, errorResponse, idPathParam, jsonBody, jsonResponse, pageParams, paginated, param, ref,
} from '../../docs/helpers';
import { createOrderSchema, quoteSchema } from './orders.schema';

const address = {
  type: 'object',
  properties: {
    street: { type: 'string' }, number: { type: 'string' }, complement: { type: 'string', nullable: true },
    district: { type: 'string' }, city: { type: 'string' }, state: { type: 'string', example: 'SP' },
    zip: { type: 'string', example: '01310-100' },
  },
};

export const orderSchemas = {
  Order: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      userId: { type: 'integer' },
      user: { type: 'object', description: 'Somente em rotas /admin', properties: { id: { type: 'integer' }, name: { type: 'string' }, email: { type: 'string' } } },
      status: { type: 'string', enum: ['PENDING', 'PAID', 'PAYMENT_FAILED', 'CANCELLED'] },
      subtotal: { type: 'number' },
      discount: { type: 'number' },
      shipping: { type: 'number' },
      total: { type: 'number' },
      couponCode: { type: 'string', nullable: true },
      paymentMethod: { type: 'string', enum: ['CREDIT_CARD', 'PIX', 'BOLETO'] },
      cardLast4: { type: 'string', nullable: true },
      address,
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'integer' }, name: { type: 'string' }, price: { type: 'number' },
            quantity: { type: 'integer' }, subtotal: { type: 'number' },
          },
        },
      },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
  Quote: {
    type: 'object',
    properties: {
      items: { type: 'array', items: { type: 'object' } },
      totalItems: { type: 'integer' },
      subtotal: { type: 'number' },
      discount: { type: 'number' },
      shipping: { type: 'number' },
      total: { type: 'number' },
      couponCode: { type: 'string', nullable: true },
    },
  },
};

const customerErrors = {
  401: errorResponse('UNAUTHORIZED | TOKEN_EXPIRED | INVALID_TOKEN'),
  403: errorResponse('FORBIDDEN (apenas CUSTOMER)'),
};
const statusParam = param('status', 'query', { type: 'string', enum: ['PENDING', 'PAID', 'PAYMENT_FAILED', 'CANCELLED'] });
const orderNotFound = errorResponse('ORDER_NOT_FOUND');
const invalidState = errorResponse('INVALID_ORDER_STATE (somente PAID pode ser cancelado)');

export const orderPaths = {
  '/api/v1/checkout/quote': {
    post: {
      tags: ['Checkout e Pedidos'],
      summary: 'Revisão: calcula subtotal, desconto, frete e total do carrinho (valida o cupom)',
      description: 'Cupons: PROMO10 (10% do subtotal), FRETEGRATIS (frete zero). Frete: R$ 15,00; grátis se subtotal > R$ 200,00.',
      security: bearer,
      requestBody: jsonBody(quoteSchema, false),
      responses: {
        200: jsonResponse('Cotação', ref('Quote')),
        400: errorResponse('VALIDATION_ERROR'),
        422: errorResponse('CART_EMPTY | INVALID_COUPON'),
        ...customerErrors,
      },
    },
  },
  '/api/v1/orders': {
    post: {
      tags: ['Checkout e Pedidos'],
      summary: 'Confirma o pedido a partir do carrinho (pagamento simulado)',
      description:
        'Cartão final 0000 → aprovado; 1111 → recusado (422, pedido PAYMENT_FAILED); 2222 → indisponível (503, pedido PAYMENT_FAILED); ' +
        'demais finais → aprovado. PIX/boleto → aprovados. Aprovado: baixa de estoque atômica e carrinho limpo. ' +
        'Nos erros de pagamento, `error.details[0].orderId` traz o pedido PAYMENT_FAILED criado.',
      security: bearer,
      requestBody: jsonBody(createOrderSchema),
      responses: {
        201: jsonResponse('Pedido PAID', ref('Order')),
        400: errorResponse('VALIDATION_ERROR'),
        409: errorResponse('OUT_OF_STOCK (nada é alterado; details lista os itens)'),
        422: errorResponse('CART_EMPTY | INVALID_COUPON | PAYMENT_DECLINED'),
        503: errorResponse('PAYMENT_UNAVAILABLE'),
        ...customerErrors,
      },
    },
    get: {
      tags: ['Checkout e Pedidos'],
      summary: 'Histórico de pedidos do cliente (mais recentes primeiro)',
      security: bearer,
      parameters: [statusParam, ...pageParams],
      responses: { 200: jsonResponse('Página', paginated(ref('Order'))), 400: errorResponse('VALIDATION_ERROR'), ...customerErrors },
    },
  },
  '/api/v1/orders/{id}': {
    get: {
      tags: ['Checkout e Pedidos'],
      summary: 'Detalhe de um pedido do cliente (pedido de outro usuário → 404)',
      security: bearer,
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Pedido', ref('Order')), 404: orderNotFound, ...customerErrors },
    },
  },
  '/api/v1/orders/{id}/cancel': {
    post: {
      tags: ['Checkout e Pedidos'],
      summary: 'Cliente cancela pedido PAID e o estoque é devolvido',
      security: bearer,
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Pedido CANCELLED', ref('Order')), 404: orderNotFound, 409: invalidState, ...customerErrors },
    },
  },
  '/api/v1/admin/orders': {
    get: {
      tags: ['Admin - Pedidos'],
      summary: 'Lista todos os pedidos, com filtro por status',
      security: bearer,
      parameters: [statusParam, ...pageParams],
      responses: { 200: jsonResponse('Página', paginated(ref('Order'))), 400: errorResponse('VALIDATION_ERROR'), ...adminErrors },
    },
  },
  '/api/v1/admin/orders/{id}': {
    get: {
      tags: ['Admin - Pedidos'],
      summary: 'Detalhe de qualquer pedido',
      security: bearer,
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Pedido', ref('Order')), 404: orderNotFound, ...adminErrors },
    },
  },
  '/api/v1/admin/orders/{id}/cancel': {
    post: {
      tags: ['Admin - Pedidos'],
      summary: 'ADMIN cancela pedido PAID e o estoque é devolvido',
      security: bearer,
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Pedido CANCELLED', ref('Order')), 404: orderNotFound, 409: invalidState, ...adminErrors },
    },
  },
};

import { bearer, errorResponse, jsonBody, jsonResponse, ref } from '../../docs/helpers';
import { addItemSchema, updateItemSchema } from './cart.schema';
import { idPathParam } from '../../docs/helpers';

export const cartSchemas = {
  Cart: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'integer' },
            name: { type: 'string' },
            sku: { type: 'string' },
            imageUrl: { type: 'string' },
            unitPrice: { type: 'number' },
            quantity: { type: 'integer' },
            subtotal: { type: 'number' },
            stock: { type: 'integer' },
            available: { type: 'boolean', description: 'false se inativo ou estoque < quantidade' },
          },
        },
      },
      totalItems: { type: 'integer', description: 'Soma das quantidades (contador do header)' },
      total: { type: 'number', description: 'Calculado no backend' },
    },
  },
};

const productIdParam = { ...idPathParam, name: 'productId' };
const authErrors = {
  401: errorResponse('UNAUTHORIZED | TOKEN_EXPIRED | INVALID_TOKEN'),
  403: errorResponse('FORBIDDEN (apenas CUSTOMER)'),
};
const stockErrors = errorResponse('OUT_OF_STOCK (estoque 0) | INSUFFICIENT_STOCK (quantidade > estoque)');

export const cartPaths = {
  '/api/v1/cart': {
    get: {
      tags: ['Carrinho'],
      summary: 'Carrinho do usuário (criado sob demanda)',
      security: bearer,
      responses: { 200: jsonResponse('Carrinho', ref('Cart')), ...authErrors },
    },
    delete: {
      tags: ['Carrinho'],
      summary: 'Limpa o carrinho',
      security: bearer,
      responses: { 204: { description: 'Sem conteúdo' }, ...authErrors },
    },
  },
  '/api/v1/cart/items': {
    post: {
      tags: ['Carrinho'],
      summary: 'Adiciona item (se já existir, soma a quantidade)',
      security: bearer,
      requestBody: jsonBody(addItemSchema),
      responses: {
        201: jsonResponse('Carrinho atualizado', ref('Cart')),
        400: errorResponse('VALIDATION_ERROR'),
        404: errorResponse('PRODUCT_NOT_FOUND (inexistente ou inativo)'),
        409: stockErrors,
        ...authErrors,
      },
    },
  },
  '/api/v1/cart/items/{productId}': {
    patch: {
      tags: ['Carrinho'],
      summary: 'Define a quantidade de um item',
      security: bearer,
      parameters: [productIdParam],
      requestBody: jsonBody(updateItemSchema),
      responses: {
        200: jsonResponse('Carrinho atualizado', ref('Cart')),
        400: errorResponse('VALIDATION_ERROR'),
        404: errorResponse('CART_ITEM_NOT_FOUND | PRODUCT_NOT_FOUND'),
        409: stockErrors,
        ...authErrors,
      },
    },
    delete: {
      tags: ['Carrinho'],
      summary: 'Remove um item do carrinho',
      security: bearer,
      parameters: [productIdParam],
      responses: {
        200: jsonResponse('Carrinho atualizado', ref('Cart')),
        404: errorResponse('CART_ITEM_NOT_FOUND'),
        ...authErrors,
      },
    },
  },
};

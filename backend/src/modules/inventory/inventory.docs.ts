import {
  adminErrors, bearer, errorResponse, idPathParam, jsonBody, jsonResponse, pageParams, paginated, param, ref,
} from '../../docs/helpers';
import { stockAdjustSchema } from './inventory.schema';

export const stockSchemas = {
  StockMovement: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      productId: { type: 'integer' },
      type: { type: 'string', enum: ['ENTRY', 'EXIT', 'ADJUSTMENT'] },
      quantity: { type: 'integer', description: 'ENTRY/EXIT: quantidade; ADJUSTMENT: novo estoque informado' },
      previousStock: { type: 'integer' },
      newStock: { type: 'integer' },
      reason: { type: 'string' },
      userId: { type: 'integer' },
      createdAt: { type: 'string', format: 'date-time' },
      product: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' }, sku: { type: 'string' } } },
      user: { type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } } },
    },
  },
};

export const stockPaths = {
  '/api/v1/admin/products/{id}/stock': {
    post: {
      tags: ['Admin - Inventory'],
      summary: 'Entrada, saída ou ajuste manual de estoque (gera StockMovement)',
      security: bearer,
      parameters: [idPathParam],
      requestBody: jsonBody(stockAdjustSchema),
      responses: {
        201: jsonResponse('Movimentação registrada', {
          type: 'object',
          properties: { product: ref('Product'), movement: ref('StockMovement') },
        }),
        400: errorResponse('VALIDATION_ERROR'),
        404: errorResponse('PRODUCT_NOT_FOUND'),
        409: errorResponse('INSUFFICIENT_STOCK (estoque não pode ficar negativo)'),
        ...adminErrors,
      },
    },
  },
  '/api/v1/admin/stock/movements': {
    get: {
      tags: ['Admin - Inventory'],
      summary: 'Histórico de movimentações (mais recentes primeiro)',
      security: bearer,
      parameters: [
        param('productId', 'query', { type: 'integer' }),
        param('search', 'query', { type: 'string' }, 'Filtra pelo nome do produto (contém)'),
        param('type', 'query', { type: 'string', enum: ['ENTRY', 'EXIT', 'ADJUSTMENT'] }),
        ...pageParams,
      ],
      responses: { 200: jsonResponse('Página', paginated(ref('StockMovement'))), 400: errorResponse('VALIDATION_ERROR'), ...adminErrors },
    },
  },
  '/api/v1/admin/dashboard': {
    get: {
      tags: ['Admin - Inventory'],
      summary: 'Totais para o dashboard (produtos, estoque baixo, pedidos)',
      security: bearer,
      responses: {
        200: jsonResponse('Totais', {
          type: 'object',
          properties: {
            totalProducts: { type: 'integer', description: 'Produtos ativos' },
            inactiveProducts: { type: 'integer' },
            lowStockProducts: { type: 'integer', description: 'Ativos com estoque < 5 (inclui zerados)' },
            outOfStockProducts: { type: 'integer' },
            totalOrders: { type: 'integer' },
            ordersByStatus: { type: 'object', additionalProperties: { type: 'integer' } },
          },
        }),
        ...adminErrors,
      },
    },
  },
};

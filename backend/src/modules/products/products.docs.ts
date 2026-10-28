import {
  adminErrors, bearer, errorResponse, idPathParam, jsonBody, jsonResponse, pageParams, paginated, param, ref,
} from '../../docs/helpers';
import { createProductSchema, updateProductSchema } from './products.schema';

export const productSchemas = {
  Product: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'Fone de Ouvido Bluetooth' },
      description: { type: 'string' },
      price: { type: 'number', example: 199.9 },
      sku: { type: 'string', example: 'ELE-001' },
      category: { type: 'string', example: 'Eletrônicos' },
      imageUrl: { type: 'string' },
      stock: { type: 'integer', example: 50 },
      active: { type: 'boolean' },
      inStock: { type: 'boolean', description: 'stock > 0' },
      lowStock: { type: 'boolean', description: 'stock < 5' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
};

const listParams = [
  param('search', 'query', { type: 'string' }, 'Busca por nome (contém)'),
  param('category', 'query', { type: 'string' }, 'Filtro por categoria'),
  param('sort', 'query', { type: 'string', enum: ['id_asc', 'price_asc', 'price_desc', 'name_asc'], default: 'id_asc' }),
  ...pageParams,
];
const notFound = errorResponse('PRODUCT_NOT_FOUND');
const validation = errorResponse('VALIDATION_ERROR');

export const productPaths = {
  '/api/v1/categories': {
    get: {
      tags: ['Product'],
      summary: 'Categorias com produtos ativos',
      responses: { 200: jsonResponse('Lista', { type: 'array', items: { type: 'string' } }) },
    },
  },
  '/api/v1/products': {
    get: {
      tags: ['Product'],
      summary: 'Lista produtos ativos (público)',
      parameters: listParams,
      responses: { 200: jsonResponse('Página de produtos', paginated(ref('Product'))), 400: validation },
    },
  },
  '/api/v1/products/{id}': {
    get: {
      tags: ['Product'],
      summary: 'Detalhe de produto ativo (público; inativo retorna 404)',
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Produto', ref('Product')), 400: validation, 404: notFound },
    },
  },
  '/api/v1/admin/products': {
    get: {
      tags: ['Admin - Products'],
      summary: 'Lista todos os produtos (inclui inativos)',
      security: bearer,
      parameters: [...listParams, param('active', 'query', { type: 'string', enum: ['true', 'false'] }, 'Filtra por ativo/inativo')],
      responses: { 200: jsonResponse('Página de produtos', paginated(ref('Product'))), 400: validation, ...adminErrors },
    },
    post: {
      tags: ['Admin - Products'],
      summary: 'Cria produto (estoque inicial > 0 gera movimentação ENTRY)',
      security: bearer,
      requestBody: jsonBody(createProductSchema),
      responses: {
        201: jsonResponse('Criado', ref('Product')),
        400: validation,
        409: errorResponse('SKU_ALREADY_EXISTS'),
        ...adminErrors,
      },
    },
  },
  '/api/v1/admin/products/{id}': {
    get: {
      tags: ['Admin - Products'],
      summary: 'Detalhe de produto (inclui inativo)',
      security: bearer,
      parameters: [idPathParam],
      responses: { 200: jsonResponse('Produto', ref('Product')), 400: validation, 404: notFound, ...adminErrors },
    },
    put: {
      tags: ['Admin - Products'],
      summary: 'Edita produto (estoque não é editável aqui; use /stock)',
      security: bearer,
      parameters: [idPathParam],
      requestBody: jsonBody(updateProductSchema),
      responses: {
        200: jsonResponse('Atualizado', ref('Product')),
        400: validation,
        404: notFound,
        409: errorResponse('SKU_ALREADY_EXISTS'),
        ...adminErrors,
      },
    },
    delete: {
      tags: ['Admin - Products'],
      summary: 'Remove produto (soft delete: active=false). Idempotente.',
      security: bearer,
      parameters: [idPathParam],
      responses: { 204: { description: 'Sem conteúdo' }, 400: validation, 404: notFound, ...adminErrors },
    },
  },
};

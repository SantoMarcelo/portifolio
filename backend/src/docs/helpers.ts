import { z, type ZodType } from 'zod';

export const toSchema = (schema: ZodType) => {
  const { $schema, ...rest } = z.toJSONSchema(schema, { target: 'openapi-3.0', io: 'input' }) as Record<string, unknown>;
  return rest;
};

export const jsonBody = (schema: ZodType, required = true) => ({
  required,
  content: { 'application/json': { schema: toSchema(schema) } },
});

export const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

export const jsonResponse = (description: string, schema: object) => ({
  description,
  content: { 'application/json': { schema } },
});

export const errorResponse = (description: string) => ({
  description,
  content: { 'application/json': { schema: ref('ErrorResponse') } },
});

export const bearer = [{ bearerAuth: [] }];

export const param = (name: string, where: 'query' | 'path', schema: object, description = '', required = where === 'path') => ({
  name,
  in: where,
  required,
  description,
  schema,
});

export const idPathParam = param('id', 'path', { type: 'integer', minimum: 1 }, 'ID do recurso');

export const pageParams = [
  param('page', 'query', { type: 'integer', minimum: 1, default: 1 }),
  param('pageSize', 'query', { type: 'integer', minimum: 1, maximum: 100, default: 10 }),
];

export const paginated = (itemRef: object) => ({
  type: 'object',
  properties: {
    data: { type: 'array', items: itemRef },
    pagination: {
      type: 'object',
      properties: {
        page: { type: 'integer' },
        pageSize: { type: 'integer' },
        total: { type: 'integer' },
        totalPages: { type: 'integer' },
      },
    },
  },
});

export const adminErrors = {
  401: errorResponse('UNAUTHORIZED | TOKEN_EXPIRED | INVALID_TOKEN'),
  403: errorResponse('FORBIDDEN (usuário não é ADMIN)'),
};

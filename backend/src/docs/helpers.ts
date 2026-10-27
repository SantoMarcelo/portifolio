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

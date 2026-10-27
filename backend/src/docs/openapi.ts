import { isProduction } from '../config/env';
import { authPaths, authSchemas } from '../modules/auth/auth.docs';
import { testUtilsPaths } from '../modules/test-utils/test-utils.docs';
import { errorResponse, jsonResponse } from './helpers';

export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'Loja QA API',
    version: '1.0.0',
    description:
      'E-commerce fictício para testes automatizados. Erros seguem `{ "error": { "code", "message", "details" } }`. ' +
      'Usuários seed: admin@loja.com / Admin@123 (ADMIN) e cliente@loja.com / Cliente@123 (CUSTOMER).',
  },
  servers: [{ url: '/' }],
  tags: [{ name: 'Health' }, { name: 'Auth' }, ...(isProduction ? [] : [{ name: 'Test utils' }])],
  components: {
    securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'OUT_OF_STOCK' },
              message: { type: 'string' },
              details: { type: 'array', items: {} },
            },
          },
        },
      },
      ...authSchemas,
    },
  },
  paths: {
    '/api/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: jsonResponse('API no ar', {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'ok' },
              uptime: { type: 'number' },
              timestamp: { type: 'string', format: 'date-time' },
            },
          }),
          503: errorResponse('Banco indisponível'),
        },
      },
    },
    ...authPaths,
    ...(isProduction ? {} : testUtilsPaths),
  },
};

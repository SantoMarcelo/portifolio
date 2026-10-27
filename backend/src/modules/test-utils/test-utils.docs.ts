import { errorResponse, jsonBody, jsonResponse } from '../../docs/helpers';
import { tokenSchema } from './test-utils.schema';

const msg = { type: 'object', properties: { message: { type: 'string' } } };

export const testUtilsPaths = {
  '/api/test/reset': {
    post: {
      tags: ['Test utils'],
      summary: 'Limpa o banco, zera IDs e recarrega o seed (indisponível em production)',
      responses: { 200: jsonResponse('OK', msg) },
    },
  },
  '/api/test/seed': {
    post: {
      tags: ['Test utils'],
      summary: 'Recarrega apenas os dados iniciais (upsert; não apaga pedidos/carrinhos)',
      responses: { 200: jsonResponse('OK', msg) },
    },
  },
  '/api/test/token': {
    post: {
      tags: ['Test utils'],
      summary: 'Gera um JWT com validade customizada (use valor ≤ 0 para token expirado)',
      requestBody: jsonBody(tokenSchema, false),
      responses: {
        201: jsonResponse('Token', {
          type: 'object',
          properties: { token: { type: 'string' }, expiresIn: { type: 'integer' }, expiresAt: { type: 'string' } },
        }),
        404: errorResponse('USER_NOT_FOUND'),
      },
    },
  },
  '/api/test/expired-token': {
    post: {
      tags: ['Test utils'],
      summary: 'Atalho: gera um JWT já expirado para o e-mail informado (padrão cliente@loja.com)',
      requestBody: jsonBody(tokenSchema.pick({ email: true }), false),
      responses: {
        201: jsonResponse('Token expirado', {
          type: 'object',
          properties: { token: { type: 'string' }, expiresIn: { type: 'integer' }, expiresAt: { type: 'string' } },
        }),
        404: errorResponse('USER_NOT_FOUND'),
      },
    },
  },
};


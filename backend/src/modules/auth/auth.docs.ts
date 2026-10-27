import { bearer, errorResponse, jsonBody, jsonResponse, ref } from '../../docs/helpers';
import { loginSchema, registerSchema } from './auth.schema';

export const authSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'Cliente Teste' },
      email: { type: 'string', example: 'cliente@loja.com' },
      role: { type: 'string', enum: ['ADMIN', 'CUSTOMER'] },
      createdAt: { type: 'string', format: 'date-time' },
    },
  },
  AuthSession: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      expiresIn: { type: 'integer', description: 'Validade em segundos (24h = 86400)' },
      expiresAt: { type: 'string', format: 'date-time' },
      user: ref('User'),
    },
  },
};

export const authPaths = {
  '/api/v1/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Cadastra um cliente (role CUSTOMER) e já retorna a sessão',
      requestBody: jsonBody(registerSchema),
      responses: {
        201: jsonResponse('Cliente criado', ref('AuthSession')),
        400: errorResponse('VALIDATION_ERROR'),
        409: errorResponse('EMAIL_ALREADY_EXISTS'),
      },
    },
  },
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Autentica e retorna JWT (validade 24h)',
      requestBody: jsonBody(loginSchema),
      responses: {
        200: jsonResponse('Sessão', ref('AuthSession')),
        400: errorResponse('VALIDATION_ERROR'),
        401: errorResponse('INVALID_CREDENTIALS'),
      },
    },
  },
  '/api/v1/auth/logout': {
    post: {
      tags: ['Auth'],
      summary: 'Encerra a sessão (stateless: o cliente descarta o token)',
      security: bearer,
      responses: {
        204: { description: 'Sem conteúdo' },
        401: errorResponse('UNAUTHORIZED | TOKEN_EXPIRED | INVALID_TOKEN'),
      },
    },
  },
  '/api/v1/auth/me': {
    get: {
      tags: ['Auth'],
      summary: 'Dados do usuário autenticado',
      security: bearer,
      responses: {
        200: jsonResponse('Usuário', ref('User')),
        401: errorResponse('UNAUTHORIZED | TOKEN_EXPIRED | INVALID_TOKEN'),
      },
    },
  },
};

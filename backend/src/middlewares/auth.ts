import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client';
import { AppError } from '../utils/app-error';
import { verifyToken } from '../utils/jwt';

export const authenticate: RequestHandler = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw AppError.unauthorized('UNAUTHORIZED', 'Token de autenticação ausente');
  }

  let payload;
  try {
    payload = verifyToken(header.slice(7));
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw AppError.unauthorized('TOKEN_EXPIRED', 'Token expirado');
    }
    throw AppError.unauthorized('INVALID_TOKEN', 'Token inválido');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) throw AppError.unauthorized('INVALID_TOKEN', 'Usuário do token não existe mais');

  req.user = { id: user.id, email: user.email, role: user.role as 'ADMIN' | 'CUSTOMER' };
  next();
};

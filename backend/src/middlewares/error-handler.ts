import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(AppError.notFound(`Rota não encontrada: ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND'));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const details = err.issues.map((i) => ({ field: i.path.join('.'), message: i.message }));
    return res
      .status(400)
      .json({ error: { code: 'VALIDATION_ERROR', message: 'Dados inválidos', details } });
  }
  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json({ error: { code: err.code, message: err.message, details: err.details } });
  }
  if (err?.type === 'entity.parse.failed') {
    return res
      .status(400)
      .json({ error: { code: 'INVALID_JSON', message: 'JSON malformado', details: [] } });
  }
  console.error(err);
  res
    .status(500)
    .json({ error: { code: 'INTERNAL_ERROR', message: 'Erro interno do servidor', details: [] } });
};

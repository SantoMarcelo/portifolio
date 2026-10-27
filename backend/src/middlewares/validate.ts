import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface Schemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

/** Valida e substitui body/query/params pelos valores já convertidos pelo Zod. */
export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, _res, next) => {
    if (schemas.body) req.body = schemas.body.parse(req.body ?? {});
    if (schemas.params) {
      Object.defineProperty(req, 'params', { value: schemas.params.parse(req.params), configurable: true });
    }
    if (schemas.query) {
      Object.defineProperty(req, 'query', { value: schemas.query.parse(req.query), configurable: true });
    }
    next();
  };

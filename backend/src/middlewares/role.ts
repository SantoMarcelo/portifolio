import type { RequestHandler } from 'express';
import type { Role } from '../constants';
import { AppError } from '../utils/app-error';

/** Deve ser usado depois de `authenticate`. */
export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) throw AppError.unauthorized();
    if (!roles.includes(req.user.role)) throw AppError.forbidden();
    next();
  };

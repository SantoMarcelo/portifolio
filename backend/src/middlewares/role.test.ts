import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { requireRole } from './role';

const run = (user: Request['user']) => {
  const next = vi.fn();
  const call = () => requireRole('ADMIN')({ user } as Request, {} as Response, next as NextFunction);
  return { next, call };
};

describe('requireRole', () => {
  it('permite ADMIN', () => {
    const { next, call } = run({ id: 1, email: 'a', role: 'ADMIN' });
    call();
    expect(next).toHaveBeenCalled();
  });
  it('403 para CUSTOMER', () => {
    expect(run({ id: 2, email: 'c', role: 'CUSTOMER' }).call).toThrowError(expect.objectContaining({ status: 403 }));
  });
  it('401 sem usuário', () => {
    expect(run(undefined).call).toThrowError(expect.objectContaining({ status: 401 }));
  });
});

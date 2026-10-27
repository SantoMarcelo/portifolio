import jwt from 'jsonwebtoken';
import { describe, expect, it } from 'vitest';
import { parseDurationToSeconds, signToken, verifyToken } from './jwt';

const payload = { sub: 1, email: 'a@b.com', role: 'ADMIN' as const };

describe('jwt', () => {
  it('token padrão vale 24h', () => {
    expect(signToken(payload).expiresIn).toBe(86400);
  });
  it('verifica token válido', () => {
    expect(verifyToken(signToken(payload).token)).toEqual(payload);
  });
  it('token com expiresInSeconds negativo já nasce expirado', () => {
    const { token } = signToken(payload, -10);
    expect(() => verifyToken(token)).toThrow(jwt.TokenExpiredError);
  });
  it('converte durações', () => {
    expect(parseDurationToSeconds('24h')).toBe(86400);
    expect(parseDurationToSeconds('30m')).toBe(1800);
    expect(parseDurationToSeconds('90')).toBe(90);
  });
});

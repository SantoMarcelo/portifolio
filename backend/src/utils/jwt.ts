import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import type { Role } from '../constants';

export interface TokenPayload {
  sub: number;
  email: string;
  role: Role;
}

/** Converte "24h", "30m", "10s", "7d" ou número (segundos) em segundos. */
export function parseDurationToSeconds(value: string | number): number {
  if (typeof value === 'number') return value;
  const match = /^(\d+)\s*([smhd])?$/.exec(value.trim());
  if (!match) throw new Error(`Duração inválida: ${value}`);
  const unit = { s: 1, m: 60, h: 3600, d: 86400 }[match[2] ?? 's'] as number;
  return Number(match[1]) * unit;
}

/** Gera um token. `expiresInSeconds` negativo gera um token já expirado (uso em testes). */
export function signToken(payload: TokenPayload, expiresInSeconds?: number) {
  const ttl = expiresInSeconds ?? parseDurationToSeconds(env.JWT_EXPIRES_IN);
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ttl;
  const token = jwt.sign({ email: payload.email, role: payload.role, iat, exp }, env.JWT_SECRET, {
    subject: String(payload.sub),
  });
  return { token, expiresIn: ttl, expiresAt: new Date(exp * 1000).toISOString() };
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
  return { sub: Number(decoded.sub), email: decoded.email, role: decoded.role };
}

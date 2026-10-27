import type { RequestHandler } from 'express';
import { env } from '../config/env';

/** Atraso artificial opcional (SIMULATE_LATENCY_MS) para testar esperas e timeouts. */
export const simulateLatency: RequestHandler = (_req, _res, next) => {
  if (env.SIMULATE_LATENCY_MS > 0) setTimeout(next, env.SIMULATE_LATENCY_MS);
  else next();
};

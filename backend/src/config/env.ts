import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(8).default('dev-secret-change-me'),
  JWT_EXPIRES_IN: z.string().default('24h'),
  SIMULATE_LATENCY_MS: z.coerce.number().int().min(0).default(0),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

export const env = schema.parse(process.env);
export const isProduction = env.NODE_ENV === 'production';

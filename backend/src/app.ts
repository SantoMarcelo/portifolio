import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { env, isProduction } from './config/env';
import { openapi } from './docs/openapi';
import { errorHandler, notFoundHandler } from './middlewares/error-handler';
import { simulateLatency } from './middlewares/latency';
import { testUtilsRoutes } from './modules/test-utils/test-utils.routes';
import { prisma } from './prisma/client';
import { v1Routes } from './routes';
import { AppError } from './utils/app-error';

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN.split(',') }));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    throw AppError.unavailable('DATABASE_UNAVAILABLE', 'Banco de dados indisponível');
  }
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.get('/api/docs.json', (_req, res) => {
  res.json(openapi);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapi));

if (!isProduction) app.use('/api/test', testUtilsRoutes);

app.use('/api/v1', simulateLatency, v1Routes);

app.use(notFoundHandler);
app.use(errorHandler);

import { Router } from 'express';
import { LOW_STOCK_THRESHOLD, ORDER_STATUSES } from '../../constants';
import { prisma } from '../../prisma/client';

/** Montado em /api/v1/admin. Resumo simples para o dashboard administrativo. */
export const adminDashboardRoutes = Router();

adminDashboardRoutes.get('/dashboard', async (_req, res) => {
  const [totalProducts, inactiveProducts, lowStockProducts, outOfStockProducts, totalOrders, grouped] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { active: false } }),
    prisma.product.count({ where: { active: true, stock: { lt: LOW_STOCK_THRESHOLD } } }),
    prisma.product.count({ where: { active: true, stock: 0 } }),
    prisma.order.count(),
    prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
  ]);
  const ordersByStatus = Object.fromEntries(ORDER_STATUSES.map((s) => [s, 0])) as Record<string, number>;
  for (const g of grouped) ordersByStatus[g.status] = g._count._all;
  res.json({ totalProducts, inactiveProducts, lowStockProducts, outOfStockProducts, totalOrders, ordersByStatus });
});

import type { Prisma } from '@prisma/client';
import type { StockMovementType } from '../../constants';
import { prisma } from '../../prisma/client';
import { AppError } from '../../utils/app-error';
import { pageResult, paginate } from '../../utils/pagination';
import type { MovementsQuery, StockAdjustInput } from './stock.schema';

/** Regra pura: calcula o novo estoque ou falha se ficaria negativo. */
export function computeNewStock(current: number, type: StockMovementType, quantity: number): number {
  const next = type === 'ENTRY' ? current + quantity : type === 'EXIT' ? current - quantity : quantity;
  if (next < 0) {
    throw AppError.conflict('INSUFFICIENT_STOCK', 'Estoque insuficiente para a saída solicitada', [
      { available: current, requested: quantity },
    ]);
  }
  return next;
}

interface ChangeStockParams {
  productId: number;
  type: StockMovementType;
  quantity: number;
  reason: string;
  userId: number;
}

/** Altera o estoque e grava a movimentação. Deve rodar dentro de uma transação. */
export async function changeStock(tx: Prisma.TransactionClient, p: ChangeStockParams) {
  const product = await tx.product.findUnique({ where: { id: p.productId } });
  if (!product) throw AppError.notFound('Produto não encontrado', 'PRODUCT_NOT_FOUND');

  const newStock = computeNewStock(product.stock, p.type, p.quantity);
  // Guarda de concorrência: só atualiza se o estoque ainda for o lido.
  const updated = await tx.product.updateMany({
    where: { id: product.id, stock: product.stock },
    data: { stock: newStock },
  });
  if (updated.count === 0) {
    throw AppError.conflict('STOCK_CONFLICT', 'O estoque foi alterado por outra operação. Tente novamente.');
  }

  const movement = await tx.stockMovement.create({
    data: {
      productId: product.id,
      type: p.type,
      quantity: p.quantity,
      reason: p.reason,
      userId: p.userId,
      previousStock: product.stock,
      newStock,
    },
  });
  return { movement, newStock };
}

export async function adjustStock(productId: number, input: StockAdjustInput, userId: number) {
  return prisma.$transaction(async (tx) => {
    const { movement } = await changeStock(tx, { productId, userId, ...input });
    const product = await tx.product.findUniqueOrThrow({ where: { id: productId } });
    return { product, movement };
  });
}

export async function listMovements(query: MovementsQuery) {
  const where: Prisma.StockMovementWhereInput = {
    ...(query.productId ? { productId: query.productId } : {}),
    ...(query.type ? { type: query.type } : {}),
  };
  const [total, items] = await prisma.$transaction([
    prisma.stockMovement.count({ where }),
    prisma.stockMovement.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      include: {
        product: { select: { id: true, name: true, sku: true } },
        user: { select: { id: true, name: true } },
      },
      ...paginate(query.page, query.pageSize),
    }),
  ]);
  return pageResult(items, total, query.page, query.pageSize);
}

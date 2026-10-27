import { Prisma, type Product } from '@prisma/client';
import { LOW_STOCK_THRESHOLD } from '../../constants';
import { prisma } from '../../prisma/client';
import { AppError } from '../../utils/app-error';
import { pageResult, paginate } from '../../utils/pagination';
import { changeStock } from '../stock/stock.service';
import type { CreateProductInput, ListProductsQuery, UpdateProductInput } from './products.schema';

export function toProductDto(p: Product) {
  return { ...p, inStock: p.stock > 0, lowStock: p.stock < LOW_STOCK_THRESHOLD };
}

const orderByMap = {
  id_asc: { id: 'asc' },
  price_asc: { price: 'asc' },
  price_desc: { price: 'desc' },
  name_asc: { name: 'asc' },
} as const;

export async function listProducts(query: ListProductsQuery, onlyActive: boolean) {
  const where: Prisma.ProductWhereInput = {
    ...(onlyActive ? { active: true } : query.active !== undefined ? { active: query.active } : {}),
    ...(query.category ? { category: query.category } : {}),
    ...(query.search ? { name: { contains: query.search } } : {}),
  };
  const [total, items] = await prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy: [orderByMap[query.sort], { id: 'asc' }],
      ...paginate(query.page, query.pageSize),
    }),
  ]);
  return pageResult(items.map(toProductDto), total, query.page, query.pageSize);
}

export async function getProduct(id: number, onlyActive: boolean) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || (onlyActive && !product.active)) throw AppError.notFound('Produto não encontrado', 'PRODUCT_NOT_FOUND');
  return toProductDto(product);
}

export async function listCategories() {
  const rows = await prisma.product.findMany({
    where: { active: true },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  });
  return rows.map((r) => r.category);
}

async function assertSkuAvailable(sku: string, ignoreId?: number) {
  const existing = await prisma.product.findUnique({ where: { sku } });
  if (existing && existing.id !== ignoreId) {
    throw AppError.conflict('SKU_ALREADY_EXISTS', 'Já existe um produto com este SKU');
  }
}

export async function createProduct(input: CreateProductInput, userId: number) {
  await assertSkuAvailable(input.sku);
  const { stock, ...data } = input;
  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({ data: { ...data, stock: 0 } });
    if (stock > 0) {
      await changeStock(tx, { productId: created.id, type: 'ENTRY', quantity: stock, reason: 'Estoque inicial', userId });
    }
    return tx.product.findUniqueOrThrow({ where: { id: created.id } });
  });
  return toProductDto(product);
}

export async function updateProduct(id: number, input: UpdateProductInput) {
  await getProduct(id, false);
  await assertSkuAvailable(input.sku, id);
  return toProductDto(await prisma.product.update({ where: { id }, data: input }));
}

/** Soft delete: apenas marca active=false. */
export async function deactivateProduct(id: number) {
  await getProduct(id, false);
  await prisma.product.update({ where: { id }, data: { active: false } });
}

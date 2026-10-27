import { prisma } from '../../prisma/client';
import { AppError } from '../../utils/app-error';
import { round2 } from '../../utils/money';
import type { AddItemInput } from './cart.schema';

/** Regra pura: a quantidade total desejada não pode exceder o estoque. */
export function assertQuantityAvailable(stock: number, desired: number, inCart = 0) {
  if (stock <= 0) throw AppError.conflict('OUT_OF_STOCK', 'Produto indisponível (sem estoque)');
  if (desired > stock) {
    throw AppError.conflict('INSUFFICIENT_STOCK', `Quantidade solicitada excede o estoque disponível (${stock})`, [
      { available: stock, requested: desired, inCart },
    ]);
  }
}

async function getOrCreateCart(userId: number) {
  return prisma.cart.upsert({ where: { userId }, update: {}, create: { userId } });
}

export async function getCart(userId: number) {
  const cart = await getOrCreateCart(userId);
  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
    orderBy: { id: 'asc' },
  });

  const lines = items.map((i) => ({
    productId: i.productId,
    name: i.product.name,
    sku: i.product.sku,
    imageUrl: i.product.imageUrl,
    unitPrice: i.product.price,
    quantity: i.quantity,
    subtotal: round2(i.product.price * i.quantity),
    stock: i.product.stock,
    // false se o produto foi desativado ou o estoque caiu abaixo da quantidade no carrinho
    available: i.product.active && i.product.stock >= i.quantity,
  }));

  return {
    id: cart.id,
    items: lines,
    totalItems: lines.reduce((sum, l) => sum + l.quantity, 0),
    total: round2(lines.reduce((sum, l) => sum + l.subtotal, 0)),
  };
}

async function findActiveProduct(productId: number) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.active) throw AppError.notFound('Produto não encontrado', 'PRODUCT_NOT_FOUND');
  return product;
}

/** Se o produto já está no carrinho, soma a quantidade. */
export async function addItem(userId: number, input: AddItemInput) {
  const product = await findActiveProduct(input.productId);
  const cart = await getOrCreateCart(userId);
  const existing = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
  });
  const inCart = existing?.quantity ?? 0;
  assertQuantityAvailable(product.stock, inCart + input.quantity, inCart);

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    update: { quantity: inCart + input.quantity },
    create: { cartId: cart.id, productId: product.id, quantity: input.quantity },
  });
  return getCart(userId);
}

async function findCartItem(userId: number, productId: number) {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
    include: { product: true },
  });
  if (!item) throw AppError.notFound('Item não encontrado no carrinho', 'CART_ITEM_NOT_FOUND');
  return item;
}

/** Define a quantidade (valor absoluto) de um item já existente no carrinho. */
export async function updateItem(userId: number, productId: number, quantity: number) {
  const item = await findCartItem(userId, productId);
  if (!item.product.active) throw AppError.notFound('Produto não encontrado', 'PRODUCT_NOT_FOUND');
  assertQuantityAvailable(item.product.stock, quantity, item.quantity);
  await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
  return getCart(userId);
}

export async function removeItem(userId: number, productId: number) {
  const item = await findCartItem(userId, productId);
  await prisma.cartItem.delete({ where: { id: item.id } });
  return getCart(userId);
}

export async function clearCart(userId: number) {
  const cart = await getOrCreateCart(userId);
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
}

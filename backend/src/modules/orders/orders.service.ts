import type { Prisma } from '@prisma/client';
import type { Role } from '../../constants';
import { prisma } from '../../prisma/client';
import { AppError } from '../../utils/app-error';
import { pageResult, paginate } from '../../utils/pagination';
import { findStockProblems, getCart } from '../cart/cart.service';
import { processPayment } from '../payments/payments.service';
import { changeStock } from '../stock/stock.service';
import type { CreateOrderInput, ListOrdersQuery } from './orders.schema';
import { calculateTotals } from './orders.pricing';

const orderInclude = { items: { orderBy: { id: 'asc' } }, user: { select: { id: true, name: true, email: true } } } as const;
type OrderWithRelations = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;

export function toOrderDto(o: OrderWithRelations, includeUser = false) {
  return {
    id: o.id,
    userId: o.userId,
    ...(includeUser ? { user: o.user } : {}),
    status: o.status,
    subtotal: o.subtotal,
    discount: o.discount,
    shipping: o.shipping,
    total: o.total,
    couponCode: o.couponCode,
    paymentMethod: o.paymentMethod,
    cardLast4: o.cardLast4,
    address: {
      street: o.addressStreet,
      number: o.addressNumber,
      complement: o.addressComplement,
      district: o.addressDistrict,
      city: o.addressCity,
      state: o.addressState,
      zip: o.addressZip,
    },
    items: o.items.map((i) => ({
      productId: i.productId,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      subtotal: Math.round(i.price * i.quantity * 100) / 100,
    })),
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  };
}

/** Falha com 409 OUT_OF_STOCK (details = itens problemáticos) se algum item do carrinho não puder ser atendido. */
function assertCartAvailable(items: Parameters<typeof findStockProblems>[0]) {
  const problems = findStockProblems(items);
  if (problems.length > 0) {
    throw AppError.conflict('OUT_OF_STOCK', `Estoque insuficiente para: ${problems.map((p) => p.name).join(', ')}`, problems);
  }
}

/** Revisão do checkout: cálculo de subtotal, desconto, frete e total sem criar pedido. */
export async function quote(userId: number, couponCode?: string) {
  const cart = await getCart(userId);
  if (cart.items.length === 0) throw AppError.unprocessable('CART_EMPTY', 'O carrinho está vazio');
  assertCartAvailable(cart.items);
  return {
    items: cart.items,
    totalItems: cart.totalItems,
    hasPriceChanges: cart.hasPriceChanges,
    ...calculateTotals(cart.total, couponCode),
  };
}

export async function createOrder(userId: number, input: CreateOrderInput) {
  const cart = await getCart(userId);
  if (cart.items.length === 0) throw AppError.unprocessable('CART_EMPTY', 'O carrinho está vazio');

  const totals = calculateTotals(cart.total, input.couponCode);
  // Antes do pagamento: nenhum pedido (nem PAYMENT_FAILED) é criado para itens sem estoque
  assertCartAvailable(cart.items);
  const payment = processPayment(input.payment);
  const { address } = input;

  const base = {
    userId,
    subtotal: totals.subtotal,
    discount: totals.discount,
    shipping: totals.shipping,
    total: totals.total,
    couponCode: totals.couponCode,
    paymentMethod: input.payment.method,
    cardLast4: payment.cardLast4,
    addressStreet: address.street,
    addressNumber: address.number,
    addressComplement: address.complement ?? null,
    addressDistrict: address.district,
    addressCity: address.city,
    addressState: address.state,
    addressZip: address.zip,
    items: {
      create: cart.items.map((i) => ({ productId: i.productId, name: i.name, price: i.unitPrice, quantity: i.quantity })),
    },
  };

  // Pagamento recusado ou com erro: registra o pedido como PAYMENT_FAILED, sem tocar no estoque/carrinho
  if (payment.outcome !== 'APPROVED') {
    const failed = await prisma.order.create({ data: { ...base, status: 'PAYMENT_FAILED' } });
    const details = [{ orderId: failed.id }];
    if (payment.outcome === 'DECLINED') {
      throw AppError.unprocessable('PAYMENT_DECLINED', 'Pagamento recusado pela operadora', details);
    }
    const err = AppError.unavailable('PAYMENT_UNAVAILABLE', 'Serviço de pagamento indisponível. Tente novamente.');
    throw new AppError(err.status, err.code, err.message, details);
  }

  // Pagamento aprovado: pedido + baixa de estoque + limpeza do carrinho em UMA transação
  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({ data: { ...base, status: 'PAID' } });

    const products = await tx.product.findMany({ where: { id: { in: cart.items.map((i) => i.productId) } } });
    const problems = cart.items.flatMap((item) => {
      const product = products.find((p) => p.id === item.productId);
      const available = product && product.active ? product.stock : 0;
      return available < item.quantity
        ? [{ productId: item.productId, name: item.name, available, requested: item.quantity }]
        : [];
    });
    if (problems.length > 0) {
      throw AppError.conflict(
        'OUT_OF_STOCK',
        `Estoque insuficiente para: ${problems.map((p) => p.name).join(', ')}`,
        problems,
      );
    }

    for (const item of cart.items) {
      await changeStock(tx, {
        productId: item.productId,
        type: 'EXIT',
        quantity: item.quantity,
        reason: `Pedido #${created.id}`,
        userId,
      });
    }
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return tx.order.findUniqueOrThrow({ where: { id: created.id }, include: orderInclude });
  });

  return toOrderDto(order);
}

async function listOrders(where: Prisma.OrderWhereInput, query: ListOrdersQuery, includeUser: boolean) {
  const [total, orders] = await prisma.$transaction([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      include: orderInclude,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      ...paginate(query.page, query.pageSize),
    }),
  ]);
  return pageResult(orders.map((o) => toOrderDto(o, includeUser)), total, query.page, query.pageSize);
}

export const listMyOrders = (userId: number, query: ListOrdersQuery) =>
  listOrders({ userId, ...(query.status ? { status: query.status } : {}) }, query, false);

export const listAllOrders = (query: ListOrdersQuery) =>
  listOrders(query.status ? { status: query.status } : {}, query, true);

/** `ownerId` restringe o acesso ao dono do pedido (cliente); ADMIN passa undefined. */
export async function getOrder(id: number, ownerId?: number) {
  const order = await prisma.order.findUnique({ where: { id }, include: orderInclude });
  if (!order || (ownerId !== undefined && order.userId !== ownerId)) {
    throw AppError.notFound('Pedido não encontrado', 'ORDER_NOT_FOUND');
  }
  return order;
}

/** Cancela pedido PAID e devolve o estoque (movimentação ENTRY por item). */
export async function cancelOrder(id: number, actor: { id: number; role: Role }) {
  const order = await getOrder(id, actor.role === 'ADMIN' ? undefined : actor.id);
  if (order.status !== 'PAID') {
    throw AppError.conflict('INVALID_ORDER_STATE', `Somente pedidos PAID podem ser cancelados (status atual: ${order.status})`);
  }

  const cancelled = await prisma.$transaction(async (tx) => {
    const updated = await tx.order.updateMany({ where: { id, status: 'PAID' }, data: { status: 'CANCELLED' } });
    if (updated.count === 0) {
      throw AppError.conflict('INVALID_ORDER_STATE', 'O pedido já foi cancelado');
    }
    for (const item of order.items) {
      await changeStock(tx, {
        productId: item.productId,
        type: 'ENTRY',
        quantity: item.quantity,
        reason: `Cancelamento do pedido #${id}`,
        userId: actor.id,
      });
    }
    return tx.order.findUniqueOrThrow({ where: { id }, include: orderInclude });
  });

  return toOrderDto(cancelled, actor.role === 'ADMIN');
}

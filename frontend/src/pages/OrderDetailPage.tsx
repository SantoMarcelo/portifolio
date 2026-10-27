import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, type ApiError } from '../api/client'
import type { Order } from '../api/types'
import { ConfirmButton, ErrorBox, Loading, StatusBadge } from '../components/ui'
import { brl, formatDate, PAYMENT_LABEL } from '../format'
import { useFetch } from '../hooks'

/** Detalhe do pedido. Com `admin`, usa as rotas /admin/orders (qualquer pedido). */
export default function OrderDetailPage({ admin = false }: { admin?: boolean }) {
  const { id } = useParams()
  const base = admin ? '/admin/orders' : '/orders'
  const { data: order, error, loading, reload } = useFetch(() => api.get<Order>(`${base}/${id}`), [id, base])
  const [cancelError, setCancelError] = useState<ApiError | null>(null)

  async function cancel() {
    setCancelError(null)
    try {
      await api.post(`${base}/${id}/cancel`)
      reload()
    } catch (err) {
      setCancelError(err as ApiError)
    }
  }

  if (loading && !order) return <Loading testId="order-detail-loading" />
  if (error?.status === 404) {
    return (
      <div data-testid="order-not-found">
        <h1>Pedido não encontrado</h1>
        <Link to={admin ? '/admin/orders' : '/orders'} data-testid="order-back-link">
          Voltar
        </Link>
      </div>
    )
  }
  if (error || !order) return <ErrorBox error={error} testId="order-detail-error" />

  const a = order.address
  return (
    <div data-testid="order-detail-page">
      <Link to={admin ? '/admin/orders' : '/orders'} data-testid="order-back-link">
        ← Voltar
      </Link>
      <h1>
        Pedido #<span data-testid="order-detail-id">{order.id}</span>
      </h1>
      <p>
        <StatusBadge status={order.status} testId="order-detail-status" />{' '}
        <span className="muted" data-testid="order-detail-date">
          {formatDate(order.createdAt)}
        </span>
      </p>
      {admin && order.user && (
        <p data-testid="order-detail-customer">
          Cliente: {order.user.name} ({order.user.email})
        </p>
      )}

      <div className="table-wrap">

        <table data-testid="order-items-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((i) => (
            <tr key={i.productId} data-testid={`order-item-${i.productId}`}>
              <td data-testid={`order-item-name-${i.productId}`}>{i.name}</td>
              <td data-testid={`order-item-price-${i.productId}`}>{brl(i.price)}</td>
              <td data-testid={`order-item-quantity-${i.productId}`}>{i.quantity}</td>
              <td data-testid={`order-item-subtotal-${i.productId}`}>{brl(i.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>

      <div className="summary panel">
        <div>
          <span>Subtotal</span>
          <span data-testid="order-detail-subtotal">{brl(order.subtotal)}</span>
        </div>
        <div>
          <span>Desconto{order.couponCode ? ` (${order.couponCode})` : ''}</span>
          <span data-testid="order-detail-discount">{brl(order.discount)}</span>
        </div>
        <div>
          <span>Frete</span>
          <span data-testid="order-detail-shipping">{brl(order.shipping)}</span>
        </div>
        <div className="total">
          <span>Total</span>
          <span data-testid="order-detail-total">{brl(order.total)}</span>
        </div>
      </div>

      <div className="panel">
        <p data-testid="order-detail-coupon">Cupom: {order.couponCode ?? '—'}</p>
        <p data-testid="order-detail-payment">
          Pagamento: {PAYMENT_LABEL[order.paymentMethod]}
          {order.cardLast4 && ` (final ${order.cardLast4})`}
        </p>
        <p data-testid="order-detail-address">
          Entrega: {a.street}, {a.number}
          {a.complement ? ` - ${a.complement}` : ''} — {a.district}, {a.city}/{a.state} — CEP {a.zip}
        </p>
      </div>

      <ErrorBox error={cancelError} testId="order-cancel-error" />
      {order.status === 'PAID' && (
        <ConfirmButton testId="order-cancel-button" label="Cancelar pedido" onConfirm={cancel} />
      )}
    </div>
  )
}

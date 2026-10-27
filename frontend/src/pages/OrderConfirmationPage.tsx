import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Order } from '../api/types'
import { ErrorBox, Loading, StatusBadge } from '../components/ui'
import { brl } from '../format'
import { useFetch } from '../hooks'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const { data: order, error, loading } = useFetch(() => api.get<Order>(`/orders/${id}`), [id])

  if (loading && !order) return <Loading testId="order-confirmation-loading" />
  if (error || !order) return <ErrorBox error={error} testId="order-confirmation-error" />

  return (
    <div data-testid="order-confirmation-page">
      <h1 data-testid="order-confirmation-title">Pedido confirmado!</h1>
      <p className="alert alert-success" role="status">
        Recebemos seu pedido.
      </p>
      <p>
        Número do pedido: <strong data-testid="order-confirmation-id">{order.id}</strong>
      </p>
      <p>
        Status: <StatusBadge status={order.status} testId="order-confirmation-status" />
      </p>
      <p>
        Total: <strong data-testid="order-confirmation-total">{brl(order.total)}</strong>
      </p>
      <p>
        <Link to={`/orders/${order.id}`} data-testid="order-confirmation-details-link">
          Ver detalhes do pedido
        </Link>{' '}
        |{' '}
        <Link to="/" data-testid="order-confirmation-continue-link">
          Continuar comprando
        </Link>
      </p>
    </div>
  )
}

import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import { ORDER_STATUSES, type Order, type Paginated } from '../api/types'
import { ErrorBox, Loading, Pagination, StatusBadge } from '../components/ui'
import { brl, formatDate, STATUS_LABEL } from '../format'
import { useFetch } from '../hooks'

export default function OrdersPage() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const page = Number(params.get('page') ?? 1)
  const { data, error, loading } = useFetch(
    () => api.get<Paginated<Order>>('/orders', { status, page, pageSize: 10 }),
    [status, page],
  )

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) v ? next.set(k, v) : next.delete(k)
    if (!('page' in changes)) next.delete('page')
    setParams(next)
  }

  return (
    <div data-testid="orders-page">
      <h1>Meus pedidos</h1>
      <div className="toolbar">
        <select value={status} onChange={(e) => update({ status: e.target.value })} data-testid="orders-status-filter">
          <option value="">Todos os status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </div>
      <ErrorBox error={error} testId="orders-error" />
      {loading && !data && <Loading testId="orders-loading" />}
      {data && data.data.length === 0 && <p data-testid="orders-empty">Você ainda não tem pedidos.</p>}
      {data && data.data.length > 0 && (
        <>
          <div className="table-wrap">
            <table data-testid="orders-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Status</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.data.map((o) => (
                <tr key={o.id} data-testid={`order-row-${o.id}`}>
                  <td data-testid={`order-row-id-${o.id}`}>#{o.id}</td>
                  <td data-testid={`order-row-date-${o.id}`}>{formatDate(o.createdAt)}</td>
                  <td>
                    <StatusBadge status={o.status} testId={`order-row-status-${o.id}`} />
                  </td>
                  <td data-testid={`order-row-total-${o.id}`}>{brl(o.total)}</td>
                  <td>
                    <Link to={`/orders/${o.id}`} data-testid={`order-row-link-${o.id}`}>
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Pagination pagination={data.pagination} onPage={(p) => update({ page: String(p) })} />
        </>
      )}
    </div>
  )
}

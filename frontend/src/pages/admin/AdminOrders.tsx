import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api, type ApiError } from '../../api/client'
import { ORDER_STATUSES, type Order, type Paginated } from '../../api/types'
import { ConfirmButton, ErrorBox, Loading, Pagination, StatusBadge } from '../../components/ui'
import { brl, formatDate, STATUS_LABEL } from '../../format'
import { useFetch } from '../../hooks'

export default function AdminOrders() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const page = Number(params.get('page') ?? 1)
  const [actionError, setActionError] = useState<ApiError | null>(null)
  const { data, error, loading, reload } = useFetch(
    () => api.get<Paginated<Order>>('/admin/orders', { status, page, pageSize: 10 }),
    [status, page],
  )

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) v ? next.set(k, v) : next.delete(k)
    if (!('page' in changes)) next.delete('page')
    setParams(next)
  }

  async function cancel(id: number) {
    setActionError(null)
    try {
      await api.post(`/admin/orders/${id}/cancel`)
      reload()
    } catch (err) {
      setActionError(err as ApiError)
    }
  }

  return (
    <div data-testid="admin-orders-page">
      <h1>Pedidos</h1>
      <div className="toolbar">
        <select value={status} onChange={(e) => update({ status: e.target.value })} data-testid="admin-orders-status-filter">
          <option value="">Todos os status</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
      </div>
      <ErrorBox error={error} testId="admin-orders-error" />
      <ErrorBox error={actionError} testId="admin-order-action-error" />
      {loading && !data && <Loading testId="admin-orders-loading" />}
      {data && data.data.length === 0 && <p data-testid="admin-orders-empty">Nenhum pedido encontrado.</p>}
      {data && data.data.length > 0 && (
        <>
          <div className="table-wrap">
            <table data-testid="admin-orders-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((o) => (
                <tr key={o.id} data-testid={`admin-order-row-${o.id}`}>
                  <td data-testid={`admin-order-id-${o.id}`}>#{o.id}</td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td data-testid={`admin-order-customer-${o.id}`}>{o.user?.email}</td>
                  <td>
                    <StatusBadge status={o.status} testId={`admin-order-status-${o.id}`} />
                  </td>
                  <td data-testid={`admin-order-total-${o.id}`}>{brl(o.total)}</td>
                  <td>
                    <span className="inline-actions">
                      <Link to={`/admin/orders/${o.id}`} className="btn" data-testid={`admin-order-link-${o.id}`}>
                        Detalhes
                      </Link>
                      {o.status === 'PAID' && (
                        <ConfirmButton testId={`admin-order-cancel-${o.id}`} label="Cancelar" onConfirm={() => cancel(o.id)} />
                      )}
                    </span>
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

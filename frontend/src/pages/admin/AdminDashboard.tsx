import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import { ORDER_STATUSES, type Dashboard } from '../../api/types'
import { ErrorBox, Loading } from '../../components/ui'
import { STATUS_LABEL } from '../../format'
import { useFetch } from '../../hooks'

export default function AdminDashboard() {
  const { data, error, loading } = useFetch(() => api.get<Dashboard>('/admin/dashboard'), [])

  return (
    <div data-testid="admin-dashboard-page">
      <h1>Dashboard</h1>
      <ErrorBox error={error} testId="dashboard-error" />
      {loading && !data && <Loading testId="dashboard-loading" />}
      {data && (
        <>
          <div className="stats">
            <div className="stat">
              <span>Produtos ativos</span>
              <strong data-testid="dashboard-total-products">{data.totalProducts}</strong>
            </div>
            <div className="stat">
              <span>Produtos inativos</span>
              <strong data-testid="dashboard-inactive-products">{data.inactiveProducts}</strong>
            </div>
            <div className="stat">
              <span>Pedidos</span>
              <strong data-testid="dashboard-total-orders">{data.totalOrders}</strong>
            </div>
            <div className="stat">
              <span>Estoque baixo (&lt; 5)</span>
              <strong data-testid="dashboard-low-stock">{data.lowStockProducts}</strong>
            </div>
            <div className="stat">
              <span>Sem estoque</span>
              <strong data-testid="dashboard-out-of-stock">{data.outOfStockProducts}</strong>
            </div>
          </div>
          <h2>Pedidos por status</h2>
          <div className="stats">
            {ORDER_STATUSES.map((s) => (
              <div className="stat" key={s}>
                <span>{STATUS_LABEL[s]}</span>
                <strong data-testid={`dashboard-orders-${s.toLowerCase().replace('_', '-')}`}>
                  {data.ordersByStatus[s]}
                </strong>
              </div>
            ))}
          </div>
          <p>
            <Link to="/admin/stock" data-testid="dashboard-stock-link">
              Gerenciar estoque
            </Link>
          </p>
        </>
      )}
    </div>
  )
}

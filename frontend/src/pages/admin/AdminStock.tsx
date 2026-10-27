import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api, fieldErrors, type ApiError } from '../../api/client'
import type { Paginated, Product, StockMovement, StockMovementType } from '../../api/types'
import { ErrorBox, FieldError, Loading, Pagination } from '../../components/ui'
import { formatDate, MOVEMENT_LABEL } from '../../format'
import { useFetch } from '../../hooks'

export default function AdminStock() {
  const [params, setParams] = useSearchParams()
  const productId = params.get('productId') ?? ''
  const [productPage, setProductPage] = useState(1)
  const [movementPage, setMovementPage] = useState(1)
  const [search, setSearch] = useState('')

  const [type, setType] = useState<StockMovementType>('ENTRY')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState<ApiError | null>(null)
  const [success, setSuccess] = useState('')
  const errors = fieldErrors(error)

  const products = useFetch(
    () => api.get<Paginated<Product>>('/admin/products', { search, page: productPage, pageSize: 8, active: 'true' }),
    [search, productPage],
  )
  const movements = useFetch(
    () => api.get<Paginated<StockMovement>>('/admin/stock/movements', { productId, page: movementPage, pageSize: 10 }),
    [productId, movementPage],
  )
  const selected = useFetch(() => (productId ? api.get<Product>(`/admin/products/${productId}`) : Promise.resolve(null)), [productId])

  function select(id: string) {
    const next = new URLSearchParams(params)
    if (id) next.set('productId', id)
    else next.delete('productId')
    setParams(next)
    setMovementPage(1)
    setError(null)
    setSuccess('')
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess('')
    try {
      await api.post(`/admin/products/${productId}/stock`, {
        type,
        quantity: quantity.trim() === '' ? undefined : Number(quantity),
        reason,
      })
      setSuccess('Movimentação registrada')
      setQuantity('')
      setReason('')
      products.reload()
      movements.reload()
      selected.reload()
    } catch (err) {
      setError(err as ApiError)
    }
  }

  const product = selected.data

  return (
    <div data-testid="admin-stock-page">
      <h1>Estoque</h1>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Buscar produto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setProductPage(1)
          }}
          data-testid="stock-search-input"
        />
      </div>
      <ErrorBox error={products.error} testId="stock-products-error" />
      {products.loading && !products.data && <Loading testId="stock-products-loading" />}
      {products.data && (
        <>
          <div className="table-wrap">
            <table data-testid="stock-products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>SKU</th>
                <th>Estoque</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.data.data.map((p) => (
                <tr key={p.id} className={String(p.id) === productId ? 'selected' : ''} data-testid={`stock-row-${p.id}`}>
                  <td>{p.id}</td>
                  <td data-testid={`stock-row-name-${p.id}`}>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>
                    <span data-testid={`stock-row-stock-${p.id}`}>{p.stock}</span>{' '}
                    {p.lowStock && (
                      <span className="badge low-stock" data-testid={`stock-low-badge-${p.id}`}>
                        Estoque baixo
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="btn" data-testid={`stock-adjust-button-${p.id}`} onClick={() => select(String(p.id))}>
                      Movimentar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Pagination pagination={products.data.pagination} onPage={setProductPage} />
        </>
      )}

      {product && (
        <div className="panel" data-testid="stock-form-panel">
          <h2>
            Movimentar: <span data-testid="stock-form-product-name">{product.name}</span> (estoque atual:{' '}
            <strong data-testid="stock-form-current-stock">{product.stock}</strong>)
          </h2>
          <form className="form" onSubmit={onSubmit} noValidate data-testid="stock-form">
            <label>
              Tipo
              <select value={type} onChange={(e) => setType(e.target.value as StockMovementType)} data-testid="stock-type-select">
                <option value="ENTRY">Entrada</option>
                <option value="EXIT">Saída</option>
                <option value="ADJUSTMENT">Ajuste manual (novo estoque)</option>
              </select>
            </label>
            <label>
              {type === 'ADJUSTMENT' ? 'Novo estoque' : 'Quantidade'}
              <input type="number" step="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} data-testid="stock-quantity-input" />
              <FieldError id="stock" errors={errors} field="quantity" />
            </label>
            <label>
              Motivo
              <input value={reason} onChange={(e) => setReason(e.target.value)} data-testid="stock-reason-input" />
              <FieldError id="stock" errors={errors} field="reason" />
            </label>
            <ErrorBox error={error} testId="stock-form-error" />
            {success && (
              <div className="alert alert-success" data-testid="stock-form-success">
                {success}
              </div>
            )}
            <div className="toolbar">
              <button className="btn btn-primary" type="submit" data-testid="stock-submit-button">
                Registrar
              </button>
              <button className="btn" type="button" data-testid="stock-clear-selection-button" onClick={() => select('')}>
                Limpar seleção
              </button>
            </div>
          </form>
        </div>
      )}

      <h2>Histórico de movimentações{product ? ` — ${product.name}` : ''}</h2>
      <ErrorBox error={movements.error} testId="stock-movements-error" />
      {movements.data && movements.data.data.length === 0 && <p data-testid="stock-movements-empty">Nenhuma movimentação.</p>}
      {movements.data && movements.data.data.length > 0 && (
        <>
          <div className="table-wrap">
            <table data-testid="stock-movements-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Qtd</th>
                <th>Estoque</th>
                <th>Motivo</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {movements.data.data.map((m) => (
                <tr key={m.id} data-testid={`stock-movement-row-${m.id}`}>
                  <td>{formatDate(m.createdAt)}</td>
                  <td data-testid={`stock-movement-product-${m.id}`}>{m.product.name}</td>
                  <td data-testid={`stock-movement-type-${m.id}`} data-type={m.type}>
                    {MOVEMENT_LABEL[m.type]}
                  </td>
                  <td data-testid={`stock-movement-quantity-${m.id}`}>{m.quantity}</td>
                  <td data-testid={`stock-movement-stock-${m.id}`}>
                    {m.previousStock} → {m.newStock}
                  </td>
                  <td data-testid={`stock-movement-reason-${m.id}`}>{m.reason}</td>
                  <td data-testid={`stock-movement-user-${m.id}`}>{m.user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <Pagination pagination={movements.data.pagination} onPage={setMovementPage} />
        </>
      )}
    </div>
  )
}

import { useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api, fieldErrors, type ApiError } from '../../api/client'
import type { Paginated, Product, StockMovement, StockMovementType } from '../../api/types'
import { ErrorBox, FieldError, Loading, Pagination } from '../../components/ui'
import { formatDate, MOVEMENT_LABEL } from '../../format'
import { useDebounced, useFetch } from '../../hooks'

type Tab = 'stock' | 'history'

export default function AdminStock() {
  const [params, setParams] = useSearchParams()
  const productId = params.get('productId') ?? ''
  const tab: Tab = params.get('tab') === 'history' ? 'history' : 'stock'
  const [productPage, setProductPage] = useState(1)
  const [movementPage, setMovementPage] = useState(1)
  const [search, setSearch] = useState('')

  const [type, setType] = useState<StockMovementType>('ENTRY')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState<ApiError | null>(null)
  const [success, setSuccess] = useState('')
  const errors = fieldErrors(error)

  // O filtro de produto (search) vale para as duas abas
  const products = useFetch(
    () => api.get<Paginated<Product>>('/admin/products', { search, page: productPage, pageSize: 8, active: 'true' }),
    [search, productPage],
  )
  // O histórico usa o mesmo filtro: sem filtro a lista fica vazia (nada é carregado)
  const historySearch = useDebounced(search.trim())
  const loadHistory = tab === 'history' && historySearch !== ''
  const movements = useFetch(
    () =>
      loadHistory
        ? api.get<Paginated<StockMovement>>('/admin/stock/movements', { search: historySearch, page: movementPage, pageSize: 10 })
        : Promise.resolve(null),
    [loadHistory, historySearch, movementPage],
  )
  const selected = useFetch(() => (productId ? api.get<Product>(`/admin/products/${productId}`) : Promise.resolve(null)), [productId])

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next)
  }

  function select(id: string) {
    update({ productId: id })
    setMovementPage(1)
    setError(null)
    setSuccess('')
  }

  function changeTab(next: Tab) {
    update({ tab: next === 'history' ? 'history' : '' })
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
      selected.reload()
    } catch (err) {
      setError(err as ApiError)
    }
  }

  const product = selected.data

  const productsTable = (action: (p: Product) => ReactNode) =>
    products.data && (
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
                  <td>{action(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pagination={products.data.pagination} onPage={setProductPage} testId="stock-products-pagination" />
      </>
    )

  return (
    <div data-testid="admin-stock-page">
      <h1>Estoque</h1>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Buscar produto"
          aria-label="Buscar produto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setProductPage(1)
            setMovementPage(1)
          }}
          data-testid="stock-search-input"
        />
      </div>

      <div className="tabs" role="tablist" aria-label="Estoque" data-testid="stock-tabs">
        <button
          role="tab"
          id="stock-tab-stock"
          aria-selected={tab === 'stock'}
          aria-controls="stock-panel-stock"
          className="tab"
          data-testid="stock-tab-stock"
          onClick={() => changeTab('stock')}
        >
          Estoque
        </button>
        <button
          role="tab"
          id="stock-tab-history"
          aria-selected={tab === 'history'}
          aria-controls="stock-panel-history"
          className="tab"
          data-testid="stock-tab-history"
          onClick={() => changeTab('history')}
        >
          Histórico de movimentações
        </button>
      </div>

      {tab === 'stock' && (
        <div role="tabpanel" id="stock-panel-stock" aria-labelledby="stock-tab-stock" data-testid="stock-tab-panel-stock">
          <ErrorBox error={products.error} testId="stock-products-error" />
          {products.loading && !products.data && <Loading testId="stock-products-loading" />}
          {productsTable((p) => (
            <button className="btn" data-testid={`stock-adjust-button-${p.id}`} onClick={() => select(String(p.id))}>
              Movimentar
            </button>
          ))}

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
        </div>
      )}

      {tab === 'history' && (
        <div role="tabpanel" id="stock-panel-history" aria-labelledby="stock-tab-history" data-testid="stock-tab-panel-history">
          <ErrorBox error={movements.error} testId="stock-movements-error" />
          {loadHistory && movements.loading && !movements.data && <Loading testId="stock-movements-loading" />}
          {!loadHistory && (
            <p className="muted" data-testid="stock-movements-empty">
              Nenhuma movimentação. Digite o nome de um produto no filtro para ver o histórico.
            </p>
          )}
          {loadHistory && movements.data && movements.data.data.length === 0 && (
            <p data-testid="stock-movements-empty">Nenhuma movimentação encontrada para este filtro.</p>
          )}
          {loadHistory && movements.data && movements.data.data.length > 0 && (
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
              <Pagination pagination={movements.data.pagination} onPage={setMovementPage} testId="stock-movements-pagination" />
            </>
          )}
        </div>
      )}
    </div>
  )
}

import { useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api, type ApiError } from '../../api/client'
import type { Paginated, Product } from '../../api/types'
import { ConfirmButton, ErrorBox, Loading, Pagination } from '../../components/ui'
import { brl } from '../../format'
import { useFetch } from '../../hooks'

export default function AdminProducts() {
  const [params, setParams] = useSearchParams()
  const search = params.get('search') ?? ''
  const category = params.get('category') ?? ''
  const active = params.get('active') ?? ''
  const page = Number(params.get('page') ?? 1)
  const [searchText, setSearchText] = useState(search)
  const [actionError, setActionError] = useState<ApiError | null>(null)

  useEffect(() => setSearchText(search), [search])

  const categories = useFetch(() => api.get<string[]>('/categories'), [])
  const { data, error, loading, reload } = useFetch(
    () => api.get<Paginated<Product>>('/admin/products', { search, category, active, page, pageSize: 10 }),
    [search, category, active, page],
  )

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(changes)) v ? next.set(k, v) : next.delete(k)
    if (!('page' in changes)) next.delete('page')
    setParams(next)
  }

  async function remove(id: number) {
    setActionError(null)
    try {
      await api.delete(`/admin/products/${id}`)
      reload()
    } catch (err) {
      setActionError(err as ApiError)
    }
  }

  return (
    <div data-testid="admin-products-page">
      <h1>Produtos</h1>
      <form
        className="toolbar"
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
          update({ search: searchText.trim() })
        }}
      >
        <input
          type="search"
          placeholder="Buscar por nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          data-testid="admin-product-search-input"
        />
        <button className="btn" type="submit" data-testid="admin-product-search-button">
          Buscar
        </button>
        <select value={category} onChange={(e) => update({ category: e.target.value })} data-testid="admin-product-category-filter">
          <option value="">Todas as categorias</option>
          {categories.data?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={active} onChange={(e) => update({ active: e.target.value })} data-testid="admin-product-status-filter">
          <option value="">Ativos e inativos</option>
          <option value="true">Somente ativos</option>
          <option value="false">Somente inativos</option>
        </select>
        <Link to="/admin/products/new" className="btn btn-primary" data-testid="admin-product-new-button">
          Novo produto
        </Link>
      </form>

      <ErrorBox error={error} testId="admin-products-error" />
      <ErrorBox error={actionError} testId="admin-product-action-error" />
      {loading && !data && <Loading testId="admin-products-loading" />}
      {data && data.data.length === 0 && <p data-testid="admin-products-empty">Nenhum produto encontrado.</p>}
      {data && data.data.length > 0 && (
        <>
          <div className="table-wrap">
            <table data-testid="admin-products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>SKU</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((p) => (
                <tr key={p.id} className={p.active ? '' : 'inactive'} data-testid={`admin-product-row-${p.id}`}>
                  <td data-testid={`admin-product-id-${p.id}`}>{p.id}</td>
                  <td data-testid={`admin-product-name-${p.id}`}>{p.name}</td>
                  <td data-testid={`admin-product-sku-${p.id}`}>{p.sku}</td>
                  <td data-testid={`admin-product-category-${p.id}`}>{p.category}</td>
                  <td data-testid={`admin-product-price-${p.id}`}>{brl(p.price)}</td>
                  <td>
                    <span data-testid={`admin-product-stock-${p.id}`}>{p.stock}</span>{' '}
                    {p.lowStock && (
                      <span className="badge low-stock" data-testid={`low-stock-badge-${p.id}`}>
                        Estoque baixo
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${p.active ? 'active' : 'unavailable'}`}
                      data-testid={`admin-product-active-${p.id}`}
                      data-active={p.active}
                    >
                      {p.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <span className="inline-actions">
                      <Link to={`/admin/products/${p.id}/edit`} className="btn" data-testid={`admin-product-edit-${p.id}`}>
                        Editar
                      </Link>
                      <Link to={`/admin/stock?productId=${p.id}`} className="btn" data-testid={`admin-product-stock-link-${p.id}`}>
                        Estoque
                      </Link>
                      {p.active && (
                        <ConfirmButton testId={`admin-product-delete-${p.id}`} label="Remover" onConfirm={() => remove(p.id)} />
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

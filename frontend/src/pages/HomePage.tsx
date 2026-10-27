import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Paginated, Product } from '../api/types'
import { ProductCard } from '../components/ProductCard'
import { ErrorBox, Loading, Pagination } from '../components/ui'
import { useFetch } from '../hooks'

export default function HomePage() {
  const [params, setParams] = useSearchParams()
  const search = params.get('search') ?? ''
  const category = params.get('category') ?? ''
  const sort = params.get('sort') ?? 'id_asc'
  const page = Number(params.get('page') ?? 1)
  const [searchText, setSearchText] = useState(search)

  useEffect(() => setSearchText(search), [search])

  const categories = useFetch(() => api.get<string[]>('/categories'), [])
  const products = useFetch(
    () => api.get<Paginated<Product>>('/products', { search, category, sort, page, pageSize: 8 }),
    [search, category, sort, page],
  )

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    if (!('page' in changes)) next.delete('page')
    setParams(next)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    update({ search: searchText.trim() })
  }

  return (
    <div data-testid="home-page">
      <section className="hero" aria-labelledby="hero-title">
        <div>
          <span className="eyebrow">Coleção outono</span>
          <h1 id="hero-title">Objetos bem escolhidos para o seu dia a dia.</h1>
          <p className="lead">Móveis, periféricos e peças de casa selecionados por qualidade e durabilidade.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          Loja.QA
        </div>
      </section>
      <h2 data-testid="home-title" style={{ marginTop: 0 }}>
        Produtos
      </h2>
      <form className="toolbar" onSubmit={onSubmit} role="search" aria-label="Buscar e filtrar produtos">
        <input
          type="search"
          placeholder="Buscar por nome"
          aria-label="Buscar por nome"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          data-testid="search-input"
        />
        <button className="btn btn-primary" type="submit" data-testid="search-button">
          Buscar
        </button>
        <select value={category} onChange={(e) => update({ category: e.target.value })} data-testid="category-filter" aria-label="Categoria">
          <option value="">Todas as categorias</option>
          {categories.data?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={sort} onChange={(e) => update({ sort: e.target.value })} data-testid="sort-select" aria-label="Ordenar por">
          <option value="id_asc">Relevância</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="name_asc">Nome (A-Z)</option>
        </select>
      </form>

      <ErrorBox error={products.error} testId="products-error" />
      {products.loading && !products.data && <Loading testId="products-loading" />}
      {products.data && products.data.data.length === 0 && (
        <p data-testid="products-empty">Nenhum produto encontrado.</p>
      )}
      {products.data && products.data.data.length > 0 && (
        <>
          <p className="muted" role="status" data-testid="products-count">
            {products.data.pagination.total} produto(s)
          </p>
          <div className="grid" data-testid="product-grid">
            {products.data.data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination pagination={products.data.pagination} onPage={(p) => update({ page: String(p) })} />
        </>
      )}
    </div>
  )
}

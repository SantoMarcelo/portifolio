import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../api/client'
import type { Product } from '../api/types'
import { AddToCartButton } from '../components/AddToCartButton'
import { ErrorBox, Loading } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { brl } from '../format'
import { useFetch } from '../hooks'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const { data: p, error, loading } = useFetch(() => api.get<Product>(`/products/${id}`), [id])

  if (loading && !p) return <Loading testId="product-loading" />
  if (error?.status === 404) {
    return (
      <div data-testid="product-not-found">
        <h1>Produto não encontrado</h1>
        <Link to="/" data-testid="product-back-link">
          Voltar para a vitrine
        </Link>
      </div>
    )
  }
  if (error || !p) return <ErrorBox error={error} testId="product-error" />

  return (
    <div data-testid="product-detail-page" data-product-id={p.id}>
      <nav className="crumbs" aria-label="Você está em">
        <Link to="/" data-testid="product-back-link">
          ← Voltar para a vitrine
        </Link>
      </nav>
      <div className="detail">
        <img src={p.imageUrl || '/images/placeholder.svg'} alt={p.name} data-testid="product-detail-image" />
        <div>
          <span className="eyebrow" data-testid="product-detail-category">
            {p.category}
          </span>
          <h1 data-testid="product-detail-name">{p.name}</h1>
          <p className="price" data-testid="product-detail-price">
            {brl(p.price)}
          </p>
          <p data-testid="product-detail-description">{p.description}</p>
          <p className="muted">
            SKU: <span data-testid="product-detail-sku">{p.sku}</span>
          </p>
          {p.inStock ? (
            <p data-testid="product-detail-stock">
              Em estoque: <strong data-testid="product-detail-stock-value">{p.stock}</strong>
              {p.lowStock && (
                <span className="badge low-stock" data-testid="product-low-stock-badge">
                  Estoque baixo
                </span>
              )}
            </p>
          ) : (
            <p>
              <span className="badge unavailable" data-testid="product-unavailable-badge">
                Indisponível
              </span>
            </p>
          )}
          {user?.role === 'ADMIN' ? (
            <p className="muted" data-testid="admin-cannot-buy-notice">
              Administradores não podem comprar.
            </p>
          ) : (
            <div className="toolbar buy">
              <label>
                Quantidade
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  data-testid="quantity-input"
                  disabled={!p.inStock}
                />
              </label>
              <AddToCartButton productId={p.id} quantity={quantity} disabled={!p.inStock} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

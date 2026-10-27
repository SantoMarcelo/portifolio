import { Link } from 'react-router-dom'
import type { Product } from '../api/types'
import { brl } from '../format'
import { AddToCartButton } from './AddToCartButton'

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="card" data-testid={`product-card-${p.id}`} data-stock={p.stock}>
      <div className="media">
        <img src={p.imageUrl || '/images/placeholder.svg'} alt={p.name} data-testid={`product-image-${p.id}`} />
        {p.inStock ? (
          p.lowStock && (
            <span className="badge low-stock" data-testid={`product-low-stock-badge-${p.id}`}>
              Últimas {p.stock} unidades
            </span>
          )
        ) : (
          <span className="badge unavailable" data-testid={`product-unavailable-badge-${p.id}`}>
            Indisponível
          </span>
        )}
      </div>
      <span className="cat" data-testid={`product-category-${p.id}`}>
        {p.category}
      </span>
      <h3>
        <Link to={`/products/${p.id}`} data-testid={`product-link-${p.id}`} title={p.name}>
          <span data-testid={`product-name-${p.id}`}>{p.name}</span>
        </Link>
      </h3>
      {p.description && (
        <p className="desc" data-testid={`product-description-${p.id}`}>
          {p.description}
        </p>
      )}
      <div className="actions">
        <span className="price" data-testid={`product-price-${p.id}`}>
          {brl(p.price)}
        </span>
        <AddToCartButton productId={p.id} disabled={!p.inStock} testId={`add-to-cart-button-${p.id}`} />
      </div>
    </article>
  )
}

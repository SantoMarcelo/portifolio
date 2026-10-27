import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ApiError } from '../api/client'
import { ErrorBox } from '../components/ui'
import { useCart } from '../context/CartContext'
import { brl } from '../format'

export default function CartPage() {
  const { cart, setQuantity, remove, clear } = useCart()
  const navigate = useNavigate()
  const [error, setError] = useState<ApiError | null>(null)

  async function run(action: () => Promise<void>) {
    setError(null)
    try {
      await action()
    } catch (err) {
      setError(err as ApiError)
    }
  }

  if (!cart) return <p data-testid="cart-loading">Carregando...</p>

  if (cart.items.length === 0) {
    return (
      <div data-testid="cart-page">
        <h1>Carrinho</h1>
        <p data-testid="cart-empty">Seu carrinho está vazio.</p>
        <Link to="/" data-testid="cart-continue-link">
          Continuar comprando
        </Link>
      </div>
    )
  }

  const hasUnavailable = cart.items.some((i) => !i.available)

  return (
    <div data-testid="cart-page">
      <h1>Carrinho</h1>
      <ErrorBox error={error} testId="cart-error" />
      <div className="table-wrap">
        <table data-testid="cart-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.items.map((i) => (
            <tr key={i.productId} data-testid={`cart-item-${i.productId}`}>
              <td>
                <Link to={`/products/${i.productId}`} data-testid={`cart-item-name-${i.productId}`}>
                  {i.name}
                </Link>
                {!i.available && (
                  <div>
                    <span className="badge unavailable" data-testid={`cart-item-unavailable-${i.productId}`}>
                      Indisponível na quantidade escolhida (estoque: {i.stock})
                    </span>
                  </div>
                )}
              </td>
              <td data-testid={`cart-item-price-${i.productId}`}>
                {brl(i.unitPrice)}
                {i.priceChanged && i.priceWhenAdded !== null && (
                  <div>
                    <span className="badge" data-testid={`cart-item-price-changed-${i.productId}`}>
                      Preço alterado (era {brl(i.priceWhenAdded)})
                    </span>
                  </div>
                )}
              </td>
              <td>
                <span className="qty" role="group" aria-label={`Quantidade de ${i.name}`}>
                  <button
                    className="btn"
                    aria-label="Diminuir"
                    disabled={i.quantity <= 1}
                    data-testid={`cart-item-decrease-${i.productId}`}
                    onClick={() => run(() => setQuantity(i.productId, i.quantity - 1))}
                  >
                    −
                  </button>
                  <span data-testid={`cart-item-quantity-${i.productId}`} aria-live="polite">
                    {i.quantity}
                  </span>
                  <button
                    className="btn"
                    aria-label="Aumentar"
                    data-testid={`cart-item-increase-${i.productId}`}
                    onClick={() => run(() => setQuantity(i.productId, i.quantity + 1))}
                  >
                    +
                  </button>
                </span>
              </td>
              <td data-testid={`cart-item-subtotal-${i.productId}`}>{brl(i.subtotal)}</td>
              <td>
                <button
                  className="btn btn-danger"
                  aria-label={`Remover ${i.name} do carrinho`}
                  data-testid={`cart-item-remove-${i.productId}`}
                  onClick={() => run(() => remove(i.productId))}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="summary">
        <div className="total">
          <span>Total</span>
          <span data-testid="cart-total">{brl(cart.total)}</span>
        </div>
        <p className="muted" data-testid="cart-total-items">
          {cart.totalItems} item(ns)
        </p>
      </div>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <button className="btn" data-testid="cart-clear-button" onClick={() => run(clear)}>
          Limpar carrinho
        </button>
        <button
          className="btn btn-primary"
          data-testid="cart-checkout-button"
          disabled={hasUnavailable}
          onClick={() => navigate('/checkout')}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  )
}

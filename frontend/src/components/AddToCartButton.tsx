import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ErrorBox } from './ui'

interface Props {
  productId: number
  quantity?: number
  disabled?: boolean
  testId?: string
  className?: string
}

/** Visitante é enviado ao login; ADMIN não compra (botão oculto). */
export function AddToCartButton({ productId, quantity = 1, disabled, testId = 'add-to-cart-button', className }: Props) {
  const { user } = useAuth()
  const { add } = useCart()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [added, setAdded] = useState(false)

  if (user?.role === 'ADMIN') return null

  async function onClick() {
    if (!user) return navigate('/login')
    setBusy(true)
    setError(null)
    setAdded(false)
    try {
      await add(productId, quantity)
      setAdded(true)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button className={className ?? 'btn btn-primary'} data-testid={testId} disabled={disabled || busy} onClick={onClick}>
        Adicionar ao carrinho
      </button>
      <span role="status">
        {added && (
          <span className="alert alert-success" data-testid={`${testId}-feedback`}>
            Adicionado ao carrinho
          </span>
        )}
      </span>
      <ErrorBox error={error} testId={`${testId}-error`} />
    </>
  )
}

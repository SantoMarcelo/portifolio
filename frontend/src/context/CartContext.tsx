import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api } from '../api/client'
import type { Cart } from '../api/types'
import { useAuth } from './AuthContext'

interface CartState {
  cart: Cart | null
  count: number
  refresh: () => Promise<void>
  add: (productId: number, quantity: number) => Promise<void>
  setQuantity: (productId: number, quantity: number) => Promise<void>
  remove: (productId: number) => Promise<void>
  clear: () => Promise<void>
}

const CartContext = createContext<CartState | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [cart, setCart] = useState<Cart | null>(null)
  const isCustomer = user?.role === 'CUSTOMER'

  const refresh = useCallback(async () => {
    setCart(isCustomer ? await api.get<Cart>('/cart') : null)
  }, [isCustomer])

  useEffect(() => {
    refresh().catch(() => setCart(null))
  }, [refresh])

  const value = useMemo<CartState>(
    () => ({
      cart,
      count: cart?.totalItems ?? 0,
      refresh,
      add: async (productId, quantity) => setCart(await api.post<Cart>('/cart/items', { productId, quantity })),
      setQuantity: async (productId, quantity) =>
        setCart(await api.patch<Cart>(`/cart/items/${productId}`, { quantity })),
      remove: async (productId) => setCart(await api.delete<Cart>(`/cart/items/${productId}`)),
      clear: async () => {
        await api.delete('/cart')
        await refresh()
      },
    }),
    [cart, refresh],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart fora do CartProvider')
  return ctx
}

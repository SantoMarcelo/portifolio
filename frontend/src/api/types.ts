export type Role = 'ADMIN' | 'CUSTOMER'
export type OrderStatus = 'PENDING' | 'PAID' | 'PAYMENT_FAILED' | 'CANCELLED'
export type PaymentMethod = 'CREDIT_CARD' | 'PIX' | 'BOLETO'
export type StockMovementType = 'ENTRY' | 'EXIT' | 'ADJUSTMENT'

export const ORDER_STATUSES: OrderStatus[] = ['PENDING', 'PAID', 'PAYMENT_FAILED', 'CANCELLED']

export interface User {
  id: number
  name: string
  email: string
  role: Role
  createdAt: string
}

export interface Session {
  token: string
  expiresIn: number
  expiresAt: string
  user: User
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  sku: string
  category: string
  imageUrl: string
  stock: number
  active: boolean
  inStock: boolean
  lowStock: boolean
  createdAt: string
  updatedAt: string
}

export interface Paginated<T> {
  data: T[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export interface CartItem {
  productId: number
  name: string
  sku: string
  imageUrl: string
  unitPrice: number
  quantity: number
  subtotal: number
  stock: number
  available: boolean
  priceWhenAdded: number | null
  priceChanged: boolean
}

export interface Cart {
  id: number
  items: CartItem[]
  totalItems: number
  total: number
  hasPriceChanges: boolean
}

export interface Quote {
  items: CartItem[]
  totalItems: number
  hasPriceChanges: boolean
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode: string | null
}

export interface Address {
  street: string
  number: string
  complement?: string | null
  district: string
  city: string
  state: string
  zip: string
}

export interface Order {
  id: number
  userId: number
  user?: { id: number; name: string; email: string }
  status: OrderStatus
  subtotal: number
  discount: number
  shipping: number
  total: number
  couponCode: string | null
  paymentMethod: PaymentMethod
  cardLast4: string | null
  address: Address
  items: { productId: number; name: string; price: number; quantity: number; subtotal: number }[]
  createdAt: string
  updatedAt: string
}

export interface StockMovement {
  id: number
  productId: number
  type: StockMovementType
  quantity: number
  previousStock: number
  newStock: number
  reason: string
  createdAt: string
  product: { id: number; name: string; sku: string }
  user: { id: number; name: string }
}

export interface Dashboard {
  totalProducts: number
  inactiveProducts: number
  lowStockProducts: number
  outOfStockProducts: number
  totalOrders: number
  ordersByStatus: Record<OrderStatus, number>
}

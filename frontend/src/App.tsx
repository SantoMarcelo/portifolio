import { Link, Route, Routes } from 'react-router-dom'
import { AdminLayout, Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminProducts from './pages/admin/AdminProducts'
import AdminStock from './pages/admin/AdminStock'
import ProductForm from './pages/admin/ProductForm'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailPage from './pages/OrderDetailPage'
import OrdersPage from './pages/OrdersPage'
import ProductDetailPage from './pages/ProductDetailPage'
import RegisterPage from './pages/RegisterPage'

function NotFound() {
  return (
    <div data-testid="not-found-page">
      <h1>Página não encontrada</h1>
      <Link to="/" data-testid="not-found-home-link">
        Voltar para a vitrine
      </Link>
    </div>
  )
}

const customer = (page: React.ReactNode) => <ProtectedRoute role="CUSTOMER">{page}</ProtectedRoute>

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <Route path="cart" element={customer(<CartPage />)} />
        <Route path="checkout" element={customer(<CheckoutPage />)} />
        <Route path="orders" element={customer(<OrdersPage />)} />
        <Route path="orders/:id" element={customer(<OrderDetailPage />)} />
        <Route path="orders/:id/confirmation" element={customer(<OrderConfirmationPage />)} />

        <Route
          path="admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetailPage admin />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

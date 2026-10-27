import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="header" data-testid="header">
      <div className="header-inner">
        <Link to="/" className="brand" data-testid="nav-home-link" aria-label="Loja QA — página inicial">
          Loja<span>.</span>QA
        </Link>
        {/* Carrinho fora do menu colapsável: sempre visível, em qualquer página e largura */}
        {user?.role !== 'ADMIN' && (
          <NavLink
            to="/cart"
            className={({ isActive }) => `btn icon-btn cart-link${isActive ? ' active' : ''}`}
            data-testid="nav-cart-link"
            aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 7h12l-1 12H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="cart-count" data-testid="cart-count" aria-hidden="true">
              {count}
            </span>
          </NavLink>
        )}
        <ThemeToggle />
        <button
          type="button"
          className="btn icon-btn menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
        <nav className={`nav${open ? ' open' : ''}`} id="main-nav" data-testid="main-nav" aria-label="Principal">
          <ul>
            {user?.role === 'CUSTOMER' && (
              <li>
                <NavLink to="/orders" data-testid="nav-orders-link">
                  Meus pedidos
                </NavLink>
              </li>
            )}
            {user?.role === 'ADMIN' && (
              <li>
                <NavLink to="/admin" data-testid="nav-admin-link">
                  Administração
                </NavLink>
              </li>
            )}
            {user ? (
              <>
                <li>
                  <span className="user-name" data-testid="user-name" data-role={user.role}>
                    {user.name}
                  </span>
                </li>
                <li>
                  <button
                    className="btn"
                    data-testid="logout-button"
                    onClick={async () => {
                      await logout()
                      navigate('/')
                    }}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" data-testid="nav-login-link">
                    Entrar
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" data-testid="nav-register-link">
                    Cadastrar
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  const first = useRef(true)

  // Troca de página no SPA: leva o foco ao conteúdo (leitores de tela e teclado)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus() }}>
        Pular para o conteúdo principal
      </a>
      <div className="announce">Frete grátis em compras acima de R$ 300</div>
      <Header />
      <main id="main" tabIndex={-1} ref={main} className="container">
        <Outlet />
      </main>
      <footer className="footer" data-testid="footer">
        Loja QA — sistema fictício para testes automatizados
      </footer>
    </>
  )
}

export function AdminLayout() {
  return (
    <div className="admin" data-testid="admin-layout">
      <nav className="subnav" data-testid="admin-nav" aria-label="Administração">
        <NavLink end to="/admin" data-testid="admin-nav-dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" data-testid="admin-nav-products">
          Produtos
        </NavLink>
        <NavLink to="/admin/stock" data-testid="admin-nav-stock">
          Estoque
        </NavLink>
        <NavLink to="/admin/orders" data-testid="admin-nav-orders">
          Pedidos
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

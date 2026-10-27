import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Role } from '../api/types'
import { useAuth } from '../context/AuthContext'
import { Loading } from './ui'

export function ProtectedRoute({ role, children }: { role: Role; children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading testId="auth-loading" />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (user.role !== role) {
    return (
      <div data-testid="forbidden-page">
        <h1>Acesso negado</h1>
        <p data-testid="forbidden-message">Você não tem permissão para acessar esta página.</p>
      </div>
    )
  }
  return <>{children}</>
}

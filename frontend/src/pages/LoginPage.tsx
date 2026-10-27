import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { ApiError } from '../api/client'
import { ErrorBox } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, sessionExpired } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<ApiError | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const user = await login(email, password)
      navigate(from ?? (user.role === 'ADMIN' ? '/admin' : '/'), { replace: true })
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div data-testid="login-page">
      <h1>Entrar</h1>
      {sessionExpired && (
        <div className="alert alert-warn" role="alert" data-testid="session-expired-message">
          Sua sessão expirou. Faça login novamente.
        </div>
      )}
      <form className="form" onSubmit={onSubmit} noValidate>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            data-testid="login-email-input"
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            data-testid="login-password-input"
          />
        </label>
        <ErrorBox error={error} testId="login-error" />
        <button className="btn btn-primary" type="submit" disabled={busy} data-testid="login-submit-button">
          Entrar
        </button>
      </form>
      <p>
        Não tem conta?{' '}
        <Link to="/register" data-testid="login-register-link">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fieldErrors, type ApiError } from '../api/client'
import { ErrorBox, FieldError } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<ApiError | null>(null)
  const [busy, setBusy] = useState(false)
  const errors = fieldErrors(error)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await register(name, email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div data-testid="register-page">
      <h1>Criar conta</h1>
      <form className="form" onSubmit={onSubmit} noValidate>
        <label>
          Nome
          <input value={name} onChange={(e) => setName(e.target.value)} data-testid="register-name-input" />
          <FieldError id="register" errors={errors} field="name" />
        </label>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            data-testid="register-email-input"
          />
          <FieldError id="register" errors={errors} field="email" />
        </label>
        <label>
          Senha (mínimo 8 caracteres)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            data-testid="register-password-input"
          />
          <FieldError id="register" errors={errors} field="password" />
        </label>
        <ErrorBox error={error} testId="register-error" />
        <button className="btn btn-primary" type="submit" disabled={busy} data-testid="register-submit-button">
          Cadastrar
        </button>
      </form>
      <p>
        Já tem conta?{' '}
        <Link to="/login" data-testid="register-login-link">
          Entrar
        </Link>
      </p>
    </div>
  )
}

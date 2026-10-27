import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, tokenStore } from '../api/client'
import type { Session, User } from '../api/types'

interface AuthState {
  user: User | null
  loading: boolean
  sessionExpired: boolean
  login: (email: string, password: string) => Promise<User>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => tokenStore.get() !== null)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    if (!tokenStore.get()) return
    api
      .get<User>('/auth/me')
      .then(setUser)
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onExpired = () => {
      setUser(null)
      setSessionExpired(true)
    }
    window.addEventListener('auth:expired', onExpired)
    return () => window.removeEventListener('auth:expired', onExpired)
  }, [])

  const startSession = useCallback((session: Session) => {
    tokenStore.set(session.token)
    setSessionExpired(false)
    setUser(session.user)
    return session.user
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      sessionExpired,
      login: async (email, password) => startSession(await api.post<Session>('/auth/login', { email, password })),
      register: async (name, email, password) =>
        startSession(await api.post<Session>('/auth/register', { name, email, password })),
      logout: async () => {
        try {
          await api.post('/auth/logout')
        } catch {
          /* token já inválido: segue com o logout local */
        }
        tokenStore.clear()
        setUser(null)
      },
    }),
    [user, loading, sessionExpired, startSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth fora do AuthProvider')
  return ctx
}

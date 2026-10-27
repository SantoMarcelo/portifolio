const BASE = import.meta.env.VITE_API_URL ?? ''
const TOKEN_KEY = 'loja_token'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

export class ApiError extends Error {
  status: number
  code: string
  details: unknown[]

  constructor(status: number, code: string, message: string, details: unknown[] = []) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

type Query = Record<string, string | number | boolean | undefined | null>

export function qs(params: Query = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') search.set(key, String(value))
  }
  const text = search.toString()
  return text ? `?${text}` : ''
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {}
  const token = tokenStore.get()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let response: Response
  try {
    response = await fetch(`${BASE}/api/v1${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, 'NETWORK_ERROR', 'Não foi possível conectar ao servidor')
  }

  if (response.status === 204) return undefined as T
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = data?.error
    if (response.status === 401 && ['TOKEN_EXPIRED', 'INVALID_TOKEN'].includes(error?.code)) {
      tokenStore.clear()
      window.dispatchEvent(new Event('auth:expired'))
    }
    throw new ApiError(
      response.status,
      error?.code ?? 'UNKNOWN_ERROR',
      error?.message ?? 'Erro inesperado',
      error?.details ?? [],
    )
  }
  return data as T
}

export const api = {
  get: <T>(path: string, query?: Query) => request<T>('GET', path + qs(query)),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body ?? {}),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
}

/** Mapeia `details` de VALIDATION_ERROR ({field, message}) para { campo: mensagem }. */
export function fieldErrors(error: unknown): Record<string, string> {
  const result: Record<string, string> = {}
  if (error instanceof ApiError) {
    for (const d of error.details as { field?: string; message?: string }[]) {
      if (d && d.field && d.message && !(d.field in result)) result[d.field] = d.message
    }
  }
  return result
}

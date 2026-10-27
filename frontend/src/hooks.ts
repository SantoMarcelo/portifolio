import { useCallback, useEffect, useState } from 'react'
import { ApiError } from './api/client'

/** Carrega dados da API e recarrega quando `deps` mudam. */
export function useFetch<T>(load: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(true)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    load()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setError(null)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err : new ApiError(0, 'UNKNOWN_ERROR', String(err)))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { data, error, loading, reload }
}

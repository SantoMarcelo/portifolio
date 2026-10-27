import { useState, type ReactNode } from 'react'
import { ApiError } from '../api/client'
import { STATUS_LABEL } from '../format'

export function ErrorBox({ error, testId }: { error: unknown; testId: string }) {
  if (!error) return null
  const err = error instanceof ApiError ? error : null
  const details = (err?.details ?? []).filter(
    (d): d is { field?: string; message: string } => typeof (d as { message?: unknown })?.message === 'string',
  )
  return (
    <div className="alert alert-error" role="alert" data-testid={testId} data-code={err?.code}>
      <span data-testid={`${testId}-message`}>{err ? err.message : 'Erro inesperado'}</span>
      {err && (
        <small data-testid={`${testId}-code`} className="code">
          {err.code}
        </small>
      )}
      {details.length > 0 && (
        <ul>
          {details.map((d, i) => (
            <li key={i} data-testid={`${testId}-detail`}>
              {d.field ? `${d.field}: ` : ''}
              {d.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function FieldError({ id, errors, field }: { id: string; errors: Record<string, string>; field: string }) {
  if (!errors[field]) return null
  return (
    <span className="field-error" id={`${id}-error-${field}`} data-testid={`${id}-error-${field}`}>
      {errors[field]}
    </span>
  )
}

export function Loading({ testId = 'loading' }: { testId?: string }) {
  return (
    <p className="muted" role="status" data-testid={testId}>
      Carregando...
    </p>
  )
}

export function StatusBadge({ status, testId }: { status: string; testId: string }) {
  return (
    <span className={`badge status-${status.toLowerCase()}`} data-testid={testId} data-status={status}>
      {STATUS_LABEL[status] ?? status}
    </span>
  )
}

/** Botão com confirmação inline (evita window.confirm). */
export function ConfirmButton(props: {
  testId: string
  label: string
  onConfirm: () => void | Promise<void>
  disabled?: boolean
  className?: string
}) {
  const [asking, setAsking] = useState(false)
  if (!asking) {
    return (
      <button
        type="button"
        className={props.className ?? 'btn btn-danger'}
        data-testid={props.testId}
        disabled={props.disabled}
        onClick={() => setAsking(true)}
      >
        {props.label}
      </button>
    )
  }
  return (
    <span className="inline-actions">
      <button
        type="button"
        className="btn btn-danger"
        data-testid={`${props.testId}-confirm`}
        onClick={async () => {
          setAsking(false)
          await props.onConfirm()
        }}
      >
        Confirmar
      </button>
      <button type="button" className="btn" data-testid={`${props.testId}-abort`} onClick={() => setAsking(false)}>
        Voltar
      </button>
    </span>
  )
}

export function Pagination(props: {
  pagination: { page: number; totalPages: number; total: number }
  onPage: (page: number) => void
}) {
  const { page, totalPages, total } = props.pagination
  return (
    <nav className="pagination" data-testid="pagination" aria-label="Paginação">
      <button className="btn" data-testid="pagination-prev" disabled={page <= 1} onClick={() => props.onPage(page - 1)}>
        Anterior
      </button>
      <span data-testid="pagination-info">
        Página {page} de {Math.max(totalPages, 1)} ({total} {total === 1 ? 'item' : 'itens'})
      </span>
      <button
        className="btn"
        data-testid="pagination-next"
        disabled={page >= totalPages}
        onClick={() => props.onPage(page + 1)}
      >
        Próxima
      </button>
    </nav>
  )
}

export function PageTitle({ children, testId }: { children: ReactNode; testId?: string }) {
  return <h1 data-testid={testId}>{children}</h1>
}

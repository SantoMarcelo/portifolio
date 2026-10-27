export const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatDate = (iso: string) => new Date(iso).toLocaleString('pt-BR')

export const STATUS_LABEL: Record<string, string> = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  PAYMENT_FAILED: 'Pagamento falhou',
  CANCELLED: 'Cancelado',
}

export const PAYMENT_LABEL: Record<string, string> = {
  CREDIT_CARD: 'Cartão de crédito',
  PIX: 'PIX',
  BOLETO: 'Boleto',
}

export const MOVEMENT_LABEL: Record<string, string> = {
  ENTRY: 'Entrada',
  EXIT: 'Saída',
  ADJUSTMENT: 'Ajuste',
}

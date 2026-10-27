import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, ApiError } from '../api/client'
import type { Address, Order, PaymentMethod, Quote } from '../api/types'
import { ErrorBox, FieldError, Loading } from '../components/ui'
import { useCart } from '../context/CartContext'
import { brl, PAYMENT_LABEL } from '../format'

const STEPS = [
  { key: 'review', label: '1. Revisão' },
  { key: 'address', label: '2. Endereço' },
  { key: 'payment', label: '3. Pagamento' },
  { key: 'confirm', label: '4. Confirmação' },
] as const

const emptyAddress: Address = { street: '', number: '', complement: '', district: '', city: '', state: '', zip: '' }

const ADDRESS_FIELDS: { key: keyof Address; label: string; testId: string; required: boolean }[] = [
  { key: 'street', label: 'Rua', testId: 'address-street-input', required: true },
  { key: 'number', label: 'Número', testId: 'address-number-input', required: true },
  { key: 'complement', label: 'Complemento', testId: 'address-complement-input', required: false },
  { key: 'district', label: 'Bairro', testId: 'address-district-input', required: true },
  { key: 'city', label: 'Cidade', testId: 'address-city-input', required: true },
  { key: 'state', label: 'UF', testId: 'address-state-input', required: true },
  { key: 'zip', label: 'CEP', testId: 'address-zip-input', required: true },
]

const AUTOCOMPLETE: Record<keyof Address, string> = {
  street: 'address-line1',
  number: 'off',
  complement: 'address-line2',
  district: 'off',
  city: 'address-level2',
  state: 'address-level1',
  zip: 'postal-code',
}

function validateAddress(a: Address) {
  const errors: Record<string, string> = {}
  for (const f of ADDRESS_FIELDS) {
    if (f.required && !String(a[f.key] ?? '').trim()) errors[f.key] = `${f.label} obrigatório(a)`
  }
  if (!errors.state && a.state.trim().length !== 2) errors.state = 'UF deve ter 2 letras'
  if (!errors.zip && !/^\d{5}-?\d{3}$/.test(a.zip.trim())) errors.zip = 'CEP inválido (use 00000-000)'
  return errors
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { refresh } = useCart()
  const [step, setStep] = useState(0)
  const [quote, setQuote] = useState<Quote | null>(null)
  const [quoteError, setQuoteError] = useState<ApiError | null>(null)
  const [loading, setLoading] = useState(true)

  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState<ApiError | null>(null)

  const [address, setAddress] = useState<Address>(emptyAddress)
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({})
  const errorSummary = useRef<HTMLDivElement>(null)
  const addressErrorList = ADDRESS_FIELDS.filter((f) => addressErrors[f.key])

  const [method, setMethod] = useState<PaymentMethod>('CREDIT_CARD')
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [paymentError, setPaymentError] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<ApiError | null>(null)

  useEffect(() => {
    api
      .post<Quote>('/checkout/quote', {})
      .then(setQuote)
      .catch((err) => setQuoteError(err))
      .finally(() => setLoading(false))
  }, [])

  async function applyCoupon(code: string | null) {
    setCouponError(null)
    try {
      setQuote(await api.post<Quote>('/checkout/quote', { couponCode: code ?? undefined }))
      setCoupon(code)
      if (!code) setCouponInput('')
    } catch (err) {
      setCouponError(err as ApiError)
    }
  }

  function nextFromAddress() {
    const errors = validateAddress(address)
    setAddressErrors(errors)
    if (Object.keys(errors).length === 0) setStep(2)
    else setTimeout(() => errorSummary.current?.focus(), 0)
  }

  function nextFromPayment() {
    if (method === 'CREDIT_CARD' && !/^\d{13,19}$/.test(cardNumber.replace(/[\s-]/g, ''))) {
      setPaymentError('Número do cartão deve ter de 13 a 19 dígitos')
      return
    }
    setPaymentError('')
    setStep(3)
  }

  async function submit() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const order = await api.post<Order>('/orders', {
        address: { ...address, complement: address.complement?.trim() || undefined },
        payment:
          method === 'CREDIT_CARD'
            ? { method, cardNumber, cardHolder: cardHolder.trim() || undefined }
            : { method },
        couponCode: coupon ?? undefined,
      })
      await refresh()
      navigate(`/orders/${order.id}/confirmation`)
    } catch (err) {
      setSubmitError(err as ApiError)
      await refresh().catch(() => undefined)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading testId="checkout-loading" />
  if (quoteError?.code === 'CART_EMPTY') {
    return (
      <div data-testid="checkout-empty">
        <h1>Checkout</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" data-testid="checkout-empty-home-link">
          Ir para a vitrine
        </Link>
      </div>
    )
  }
  if (!quote) {
    return (
      <div>
        <ErrorBox error={quoteError} testId="checkout-error" />
        {quoteError?.code === 'OUT_OF_STOCK' && (
          <p>
            <Link to="/cart" data-testid="checkout-unavailable-cart-link">
              Ajustar o carrinho
            </Link>
          </p>
        )}
      </div>
    )
  }

  const failedOrderId = (submitError?.details?.[0] as { orderId?: number } | undefined)?.orderId
  const hasUnavailable = quote.items.some((i) => !i.available)

  return (
    <div data-testid="checkout-page" data-step={STEPS[step].key}>
      <h1>Checkout</h1>
      <ol className="steps" data-testid="checkout-steps">
        {STEPS.map((s, i) => (
          <li
            key={s.key}
            data-testid={`checkout-step-${s.key}`}
            className={i === step ? 'current' : i < step ? 'done' : ''}
            aria-current={i === step ? 'step' : undefined}
          >
            <span>{s.label}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <section data-testid="checkout-review-section">
          <div className="table-wrap">
            <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((i) => (
                <tr key={i.productId} data-testid={`checkout-item-${i.productId}`}>
                  <td>
                    {i.name}
                    {!i.available && (
                      <span className="badge unavailable" data-testid={`checkout-item-unavailable-${i.productId}`}>
                        Indisponível
                      </span>
                    )}
                  </td>
                  <td data-testid={`checkout-item-quantity-${i.productId}`}>{i.quantity}</td>
                  <td data-testid={`checkout-item-subtotal-${i.productId}`}>{brl(i.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <h2>Cupom de desconto</h2>
          <div className="toolbar">
            <input
              placeholder="Código do cupom"
              aria-label="Código do cupom"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              data-testid="checkout-coupon-input"
            />
            <button className="btn" data-testid="checkout-coupon-apply-button" onClick={() => applyCoupon(couponInput.trim() || null)}>
              Aplicar
            </button>
            {coupon && (
              <>
                <span className="alert alert-success" role="status" data-testid="checkout-coupon-success">
                  Cupom {coupon} aplicado
                </span>
                <button className="btn" data-testid="checkout-coupon-remove-button" onClick={() => applyCoupon(null)}>
                  Remover cupom
                </button>
              </>
            )}
          </div>
          <ErrorBox error={couponError} testId="checkout-coupon-error" />
          <Summary quote={quote} />
          {quote.items.some((i) => i.priceChanged) && (
            <p className="alert alert-error" role="alert" data-testid="checkout-price-changed-warning">
              O preço de alguns itens mudou desde que foram adicionados ao carrinho:{' '}
              {quote.items
                .filter((i) => i.priceChanged)
                .map((i) => `${i.name} (era ${brl(i.priceWhenAdded ?? i.unitPrice)}, agora ${brl(i.unitPrice)})`)
                .join('; ')}
              .
            </p>
          )}
          {hasUnavailable && (
            <p className="alert alert-error" data-testid="checkout-unavailable-warning">
              Há itens indisponíveis. Ajuste o <Link to="/cart">carrinho</Link>.
            </p>
          )}
          <div className="toolbar" style={{ justifyContent: 'space-between' }}>
            <Link to="/cart" data-testid="checkout-back-to-cart-link">
              ← Voltar ao carrinho
            </Link>
            <button className="btn btn-primary" data-testid="checkout-next-button" disabled={hasUnavailable} onClick={() => setStep(1)}>
              Continuar
            </button>
          </div>
        </section>
      )}

      {step === 1 && (
        <section data-testid="checkout-address-section">
          <h2>Endereço de entrega</h2>
          {addressErrorList.length > 0 && (
            <div className="alert alert-error" role="alert" tabIndex={-1} ref={errorSummary} data-testid="address-error-summary">
              <strong>Corrija {addressErrorList.length} {addressErrorList.length === 1 ? 'campo' : 'campos'} para continuar</strong>
              <ul>
                {addressErrorList.map((f) => (
                  <li key={f.key}>
                    <a href={`#address-${f.key}`} onClick={(e) => { e.preventDefault(); document.getElementById(`address-${f.key}`)?.focus() }}>
                      {addressErrors[f.key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="muted">
            Campos com <span aria-hidden="true">*</span>
            <span className="sr-only">asterisco</span> são obrigatórios.
          </p>
          <form className="form wide" noValidate onSubmit={(e) => e.preventDefault()}>
            {ADDRESS_FIELDS.map((f) => (
              <label key={f.key}>
                <span>
                  {f.label}
                  {f.required && <span aria-hidden="true"> *</span>}
                </span>
                <input
                  id={`address-${f.key}`}
                  required={f.required}
                  aria-invalid={addressErrors[f.key] ? true : undefined}
                  aria-describedby={addressErrors[f.key] ? `address-error-${f.key}` : undefined}
                  autoComplete={AUTOCOMPLETE[f.key]}
                  value={address[f.key] ?? ''}
                  maxLength={f.key === 'state' ? 2 : undefined}
                  onChange={(e) => setAddress({ ...address, [f.key]: e.target.value })}
                  data-testid={f.testId}
                />
                <FieldError id="address" errors={addressErrors} field={f.key} />
              </label>
            ))}
          </form>
          <StepButtons onBack={() => setStep(0)} onNext={nextFromAddress} />
        </section>
      )}

      {step === 2 && (
        <section data-testid="checkout-payment-section">
          <h2>Forma de pagamento</h2>
          <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
            {(['CREDIT_CARD', 'PIX', 'BOLETO'] as PaymentMethod[]).map((m) => (
              <label key={m} className="inline pay-opt">
                <input
                  type="radio"
                  name="payment-method"
                  checked={method === m}
                  onChange={() => setMethod(m)}
                  data-testid={`payment-method-${m.toLowerCase().replace('_', '-')}`}
                />
                {PAYMENT_LABEL[m]}
              </label>
            ))}
            {method === 'CREDIT_CARD' && (
              <>
                <label>
                  Número do cartão
                  <input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    data-testid="card-number-input"
                  />
                </label>
                <label>
                  Nome no cartão
                  <input autoComplete="cc-name" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} data-testid="card-holder-input" />
                </label>
              </>
            )}
            {paymentError && (
              <span className="field-error" role="alert" data-testid="payment-error">
                {paymentError}
              </span>
            )}
          </form>
          <StepButtons onBack={() => setStep(1)} onNext={nextFromPayment} />
        </section>
      )}

      {step === 3 && (
        <section data-testid="checkout-confirm-section">
          <h2>Confirme seu pedido</h2>
          <div className="panel">
            <p data-testid="confirm-address">
              <strong>Entrega:</strong> {address.street}, {address.number}
              {address.complement ? ` - ${address.complement}` : ''} — {address.district}, {address.city}/
              {address.state.toUpperCase()} — CEP {address.zip}
            </p>
            <p data-testid="confirm-payment">
              <strong>Pagamento:</strong> {PAYMENT_LABEL[method]}
              {method === 'CREDIT_CARD' && ` (final ${cardNumber.replace(/\D/g, '').slice(-4)})`}
            </p>
            <p data-testid="confirm-items">
              <strong>Itens:</strong> {quote.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
            </p>
          </div>
          <Summary quote={quote} prefix="confirm" />
          <ErrorBox error={submitError} testId="checkout-error" />
          {failedOrderId && (
            <p>
              <Link to={`/orders/${failedOrderId}`} data-testid="checkout-failed-order-link">
                Ver pedido #{failedOrderId}
              </Link>
            </p>
          )}
          <div className="toolbar" style={{ justifyContent: 'space-between' }}>
            <button className="btn" data-testid="checkout-back-button" disabled={submitting} onClick={() => setStep(2)}>
              Voltar
            </button>
            <button className="btn btn-primary" data-testid="checkout-submit-button" disabled={submitting} onClick={submit}>
              {submitting ? 'Processando...' : 'Confirmar pedido'}
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

function StepButtons({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="toolbar" style={{ justifyContent: 'space-between', marginTop: '1rem' }}>
      <button className="btn" data-testid="checkout-back-button" onClick={onBack}>
        Voltar
      </button>
      <button className="btn btn-primary" data-testid="checkout-next-button" onClick={onNext}>
        Continuar
      </button>
    </div>
  )
}

function Summary({ quote, prefix = 'checkout' }: { quote: Quote; prefix?: string }) {
  return (
    <div className="summary panel" data-testid={`${prefix}-summary`}>
      <div>
        <span>Subtotal</span>
        <span data-testid={`${prefix}-subtotal`}>{brl(quote.subtotal)}</span>
      </div>
      <div>
        <span>Desconto</span>
        <span data-testid={`${prefix}-discount`}>{brl(quote.discount)}</span>
      </div>
      <div>
        <span>Frete</span>
        <span data-testid={`${prefix}-shipping`}>{quote.shipping === 0 ? 'Grátis' : brl(quote.shipping)}</span>
      </div>
      <div className="total">
        <span>Total</span>
        <span data-testid={`${prefix}-total`}>{brl(quote.total)}</span>
      </div>
    </div>
  )
}

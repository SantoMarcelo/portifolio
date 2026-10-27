import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, fieldErrors, type ApiError } from '../../api/client'
import type { Product } from '../../api/types'
import { ErrorBox, FieldError, Loading } from '../../components/ui'
import { useFetch } from '../../hooks'

interface FormState {
  name: string
  description: string
  price: string
  sku: string
  category: string
  imageUrl: string
  stock: string
  active: boolean
}

const empty: FormState = { name: '', description: '', price: '', sku: '', category: '', imageUrl: '', stock: '0', active: true }

export default function ProductForm() {
  const { id } = useParams()
  const editing = id !== undefined
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(empty)
  const [error, setError] = useState<ApiError | null>(null)
  const [busy, setBusy] = useState(false)
  const errors = fieldErrors(error)

  const product = useFetch(() => (editing ? api.get<Product>(`/admin/products/${id}`) : Promise.resolve(null)), [id])
  const categories = useFetch(() => api.get<string[]>('/categories'), [])

  useEffect(() => {
    const p = product.data
    if (p) {
      setForm({
        name: p.name,
        description: p.description,
        price: String(p.price),
        sku: p.sku,
        category: p.category,
        imageUrl: p.imageUrl,
        stock: String(p.stock),
        active: p.active,
      })
    }
  }, [product.data])

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => setForm({ ...form, [key]: e.target.value })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    // campos vazios/inválidos são enviados como estão para o backend validar
    const payload = {
      name: form.name,
      description: form.description,
      price: form.price.trim() === '' ? undefined : Number(form.price),
      sku: form.sku,
      category: form.category,
      imageUrl: form.imageUrl,
      active: form.active,
    }
    try {
      if (editing) await api.put(`/admin/products/${id}`, payload)
      else await api.post('/admin/products', { ...payload, stock: form.stock.trim() === '' ? undefined : Number(form.stock) })
      navigate('/admin/products')
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setBusy(false)
    }
  }

  if (editing && product.loading && !product.data) return <Loading testId="product-form-loading" />
  if (editing && product.error) return <ErrorBox error={product.error} testId="product-form-load-error" />

  return (
    <div data-testid="product-form-page">
      <h1 data-testid="product-form-title">{editing ? 'Editar produto' : 'Novo produto'}</h1>
      <form className="form wide" onSubmit={onSubmit} noValidate>
        <label>
          Nome
          <input value={form.name} onChange={set('name')} data-testid="product-form-name-input" />
          <FieldError id="product-form" errors={errors} field="name" />
        </label>
        <label>
          Descrição
          <textarea rows={3} value={form.description} onChange={set('description')} data-testid="product-form-description-input" />
          <FieldError id="product-form" errors={errors} field="description" />
        </label>
        <div className="row">
          <label>
            Preço (R$)
            <input type="number" step="0.01" value={form.price} onChange={set('price')} data-testid="product-form-price-input" />
            <FieldError id="product-form" errors={errors} field="price" />
          </label>
          {!editing ? (
            <label>
              Estoque inicial
              <input type="number" step="1" value={form.stock} onChange={set('stock')} data-testid="product-form-stock-input" />
              <FieldError id="product-form" errors={errors} field="stock" />
            </label>
          ) : (
            <label>
              Estoque atual
              <input value={form.stock} disabled data-testid="product-form-stock-input" />
              <small className="muted">Ajuste pela tela de estoque.</small>
            </label>
          )}
        </div>
        <div className="row">
          <label>
            SKU
            <input value={form.sku} onChange={set('sku')} data-testid="product-form-sku-input" />
            <FieldError id="product-form" errors={errors} field="sku" />
          </label>
          <label>
            Categoria
            <input list="category-options" value={form.category} onChange={set('category')} data-testid="product-form-category-input" />
            <datalist id="category-options">
              {categories.data?.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <FieldError id="product-form" errors={errors} field="category" />
          </label>
        </div>
        <label>
          URL da imagem
          <input value={form.imageUrl} onChange={set('imageUrl')} data-testid="product-form-image-url-input" />
          <FieldError id="product-form" errors={errors} field="imageUrl" />
        </label>
        <label className="inline">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            data-testid="product-form-active-checkbox"
          />
          Produto ativo
        </label>
        <ErrorBox error={error} testId="product-form-error" />
        <div className="toolbar">
          <button className="btn btn-primary" type="submit" disabled={busy} data-testid="product-form-submit-button">
            {editing ? 'Salvar alterações' : 'Criar produto'}
          </button>
          <Link to="/admin/products" className="btn" data-testid="product-form-cancel-link">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

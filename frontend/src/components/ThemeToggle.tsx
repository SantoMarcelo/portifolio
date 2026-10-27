import { useState } from 'react'

type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'))
  const dark = theme === 'dark'

  function toggle() {
    const next: Theme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* armazenamento indisponível: vale só nesta sessão */
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      className="btn icon-btn theme-toggle"
      data-testid="theme-toggle"
      aria-pressed={dark}
      aria-label="Tema escuro"
      onClick={toggle}
    >
      <span aria-hidden="true">{dark ? '☀' : '☾'}</span>
    </button>
  )
}

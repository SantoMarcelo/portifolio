# Loja QA — Plano de UI/UX e Acessibilidade

Protótipo navegável: `index.html` (abrir direto no navegador; sem build, sem dependências). Não altera o app em `src/`.

## Direção visual: Editorial / premium
- **Tipografia**: títulos em serifa (Iowan Old Style / Palatino / Georgia), corpo em sans do sistema. Sem fontes externas (rápido, sem CDN).
- **Paleta**: off-white quente `#FAF7F2`, grafite `#1F1D1B`, acento terracota `#9F3A1F`. Tema escuro com acento `#E8896B`. Segue `prefers-color-scheme` + alternância manual.
- **Forma**: botões em pílula, imagens com cantos suaves, muito espaço em branco, hero com arco.

## Acessibilidade (alvo: WCAG 2.2 AA)
| Tema | Decisão |
|---|---|
| Contraste | Texto ≥ 4,5:1 e componentes ≥ 3:1 nos dois temas (acento claro ≈ 6,3:1; escuro ≈ 7,4:1) |
| Teclado | Tudo operável por teclado; foco visível de 3px; link "Pular para o conteúdo"; foco movido ao `main` a cada troca de tela |
| Semântica | Landmarks (`header`, `nav` rotulados, `main`, `footer`), hierarquia h1→h3, tabelas com `scope`/`caption`, breadcrumbs com `aria-current` |
| Cor nunca sozinha | Status (estoque, pedido) = cor + ícone + texto |
| Formulários | `label` sempre visível, `autocomplete`, `inputmode`, `aria-invalid` + `aria-describedby`, resumo de erros com `role="alert"` e links para os campos |
| Checkout | Stepper `<ol>` com `aria-current="step"`; pagamento em `fieldset/legend` |
| Feedback dinâmico | Toast e contadores em regiões `aria-live` (carrinho, quantidade, resultados) |
| Alvos de toque | ≥ 44×44px (mínimo 36px só em ações secundárias de tabela) |
| Movimento / contraste forçado | `prefers-reduced-motion` e `forced-colors` respeitados |
| Responsivo | Mobile-first; menu com `aria-expanded`; tabelas com rolagem horizontal; zoom 200% sem perda |

## UX — mudanças por área
- **Vitrine**: hero + busca/filtros agrupados e rotulados; cartão inteiro clicável; selos "Últimas N unidades" / "Indisponível".
- **Produto**: breadcrumb, preço em destaque, estoque, stepper de quantidade, especificações.
- **Carrinho**: tabela legível, ajuste de quantidade inline, resumo fixo ao lado (empilha no mobile).
- **Checkout**: 4 etapas claras, resumo sempre visível, erros agrupados no topo + inline.
- **Admin**: menu lateral, dashboard com métricas e barra de status com legenda textual, tabelas com busca e filtros.
- **Cabeçalho**: barra de anúncio (frete/cupom), navegação por papel (cliente/admin).

## Implementação (após aprovação)
1. Tokens CSS (`:root` + `[data-theme]`) substituindo `index.css`.
2. Evoluir `components/ui.tsx`, `Layout.tsx`, `ProductCard.tsx`; novos: `Button`, `Field`, `Toast`, `Stepper`, `ThemeToggle`.
3. Reaplicar nas páginas, **mantendo todos os `data-testid` e fluxos** (a suíte de automação depende deles).
4. Verificação: axe/Lighthouse, teste manual de teclado e leitor de tela, zoom 200%.

## Fora do protótipo
Estoque admin, detalhe de pedido, formulário de produto e cadastro seguem os mesmos padrões (tabela + formulário).

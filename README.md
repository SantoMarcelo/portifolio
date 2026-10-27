# Loja QA — e-commerce fictício para testes automatizados

Sistema web de e-commerce **fictício** (backend + frontend) criado para ser o **alvo** de testes automatizados de
API, UI/E2E, integração e performance. É simples, funcional e previsível: sem captcha, sem e-mail real e sem
serviços externos. O pagamento é simulado e o resultado é determinístico.

- **Backend:** Node.js + Express + Zod + Prisma (SQLite), TypeScript strict, JWT (`ADMIN` e `CUSTOMER`)
- **Frontend:** React + Vite + React Router, TypeScript, CSS simples
- **Documentação da API:** Swagger/OpenAPI em <http://localhost:3333/api/docs> (JSON em `/api/docs.json`)
- **Guia de cenários de teste:** [docs/TESTING-GUIDE.md](docs/TESTING-GUIDE.md)

## Sumário

1. [Como rodar](#como-rodar)
2. [Usuários, cartões e cupons de teste](#usuários-cartões-e-cupons-de-teste)
3. [Regras de negócio](#regras-de-negócio)
4. [API REST](#api-rest)
5. [Códigos de erro](#códigos-de-erro)
6. [Utilitários de teste](#utilitários-de-teste)
7. [Convenção de `data-testid`](#convenção-de-data-testid)
8. [Variáveis de ambiente](#variáveis-de-ambiente)
9. [Estrutura do projeto](#estrutura-do-projeto)
10. [Testes unitários](#testes-unitários)

## Como rodar

### Opção 1 — Docker Compose (um comando)

```bash
docker compose up --build
```

| Serviço  | URL                             |
| -------- | ------------------------------- |
| Frontend | <http://localhost:5173>         |
| API      | <http://localhost:3333/api/v1>  |
| Swagger  | <http://localhost:3333/api/docs> |
| Health   | <http://localhost:3333/api/health> |

O banco SQLite fica no volume `backend-data` (persiste entre execuções). Para zerar tudo:
`docker compose down -v`, ou chame `POST /api/test/reset`.

No Compose, `NODE_ENV=development` para manter os endpoints `/api/test/*` ativos. Os valores de `JWT_SECRET`,
`JWT_EXPIRES_IN` e `SIMULATE_LATENCY_MS` podem ser sobrescritos por variáveis de ambiente do host:

```bash
SIMULATE_LATENCY_MS=800 docker compose up --build
```

### Opção 2 — Local (Node.js 22+)

Backend (terminal 1):

```bash
cd backend
cp .env.example .env
npm install
npm run db:setup     # gera o Prisma Client, cria o banco SQLite e carrega o seed
npm run dev          # http://localhost:3333
```

Frontend (terminal 2):

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173 (encaminha /api para http://localhost:3333)
```

Scripts do backend: `dev`, `build`, `start`, `test`, `db:setup`, `db:push`, `db:seed`.
Scripts do frontend: `dev`, `build`, `preview`.

> Em produção real (`NODE_ENV=production`) os endpoints `/api/test/*` retornam 404 e somem do Swagger.

## Usuários, cartões e cupons de teste

### Usuários (seed)

| Papel      | E-mail             | Senha         |
| ---------- | ------------------ | ------------- |
| `ADMIN`    | `admin@loja.com`   | `Admin@123`   |
| `CUSTOMER` | `cliente@loja.com` | `Cliente@123` |

Qualquer pessoa pode se cadastrar (sempre como `CUSTOMER`). Senha: 8 a 72 caracteres.

### Cartões (pagamento simulado, decidido pelos **4 últimos dígitos**)

| Final       | Resultado                                      | HTTP | Pedido                              |
| ----------- | ---------------------------------------------- | ---- | ----------------------------------- |
| `0000`      | Aprovado                                       | 201  | `PAID` (estoque baixado)            |
| `1111`      | Recusado (`PAYMENT_DECLINED`)                  | 422  | `PAYMENT_FAILED` (estoque intacto)  |
| `2222`      | Indisponível/timeout (`PAYMENT_UNAVAILABLE`)   | 503  | `PAYMENT_FAILED` (estoque intacto)  |
| qualquer outro | Aprovado                                    | 201  | `PAID`                              |

PIX e boleto são **sempre aprovados**. O número deve ter de 13 a 19 dígitos (espaços e hífens são aceitos).
Exemplos: `4111 1111 1111 0000`, `4111 1111 1111 1111`, `4111 1111 1111 2222`.

### Cupons

| Cupom         | Efeito                          |
| ------------- | ------------------------------- |
| `PROMO10`     | 10% de desconto sobre o subtotal |
| `FRETEGRATIS` | frete zerado                    |
| qualquer outro | `422 INVALID_COUPON`           |

O código é normalizado (`promo10` e ` PROMO10 ` valem o mesmo). Cupom vazio é ignorado.

### Dados do seed (determinísticos)

29 produtos em 4 categorias (`Eletrônicos`, `Livros`, `Roupas`, `Casa`); 28 ativos. Após `POST /api/test/reset` os
IDs são sempre os mesmos (os contadores são zerados). Casos de borda:

| ID | SKU       | Caso                                                         |
| -- | --------- | ------------------------------------------------------------ |
| 7  | `ELE-007` | estoque **0** (indisponível)                                 |
| 10 | `LIV-003` | estoque **1**                                                |
| 17 | `ROU-003` | estoque **3** (baixo)                                        |
| 28 | `CAS-007` | nome com **100 caracteres**                                  |
| 29 | `CAS-008` | produto **inativo** (não aparece na vitrine)                 |
| 4  | `ELE-004` | Mouse Sem Fio, R$ 79,90, estoque 120 (bom para testar totais) |

Mapeamento de IDs: `ELE-001..007` = 1–7, `LIV-001..007` = 8–14, `ROU-001..007` = 15–21, `CAS-001..008` = 22–29.

## Regras de negócio

**Autenticação**
- JWT com validade de **24h** (`JWT_EXPIRES_IN`). Logout é *stateless*: o cliente descarta o token.
- Sem token → `401`; token de outro papel → `403`. Token expirado → `401 TOKEN_EXPIRED`; inválido → `401 INVALID_TOKEN`.
- Todas as rotas `/api/v1/admin/*` exigem `ADMIN`. Carrinho, checkout e pedidos do cliente exigem `CUSTOMER`.

**Produtos (ADMIN)**
- Nome 3–100 caracteres; preço > 0 com no máximo 2 casas decimais; SKU único; estoque inteiro ≥ 0.
- Remover = *soft delete* (`active=false`). Produto inativo some da vitrine (404 no detalhe) e não entra no carrinho.
- O estoque **só muda** por criação (estoque inicial) e pelos endpoints de estoque; o `PUT` ignora `stock`.

**Estoque (ADMIN)**
- Tipos: `ENTRY` (soma), `EXIT` (subtrai), `ADJUSTMENT` (define o novo valor absoluto).
- Estoque **nunca fica negativo** (`409 INSUFFICIENT_STOCK`). Cada movimentação grava um `StockMovement` com produto,
  tipo, quantidade, motivo, usuário, data, estoque anterior e novo.
- "Estoque baixo" = **< 5** unidades (inclui 0). Badge na lista administrativa.

**Vitrine**
- Somente produtos ativos; busca por nome (contém), filtro por categoria, ordenação (`price_asc`, `price_desc`,
  `name_asc`, `id_asc`) e paginação. Produto sem estoque mostra "Indisponível" e não pode ir ao carrinho.

**Carrinho (CUSTOMER)**
- Persistido no backend por usuário. Adicionar produto que já está no carrinho **soma** a quantidade.
- A quantidade total não pode exceder o estoque (`OUT_OF_STOCK` se estoque 0, `INSUFFICIENT_STOCK` se excede).
- O total é calculado no backend. O header mostra o contador de itens (soma das quantidades).

**Checkout e pedidos**
- Fluxo: revisão do carrinho → endereço → pagamento → confirmação.
- **Frete:** R$ 15,00; **grátis** se o subtotal (antes do desconto) for **maior que** R$ 200,00 (exatamente R$ 200,00 ainda
  paga frete) ou com o cupom `FRETEGRATIS`.
- **Total** = subtotal − desconto + frete.
- Pagamento aprovado: pedido `PAID`, baixa de estoque **atômica** (transação) e carrinho limpo. Se algum item não tiver
  estoque suficiente, o pedido inteiro falha com `409 OUT_OF_STOCK` (os itens problemáticos vêm em `details`) e **nada** é
  alterado nem criado.
- Pagamento recusado/indisponível: pedido `PAYMENT_FAILED` (o id vem em `error.details[0].orderId`), estoque e carrinho intactos.
- Cancelamento: somente pedidos `PAID`, pelo dono ou por um `ADMIN`; devolve o estoque (movimentação `ENTRY`).
  Outros status → `409 INVALID_ORDER_STATE`. Pedido de outro cliente → `404 ORDER_NOT_FOUND`.
- Status: `PENDING`, `PAID`, `PAYMENT_FAILED`, `CANCELLED`. **`PENDING` existe no modelo, mas nenhum fluxo o produz hoje**
  (o pagamento simulado resolve na hora).
- Valores monetários são números decimais com 2 casas (arredondados no backend).

## API REST

Prefixo `/api/v1` (exceto health, docs e utilitários de teste). Contrato completo no Swagger.

**Formato de erro** (todas as rotas):

```json
{ "error": { "code": "OUT_OF_STOCK", "message": "Estoque insuficiente para: Jaqueta", "details": [] } }
```

Erros de validação (`VALIDATION_ERROR`) trazem `details: [{ "field": "price", "message": "..." }]`.
Listagens paginadas retornam `{ "data": [...], "pagination": { "page", "pageSize", "total", "totalPages" } }`
(`page` ≥ 1, `pageSize` 1–100, padrão 10).

| Método | Rota | Acesso | Descrição |
| ------ | ---- | ------ | --------- |
| GET | `/api/health` | público | Health check (verifica o banco) |
| POST | `/auth/register` | público | Cadastro (retorna sessão) |
| POST | `/auth/login` | público | Login (token 24h) |
| POST | `/auth/logout` | autenticado | Logout (204) |
| GET | `/auth/me` | autenticado | Usuário atual |
| GET | `/categories` | público | Categorias com produtos ativos |
| GET | `/products` | público | Vitrine: `search`, `category`, `sort`, `page`, `pageSize` |
| GET | `/products/:id` | público | Detalhe (inativo → 404) |
| GET | `/cart` | CUSTOMER | Carrinho (com `total` e `totalItems`) |
| POST | `/cart/items` | CUSTOMER | Adiciona item (soma se já existir) |
| PATCH | `/cart/items/:productId` | CUSTOMER | Define a quantidade |
| DELETE | `/cart/items/:productId` | CUSTOMER | Remove item (retorna o carrinho) |
| DELETE | `/cart` | CUSTOMER | Limpa o carrinho (204) |
| POST | `/checkout/quote` | CUSTOMER | Subtotal, desconto, frete e total (valida cupom) |
| POST | `/orders` | CUSTOMER | Confirma o pedido (pagamento simulado) |
| GET | `/orders` | CUSTOMER | Histórico (`status`, paginação) |
| GET | `/orders/:id` | CUSTOMER | Detalhe do próprio pedido |
| POST | `/orders/:id/cancel` | CUSTOMER | Cancela pedido `PAID` |
| GET | `/admin/products` | ADMIN | Lista (inclui inativos; `active=true\|false`) |
| POST | `/admin/products` | ADMIN | Cria produto |
| GET | `/admin/products/:id` | ADMIN | Detalhe (inclui inativo) |
| PUT | `/admin/products/:id` | ADMIN | Edita produto |
| DELETE | `/admin/products/:id` | ADMIN | Soft delete (204, idempotente) |
| POST | `/admin/products/:id/stock` | ADMIN | Entrada, saída ou ajuste |
| GET | `/admin/stock/movements` | ADMIN | Histórico (`productId`, `search` por nome do produto, `type`, paginação) |
| GET | `/admin/dashboard` | ADMIN | Totais de produtos, estoque baixo e pedidos |
| GET | `/admin/orders` | ADMIN | Todos os pedidos (filtro `status`) |
| GET | `/admin/orders/:id` | ADMIN | Detalhe de qualquer pedido |
| POST | `/admin/orders/:id/cancel` | ADMIN | Cancela pedido `PAID` |
| POST | `/api/test/reset` | não-produção | Limpa o banco e recarrega o seed |
| POST | `/api/test/seed` | não-produção | Recarrega apenas os dados iniciais |
| POST | `/api/test/token` | não-produção | Gera JWT com validade customizada |
| POST | `/api/test/expired-token` | não-produção | Gera JWT já expirado |

Exemplos:

```bash
# login
curl -s -X POST localhost:3333/api/v1/auth/login -H 'content-type: application/json' \
  -d '{"email":"cliente@loja.com","password":"Cliente@123"}'

# adicionar ao carrinho
curl -s -X POST localhost:3333/api/v1/cart/items -H "authorization: Bearer $TOKEN" \
  -H 'content-type: application/json' -d '{"productId":4,"quantity":2}'

# pedido com cartão aprovado
curl -s -X POST localhost:3333/api/v1/orders -H "authorization: Bearer $TOKEN" -H 'content-type: application/json' -d '{
  "address": {"street":"Av Paulista","number":"1000","district":"Bela Vista","city":"São Paulo","state":"SP","zip":"01310-100"},
  "payment": {"method":"CREDIT_CARD","cardNumber":"4111 1111 1111 0000"},
  "couponCode": "PROMO10"
}'
```

## Códigos de erro

Os códigos são **estáveis**: o `code` é o contrato; a `message` pode mudar.

| HTTP | `code` | Quando acontece |
| ---- | ------ | --------------- |
| 400 | `VALIDATION_ERROR` | Corpo, query ou parâmetro inválido (`details` lista campo e mensagem) |
| 400 | `INVALID_JSON` | JSON malformado |
| 401 | `UNAUTHORIZED` | Token ausente |
| 401 | `TOKEN_EXPIRED` | Token expirado |
| 401 | `INVALID_TOKEN` | Token inválido/adulterado ou usuário não existe mais |
| 401 | `INVALID_CREDENTIALS` | E-mail ou senha incorretos |
| 403 | `FORBIDDEN` | Papel sem permissão (ex.: CUSTOMER em `/admin`, ADMIN no carrinho) |
| 404 | `PRODUCT_NOT_FOUND` | Produto inexistente ou inativo (vitrine e carrinho) |
| 404 | `CART_ITEM_NOT_FOUND` | Item não está no carrinho |
| 404 | `ORDER_NOT_FOUND` | Pedido inexistente ou de outro cliente |
| 404 | `USER_NOT_FOUND` | Usuário inexistente (apenas `/api/test/token`) |
| 404 | `ROUTE_NOT_FOUND` | Rota inexistente |
| 409 | `EMAIL_ALREADY_EXISTS` | Cadastro com e-mail já usado |
| 409 | `SKU_ALREADY_EXISTS` | SKU duplicado ao criar/editar produto |
| 409 | `OUT_OF_STOCK` | Carrinho: produto com estoque 0. Pedido: algum item sem estoque suficiente |
| 409 | `INSUFFICIENT_STOCK` | Quantidade acima do estoque (carrinho) ou saída/ajuste que deixaria o estoque negativo |
| 409 | `STOCK_CONFLICT` | Estoque alterado por outra operação durante a transação (tente novamente) |
| 409 | `INVALID_ORDER_STATE` | Cancelamento de pedido que não está `PAID` |
| 422 | `CART_EMPTY` | Cotação ou pedido com carrinho vazio |
| 422 | `INVALID_COUPON` | Cupom desconhecido |
| 422 | `PAYMENT_DECLINED` | Cartão final `1111` (`details[0].orderId` = pedido `PAYMENT_FAILED`) |
| 500 | `INTERNAL_ERROR` | Erro inesperado |
| 503 | `PAYMENT_UNAVAILABLE` | Cartão final `2222` (`details[0].orderId` = pedido `PAYMENT_FAILED`) |
| 503 | `DATABASE_UNAVAILABLE` | Health check sem acesso ao banco |

## Utilitários de teste

Ativos somente quando `NODE_ENV !== 'production'`:

| Rota | Efeito |
| ---- | ------ |
| `POST /api/test/reset` | Apaga **todos** os dados (inclusive pedidos e carrinhos), zera os IDs e recarrega o seed |
| `POST /api/test/seed` | Recarrega apenas os dados iniciais (*upsert* de usuários e produtos por e-mail/SKU; restaura estoque e `active`) |
| `POST /api/test/token` | Body `{ "email"?, "expiresInSeconds"? }` → JWT com a validade informada. Valor ≤ 0 gera token **já expirado** (padrão: −60) |
| `POST /api/test/expired-token` | Body `{ "email"? }` (padrão `cliente@loja.com`) → JWT já expirado |

Exemplo para validar a expiração de sessão:

```bash
EXPIRED=$(curl -s -X POST localhost:3333/api/test/expired-token | jq -r .token)
curl -i localhost:3333/api/v1/auth/me -H "authorization: Bearer $EXPIRED"   # 401 TOKEN_EXPIRED
```

Na UI, injete o token expirado no `localStorage` (chave `loja_token`) e navegue: o app volta ao login mostrando
`session-expired-message`.

**Latência simulada:** `SIMULATE_LATENCY_MS=500` atrasa 500 ms todas as rotas `/api/v1/*` (útil para testar esperas,
*loading states* e timeouts).

## Convenção de `data-testid`

- **kebab-case**, sempre em minúsculas, no formato `<contexto>-<elemento>[-<tipo>][-<id>]`.
- Elementos repetidos levam o **id do recurso** no final: `product-card-12`, `cart-item-quantity-4`, `admin-order-row-3`.
- Tipos: `-input`, `-button`, `-link`, `-select`, `-checkbox`, `-badge`, `-table`, `-row`, `-error`, `-success`.
- Páginas: `<nome>-page` (`home-page`, `login-page`, `checkout-page`, `admin-products-page`...).
- Erros de API: `<contexto>-error` (container), `<contexto>-error-message` e `<contexto>-error-code` (código estável da API);
  o container também traz `data-code`. Detalhes de validação: `<contexto>-error-detail`.
- Erros de campo: `<form>-error-<campo>` (`register-error-email`, `product-form-error-price`, `address-error-zip`).
- Status de pedido: o texto é traduzido, mas o atributo **`data-status`** traz o valor bruto (`PAID`, `CANCELLED`...).
- Confirmações inline: `<botão>` → `<botão>-confirm` e `<botão>-abort`.
- Estados de carregamento: `<contexto>-loading`; estados vazios: `<contexto>-empty`.

| Área | Exemplos |
| ---- | -------- |
| Header | `header`, `nav-home-link`, `nav-login-link`, `nav-register-link`, `nav-cart-link`, `cart-count`, `nav-orders-link`, `nav-admin-link`, `user-name`, `logout-button` |
| Login / cadastro | `login-email-input`, `login-password-input`, `login-submit-button`, `login-error`, `session-expired-message`, `register-name-input`, `register-email-input`, `register-password-input`, `register-submit-button` |
| Vitrine | `search-input`, `search-button`, `category-filter`, `sort-select`, `product-grid`, `product-card-{id}`, `product-name-{id}`, `product-price-{id}`, `product-unavailable-badge-{id}`, `add-to-cart-button-{id}`, `products-empty`, `pagination`, `pagination-prev`, `pagination-next`, `pagination-info` |
| Detalhe do produto | `product-detail-page`, `product-detail-name`, `product-detail-price`, `product-detail-stock`, `product-unavailable-badge`, `quantity-input`, `add-to-cart-button`, `add-to-cart-button-feedback`, `add-to-cart-button-error` |
| Carrinho | `cart-page`, `cart-empty`, `cart-item-{id}`, `cart-item-quantity-{id}`, `cart-item-increase-{id}`, `cart-item-decrease-{id}`, `cart-item-subtotal-{id}`, `cart-item-remove-{id}`, `cart-total`, `cart-clear-button`, `cart-checkout-button` |
| Checkout | `checkout-steps`, `checkout-step-{review\|address\|payment\|confirm}`, `checkout-coupon-input`, `checkout-coupon-apply-button`, `checkout-subtotal`, `checkout-discount`, `checkout-shipping`, `checkout-total`, `checkout-next-button`, `checkout-back-button`, `address-{street\|number\|complement\|district\|city\|state\|zip}-input`, `payment-method-{credit-card\|pix\|boleto}`, `card-number-input`, `card-holder-input`, `confirm-total`, `checkout-submit-button`, `checkout-error`, `checkout-failed-order-link` |
| Pedidos | `order-confirmation-page`, `order-confirmation-id`, `order-confirmation-status`, `orders-table`, `order-row-{id}`, `order-row-status-{id}`, `order-row-total-{id}`, `order-detail-page`, `order-detail-status`, `order-detail-total`, `order-item-{productId}`, `order-cancel-button` |
| Admin: navegação e dashboard | `admin-nav-{dashboard\|products\|stock\|orders}`, `dashboard-total-products`, `dashboard-low-stock`, `dashboard-out-of-stock`, `dashboard-total-orders`, `dashboard-orders-{paid\|cancelled\|payment-failed\|pending}` |
| Admin: produtos | `admin-products-table`, `admin-product-row-{id}`, `admin-product-stock-{id}`, `low-stock-badge-{id}`, `admin-product-active-{id}`, `admin-product-edit-{id}`, `admin-product-delete-{id}`, `admin-product-new-button`, `product-form-{name\|description\|price\|stock\|sku\|category\|image-url}-input`, `product-form-active-checkbox`, `product-form-submit-button`, `product-form-error` |
| Admin: estoque | `stock-search-input`, `stock-tab-stock`, `stock-tab-history`, `stock-tab-panel-stock`, `stock-tab-panel-history`, `stock-products-pagination-*`, `stock-movements-pagination-*`, `stock-products-table`, `stock-row-{id}`, `stock-adjust-button-{id}`, `stock-form`, `stock-type-select`, `stock-quantity-input`, `stock-reason-input`, `stock-submit-button`, `stock-form-success`, `stock-form-error`, `stock-movements-table`, `stock-movements-empty`, `stock-movement-row-{id}` |
| Admin: pedidos | `admin-orders-status-filter`, `admin-orders-table`, `admin-order-row-{id}`, `admin-order-status-{id}`, `admin-order-link-{id}`, `admin-order-cancel-{id}` |
| Acesso | `forbidden-page`, `not-found-page` |

Valores monetários aparecem formatados em pt-BR (`R$ 1.234,56`, com espaço não separável após `R$`).

## Variáveis de ambiente

`backend/.env.example` (copie para `backend/.env`):

| Variável | Padrão | Descrição |
| -------- | ------ | --------- |
| `NODE_ENV` | `development` | `production` desativa `/api/test/*` |
| `PORT` | `3333` | Porta da API |
| `DATABASE_URL` | `file:./dev.db` | SQLite (caminho relativo à pasta `backend/prisma`) |
| `JWT_SECRET` | `dev-secret-change-me` | Segredo do JWT (mínimo 8 caracteres) |
| `JWT_EXPIRES_IN` | `24h` | Validade do token (`30m`, `24h`, `7d`, ou segundos) |
| `SIMULATE_LATENCY_MS` | `0` | Atraso artificial (ms) nas rotas `/api/v1/*` |
| `CORS_ORIGIN` | `http://localhost:5173` | Origens permitidas (separadas por vírgula) |

Frontend: `API_PROXY_TARGET` (padrão `http://localhost:3333`) define para onde o Vite encaminha `/api`;
`VITE_API_URL` (opcional) faz o app chamar a API diretamente em outra URL (exige CORS).

## Estrutura do projeto

```
├── backend/
│   ├── prisma/schema.prisma, seed.ts
│   └── src/
│       ├── modules/{auth,products,stock,cart,orders,payments,dashboard,test-utils}/
│       │     *.routes.ts  *.controller.ts  *.service.ts  *.schema.ts  *.docs.ts
│       ├── middlewares/    auth, role, validate, error-handler, latency
│       ├── config/  prisma/  docs/  utils/  app.ts  server.ts  routes.ts
├── frontend/src/{api,context,components,pages,pages/admin}/
├── docs/TESTING-GUIDE.md   cenários de teste sugeridos
├── docker-compose.yml
└── README.md
```

As regras de negócio ficam nos `*.service.ts`, sem lógica nos controllers.

## Testes unitários

Há testes unitários (Vitest) das regras de negócio: preço/cupom/frete, pagamento simulado, regras de estoque e do
carrinho, validações Zod, JWT e controle de papel.

```bash
cd backend && npm test
```

Os testes de automação (API, UI/E2E, integração e performance) são feitos em projetos separados — veja
[docs/TESTING-GUIDE.md](docs/TESTING-GUIDE.md) para sugestões de cenários.

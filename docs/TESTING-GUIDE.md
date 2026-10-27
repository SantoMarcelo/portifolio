# Guia de testes — cenários sugeridos

Sugestões de cenários para automatizar contra a Loja QA. Os números de produto assumem o seed após
`POST /api/test/reset` (veja a tabela de IDs no [README](../README.md#dados-do-seed-determinísticos)).

## 1. Estratégia e preparação

- **Isolamento:** chame `POST /api/test/reset` antes de cada teste (ou suíte). É rápido e deixa IDs, estoque e usuários
  previsíveis. Use `POST /api/test/seed` quando quiser preservar pedidos/carrinhos e só restaurar produtos e usuários.
- **Autenticação em testes de UI:** faça login via API e injete o token no `localStorage` (chave `loja_token`) para não
  repetir a tela de login em todo teste. Mantenha poucos testes que passam pela tela de login de verdade.
- **Dados:** prefira produtos do seed por ID/SKU. Para dados novos, crie pela API admin com SKU único (ex.: `E2E-<timestamp>`).
- **Esperas:** os componentes expõem `*-loading` e `*-empty`; use `SIMULATE_LATENCY_MS` para exercitar esperas explícitas.
- **Oráculos:** cheque o resultado pela UI **e** pela API/estoque (movimentações em `GET /admin/stock/movements`).
- **Token expirado:** `POST /api/test/expired-token` ou `POST /api/test/token` com `expiresInSeconds` (≤ 0 = expirado).
- **Formato de erro:** valide sempre `error.code` (estável) e use `message` apenas como apoio.

Convenções de prioridade abaixo: **P1** crítico (smoke/regressão), **P2** importante, **P3** complementar.

## 2. Testes de API

### 2.1 Autenticação

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| A1 | Login `admin@loja.com` / `Admin@123` | 200, `token`, `expiresIn=86400`, `user.role=ADMIN` | P1 |
| A2 | Login `cliente@loja.com` / `Cliente@123` | 200, `user.role=CUSTOMER` | P1 |
| A3 | Senha errada / e-mail inexistente | 401 `INVALID_CREDENTIALS` (mesma resposta nos dois casos) | P1 |
| A4 | Login sem campos / e-mail malformado | 400 `VALIDATION_ERROR` com `details` por campo | P2 |
| A5 | Cadastro válido | 201, role `CUSTOMER`, token utilizável em `/auth/me` | P1 |
| A6 | Cadastro com e-mail repetido (inclusive em caixa diferente: `CLIENTE@LOJA.COM`) | 409 `EMAIL_ALREADY_EXISTS` | P1 |
| A7 | Cadastro com role no body (`"role":"ADMIN"`) | 201 mas usuário continua `CUSTOMER` (campo ignorado) | P1 |
| A8 | Cadastro: nome 1 caractere, senha 7 / 8 / 72 / 73 caracteres | 400 / 201 / 201 / 400 | P2 |
| A9 | `GET /auth/me` com token válido / sem token / `Bearer abc` / token expirado | 200 / 401 `UNAUTHORIZED` / 401 `INVALID_TOKEN` / 401 `TOKEN_EXPIRED` | P1 |
| A10 | Token com assinatura adulterada ou assinado com outro segredo | 401 `INVALID_TOKEN` | P2 |
| A11 | Cabeçalho `Authorization` sem o prefixo `Bearer` | 401 `UNAUTHORIZED` | P3 |
| A12 | Logout com token válido / sem token | 204 / 401 | P3 |
| A13 | Token de um cliente cadastrado **antes** do `reset` (usuário não existe mais). Obs.: tokens dos usuários do seed continuam válidos, pois os IDs são os mesmos | 401 `INVALID_TOKEN` | P3 |

### 2.2 Autorização (matriz)

Teste cada rota `/admin/*` com **sem token (401)**, **CUSTOMER (403)** e **ADMIN (2xx)**. Teste também o inverso:
rotas de cliente com **ADMIN (403)**.

| Rota | Visitante | CUSTOMER | ADMIN |
| ---- | --------- | -------- | ----- |
| `GET /products`, `/products/:id`, `/categories` | 200 | 200 | 200 |
| `/cart/*`, `/checkout/quote`, `/orders/*` | 401 | 2xx | 403 |
| `/admin/*` | 401 | 403 | 2xx |
| `POST /api/test/*` | 200 (não-produção) | 200 | 200 |

Pedidos: CUSTOMER A não acessa pedido de CUSTOMER B (`GET /orders/:id` e `POST /orders/:id/cancel` → 404 `ORDER_NOT_FOUND`) — prio P1 (IDOR).

### 2.3 Produtos (ADMIN)

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| P1 | Criar produto válido | 201, `active=true`, `id` novo; com `stock>0` aparece movimentação `ENTRY` "Estoque inicial" | P1 |
| P2 | Nome com 2 / 3 / 100 / 101 caracteres | 400 / 201 / 201 / 400 | P1 |
| P3 | Nome ausente, só espaços, ou com espaços nas pontas (trim) | 400 / 400 / 201 com nome aparado | P2 |
| P4 | Preço `0`, `-1`, `1.999`, `"abc"`, ausente | 400 `VALIDATION_ERROR` (campo `price`) | P1 |
| P5 | Preço `0.01` e `1000000` / `1000000.01` | 201 / 400 | P2 |
| P6 | Estoque `-1`, `1.5`, `"x"` | 400 (campo `stock`) | P1 |
| P7 | SKU duplicado (criar e editar para SKU de outro produto) | 409 `SKU_ALREADY_EXISTS` | P1 |
| P8 | Editar mantendo o próprio SKU | 200 | P2 |
| P9 | Editar enviando `stock: 999` | 200 e estoque **não muda** | P1 |
| P10 | `GET /admin/products/:id` inexistente / `abc` / `0` / `-1` | 404 `PRODUCT_NOT_FOUND` / 400 / 400 / 400 | P2 |
| P11 | `DELETE` produto ativo | 204; some da vitrine; `GET /products/:id` → 404; `GET /admin/products/:id` → 200 com `active=false` | P1 |
| P12 | `DELETE` repetido no mesmo produto | 204 (idempotente) | P3 |
| P13 | Produto inativo no carrinho/checkout (veja 2.6) | erro claro | P2 |
| P14 | Listagem admin: `search=clean`, `category=Livros`, `active=false`, combinados | filtros corretos; `active=false` retorna só o ID 29 (+ removidos) | P2 |
| P15 | Paginação: `page=1&pageSize=5` → 5 itens e `totalPages` correto; `page` além do último → `data=[]`; `page=0`, `pageSize=101` → 400 | | P1 |
| P16 | Ordenação `price_asc`/`price_desc`/`name_asc`: confira a ordem e a estabilidade (desempate por `id`) | | P2 |
| P17 | Injeção/caracteres especiais em `search` (`%`, `'`, `<script>`) | 200 sem erro | P3 |

### 2.4 Estoque (ADMIN)

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| S1 | `ENTRY` 10 em produto com estoque 3 | 201, estoque 13, movimentação `previousStock=3 → newStock=13` | P1 |
| S2 | `EXIT` igual ao estoque / `EXIT` estoque+1 | 201 estoque 0 / 409 `INSUFFICIENT_STOCK` (`details[0].available`) e estoque inalterado | P1 |
| S3 | `ADJUSTMENT` para 0 / para 50 / para −1 | 201 / 201 / 400 | P1 |
| S4 | `ENTRY`/`EXIT` com quantidade 0, negativa ou decimal | 400 | P1 |
| S5 | Sem `reason` / `reason` com 2 caracteres | 400 | P2 |
| S6 | Tipo inválido (`"type":"FOO"`) | 400 | P2 |
| S7 | Produto inexistente | 404 `PRODUCT_NOT_FOUND` | P2 |
| S8 | Histórico: ordem decrescente por data, filtros `productId` e `type`, `user` e `product` preenchidos | | P2 |
| S9 | Cada operação válida gera **exatamente 1** movimentação; operação inválida não gera nenhuma | | P1 |
| S10 | Dashboard: `lowStockProducts` (ativos com estoque < 5, inclui zerados) e `outOfStockProducts` batem com a listagem | 3 e 1 no seed | P2 |
| S11 | Limite de "estoque baixo": estoque 4 → `lowStock=true`; estoque 5 → `false` | | P1 |

### 2.5 Vitrine

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| V1 | `GET /products` sem token | 200; nenhum item inativo (ID 29 ausente) | P1 |
| V2 | `search` (parcial, caixa diferente), sem resultado | itens corretos / `data=[]`, `total=0` | P1 |
| V3 | `category=Livros` / categoria inexistente | 7 itens / vazio | P1 |
| V4 | `sort=price_desc` | preços não crescentes | P1 |
| V5 | Produto ID 7: `inStock=false`; ID 10: `stock=1`; ID 17: `lowStock=true`; ID 28: nome com 100 caracteres | | P2 |
| V6 | `GET /products/29` (inativo) / `/products/9999` | 404 `PRODUCT_NOT_FOUND` | P1 |
| V7 | `GET /categories` | 4 categorias, ordenadas | P3 |

### 2.6 Carrinho

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| C1 | Carrinho novo | `items=[]`, `total=0`, `totalItems=0` | P2 |
| C2 | Adicionar produto 4 ×2 e depois ×1 | um único item com quantidade 3, `subtotal=239.70`, `total=239.70` | P1 |
| C3 | Adicionar produto ID 7 (estoque 0) | 409 `OUT_OF_STOCK` | P1 |
| C4 | Produto ID 17 (estoque 3): adicionar 3 → ok; +1 → 409 `INSUFFICIENT_STOCK` (`inCart=3`) | | P1 |
| C5 | Adicionar quantidade maior que o estoque de uma vez | 409 `INSUFFICIENT_STOCK` | P1 |
| C6 | Produto inativo (29) ou inexistente | 404 `PRODUCT_NOT_FOUND` | P1 |
| C7 | Quantidade 0, negativa, decimal, 1000, ausente (padrão 1) | 400 / 400 / 400 / 400 / 201 | P1 |
| C8 | `PATCH` quantidade válida / acima do estoque / item que não está no carrinho | 200 / 409 / 404 `CART_ITEM_NOT_FOUND` | P1 |
| C9 | `DELETE` item / repetido | 200 com carrinho atualizado / 404 | P2 |
| C10 | `DELETE /cart` | 204 e carrinho vazio | P2 |
| C11 | Persistência: adicionar, fazer logout/login (ou novo token), `GET /cart` | itens preservados | P1 |
| C12 | Isolamento: carrinhos de dois clientes são independentes | | P1 |
| C13 | Total calculado no backend: tente enviar `price`/`total` no body (devem ser ignorados) | | P2 |
| C14 | Estoque reduzido pelo admin depois de adicionar ao carrinho | item com `available=false` | P2 |
| C15 | Admin chamando `/cart` | 403 | P2 |

### 2.7 Cotação, pedidos e pagamento

Totais de referência (produto 4 = R$ 79,90):

| Subtotal | Cupom | Desconto | Frete | Total |
| -------- | ----- | -------- | ----- | ----- |
| 79,90 | — | 0,00 | 15,00 | 94,90 |
| 79,90 | `PROMO10` | 7,99 | 15,00 | 86,91 |
| 79,90 | `FRETEGRATIS` | 0,00 | 0,00 | 79,90 |
| 239,70 (×3) | — | 0,00 | **0,00** (> 200) | 239,70 |
| 239,70 | `PROMO10` | 23,97 | 0,00 | 215,73 |
| exatamente 200,00 | — | 0,00 | 15,00 | 215,00 |
| 200,01 | — | 0,00 | 0,00 | 200,01 |

| # | Cenário | Esperado | Prio |
| - | ------- | -------- | ---- |
| O1 | `POST /checkout/quote` com carrinho vazio | 422 `CART_EMPTY` | P1 |
| O2 | Quote com cada linha da tabela acima | valores exatos (2 casas) | P1 |
| O3 | Cupom `promo10` (minúsculo), ` PROMO10 `, vazio, `XPTO`, `PROMO20` | aplica / aplica / sem cupom / 422 `INVALID_COUPON` / 422 | P1 |
| O4 | Pedido com cartão final `0000` | 201 `PAID`; estoque dos itens reduzido; carrinho vazio; 1 movimentação `EXIT` por item ("Pedido #id") | P1 |
| O5 | Cartão final `1111` | 422 `PAYMENT_DECLINED`; pedido `PAYMENT_FAILED` (`details[0].orderId`); estoque **e carrinho intactos** | P1 |
| O6 | Cartão final `2222` | 503 `PAYMENT_UNAVAILABLE`; pedido `PAYMENT_FAILED`; estoque e carrinho intactos | P1 |
| O7 | Cartão com outro final (ex.: `3333`) | 201 `PAID` | P2 |
| O8 | PIX e boleto (sem dados de cartão) | 201 `PAID`, `cardLast4=null` | P1 |
| O9 | `CREDIT_CARD` sem `cardNumber` / com 12 ou 20 dígitos / com letras | 400 | P1 |
| O10 | Número do cartão **não** aparece completo em nenhuma resposta (só `cardLast4`) | | P1 |
| O11 | Carrinho vazio no `POST /orders` | 422 `CART_EMPTY` | P1 |
| O12 | Endereço: campos obrigatórios ausentes, UF com 1/3 letras, CEP `1234`/`01310100`/`01310-100` | 400 / 400 / 400,201,201 | P2 |
| O13 | **Atomicidade:** carrinho com itens A (ok) e B; admin zera o estoque de B antes do pedido | 409 `OUT_OF_STOCK` com B em `details`; estoque de A **inalterado**; nenhum pedido novo criado | P1 |
| O14 | Pedido consome exatamente o último item (produto 10, estoque 1) | 201; estoque 0; segundo cliente tentando comprar → 409 `OUT_OF_STOCK` | P1 |
| O15 | Pedido de item que foi desativado depois de entrar no carrinho | 409 `OUT_OF_STOCK`, sem alterações | P2 |
| O16 | Cancelar pedido `PAID` (cliente e admin) | 200 `CANCELLED`; estoque devolvido; movimentação `ENTRY` "Cancelamento do pedido #id" | P1 |
| O17 | Cancelar pedido `CANCELLED` / `PAYMENT_FAILED` / cancelar duas vezes | 409 `INVALID_ORDER_STATE`; estoque não duplica | P1 |
| O18 | Cancelar pedido de outro cliente | 404 `ORDER_NOT_FOUND` | P1 |
| O19 | `GET /orders` lista só os pedidos do dono, mais recentes primeiro; filtro `status`; paginação | | P1 |
| O20 | `GET /admin/orders` lista todos; filtro `status=CANCELLED`; traz `user.email` | | P1 |
| O21 | Valores do pedido (`subtotal`, `discount`, `shipping`, `total`) permanecem após mudar o preço do produto (snapshot dos itens) | | P2 |
| O22 | Dashboard reflete a contagem de pedidos por status | | P3 |

### 2.8 Contrato (OpenAPI)

- Baixe `GET /api/docs.json` e gere clientes/validadores (ex.: Schemathesis, Dredd, Postman/Newman, openapi-generator).
- Valide que **todas** as respostas documentadas (status e *schema*) coincidem com as reais, inclusive o formato de erro.
- Verifique que rotas de teste (`/api/test/*`) **não** aparecem no contrato com `NODE_ENV=production`.
- Fuzzing a partir do contrato: tipos errados, campos extras, strings enormes, `null`.

## 3. Testes de UI / E2E

Use os `data-testid` do [README](../README.md#convenção-de-data-testid).

### 3.1 Smoke (P1)

1. Home carrega com 8 cards (`pageSize=8`) e paginação.
2. Login do cliente e do admin; header mostra o nome e o botão de sair.
3. Cliente: adicionar ao carrinho → checkout com cartão `0000` → tela de confirmação com status `PAID`.
4. Admin: dashboard carrega; lista de produtos carrega.

### 3.2 Autenticação e acesso

| # | Cenário | Esperado |
| - | ------- | -------- |
| U1 | Login válido (cliente → home; admin → `/admin`) | redirecionamento correto |
| U2 | Login inválido | `login-error` com código `INVALID_CREDENTIALS`; permanece no login |
| U3 | Cadastro com sucesso | já entra logado; cadastro com e-mail repetido mostra `EMAIL_ALREADY_EXISTS`; erros por campo (`register-error-*`) |
| U4 | Logout | volta à vitrine; header mostra "Entrar"; `/cart` redireciona ao login |
| U5 | Visitante acessa `/cart`, `/checkout`, `/orders`, `/admin` | redireciona para `/login` |
| U6 | Depois do login, volta para a rota que o visitante tentou acessar | |
| U7 | CUSTOMER em `/admin/*` / ADMIN em `/cart` | `forbidden-page` |
| U8 | Sessão expirada (token expirado no `localStorage`) | volta ao login com `session-expired-message` |
| U9 | Recarregar a página mantém a sessão (token no `localStorage`) | |
| U10 | Visitante clica em "Adicionar ao carrinho" | vai ao login |
| U11 | Rota inexistente | `not-found-page` |

### 3.3 Vitrine

- Busca (parcial, sem resultado → `products-empty`), filtro de categoria, ordenação por preço (compare a ordem dos `product-price-*`).
- Estado salvo na URL: recarregar mantém busca/filtro/página; botão "voltar" do navegador.
- Paginação: anterior desabilitada na primeira página, próxima desabilitada na última; `pagination-info` coerente.
- Produto 7: badge "Indisponível" e botão desabilitado; produto 17: badge "Últimas 3 unidades".
- Detalhe: nome de 100 caracteres (produto 28) não quebra o layout; produto inativo (`/products/29`) → `product-not-found`.
- Admin logado vê a vitrine sem botão de compra (`admin-cannot-buy-notice`).

### 3.4 Carrinho

- Contador do header (`cart-count`) acompanha a soma das quantidades (add, +, −, remover, limpar, após pedido).
- Aumentar até o limite do estoque (produto 17): o `+` seguinte mostra `INSUFFICIENT_STOCK`.
- `−` desabilitado em 1; remover item; limpar carrinho → `cart-empty`.
- `cart-total` bate com a soma dos `cart-item-subtotal-*`.
- Carrinho persiste após logout/login e entre abas.
- Item com `available=false` (admin reduziu o estoque) mostra aviso e desabilita "Finalizar compra".

### 3.5 Checkout (fluxo em etapas)

| # | Cenário | Esperado |
| - | ------- | -------- |
| K1 | Checkout com carrinho vazio | `checkout-empty` |
| K2 | Indicador de etapas avança e volta sem perder dados já preenchidos | |
| K3 | Cupom inválido → `checkout-coupon-error`; `PROMO10` → desconto; remover cupom restaura o total | |
| K4 | Frete: subtotal ≤ 200 mostra R$ 15,00; > 200 e `FRETEGRATIS` mostram "Grátis" | |
| K5 | Endereço: campos obrigatórios, UF ≠ 2 letras e CEP inválido mostram `address-error-*` e não avançam | |
| K6 | Pagamento: cartão com menos de 13 dígitos mostra `payment-error`; PIX/boleto não pedem cartão | |
| K7 | Cartão `0000` → confirmação com número, status `PAID` e total correto; carrinho zera | |
| K8 | Cartão `1111` → `checkout-error` `PAYMENT_DECLINED`, link para o pedido `PAYMENT_FAILED`, carrinho **mantido** | |
| K9 | Cartão `2222` → `PAYMENT_UNAVAILABLE`; o cliente corrige o cartão e conclui com sucesso | |
| K10 | Estoque esgotado por outro usuário durante o checkout → `checkout-error` `OUT_OF_STOCK` | |
| K11 | Duplo clique em "Confirmar pedido" não cria dois pedidos (botão desabilita durante o envio) | |
| K12 | Com `SIMULATE_LATENCY_MS=1500`: botão mostra "Processando..." e há *loading states* | |

### 3.6 Pedidos

- Meus pedidos: ordem decrescente, filtro por status, paginação, `orders-empty` para cliente novo.
- Detalhe: itens, subtotal, desconto, frete, total, cupom, pagamento (final do cartão) e endereço coincidem com o checkout.
- Cancelar pedido `PAID`: confirmação inline (`-confirm`/`-abort`); status vira `CANCELLED`; botão some; estoque volta (valide pela vitrine/admin).
- Pedido `PAYMENT_FAILED`/`CANCELLED` não exibe o botão de cancelar.
- Pedido de outro cliente (`/orders/<id alheio>`) → `order-not-found`.

### 3.7 Admin

- **Dashboard:** totais coerentes com as listagens (ativos, estoque baixo, sem estoque, pedidos por status).
- **Produtos:** busca, filtros de categoria e status; badge "Estoque baixo" nos produtos 7, 10 e 17 (e em qualquer < 5); linha de inativo esmaecida.
- **Criar:** erros por campo (nome curto, preço 0, SKU vazio, estoque negativo); SKU duplicado → `SKU_ALREADY_EXISTS`; sucesso volta para a lista.
- **Editar:** formulário carrega os dados; estoque aparece desabilitado; salvar mantém o estoque.
- **Remover:** confirmação inline; linha passa para "Inativo"; produto some da vitrine.
- **Estoque:** selecionar produto, entrada/saída/ajuste; saída acima do estoque mostra `INSUFFICIENT_STOCK`; `stock-form-current-stock` e o histórico atualizam; link "Estoque" da lista abre o produto selecionado.
- **Pedidos:** filtro por status; detalhe com dados do cliente; cancelar pedido `PAID` e ver o status mudar.

### 3.8 Multi-aba e sessões (P3)

- Logout em uma aba e ação na outra → próxima chamada falha com 401 e o app volta ao login.
- Dois clientes disputando o último item (produto 10): só um pedido conclui.

## 4. Testes de integração

Combinam API + UI + estado do banco observado pela API:

| # | Fluxo | Verificações |
| - | ----- | ------------ |
| I1 | Admin cria produto (estoque 5) → aparece na vitrine → cliente compra 2 → admin vê estoque 3 e movimentação `EXIT` | UI ↔ API ↔ histórico |
| I2 | Cliente compra → admin cancela → estoque volta ao valor original; histórico tem `EXIT` + `ENTRY` | consistência de estoque |
| I3 | Admin remove produto que está no carrinho de um cliente → checkout falha com `OUT_OF_STOCK`, nada muda | carrinho × soft delete |
| I4 | Admin ajusta estoque para 0 com produto no carrinho → item `available=false` e pedido bloqueado | carrinho × estoque |
| I5 | Pedido `PAYMENT_FAILED` → corrigir o cartão e refazer → estoque baixa **uma única vez** | sem baixa duplicada |
| I6 | Soma de `EXIT` − `ENTRY` das movimentações = variação do estoque do produto | invariante |
| I7 | Preço editado depois do pedido não altera o pedido existente | snapshot |
| I8 | Fluxo completo com cupom + frete grátis: UI mostra os mesmos valores que `POST /checkout/quote` e que `GET /orders/:id` | totais consistentes |
| I9 | Ciclo de vida: cadastrar cliente novo → comprar → cancelar → ver histórico | E2E completo |

## 5. Valores limite e casos de borda

| Campo | Valores a testar |
| ----- | ---------------- |
| Nome do produto | 2, 3, 100, 101 caracteres; acentos/emoji; espaços nas pontas |
| Preço | 0, 0.01, 0.001, 999999.99, 1000000, 1000000.01, negativo, string |
| Estoque | −1, 0, 1, 4, 5, 6, 2147483647, decimal |
| Quantidade (carrinho) | 0, 1, igual ao estoque, estoque+1, 999, 1000, decimal |
| Senha | 7, 8, 72, 73 caracteres |
| Frete | subtotal 199,99 / 200,00 / 200,01 (e com `PROMO10`: 210 → frete grátis mesmo com desconto) |
| Paginação | `page` 0, 1, último, último+1; `pageSize` 0, 1, 100, 101 |
| Cartão | 12, 13, 19, 20 dígitos; com espaços/hífens; com letras; finais `0000`, `1111`, `2222` |
| CEP | `1234`, `01310100`, `01310-100`, `0131-0100` |
| Cupom | `promo10`, ` PROMO10 `, `Promo10`, vazio, 31+ caracteres |
| Estoque limite | último item (1), baixo (3), zerado (0), 4 vs 5 (limite do alerta) |

## 6. Testes negativos e de segurança

- Corpo JSON malformado → 400 `INVALID_JSON`; `Content-Type` ausente; corpo vazio onde há campos obrigatórios.
- Campos extras e tipos errados (`"price":"10"`, `"quantity":"2"`, `null`) → 400, sem erro 500.
- IDs na URL inválidos (`abc`, `0`, `-1`, `1.5`, enorme) → 400/404, nunca 500.
- Mass assignment: `role`, `active`, `userId`, `total`, `status` enviados em cadastro, pedido e carrinho são ignorados.
- IDOR: acessar/cancelar pedidos e carrinhos de outro usuário (pedido → 404).
- JWT: token vazio, `alg: none`, payload alterado, assinatura trocada, expirado → sempre 401.
- Escalonamento: CUSTOMER chamando todas as rotas `/admin/*` → 403 (nenhum efeito colateral).
- Enumeração de usuários: login com e-mail inexistente e senha errada devem ser indistinguíveis.
- XSS: nome de produto/endereço com `<script>` e `"` não executa nem quebra a página (React escapa).
- Falhas de rede: derrube a API durante o checkout → UI mostra `NETWORK_ERROR`, sem pedido duplicado ao repetir.
- Endpoints de teste: com `NODE_ENV=production` → 404 e ausentes do Swagger.

## 7. Concorrência

| # | Cenário | Esperado |
| - | ------- | -------- |
| R1 | Dois clientes finalizam, em paralelo, pedidos do **último** item (produto 10) | exatamente um `PAID`; o outro `409` (`OUT_OF_STOCK` ou `STOCK_CONFLICT`); estoque final 0, nunca negativo |
| R2 | N saídas de estoque em paralelo (admin) somando mais que o estoque | estoque nunca negativo; soma das saídas aceitas ≤ estoque inicial |
| R3 | Dois cancelamentos simultâneos do mesmo pedido | um sucesso, outro `409 INVALID_ORDER_STATE`; estoque devolvido uma vez |
| R4 | Adicionar o mesmo produto ao carrinho em paralelo | uma única linha no carrinho, quantidade somada |

> `STOCK_CONFLICT` indica que outra operação alterou o estoque durante a transação — o teste deve aceitar este
> código como falha legítima de concorrência e repetir, se aplicável.

## 8. Performance

Sugestões para k6, JMeter, Gatling ou Locust. Rode contra um ambiente dedicado (SQLite em arquivo suporta pouca
escrita concorrente) e chame `POST /api/test/reset` antes de cada execução.

| Cenário | Carga sugerida | Critérios de exemplo |
| ------- | -------------- | -------------------- |
| Leitura da vitrine (`GET /products` com filtros variados) | 50–200 VUs, 2–5 min | p95 < 300 ms, erro < 1% |
| Login em massa (`POST /auth/login`) | rampa até 50 VUs | p95 < 500 ms (bcrypt é CPU-bound) |
| Jornada do cliente (login → listar → detalhe → carrinho → quote → pedido) | 20–50 VUs | p95 por etapa; 0 erros 5xx; estoque consistente ao final |
| Pico no último item (corrida) | 100 VUs no mesmo produto | exatamente 1 pedido `PAID`; demais 409; sem 5xx |
| Escrita admin (movimentações de estoque) | 10–20 VUs | estoque final = inicial + entradas − saídas |
| Soak | carga moderada por 30–60 min | sem degradação de latência nem vazamento de memória |
| Spike | 0 → 200 VUs em 10 s | recuperação sem erros persistentes |

- **Latência simulada:** suba a API com `SIMULATE_LATENCY_MS=800` e valide *timeouts* e esperas do cliente de teste.
- **Pagamento 503:** use o cartão final `2222` para exercitar *retry/backoff* e tratamento de indisponibilidade.
- **Pós-carga:** valide invariantes via API (estoque ≥ 0, soma de movimentações = variação de estoque, nenhum pedido `PAID` sem baixa).

## 9. Acessibilidade e usabilidade (P3)

- Navegação completa por teclado nos fluxos de login, carrinho e checkout; foco visível.
- Campos com `label` associado; erros anunciados (`role="alert"` nas mensagens de erro).
- Contraste dos badges de status e de estoque baixo.
- Layout em telas estreitas (< 700 px): detalhe do produto e formulários empilham.

## 10. Checklist de regressão rápida

1. `reset` → login admin/cliente.
2. Vitrine: busca, categoria, ordenação, paginação.
3. Produto 7 indisponível; produto 17 com alerta de estoque baixo.
4. Carrinho: soma de quantidades, limite de estoque, contador do header.
5. Checkout: cupom, frete, cartões `0000`, `1111`, `2222`, PIX e boleto.
6. Cancelamento devolve estoque; `PAYMENT_FAILED` não altera estoque.
7. Admin: CRUD de produto, movimentação de estoque, histórico, pedidos por status.
8. Autorização: 401 sem token, 403 para CUSTOMER em `/admin`, token expirado.

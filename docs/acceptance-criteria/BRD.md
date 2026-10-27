# Acceptance Criteria — Loja QA (docs/BRD.md)
Status: ✅ APROVADO por Marcelo (mdeoliveirasanto3) em 2026-10-27 (versão 2)

## Resumo
- Fonte: `docs/BRD.md` v1.0 (lido por inteiro).
- Regras `BR-*` cobertas: **113** (AUTH 15, SHOP 9, CART 15, PRICE 14, PAY 8, ORD 17, PROD 11, STK 10, DASH 4, AORD 4, GEN 6).
- Requisitos transversais adicionais: matriz de acesso (seção 8) → `ACL-*`; máquina de estados (seção 6) → `FSM-*`.
- Perguntas em aberto: **19** (6 do BRD: PA-04, 05, 07, 08, 09, 10; 13 lacunas Q-01..Q-19 restantes). Q-05, Q-08, Q-09, Q-10, Q-11 e Q-13 foram resolvidas (ver decisões D-01..D-06).
- Total de ACs: 337

### Decisões resolvidas na versão 2
| ID | Origem | Decisão |
| -- | ------ | ------- |
| D-01 | Q-08 | STOCK_CONFLICT, atomicidade sob falha induzida: verificados na camada **Integração** (serviço), não via API. Na API, a atomicidade é verificada pelo efeito observável (BR-ORD-05/06/07). |
| D-02 | Q-09 | `PENDING`: via API só se verifica a ausência (BR-ORD-17). Cancelar `PENDING` exige inserção direta no banco (camada Integração). |
| D-03 | Q-10 | BR-STK-03 reescrito: `ADJUSTMENT` negativo → `400 VALIDATION_ERROR`; `INSUFFICIENT_STOCK` só para `EXIT`. Ver AC-BR-STK-03-03. |
| D-04 | Q-11 | ADMIN cancela somente por `/admin/orders/:id/cancel`; na rota de cliente → 403. BRD (BR-ORD-12, matriz) atualizado. Ver AC-BR-ORD-12-03, AC-ACL-04b. |
| D-05 | Q-05 | Campos conferidos no código (`address.street/number/complement/district/city/state/zip`, `payment.method/cardNumber/cardHolder`, `couponCode`); verbos/rotas em `*.routes.ts`. |
| D-06 | Q-13 | `couponCode = null` sem cupom ou com cupom em branco. Ver AC-BR-ORD-09-02/03. |

## Convenções
- ID do AC: `AC-<ID da regra>-<nn>` (ex.: `AC-BR-CART-05-01`). Matriz de acesso: `AC-ACL-nn`; máquina de estados: `AC-FSM-nn`.
- Camada: **[API]** ou **[UI]** no título do AC. Sem marca = API.
- Mensagens (`message`) não são contrato; valida-se `code`, HTTP e campos.
- Dados de referência: seed (`admin@loja.com`/`Admin@123`, `cliente@loja.com`/`Cliente@123`; produtos 4, 7, 10, 17, 28, 29 do BRD seção 9).
- Valores monetários em reais com 2 casas.
- Onde um valor depende de dado não fornecido pelo BRD, o AC usa a regra em termos relativos (ex.: "estoque N") e não inventa valores de negócio.

---

## Autenticação (AUTH)

### BR-AUTH-01 — Cadastro cria sempre CUSTOMER
**AC-BR-AUTH-01-01** — Cadastro válido cria conta CUSTOMER
```gherkin
Given um visitante sem sessão
When envia POST /auth/register com name "Maria Silva", email novo válido e password "Senha@1234"
Then a resposta é 201
And user.role é "CUSTOMER"
```
**AC-BR-AUTH-01-02** — Campo `role` enviado é ignorado
```gherkin
Given um visitante sem sessão
When envia POST /auth/register com dados válidos e "role": "ADMIN" no corpo
Then a conta é criada com user.role "CUSTOMER"
And o corpo não retorna role "ADMIN"
```

### BR-AUTH-02 — Nome 2 a 100 caracteres (após trim)
**AC-BR-AUTH-02-01** — Limites aceitos
```gherkin
Given um visitante sem sessão
When cadastra com name de 2 caracteres ("Jo")
Then o cadastro é aceito (201)
When cadastra com name de 100 caracteres
Then o cadastro é aceito (201)
```
**AC-BR-AUTH-02-02** — 1 caractere rejeitado
```gherkin
When cadastra com name de 1 caractere ("J")
Then a resposta é 400 com code "VALIDATION_ERROR"
And details contém field "name"
```
**AC-BR-AUTH-02-03** — 101 caracteres rejeitado
```gherkin
When cadastra com name de 101 caracteres
Then a resposta é 400 com code "VALIDATION_ERROR"
And details contém field "name"
```
**AC-BR-AUTH-02-04** — Trim antes de medir
```gherkin
When cadastra com name "  J  " (1 caractere útil + espaços)
Then a resposta é 400 com code "VALIDATION_ERROR" em "name"
```

### BR-AUTH-03 — E-mail válido e normalizado
**AC-BR-AUTH-03-01** — Formato inválido rejeitado
```gherkin
When cadastra com email "sem-arroba"
Then a resposta é 400 com code "VALIDATION_ERROR"
And details contém field "email"
```
**AC-BR-AUTH-03-02** — Normalização (trim + minúsculas)
```gherkin
When cadastra com email "  NOVO.Usuario@Loja.COM  "
Then user.email retornado é "novo.usuario@loja.com"
```

### BR-AUTH-04 — E-mail único
**AC-BR-AUTH-04-01** — E-mail duplicado exato
```gherkin
Given existe o usuário "cliente@loja.com"
When cadastra com email "cliente@loja.com"
Then a resposta é 409 com code "EMAIL_ALREADY_EXISTS"
```
**AC-BR-AUTH-04-02** — E-mail duplicado em caixa diferente
```gherkin
Given existe o usuário "cliente@loja.com"
When cadastra com email "CLIENTE@LOJA.COM"
Then a resposta é 409 com code "EMAIL_ALREADY_EXISTS"
```

### BR-AUTH-05 — Senha 8 a 72 no cadastro
**AC-BR-AUTH-05-01** — Limites aceitos
```gherkin
When cadastra com password de 8 caracteres
Then a resposta é 201
When cadastra (outro e-mail) com password de 72 caracteres
Then a resposta é 201
```
**AC-BR-AUTH-05-02** — 7 caracteres rejeitado
```gherkin
When cadastra com password de 7 caracteres
Then a resposta é 400 com code "VALIDATION_ERROR" em field "password"
```
**AC-BR-AUTH-05-03** — 73 caracteres rejeitado
```gherkin
When cadastra com password de 73 caracteres
Then a resposta é 400 com code "VALIDATION_ERROR" em field "password"
```

### BR-AUTH-06 — Senha nunca exposta
**AC-BR-AUTH-06-01** — Resposta de usuário só expõe campos permitidos
```gherkin
When o cadastro, o login ou GET /auth/me retornam o usuário
Then o objeto user contém exatamente id, name, email, role, createdAt
And não contém password nem hash de senha
```

### BR-AUTH-07 — Cadastro devolve sessão
**AC-BR-AUTH-07-01** — Token utilizável imediatamente
```gherkin
When o cadastro é concluído com sucesso
Then a resposta contém token e user
And GET /auth/me com esse token responde 200 com o mesmo usuário
```

### BR-AUTH-08 — Login válido
**AC-BR-AUTH-08-01** — Login com credenciais corretas
```gherkin
Given o usuário seed "cliente@loja.com" / "Cliente@123"
When faz POST /auth/login com essas credenciais
Then a resposta é 200
And contém token, expiresIn igual a 86400, expiresAt e user
```
**AC-BR-AUTH-08-02** — E-mail case-insensitive no login
```gherkin
When faz login com email "CLIENTE@LOJA.COM" e senha "Cliente@123"
Then a resposta é 200
```

### BR-AUTH-09 — Mesma resposta para e-mail inexistente e senha errada
**AC-BR-AUTH-09-01** — Senha incorreta
```gherkin
When faz login com "cliente@loja.com" e senha "Errada@123"
Then a resposta é 401 com code "INVALID_CREDENTIALS"
```
**AC-BR-AUTH-09-02** — E-mail inexistente
```gherkin
When faz login com "naoexiste@loja.com" e senha "Qualquer@123"
Then a resposta é 401 com code "INVALID_CREDENTIALS"
And status, code e estrutura são idênticos ao AC-BR-AUTH-09-01
```

### BR-AUTH-10 — Validação de entrada no login
**AC-BR-AUTH-10-01** — Senha fora de 8–72 → 400
```gherkin
When faz login com email válido e password "" (vazia)
Then a resposta é 400 com code "VALIDATION_ERROR" em "password" (e não 401)
When faz login com password de 7 caracteres
Then a resposta é 400 com code "VALIDATION_ERROR"
When faz login com password de 73 caracteres
Then a resposta é 400 com code "VALIDATION_ERROR"
```
**AC-BR-AUTH-10-02** — E-mail inválido → 400 por campo
```gherkin
When faz login com email "invalido" e password válida
Then a resposta é 400 com code "VALIDATION_ERROR"
And details contém field "email"
```
**AC-BR-AUTH-10-03** — Limites 8 e 72 passam pela validação
```gherkin
When faz login com password de 8 caracteres (credencial incorreta)
Then a resposta é 401 "INVALID_CREDENTIALS" (e não 400)
When faz login com password de 72 caracteres (credencial incorreta)
Then a resposta é 401 "INVALID_CREDENTIALS"
```

### BR-AUTH-11 — Token: expirado, inválido, ausente
**AC-BR-AUTH-11-01** — Token expirado
```gherkin
Given um token emitido há mais de 24 horas
When acessa GET /auth/me com esse token
Then a resposta é 401 com code "TOKEN_EXPIRED"
```
**AC-BR-AUTH-11-02** — Token adulterado ou malformado
```gherkin
When acessa GET /auth/me com token adulterado ou "abc.def.ghi"
Then a resposta é 401 com code "INVALID_TOKEN"
```
**AC-BR-AUTH-11-03** — Token assinado com outro segredo
```gherkin
When acessa GET /auth/me com token assinado com segredo diferente
Then a resposta é 401 com code "INVALID_TOKEN"
```
**AC-BR-AUTH-11-04** — Token de usuário inexistente
```gherkin
Given um token válido de um usuário que não existe mais
When acessa GET /auth/me
Then a resposta é 401 com code "INVALID_TOKEN"
```
**AC-BR-AUTH-11-05** — Sem cabeçalho Authorization
```gherkin
When acessa GET /auth/me sem o cabeçalho Authorization
Then a resposta é 401 com code "UNAUTHORIZED"
```
**AC-BR-AUTH-11-06** — Esquema diferente de Bearer
```gherkin
When acessa GET /auth/me com "Authorization: Basic xyz"
Then a resposta é 401 com code "UNAUTHORIZED"
```

### BR-AUTH-12 — GET /auth/me
**AC-BR-AUTH-12-01** — Retorna o usuário do token
```gherkin
Given logado como "cliente@loja.com"
When acessa GET /auth/me
Then a resposta é 200 com user.email "cliente@loja.com" e role "CUSTOMER"
```

### BR-AUTH-13 — Logout stateless
**AC-BR-AUTH-13-01** — Logout com token válido
```gherkin
Given um token válido
When faz POST /auth/logout
Then a resposta é 204 sem corpo
```
**AC-BR-AUTH-13-02** — Logout sem token
```gherkin
When faz POST /auth/logout sem token
Then a resposta é 401 com code "UNAUTHORIZED"
```
**AC-BR-AUTH-13-03** — Token não é invalidado no servidor
```gherkin
Given o usuário fez POST /auth/logout com o token T
When usa o mesmo token T em GET /auth/me
Then a resposta é 200
```

### BR-AUTH-14 — [UI] Sessão expirada
**AC-BR-AUTH-14-01** — [UI] Token expirado encerra sessão
```gherkin
Given um cliente logado cuja sessão expirou (resposta 401 TOKEN_EXPIRED)
When a interface recebe a resposta
Then a sessão local é removida
And o usuário é enviado à tela de login com mensagem de sessão expirada
```
**AC-BR-AUTH-14-02** — [UI] Token inválido encerra sessão
```gherkin
Given um cliente logado cujo token passou a ser inválido (401 INVALID_TOKEN)
When a interface recebe a resposta
Then a sessão local é removida
And o usuário é enviado ao login com mensagem de sessão expirada
```

### BR-AUTH-15 — [UI] Rota protegida
**AC-BR-AUTH-15-01** — [UI] Visitante em rota protegida
```gherkin
Given um visitante sem login
When acessa "/cart"
Then é redirecionado ao login
And após logar como CUSTOMER retorna a "/cart" (origem guardada)
```
**AC-BR-AUTH-15-02** — [UI] Papel errado vê "Acesso negado"
```gherkin
Given logado como CUSTOMER
When acessa "/admin"
Then a tela exibe "Acesso negado"
And a URL não é redirecionada
```
**AC-BR-AUTH-15-03** — [UI] ADMIN em rota de cliente
```gherkin
Given logado como ADMIN
When acessa "/cart"
Then a tela exibe "Acesso negado"
And a URL não é redirecionada
```

---

## Vitrine (SHOP)

### BR-SHOP-01 — Somente produtos ativos
**AC-BR-SHOP-01-01** — Listagem pública omite inativos
```gherkin
Given o produto 29 (CAS-008) está inativo
When um visitante faz GET /products
Then a resposta é 200 sem autenticação
And nenhum item da lista (em nenhuma página) tem id 29
```

### BR-SHOP-02 — Detalhe de inativo/inexistente
**AC-BR-SHOP-02-01** — Produto inativo
```gherkin
When faz GET /products/29
Then a resposta é 404 com code "PRODUCT_NOT_FOUND"
```
**AC-BR-SHOP-02-02** — Produto inexistente
```gherkin
When faz GET /products/999999
Then a resposta é 404 com code "PRODUCT_NOT_FOUND"
```
**AC-BR-SHOP-02-03** — Produto ativo
```gherkin
When faz GET /products/4
Then a resposta é 200 com sku "ELE-004" e price 79.90
```

### BR-SHOP-03 — Busca por nome (contém)
**AC-BR-SHOP-03-01** — Termo contido no nome
```gherkin
When faz GET /products?search=Mouse
Then todos os itens retornados têm "Mouse" contido no nome (ver PA-05 sobre caixa/acentos)
And o produto 4 está entre eles
```
**AC-BR-SHOP-03-02** — Termo vazio não filtra
```gherkin
When faz GET /products?search=
Then o resultado (total) é igual ao de GET /products sem search
```
**AC-BR-SHOP-03-03** — Termo sem correspondência
```gherkin
When faz GET /products?search=zzzzinexistente
Then data é [] e pagination.total é 0
```

### BR-SHOP-04 — Filtro por categoria (AND com busca)
**AC-BR-SHOP-04-01** — Filtro por categoria
```gherkin
Given uma categoria C existente na vitrine
When faz GET /products?category=C
Then todos os itens retornados pertencem à categoria C
```
**AC-BR-SHOP-04-02** — Busca + categoria combinadas
```gherkin
When faz GET /products?category=C&search=T
Then cada item pertence à categoria C e contém T no nome
```

### BR-SHOP-05 — Ordenações
**AC-BR-SHOP-05-01** — Ordenação padrão
```gherkin
When faz GET /products sem sort
Then os itens vêm em ordem crescente de id
```
**AC-BR-SHOP-05-02** — price_asc
```gherkin
When faz GET /products?sort=price_asc
Then os preços estão em ordem não decrescente
```
**AC-BR-SHOP-05-03** — price_desc
```gherkin
When faz GET /products?sort=price_desc
Then os preços estão em ordem não crescente
```
**AC-BR-SHOP-05-04** — name_asc
```gherkin
When faz GET /products?sort=name_asc
Then os nomes estão em ordem alfabética crescente
```
**AC-BR-SHOP-05-05** — Valor inválido
```gherkin
When faz GET /products?sort=random
Then a resposta é 400 com code "VALIDATION_ERROR" em field "sort"
```
**AC-BR-SHOP-05-06** — Desempate por id crescente
```gherkin
Given dois produtos com o mesmo preço
When faz GET /products?sort=price_asc
Then o de menor id aparece primeiro
```

### BR-SHOP-06 — Lista de categorias
**AC-BR-SHOP-06-01** — Categorias com ao menos um produto ativo
```gherkin
Given uma categoria cujos produtos são todos inativos
When faz GET /categories
Then essa categoria não aparece na lista
```
**AC-BR-SHOP-06-02** — Sem repetição e ordem alfabética
```gherkin
When faz GET /categories
Then não há valores repetidos
And a lista está em ordem alfabética
```

### BR-SHOP-07 — inStock e lowStock
**AC-BR-SHOP-07-01** — Estoque 0
```gherkin
When consulta o produto 7 (estoque 0)
Then inStock é false e lowStock é true
```
**AC-BR-SHOP-07-02** — Estoque 3 (baixo)
```gherkin
When consulta o produto 17 (estoque 3)
Then inStock é true e lowStock é true
```
**AC-BR-SHOP-07-03** — Estoque 120 (normal)
```gherkin
When consulta o produto 4 (estoque 120)
Then inStock é true e lowStock é false
```
**AC-BR-SHOP-07-04** — Fronteira 4 e 5
```gherkin
Given um produto com estoque 4 e outro com estoque 5
When ambos são consultados
Then o de estoque 4 tem lowStock true
And o de estoque 5 tem lowStock false
```

### BR-SHOP-08 — Indisponível
**AC-BR-SHOP-08-01** — [UI] Exibe "Indisponível" e bloqueia adição
```gherkin
Given o produto 7 (estoque 0)
When o cliente abre a vitrine/detalhe do produto 7
Then o produto é exibido como "Indisponível"
And a ação de adicionar ao carrinho não está disponível
```
**AC-BR-SHOP-08-02** — [API] Adição de estoque 0 rejeitada
```gherkin
Given um CUSTOMER logado
When faz POST /cart/items com productId 7 e quantity 1
Then a resposta é 409 com code "OUT_OF_STOCK"
```

### BR-SHOP-09 — Paginação
**AC-BR-SHOP-09-01** — Padrão pageSize 10
```gherkin
When faz GET /products sem parâmetros
Then pagination.page é 1 e pagination.pageSize é 10
And data tem no máximo 10 itens
```
**AC-BR-SHOP-09-02** — totalPages = ceil(total/pageSize)
```gherkin
When faz GET /products?pageSize=7
Then pagination.totalPages é igual a ceil(pagination.total / 7)
```
**AC-BR-SHOP-09-03** — Página fora da faixa
```gherkin
When faz GET /products?page=9999
Then a resposta é 200 com data []
```
**AC-BR-SHOP-09-04** — page inválida
```gherkin
When faz GET /products?page=0
Then a resposta é 400 com code "VALIDATION_ERROR" em field "page"
```
**AC-BR-SHOP-09-05** — pageSize fora de 1–100
```gherkin
When faz GET /products?pageSize=0
Then a resposta é 400 com code "VALIDATION_ERROR"
When faz GET /products?pageSize=101
Then a resposta é 400 com code "VALIDATION_ERROR"
```
**AC-BR-SHOP-09-06** — pageSize nos limites
```gherkin
When faz GET /products?pageSize=1
Then a resposta é 200 com 1 item
When faz GET /products?pageSize=100
Then a resposta é 200 com pagination.pageSize 100
```

---

## Carrinho (CART)

### BR-CART-01 — Carrinho único, criado sob demanda
**AC-BR-CART-01-01** — Carrinho novo vazio
```gherkin
Given um CUSTOMER que nunca usou o carrinho
When faz GET /cart
Then a resposta é 200 com items [], total 0 e totalItems 0
```
**AC-BR-CART-01-02** — Carrinho único por cliente
```gherkin
Given um CUSTOMER que já adicionou itens
When faz GET /cart novamente
Then os mesmos itens são retornados (não é criado um segundo carrinho)
```

### BR-CART-02 — Adicionar produto novo
**AC-BR-CART-02-01** — Quantidade informada
```gherkin
Given um carrinho vazio e o produto 4 (estoque 120)
When faz POST /cart/items com productId 4 e quantity 3
Then o carrinho tem 1 linha do produto 4 com quantity 3
```
**AC-BR-CART-02-02** — Quantidade padrão 1
```gherkin
When faz POST /cart/items com productId 4 sem quantity
Then a linha do produto 4 tem quantity 1
```

### BR-CART-03 — Adicionar produto existente soma
**AC-BR-CART-03-01** — Soma sem duplicar linha
```gherkin
Given o carrinho tem o produto 4 com quantity 2
When faz POST /cart/items com productId 4 e quantity 3
Then o carrinho tem 1 única linha do produto 4 com quantity 5
```

### BR-CART-04 — Quantidade 1 a 999
**AC-BR-CART-04-01** — Limites aceitos
```gherkin
Given o produto 4 com estoque suficiente (estoque 120 permite 1)
When adiciona quantity 1
Then a resposta é sucesso
```
**AC-BR-CART-04-02** — 999 é válido na validação
```gherkin
Given um produto com estoque >= 999 (a definir: seed não tem; ver Q-01)
When adiciona quantity 999
Then a validação de entrada passa
```
**AC-BR-CART-04-03** — 0 rejeitado
```gherkin
When faz POST /cart/items com quantity 0
Then 400 "VALIDATION_ERROR" em field "quantity"
```
**AC-BR-CART-04-04** — Negativo rejeitado
```gherkin
When faz POST /cart/items com quantity -1
Then 400 "VALIDATION_ERROR" em field "quantity"
```
**AC-BR-CART-04-05** — Decimal rejeitado
```gherkin
When faz POST /cart/items com quantity 1.5
Then 400 "VALIDATION_ERROR" em field "quantity"
```
**AC-BR-CART-04-06** — 1000 rejeitado
```gherkin
When faz POST /cart/items com quantity 1000
Then 400 "VALIDATION_ERROR" em field "quantity" (e não 409)
```

### BR-CART-05 — Limite de estoque (total no carrinho)
**AC-BR-CART-05-01** — Estoque 0
```gherkin
When adiciona o produto 7 (estoque 0) com quantity 1
Then 409 "OUT_OF_STOCK"
And o carrinho permanece inalterado
```
**AC-BR-CART-05-02** — Excede estoque
```gherkin
Given o produto 10 (estoque 1) e carrinho vazio
When adiciona quantity 2
Then 409 "INSUFFICIENT_STOCK"
And details contém available 1, requested 2, inCart 0
And o carrinho permanece vazio
```
**AC-BR-CART-05-03** — Igual ao estoque é permitido
```gherkin
Given o produto 10 (estoque 1) e carrinho vazio
When adiciona quantity 1
Then a resposta é sucesso com quantity 1
```
**AC-BR-CART-05-04** — Soma com o já existente excede
```gherkin
Given o carrinho tem o produto 10 com quantity 1 (estoque 1)
When adiciona quantity 1
Then 409 "INSUFFICIENT_STOCK"
And details contém available 1, requested 1, inCart 1
And a quantity no carrinho continua 1
```
**AC-BR-CART-05-05** — Estoque 3, fronteira +1
```gherkin
Given o produto 17 (estoque 3) e carrinho vazio
When adiciona quantity 3
Then sucesso
When adiciona mais quantity 1
Then 409 "INSUFFICIENT_STOCK"
```

### BR-CART-06 — Produto inexistente/inativo
**AC-BR-CART-06-01** — Inexistente
```gherkin
When faz POST /cart/items com productId 999999
Then 404 "PRODUCT_NOT_FOUND"
```
**AC-BR-CART-06-02** — Inativo
```gherkin
When faz POST /cart/items com productId 29 (inativo)
Then 404 "PRODUCT_NOT_FOUND"
```

### BR-CART-07 — Atualizar quantidade (valor absoluto)
**AC-BR-CART-07-01** — Define valor absoluto
```gherkin
Given o carrinho tem o produto 4 com quantity 2
When faz PATCH /cart/items/4 com quantity 5
Then a linha do produto 4 tem quantity 5 (e não 7)
```
**AC-BR-CART-07-02** — Item fora do carrinho
```gherkin
Given o produto 4 não está no carrinho
When faz PATCH /cart/items/4 com quantity 1
Then 404 "CART_ITEM_NOT_FOUND"
```
**AC-BR-CART-07-03** — Produto desativado após adicionar
```gherkin
Given o produto X está no carrinho e depois foi desativado pelo ADMIN
When o cliente faz PATCH /cart/items/X com quantity 1
Then 404 "PRODUCT_NOT_FOUND"
```
**AC-BR-CART-07-04** — Valida BR-CART-04
```gherkin
Given o produto 4 no carrinho
When faz PATCH /cart/items/4 com quantity 0
Then 400 "VALIDATION_ERROR"
```
**AC-BR-CART-07-05** — Valida BR-CART-05
```gherkin
Given o produto 10 (estoque 1) no carrinho
When faz PATCH /cart/items/10 com quantity 2
Then 409 "INSUFFICIENT_STOCK"
And a quantity permanece 1
```

### BR-CART-08 — Remover item
**AC-BR-CART-08-01** — Remove e devolve carrinho atualizado
```gherkin
Given o carrinho tem os produtos 4 e 10
When faz DELETE /cart/items/4
Then a resposta contém o carrinho apenas com o produto 10
```
**AC-BR-CART-08-02** — Item ausente
```gherkin
When faz DELETE /cart/items/4 sem o item no carrinho
Then 404 "CART_ITEM_NOT_FOUND"
```

### BR-CART-09 — Limpar carrinho
**AC-BR-CART-09-01** — Limpa itens
```gherkin
Given o carrinho tem itens
When faz DELETE /cart
Then 204
And GET /cart retorna items []
```
**AC-BR-CART-09-02** — Idempotente com carrinho vazio
```gherkin
Given o carrinho está vazio
When faz DELETE /cart
Then 204
```

### BR-CART-10 — Cálculos do carrinho
**AC-BR-CART-10-01** — Subtotal da linha
```gherkin
Given o produto 4 (R$ 79,90) com quantity 3
When faz GET /cart
Then o subtotal da linha é 239.70
```
**AC-BR-CART-10-02** — Total = soma dos subtotais
```gherkin
Given o produto 4 (79,90) x 2 e o produto 17 x 1 (preço do produto 17 conforme catálogo)
When faz GET /cart
Then total é igual à soma dos subtotais das linhas (2 casas)
```
**AC-BR-CART-10-03** — totalItems é soma de quantidades
```gherkin
Given 2 linhas com quantity 2 e quantity 3
When faz GET /cart
Then totalItems é 5 (e não 2)
```
**AC-BR-CART-10-04** — Usa preço atual
```gherkin
Given o produto 4 está no carrinho e o ADMIN altera seu preço para 90.00
When faz GET /cart
Then o preço unitário e subtotal usam 90.00
```

### BR-CART-11 — Campo available
**AC-BR-CART-11-01** — Disponível
```gherkin
Given o produto 4 (estoque 120) no carrinho com quantity 2
When faz GET /cart
Then available da linha é true
```
**AC-BR-CART-11-02** — Produto desativado
```gherkin
Given o produto no carrinho foi desativado
When faz GET /cart
Then available da linha é false
```
**AC-BR-CART-11-03** — Estoque menor que a quantidade
```gherkin
Given o carrinho tem quantity 3 de um produto e o ADMIN faz ajuste de estoque para 2
When faz GET /cart
Then available da linha é false
```
**AC-BR-CART-11-04** — Fronteira estoque = quantidade
```gherkin
Given o carrinho tem quantity 3 e o estoque é ajustado para 3
When faz GET /cart
Then available da linha é true
```

### BR-CART-12 — [UI] Bloqueio do checkout
**AC-BR-CART-12-01** — [UI] Item indisponível bloqueia avanço
```gherkin
Given o carrinho tem ao menos um item com available false
When o cliente está em "/cart"
Then o avanço para o checkout está bloqueado
```
**AC-BR-CART-12-02** — [UI] Todos disponíveis permite avanço
```gherkin
Given todos os itens do carrinho têm available true
When o cliente está em "/cart"
Then o avanço para o checkout está habilitado
```

### BR-CART-13 — Acesso ao carrinho
**AC-BR-CART-13-01** — Sem token
```gherkin
When faz GET /cart sem token
Then 401
```
**AC-BR-CART-13-02** — ADMIN
```gherkin
Given logado como ADMIN
When faz GET /cart
Then 403 "FORBIDDEN"
```
**AC-BR-CART-13-03** — Todas as operações bloqueadas para ADMIN
```gherkin
Given logado como ADMIN
When tenta POST /cart/items, PATCH /cart/items/4, DELETE /cart/items/4 e DELETE /cart
Then todas respondem 403 "FORBIDDEN"
```

### BR-CART-14 — priceWhenAdded / priceChanged
**AC-BR-CART-14-01** — Registro do preço ao adicionar
```gherkin
When o cliente adiciona o produto 4 (R$ 79,90)
Then a linha tem priceWhenAdded 79.90 e priceChanged false
```
**AC-BR-CART-14-02** — Preço mudou
```gherkin
Given o produto 4 está no carrinho com priceWhenAdded 79.90
When o ADMIN altera o preço para 89.90
And o cliente faz GET /cart
Then a linha tem priceChanged true
And o carrinho tem hasPriceChanges true
```
**AC-BR-CART-14-03** — Adicionar mais unidades renova o preço
```gherkin
Given priceChanged true no produto 4
When o cliente adiciona mais 1 unidade do produto 4
Then priceWhenAdded passa a 89.90 e priceChanged é false
```
**AC-BR-CART-14-04** — Atualizar quantidade renova o preço
```gherkin
Given priceChanged true no produto 4
When o cliente faz PATCH /cart/items/4 com quantity 2
Then priceWhenAdded passa a 89.90 e priceChanged é false
```
**AC-BR-CART-14-05** — Sem alteração
```gherkin
Given nenhum item teve preço alterado
When faz GET /cart
Then hasPriceChanges é false
```
**AC-BR-CART-14-06** — Item legado sem registro de preço
```gherkin
Given um item sem priceWhenAdded (anterior à regra)
When o preço atual do produto difere de qualquer valor
Then priceChanged é false para essa linha
```

### BR-CART-15 — [UI] Aviso de preço alterado
**AC-BR-CART-15-01** — [UI] Aviso no carrinho
```gherkin
Given um item com priceChanged true (priceWhenAdded 79,90)
When o cliente abre "/cart"
Then o item exibe "Preço alterado (era R$ 79,90)"
```
**AC-BR-CART-15-02** — [UI] Aviso na revisão do checkout
```gherkin
Given um item com priceChanged true
When o cliente está na etapa Revisão do checkout
Then é exibido aviso com o preço anterior e o preço atual
```
**AC-BR-CART-15-03** — [UI] Valor cobrado é o atual
```gherkin
Given um item com priceChanged true
When o pedido é confirmado
Then o item do pedido e o total usam o preço atual
```
**AC-BR-CART-15-04** — [UI] Sem aviso quando não mudou
```gherkin
Given nenhum item com priceChanged
When o cliente abre "/cart"
Then nenhum aviso "Preço alterado" é exibido
```

---

## Checkout — cotação, preço e frete (PRICE)

### BR-PRICE-01 — Cotação sem efeitos colaterais
**AC-BR-PRICE-01-01** — Não cria pedido
```gherkin
Given o carrinho tem o produto 4 x 1
When faz POST /checkout/quote
Then 200 com subtotal, discount, shipping e total
And a lista de pedidos do cliente permanece com a mesma quantidade
```
**AC-BR-PRICE-01-02** — Não altera estoque nem carrinho
```gherkin
Given o estoque do produto 4 é E e o carrinho tem quantity 1
When faz POST /checkout/quote
Then o estoque do produto 4 continua E
And o carrinho continua com os mesmos itens
```

### BR-PRICE-02 — Fórmula do total
**AC-BR-PRICE-02-01** — Total = subtotal − desconto + frete
```gherkin
Given subtotal 79,90 e cupom "PROMO10"
When cota
Then discount 7.99, shipping 15.00 e total 86.91
```

### BR-PRICE-03 — Frete padrão
**AC-BR-PRICE-03-01** — R$ 15,00
```gherkin
Given subtotal 79,90 sem cupom
When cota
Then shipping 15.00 e total 94.90
```

### BR-PRICE-04 — Frete grátis > 200,00
**AC-BR-PRICE-04-01** — Subtotal = 200,00 paga frete
```gherkin
Given subtotal exatamente 200,00 sem cupom
When cota
Then shipping 15.00 e total 215.00
```
**AC-BR-PRICE-04-02** — Subtotal 200,01 frete grátis
```gherkin
Given subtotal 200,01 sem cupom
When cota
Then shipping 0.00 e total 200.01
```
**AC-BR-PRICE-04-03** — Subtotal 199,99 paga frete
```gherkin
Given subtotal 199,99 sem cupom
When cota
Then shipping 15.00
```
(Composição de carrinho para atingir 200,00/200,01/199,99: dado a definir; ver Q-02.)

### BR-PRICE-05 — Limite avaliado antes do desconto
**AC-BR-PRICE-05-01** — PROMO10 com subtotal 210,00
```gherkin
Given subtotal 210,00 e cupom "PROMO10"
When cota
Then discount 21.00, shipping 0.00 e total 189.00
```
**AC-BR-PRICE-05-02** — Desconto não faz perder frete grátis
```gherkin
Given subtotal 210,00 (subtotal após desconto 189,00 < 200,00) e cupom "PROMO10"
When cota
Then shipping continua 0.00
```

### BR-PRICE-06 — Cupom PROMO10
**AC-BR-PRICE-06-01** — 10% do subtotal
```gherkin
Given subtotal 100,00 e cupom "PROMO10"
When cota
Then discount 10.00, shipping 15.00 e total 105.00
```
**AC-BR-PRICE-06-02** — Arredondamento a 2 casas
```gherkin
Given subtotal 79,90 e cupom "PROMO10"
When cota
Then discount 7.99
```

### BR-PRICE-07 — Cupom FRETEGRATIS
**AC-BR-PRICE-07-01** — Frete zero em subtotal baixo
```gherkin
Given subtotal 79,90 e cupom "FRETEGRATIS"
When cota
Then discount 0.00, shipping 0.00 e total 79.90
```
**AC-BR-PRICE-07-02** — Sem desconto em subtotal alto
```gherkin
Given subtotal 210,00 e cupom "FRETEGRATIS"
When cota
Then discount 0.00, shipping 0.00 e total 210.00
```

### BR-PRICE-08 — Um cupom por compra
**AC-BR-PRICE-08-01** — Cupons não se acumulam
```gherkin
Given subtotal 79,90
When cota com coupon "PROMO10" e depois com coupon "FRETEGRATIS"
Then cada cotação aplica somente o efeito do cupom informado naquela requisição
And nenhuma cotação combina desconto de PROMO10 com frete zero de FRETEGRATIS
```
(Ver Q-03 sobre como enviar dois cupons.)

### BR-PRICE-09 — Normalização do cupom
**AC-BR-PRICE-09-01** — Minúsculas
```gherkin
When cota com coupon "promo10" e subtotal 100,00
Then discount 10.00
```
**AC-BR-PRICE-09-02** — Espaços nas pontas
```gherkin
When cota com coupon " PROMO10 " e subtotal 100,00
Then discount 10.00
```
**AC-BR-PRICE-09-03** — Vazio ignorado
```gherkin
When cota com coupon ""
Then 200 com discount 0.00 e sem erro
```
**AC-BR-PRICE-09-04** — Somente espaços ignorado
```gherkin
When cota com coupon "   "
Then 200 com discount 0.00 e sem erro
```

### BR-PRICE-10 — Cupom desconhecido
**AC-BR-PRICE-10-01** — Cotação com cupom desconhecido
```gherkin
When cota com coupon "INEXISTENTE"
Then 422 "INVALID_COUPON"
```
**AC-BR-PRICE-10-02** — Pedido não criado
```gherkin
Given um carrinho válido
When confirma o pedido (POST /orders) com coupon "INEXISTENTE"
Then 422 "INVALID_COUPON"
And nenhum pedido (nem PAYMENT_FAILED) é criado
And estoque e carrinho permanecem
```
**AC-BR-PRICE-10-03** — Cupom com 30 caracteres
```gherkin
When cota com coupon de 30 caracteres (desconhecido)
Then 422 "INVALID_COUPON" (passa a validação de tamanho)
```
**AC-BR-PRICE-10-04** — Cupom com 31 caracteres
```gherkin
When cota com coupon de 31 caracteres
Then 400 "VALIDATION_ERROR" em field "coupon"
```

### BR-PRICE-11 — Carrinho vazio
**AC-BR-PRICE-11-01** — Cotação
```gherkin
Given carrinho vazio
When faz POST /checkout/quote
Then 422 "CART_EMPTY"
```
**AC-BR-PRICE-11-02** — Pedido
```gherkin
Given carrinho vazio
When faz POST /orders com endereço e pagamento válidos
Then 422 "CART_EMPTY"
And nenhum pedido é criado
```

### BR-PRICE-12 — Casas decimais
**AC-BR-PRICE-12-01** — [API] 2 casas
```gherkin
When cota qualquer carrinho
Then subtotal, discount, shipping e total têm no máximo 2 casas decimais
```
**AC-BR-PRICE-12-02** — [UI] Formato pt-BR
```gherkin
Given um total de 1234,56
When exibido na interface
Then aparece como "R$ 1.234,56"
```

### BR-PRICE-13 — Cotação valida estoque
**AC-BR-PRICE-13-01** — Item sem estoque suficiente
```gherkin
Given o carrinho tem o produto 17 x 3 e o estoque é ajustado para 2
When faz POST /checkout/quote
Then 409 "OUT_OF_STOCK"
And details contém productId, name, available 2, requested 3
And nenhum valor (subtotal/total) é retornado
```
**AC-BR-PRICE-13-02** — Item inativo
```gherkin
Given um item do carrinho foi desativado
When faz POST /checkout/quote
Then 409 "OUT_OF_STOCK" com o item em details
```
**AC-BR-PRICE-13-03** — Estoque antes do cupom
```gherkin
Given um item indisponível no carrinho
When cota com coupon "INEXISTENTE"
Then 409 "OUT_OF_STOCK" (e não 422)
```
**AC-BR-PRICE-13-04** — Estoque = quantidade é válido
```gherkin
Given o carrinho tem o produto 17 x 3 (estoque 3)
When cota
Then 200
```
**AC-BR-PRICE-13-05** — Todos os itens problemáticos listados
```gherkin
Given dois itens indisponíveis
When cota
Then details lista os dois itens
```

### BR-PRICE-14 — hasPriceChanges na cotação
**AC-BR-PRICE-14-01** — Sinaliza alteração
```gherkin
Given um item com priceChanged true
When cota
Then hasPriceChanges é true
```
**AC-BR-PRICE-14-02** — Sem alteração
```gherkin
Given nenhum item com priceChanged
When cota
Then hasPriceChanges é false
```

---

## Checkout — endereço e pagamento (PAY)

### BR-PAY-01 — [UI] Etapas do checkout
**AC-BR-PAY-01-01** — [UI] Ordem das etapas
```gherkin
Given um carrinho válido em "/checkout"
When o cliente avança passo a passo
Then as etapas ocorrem na ordem Revisão, Endereço, Pagamento, Confirmação
```
**AC-BR-PAY-01-02** — [UI] Não é possível pular etapas
```gherkin
Given o cliente está na etapa Revisão
When tenta acessar diretamente Pagamento ou Confirmação sem concluir a etapa anterior
Then permanece na etapa Revisão
```
**AC-BR-PAY-01-03** — [UI] É possível voltar
```gherkin
Given o cliente está na etapa Pagamento
When aciona "voltar"
Then é levado à etapa Endereço com os dados preservados (ver Q-04)
```

### BR-PAY-02 — Endereço
**AC-BR-PAY-02-01** — Endereço válido mínimo
```gherkin
When confirma pedido com street "Ru" (2), number "1" (1), district "Ab" (2), city "Ab" (2), state "sp", zip "01234-567" e sem complemento
Then os campos são aceitos
And state é normalizado para "SP"
```
**AC-BR-PAY-02-02** — Limites máximos
```gherkin
When envia street 150, number 10, district 100, city 100 e complement 100 caracteres
Then os campos são aceitos
```
**AC-BR-PAY-02-03** — Acima do máximo
```gherkin
When envia street de 151 caracteres
Then 400 "VALIDATION_ERROR" em field "street"
When envia number de 11 caracteres
Then 400 "VALIDATION_ERROR" em field "number"
When envia district ou city de 101 caracteres
Then 400 "VALIDATION_ERROR" no campo correspondente
When envia complement de 101 caracteres
Then 400 "VALIDATION_ERROR" em field do complemento
```
**AC-BR-PAY-02-04** — Abaixo do mínimo
```gherkin
When envia street de 1 caractere
Then 400 "VALIDATION_ERROR"
When envia number vazio
Then 400 "VALIDATION_ERROR"
When envia district ou city de 1 caractere
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PAY-02-05** — Obrigatórios ausentes
```gherkin
When omite qualquer um de street, number, district, city, state ou zip
Then 400 "VALIDATION_ERROR" com details apontando o campo omitido
```
**AC-BR-PAY-02-06** — UF exatamente 2 letras
```gherkin
When envia state "S" ou "SPP" ou "S1"
Then 400 "VALIDATION_ERROR" em field "state"
```
**AC-BR-PAY-02-07** — CEP em dois formatos válidos
```gherkin
When envia zip "01234-567"
Then aceito
When envia zip "01234567"
Then aceito
```
(Campos da API: `address.street`, `number`, `complement`, `district`, `city`, `state`, `zip` — conferidos em `orders.schema.ts`.)

### BR-PAY-03 — CEP inválido
**AC-BR-PAY-03-01** — Formatos inválidos
```gherkin
When envia zip "1234-567"
Then 400 "VALIDATION_ERROR" em field "zip"
When envia zip "abcde-fgh"
Then 400 "VALIDATION_ERROR" em field "zip"
```

### BR-PAY-04 — Métodos aceitos
**AC-BR-PAY-04-01** — Métodos válidos
```gherkin
When confirma pedido com paymentMethod "CREDIT_CARD" (cartão válido), "PIX" ou "BOLETO"
Then o método é aceito
```
**AC-BR-PAY-04-02** — Método inválido
```gherkin
When envia paymentMethod "DEBIT_CARD"
Then 400 "VALIDATION_ERROR" em field "paymentMethod"
```
**AC-BR-PAY-04-03** — Método ausente
```gherkin
When omite paymentMethod
Then 400 "VALIDATION_ERROR"
```

### BR-PAY-05 — Dados do cartão
**AC-BR-PAY-05-01** — 13 e 19 dígitos aceitos
```gherkin
When paga com CREDIT_CARD e número de 13 dígitos
Then os dados do cartão são aceitos
When paga com número de 19 dígitos
Then aceitos
```
**AC-BR-PAY-05-02** — 12 e 20 dígitos rejeitados
```gherkin
When paga com número de 12 dígitos
Then 400 "VALIDATION_ERROR" no campo `payment.cardNumber`
When paga com número de 20 dígitos
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PAY-05-03** — Espaços e hífens ignorados
```gherkin
When paga com número "4111 1111 1111 1234" (16 dígitos)
Then aceito
When paga com número "4111-1111-1111-1234"
Then aceito
```
**AC-BR-PAY-05-04** — Número ausente para cartão
```gherkin
When paga com CREDIT_CARD sem número
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PAY-05-05** — Nome no cartão opcional, 2–100
```gherkin
When informa nome no cartão com 2 e com 100 caracteres
Then aceito
When informa nome com 1 caractere ou 101 caracteres
Then 400 "VALIDATION_ERROR"
When omite o nome
Then aceito
```
**AC-BR-PAY-05-06** — PIX/boleto sem dados adicionais
```gherkin
When paga com PIX sem número de cartão
Then aceito
When paga com BOLETO sem número de cartão
Then aceito
```

### BR-PAY-06 — Resultado determinístico por final do cartão
**AC-BR-PAY-06-01** — Final 0000 aprovado
```gherkin
Given estoque suficiente
When paga com cartão terminado em 0000
Then 201 com pedido PAID
```
**AC-BR-PAY-06-02** — Final 1111 recusado
```gherkin
Given estoque suficiente
When paga com cartão terminado em 1111
Then 422 "PAYMENT_DECLINED"
```
**AC-BR-PAY-06-03** — Final 2222 indisponível
```gherkin
Given estoque suficiente
When paga com cartão terminado em 2222
Then 503 "PAYMENT_UNAVAILABLE"
```
**AC-BR-PAY-06-04** — Outro final aprovado
```gherkin
Given estoque suficiente
When paga com cartão terminado em 1234
Then 201 com pedido PAID
```
**AC-BR-PAY-06-05** — Final decidido após remover separadores
```gherkin
When paga com número "4111 1111 1111 1111" (final 1111 com espaços)
Then 422 "PAYMENT_DECLINED"
```
(Ver Q-06 sobre final 1111 em número com outros dígitos iguais.)

### BR-PAY-07 — PIX e boleto sempre aprovados
**AC-BR-PAY-07-01** — PIX aprovado
```gherkin
Given estoque suficiente
When paga com PIX
Then 201 com pedido PAID
```
**AC-BR-PAY-07-02** — Boleto aprovado
```gherkin
Given estoque suficiente
When paga com BOLETO
Then 201 com pedido PAID
```

### BR-PAY-08 — Persistência de cardLast4
**AC-BR-PAY-08-01** — Cartão guarda 4 últimos dígitos
```gherkin
When paga com cartão "4111111111110000"
Then o pedido tem cardLast4 "0000"
And a resposta e o histórico não contêm o número completo
```
**AC-BR-PAY-08-02** — PIX/boleto → null
```gherkin
When paga com PIX
Then o pedido tem cardLast4 null
When paga com BOLETO
Then o pedido tem cardLast4 null
```

---

## Pedidos (ORD)

### BR-ORD-01 — Requisitos para confirmar
**AC-BR-ORD-01-01** — Entrada inválida falha antes de qualquer efeito
```gherkin
Given um carrinho válido
When faz POST /orders com endereço inválido
Then 400 "VALIDATION_ERROR"
And estoque, carrinho e lista de pedidos permanecem inalterados
```
**AC-BR-ORD-01-02** — Pagamento ausente
```gherkin
When faz POST /orders sem dados de pagamento
Then 400 "VALIDATION_ERROR" sem efeitos
```
**AC-BR-ORD-01-03** — Cupom é opcional
```gherkin
Given carrinho válido
When faz POST /orders sem coupon, com endereço e PIX válidos
Then 201
```

### BR-ORD-02 — Pagamento aprovado
**AC-BR-ORD-02-01** — Pedido PAID
```gherkin
Given o carrinho tem o produto 4 x 2 (estoque 120)
When confirma o pedido com PIX
Then 201 com status "PAID" e itens, valores e endereço completos
```
**AC-BR-ORD-02-02** — Estoque baixado
```gherkin
Given o carrinho tem o produto 4 x 2 (estoque 120)
When o pedido é confirmado com sucesso
Then o estoque do produto 4 é 118
```
**AC-BR-ORD-02-03** — Carrinho limpo
```gherkin
When o pedido é confirmado com sucesso
Then GET /cart retorna items []
```

### BR-ORD-03 — Transação atômica
**AC-BR-ORD-03-01** — Falha parcial não deixa efeitos
```gherkin
Given um carrinho com 2 itens em que o segundo falha na confirmação (estoque insuficiente)
When confirma o pedido
Then o estoque do primeiro item permanece inalterado
And nenhum pedido PAID existe
And o carrinho mantém os 2 itens
```

### BR-ORD-04 — Movimentação EXIT por item
**AC-BR-ORD-04-01** — Movimentação gerada
```gherkin
Given um pedido PAID de id N com o produto 4 x 2
When o ADMIN consulta GET /admin/stock/movements?productId=4
Then existe movimentação type "EXIT", quantity 2, reason "Pedido #N" e user = o cliente
```
**AC-BR-ORD-04-02** — Uma por item
```gherkin
Given um pedido PAID com 2 produtos distintos
When o ADMIN consulta o histórico
Then há uma movimentação EXIT para cada produto com motivo "Pedido #N"
```

### BR-ORD-05 — Estoque insuficiente na confirmação
**AC-BR-ORD-05-01** — OUT_OF_STOCK sem efeitos
```gherkin
Given o carrinho tem o produto 17 x 3 e o estoque é reduzido para 2 depois
When confirma o pedido com PIX
Then 409 "OUT_OF_STOCK"
And details contém productId, name, available 2, requested 3
And nenhum pedido é criado, o estoque continua 2 e o carrinho permanece
```
**AC-BR-ORD-05-02** — Produto inativo
```gherkin
Given um item do carrinho foi desativado
When confirma o pedido
Then 409 "OUT_OF_STOCK" com o item em details
```
**AC-BR-ORD-05-03** — Checagem antes do pagamento (final 1111)
```gherkin
Given um item sem estoque suficiente
When confirma com cartão terminado em 1111
Then 409 "OUT_OF_STOCK"
And nenhum pedido PAYMENT_FAILED é criado
```
**AC-BR-ORD-05-04** — Checagem antes do pagamento (final 2222)
```gherkin
Given um item sem estoque suficiente
When confirma com cartão terminado em 2222
Then 409 "OUT_OF_STOCK"
And nenhum pedido PAYMENT_FAILED é criado
```
**AC-BR-ORD-05-05** — Concorrência
```gherkin
Given dois clientes com o produto 10 (estoque 1) no carrinho
When ambos confirmam o pedido simultaneamente
Then exatamente um pedido PAID é criado
And o outro recebe 409 (OUT_OF_STOCK) e o estoque final é 0
```
(Código exato do perdedor em corrida: ver Q-07.)

### BR-ORD-06 — Pagamento recusado
**AC-BR-ORD-06-01** — PAYMENT_DECLINED
```gherkin
Given estoque disponível
When confirma com cartão terminado em 1111
Then 422 "PAYMENT_DECLINED"
And error.details[0].orderId é o id de um pedido
```
**AC-BR-ORD-06-02** — Pedido PAYMENT_FAILED registrado
```gherkin
Given a resposta do AC-BR-ORD-06-01
When o cliente consulta o pedido por orderId
Then o status é "PAYMENT_FAILED"
```
**AC-BR-ORD-06-03** — Estoque e carrinho intactos
```gherkin
Given o estoque E e o carrinho com itens
When o pagamento é recusado (1111)
Then o estoque continua E e o carrinho mantém os itens
And nenhuma movimentação de estoque é gerada
```

### BR-ORD-07 — Pagamento indisponível
**AC-BR-ORD-07-01** — PAYMENT_UNAVAILABLE
```gherkin
Given estoque disponível
When confirma com cartão terminado em 2222
Then 503 "PAYMENT_UNAVAILABLE"
And existe pedido PAYMENT_FAILED com id em error.details[0].orderId
```
**AC-BR-ORD-07-02** — Estoque e carrinho intactos
```gherkin
When o pagamento está indisponível (2222)
Then o estoque e o carrinho permanecem inalterados
```
**AC-BR-ORD-07-03** — Nova tentativa com o mesmo carrinho
```gherkin
Given o AC-BR-ORD-07-02 ocorreu
When o cliente confirma novamente com PIX
Then 201 com pedido PAID
```

### BR-ORD-08 — Snapshot dos itens
**AC-BR-ORD-08-01** — Preço no pedido não muda
```gherkin
Given um pedido PAID com o produto 4 a 79,90
When o ADMIN altera o preço do produto 4 para 99,00
Then o detalhe do pedido continua com preço unitário 79.90
```
**AC-BR-ORD-08-02** — Nome no pedido não muda
```gherkin
Given um pedido PAID com o produto 4 de nome "Mouse Sem Fio"
When o ADMIN altera o nome do produto
Then o detalhe do pedido mantém o nome "Mouse Sem Fio"
```

### BR-ORD-09 — Campos persistidos no pedido
**AC-BR-ORD-09-01** — Valores do pedido
```gherkin
Given produto 4 x 1, cupom " promo10 ", PIX e endereço válido
When o pedido é confirmado
Then o pedido guarda subtotal 79.90, discount 7.99, shipping 15.00, total 86.91
And couponCode "PROMO10", método "PIX", cardLast4 null e o endereço informado
```
**AC-BR-ORD-09-02** — Sem cupom
```gherkin
Given produto 4 x 1, nenhum couponCode, PIX e endereço válido
When o pedido é confirmado
Then o pedido guarda couponCode null e discount 0.00
```
**AC-BR-ORD-09-03** — Cupom em branco
```gherkin
Given produto 4 x 1, couponCode "   ", PIX e endereço válido
When o pedido é confirmado
Then o pedido guarda couponCode null e discount 0.00
```

### BR-ORD-10 — Listagem de pedidos do cliente
**AC-BR-ORD-10-01** — Apenas os próprios
```gherkin
Given o cliente A tem pedidos e o cliente B tem pedidos
When A faz GET /orders
Then todos os pedidos retornados pertencem a A
```
**AC-BR-ORD-10-02** — Ordem decrescente
```gherkin
When faz GET /orders
Then os pedidos vêm do mais recente ao mais antigo
And empate de data desempata por id decrescente
```
**AC-BR-ORD-10-03** — Filtro por status
```gherkin
When faz GET /orders?status=PAID
Then todos têm status "PAID"
```
**AC-BR-ORD-10-04** — Status inválido
```gherkin
When faz GET /orders?status=INVALIDO
Then 400 "VALIDATION_ERROR" em field "status"
```
**AC-BR-ORD-10-05** — Paginação
```gherkin
When faz GET /orders?pageSize=1
Then data tem no máximo 1 item e pagination.totalPages é ceil(total/1)
```

### BR-ORD-11 — Detalhe do próprio pedido
**AC-BR-ORD-11-01** — Dono acessa
```gherkin
When o dono faz GET /orders/N
Then 200 com o pedido completo
```
**AC-BR-ORD-11-02** — Inexistente
```gherkin
When faz GET /orders/999999
Then 404 "ORDER_NOT_FOUND"
```
**AC-BR-ORD-11-03** — Pedido de outro cliente
```gherkin
Given o pedido N pertence ao cliente A
When o cliente B faz GET /orders/N
Then 404 "ORDER_NOT_FOUND" (idêntico ao AC-BR-ORD-11-02)
```

### BR-ORD-12 — Cancelamento
**AC-BR-ORD-12-01** — Dono cancela PAID
```gherkin
Given um pedido PAID do cliente
When o cliente faz POST /orders/N/cancel
Then 200 com status "CANCELLED"
```
**AC-BR-ORD-12-02** — ADMIN cancela PAID de qualquer cliente
```gherkin
Given um pedido PAID de um cliente
When o ADMIN cancela o pedido (rota admin)
Then status "CANCELLED"
```
**AC-BR-ORD-12-03** — ADMIN não cancela pela rota de cliente
```gherkin
Given um pedido PAID de um cliente
When o ADMIN faz POST /orders/N/cancel
Then 403 "FORBIDDEN"
And o pedido continua "PAID"
```
(Ver AC-BR-AORD-03-*.)

### BR-ORD-13 — Cancelamento devolve estoque
**AC-BR-ORD-13-01** — Estoque devolvido
```gherkin
Given um pedido PAID com o produto 4 x 2 (estoque atual 118)
When o pedido é cancelado
Then o estoque do produto 4 é 120
```
**AC-BR-ORD-13-02** — Movimentação ENTRY por item
```gherkin
When o pedido N é cancelado pelo cliente
Then existe movimentação type "ENTRY", quantity 2, reason "Cancelamento do pedido #N" e user = o cliente, por item
```
**AC-BR-ORD-13-03** — Atomicidade
```gherkin
Given uma falha ocorre durante a devolução de estoque
When o cancelamento é processado
Then o pedido permanece "PAID" e nenhuma movimentação ENTRY é gravada
```
(Camada: **Integração** — falha induzida só é reproduzível em teste de serviço; ver decisão D-01.)

### BR-ORD-14 — Cancelar pedido não PAID
**AC-BR-ORD-14-01** — Já CANCELLED
```gherkin
Given um pedido CANCELLED
When tenta cancelar
Then 409 "INVALID_ORDER_STATE"
```
**AC-BR-ORD-14-02** — PAYMENT_FAILED
```gherkin
Given um pedido PAYMENT_FAILED (obtido via cartão 1111)
When tenta cancelar
Then 409 "INVALID_ORDER_STATE"
```
**AC-BR-ORD-14-03** — Estoque devolvido uma única vez
```gherkin
Given um pedido PAID com o produto 4 x 2
When cancela duas vezes
Then a primeira responde 200 e a segunda 409 "INVALID_ORDER_STATE"
And o estoque do produto 4 aumentou apenas 2 unidades no total
```
**AC-BR-ORD-14-04** — PENDING
```gherkin
Given um pedido PENDING (não reproduzível pelos fluxos atuais; ver BR-ORD-17)
When tenta cancelar
Then 409 "INVALID_ORDER_STATE"
```
(Camada: **Integração** — o pedido `PENDING` precisa ser inserido direto no banco; ver decisão D-02.)

### BR-ORD-15 — Cancelar pedido de outro cliente
**AC-BR-ORD-15-01** — 404 sem alteração
```gherkin
Given o pedido N PAID do cliente A
When o cliente B faz POST /orders/N/cancel
Then 404 "ORDER_NOT_FOUND"
And o pedido N continua "PAID" e o estoque não muda
```

### BR-ORD-16 — Histórico preservado
**AC-BR-ORD-16-01** — PAYMENT_FAILED e CANCELLED permanecem
```gherkin
Given pedidos PAYMENT_FAILED e CANCELLED do cliente
When faz GET /orders
Then ambos estão na lista
```
**AC-BR-ORD-16-02** — Nenhum endpoint de exclusão
```gherkin
When tenta DELETE /orders/N
Then 404 "ROUTE_NOT_FOUND" e o pedido continua existindo
```

### BR-ORD-17 — PENDING não produzido
**AC-BR-ORD-17-01** — Nenhum fluxo gera PENDING
```gherkin
Given pedidos criados com cartões 0000, 1111, 2222, PIX e BOLETO
When o cliente lista os pedidos
Then nenhum pedido tem status "PENDING"
```

---

## Administração de produtos (PROD) — todas exigem ADMIN

### BR-PROD-01 — Nome 3 a 100
**AC-BR-PROD-01-01** — Limites aceitos
```gherkin
Given logado como ADMIN
When cria produto com name de 3 caracteres
Then 201
When cria produto (outro SKU) com name de 100 caracteres
Then 201
```
**AC-BR-PROD-01-02** — 2 caracteres rejeitado
```gherkin
When cria produto com name de 2 caracteres
Then 400 "VALIDATION_ERROR" em field "name"
```
**AC-BR-PROD-01-03** — 101 caracteres rejeitado
```gherkin
When cria produto com name de 101 caracteres
Then 400 "VALIDATION_ERROR" em field "name"
```
**AC-BR-PROD-01-04** — Trim
```gherkin
When cria produto com name "  ab  "
Then 400 "VALIDATION_ERROR" (2 caracteres úteis)
```

### BR-PROD-02 — Preço
**AC-BR-PROD-02-01** — Preço mínimo válido
```gherkin
When cria produto com price 0.01
Then 201
```
**AC-BR-PROD-02-02** — Preço máximo válido
```gherkin
When cria produto com price 1000000
Then 201
```
**AC-BR-PROD-02-03** — Acima do máximo
```gherkin
When cria produto com price 1000000.01
Then 400 "VALIDATION_ERROR" em field "price"
```
**AC-BR-PROD-02-04** — Zero e negativo
```gherkin
When cria produto com price 0
Then 400 "VALIDATION_ERROR"
When cria produto com price -1
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PROD-02-05** — Mais de 2 casas
```gherkin
When cria produto com price 10.999
Then 400 "VALIDATION_ERROR" em field "price"
```
**AC-BR-PROD-02-06** — Texto
```gherkin
When cria produto com price "abc"
Then 400 "VALIDATION_ERROR" em field "price"
```
**AC-BR-PROD-02-07** — 2 casas aceitas
```gherkin
When cria produto com price 10.99
Then 201 com price 10.99
```

### BR-PROD-03 — SKU único
**AC-BR-PROD-03-01** — Obrigatório e 1–50
```gherkin
When cria produto sem sku
Then 400 "VALIDATION_ERROR" em field "sku"
When cria produto com sku de 1 caractere e outro de 50 caracteres
Then ambos 201
When cria produto com sku de 51 caracteres
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PROD-03-02** — Duplicado na criação
```gherkin
Given existe o SKU "ELE-004"
When cria produto com sku "ELE-004"
Then 409 "SKU_ALREADY_EXISTS"
```
**AC-BR-PROD-03-03** — Duplicado na edição
```gherkin
When edita o produto 5 informando sku "ELE-004"
Then 409 "SKU_ALREADY_EXISTS"
```
**AC-BR-PROD-03-04** — Manter o próprio SKU na edição
```gherkin
When edita o produto 4 mantendo sku "ELE-004" e alterando o nome
Then 200
```

### BR-PROD-04 — Categoria, descrição, imagem, active
**AC-BR-PROD-04-01** — Categoria obrigatória 1–50
```gherkin
When cria produto sem category
Then 400 "VALIDATION_ERROR" em field "category"
When cria com category de 50 caracteres
Then 201
When cria com category de 51 caracteres
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PROD-04-02** — Descrição opcional, padrão vazio, máx 1000
```gherkin
When cria produto sem description
Then description retornada é ""
When cria com description de 1000 caracteres
Then 201
When cria com description de 1001 caracteres
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PROD-04-03** — URL da imagem opcional, padrão vazio, máx 500
```gherkin
When cria produto sem imageUrl
Then imageUrl retornada é ""
When cria com imageUrl de 500 caracteres
Then 201
When cria com imageUrl de 501 caracteres
Then 400 "VALIDATION_ERROR"
```
**AC-BR-PROD-04-04** — active padrão true
```gherkin
When cria produto sem active
Then active é true
```

### BR-PROD-05 — Estoque inicial
**AC-BR-PROD-05-01** — Estoque inicial > 0 gera ENTRY
```gherkin
When cria produto com stock 10
Then o produto tem stock 10
And existe movimentação type "ENTRY", quantity 10, reason "Estoque inicial", previousStock 0 e newStock 10
```
**AC-BR-PROD-05-02** — Estoque 0 e padrão
```gherkin
When cria produto sem stock
Then stock é 0 e nenhuma movimentação é gerada
When cria produto com stock 0
Then stock é 0 e nenhuma movimentação é gerada
```
**AC-BR-PROD-05-03** — Negativo ou decimal rejeitado
```gherkin
When cria produto com stock -1
Then 400 "VALIDATION_ERROR" em field "stock"
When cria produto com stock 1.5
Then 400 "VALIDATION_ERROR" em field "stock"
```

### BR-PROD-06 — Edição não altera estoque
**AC-BR-PROD-06-01** — stock ignorado no PUT
```gherkin
Given o produto 4 com estoque 120
When o ADMIN faz PUT /admin/products/4 com stock 5 e name novo
Then 200 e o name foi alterado
And o stock continua 120
And nenhuma movimentação é gerada
```

### BR-PROD-07 — Soft delete idempotente
**AC-BR-PROD-07-01** — Remove (soft)
```gherkin
When o ADMIN faz DELETE /admin/products/4
Then 204
And o produto 4 continua em GET /admin/products/4 com active false
```
**AC-BR-PROD-07-02** — Some da vitrine e do carrinho
```gherkin
Given o produto 4 removido
Then GET /products/4 responde 404 "PRODUCT_NOT_FOUND"
And POST /cart/items com productId 4 responde 404 "PRODUCT_NOT_FOUND"
```
**AC-BR-PROD-07-03** — Preservado em pedidos antigos
```gherkin
Given um pedido PAID com o produto 4 e depois o produto 4 é removido
When o dono consulta o pedido
Then o item do produto 4 continua presente com nome e preço do snapshot
```
**AC-BR-PROD-07-04** — Idempotente
```gherkin
Given o produto 29 já inativo
When o ADMIN faz DELETE /admin/products/29
Then 204
```

### BR-PROD-08 — Listagem admin
**AC-BR-PROD-08-01** — Inclui inativos
```gherkin
When o ADMIN faz GET /admin/products
Then o produto 29 (inativo) aparece em alguma página
```
**AC-BR-PROD-08-02** — Filtro active=false
```gherkin
When faz GET /admin/products?active=false
Then todos os itens têm active false
```
**AC-BR-PROD-08-03** — Filtro active=true
```gherkin
When faz GET /admin/products?active=true
Then todos os itens têm active true
```
**AC-BR-PROD-08-04** — Busca, categoria, ordenação e paginação
```gherkin
When faz GET /admin/products?search=Mouse&category=C&sort=price_asc&page=1&pageSize=5
Then os filtros são aplicados em conjunto e pagination reflete page 1, pageSize 5
```
**AC-BR-PROD-08-05** — active inválido
```gherkin
When faz GET /admin/products?active=talvez
Then 400 "VALIDATION_ERROR" em field "active"
```

### BR-PROD-09 — Produto inexistente
**AC-BR-PROD-09-01** — Detalhe, edição e remoção
```gherkin
When o ADMIN faz GET, PUT e DELETE em /admin/products/999999
Then todas respondem 404 "PRODUCT_NOT_FOUND"
```

### BR-PROD-10 — Reativação
**AC-BR-PROD-10-01** — Reativar via edição
```gherkin
Given o produto 29 inativo
When o ADMIN faz PUT /admin/products/29 com active true
Then 200 com active true
And o produto 29 aparece em GET /products
```

### BR-PROD-11 — [UI] Confirmação e estoque desabilitado
**AC-BR-PROD-11-01** — [UI] Remoção exige confirmação
```gherkin
Given o ADMIN na lista de produtos
When aciona "remover" e aborta a confirmação
Then o produto permanece ativo
When aciona "remover" e confirma
Then o produto passa a inativo
```
**AC-BR-PROD-11-02** — [UI] Estoque desabilitado na edição
```gherkin
Given o ADMIN no formulário de edição de um produto
Then o campo de estoque está desabilitado
```

---

## Estoque (STK)

### BR-STK-01 — Tipos de movimentação
**AC-BR-STK-01-01** — ENTRY soma
```gherkin
Given o produto 17 com estoque 3
When o ADMIN registra ENTRY quantity 5 com motivo "Reposição"
Then o estoque é 8
```
**AC-BR-STK-01-02** — EXIT subtrai
```gherkin
Given o produto 17 com estoque 3
When registra EXIT quantity 2 com motivo "Avaria"
Then o estoque é 1
```
**AC-BR-STK-01-03** — ADJUSTMENT define valor absoluto
```gherkin
Given o produto 17 com estoque 3
When registra ADJUSTMENT quantity 10 com motivo "Inventário"
Then o estoque é 10
```
**AC-BR-STK-01-04** — Tipo inválido
```gherkin
When registra type "TRANSFER"
Then 400 "VALIDATION_ERROR" em field "type"
```

### BR-STK-02 — Quantidade por tipo
**AC-BR-STK-02-01** — ENTRY/EXIT > 0
```gherkin
When registra ENTRY com quantity 1
Then aceito
When registra ENTRY com quantity 0
Then 400 "VALIDATION_ERROR"
When registra EXIT com quantity 0
Then 400 "VALIDATION_ERROR"
```
**AC-BR-STK-02-02** — Negativo e decimal
```gherkin
When registra ENTRY com quantity -1
Then 400 "VALIDATION_ERROR"
When registra EXIT com quantity 1.5
Then 400 "VALIDATION_ERROR"
```
**AC-BR-STK-02-03** — ADJUSTMENT para 0 permitido
```gherkin
Given o produto 4 com estoque 120
When registra ADJUSTMENT quantity 0 com motivo "Zerar estoque"
Then o estoque é 0
```
**AC-BR-STK-02-04** — ADJUSTMENT negativo rejeitado
```gherkin
When registra ADJUSTMENT quantity -1
Then 400 "VALIDATION_ERROR" em field "quantity"
```

### BR-STK-03 — Estoque nunca negativo
**AC-BR-STK-03-01** — EXIT maior que o estoque
```gherkin
Given o produto 17 com estoque 3
When registra EXIT quantity 4
Then 409 "INSUFFICIENT_STOCK"
And o estoque continua 3
And nenhuma movimentação é gravada
```
**AC-BR-STK-03-02** — EXIT igual ao estoque
```gherkin
Given o produto 17 com estoque 3
When registra EXIT quantity 3
Then o estoque é 0
```
**AC-BR-STK-03-03** — ADJUSTMENT negativo não altera o estoque
```gherkin
Given o produto 17 com estoque 3
When registra ADJUSTMENT quantity -1 com motivo "Inventário"
Then 400 "VALIDATION_ERROR" em field "quantity"
And o estoque continua 3
And nenhuma movimentação é gravada
```

### BR-STK-04 — Motivo 3 a 200
**AC-BR-STK-04-01** — Limites aceitos
```gherkin
When registra movimentação com reason de 3 caracteres
Then aceito
When registra com reason de 200 caracteres
Then aceito
```
**AC-BR-STK-04-02** — Fora dos limites e ausente
```gherkin
When registra com reason de 2 caracteres
Then 400 "VALIDATION_ERROR" em field "reason"
When registra com reason de 201 caracteres
Then 400 "VALIDATION_ERROR"
When omite reason
Then 400 "VALIDATION_ERROR"
```

### BR-STK-05 — Registro completo da movimentação
**AC-BR-STK-05-01** — Campos gravados (manual)
```gherkin
Given o produto 17 com estoque 3
When o ADMIN registra ENTRY quantity 5 com motivo "Reposição"
Then a movimentação tem productId, type "ENTRY", quantity 5, reason "Reposição", user = ADMIN, createdAt, previousStock 3 e newStock 8
```
**AC-BR-STK-05-02** — Toda origem gera movimentação
```gherkin
When ocorrem criação de produto com stock > 0, pedido PAID e cancelamento de pedido
Then cada evento grava movimentação com previousStock e newStock corretos
```

### BR-STK-06 — ADJUSTMENT registra valor absoluto
**AC-BR-STK-06-01** — quantity é o novo valor
```gherkin
Given o produto 17 com estoque 3
When registra ADJUSTMENT quantity 10
Then a movimentação tem quantity 10, previousStock 3 e newStock 10
```

### BR-STK-07 — Conflito de concorrência
**AC-BR-STK-07-01** — STOCK_CONFLICT sem gravação
```gherkin
Given o estoque do produto é alterado por outra operação durante a transação
When a primeira operação tenta gravar
Then 409 "STOCK_CONFLICT"
And nenhuma movimentação da operação falha é gravada
```
**AC-BR-STK-07-02** — Nova tentativa é segura
```gherkin
Given uma operação falhou com STOCK_CONFLICT
When o ADMIN repete a mesma operação
Then ela é concluída e o estoque reflete uma única aplicação
```
(Camada: **Integração** — conflito de concorrência só é reproduzível em teste de serviço; ver decisão D-01.)

### BR-STK-08 — Histórico de movimentações
**AC-BR-STK-08-01** — Ordem decrescente
```gherkin
When o ADMIN faz GET /admin/stock/movements
Then as movimentações vêm da mais recente à mais antiga
```
**AC-BR-STK-08-02** — Filtros
```gherkin
When faz GET /admin/stock/movements?productId=4
Then todas têm product.id 4
When faz GET /admin/stock/movements?type=EXIT
Then todas têm type "EXIT"
When faz GET /admin/stock/movements?search=Mouse
Then todas têm product.name contendo "Mouse"
```
**AC-BR-STK-08-03** — Estrutura do item
```gherkin
When lista movimentações
Then cada item tem product {id, name, sku} e user {id, name}
```
**AC-BR-STK-08-04** — Paginação e type inválido
```gherkin
When faz GET /admin/stock/movements?pageSize=1
Then data tem 1 item
When faz GET /admin/stock/movements?type=INVALIDO
Then 400 "VALIDATION_ERROR"
```

### BR-STK-09 — Produto inexistente
**AC-BR-STK-09-01** — 404
```gherkin
When registra movimentação em /admin/products/999999/stock
Then 404 "PRODUCT_NOT_FOUND"
```

### BR-STK-10 — Estoque baixo < 5
**AC-BR-STK-10-01** — Estoque 4 é baixo, 5 não
```gherkin
Given um produto com estoque 4 e outro com estoque 5
Then o de estoque 4 tem lowStock true (API) e selo de estoque baixo na lista admin (UI)
And o de estoque 5 tem lowStock false e não tem selo
```
**AC-BR-STK-10-02** — Estoque 0 é baixo
```gherkin
Given o produto 7 com estoque 0
Then lowStock é true
```
**AC-BR-STK-10-03** — Painel
```gherkin
Given um produto ativo com estoque 4 e outro com estoque 5
When o ADMIN abre GET /admin/dashboard
Then lowStockProducts conta o de estoque 4 e não conta o de estoque 5
```

---

## Painel administrativo (DASH)

### BR-DASH-01 — Contadores de produtos
**AC-BR-DASH-01-01** — Ativos e inativos
```gherkin
Given A produtos ativos e I inativos
When o ADMIN faz GET /admin/dashboard
Then totalProducts é A e inactiveProducts é I
```
**AC-BR-DASH-01-02** — Reflete remoção
```gherkin
When o ADMIN remove um produto ativo
Then totalProducts diminui 1 e inactiveProducts aumenta 1
```

### BR-DASH-02 — Estoque baixo e esgotado
**AC-BR-DASH-02-01** — lowStockProducts inclui estoque 0
```gherkin
Given produtos ativos com estoque 0 e com estoque 3
Then lowStockProducts conta ambos
```
**AC-BR-DASH-02-02** — outOfStockProducts
```gherkin
Given produtos ativos com estoque 0
Then outOfStockProducts conta somente ativos com estoque 0
```
**AC-BR-DASH-02-03** — Inativos não contam
```gherkin
Given um produto inativo com estoque 0
Then não é contado em lowStockProducts nem em outOfStockProducts
```

### BR-DASH-03 — totalOrders
**AC-BR-DASH-03-01** — Todos os status
```gherkin
Given pedidos PAID, PAYMENT_FAILED e CANCELLED
Then totalOrders é igual ao número de todos os pedidos
```

### BR-DASH-04 — ordersByStatus
**AC-BR-DASH-04-01** — Quatro chaves sempre
```gherkin
Given nenhum pedido PENDING
Then ordersByStatus contém PENDING, PAID, PAYMENT_FAILED e CANCELLED
And PENDING é 0
```
**AC-BR-DASH-04-02** — Soma igual a totalOrders
```gherkin
Then a soma dos valores de ordersByStatus é igual a totalOrders
```
**AC-BR-DASH-04-03** — Sem pedidos
```gherkin
Given nenhum pedido existe (após reset sem pedidos)
Then totalOrders é 0 e as 4 chaves valem 0
```

---

## Administração de pedidos (AORD)

### BR-AORD-01 — Listagem admin
**AC-BR-AORD-01-01** — Todos os pedidos
```gherkin
Given pedidos de dois clientes
When o ADMIN faz GET /admin/orders
Then pedidos de ambos aparecem, do mais recente ao mais antigo
```
**AC-BR-AORD-01-02** — Dados do cliente
```gherkin
Then cada pedido inclui customer com id, name e email
```
**AC-BR-AORD-01-03** — Filtro e paginação
```gherkin
When faz GET /admin/orders?status=CANCELLED&pageSize=1
Then todos têm status "CANCELLED" e data tem no máximo 1 item
When faz GET /admin/orders?status=INVALIDO
Then 400 "VALIDATION_ERROR"
```

### BR-AORD-02 — Detalhe admin
**AC-BR-AORD-02-01** — Qualquer pedido
```gherkin
When o ADMIN faz GET /admin/orders/N de um pedido de cliente
Then 200 com o pedido
```
**AC-BR-AORD-02-02** — Inexistente
```gherkin
When faz GET /admin/orders/999999
Then 404 "ORDER_NOT_FOUND"
```

### BR-AORD-03 — Cancelamento admin
**AC-BR-AORD-03-01** — Cancela PAID de qualquer cliente
```gherkin
Given um pedido PAID do cliente
When o ADMIN cancela
Then status "CANCELLED" e o estoque é devolvido
```
**AC-BR-AORD-03-02** — Movimentação em nome do ADMIN
```gherkin
When o ADMIN cancela o pedido N
Then cada movimentação ENTRY tem reason "Cancelamento do pedido #N" e user = o ADMIN
```
**AC-BR-AORD-03-03** — Não PAID
```gherkin
When o ADMIN cancela um pedido CANCELLED ou PAYMENT_FAILED
Then 409 "INVALID_ORDER_STATE"
```
**AC-BR-AORD-03-04** — Inexistente
```gherkin
When o ADMIN cancela o pedido 999999
Then 404 "ORDER_NOT_FOUND"
```

### BR-AORD-04 — [UI] Confirmação de cancelamento
**AC-BR-AORD-04-01** — [UI] Abortar
```gherkin
Given o ADMIN (ou cliente) na tela de pedido PAID
When aciona "cancelar" e aborta a confirmação
Then o pedido continua "PAID"
```
**AC-BR-AORD-04-02** — [UI] Confirmar
```gherkin
When aciona "cancelar" e confirma
Then o pedido passa a "CANCELLED"
```

---

## Validação e formato de resposta (GEN)

### BR-GEN-01 — VALIDATION_ERROR por campo
**AC-BR-GEN-01-01** — Corpo inválido
```gherkin
When envia POST /auth/register com name e email inválidos
Then 400 "VALIDATION_ERROR"
And details contém um item { field, message } para "name" e outro para "email"
```
**AC-BR-GEN-01-02** — Query inválida
```gherkin
When faz GET /products?page=abc
Then 400 "VALIDATION_ERROR" com details [{ field: "page", message }]
```
**AC-BR-GEN-01-03** — Parâmetro de rota inválido
```gherkin
When faz GET /products/abc
Then 400 "VALIDATION_ERROR"
```
**AC-BR-GEN-01-04** — Sem efeitos colaterais
```gherkin
When uma requisição de escrita falha por validação
Then nenhum dado (produto, item, pedido, movimentação) é criado ou alterado
```

### BR-GEN-02 — JSON malformado
**AC-BR-GEN-02-01** — INVALID_JSON
```gherkin
When envia POST /auth/login com corpo '{"email": ' (JSON truncado)
Then 400 "INVALID_JSON"
```

### BR-GEN-03 — Formato de erro
**AC-BR-GEN-03-01** — Estrutura
```gherkin
When qualquer requisição falha
Then o corpo é { error: { code, message, details } }
And code é uma string estável do catálogo da seção 7
```

### BR-GEN-04 — Rota inexistente
**AC-BR-GEN-04-01** — ROUTE_NOT_FOUND
```gherkin
When faz GET /rota-que-nao-existe
Then 404 "ROUTE_NOT_FOUND"
```
**AC-BR-GEN-04-02** — [UI] Página não encontrada
```gherkin
When o usuário acessa uma rota inexistente na interface
Then é exibido "Página não encontrada"
```

### BR-GEN-05 — ID positivo inteiro
**AC-BR-GEN-05-01** — IDs inválidos
```gherkin
When faz GET /products/0, /products/-1, /products/1.5 e /products/abc
Then todos respondem 400 "VALIDATION_ERROR"
```
**AC-BR-GEN-05-02** — ID válido
```gherkin
When faz GET /products/1
Then a resposta é 200 ou 404, nunca 400
```

### BR-GEN-06 — Ordem de checagem
**AC-BR-GEN-06-01** — 401 antes de 403
```gherkin
When faz POST /admin/products sem token e corpo inválido
Then 401
```
**AC-BR-GEN-06-02** — 403 antes de 400
```gherkin
Given logado como CUSTOMER
When faz POST /admin/products com corpo inválido
Then 403 "FORBIDDEN"
```
**AC-BR-GEN-06-03** — 400 antes de 404
```gherkin
Given logado como ADMIN
When faz PUT /admin/products/999999 com corpo inválido
Then 400 "VALIDATION_ERROR" (e não 404)
```
**AC-BR-GEN-06-04** — Regras de negócio por último
```gherkin
Given logado como ADMIN e corpo válido
When faz PUT /admin/products/999999
Then 404 "PRODUCT_NOT_FOUND"
```

---

## Matriz de acesso (seção 8) e máquina de estados (seção 6)

### ACL — Matriz de acesso
**AC-ACL-01** — Vitrine pública
```gherkin
When visitante, CUSTOMER e ADMIN fazem GET /products, GET /products/4 e GET /categories
Then todos recebem 200
```
**AC-ACL-02** — Cadastro e login para todos
```gherkin
When visitante, CUSTOMER e ADMIN fazem POST /auth/login com credenciais válidas
Then todos recebem 200
```
**AC-ACL-03** — /auth/me e logout
```gherkin
When visitante faz GET /auth/me e POST /auth/logout
Then ambos 401
When CUSTOMER e ADMIN fazem as mesmas chamadas
Then GET /auth/me 200 e POST /auth/logout 204
```
**AC-ACL-04** — Carrinho, cotação e pedidos próprios por perfil
```gherkin
When visitante acessa GET /cart, POST /checkout/quote, POST /orders e GET /orders
Then todos 401
When ADMIN acessa as mesmas rotas
Then todos 403 "FORBIDDEN"
When CUSTOMER acessa as mesmas rotas (carrinho válido)
Then não recebem 401 nem 403
```
**AC-ACL-04b** — Cancelamento de pedido por rota e perfil
```gherkin
When visitante faz POST /orders/N/cancel e POST /admin/orders/N/cancel
Then ambos 401
When CUSTOMER faz POST /admin/orders/N/cancel
Then 403 "FORBIDDEN"
When ADMIN faz POST /orders/N/cancel
Then 403 "FORBIDDEN"
When CUSTOMER dono cancela pedido PAID por POST /orders/N/cancel e ADMIN cancela pedido PAID por POST /admin/orders/N/cancel
Then ambos 200 com status "CANCELLED"
```
**AC-ACL-05** — /admin/products
```gherkin
When visitante acessa GET /admin/products
Then 401
When CUSTOMER acessa
Then 403 "FORBIDDEN"
When ADMIN acessa
Then 200
```
**AC-ACL-06** — Estoque admin
```gherkin
When visitante acessa GET /admin/stock/movements e POST /admin/products/4/stock
Then 401
When CUSTOMER acessa
Then 403
When ADMIN acessa
Then não recebe 401 nem 403
```
**AC-ACL-07** — /admin/orders
```gherkin
When visitante acessa GET /admin/orders
Then 401
When CUSTOMER acessa
Then 403
When ADMIN acessa
Then 200
```
**AC-ACL-08** — /admin/dashboard
```gherkin
When visitante acessa GET /admin/dashboard
Then 401
When CUSTOMER acessa
Then 403
When ADMIN acessa
Then 200
```
**AC-ACL-09** — [UI] Rotas de cliente
```gherkin
Given visitante, ADMIN e CUSTOMER
When acessam "/cart", "/checkout" e "/orders"
Then visitante é redirecionado ao login, ADMIN vê "Acesso negado" e CUSTOMER acessa a página
```
**AC-ACL-10** — [UI] Rotas admin
```gherkin
When visitante, CUSTOMER e ADMIN acessam "/admin"
Then visitante é redirecionado ao login, CUSTOMER vê "Acesso negado" e ADMIN acessa a página
```

### FSM — Máquina de estados do pedido
**AC-FSM-01** — Criação → PAID
```gherkin
When pagamento é aprovado e há estoque suficiente
Then o pedido nasce "PAID", com baixa de estoque, carrinho limpo e movimentação EXIT por item
```
**AC-FSM-02** — Criação → PAYMENT_FAILED
```gherkin
When o pagamento é recusado (1111) ou indisponível (2222)
Then o pedido nasce "PAYMENT_FAILED" sem alterar estoque, carrinho e sem gerar movimentação
```
**AC-FSM-03** — PAID → CANCELLED
```gherkin
When um pedido PAID é cancelado
Then o status é "CANCELLED", o estoque é devolvido por item e há movimentação ENTRY por item
```
**AC-FSM-04** — PAYMENT_FAILED é terminal
```gherkin
When tenta cancelar um pedido PAYMENT_FAILED
Then 409 "INVALID_ORDER_STATE" e o status permanece "PAYMENT_FAILED"
```
**AC-FSM-05** — CANCELLED é terminal
```gherkin
When tenta cancelar um pedido CANCELLED
Then 409 "INVALID_ORDER_STATE" e o status permanece "CANCELLED"
```

---

## Ambiguidades, lacunas e suposições
| ID | Tipo | Origem | Descrição | Impacto |
| -- | ---- | ------ | --------- | ------- |
| PA-04 | Lacuna | BRD §10 | Pedido `PAYMENT_FAILED` não é reprocessável nem cancelável; não há regra de expiração/limpeza. | Sem AC de expiração/limpeza. Só o bloqueio de cancelamento está coberto (AC-BR-ORD-14-02). |
| PA-05 | Ambiguidade | BRD §10 / BR-SHOP-03 | Busca por nome: sensibilidade a caixa/acentos depende do SQLite, não é regra. | AC-BR-SHOP-03-01 só valida termo com mesma caixa; sem AC para caixa/acento. |
| PA-07 | Lacuna | BRD §10 / BR-ORD-12 | Cancelamento sem prazo limite, sem motivo obrigatório, sem reembolso. | Sem AC de prazo/motivo/reembolso. |
| PA-08 | Suposição | BRD §10 / BR-CART-11, BR-CART-07 | Produto desativado permanece em pedidos antigos e fica `available=false` no carrinho, bloqueando checkout até remoção. | Já coberto por BR-CART-11/12 e BR-PROD-07; confirmar se é contratual. |
| PA-09 | Lacuna | BRD §10 / BR-AUTH-01 | Não há fluxo de negócio para criar/promover ADMIN além do seed. | Sem AC. |
| PA-10 | Lacuna | BRD §10 / BR-CART-04 | Total acumulado por item limitado apenas pelo estoque (sem teto além de 999 por operação). | Sem AC de teto acumulado; comportamento coberto por BR-CART-05. |
| Q-01 | Lacuna | BR-CART-04 | O seed não tem produto com estoque >= 999; AC-BR-CART-04-02 precisa de dado a definir (criar produto com estoque ≥ 999 ou ajustar). | Dado de teste a definir na Fase 2. |
| Q-02 | Lacuna | BR-PRICE-04 | O BRD dá os subtotais-limite (199,99/200,00/200,01) mas não a composição de carrinho/produto para atingi-los com o seed. | Dado de teste a definir (criar produto com preço adequado via admin). |
| Q-03 | Ambiguidade | BR-PRICE-08 | Não está dito como "dois cupons" poderiam ser enviados (campo único `coupon`?). Se a API só aceita um campo, o AC-BR-PRICE-08-01 é trivial e não testa acúmulo. | Confirmar se há algo a testar além do cupom único. |
| Q-04 | Lacuna | BR-PAY-01 | "É possível voltar" não diz se os dados já digitados são preservados. | AC-BR-PAY-01-03 registra preservação como suposição; confirmar. |
| Q-06 | Ambiguidade | BR-PAY-06 | "4 últimos dígitos" após remover espaços/hífens? E número com letras ou só zeros (ex.: `0000000000000`) — é aprovado? | AC-BR-PAY-06-05 assume remoção de separadores; confirmar. |
| Q-07 | Ambiguidade | BR-ORD-05 | Em corrida (mesmo item, estoque 1), o perdedor recebe `OUT_OF_STOCK` ou `STOCK_CONFLICT`? | AC-BR-ORD-05-05 aceita 409 genérico; confirmar `code`. |
| Q-12 | Lacuna | BR-DASH-02 × BR-SHOP-07 / BR-STK-10 | `lowStock` é por produto (inclui inativos?); o painel só conta ativos. Não é dito se `lowStock` de produto inativo na lista admin é calculado. | Sem AC para inativo em `lowStock`. |
| Q-14 | Lacuna | BR-AUTH-13 | Logout com token expirado/inválido: resposta esperada não definida além de "exige token válido". | AC-BR-AUTH-13-02 cobre só ausência de token. |
| Q-15 | Lacuna | BR-SHOP-09 / BR-GEN-01 | Comportamento para `page`/`pageSize` não numéricos (ex.: `abc`, `1.5`) não está explícito no BRD (assumido `VALIDATION_ERROR` por BR-GEN-01). | AC-BR-GEN-01-02 assume 400. |
| Q-16 | Lacuna | BR-PROD-02 | Preço `1000000` é inclusivo ("≤ 1.000.000"), mas o BRD não diz se `NaN`/`Infinity`/notação científica são aceitos. | Sem AC para esses formatos. |
| Q-17 | Lacuna | BR-PROD-01 × seed | Produto 28 (`CAS-007`) tem nome com 100 caracteres; BRD não informa o valor exato para oráculo. | Valor exato a definir na Fase 2. |
| Q-18 | Lacuna | BR-PAY-01 | Etapa 4 "Confirmação" não diz se é a tela pós-pedido ou etapa antes do envio. | AC-BR-PAY-01-01 ordena apenas as etapas. |
| Q-19 | Lacuna | Geral | O BRD não define status HTTP de sucesso para vários endpoints (ex.: PUT/DELETE de itens, movimentação de estoque 200 ou 201). | Os ACs usam "sucesso" genérico nesses casos; confirmar. |

Total de ACs: 337

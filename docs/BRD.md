# BRD — Business Requirements Document · Loja QA

| Campo | Valor |
| ----- | ----- |
| Produto | Loja QA — e-commerce fictício (backend + frontend) |
| Versão do documento | 1.0 |
| Data | 2026-10-27 |
| Finalidade | Base para a criação de *acceptance criteria* e *test cases* |
| Fonte das regras | Código (`backend/src`, `frontend/src`), `README.md` e `docs/TESTING-GUIDE.md` |

> Este documento descreve **apenas regras de negócio**. Layout, `data-testid`, infraestrutura e escolhas de
> implementação ficam fora do escopo. Onde o código não define o comportamento, a regra está registrada na seção
> [10. Pontos em aberto](#10-pontos-em-aberto) em vez de ser inventada.

## Sumário

1. [Visão geral e objetivos](#1-visão-geral-e-objetivos)
2. [Escopo](#2-escopo)
3. [Perfis e permissões](#3-perfis-e-permissões)
4. [Glossário e dados de referência](#4-glossário-e-dados-de-referência)
5. [Regras de negócio por domínio](#5-regras-de-negócio-por-domínio)
6. [Máquina de estados do pedido](#6-máquina-de-estados-do-pedido)
7. [Catálogo de erros de negócio](#7-catálogo-de-erros-de-negócio)
8. [Matriz de acesso](#8-matriz-de-acesso)
9. [Rastreabilidade para testes](#9-rastreabilidade-para-testes)
10. [Pontos em aberto](#10-pontos-em-aberto)

---

## Como ler as regras

- Cada regra tem um **ID estável** (`BR-<DOMÍNIO>-<nn>`) para ser citado em *acceptance criteria* e *test cases*.
- Cada regra é escrita de forma **verificável**: entrada/condição → resultado observável.
- Quando há valor-limite, ele está explícito (para derivar casos de fronteira).
- `code` é o código de erro estável da API; a `message` pode mudar e **não** é contrato.
- Prioridade: **Alta** = afeta dinheiro, estoque ou segurança; **Média** = fluxo principal; **Baixa** = conveniência.

---

## 1. Visão geral e objetivos

A Loja QA permite que **visitantes** naveguem pelo catálogo, que **clientes** montem um carrinho e finalizem pedidos
com pagamento simulado, e que **administradores** gerenciem produtos, estoque e pedidos.

Objetivos de negócio:

| ID | Objetivo |
| -- | -------- |
| OBJ-01 | Vender produtos sem nunca prometer estoque inexistente. |
| OBJ-02 | Calcular valores (subtotal, desconto, frete, total) de forma correta e previsível. |
| OBJ-03 | Garantir rastreabilidade de toda alteração de estoque. |
| OBJ-04 | Restringir funções administrativas e de compra aos perfis corretos. |
| OBJ-05 | Ser um alvo **determinístico** de testes automatizados (pagamento e dados previsíveis). |

## 2. Escopo

**Dentro do escopo:** autenticação e sessão; vitrine; carrinho; checkout (cotação, endereço, pagamento simulado);
pedidos (histórico, detalhe, cancelamento); administração de produtos, estoque, pedidos e painel de indicadores.

**Fora do escopo:** pagamento real, e-mail/notificações, recuperação de senha, edição de perfil, exclusão de conta,
cálculo de frete por região, múltiplos endereços salvos, devolução parcial, reembolso financeiro, impostos, avaliações
de produtos, upload de imagens (apenas URL).

---

## 3. Perfis e permissões

| Perfil | Como se obtém | Pode | Não pode |
| ------ | ------------- | ---- | -------- |
| **Visitante** (sem login) | — | Ver vitrine, categorias, detalhe de produto ativo; cadastrar-se; logar | Carrinho, checkout, pedidos, administração |
| **CUSTOMER** | Auto-cadastro (sempre) | Tudo do visitante + carrinho, checkout, pedidos próprios, cancelar pedido próprio `PAID` | Qualquer rota de administração |
| **ADMIN** | Somente via seed/dados iniciais | Administração completa; ver e cancelar qualquer pedido | Usar carrinho, checkout e "meus pedidos" (papel não permitido) |

Usuários de referência (seed): `admin@loja.com` / `Admin@123` (ADMIN) e `cliente@loja.com` / `Cliente@123` (CUSTOMER).

---

## 4. Glossário e dados de referência

| Termo | Definição |
| ----- | --------- |
| Produto ativo | `active = true`. Somente produtos ativos aparecem na vitrine e podem ser comprados. |
| Remoção de produto | *Soft delete*: o produto é marcado `active = false`; nunca é apagado. |
| Estoque baixo | Estoque **< 5** (inclui 0). |
| Sem estoque / indisponível | Estoque **= 0**. |
| Subtotal | Soma de `preço × quantidade` dos itens, antes de desconto e frete. |
| Pedido `PAID` | Pagamento aprovado, estoque baixado. |
| Final do cartão | Os 4 últimos dígitos do número do cartão; determinam o resultado do pagamento simulado. |

Constantes de negócio:

| Constante | Valor |
| --------- | ----- |
| Validade do token de sessão | 24 horas (86.400 s) |
| Frete fixo | R$ 15,00 |
| Limite de frete grátis | Subtotal **estritamente maior que** R$ 200,00 |
| Desconto `PROMO10` | 10% do subtotal |
| Limite de estoque baixo | 5 unidades |
| Quantidade máxima por operação no carrinho | 999 |
| Paginação | `page` ≥ 1; `pageSize` 1–100; padrão `pageSize = 10` |

---

## 5. Regras de negócio por domínio

### 5.1 Cadastro e autenticação (AUTH)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-AUTH-01 | Qualquer visitante pode se cadastrar informando nome, e-mail e senha; a conta criada é **sempre** `CUSTOMER`, mesmo que o corpo da requisição envie `role`. | Alta |
| BR-AUTH-02 | Nome: 2 a 100 caracteres (após remover espaços nas pontas). 1 caractere ou 101 → `VALIDATION_ERROR`. | Média |
| BR-AUTH-03 | E-mail deve ter formato válido; é normalizado (sem espaços nas pontas, minúsculas) antes de salvar e comparar. | Alta |
| BR-AUTH-04 | E-mail é único. Cadastro com e-mail já existente (inclusive em caixa diferente, ex.: `CLIENTE@LOJA.COM`) → `409 EMAIL_ALREADY_EXISTS`. | Alta |
| BR-AUTH-05 | Senha no cadastro: 8 a 72 caracteres. 7 e 73 → `VALIDATION_ERROR`; 8 e 72 → aceitas. | Média |
| BR-AUTH-06 | A senha nunca é armazenada nem retornada em texto claro; as respostas de usuário expõem apenas `id`, `name`, `email`, `role`, `createdAt`. | Alta |
| BR-AUTH-07 | Cadastro bem-sucedido já devolve uma sessão válida (token + dados do usuário); o usuário não precisa logar em seguida. | Média |
| BR-AUTH-08 | Login com e-mail e senha corretos devolve token, `expiresIn = 86400`, `expiresAt` e o usuário. O e-mail é case-insensitive no login. | Alta |
| BR-AUTH-09 | E-mail inexistente **e** senha incorreta produzem a **mesma** resposta: `401 INVALID_CREDENTIALS` (não revelar qual dos dois falhou). | Alta |
| BR-AUTH-10 | Login exige e-mail válido e senha de **8 a 72 caracteres** (mesma regra do cadastro); caso contrário `400 VALIDATION_ERROR` com detalhe por campo, sem consultar credenciais. Senha vazia, com 7 ou com 73 caracteres → `400` (e não `401`). | Média |
| BR-AUTH-11 | O token expira em 24 h. Requisição com token expirado → `401 TOKEN_EXPIRED`; token adulterado, malformado, de outro segredo, ou de usuário que não existe mais → `401 INVALID_TOKEN`; sem cabeçalho `Authorization: Bearer <token>` → `401 UNAUTHORIZED`. | Alta |
| BR-AUTH-12 | `GET /auth/me` devolve o usuário do token. | Média |
| BR-AUTH-13 | Logout exige token válido e responde `204`. O logout é *stateless*: o servidor não invalida o token; o cliente descarta a sessão. | Baixa |
| BR-AUTH-14 | Na interface, token expirado/inválido encerra a sessão local e envia o usuário ao login com mensagem de sessão expirada. | Média |
| BR-AUTH-15 | Na interface, rota protegida sem login redireciona ao login (guardando a origem); com login de papel errado exibe "Acesso negado" (sem redirecionar). | Média |

### 5.2 Vitrine (SHOP)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-SHOP-01 | A vitrine é pública e lista **somente produtos ativos**. | Alta |
| BR-SHOP-02 | Detalhe de produto inativo ou inexistente → `404 PRODUCT_NOT_FOUND`. | Alta |
| BR-SHOP-03 | Busca por nome: retorna produtos cujo nome **contém** o termo informado. Termo vazio não filtra. | Média |
| BR-SHOP-04 | Filtro por categoria: retorna somente produtos da categoria informada. Busca e categoria podem ser combinadas (AND). | Média |
| BR-SHOP-05 | Ordenações aceitas: `id_asc` (padrão), `price_asc`, `price_desc`, `name_asc`. Valor diferente → `VALIDATION_ERROR`. Empates desempatam por `id` crescente. | Média |
| BR-SHOP-06 | A lista de categorias contém apenas categorias com ao menos um produto **ativo**, sem repetição, em ordem alfabética. | Média |
| BR-SHOP-07 | Cada produto expõe `inStock` (= estoque > 0) e `lowStock` (= estoque < 5). | Média |
| BR-SHOP-08 | Produto com estoque 0 é exibido como "Indisponível" e não pode ser adicionado ao carrinho. | Alta |
| BR-SHOP-09 | Listagens respeitam paginação (seção 4); `pagination` informa `page`, `pageSize`, `total`, `totalPages = ceil(total / pageSize)`. Página fora da faixa retorna `data` vazio. `page < 1`, `pageSize < 1` ou `> 100` → `VALIDATION_ERROR`. | Média |

### 5.3 Carrinho (CART)

O carrinho é persistido por usuário e acessível **somente** ao perfil `CUSTOMER`.

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-CART-01 | Cada cliente tem um único carrinho; é criado sob demanda. Carrinho novo é retornado vazio (`items = []`, `total = 0`, `totalItems = 0`). | Média |
| BR-CART-02 | Adicionar produto **novo** cria o item com a quantidade informada (padrão 1). | Alta |
| BR-CART-03 | Adicionar produto **já existente** no carrinho **soma** a quantidade (não cria linha duplicada). | Alta |
| BR-CART-04 | Quantidade por operação: inteiro entre 1 e 999. 0, negativo, decimal ou 1000 → `VALIDATION_ERROR`. | Média |
| BR-CART-05 | A quantidade **total** do produto no carrinho (já existente + nova) não pode exceder o estoque. Se estoque = 0 → `409 OUT_OF_STOCK`; se exceder → `409 INSUFFICIENT_STOCK` (com `available`, `requested`, `inCart` em `details`). Nada é alterado em caso de erro. | Alta |
| BR-CART-06 | Produto inexistente ou **inativo** não pode ser adicionado → `404 PRODUCT_NOT_FOUND`. | Alta |
| BR-CART-07 | Atualizar quantidade **define o valor absoluto** (não soma) de um item existente; vale BR-CART-04 e BR-CART-05. Item que não está no carrinho → `404 CART_ITEM_NOT_FOUND`. Produto desativado após ser adicionado → `404 PRODUCT_NOT_FOUND`. | Alta |
| BR-CART-08 | Remover item que está no carrinho o exclui e devolve o carrinho atualizado; item ausente → `404 CART_ITEM_NOT_FOUND`. | Média |
| BR-CART-09 | Limpar o carrinho remove todos os itens (`204`), mesmo se já vazio. | Média |
| BR-CART-10 | Subtotal da linha = `preço unitário × quantidade`, arredondado a 2 casas. `total` = soma dos subtotais (2 casas). `totalItems` = **soma das quantidades** (não o número de linhas). Os valores são sempre calculados no backend com o preço **atual** do produto. | Alta |
| BR-CART-11 | Cada linha informa `available`: é `false` se o produto foi desativado **ou** se o estoque atual é menor que a quantidade no carrinho. | Alta |
| BR-CART-14 | Cada item registra o preço do produto no momento em que foi adicionado ou teve a quantidade atualizada (`priceWhenAdded`). Se o preço atual do produto for diferente, a linha vem com `priceChanged = true` e o carrinho com `hasPriceChanges = true`. Adicionar mais unidades ou atualizar a quantidade do item renova o `priceWhenAdded` para o preço atual. Itens sem registro de preço (anteriores a esta regra) não são sinalizados. | Alta |
| BR-CART-15 | Na interface, o carrinho exibe o aviso "Preço alterado (era R$ X)" nos itens com `priceChanged`, e a revisão do checkout exibe aviso com preço anterior e atual. O valor cobrado é sempre o preço **atual**. | Média |
| BR-CART-12 | Na interface, se qualquer item tiver `available = false`, o avanço para o checkout fica bloqueado. | Média |
| BR-CART-13 | Papel `ADMIN` ou visitante não acessam o carrinho: sem token → `401`; ADMIN → `403 FORBIDDEN`. | Alta |

### 5.4 Checkout — cotação, preço e frete (PRICE)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-PRICE-01 | A cotação (`POST /checkout/quote`) calcula subtotal, desconto, frete e total **sem criar pedido** e sem alterar estoque/carrinho. | Alta |
| BR-PRICE-02 | **Total = subtotal − desconto + frete**, arredondado a 2 casas. | Alta |
| BR-PRICE-03 | Frete padrão: **R$ 15,00**. | Alta |
| BR-PRICE-04 | Frete **grátis** quando o subtotal (antes do desconto) for **> R$ 200,00**. Subtotal = R$ 200,00 **ainda paga** frete; R$ 200,01 não paga. | Alta |
| BR-PRICE-05 | O limite de frete grátis é avaliado sobre o subtotal **antes** do desconto: com `PROMO10`, subtotal R$ 210,00 → desconto R$ 21,00, frete R$ 0,00, total R$ 189,00. | Alta |
| BR-PRICE-06 | Cupom `PROMO10`: desconto = 10% do subtotal (2 casas). Não altera o frete (que segue BR-PRICE-03/04). | Alta |
| BR-PRICE-07 | Cupom `FRETEGRATIS`: frete = R$ 0,00 independentemente do subtotal; desconto = 0. | Alta |
| BR-PRICE-08 | Somente **um** cupom por compra. Os cupons não se acumulam. | Média |
| BR-PRICE-09 | O código do cupom é normalizado (espaços nas pontas removidos, maiúsculas): `promo10` e ` PROMO10 ` equivalem a `PROMO10`. Cupom vazio/em branco é ignorado (sem erro, sem desconto). | Média |
| BR-PRICE-10 | Cupom desconhecido → `422 INVALID_COUPON`; **nenhum** pedido é criado. Cupom com mais de 30 caracteres → `VALIDATION_ERROR`. | Alta |
| BR-PRICE-11 | Cotação ou pedido com carrinho vazio → `422 CART_EMPTY`. | Alta |
| BR-PRICE-13 | A cotação **valida estoque**: se algum item estiver inativo ou com estoque menor que a quantidade, responde `409 OUT_OF_STOCK` com os itens problemáticos em `details` (`productId`, `name`, `available`, `requested`) e não calcula valores. A checagem de estoque ocorre antes da validação do cupom: carrinho indisponível + cupom inválido → `OUT_OF_STOCK`. | Alta |
| BR-PRICE-14 | A cotação devolve `hasPriceChanges` (ver BR-CART-14). | Média |
| BR-PRICE-12 | Valores monetários têm 2 casas decimais, arredondadas no backend. Na interface são exibidos em pt-BR (`R$ 1.234,56`). | Média |

Exemplos de cálculo (úteis como oráculo de teste):

| Subtotal | Cupom | Desconto | Frete | Total |
| -------- | ----- | -------- | ----- | ----- |
| 79,90 | — | 0,00 | 15,00 | 94,90 |
| 79,90 | `PROMO10` | 7,99 | 15,00 | 86,91 |
| 79,90 | `FRETEGRATIS` | 0,00 | 0,00 | 79,90 |
| 200,00 | — | 0,00 | 15,00 | 215,00 |
| 200,01 | — | 0,00 | 0,00 | 200,01 |
| 210,00 | `PROMO10` | 21,00 | 0,00 | 189,00 |
| 100,00 | `PROMO10` | 10,00 | 15,00 | 105,00 |

### 5.5 Checkout — endereço e pagamento (PAY)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-PAY-01 | O fluxo de checkout na interface tem 4 etapas ordenadas: **1. Revisão** → **2. Endereço** → **3. Pagamento** → **4. Confirmação**. Não é possível pular etapas; é possível voltar. | Média |
| BR-PAY-02 | Endereço — obrigatórios: rua (2–150), número (1–10), bairro (2–100), cidade (2–100), UF (exatamente 2 letras, normalizada para maiúsculas), CEP (`00000-000` ou `00000000`). Complemento é opcional (até 100). Campos da API: `address.{street, number, complement, district, city, state, zip}`; pagamento: `payment.{method, cardNumber, cardHolder}`; cupom: `couponCode`. | Alta |
| BR-PAY-03 | CEP fora do padrão (ex.: `1234-567`, `abcde-fgh`) → `VALIDATION_ERROR` no campo `zip`. | Média |
| BR-PAY-04 | Métodos de pagamento aceitos: `CREDIT_CARD`, `PIX`, `BOLETO`. Outro valor → `VALIDATION_ERROR`. | Alta |
| BR-PAY-05 | Cartão de crédito exige número com **13 a 19 dígitos**; espaços e hífens são aceitos e ignorados na contagem. Nome no cartão é opcional (2–100 se informado). PIX e boleto não exigem dados adicionais. | Alta |
| BR-PAY-06 | Pagamento **simulado e determinístico**, decidido pelos 4 últimos dígitos do cartão: `0000` → aprovado; `1111` → recusado; `2222` → serviço indisponível; qualquer outro final → aprovado. | Alta |
| BR-PAY-07 | PIX e boleto são **sempre aprovados**. | Alta |
| BR-PAY-08 | Do cartão, somente os 4 últimos dígitos são persistidos (`cardLast4`); para PIX/boleto `cardLast4 = null`. O número completo nunca é salvo nem retornado. | Alta |

### 5.6 Pedidos (ORD)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-ORD-01 | Para confirmar o pedido são necessários: carrinho não vazio, endereço válido e pagamento válido (cupom opcional). Validações de entrada falham com `400` antes de qualquer efeito. | Alta |
| BR-ORD-02 | **Pagamento aprovado:** o pedido é criado com status `PAID`, o estoque de cada item é baixado, o carrinho é limpo e a resposta é `201` com o pedido completo. | Alta |
| BR-ORD-03 | A baixa de estoque, a criação do pedido e a limpeza do carrinho ocorrem em **uma única transação (tudo ou nada)**. | Alta |
| BR-ORD-04 | Cada baixa de estoque gera uma movimentação `EXIT` com motivo `Pedido #<id>` e usuário = cliente. | Alta |
| BR-ORD-05 | Se, no momento da confirmação, **qualquer** item não tiver estoque suficiente (ou o produto estiver inativo), o pedido inteiro falha com `409 OUT_OF_STOCK`, os itens problemáticos vêm em `details` (`productId`, `name`, `available`, `requested`) e **nenhum** pedido é criado, **nenhum** estoque é alterado e o carrinho permanece. A checagem ocorre **antes** do processamento do pagamento: com itens sem estoque, qualquer cartão (inclusive `1111` e `2222`) resulta em `OUT_OF_STOCK` e **não** gera pedido `PAYMENT_FAILED`. Checagem repetida dentro da transação cobre concorrência. | Alta |
| BR-ORD-06 | **Pagamento recusado** (cartão final `1111`, com estoque disponível): `422 PAYMENT_DECLINED`; é registrado um pedido `PAYMENT_FAILED`, cujo id vem em `error.details[0].orderId`; **estoque e carrinho permanecem intactos**. | Alta |
| BR-ORD-07 | **Pagamento indisponível** (cartão final `2222`): `503 PAYMENT_UNAVAILABLE`, com o mesmo tratamento de BR-ORD-06 (pedido `PAYMENT_FAILED`, estoque e carrinho intactos). O cliente pode tentar novamente com o mesmo carrinho. | Alta |
| BR-ORD-08 | O pedido guarda um **retrato (*snapshot*)** de cada item: nome e preço unitário no momento da compra. Alterações posteriores de preço/nome do produto **não** mudam pedidos existentes. | Alta |
| BR-ORD-09 | O pedido guarda subtotal, desconto, frete, total, cupom aplicado (`couponCode`, normalizado; `null` quando nenhum cupom foi informado ou o cupom era vazio/em branco), método de pagamento, `cardLast4` e endereço, conforme calculado na confirmação. | Alta |
| BR-ORD-10 | O cliente lista **apenas os próprios pedidos**, do mais recente ao mais antigo (desempate por `id` decrescente), com filtro opcional por `status` e paginação. `status` fora do domínio → `VALIDATION_ERROR`. | Média |
| BR-ORD-11 | O cliente só acessa o detalhe do **próprio** pedido. Pedido inexistente **ou de outro cliente** → `404 ORDER_NOT_FOUND` (não revelar a existência). | Alta |
| BR-ORD-12 | **Cancelamento:** somente pedidos `PAID`. Pode ser feito pelo **dono** (rota de cliente `POST /orders/:id/cancel`) ou por um **ADMIN** (somente pela rota administrativa `POST /admin/orders/:id/cancel`; ADMIN na rota de cliente → `403 FORBIDDEN`). O pedido passa a `CANCELLED`. | Alta |
| BR-ORD-13 | O cancelamento **devolve o estoque**: uma movimentação `ENTRY` por item, com motivo `Cancelamento do pedido #<id>` e usuário = quem cancelou; alteração do pedido e devolução ocorrem na mesma transação. | Alta |
| BR-ORD-14 | Cancelar pedido que **não** está `PAID` (`CANCELLED`, `PAYMENT_FAILED`, `PENDING`) → `409 INVALID_ORDER_STATE`. Cancelar duas vezes devolve o estoque **uma única vez**. | Alta |
| BR-ORD-15 | Cliente tentando cancelar pedido de outro cliente → `404 ORDER_NOT_FOUND` e o pedido não é alterado. | Alta |
| BR-ORD-16 | Pedidos `PAYMENT_FAILED` e `CANCELLED` são mantidos no histórico; nenhum pedido é excluído. | Média |
| BR-ORD-17 | O status `PENDING` existe no modelo mas **nenhum fluxo atual o produz** (o pagamento simulado resolve de imediato). | Baixa |

### 5.7 Administração de produtos (PROD)

Todas as regras desta seção exigem `ADMIN` (ver [8. Matriz de acesso](#8-matriz-de-acesso)).

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-PROD-01 | Nome: 3 a 100 caracteres (após *trim*). | Média |
| BR-PROD-02 | Preço: número **> 0**, **≤ 1.000.000** e com **no máximo 2 casas decimais**. `0`, negativo, `10.999`, texto → `VALIDATION_ERROR`. | Alta |
| BR-PROD-03 | SKU: obrigatório, 1 a 50 caracteres, **único**. Duplicado na criação ou edição → `409 SKU_ALREADY_EXISTS`. Editar um produto mantendo o próprio SKU é permitido. | Alta |
| BR-PROD-04 | Categoria obrigatória (1–50). Descrição opcional (até 1000; padrão vazio). URL da imagem opcional (até 500; padrão vazio). `active` padrão `true`. | Média |
| BR-PROD-05 | Estoque inicial na criação: inteiro **≥ 0** (padrão 0). Se > 0, gera automaticamente uma movimentação `ENTRY` com motivo `Estoque inicial`. | Alta |
| BR-PROD-06 | A edição (`PUT`) **não altera o estoque**: qualquer campo `stock` enviado é ignorado. O estoque só muda pelos endpoints de estoque (e por pedidos/cancelamentos). | Alta |
| BR-PROD-07 | Remover um produto é *soft delete* (`active = false`): o produto some da vitrine, não entra no carrinho, mas continua visível para o ADMIN e preservado em pedidos antigos. A operação é **idempotente** (`204` mesmo se já inativo). | Alta |
| BR-PROD-08 | A listagem admin inclui produtos inativos e aceita o filtro `active=true\|false`, além de busca, categoria, ordenação e paginação. | Média |
| BR-PROD-09 | Produto inexistente em detalhe/edição/remoção → `404 PRODUCT_NOT_FOUND`. | Média |
| BR-PROD-10 | Um produto inativo pode ser reativado via edição (`active = true`). | Média |
| BR-PROD-11 | Na interface, a remoção de produto exige confirmação explícita; o campo de estoque no formulário de edição fica desabilitado. | Baixa |

### 5.8 Estoque (STK)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-STK-01 | Tipos de movimentação: `ENTRY` (soma), `EXIT` (subtrai), `ADJUSTMENT` (define o **novo valor absoluto**). | Alta |
| BR-STK-02 | `ENTRY` e `EXIT` exigem quantidade inteira **> 0**. `ADJUSTMENT` exige inteiro **≥ 0** (ajustar para 0 é permitido). | Alta |
| BR-STK-03 | O estoque **nunca fica negativo**. `EXIT` maior que o estoque → `409 INSUFFICIENT_STOCK`; `EXIT` igual ao estoque é permitido (resulta em 0). `ADJUSTMENT` negativo → `400 VALIDATION_ERROR` no campo `quantity` (ver BR-STK-02). Em ambos os erros o estoque permanece inalterado e nenhuma movimentação é gravada. | Alta |
| BR-STK-04 | Motivo é obrigatório: 3 a 200 caracteres. | Média |
| BR-STK-05 | Toda alteração de estoque (manual, criação de produto, pedido, cancelamento) grava uma movimentação com: produto, tipo, quantidade, motivo, usuário, data, **estoque anterior** e **novo estoque**. | Alta |
| BR-STK-06 | Para `ADJUSTMENT`, `quantity` registra o novo valor absoluto informado; `previousStock` e `newStock` permitem calcular a diferença. | Média |
| BR-STK-07 | Se o estoque for alterado por outra operação concorrente durante a transação, a operação falha com `409 STOCK_CONFLICT` (nova tentativa é segura) e nada é gravado. | Média |
| BR-STK-08 | O histórico de movimentações é listado do mais recente ao mais antigo, com filtros opcionais por `productId`, `type` e `search` (nome do produto) e paginação; cada item traz produto (`id`, `name`, `sku`) e usuário (`id`, `name`). | Média |
| BR-STK-09 | Movimentação em produto inexistente → `404 PRODUCT_NOT_FOUND`. | Média |
| BR-STK-10 | "Estoque baixo" é estoque **< 5** (4 é baixo, 5 não é). Aplicado ao selo da lista administrativa, ao campo `lowStock` e ao indicador do painel. | Média |

### 5.9 Painel administrativo (DASH)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-DASH-01 | `totalProducts` = quantidade de produtos **ativos**; `inactiveProducts` = quantidade de produtos inativos. | Média |
| BR-DASH-02 | `lowStockProducts` = produtos **ativos** com estoque < 5 (**inclui** os de estoque 0); `outOfStockProducts` = produtos ativos com estoque = 0. | Média |
| BR-DASH-03 | `totalOrders` = todos os pedidos, de qualquer status. | Média |
| BR-DASH-04 | `ordersByStatus` traz sempre as 4 chaves (`PENDING`, `PAID`, `PAYMENT_FAILED`, `CANCELLED`), com 0 quando não há pedidos naquele status; a soma dos valores é igual a `totalOrders`. | Média |

### 5.10 Administração de pedidos (AORD)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-AORD-01 | O ADMIN lista **todos** os pedidos (mais recentes primeiro), com filtro por `status` e paginação; cada pedido inclui dados do cliente (`id`, `name`, `email`). | Média |
| BR-AORD-02 | O ADMIN acessa o detalhe de qualquer pedido; inexistente → `404 ORDER_NOT_FOUND`. | Média |
| BR-AORD-03 | O ADMIN pode cancelar qualquer pedido `PAID`, com os mesmos efeitos de BR-ORD-12 a BR-ORD-14 (movimentação `ENTRY` registrada em nome do ADMIN). | Alta |
| BR-AORD-04 | Na interface, o cancelamento de pedido exige confirmação explícita (confirmar/abortar). | Baixa |

### 5.11 Validação e formato de resposta (GEN)

| ID | Regra | Prio. |
| -- | ----- | ----- |
| BR-GEN-01 | Entrada inválida (corpo, query ou parâmetro) → `400 VALIDATION_ERROR` com `details: [{ field, message }]` identificando cada campo. Nenhum efeito colateral ocorre. | Alta |
| BR-GEN-02 | JSON malformado → `400 INVALID_JSON`. | Baixa |
| BR-GEN-03 | Todo erro tem o formato `{ error: { code, message, details } }`. O `code` é estável (contrato). | Alta |
| BR-GEN-04 | Rota inexistente → `404 ROUTE_NOT_FOUND`. | Baixa |
| BR-GEN-05 | Identificador de recurso na URL deve ser inteiro positivo; caso contrário `VALIDATION_ERROR`. | Baixa |
| BR-GEN-06 | Ordem de checagem de acesso: primeiro autenticação (`401`), depois papel (`403`), depois validação de entrada (`400`), depois regras de negócio (`404/409/422`). | Média |

---

## 6. Máquina de estados do pedido

| De \ Para | `PAID` | `PAYMENT_FAILED` | `CANCELLED` | `PENDING` |
| --------- | ------ | ---------------- | ----------- | --------- |
| *(criação)* | Pagamento aprovado e estoque suficiente | Pagamento recusado (`1111`) ou indisponível (`2222`) | — | Não ocorre (BR-ORD-17) |
| `PAID` | — | — | Cancelamento por dono/ADMIN | — |
| `PAYMENT_FAILED` | — | — | **Proibido** (`INVALID_ORDER_STATE`) | — |
| `CANCELLED` | — | — | **Proibido** (`INVALID_ORDER_STATE`) | — |

Estados terminais: `PAYMENT_FAILED` e `CANCELLED`. Efeitos por transição:

| Transição | Estoque | Carrinho | Movimentação |
| --------- | ------- | -------- | ------------ |
| criação → `PAID` | Baixa de cada item | Limpo | `EXIT` por item |
| criação → `PAYMENT_FAILED` | Inalterado | Inalterado | Nenhuma |
| `PAID` → `CANCELLED` | Devolvido por item | — | `ENTRY` por item |

---

## 7. Catálogo de erros de negócio

| HTTP | `code` | Regras relacionadas |
| ---- | ------ | ------------------- |
| 400 | `VALIDATION_ERROR` | BR-GEN-01 e todas as validações de campo |
| 400 | `INVALID_JSON` | BR-GEN-02 |
| 401 | `UNAUTHORIZED` | BR-AUTH-11 |
| 401 | `TOKEN_EXPIRED` | BR-AUTH-11 |
| 401 | `INVALID_TOKEN` | BR-AUTH-11 |
| 401 | `INVALID_CREDENTIALS` | BR-AUTH-09 |
| 403 | `FORBIDDEN` | Matriz de acesso (seção 8) |
| 404 | `PRODUCT_NOT_FOUND` | BR-SHOP-02, BR-CART-06/07, BR-PROD-09, BR-STK-09 |
| 404 | `CART_ITEM_NOT_FOUND` | BR-CART-07/08 |
| 404 | `ORDER_NOT_FOUND` | BR-ORD-11/15, BR-AORD-02 |
| 404 | `ROUTE_NOT_FOUND` | BR-GEN-04 |
| 409 | `EMAIL_ALREADY_EXISTS` | BR-AUTH-04 |
| 409 | `SKU_ALREADY_EXISTS` | BR-PROD-03 |
| 409 | `OUT_OF_STOCK` | BR-CART-05, BR-PRICE-13, BR-ORD-05 |
| 409 | `INSUFFICIENT_STOCK` | BR-CART-05, BR-STK-03 |
| 409 | `STOCK_CONFLICT` | BR-STK-07 |
| 409 | `INVALID_ORDER_STATE` | BR-ORD-14 |
| 422 | `CART_EMPTY` | BR-PRICE-11 |
| 422 | `INVALID_COUPON` | BR-PRICE-10 |
| 422 | `PAYMENT_DECLINED` | BR-ORD-06 |
| 503 | `PAYMENT_UNAVAILABLE` | BR-ORD-07 |

---

## 8. Matriz de acesso

Legenda: ✅ permitido · 🔒 `401` (sem token / token inválido) · ⛔ `403 FORBIDDEN`

| Recurso | Visitante | CUSTOMER | ADMIN |
| ------- | :-------: | :------: | :---: |
| Vitrine: listar, detalhe, categorias | ✅ | ✅ | ✅ |
| Cadastro e login | ✅ | ✅ | ✅ |
| `GET /auth/me`, `POST /auth/logout` | 🔒 | ✅ | ✅ |
| Carrinho (todas as operações) | 🔒 | ✅ | ⛔ |
| Cotação de checkout | 🔒 | ✅ | ⛔ |
| Criar / listar / detalhar / cancelar **próprios** pedidos (rotas de cliente `/orders*`) | 🔒 | ✅ | ⛔ |
| `/admin/products` (CRUD) | 🔒 | ⛔ | ✅ |
| `/admin/products/:id/stock` e `/admin/stock/movements` | 🔒 | ⛔ | ✅ |
| `/admin/orders` (listar, detalhar, cancelar qualquer pedido `PAID`) | 🔒 | ⛔ | ✅ |
| `/admin/dashboard` | 🔒 | ⛔ | ✅ |

Na interface: páginas de cliente (`/cart`, `/checkout`, `/orders*`) exigem `CUSTOMER`; páginas `/admin*` exigem `ADMIN`;
visitante é redirecionado ao login; perfil errado vê "Acesso negado"; rota inexistente exibe "Página não encontrada".

---

## 9. Rastreabilidade para testes

Sugestão de uso: cada *acceptance criterion* referencia um ou mais IDs de regra, e cada *test case* referencia o
critério. Agrupamento sugerido por funcionalidade:

| Funcionalidade | Regras | Foco de risco |
| -------------- | ------ | ------------- |
| Cadastro e sessão | BR-AUTH-01 a 15 | Segurança, unicidade de e-mail, expiração |
| Navegação no catálogo | BR-SHOP-01 a 09 | Filtros, paginação, visibilidade de inativos |
| Carrinho | BR-CART-01 a 13 | Limite de estoque, soma de quantidades |
| Cotação e preço | BR-PRICE-01 a 12 | Valores-limite de frete (200,00 / 200,01), cupons |
| Pagamento e pedido | BR-PAY-01 a 08, BR-ORD-01 a 09 | Cartões `0000/1111/2222`, atomicidade, *snapshot* |
| Consulta e cancelamento de pedidos | BR-ORD-10 a 17, BR-AORD-01 a 04 | Isolamento entre clientes, estoque devolvido uma vez |
| Produtos (admin) | BR-PROD-01 a 11 | Limites de campos, SKU único, *soft delete* |
| Estoque (admin) | BR-STK-01 a 10 | Estoque nunca negativo, histórico completo |
| Painel | BR-DASH-01 a 04 | Consistência entre contadores |
| Autorização | Seção 8, BR-GEN-06 | Ordem 401 → 403 → 400 |

Dados de seed determinísticos para os testes (após `POST /api/test/reset`):

| ID | SKU | Uso |
| -- | --- | --- |
| 4 | `ELE-004` — Mouse Sem Fio, R$ 79,90, estoque 120 | Cálculo de totais |
| 7 | `ELE-007` — estoque 0 | Indisponível / `OUT_OF_STOCK` |
| 10 | `LIV-003` — estoque 1 | Limite de quantidade |
| 17 | `ROU-003` — estoque 3 | Estoque baixo |
| 28 | `CAS-007` — nome com 100 caracteres | Limite de nome |
| 29 | `CAS-008` — inativo | Produto fora da vitrine |

---

### Camada de teste de cenários não reproduzíveis pela API

Alguns comportamentos não têm gatilho determinístico via API e são verificados em **teste de serviço/integração** (ver `stock.service.test.ts`, `cart.service.test.ts`), não em teste ponta a ponta: conflito de concorrência (BR-STK-07), atomicidade sob falha induzida (BR-ORD-03, BR-ORD-13) e cancelamento de pedido `PENDING` (BR-ORD-14, que exige inserir o pedido direto no banco). Pela API, a atomicidade é verificada pelo efeito observável (BR-ORD-05/06/07) e `PENDING` pela ausência (BR-ORD-17).

## 10. Pontos em aberto

> Resolvidos e movidos para regras: PA-01 (BR-ORD-05), PA-02 (BR-PRICE-13), PA-03 (BR-CART-14/15) e PA-06 (BR-AUTH-10).

Comportamentos que o código **não define** ou define de forma que merece decisão de negócio antes de virar critério de
aceite. Não foram transformados em regra.

| # | Ponto | Situação atual observada |
| - | ----- | ------------------------ |
| PA-04 | Pedido `PAYMENT_FAILED` | Não pode ser reprocessado nem cancelado; o cliente precisa criar novo pedido. Não há regra de expiração/limpeza. |
| PA-05 | Busca por nome | A sensibilidade a maiúsculas/minúsculas e a acentos depende do banco (SQLite) e não é uma regra explícita. |
| PA-07 | Cancelamento por cliente | Não há prazo limite nem motivo obrigatório; sem reembolso modelado. |
| PA-08 | Produto desativado com pedidos/carrinhos existentes | Permanece nos pedidos antigos; nos carrinhos fica `available = false` e bloqueia o checkout até ser removido. |
| PA-09 | Criação de ADMIN | Só via seed; não existe fluxo de negócio para promover/criar administradores. |
| PA-10 | Limite de quantidade total por item | A quantidade por operação é ≤ 999, mas o total acumulado é limitado apenas pelo estoque. |

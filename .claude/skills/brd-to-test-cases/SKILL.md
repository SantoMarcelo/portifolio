---
name: brd-to-test-cases
description: Use when the user asks to generate acceptance criteria, create test cases from a BRD, analyze a BRD, or says "gerar critérios de aceite", "criar casos de teste a partir do BRD", "analisar o BRD", "Gherkin", "Given/When/Then" from business requirements documents.
---

# BRD → Acceptance Criteria → Casos de Teste

Gera **somente documentação** a partir de BRDs, em duas fases separadas por um **gate de validação humana**. Escreva em português do Brasil; mantenha `Given/When/Then/And/But` em inglês. Não escreva código de teste automatizado a menos que o usuário peça depois.

**Violar a letra destas regras é violar o espírito delas.**

## Fontes

- BRD padrão: `docs/BRD.md`. Se o usuário informar outro caminho, use-o.
- Se houver mais de um BRD candidato (ex.: vários `.md` em `docs/` com cara de BRD) e o usuário não indicou qual, **pergunte qual usar** antes de ler/gerar.
- Use o código existente **apenas** para conferir nomes de endpoints/campos. Não crie requisitos a partir dele nem do seu conhecimento prévio.
- `<nome-do-brd>` = nome do arquivo sem extensão (`docs/BRD.md` → `BRD`).

## Fase 1 — Acceptance Criteria

1. Leia o BRD **inteiro** (use `offset`/`limit` se for grande; não pare na metade).
2. Extraia requisitos, regras de negócio, fluxos, restrições, constantes/valores-limite, máquina de estados, matriz de acesso e erros. **Reaproveite os IDs do BRD** (ex.: `BR-CART-05`); se não houver, atribua (`RF-01`, `RN-02`).
3. Para **cada** requisito/regra, escreva ≥ 1 AC em Gherkin, com ID `AC-<ID do requisito>-<nn>` (ex.: `AC-BR-CART-05-01`). Regras com vários comportamentos/valores-limite geram vários ACs.
4. Cada AC deve ser **atômico** (um comportamento), **verificável** (resultado observável: status, `code`, campo, valor) e **sem ambiguidade** (valores concretos do BRD, não "um valor inválido").
5. Não invente regras. Pontos em aberto do BRD, lacunas, contradições e suposições vão em seção própria como **"Pergunta em aberto"** (com ID `PA-xx`/`Q-xx`, origem e impacto). Não gere AC para algo indefinido; liste-o como pergunta (pode registrar o comportamento atual observado, marcado como não-contratual).
6. Itens de interface (`BR-*` que falam de tela) também ganham AC; marque a camada no título: `[UI]` (sem marca = API).
7. Seções transversais (matriz de acesso, máquina de estados, erros) ganham IDs próprios (`AC-ACL-nn`, `AC-FSM-nn`). Regra sem comportamento verificável (ex.: "X nunca ocorre") recebe AC que verifica a ausência, ou vira pergunta em aberto.
8. Perguntas novas usam `Q-nn`; as do BRD mantêm o ID original (`PA-xx`). Dado de teste que o BRD não fornece: "a definir".
9. Verbos/paths: o BRD pode não trazê-los. **Confira no código** (`backend/src/modules/*/*.routes.ts`, prefixo em `app.ts`) antes de citar; nunca use path "ilustrativo" não verificado.
10. Granularidade: 1 AC por comportamento distinto e 1 por valor-limite explícito do BRD (ex.: 7/8/72/73 caracteres → ACs separados ou um AC com `Scenario Outline` + `Examples`).
11. Escreva o resumo (contagens) por último e confira com `grep`: nº de IDs `BR-*` do BRD = nº de IDs cobertos.
12. Salve em `docs/acceptance-criteria/<nome-do-brd>.md` (crie a pasta se preciso).

### Formato do arquivo de ACs

```markdown
# Acceptance Criteria — <produto> (<arquivo do BRD>)
Status: ⏳ AGUARDANDO VALIDAÇÃO HUMANA   (versão N)

## Resumo  (nº de requisitos, nº de ACs, nº de perguntas em aberto)
## Convenções  (formato dos IDs, camada API/UI)
## <Domínio>
### BR-XXX-NN — <regra resumida>
**AC-BR-XXX-NN-01** — <título curto>
```gherkin
Given ...
When ...
Then ...
And ...
```
## Ambiguidades, lacunas e suposições
| ID | Tipo (Ambiguidade/Lacuna/Suposição) | Origem | Descrição | Impacto |
```

### Gate humano (obrigatório)

Ao terminar a Fase 1: informe arquivo criado, contagens, perguntas em aberto relevantes e **PARE**, pedindo explicitamente: **aprovar**, **ajustar** ou **rejeitar**.

- **Ajustar** → revise o arquivo, incremente a versão, peça validação de novo.
- **Rejeitar** → pergunte o que refazer.
- Aprovação só vale se for **clara** ("aprovado", "pode seguir"). Silêncio, "ok, mas…", dúvida ou resposta sobre outro assunto **não** são aprovação.
- Ao aprovar, atualize o `Status:` do arquivo para `✅ APROVADO por <usuário> em <data>`. As perguntas em aberto não resolvidas ficam sem casos de teste (registre isso).

## Fase 2 — Casos de teste (somente após aprovação)

**Pré-condição:** o arquivo de ACs existe **e** o usuário aprovou nesta conversa (ou o `Status:` está `APROVADO`). Caso contrário, volte à Fase 1/gate.

| Desculpa | Realidade |
|---|---|
| "O usuário pediu 'gere tudo de uma vez'" | Gere/mostre a Fase 1, pare no gate. Pedido antecipado não é aprovação dos ACs. |
| "Os ACs são óbvios/derivados do BRD" | Quem valida é o humano. |
| "Já tem arquivo de ACs no disco" | Sem `APROVADO` no Status e sem confirmação, não vale. |
| "Vou gerar um rascunho dos TCs só para adiantar" | Também proibido. |

1. Para **cada** AC aprovado, gere casos dos **três** tipos:
   - **Positivo** — fluxo feliz, dados válidos.
   - **Negativo** — dados inválidos, campos ausentes, permissão insuficiente, violação de regra, erro esperado (use `code`/HTTP do BRD).
   - **Edge** — limites (mín/máx, ±1), vazio/nulo, tamanho máximo, unicode/especiais, concorrência, duplicidade, estado inesperado, limites de estoque/quantidade/expiração.
2. **Nenhum AC sem os três tipos.** Se um tipo não se aplica, escreva a justificativa explícita na matriz (ex.: "Edge: N/A — AC sem valor-limite, pois …"). Não omita em silêncio.
3. Cada TC contém: **ID** (`TC-001`, sequencial), **AC/requisito**, **Tipo**, **Título**, **Pré-condições**, **Passos**, **Dados de teste** (valores concretos; use os dados de seed/oráculos do BRD quando houver), **Resultado esperado** (observável) e **Prioridade** (Alta/Média/Baixa — herde a do BRD quando existir).
4. Inclua **matriz de rastreabilidade** (Requisito → AC → TCs) e **resumo** com contagem por tipo (e por prioridade).
5. Salve em `docs/test-cases/<nome-do-brd>.md`.
6. Dados de teste vêm do BRD; não invente valores de negócio. Se precisar de dado que o BRD não fornece, marque como "a definir".

Formato de cada TC (tabela ou bloco; seja consistente):

```markdown
#### TC-014 · Negativo · AC-BR-CART-05-01 (BR-CART-05) · Prioridade: Alta
**Título:** ...
**Pré-condições:** ...
**Passos:** 1. ... 2. ...
**Dados de teste:** ...
**Resultado esperado:** ...
```

## Fim de cada fase

Informe: arquivos criados/alterados (com caminho) e **o que falta** (Fase 1 → validação humana e Fase 2; Fase 2 → perguntas em aberto sem cobertura, itens "a definir").

## Erros comuns

- Parar de ler o BRD antes do fim → requisitos sem AC. Confira a contagem de regras do BRD × ACs.
- AC com vários `Then` de comportamentos distintos → quebre em ACs atômicos.
- Resolver ambiguidade "por bom senso" em vez de registrar pergunta.
- TCs sem rastreio ao AC ou sem os três tipos.

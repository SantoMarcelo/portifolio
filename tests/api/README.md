# API Automation Template

Reusable API test automation framework built with **TypeScript, Jest, Zod and Axios**, with optional **Artillery** load tests. It contains the shared structure only — no business code — plus the `auth` domain.

## What is included

| Area | Where | What it gives you |
|---|---|---|
| HTTP layer | `src/shared/http-client-adapter.ts` | Axios wrapper with Bearer-token injection, optional mTLS and error logging |
| Auth | `src/domain/auth/`, `src/global-setup.ts`, `src/shared/auth-session-cache.ts` | Login via `POST /auth/login` (JWT Bearer token), done **once** per run and cached for Jest workers |
| Validation | `src/shared/schema-validator-adapter.ts` | Zod-based contract validation |
| Helpers | `src/shared/helpers.ts` | Excel writer, FormData upload, endpoint builder, dated helpers, `saveFileIfEnabled` |
| Endpoints | `src/shared/endpoints.ts` | Enums — the only place URL paths live |
| Test generator | `src/cli.ts`, `swagger.yaml` | `npm run generate:tests` scaffolds specs from a swagger file |
| Load tests | `src/load-tests/` | HTML report generator for Artillery runs |
| CI | `rio.yaml`, `scripts/` | RIO pipeline, branch checkout, env setup, manual trigger |
| Tooling | `.husky/`, `.cz-config.js`, eslint, prettier | Commitizen commits, lint-staged, push-to-main guard |
| AI assistance | `.claude/`, `CLAUDE.md` | Scoped rules, test-writer agent and skills |

## Project structure

```
├── src/
│   ├── config/config.ts          # baseURL, token, optional certs (from .env)
│   ├── global-setup.ts           # Jest globalSetup: pre-authenticates every account
│   ├── cli.ts                    # swagger → test scaffolds
│   ├── domain/
│   │   ├── auth/auth-api.ts      # login flow
│   ├── fixtures/                 # users/, files
│   ├── shared/                   # http, validation, endpoints, helpers
│   ├── load-tests/               # Artillery tests + report generator
│   └── tests/
│       └── auth/
├── jest.base.js / jest.*.js      # shared + per-type Jest configs
├── swagger.yaml                  # Loja QA API contract
├── rio.yaml, scripts/            # CI
└── .claude/                      # rules, agent, skills
```

## Getting started

Prerequisites: Node (see `.nvmrc`) and npm.

```bash
npm install
cp .env.example .env     # fill in BASE_URL and the test users
npm test                 # sequential run → reports/test-report.html
```

| Command | Description |
|---|---|
| `npm test` | All specs, `--runInBand` |
| `npm run test:contract` | Contract specs (concurrent) |
| `npm run test:functional` | `actions/` + `auth/` specs |
| `npm run test:document-files` | `download/` + `upload/` specs |
| `npm run generate:tests` | Generate scaffolds from `swagger.yaml` into `src/tests/generated` |
| `npm run report:load` | Build the HTML report from Artillery results |
| `npm run commit` | Commitizen commit |
| `npm run lint` / `lint:fix` / `format` | Quality tooling |
| `npm run pipeline:trigger` | Trigger the RIO pipeline |

Run a single spec: `npx jest src/tests/auth/login.spec.ts`

## Adopting the template in a new project

1. **Rename** — update `name` in `package.json`, the title of this README and `CLAUDE.md`.
2. **Environment** — fill `.env` from `.env.example`. Set `BASE_URL` and `API_BASE_PATH`. Leave `TLS_*` empty if you do not need mTLS.
3. **Auth** — `src/domain/auth/auth-api.ts` logs in through `POST /auth/login` (`AuthEndpoints.LOGIN`) with the user's e-mail and password and sends the returned JWT as `Authorization: Bearer`. Keep `loginAndGetToken` / `refreshSession` signatures stable.
4. **Users** — edit `src/fixtures/users/system-accounts.ts`, register each account in `ACCOUNTS` (`src/global-setup.ts`) and in `.env.example`.
5. **Swagger** — replace `swagger.yaml` with your API contract.
6. **First domain** — copy `src/domain/auth/` and `src/tests/auth/` and rename. Add its enum to `src/shared/endpoints.ts`.
7. **Entities** — fill `src/fixtures/entities/` with **real** records from your test environment (never invented IDs).
8. **Commit conventions** — in `.cz-config.js` set the `scopes` list and `ticketNumberPrefix`/`ticketNumberRegExp` for your tracker. The `.husky/pre-push` hook blocks pushes to `main`.
9. **CI** — in `scripts/rio-setup.sh` set the environment URLs; in `rio.yaml` list the secrets your project registers; set `RIO_PROJECT_ID`. Drop the CI files if you use another system.
10. **Load tests** — add an Artillery flow under `src/load-tests/`, or remove `src/load-tests/` and the `test:load:*` scripts if unused.
11. **Optional skills** — `.claude/skills-optional/` has tracker-specific skills; adapt before moving them to `.claude/skills/`.
12. Run `grep -rn "TODO(adopter)" .` to find the remaining placeholders.

## Conventions (summary)

- **Test types**: `contract/` (schema), `actions/` (CRUD/mutations), `download/` (exports), `upload/` (imports).
- **API classes** expose only static methods and call `HttpClientAdapter`; URLs come from endpoint enums.
- **REST mutation methods** use the `ByApi` suffix and return `ApiResponse<T>`.
- **Scope** (ids, owners, filters) is always a parameter — never hardcoded in API classes or factories.
- **Zod schemas** are self-contained; types are inferred with `schemaValidatorInfer`.
- **Error scenarios** use `try/catch` with a mandatory `fail(...)` guard, reading `error.response`.
- **No inline data logic in specs** (`find`/`filter`/`some`): put it in the API class.
- Full detail lives in `.claude/rules/` — it is the source of truth for these patterns.

## Security

`.env`, `Certs/` and `.auth-sessions.json` (cached session tokens) are gitignored — never commit them.

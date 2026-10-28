# API Automation Template

API test automation framework built with TypeScript, Jest, and Zod. This repository is a **template**: it contains the shared structure and the `auth` domain. Add new domains under `src/domain/` and `src/tests/`. See [README.md](README.md) for the adoption checklist.

## Rules

- **Never** use `git commit` directly — always use `npm run commit` (commitizen enforces the format)
- **Never** hardcode URL strings — use enums from `src/shared/endpoints.ts`
- **Never** instantiate API classes — all methods are static
- **Never** add `.env`, `Certs/` or `.auth-sessions.json` to git commits — they are gitignored for security reasons
- **Never** commit or push directly to `main` — always create a feature branch following the `task/{ticketId}-{description}` convention

## Essential Commands

```bash
npm test                  # All tests (sequential --runInBand) → reports/test-report.html
npm run test:contract     # Contract tests only (schema validation)
npm run test:functional   # Functional tests only (actions + auth)
npm run test:document-files # Download/upload tests
npm run generate:tests    # Generate test scaffolds from swagger.yaml
npm run commit            # Interactive commit with commitizen
npm run lint:fix          # Fix lint issues
npm run format            # Format code with Prettier
```

To run a specific test:
```bash
npx jest src/tests/auth/login.spec.ts
```

## Architecture

```
src/
├── config/config.ts          # Centralized config (baseURL, certs, token) — reads .env
├── global-setup.ts           # Jest globalSetup: logs every account in once and caches the tokens
├── domain/[feature]/         # Domain logic: *-api.ts, *-types.ts, factories/
├── fixtures/                 # Test data (entities/, users/, *-fixture-paths.ts, files)
├── shared/                   # Cross-cutting utilities (http, validation, endpoints, helpers)
├── load-tests/               # Artillery load tests + HTML report generator
└── tests/[feature]/          # Tests organized by feature and type
    ├── contract/             # Zod schema validation
    ├── actions/              # Functional CRUD / edition tests
    ├── download/             # Export/download tests
    └── upload/               # Import/upload tests
```

`src/domain/auth/` and `src/tests/auth/` are the reference implementation — copy them when creating a new feature.

## Code Patterns

### Authentication Flow
`POST /auth/login` with `{ email, password }` returns a JWT (`token`, 24h). No UI login.
- `AuthApi.loginAndGetToken(credentials)` returns the token cached by `global-setup.ts` (or logs in on demand)
- The token is injected globally via `HttpClientAdapter` as `Authorization: Bearer` through `config.token`
- Auth failures (401) usually mean a wrong `BASE_URL`/`API_BASE_PATH`, wrong credentials in `.env`, or an expired token (call `AuthApi.refreshSession`)

### Scoped Rules (`.claude/rules/`)
Detailed rules are organized by scope and loaded automatically when working with matching files:
- [`domain.md`](.claude/rules/domain.md) — API classes, factories, fixtures, entities (`src/domain/**`, `src/fixtures/**`)
- [`testing.md`](.claude/rules/testing.md) — test taxonomy, patterns, error handling (`src/tests/**/*.spec.ts`)
- [`shared.md`](.claude/rules/shared.md) — HTTP client, endpoints enum, helpers (`src/shared/**`)

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Files | kebab-case | `auth-api.ts` |
| Classes | PascalCase + suffix | `AuthApi`, `ExportPayloadFactory` |
| Methods | camelCase | `searchItems` |
| Constants | UPPER_SNAKE_CASE | `ADMIN_ROLES` |
| Endpoints | Enum in `shared/endpoints.ts` — never hardcode URL strings |

## Git and Commits

**Required format:**
```
{emoji} {type}({scope}): {ticketPrefix}{id} {description}
```

Use `npm run commit` (commitizen) to ensure the correct format. The ticket ID comes from the branch name (`task/{id}-*`). Types, scopes and the ticket prefix are configured in `.cz-config.js`.

| Emoji | Type | When to use |
|---|---|---|
| `✅` | `test` | Adding or updating test cases |
| `🐛` | `bugfix` | Fixing a bug |
| `♻️` | `refactor` | Code restructuring without behavior change |
| `🤖` | `chore` | Auxiliary tooling changes |
| `✨` | `feat` | New feature |
| `📝` | `docs` | Documentation changes |
| `💄` | `style` | Formatting, whitespace, missing semicolons |
| `⚡` | `perf` | Performance improvements |
| `🛠️` | `build` | CI processes, deploy YAMLs |
| `🏹` | `release` | Release commits |

## Environment

Copy `.env.example` to `.env` and fill in `BASE_URL`, and the per-user credentials (`*_USER_USERNAME` = login e-mail, `*_USER_PASSWORD`).
- `SAVE_TEST_OUTPUT=true` — saves downloaded files to `temp/` (useful for debugging)
- `TLS_*_PATH` — optional mTLS certificates (keep them in `Certs/`, not versioned)

## Available Skills

- `/api-tc-generator` — Generates types, schemas, factories, and API methods from `swagger.yaml` for a module
- `/artillery-test-generator` — Generates an Artillery load test for a domain
- `/load-test-reporter` — Runs load tests and builds a consolidated HTML report
- `/git-publish-changes` — Creates commit, pushes, and opens a PR
- Optional tracker-specific skills live in `.claude/skills-optional/` (adapt before enabling)

## Adding New Tests

> **Before starting:** Ask the user:
> 1. _"Is the `swagger.yaml` file up to date with the latest API changes?"_ — if no, stop and ask them to update it first. The swagger drives types, schemas, factory payloads, and endpoint enums.
> 2. _"Which entities from `src/fixtures/entities/` should be used in the factory payloads and as scope parameters for the API methods?"_ — read the relevant entity files and present the available options before writing any factory method or API search method. Never invent or assume IDs.
>    - **Scope parameters** (owner, category, site, ids…) must always be passed explicitly by the test — never hardcoded inside domain API methods.

1. Add new endpoints in `src/shared/endpoints.ts`
2. Create types and Zod schemas in `src/domain/[feature]/[feature]-types.ts`
3. Create (or reuse) the API class in `src/domain/[feature]/[feature]-api.ts`
4. Create a factory in `src/domain/[feature]/factories/`
5. Create spec in `src/tests/[feature]/[contract|actions|download|upload]/[role]-[action].spec.ts`
6. Add user credentials in `fixtures/users/` (and `src/global-setup.ts`, `.env.example`) if needed

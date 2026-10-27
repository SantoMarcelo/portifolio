#!/usr/bin/env bash
#| Trigger the api-tests RIO pipeline for this project.
#|
#| USAGE:
#|   scripts/trigger-pipeline.sh [--branch <branch>] [--env dev|qa|uat]
#|   scripts/trigger-pipeline.sh --list
#|
#| OPTIONS:
#|   --branch <branch>   Branch the pipeline should run against.
#|                       Sent as the BRANCH build parameter.
#|                       Defaults to the current git branch.
#|   --env dev|qa|uat    Target environment. Sent as the env build parameter.
#|                       Defaults to dev.
#|   --list              List the project's pipeline specs and exit.
#|   -h | --help         Show this help and exit.
#|
#| EXAMPLES:
#|   # Trigger against the current branch, dev environment:
#|   scripts/trigger-pipeline.sh
#|
#|   # Trigger a specific branch against qa:
#|   scripts/trigger-pipeline.sh --branch task/123-my-feature --env qa
#|
#|   # List available pipeline specs to confirm the spec ID:
#|   scripts/trigger-pipeline.sh --list
#|
#| AUTHENTICATION (Rio API):
#|   Add these two lines to the project's .env file (gitignored):
#|     RIO_API_EMAIL=your_email@example.com
#|     RIO_API_TOKEN=<your Rio API token>
#|   Already-exported shell variables win over the .env file.
#|   Resolution order: environment > .env > ~/.netrc
#|
#| CONFIG (override via env var or .env):
#|   RIO_API_BASE       default: https://rio-api.apple.com
#|   RIO_PROJECT_ID     required: your RIO project slug
#|   RIO_ENV_FILE       default: <repo>/.env

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

RIO_API_BASE="${RIO_API_BASE:-https://rio-api.apple.com}"
RIO_ENV_FILE="${RIO_ENV_FILE:-$REPO_ROOT/.env}"

# ── Logging ──────────────────────────────────────────────────────────────────
log_info()    { printf '\033[0;34m▶\033[0m  %s\n' "$*"; }
log_success() { printf '\033[0;32m✔\033[0m  %s\n' "$*"; }
log_warn()    { printf '\033[0;33m⚠\033[0m  %s\n' "$*" >&2; }
log_error()   { printf '\033[0;31m✖\033[0m  %s\n' "$*" >&2; }
log_blank()   { printf '\n'; }

# ── .env reader ───────────────────────────────────────────────────────────────
# Read one variable from the .env file without sourcing it (avoids shell
# expansion of URLs with '&', '?' and '#').  Last definition wins.
env_file_value() {
  local name="$1" line value
  [ -f "$RIO_ENV_FILE" ] || return 1
  line="$(grep -E "^[[:space:]]*(export[[:space:]]+)?$name[[:space:]]*=" "$RIO_ENV_FILE" | tail -n 1)" || return 1
  [ -n "$line" ] || return 1
  value="${line#*=}"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  case "$value" in
    \"*\") value="${value#\"}"; value="${value%\"}" ;;
    \'*\') value="${value#\'}"; value="${value%\'}" ;;
  esac
  [ -n "$value" ] || return 1
  printf '%s' "$value"
}

# Resolve credentials and config: environment > .env > defaults
: "${RIO_API_EMAIL:=$(env_file_value RIO_API_EMAIL 2>/dev/null || true)}"
: "${RIO_API_TOKEN:=$(env_file_value RIO_API_TOKEN 2>/dev/null || true)}"
: "${RIO_PROJECT_ID:=$(env_file_value RIO_PROJECT_ID 2>/dev/null || true)}"
if [ -z "${RIO_PROJECT_ID:-}" ]; then
  echo "RIO_PROJECT_ID is required (set it in $RIO_ENV_FILE or export it)." >&2
  exit 1
fi

# ── Auth ──────────────────────────────────────────────────────────────────────
auth_args() {
  if [ -n "${RIO_API_EMAIL:-}" ] && [ -n "${RIO_API_TOKEN:-}" ]; then
    printf '%s' "-H|X-RIO-API-EMAIL: $RIO_API_EMAIL|-H|X-RIO-API-TOKEN: $RIO_API_TOKEN"
  else
    printf '%s' "--netrc"
  fi
}

require_auth() {
  if [ -n "${RIO_API_EMAIL:-}" ] && [ -n "${RIO_API_TOKEN:-}" ]; then
    return 0
  fi
  if [ -f "$HOME/.netrc" ] && grep -q 'rio-api' "$HOME/.netrc" 2>/dev/null; then
    return 0
  fi
  log_error "No Rio API credentials found."
  log_info  "Add these two lines to $RIO_ENV_FILE (gitignored):"
  log_info  "  RIO_API_EMAIL=your_email@example.com"
  log_info  "  RIO_API_TOKEN=<your Rio API token>"
  [ -z "${RIO_API_EMAIL:-}" ] && [ -z "${RIO_API_TOKEN:-}" ] || \
    log_warn "Only one of the two is set — both are required."
  exit 1
}

# ── Helpers ───────────────────────────────────────────────────────────────────
json_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  printf '%s' "$s"
}

# Resolve the spec ID for the api-tests pipeline from the RIO API.
# The pipeline uses `group: api-tests` in rio.yaml; RIO derives an ID like
# "api-tests-main-build". We match any spec whose id starts with "api-tests-".
resolve_spec_id() {
  local url="$RIO_API_BASE/v1/projects/$RIO_PROJECT_ID/pipeline_specs"
  local IFS='|'
  # shellcheck disable=SC2046
  curl -sf $(auth_args) "$url" | node -e "
    let d = '';
    process.stdin.on('data', c => d += c).on('end', () => {
      try {
        const specs = JSON.parse(d);
        const arr = Array.isArray(specs) ? specs : (specs.pipeline_specs ?? specs.data ?? []);
        const match = arr.find(s => s.pipeline_spec_id && /api-tests/.test(s.pipeline_spec_id) && s.activity?.state !== 'INACTIVE');
        if (match) { process.stdout.write(match.pipeline_spec_id); process.exit(0); }
        const fallback = arr.find(s => s.pipeline_spec_id && /api-tests/.test(s.pipeline_spec_id));
        if (fallback) { process.stdout.write(fallback.pipeline_spec_id); process.exit(0); }
        process.exit(1);
      } catch (e) { process.stderr.write(e.message + '\n'); process.exit(1); }
    });
  "
}

list_specs() {
  local url="$RIO_API_BASE/v1/projects/$RIO_PROJECT_ID/pipeline_specs"
  log_info "Pipeline specs for project '$RIO_PROJECT_ID':"
  local IFS='|'
  local response http_code
  # shellcheck disable=SC2046
  response=$(curl -s -w '\n%{http_code}' $(auth_args) "$url")
  http_code="${response##*$'\n'}"
  response="${response%$'\n'*}"
  if [ "${http_code#2}" = "$http_code" ] || [ "${#http_code}" -ne 3 ]; then
    log_error "RIO API error (HTTP $http_code): $response"
    log_info  "Check RIO_PROJECT_ID in .env — the project slug should look like '<your-rio-project-slug>', not a UUID."
    exit 1
  fi
  printf '%s' "$response" | node -e "
    let d = '';
    process.stdin.on('data', c => d += c).on('end', () => {
      try {
        const specs = JSON.parse(d);
        const arr = Array.isArray(specs) ? specs : (specs.pipeline_specs ?? specs.data ?? []);
        arr.forEach(s => console.log('  ' + (s.pipeline_spec_id ?? s.id ?? '?').padEnd(70) + (s.activity?.state ?? s.state ?? '')));
      } catch (e) { process.stderr.write('Parse error: ' + e.message + '\nRaw: ' + d.slice(0,200) + '\n'); process.exit(1); }
    });
  "
}

# ── Trigger ───────────────────────────────────────────────────────────────────
trigger() {
  local branch="$1" env="$2"

  log_info "Resolving pipeline spec for project '$RIO_PROJECT_ID'..."
  local spec_id
  if ! spec_id="$(resolve_spec_id)" || [ -z "$spec_id" ]; then
    log_error "No 'api-tests' pipeline spec found in project '$RIO_PROJECT_ID'."
    log_info  "Run --list to see all available specs."
    log_info  "If the project ID is wrong, set RIO_PROJECT_ID in $RIO_ENV_FILE."
    exit 1
  fi

  local body
  body=$(printf '{"build_params":{"BRANCH":"%s","env":"%s"}}' \
    "$(json_escape "$branch")" "$(json_escape "$env")")

  local url="$RIO_API_BASE/v1/projects/$RIO_PROJECT_ID/pipeline_specs/$spec_id/trigger"

  log_info "Triggering spec '$spec_id'"
  log_info "  branch : $branch"
  log_info "  env    : $env"
  log_blank

  local IFS='|'
  local response http_code
  # shellcheck disable=SC2046
  response=$(curl -s -w '\n%{http_code}' -X POST $(auth_args) \
      -H "Content-Type: application/json" \
      -d "$body" "$url") || {
    log_error "Failed to reach the Rio API (curl exit $?)."
    log_info  "Check connectivity and credentials."
    exit 1
  }

  http_code="${response##*$'\n'}"
  response="${response%$'\n'*}"

  if [ "${http_code#2}" != "$http_code" ] && [ "${#http_code}" -eq 3 ]; then
    log_success "Pipeline triggered → $response"
  else
    log_error "Rio refused to trigger '$spec_id' (HTTP $http_code)."
    log_info  "$(printf '%s' "$response" | node -e "
      let d=''; process.stdin.on('data',c=>d+=c).on('end',()=>{
        try { console.log(JSON.parse(d).message ?? d); } catch { console.log(d); }
      });" 2>/dev/null || printf '%s' "$response")"
    exit 1
  fi
}

# ── Argument parsing ──────────────────────────────────────────────────────────
if [ $# -eq 0 ] && [ -t 0 ]; then
  : # no args → fall through to defaults
fi

BRANCH=""
ENV="dev"

case "${1:-}" in
  -h|--help)
    grep '^#|' "${BASH_SOURCE[0]}" | sed 's/^#| \{0,1\}//'
    exit 0
    ;;
  --list)
    require_auth
    list_specs
    exit 0
    ;;
esac

while [ $# -gt 0 ]; do
  case "$1" in
    --branch)
      [ $# -ge 2 ] || { log_error "--branch requires a value."; exit 1; }
      BRANCH="$2"; shift 2 ;;
    --branch=*)
      BRANCH="${1#--branch=}"; shift ;;
    --env)
      [ $# -ge 2 ] || { log_error "--env requires a value."; exit 1; }
      ENV="$2"; shift 2 ;;
    --env=*)
      ENV="${1#--env=}"; shift ;;
    *)
      log_error "Unknown argument: '$1'"
      log_info  "Run with --help for usage."
      exit 1 ;;
  esac
done

# Default BRANCH to the current git branch.
if [ -z "$BRANCH" ]; then
  BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
  if [ -z "$BRANCH" ] || [ "$BRANCH" = "HEAD" ]; then
    log_error "Could not determine the current git branch. Pass --branch explicitly."
    exit 1
  fi
  log_info "No --branch given; using current branch: $BRANCH"
fi

# Strip 'origin/' prefix if accidentally pasted from git output.
case "$BRANCH" in
  origin/*) BRANCH="${BRANCH#origin/}"; log_warn "Stripped 'origin/' prefix; using '$BRANCH'." ;;
esac

# Validate env.
case "$ENV" in
  dev|qa|uat) ;;
  *) log_error "Invalid env: '$ENV' (expected: dev|qa|uat)"; exit 1 ;;
esac

require_auth
trigger "$BRANCH" "$ENV"

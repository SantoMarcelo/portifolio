#!/usr/bin/env bash
# CI setup for the RIO api-tests pipeline.
# Selects environment-specific URLs (dev/qa/uat), optionally materializes mTLS certs
# into Certs/, and builds a .env: env URLs from this script + sensitive secrets
# from the vault ($BUILD_SECRETS_PATH).
# Config goes into .env (not exported): this runs in a subshell, so exports would
# be lost before 'npm run test:functional'.
set -euo pipefail

ENV="${1:-${BUILD_PARAM_ENV:-dev}}"

# TODO(adopter): set the base URL of each environment of your project.
case "$ENV" in
  dev) APP_URL="https://dev.example.com" ;;
  qa)  APP_URL="https://qa.example.com" ;;
  uat) APP_URL="https://uat.example.com" ;;
  *) echo "❌ invalid env: '$ENV' (expected: dev|qa|uat)" >&2; exit 1 ;;
esac
echo "▶ Configuring tests for environment: $ENV ($APP_URL)"

# Env-specific config written by this script (NOT from the vault).
{
  echo "BASE_URL=$APP_URL"
} > .env

# Optional mTLS: certs come from the vault as plain PEM files in /secrets (NOT base64).
# Skipped when the project does not register the CERT_* secrets.
if [ -f "$BUILD_SECRETS_PATH/CERT_KEY_PEM" ]; then
  mkdir -p Certs
  cp "$BUILD_SECRETS_PATH/CERT_KEY_PEM"  Certs/client.key.pem
  cp "$BUILD_SECRETS_PATH/CERT_CERT_PEM" Certs/client.cert.pem
  # A large CA bundle may be split in several vault secrets (size limit); recompose it.
  # The echo inserts a newline between blocks so a missing trailing newline can't merge two PEM blocks.
  { cat "$BUILD_SECRETS_PATH/CERT_CA_1"; echo; cat "$BUILD_SECRETS_PATH/CERT_CA_2"; } > Certs/ca.pem
  {
    echo "TLS_KEY_PATH=Certs/client.key.pem"
    echo "TLS_CERT_PATH=Certs/client.cert.pem"
    echo "TLS_CA_PATH=Certs/ca.pem"
  } >> .env
fi

# Append the sensitive/shared secrets from the vault, skipping:
#  - CERT_* (multi-line PEM handled above)
#  - the env-specific URL key this script already wrote (avoid duplicates)
for f in "$BUILD_SECRETS_PATH"/*; do
  name="$(basename "$f")"
  case "$name" in
    CERT_KEY_PEM|CERT_CERT_PEM|CERT_CA_1|CERT_CA_2|BASE_URL) continue ;;
  esac
  [ -f "$f" ] || continue
  # Strip CR (CRLF-stored secrets) and quote the value: unquoted dotenv values
  # stop at the first '#' and get trailing whitespace trimmed, which would
  # silently corrupt passwords/secret keys and surface as an auth failure.
  value="$(tr -d '\r' < "$f")"
  printf '%s="%s"\n' "$name" "${value//\"/\\\"}" >> .env
done

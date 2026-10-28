#!/usr/bin/env bash
# Optional branch override for the api-tests pipeline: checks out the branch
# selected via the BRANCH build parameter. When BRANCH is empty (e.g. the
# push-to-main auto run), it is a no-op and the already-checked-out revision
# is used as-is.
set -euo pipefail

branch="${1:-${BUILD_PARAM_BRANCH:-}}"

if [ -z "$branch" ]; then
  echo "▶ No BRANCH set — using the checked-out revision as-is."
  git --no-pager log --oneline -1
  exit 0
fi

echo "▶ Checking out branch: $branch"
git fetch --quiet origin "$branch"
# checkout -B against origin/<branch> is deterministic: it avoids a stale local
# branch in a reused CI workspace silently running old code.
git checkout -B "$branch" "origin/$branch"
git --no-pager log --oneline -1


#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BIN_PATH="${ROOT_DIR}/bin/openapi-changes"
GO_CACHE_DIR="${ROOT_DIR}/.github/vhs/tmp/go-build"

cd "${ROOT_DIR}"

command -v vhs >/dev/null 2>&1 || {
  echo "vhs is required to render demos" >&2
  exit 1
}
command -v ffmpeg >/dev/null 2>&1 || {
  echo "ffmpeg is required to render demos" >&2
  exit 1
}
command -v ttyd >/dev/null 2>&1 || {
  echo "ttyd is required to render demos" >&2
  exit 1
}

mkdir -p \
  "${ROOT_DIR}/bin" \
  "${ROOT_DIR}/.github/assets" \
  "${ROOT_DIR}/dist/demos" \
  "${ROOT_DIR}/.github/vhs/tmp" \
  "${GO_CACHE_DIR}"

export GOCACHE="${GOCACHE:-${GO_CACHE_DIR}}"

go build -o "${BIN_PATH}"

vhs "${ROOT_DIR}/.github/vhs/summary.tape"
vhs "${ROOT_DIR}/.github/vhs/console.tape"

#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: prepare-demo-fixture.sh <output-dir>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$1"
ORIGINAL_SPEC="${ROOT_DIR}/sample-specs/petstorev3-original.json"
FINAL_SPEC="${ROOT_DIR}/sample-specs/petstorev3.json"

commit_file() {
  local repo_dir="$1"
  local message="$2"
  local when="$3"

  GIT_AUTHOR_DATE="${when}" GIT_COMMITTER_DATE="${when}" git -C "${repo_dir}" add petstore.json
  GIT_AUTHOR_DATE="${when}" GIT_COMMITTER_DATE="${when}" git -C "${repo_dir}" commit -m "${message}"
}

rm -rf "${OUT_DIR}"
mkdir -p "${OUT_DIR}"

git -C "${OUT_DIR}" init -b main
git -C "${OUT_DIR}" config user.name "pb33f demo bot"
git -C "${OUT_DIR}" config user.email "demo-bot@pb33f.io"

cp "${ORIGINAL_SPEC}" "${OUT_DIR}/petstore.json"
commit_file "${OUT_DIR}" "Original petstore" "2026-01-10T12:00:00Z"

jq '
  del(.paths["/pet"].post) |
  .paths["/pet"].patch = {
    "tags": ["pet"],
    "summary": "Patch an existing pet",
    "description": "Patch a pet in the store",
    "operationId": "patchPet",
    "requestBody": .paths["/pet"].put.requestBody,
    "responses": .paths["/pet"].put.responses,
    "security": .paths["/pet"].put.security
  } |
  .paths["/pet/findByTags"].post = {
    "tags": ["pet"],
    "summary": "Find pets by tags",
    "description": "Multiple tags can be provided with comma separated strings.",
    "operationId": "findPetsByTagsPost",
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "array",
            "items": { "type": "string" }
          }
        }
      }
    },
    "responses": .paths["/pet/findByTags"].get.responses,
    "security": .paths["/pet/findByTags"].get.security
  } |
  del(.paths["/pet/findByTags"].get) |
  del(.paths["/pet/{petId}"].delete) |
  .components.schemas.Pet.required = ["name"] |
  .components.schemas.Pet.properties.jazz = {
    "type": "string",
    "description": "The pet'\''s jazz energy level",
    "example": "bebop"
  } |
  del(.components.schemas.Pet.properties.name) |
  .components.schemas.Pet.properties.status.enum += ["jazzedOut"] |
  .components.schemas.User.properties.email.example = "john@jazzclubinjazztown.com" |
  .components.schemas.User.properties.username.example = "JAZZCLUB"
' "${ORIGINAL_SPEC}" > "${OUT_DIR}/petstore.json"
commit_file "${OUT_DIR}" "Property modifications made" "2026-01-11T12:00:00Z"

cp "${FINAL_SPEC}" "${OUT_DIR}/petstore.json"
commit_file "${OUT_DIR}" "Petstore v3 refresh" "2026-01-12T12:00:00Z"

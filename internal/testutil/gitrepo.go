// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package testutil

import (
	"os"
	"os/exec"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/require"
)

func RunGit(t testing.TB, dir string, args ...string) {
	t.Helper()

	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	require.NoError(t, err, "git %v failed: %s", args, string(out))
}

func CreateMovedRefGitSpecRepo(t testing.TB) (string, string) {
	t.Helper()

	repoDir := t.TempDir()

	RunGit(t, repoDir, "init")
	RunGit(t, repoDir, "config", "user.name", "Test User")
	RunGit(t, repoDir, "config", "user.email", "test@example.com")

	specPath := filepath.Join(repoDir, "spec.yaml")
	commonOnePath := filepath.Join(repoDir, "common1.yaml")
	commonTwoPath := filepath.Join(repoDir, "common2.yaml")

	firstSpec := `openapi: 3.0.3
info:
  title: Moved Ref
  version: "1.0"
paths:
  /thing:
    get:
      responses:
        "200":
          description: ok
          content:
            application/json:
              schema:
                $ref: "./common1.yaml#/components/schemas/Foo"
`
	secondSpec := `openapi: 3.0.3
info:
  title: Moved Ref
  version: "1.1"
paths:
  /thing:
    get:
      responses:
        "200":
          description: ok
          content:
            application/json:
              schema:
                $ref: "./common2.yaml#/components/schemas/Foo"
`
	firstCommonOne := `components:
  schemas:
    Foo:
      type: object
      required:
        - id
      properties:
        id:
          type: integer
`
	secondCommonOne := `components:
  schemas: {}
`
	firstCommonTwo := `components:
  schemas: {}
`
	secondCommonTwo := `components:
  schemas:
    Foo:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
        name:
          type: string
`

	require.NoError(t, os.WriteFile(specPath, []byte(firstSpec), 0o644))
	require.NoError(t, os.WriteFile(commonOnePath, []byte(firstCommonOne), 0o644))
	require.NoError(t, os.WriteFile(commonTwoPath, []byte(firstCommonTwo), 0o644))
	RunGit(t, repoDir, "add", "spec.yaml", "common1.yaml", "common2.yaml")
	RunGit(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(specPath, []byte(secondSpec), 0o644))
	require.NoError(t, os.WriteFile(commonOnePath, []byte(secondCommonOne), 0o644))
	require.NoError(t, os.WriteFile(commonTwoPath, []byte(secondCommonTwo), 0o644))
	RunGit(t, repoDir, "add", "spec.yaml", "common1.yaml", "common2.yaml")
	RunGit(t, repoDir, "commit", "-m", "second")

	return repoDir, "spec.yaml"
}

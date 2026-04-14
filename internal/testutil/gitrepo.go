// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package testutil

import (
	"bytes"
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

type InvalidHistoryRepo struct {
	RepoDir        string
	FileName       string
	OldestHash     string
	InvalidHash    string
	NewestHash     string
	ExpectedChange string
}

func CreateInvalidHistoryGitSpecRepo(t testing.TB) InvalidHistoryRepo {
	t.Helper()

	repoDir := t.TempDir()

	RunGit(t, repoDir, "init")
	RunGit(t, repoDir, "config", "user.name", "Test User")
	RunGit(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "openapi.yaml"
	specPath := filepath.Join(repoDir, fileName)

	first := `openapi: 3.0.3
info:
  title: Test API
  version: "1.0.0"
paths: {}
`
	invalid := `swagger: "2.0"
info:
  title: Broken API
  version: "1.1.0"
paths: {}
`
	third := `openapi: 3.0.3
info:
  title: Test API
  version: "1.2.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
`

	require.NoError(t, os.WriteFile(specPath, []byte(first), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "valid first")
	oldestHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	require.NoError(t, os.WriteFile(specPath, []byte(invalid), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "invalid middle")
	invalidHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	require.NoError(t, os.WriteFile(specPath, []byte(third), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "valid last")
	newestHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	return InvalidHistoryRepo{
		RepoDir:        repoDir,
		FileName:       fileName,
		OldestHash:     oldestHash,
		InvalidHash:    invalidHash,
		NewestHash:     newestHash,
		ExpectedChange: "$.paths['/pets']",
	}
}

type RevertedHistoryRepo struct {
	RepoDir     string
	FileName    string
	OldestHash  string
	InvalidHash string
	NewestHash  string
}

func CreateRevertedHistoryGitSpecRepo(t testing.TB) RevertedHistoryRepo {
	t.Helper()

	repoDir := t.TempDir()

	RunGit(t, repoDir, "init")
	RunGit(t, repoDir, "config", "user.name", "Test User")
	RunGit(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "openapi.yaml"
	specPath := filepath.Join(repoDir, fileName)

	valid := `openapi: 3.0.3
info:
  title: Test API
  version: "1.0.0"
paths: {}
`
	invalid := `swagger: "2.0"
info:
  title: Broken API
  version: "1.1.0"
paths: {}
`

	require.NoError(t, os.WriteFile(specPath, []byte(valid), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "valid first")
	oldestHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	require.NoError(t, os.WriteFile(specPath, []byte(invalid), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "invalid middle")
	invalidHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	require.NoError(t, os.WriteFile(specPath, []byte(valid), 0o644))
	RunGit(t, repoDir, "add", fileName)
	RunGit(t, repoDir, "commit", "-m", "valid revert")
	newestHash := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD")

	return RevertedHistoryRepo{
		RepoDir:     repoDir,
		FileName:    fileName,
		OldestHash:  oldestHash,
		InvalidHash: invalidHash,
		NewestHash:  newestHash,
	}
}

func gitOutput(t testing.TB, dir string, args ...string) string {
	t.Helper()

	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	require.NoError(t, err, "git %v failed: %s", args, stderr.String())
	return string(bytes.TrimSpace(stdout.Bytes()))
}

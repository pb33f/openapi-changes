// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/testutil"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/require"
)

func makeSwagger2Commit(t *testing.T) *model.Commit {
	t.Helper()

	spec := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`

	doc, err := libopenapi.NewDocument([]byte(spec))
	require.NoError(t, err)

	return &model.Commit{
		Hash:        "abc123",
		Message:     "swagger commit",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(spec),
		OldData:     []byte(spec),
		Document:    doc,
		OldDocument: doc,
		Changes:     &whatChangedModel.DocumentChanges{},
	}
}

func chdirForTest(t *testing.T, dir string) {
	t.Helper()

	oldWD, err := os.Getwd()
	require.NoError(t, err)
	require.NoError(t, os.Chdir(dir))
	t.Cleanup(func() {
		require.NoError(t, os.Chdir(oldWD))
	})
}

func createGitSpecRepo(t *testing.T) string {
	t.Helper()

	repoDir := t.TempDir()
	runGitInDir(t, repoDir, "init")
	runGitInDir(t, repoDir, "config", "user.name", "Test User")
	runGitInDir(t, repoDir, "config", "user.email", "test@example.com")
	writeGitHistoryFile(t, repoDir, "openapi.yaml",
		"openapi: 3.0.3\ninfo:\n  title: first\n  version: '1.0'\npaths: {}\n",
		"openapi: 3.0.3\ninfo:\n  title: second\n  version: '1.1'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: ok\n",
	)

	return repoDir
}

func createGitSpecRepoForFile(t *testing.T, fileName string) string {
	t.Helper()

	repoDir := t.TempDir()
	runGitInDir(t, repoDir, "init")
	runGitInDir(t, repoDir, "config", "user.name", "Test User")
	runGitInDir(t, repoDir, "config", "user.email", "test@example.com")
	writeGitHistoryFile(t, repoDir, fileName,
		"openapi: 3.0.3\ninfo:\n  title: first\n  version: '1.0'\npaths: {}\n",
		"openapi: 3.0.3\ninfo:\n  title: second\n  version: '1.1'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: ok\n",
	)
	specPath := filepath.Join(repoDir, fileName)
	third := "openapi: 3.0.3\ninfo:\n  title: third\n  version: '1.2'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: updated ok\n"
	require.NoError(t, os.WriteFile(specPath, []byte(third), 0o644))
	runGitInDir(t, repoDir, "add", fileName)
	runGitInDir(t, repoDir, "commit", "-m", "third")

	return repoDir
}

func writeGitHistoryFile(t *testing.T, repoDir, fileName, first, second string) {
	t.Helper()

	specPath := filepath.Join(repoDir, fileName)
	require.NoError(t, os.MkdirAll(filepath.Dir(specPath), 0o755))
	require.NoError(t, os.WriteFile(specPath, []byte(first), 0o644))
	runGitInDir(t, repoDir, "add", fileName)
	runGitInDir(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(specPath, []byte(second), 0o644))
	runGitInDir(t, repoDir, "add", fileName)
	runGitInDir(t, repoDir, "commit", "-m", "second")
}

func createExplodedGitSpecRepo(t *testing.T) (string, string) {
	t.Helper()

	repoDir := t.TempDir()
	runGitInDir(t, repoDir, "init")
	runGitInDir(t, repoDir, "config", "user.name", "Test User")
	runGitInDir(t, repoDir, "config", "user.email", "test@example.com")

	specDir := filepath.Join(repoDir, "apis")
	componentDir := filepath.Join(specDir, "components")
	require.NoError(t, os.MkdirAll(componentDir, 0o755))

	rootPath := filepath.Join(specDir, "openapi.yaml")
	componentPath := filepath.Join(componentDir, "pet.yaml")

	root := `openapi: 3.0.3
info:
  title: Exploded
  version: "1.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
          content:
            application/json:
              schema:
                $ref: "./components/pet.yaml#/components/schemas/Pet"
`
	firstComponent := `components:
  schemas:
    Pet:
      type: object
      required:
        - id
      properties:
        id:
          type: integer
`
	secondComponent := `components:
  schemas:
    Pet:
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

	require.NoError(t, os.WriteFile(rootPath, []byte(root), 0o644))
	require.NoError(t, os.WriteFile(componentPath, []byte(firstComponent), 0o644))
	runGitInDir(t, repoDir, "add", "apis/openapi.yaml", "apis/components/pet.yaml")
	runGitInDir(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(componentPath, []byte(secondComponent), 0o644))
	runGitInDir(t, repoDir, "add", "apis/components/pet.yaml")
	runGitInDir(t, repoDir, "commit", "-m", "second")

	return repoDir, filepath.Join(specDir, "openapi.yaml")
}

func createExplodedLocalSpecPair(t *testing.T) (string, string) {
	t.Helper()

	root := `openapi: 3.0.3
info:
  title: Exploded
  version: "1.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
          content:
            application/json:
              schema:
                $ref: "./components/pet.yaml#/components/schemas/Pet"
`
	leftComponent := `components:
  schemas:
    Pet:
      type: object
      required:
        - id
      properties:
        id:
          type: integer
`
	rightComponent := `components:
  schemas:
    Pet:
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

	createTree := func(baseDir, component string) string {
		specDir := filepath.Join(baseDir, "apis")
		componentDir := filepath.Join(specDir, "components")
		require.NoError(t, os.MkdirAll(componentDir, 0o755))
		rootPath := filepath.Join(specDir, "openapi.yaml")
		require.NoError(t, os.WriteFile(rootPath, []byte(root), 0o644))
		require.NoError(t, os.WriteFile(filepath.Join(componentDir, "pet.yaml"), []byte(component), 0o644))
		return rootPath
	}

	baseDir := t.TempDir()
	leftPath := createTree(filepath.Join(baseDir, "left"), leftComponent)
	rightPath := createTree(filepath.Join(baseDir, "right"), rightComponent)
	return leftPath, rightPath
}

func createComposedSchemaTitleRemovalSpecPair(t *testing.T, keyword string) (string, string) {
	t.Helper()

	left := fmt.Sprintf(`openapi: 3.1.0
info:
  title: Contracts API
  version: "1.0"
paths: {}
components:
  schemas:
    Contract:
      title: Contract
      %s:
        - type: object
          properties:
            id:
              type: string
`, keyword)

	right := fmt.Sprintf(`openapi: 3.1.0
info:
  title: Contracts API
  version: "1.0"
paths: {}
components:
  schemas:
    Contract:
      %s:
        - type: object
          properties:
            id:
              type: string
`, keyword)

	baseDir := t.TempDir()
	leftPath := filepath.Join(baseDir, "left.yaml")
	rightPath := filepath.Join(baseDir, "right.yaml")
	require.NoError(t, os.WriteFile(leftPath, []byte(left), 0o644))
	require.NoError(t, os.WriteFile(rightPath, []byte(right), 0o644))
	return leftPath, rightPath
}

func createMovedRefGitSpecRepo(t *testing.T) (string, string) {
	t.Helper()
	return testutil.CreateMovedRefGitSpecRepo(t)
}

func runGitInDir(t *testing.T, dir string, args ...string) {
	t.Helper()

	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	require.NoError(t, err, "git %v failed: %s", args, string(out))
}

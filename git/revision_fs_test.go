// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"errors"
	"io"
	"os"
	"path/filepath"
	"testing"

	"github.com/pb33f/libopenapi/datamodel"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGitRevisionFS_OpenLoadsRevisionScopedFiles(t *testing.T) {
	repoDir, specDir := createExplodedRevisionRepo(t)

	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.BasePath = repoDir
	docConfig.AllowFileReferences = true

	beforeFS, err := NewGitRevisionFS(repoDir, repoDir, filepath.Join(repoDir, ".virtual-before"), "HEAD~1", docConfig)
	require.NoError(t, err)
	afterFS, err := NewGitRevisionFS(repoDir, repoDir, filepath.Join(repoDir, ".virtual-after"), "HEAD", docConfig)
	require.NoError(t, err)

	beforeFile, err := beforeFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.NoError(t, err)
	afterFile, err := afterFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.NoError(t, err)

	beforeBits := mustReadAllFS(t, beforeFile)
	afterBits := mustReadAllFS(t, afterFile)

	assert.NotContains(t, string(beforeBits), "name:")
	assert.Contains(t, string(afterBits), "name:")
	assert.NotEqual(t, string(beforeBits), string(afterBits))

	rootFile, err := afterFS.Open(filepath.ToSlash(filepath.Join("apis", "openapi.yaml")))
	require.NoError(t, err)
	rootBits := mustReadAllFS(t, rootFile)
	assert.Contains(t, string(rootBits), "./components/pet.yaml")

	relativeFS, err := NewGitRevisionFS(repoDir, specDir, filepath.Join(repoDir, ".virtual-relative"), "HEAD", docConfig)
	require.NoError(t, err)
	relativeFile, err := relativeFS.Open(filepath.ToSlash(filepath.Join("components", "pet.yaml")))
	require.NoError(t, err)
	assert.Contains(t, string(mustReadAllFS(t, relativeFile)), "name:")
}

func TestGitRevisionFS_CachesRepeatedOpens(t *testing.T) {
	repoDir, _ := createExplodedRevisionRepo(t)
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.BasePath = repoDir
	docConfig.AllowFileReferences = true

	revisionFS, err := NewGitRevisionFS(repoDir, repoDir, filepath.Join(repoDir, ".virtual-cache"), "HEAD", docConfig)
	require.NoError(t, err)

	first, err := revisionFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.NoError(t, err)
	second, err := revisionFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.NoError(t, err)

	assert.Same(t, first, second)
}

func TestGitRevisionFS_RejectsOutsideRepo(t *testing.T) {
	repoDir, _ := createExplodedRevisionRepo(t)
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.BasePath = repoDir
	docConfig.AllowFileReferences = true

	revisionFS, err := NewGitRevisionFS(repoDir, repoDir, filepath.Join(repoDir, ".virtual-outside"), "HEAD", docConfig)
	require.NoError(t, err)

	_, err = revisionFS.Open("../outside.yaml")
	require.Error(t, err)
	assert.Contains(t, err.Error(), "resolves outside repository root")
}

func TestGitRevisionFS_RetriesAfterReadError(t *testing.T) {
	repoDir, _ := createExplodedRevisionRepo(t)
	docConfig := datamodel.NewDocumentConfiguration()
	docConfig.BasePath = repoDir
	docConfig.AllowFileReferences = true

	revisionFS, err := NewGitRevisionFS(repoDir, repoDir, filepath.Join(repoDir, ".virtual-retry"), "HEAD", docConfig)
	require.NoError(t, err)

	originalRead := revisionFSReadFileAtRevision
	t.Cleanup(func() {
		revisionFSReadFileAtRevision = originalRead
	})

	var calls int
	revisionFSReadFileAtRevision = func(repoDir, revision, filePath string) ([]byte, error) {
		calls++
		return nil, errors.New("boom")
	}

	_, err = revisionFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.Error(t, err)
	_, err = revisionFS.Open(filepath.ToSlash(filepath.Join("apis", "components", "pet.yaml")))
	require.Error(t, err)
	assert.Equal(t, 2, calls)
}

func createExplodedRevisionRepo(t *testing.T) (string, string) {
	t.Helper()

	repoDir := t.TempDir()
	runGit(t, repoDir, "init")
	runGit(t, repoDir, "config", "user.name", "Test User")
	runGit(t, repoDir, "config", "user.email", "test@example.com")

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
	runGit(t, repoDir, "add", "apis/openapi.yaml", "apis/components/pet.yaml")
	runGit(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(componentPath, []byte(secondComponent), 0o644))
	runGit(t, repoDir, "add", "apis/components/pet.yaml")
	runGit(t, repoDir, "commit", "-m", "second")

	return repoDir, specDir
}

func mustReadAllFS(t *testing.T, file interface{ Read([]byte) (int, error) }) []byte {
	t.Helper()

	bits, err := io.ReadAll(file)
	require.NoError(t, err)
	return bits
}

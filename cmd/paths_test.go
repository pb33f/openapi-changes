package cmd

import (
	"net/url"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAbsoluteRepoPath(t *testing.T) {
	t.Run("makes relative path absolute", func(t *testing.T) {
		p := "repo"

		have, err := absoluteRepoPath(p)
		assert.NoError(t, err)
		assert.True(t, filepath.IsAbs(have))
	})

	t.Run("returns absolute path", func(t *testing.T) {
		p := "/home/user/repo"

		have, err := absoluteRepoPath(p)
		assert.NoError(t, err)
		assert.Equal(t, p, have)
	})
}

func TestExtractGithubDetailsFromURL(t *testing.T) {
	t.Run("extracts user repo and file path from blob url", func(t *testing.T) {
		specURL, err := url.Parse("https://github.com/OAI/OpenAPI-Specification/blob/main/examples/v3.0/petstore.yaml")
		assert.NoError(t, err)

		user, repo, filePath, err := ExtractGithubDetailsFromURL(specURL)
		assert.NoError(t, err)
		assert.Equal(t, "OAI", user)
		assert.Equal(t, "OpenAPI-Specification", repo)
		assert.Equal(t, "examples/v3.0/petstore.yaml", filePath)
	})

	t.Run("rejects non github hosts", func(t *testing.T) {
		specURL, err := url.Parse("https://example.com/blob/main/petstore.yaml")
		assert.NoError(t, err)

		_, _, _, err = ExtractGithubDetailsFromURL(specURL)
		assert.Error(t, err)
	})
}

package cmd

import (
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

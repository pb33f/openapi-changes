// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

// macOS temp directories are symlinks, so one is forced here for other platforms.
func TestHistoryRootPathsRewriteRelativeToRepo(t *testing.T) {
	dir, err := filepath.EvalSymlinks(t.TempDir())
	require.NoError(t, err)
	target := filepath.Join(dir, "target")
	link := filepath.Join(dir, "link")
	require.NoError(t, os.Mkdir(target, 0o755))
	if err := os.Symlink(target, link); err != nil {
		t.Skipf("symlinks are unavailable: %v", err)
	}
	t.Setenv("TMPDIR", link)

	root := historyRoot()
	rewrite := NewRepoRelativeDocumentPathRewriter(root, root)

	assert.Equal(t, "specs/asyncapi.yaml", rewrite(filepath.Join(root, "specs", "asyncapi.yaml")))
}

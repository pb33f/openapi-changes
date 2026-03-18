// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func mustMakeSwagger2Commit(t *testing.T) *model.Commit {
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

func TestRunNewLeftRightReport_PropagatesChangeratorErrors(t *testing.T) {
	dir := t.TempDir()

	left := `swagger: "2.0"
info:
  title: test
  version: "1.0"
paths: {}`
	right := `swagger: "2.0"
info:
  title: test updated
  version: "1.1"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok`

	leftPath := filepath.Join(dir, "left.yaml")
	rightPath := filepath.Join(dir, "right.yaml")
	require.NoError(t, os.WriteFile(leftPath, []byte(left), 0644))
	require.NoError(t, os.WriteFile(rightPath, []byte(right), 0644))

	report, err := runNewLeftRightReport(leftPath, rightPath, newSummaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "building right model")
}

func TestRunNewGithubHistoryReport_PropagatesChangeratorErrors(t *testing.T) {
	originalProcess := processGithubRepo
	t.Cleanup(func() {
		processGithubRepo = originalProcess
	})

	processGithubRepo = func(username, repo, filePath, baseCommit string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		forceCutoff bool, limit int, limitTime int, base string, remote, extRefs bool,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return []*model.Commit{mustMakeSwagger2Commit(t)}, nil
	}

	report, err := runNewGithubHistoryReport("https://github.com/oai/openapi-specification/blob/main/examples/v2.0/json/petstore-expanded.json", newSummaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "commit abc123")
}

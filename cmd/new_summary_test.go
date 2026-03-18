// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"errors"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLoadGitHistoryCommits_ReturnsPopulateErrors(t *testing.T) {
	originalExtract := extractHistoryFromFile
	originalPopulate := populateHistoryWithChanges
	t.Cleanup(func() {
		extractHistoryFromFile = originalExtract
		populateHistoryWithChanges = originalPopulate
	})

	extractHistoryFromFile = func(repoDirectory, filePath, baseCommit string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, globalRevisions bool, limit int, limitTime int,
	) ([]*model.Commit, []error) {
		return []*model.Commit{{Hash: "abc123"}}, nil
	}
	populateHistoryWithChanges = func(commitHistory []*model.Commit, limit int, limitTime int,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, base string, remote, extRefs bool,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return commitHistory, []error{errors.New("malformed spec"), errors.New("broken reference")}
	}

	commits, err := loadGitHistoryCommits("..", "sample-specs/petstorev3.json", newSummaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "malformed spec")
	assert.Contains(t, err.Error(), "broken reference")
}

func TestLoadGitHubCommits_ReturnsProcessErrors(t *testing.T) {
	originalProcess := processGithubRepo
	t.Cleanup(func() {
		processGithubRepo = originalProcess
	})

	processGithubRepo = func(username, repo, filePath, baseCommit string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		forceCutoff bool, limit int, limitTime int, base string, remote, extRefs bool,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return nil, []error{errors.New("unable to build model")}
	}

	commits, err := loadGitHubCommits("https://github.com/oai/openapi-specification/blob/main/examples/v3.0/petstore.yaml", newSummaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "unable to build model")
}

func TestRenderNewSummary_ReturnsErrorWhenAllCommitsFailToRender(t *testing.T) {
	commit := mustMakeSwagger2Commit(t)

	output, hasBreaking, hasChanges, err := renderNewSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		summaryStyles{},
	)

	require.Error(t, err)
	assert.Contains(t, err.Error(), "all 1 commits failed to render")
	assert.Contains(t, output, "Error: building right model")
	assert.False(t, hasBreaking)
	assert.False(t, hasChanges)
}

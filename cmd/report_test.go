// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRunLeftRightReport_PropagatesChangeratorErrors(t *testing.T) {
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

	report, err := runLeftRightReport(leftPath, rightPath, summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "building right model")
}

func TestRunGithubHistoryReport_PropagatesChangeratorErrors(t *testing.T) {
	originalProcess := processGithubRepo
	t.Cleanup(func() {
		processGithubRepo = originalProcess
	})

	processGithubRepo = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return []*model.Commit{makeSwagger2Commit(t)}, nil
	}

	report, err := runGithubHistoryReport("https://github.com/oai/openapi-specification/blob/main/examples/v2.0/json/petstore-expanded.json", summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "commit abc123")
}

func TestReportCommand_ZeroArgsWithNoColor(t *testing.T) {
	cmd := testRootCmd(GetReportCommand(), "--no-logo", "--no-color")
	output := captureStdout(t, func() {
		assert.NoError(t, cmd.Execute())
	})
	assert.NotContains(t, output, "https://pb33f.io/openapi-changes/")
	assert.Contains(t, output, "How to use the")
}

func TestRunLeftRightReport_Success(t *testing.T) {
	report, err := runLeftRightReport(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.NotEmpty(t, report.Changes)
	assert.NotEmpty(t, report.DateGenerated)
	assert.Nil(t, report.Commit)
	assert.Contains(t, report.Summary, "paths")
	assert.Equal(t, 30, report.Summary["paths"].Total)
	assert.Equal(t, 16, report.Summary["paths"].Breaking)
}

func TestRunLeftRightReport_OmitsCommitDetailsInJSON(t *testing.T) {
	report, err := runLeftRightReport(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)

	require.NoError(t, err)
	require.NotNil(t, report)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	assert.Contains(t, string(encoded), "dateGenerated")
	assert.NotContains(t, string(encoded), "commitDetails")
}

func TestRunLeftRightReport_NormalizesParameterPaths(t *testing.T) {
	report, err := runLeftRightReport(
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)

	require.NoError(t, err)
	require.NotNil(t, report)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	content := string(encoded)

	assert.Contains(t, content, `"path":"$.paths['/user/login'].get.parameters['username'].schema"`)
	assert.Contains(t, content, `"rawPath":"$.paths['/user/login'].get.parameters[0].schema"`)
	assert.Contains(t, content, `"type":"schema"`)

	assert.Contains(t, content, `"path":"$.paths['/user/login'].get.parameters['password']"`)
	assert.Contains(t, content, `"rawPath":"$.paths['/user/login'].get.parameters[1]"`)
	assert.Contains(t, content, `"property":"required"`)
	assert.Contains(t, content, `"type":"parameter"`)
}

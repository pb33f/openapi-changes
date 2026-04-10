// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func captureStdout(t *testing.T, fn func()) string {
	t.Helper()

	oldStdout := os.Stdout
	reader, writer, err := os.Pipe()
	require.NoError(t, err)

	os.Stdout = writer
	t.Cleanup(func() {
		os.Stdout = oldStdout
	})

	fn()

	require.NoError(t, writer.Close())
	output, err := io.ReadAll(reader)
	require.NoError(t, err)
	require.NoError(t, reader.Close())
	os.Stdout = oldStdout

	return string(output)
}

func captureStderr(t *testing.T, fn func()) string {
	t.Helper()

	oldStderr := os.Stderr
	reader, writer, err := os.Pipe()
	require.NoError(t, err)

	os.Stderr = writer
	t.Cleanup(func() {
		os.Stderr = oldStderr
	})

	fn()

	require.NoError(t, writer.Close())
	output, err := io.ReadAll(reader)
	require.NoError(t, err)
	require.NoError(t, reader.Close())
	os.Stderr = oldStderr

	return string(output)
}

func mustMakeDoctorOnlyCommitFromSpecs(t *testing.T, hash, left, right string) *model.Commit {
	t.Helper()

	leftDoc, err := libopenapi.NewDocument([]byte(left))
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument([]byte(right))
	require.NoError(t, err)

	return &model.Commit{
		Hash:        hash,
		Message:     hash,
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        []byte(right),
		OldData:     []byte(left),
		Document:    rightDoc,
		OldDocument: leftDoc,
	}
}

func TestLoadGitHistoryCommits_ReturnsPopulateErrors(t *testing.T) {
	originalExtract := extractHistoryFromFile
	originalPopulate := populateHistory
	t.Cleanup(func() {
		extractHistoryFromFile = originalExtract
		populateHistory = originalPopulate
	})

	extractHistoryFromFile = func(repoDirectory, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
	) ([]*model.Commit, []error) {
		return []*model.Commit{{Hash: "abc123"}}, nil
	}
	populateHistory = func(commitHistory []*model.Commit,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return commitHistory, []error{errors.New("malformed spec"), errors.New("broken reference")}
	}

	commits, err := loadGitHistoryCommits("..", "sample-specs/petstorev3.json", summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "malformed spec")
	assert.Contains(t, err.Error(), "broken reference")
}

func TestLoadGitHistoryCommits_ReturnsFatalProgressErrors(t *testing.T) {
	originalExtract := extractHistoryFromFile
	originalPopulate := populateHistory
	t.Cleanup(func() {
		extractHistoryFromFile = originalExtract
		populateHistory = originalPopulate
	})

	extractHistoryFromFile = func(repoDirectory, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
	) ([]*model.Commit, []error) {
		return []*model.Commit{{Hash: "abc123"}}, nil
	}
	populateHistory = func(commitHistory []*model.Commit,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		errorChan <- model.ProgressError{Message: "unable to parse original document", Fatal: true}
		return commitHistory, nil
	}

	commits, err := loadGitHistoryCommits("..", "sample-specs/petstorev3.json", summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "unable to parse original document")
}

func TestLoadGitHubCommits_ReturnsProcessErrors(t *testing.T) {
	originalProcess := processGithubRepo
	t.Cleanup(func() {
		processGithubRepo = originalProcess
	})

	processGithubRepo = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return nil, []error{errors.New("unable to build model")}
	}

	commits, err := loadGitHubCommits("https://github.com/oai/openapi-specification/blob/main/examples/v3.0/petstore.yaml", summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "unable to build model")
}

func TestRenderSummary_ReturnsErrorWhenAllCommitsFailToRender(t *testing.T) {
	commit := makeSwagger2Commit(t)

	var output string
	var hasBreaking bool
	var hasChanges bool
	var err error
	stderr := captureStderr(t, func() {
		output, hasBreaking, hasChanges, err = renderSummary(
			[]*model.Commit{commit},
			nil,
			false,
			true,
			false,
			summaryStyles{},
		)
	})

	require.Error(t, err)
	assert.Contains(t, err.Error(), "all 1 commits failed to render")
	assert.Contains(t, stderr, "warning: commit abc123: building right model")
	assert.Empty(t, output)
	assert.False(t, hasBreaking)
	assert.False(t, hasChanges)
}

func TestRenderSummary_PartialFailuresWarnAndLimpOn(t *testing.T) {
	validCommit := mustMakeDoctorOnlyCommitFromSpecs(t, "good123", `openapi: 3.0.3
info:
  title: Test
  version: "1.0"
paths: {}
`, `openapi: 3.0.3
info:
  title: Test
  version: "1.1"
paths: {}
`)
	badCommit := makeSwagger2Commit(t)

	var output string
	var hasBreaking bool
	var hasChanges bool
	var err error
	stderr := captureStderr(t, func() {
		output, hasBreaking, hasChanges, err = renderSummary(
			[]*model.Commit{validCommit, badCommit},
			nil,
			false,
			true,
			false,
			summaryStyles{},
		)
	})

	require.NoError(t, err)
	assert.Contains(t, output, "Date:")
	assert.NotContains(t, output, "Error:")
	assert.Contains(t, stderr, "warning: commit abc123: building right model")
	assert.Contains(t, stderr, "warning: 1 commits failed to render")
	assert.False(t, hasBreaking)
	assert.True(t, hasChanges)
}

func TestLoadLeftRightCommits_IdenticalSpecsPreserveComparableRevision(t *testing.T) {
	opts := summaryOpts{noColor: true}

	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		opts, nil,
	)

	require.NoError(t, err)
	require.Len(t, commits, 2)
	assert.NotNil(t, commits[0].Document)
	assert.NotNil(t, commits[0].OldDocument)
	assert.Nil(t, commits[0].Changes)
}

func TestRenderSummary_DirectComparisonNoChangesUsesGenericMessage(t *testing.T) {
	commits, err := loadLeftRightCommits(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)
	require.NoError(t, err)

	output, hasBreaking, hasChanges, err := renderSummary(
		commits,
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Equal(t, "No changes found between specifications\n", output)
	assert.False(t, hasBreaking)
	assert.False(t, hasChanges)
}

func TestRenderSummary_UsesDoctorEngineWhenLegacyChangesMissing(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "abc123",
		Message:     "doctor-only",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
		Changes:     nil,
	}

	output, hasBreaking, hasChanges, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.NotContains(t, output, "No changes found between specifications")
	assert.True(t, hasChanges)
	assert.NotEmpty(t, output)
	assert.Contains(t, output, "Breaking Highlights")
	assert.Contains(t, output, "Counts are deduplicated by JSONPath + property.")
	assert.Contains(t, output, "Document Element")
	assert.Contains(t, output, "paths")
	assert.Contains(t, output, "components")
	assert.Contains(t, output, "[+] 418")
	assert.Contains(t, output, "tags: user -> [cookies, jazz]")
	assert.Contains(t, output, "[+] jazz")
	assert.Contains(t, output, "properties: name -> jazz")
	assert.Contains(t, output, "password")
	assert.NotContains(t, output, "password (1 changes")
	assert.Contains(t, output, "[M] required: false -> true {X}")
	assert.NotContains(t, output, "username (1 changes, 1 breaking)")
	assert.Contains(t, output, "[M] type: string -> integer {X}")
	assert.NotContains(t, output, "[+] codes")
	assert.NotContains(t, output, "[-] codes")
	assert.Equal(t, hasBreaking, strings.Contains(output, "Breaking"))
}

func TestRenderSummary_RendersTreeForFirstRenderableCommit(t *testing.T) {
	validCommit := mustMakeDoctorOnlyCommitFromSpecs(t, "good123", `openapi: 3.0.3
info:
  title: Test
  version: "1.0"
paths: {}
`, `openapi: 3.0.3
info:
  title: Test
  version: "1.1"
paths: {}
`)

	output, hasBreaking, hasChanges, err := renderSummary(
		[]*model.Commit{{Hash: "empty123"}, validCommit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "No changes detected between empty123 and good123")
	assert.Contains(t, output, "info")
	assert.Contains(t, output, "Document Element")
	assert.False(t, hasBreaking)
	assert.True(t, hasChanges)
}

func TestLoadLeftRightCommits_DownloadedFilesAreCleanedUp(t *testing.T) {
	originalHTTPGet := httpGet
	originalBuildChangelog := buildChangelog
	t.Cleanup(func() {
		httpGet = originalHTTPGet
		buildChangelog = originalBuildChangelog
	})

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, _ = w.Write([]byte(`openapi: 3.0.3
info:
  title: Downloaded
  version: "1.0"
paths: {}
`))
	}))
	defer server.Close()

	var originalPath string
	var modifiedPath string
	buildChangelog = func(commits []*model.Commit, progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		originalPath = strings.TrimPrefix(commits[1].Message, "Original file: ")
		modifiedPath = strings.TrimPrefix(commits[0].Message, "Original: "+originalPath+", Modified: ")
		return commits, nil
	}

	commits, err := loadLeftRightCommits(server.URL+"/left.yaml", server.URL+"/right.yaml", summaryOpts{}, nil)

	require.NoError(t, err)
	require.Len(t, commits, 2)
	assert.NoFileExists(t, originalPath)
	assert.NoFileExists(t, modifiedPath)
}

func TestLoadLeftRightCommits_ReturnsHTTPStatusErrors(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, "missing", http.StatusNotFound)
	}))
	defer server.Close()

	commits, err := loadLeftRightCommits(server.URL+"/left.yaml", "../sample-specs/petstorev3.json", summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, commits)
	assert.Contains(t, err.Error(), "unexpected status 404 Not Found")
}

func TestRenderSummary_RendersSecurityRequirementDetail(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "def456",
		Message:     "security-detail",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
		Changes:     nil,
	}

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "Security Requirements")
	assert.Contains(t, output, "petstore_auth/eat:tacos")
}

func TestRenderSummary_RendersOAuthFlowScopeDetail(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "fed654",
		Message:     "oauth-detail",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
		Changes:     nil,
	}

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "oAuth Flows")
	assert.Contains(t, output, "scopes/jazz:jazzy (enjoy more jazz.)")
}

func TestRenderSummary_RendersTopLevelTagTreeDetail(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "tags-detail",
		Message:     "tags-detail",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
		Changes:     nil,
	}

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "├─┬Tags")
	assert.Contains(t, output, "[+] jazz")
	assert.NotContains(t, output, "(46:5)")
	assert.NotContains(t, output, "└─┬jazz")
}

func TestRenderSummary_UsesDeduplicatedHeadlineCounts(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "headline-dedup",
		Message:     "headline-dedup",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
		Changes:     nil,
	}

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "❌  18 Breaking changes out of 42")
	assert.Contains(t, output, "Counts are deduplicated by JSONPath + property.")
	assert.Contains(t, output, "│ components       │             9 │                2 │")
	assert.Contains(t, output, "│ paths            │            28 │               16 │")
	assert.Contains(t, output, "  Additions: 12")
	assert.Contains(t, output, "  Modifications: 20")
	assert.Contains(t, output, "  Removals: 10")
	assert.Contains(t, output, "  Breaking Modifications: 8")
	assert.Contains(t, output, "  Breaking Removals: 10")
}

func TestRenderSummary_WithLinesIncludesSourceLocations(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "with-lines",
		Message:     "with-lines",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
	}

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		true,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "(4:14)")
	assert.Contains(t, output, "(8:16)")
}

func TestRenderSummary_MatchesSecurityRequirementChangesToCorrectScheme(t *testing.T) {
	left := `openapi: 3.0.3
info:
  title: Security Test
  version: "1.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
      security:
        - api_key: []
        - petstore_auth:
            - read:pets
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/auth
          scopes:
            read:pets: Read pets
    api_key:
      type: apiKey
      in: header
      name: api_key
`
	right := `openapi: 3.0.3
info:
  title: Security Test
  version: "1.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
      security:
        - api_key: []
        - petstore_auth:
            - read:pets
            - eat:tacos
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/auth
          scopes:
            read:pets: Read pets
    api_key:
      type: apiKey
      in: header
      name: api_key
`

	commit := mustMakeDoctorOnlyCommitFromSpecs(t, "security-match", left, right)

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "Security Requirements")
	assert.Contains(t, output, "petstore_auth/eat:tacos")
	assert.NotContains(t, output, "api_key (1 changes)")
}

func TestRenderSummary_RendersDocumentSecurityRequirementDetail(t *testing.T) {
	left := `openapi: 3.0.3
info:
  title: Document Security Test
  version: "1.0"
paths: {}
security:
  - api_key: []
  - petstore_auth:
      - read:pets
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/auth
          scopes:
            read:pets: Read pets
    api_key:
      type: apiKey
      in: header
      name: api_key
`
	right := `openapi: 3.0.3
info:
  title: Document Security Test
  version: "1.0"
paths: {}
security:
  - api_key: []
  - petstore_auth:
      - read:pets
      - eat:tacos
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        implicit:
          authorizationUrl: https://example.com/auth
          scopes:
            read:pets: Read pets
    api_key:
      type: apiKey
      in: header
      name: api_key
`

	commit := mustMakeDoctorOnlyCommitFromSpecs(t, "document-security", left, right)

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "Security Requirements")
	assert.Contains(t, output, "petstore_auth/eat:tacos")
	assert.NotContains(t, output, "api_key (1 changes)")
}

func TestRenderSummary_RendersClientCredentialsFlowDetail(t *testing.T) {
	left := `openapi: 3.0.3
info:
  title: OAuth Flow Test
  version: "1.0"
paths: {}
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://example.com/token
          scopes:
            read:pets: Read pets
`
	right := `openapi: 3.0.3
info:
  title: OAuth Flow Test
  version: "1.0"
paths: {}
components:
  securitySchemes:
    petstore_auth:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://example.com/token
          scopes:
            read:pets: Read pets
            eat:tacos: Eat tacos
`

	commit := mustMakeDoctorOnlyCommitFromSpecs(t, "client-credentials", left, right)

	output, _, _, err := renderSummary(
		[]*model.Commit{commit},
		nil,
		false,
		true,
		false,
		summaryStyles{},
	)

	require.NoError(t, err)
	assert.Contains(t, output, "oAuth Flows")
	assert.Contains(t, output, "oAuth Flow")
	assert.Contains(t, output, "scopes/eat:tacos (Eat tacos)")
}

func TestNewSummaryCommand_NoComparableHistoryPrintsPriorVersionMessage(t *testing.T) {
	originalExtract := extractHistoryFromFile
	originalPopulate := populateHistory
	t.Cleanup(func() {
		extractHistoryFromFile = originalExtract
		populateHistory = originalPopulate
	})

	extractHistoryFromFile = func(repoDirectory, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
	) ([]*model.Commit, []error) {
		return []*model.Commit{{Hash: "abc123"}}, nil
	}
	populateHistory = func(commitHistory []*model.Commit,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError, opts git.HistoryOptions,
		breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return []*model.Commit{}, nil
	}

	cmd := testRootCmd(GetSummaryCommand(), "--no-logo", "--no-color", "..", "sample-specs/petstorev3.json")
	output := captureStdout(t, func() {
		require.NoError(t, cmd.Execute())
	})

	assert.Contains(t, output, "The file has no prior version to compare against")
}

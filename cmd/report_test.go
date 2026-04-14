// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/git"
	"github.com/pb33f/openapi-changes/internal/testutil"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRunLeftRightReport_PropagatesChangeratorErrors(t *testing.T) {
	leftPath, rightPath := createBrokenReferenceSpecPair(t)

	report, err := runLeftRightReport(leftPath, rightPath, summaryOpts{}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), leftPath)
	assert.Contains(t, err.Error(), rightPath)
	assert.Contains(t, err.Error(), "building modified model")
}

func TestRunGithubHistoryReport_PropagatesChangeratorErrors(t *testing.T) {
	originalProcess := processGithubRepo
	originalProcessDetailed := processGithubRepoDetailed
	t.Cleanup(func() {
		processGithubRepo = originalProcess
		processGithubRepoDetailed = originalProcessDetailed
	})

	processGithubRepo = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) ([]*model.Commit, []error) {
		return []*model.Commit{makeSwagger2Commit(t)}, nil
	}
	processGithubRepoDetailed = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) (*git.HistoryBuildResult, []error) {
		return &git.HistoryBuildResult{Commits: []*model.Commit{makeSwagger2Commit(t)}}, nil
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
	assert.Equal(t, "../sample-specs/petstorev3-original.json", report.OriginalPath)
	assert.Equal(t, "../sample-specs/petstorev3.json", report.ModifiedPath)
	assert.Contains(t, report.Summary, "paths")
	assert.Equal(t, 30, report.Summary["paths"].Total)
	assert.Equal(t, 16, report.Summary["paths"].Breaking)
}

func TestRunLeftRightReport_IdenticalSpecsShortCircuit(t *testing.T) {
	report, err := runLeftRightReport(
		"../sample-specs/petstorev3.json",
		"../sample-specs/petstorev3.json",
		summaryOpts{noColor: true},
		nil,
	)

	require.NoError(t, err)
	assert.Nil(t, report)
}

func TestRunLeftRightReport_SanitizesURLSourceMetadata(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/left.yaml" {
			_, _ = w.Write([]byte("openapi: 3.0.3\ninfo:\n  title: Left\n  version: '1.0'\npaths: {}\n"))
			return
		}
		_, _ = w.Write([]byte("openapi: 3.0.3\ninfo:\n  title: Right\n  version: '1.1'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: ok\n"))
	}))
	defer server.Close()

	leftURL := server.URL + "/left.yaml?token=left-secret#frag"
	rightURL := server.URL + "/right.yaml?token=right-secret#frag"

	report, err := runLeftRightReport(leftURL, rightURL, summaryOpts{noColor: true}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.Equal(t, server.URL+"/left.yaml", report.OriginalPath)
	assert.Equal(t, server.URL+"/right.yaml", report.ModifiedPath)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	assert.NotContains(t, string(encoded), "left-secret")
	assert.NotContains(t, string(encoded), "right-secret")
}

func TestRunLeftRightReport_SummaryIncludesDocumentLevelOpenAPIChanges(t *testing.T) {
	dir := t.TempDir()

	left := "openapi: 3.0.0\ninfo:\n  title: test\n  version: 1.0.0\npaths: {}\n"
	right := "openapi: 3.1.0\ninfo:\n  title: test\n  version: 2.0.0\npaths: {}\n"

	leftPath := filepath.Join(dir, "left.yaml")
	rightPath := filepath.Join(dir, "right.yaml")
	require.NoError(t, os.WriteFile(leftPath, []byte(left), 0o644))
	require.NoError(t, os.WriteFile(rightPath, []byte(right), 0o644))

	report, err := runLeftRightReport(leftPath, rightPath, summaryOpts{noColor: true}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Contains(t, report.Summary, "openapi")
	require.Contains(t, report.Summary, "info")
	assert.Equal(t, 1, report.Summary["openapi"].Total)
	assert.Equal(t, 1, report.Summary["openapi"].Breaking)
	assert.Equal(t, 1, report.Summary["info"].Total)
	assert.Equal(t, 0, report.Summary["info"].Breaking)
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

func TestReportCommand_ReproducibleOutputIsStableAcrossRuns(t *testing.T) {
	args := []string{
		"--no-logo",
		"--no-color",
		"--reproducible",
		"../sample-specs/petstorev3-original.json",
		"../sample-specs/petstorev3.json",
	}

	runOnce := func() string {
		cmd := testRootCmd(GetReportCommand(), args...)
		return captureStdout(t, func() {
			require.NoError(t, cmd.Execute())
		})
	}

	first := runOnce()
	second := runOnce()

	assert.Equal(t, stripRawPaths(t, first), stripRawPaths(t, second))
	assert.NotContains(t, first, `"dateGenerated"`)
	assert.NotContains(t, first, `"commitDetails"`)
	assert.Contains(t, first, `"rawPath"`)
}

func TestRunLeftRightReport_GitRefExplodedSpecIncludesSiblingChanges(t *testing.T) {
	repoDir, _ := createExplodedGitSpecRepo(t)
	chdirForTest(t, repoDir)

	report, err := runLeftRightReport(
		"HEAD~1:apis/openapi.yaml",
		"HEAD:apis/openapi.yaml",
		summaryOpts{noColor: true},
		nil,
	)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.NotEmpty(t, report.Changes)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	content := string(encoded)
	assert.Contains(t, content, `"property":"required"`)
	assert.Contains(t, content, `"path":"$.paths['/pets'].get.responses['200'].content['application/json'].schema"`)
	assert.Contains(t, content, `"document":"apis/components/pet.yaml"`)
	assert.NotContains(t, content, ".openapi-changes-gitref")
}

func TestRunLeftRightReport_LocalExplodedSpecIncludesSiblingChanges(t *testing.T) {
	leftPath, rightPath := createExplodedLocalSpecPair(t)

	report, err := runLeftRightReport(leftPath, rightPath, summaryOpts{noColor: true}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.NotEmpty(t, report.Changes)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	assert.Contains(t, string(encoded), `"property":"required"`)
	assert.Contains(t, string(encoded), `"path":"$.paths['/pets'].get.responses['200'].content['application/json'].schema"`)
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

	// Verify named (normalized) paths exist — these are stable regardless of parameter order.
	assert.Contains(t, content, `"path":"$.paths['/user/login'].get.parameters['username'].schema"`)
	assert.Contains(t, content, `"path":"$.paths['/user/login'].get.parameters['password']"`)

	// Verify raw index paths exist for both parameters (order may vary across Go versions).
	usernameSchemaRaw0 := `"rawPath":"$.paths['/user/login'].get.parameters[0].schema"`
	usernameSchemaRaw1 := `"rawPath":"$.paths['/user/login'].get.parameters[1].schema"`
	assert.True(t, strings.Contains(content, usernameSchemaRaw0) || strings.Contains(content, usernameSchemaRaw1),
		"expected rawPath for username.schema with index 0 or 1")

	passwordRaw0 := `"rawPath":"$.paths['/user/login'].get.parameters[0]","type":"parameter"`
	passwordRaw1 := `"rawPath":"$.paths['/user/login'].get.parameters[1]","type":"parameter"`
	assert.True(t, strings.Contains(content, passwordRaw0) || strings.Contains(content, passwordRaw1),
		"expected rawPath for password with index 0 or 1")

	assert.Contains(t, content, `"type":"schema"`)
	assert.Contains(t, content, `"property":"required"`)
	assert.Contains(t, content, `"type":"parameter"`)
}

func TestRunLeftRightReport_ComposedSchemaTitleRemovalDoesNotMislabelAsAnyOf(t *testing.T) {
	leftPath, rightPath := createComposedSchemaTitleRemovalSpecPair(t, "allOf")

	report, err := runLeftRightReport(leftPath, rightPath, summaryOpts{noColor: true}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Changes, 1)

	change := report.Changes[0]
	assert.Equal(t, "title", change.Property)
	assert.Equal(t, "schema", change.Type)
	assert.Equal(t, "$.components.schemas['Contract']", change.Path)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	assert.NotContains(t, string(encoded), `"property":"anyOf"`)
}

func TestRunLeftRightReport_GitRefBasePathUsesRevisionScopedSiblingRefs(t *testing.T) {
	repoDir, fileName := createMovedRefGitSpecRepo(t)
	chdirForTest(t, repoDir)

	report, err := runLeftRightReport(
		"HEAD~1:"+fileName,
		"HEAD:"+fileName,
		summaryOpts{base: repoDir, noColor: true, limitTime: -1},
		nil,
	)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.NotEmpty(t, report.Changes)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	content := string(encoded)
	assert.Contains(t, content, `"property":"$ref"`)
	assert.Contains(t, content, `"path":"$.paths['/thing'].get.responses['200'].content['application/json'].schema"`)
}

func TestRunGitHistoryReport_BasePathUsesRevisionScopedSiblingRefs(t *testing.T) {
	repoDir, fileName := createMovedRefGitSpecRepo(t)

	report, err := runGitHistoryReport(repoDir, fileName, summaryOpts{base: repoDir, noColor: true, limitTime: -1}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Reports, 1)
	assert.NotEmpty(t, report.Reports[0].Changes)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	content := string(encoded)
	assert.Contains(t, content, `"property":"$ref"`)
	assert.Contains(t, content, `"path":"$.paths['/thing'].get.responses['200'].content['application/json'].schema"`)
}

func TestRunGitHistoryReport_LimitOneComparesAgainstParent(t *testing.T) {
	repoDir := createGitSpecRepoForFile(t, "openapi.yaml")

	report, err := runGitHistoryReport(repoDir, "openapi.yaml", summaryOpts{
		base:      repoDir,
		noColor:   true,
		limit:     1,
		limitTime: -1,
	}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Reports, 1)
	assert.Equal(t, gitOutputInDir(t, repoDir, "rev-parse", "--short", "HEAD"), report.Reports[0].Commit.Hash)
	assert.NotEmpty(t, report.Reports[0].Changes)
}

func TestRunGitHistoryReport_BaseCommitUsesExcludedParentAsBaseline(t *testing.T) {
	repoDir := createGitSpecRepoForFile(t, "openapi.yaml")
	baseCommit := gitOutputInDir(t, repoDir, "rev-parse", "--short", "HEAD~2")

	report, err := runGitHistoryReport(repoDir, "openapi.yaml", summaryOpts{
		base:       repoDir,
		baseCommit: baseCommit,
		noColor:    true,
		limitTime:  -1,
	}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Reports, 2)
	assert.Equal(t, gitOutputInDir(t, repoDir, "rev-parse", "--short", "HEAD"), report.Reports[0].Commit.Hash)
	assert.Equal(t, gitOutputInDir(t, repoDir, "rev-parse", "--short", "HEAD~1"), report.Reports[1].Commit.Hash)
	assert.NotEmpty(t, report.Reports[1].Changes)
}

func TestRunGitHistoryReport_PartialHistoryIncludesMetaData(t *testing.T) {
	fixture := testutil.CreateInvalidHistoryGitSpecRepo(t)

	report, err := runGitHistoryReport(fixture.RepoDir, fixture.FileName, summaryOpts{base: fixture.RepoDir, noColor: true, limitTime: -1}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Reports, 1)
	require.NotNil(t, report.MetaData)
	assert.True(t, report.MetaData.Partial)
	assert.Equal(t, []string{fixture.InvalidHash}, report.MetaData.SkippedCommits)
	assert.Equal(t, fixture.NewestHash, report.Reports[0].Commit.Hash)

	encoded, err := json.Marshal(report)
	require.NoError(t, err)
	assert.Contains(t, string(encoded), `"metaData"`)
	assert.Contains(t, string(encoded), fixture.InvalidHash)
}

func TestRunGitHistoryReport_PartialHistoryWithoutChangesReturnsEmptyPartialReport(t *testing.T) {
	fixture := testutil.CreateRevertedHistoryGitSpecRepo(t)

	report, err := runGitHistoryReport(fixture.RepoDir, fixture.FileName, summaryOpts{
		base:      fixture.RepoDir,
		noColor:   true,
		limitTime: -1,
	}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.Empty(t, report.Reports)
	require.NotNil(t, report.MetaData)
	assert.True(t, report.MetaData.Partial)
	assert.Equal(t, []string{fixture.InvalidHash}, report.MetaData.SkippedCommits)
}

func TestRunGitHistoryReport_AllInvalidHistoryFails(t *testing.T) {
	repoDir := t.TempDir()
	runGitInDir(t, repoDir, "init")
	runGitInDir(t, repoDir, "config", "user.name", "Test User")
	runGitInDir(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "openapi.yaml"
	specPath := filepath.Join(repoDir, fileName)
	require.NoError(t, os.WriteFile(specPath, []byte("swagger: \"2.0\"\ninfo:\n  title: broken\n  version: \"1.0\"\npaths: {}\n"), 0o644))
	runGitInDir(t, repoDir, "add", fileName)
	runGitInDir(t, repoDir, "commit", "-m", "invalid one")
	require.NoError(t, os.WriteFile(specPath, []byte("swagger: \"2.0\"\ninfo:\n  title: broken\n  version: \"1.1\"\npaths: {}\n"), 0o644))
	runGitInDir(t, repoDir, "add", fileName)
	runGitInDir(t, repoDir, "commit", "-m", "invalid two")

	report, err := runGitHistoryReport(repoDir, fileName, summaryOpts{base: repoDir, noColor: true, limitTime: -1}, nil)

	require.Error(t, err)
	assert.Nil(t, report)
	assert.Contains(t, err.Error(), "failed to render report data")
}

func TestRunGithubHistoryReport_PartialHistoryIncludesMetaData(t *testing.T) {
	originalProcess := processGithubRepoDetailed
	t.Cleanup(func() {
		processGithubRepoDetailed = originalProcess
	})

	commits := []*model.Commit{
		mustMakeDoctorOnlyCommitFromSpecs(t, "ccc333", `openapi: 3.0.3
info:
  title: test
  version: "1.0.0"
paths: {}
`, `openapi: 3.0.3
info:
  title: test
  version: "1.2.0"
paths:
  /pets:
    get:
      responses:
        "200":
          description: ok
`),
	}
	commits[0].Message = "valid last"
	commits[0].Author = "tester"

	processGithubRepoDetailed = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) (*git.HistoryBuildResult, []error) {
		return &git.HistoryBuildResult{
			Commits:        commits,
			SkippedCommits: []string{"bbb222"},
		}, nil
	}

	report, err := runGithubHistoryReport("https://github.com/oai/openapi-specification/blob/main/examples/v3.0/petstore.yaml", summaryOpts{}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	require.Len(t, report.Reports, 1)
	require.NotNil(t, report.MetaData)
	assert.True(t, report.MetaData.Partial)
	assert.Equal(t, []string{"bbb222"}, report.MetaData.SkippedCommits)
}

func TestRunGithubHistoryReport_PartialHistoryWithoutChangesReturnsEmptyPartialReport(t *testing.T) {
	originalProcess := processGithubRepoDetailed
	t.Cleanup(func() {
		processGithubRepoDetailed = originalProcess
	})

	processGithubRepoDetailed = func(username, repo, filePath string,
		progressChan chan *model.ProgressUpdate, errorChan chan model.ProgressError,
		opts git.HistoryOptions, breakingConfig *whatChangedModel.BreakingRulesConfig,
	) (*git.HistoryBuildResult, []error) {
		return &git.HistoryBuildResult{
			Commits: []*model.Commit{
				mustMakeDoctorOnlyCommitFromSpecs(t, "ccc333", `openapi: 3.0.3
info:
  title: test
  version: "1.0.0"
paths: {}
`, `openapi: 3.0.3
info:
  title: test
  version: "1.0.0"
paths: {}
`),
			},
			SkippedCommits: []string{"bbb222"},
		}, nil
	}

	report, err := runGithubHistoryReport("https://github.com/oai/openapi-specification/blob/main/examples/v3.0/petstore.yaml", summaryOpts{}, nil)

	require.NoError(t, err)
	require.NotNil(t, report)
	assert.Empty(t, report.Reports)
	require.NotNil(t, report.MetaData)
	assert.True(t, report.MetaData.Partial)
	assert.Equal(t, []string{"bbb222"}, report.MetaData.SkippedCommits)
}

func TestReportCommand_GitRefUsesLeftRightMode(t *testing.T) {
	wd, err := os.Getwd()
	require.NoError(t, err)
	repoRoot := filepath.Clean(filepath.Join(wd, ".."))
	chdirForTest(t, repoRoot)

	cmd := testRootCmd(GetReportCommand(),
		"HEAD:sample-specs/petstorev3-original.json",
		"sample-specs/petstorev3.json",
	)

	output := captureStdout(t, func() {
		require.NoError(t, cmd.Execute())
	})

	assert.Contains(t, output, `"changes"`)
	assert.Contains(t, output, `"originalPath": "HEAD:sample-specs/petstorev3-original.json"`)
	assert.Contains(t, output, `"modifiedPath": "sample-specs/petstorev3.json"`)
	assert.Contains(t, output, `"summary"`)
	assert.NotContains(t, output, `"reports"`)
}

func TestReportCommand_RepoHistoryColonPathUsesHistoryMode(t *testing.T) {
	repoDir := createGitSpecRepoForFile(t, "v1:beta.yaml")
	chdirForTest(t, t.TempDir())

	cmd := testRootCmd(GetReportCommand(), repoDir, "v1:beta.yaml")
	output := captureStdout(t, func() {
		require.NoError(t, cmd.Execute())
	})

	assert.Contains(t, output, `"gitRepoPath": "`+repoDir+`"`)
	assert.Contains(t, output, `"gitFilePath": "v1:beta.yaml"`)
	assert.Contains(t, output, `"reports"`)
	assert.NotContains(t, output, `"originalPath"`)
}

func stripRawPaths(t *testing.T, raw string) string {
	t.Helper()

	var payload any
	require.NoError(t, json.Unmarshal([]byte(raw), &payload))
	removeJSONKey(payload, "rawPath")

	bits, err := json.MarshalIndent(payload, "", "  ")
	require.NoError(t, err)
	return string(bits)
}

func removeJSONKey(value any, key string) {
	switch typed := value.(type) {
	case map[string]any:
		delete(typed, key)
		for _, child := range typed {
			removeJSONKey(child, key)
		}
	case []any:
		for _, child := range typed {
			removeJSONKey(child, key)
		}
	}
}

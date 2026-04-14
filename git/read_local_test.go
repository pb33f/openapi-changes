// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/pb33f/openapi-changes/internal/testutil"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCheckLocalRepoAvailable(t *testing.T) {
	assert.True(t, CheckLocalRepoAvailable("./"))
	assert.False(t, CheckLocalRepoAvailable("/tmp/made-up"))
}

func TestExtractHistoryFromFile(t *testing.T) {
	c := make(chan *model.ProgressUpdate, 32)
	e := make(chan model.ProgressError, 32)

	history, errs := ExtractHistoryFromFile("./", "read_local.go", c, e, HistoryOptions{Limit: 25, LimitTime: -1})
	require.Empty(t, errs)
	require.NotEmpty(t, history)

	oldest := history[len(history)-1]
	assert.Equal(t, "./", oldest.RepoDirectory)
	assert.Equal(t, "read_local.go", oldest.FilePath)
	assert.NotEmpty(t, oldest.Hash)
	assert.NotEmpty(t, oldest.Message)
	assert.False(t, oldest.CommitDate.IsZero())
}

func TestExtractHistoryFromFile_Fail(t *testing.T) {

	c := make(chan *model.ProgressUpdate)
	e := make(chan model.ProgressError)
	d := make(chan bool)
	go func() {
		select {
		case <-c:
			d <- true
		case <-e:
			d <- true
		}
	}()

	history, _ := ExtractHistoryFromFile("./", "no_file_nope", c, e, HistoryOptions{Limit: 5, LimitTime: -1})
	<-d
	assert.Len(t, history, 0)
}

func TestExtractPathAndFile(t *testing.T) {
	var dir, file string
	dir, file = ExtractPathAndFile("/some/place/thing.html")
	assert.Equal(t, "/some/place", dir)
	assert.Equal(t, "thing.html", file)
	dir, file = ExtractPathAndFile("../../thing.html")
	assert.Equal(t, "../..", dir)
	assert.Equal(t, "thing.html", file)
}

func TestGetTopLevel(t *testing.T) {
	str, err := GetTopLevel("./")
	assert.NoError(t, err)
	assert.NotEmpty(t, str)
	assert.Equal(t, str, strings.TrimSpace(str))
}

func TestExtractHistoryFromFile_LimitZeroMeansUnlimited(t *testing.T) {
	repoDir := t.TempDir()
	runGit(t, repoDir, "init")
	runGit(t, repoDir, "config", "user.name", "Test User")
	runGit(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "spec.yaml"
	filePath := filepath.Join(repoDir, fileName)
	for i := 1; i <= 3; i++ {
		spec := fmt.Sprintf("openapi: 3.0.%d\ninfo:\n  title: test\npaths: {}\n", i)
		require.NoError(t, os.WriteFile(filePath, []byte(spec), 0644))
		runGit(t, repoDir, "add", fileName)
		runGit(t, repoDir, "commit", "-m", fmt.Sprintf("commit %d", i))
	}

	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	allHistory, errs := ExtractHistoryFromFile(repoDir, fileName, progressChan, errorChan, HistoryOptions{Limit: 0, LimitTime: -1})
	require.Empty(t, errs)
	require.Len(t, allHistory, 3)

	limitedHistory, errs := ExtractHistoryFromFile(repoDir, fileName, progressChan, errorChan, HistoryOptions{Limit: 1, LimitTime: -1})
	require.Empty(t, errs)
	require.Len(t, limitedHistory, 1)
}

func TestReadFile(t *testing.T) {
	contentRaw, err := readFile("../", "HEAD", "./git/read_local.go")
	assert.NoError(t, err)
	assert.NotEmpty(t, contentRaw)
}

func TestReadFileAtRevision(t *testing.T) {
	contentRaw, err := ReadFileAtRevision("../", "HEAD", "go.mod")
	require.NoError(t, err)
	assert.NotEmpty(t, contentRaw)
}

func TestReadFileAtRevision_BadRevision(t *testing.T) {
	contentRaw, err := ReadFileAtRevision("../", "not-a-real-revision", "go.mod")
	require.Error(t, err)
	assert.Nil(t, contentRaw)
	assert.Contains(t, err.Error(), "cannot read 'go.mod' at revision 'not-a-real-revision'")
}

func TestReadFileAtRevision_BadFile(t *testing.T) {
	contentRaw, err := ReadFileAtRevision("../", "HEAD", "missing-file.yaml")
	require.Error(t, err)
	assert.Nil(t, contentRaw)
	assert.Contains(t, err.Error(), "cannot read 'missing-file.yaml' at revision 'HEAD'")
}

func TestBuildChangelog_IdenticalLeftRightPreservesSentinelCommit(t *testing.T) {
	specBytes := mustReadTestFile(t, "../sample-specs/petstorev3.json")
	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	commits := []*model.Commit{
		{
			Hash:       "right1",
			Message:    "right",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
		{
			Hash:       "left01",
			Message:    "left",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
	}

	cleaned, errs := BuildChangelog(commits, progressChan, errorChan, HistoryOptions{Remote: true}, nil)
	require.Empty(t, errs)
	require.Len(t, cleaned, 1)
	assert.Nil(t, cleaned[0].Changes)
	assert.NotNil(t, cleaned[0].Document)
}

func TestBuildChangelog_IdenticalLeftRightPreservesComparableRevision(t *testing.T) {
	specBytes := mustReadTestFile(t, "../sample-specs/petstorev3.json")
	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	commits := []*model.Commit{
		{
			Hash:       "right1",
			Message:    "right",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
		{
			Hash:       "left01",
			Message:    "left",
			CommitDate: time.Now(),
			Data:       specBytes,
			FilePath:   "../sample-specs/petstorev3.json",
		},
	}

	cleaned, errs := BuildChangelog(commits, progressChan, errorChan, HistoryOptions{Remote: true, KeepComparable: true}, nil)
	require.Empty(t, errs)
	require.Len(t, cleaned, 2)
	assert.NotNil(t, cleaned[0].Document)
	assert.NotNil(t, cleaned[0].OldDocument)
	assert.Nil(t, cleaned[0].Changes)
}

func TestPopulateHistory_UsesRevisionScopedSiblingRefs(t *testing.T) {
	repoDir, fileName := testutil.CreateMovedRefGitSpecRepo(t)
	progressChan := make(chan *model.ProgressUpdate, 32)
	errorChan := make(chan model.ProgressError, 32)

	history, errs := ExtractHistoryFromFile(repoDir, fileName, progressChan, errorChan, HistoryOptions{Limit: 0, LimitTime: -1})
	require.Empty(t, errs)
	require.Len(t, history, 2)

	cleaned, errs := PopulateHistory(history, progressChan, errorChan, HistoryOptions{
		Base:           repoDir,
		KeepComparable: true,
	}, nil)
	require.Empty(t, errs)
	require.Len(t, cleaned, 2)
	require.NotNil(t, cleaned[0].Document)
	require.NotNil(t, cleaned[0].OldDocument)
	require.NotEmpty(t, cleaned[0].DocumentRewriters)
}

func TestPopulateHistoryDetailed_SkipsInvalidCommitAndUsesNearestPriorValid(t *testing.T) {
	fixture := testutil.CreateInvalidHistoryGitSpecRepo(t)
	progressChan := make(chan *model.ProgressUpdate, 64)
	errorChan := make(chan model.ProgressError, 64)

	history, errs := ExtractHistoryFromFile(fixture.RepoDir, fixture.FileName, progressChan, errorChan, HistoryOptions{Limit: 0, LimitTime: -1})
	require.Empty(t, errs)
	require.Len(t, history, 3)

	result, errs := PopulateHistoryDetailed(history, progressChan, errorChan, HistoryOptions{
		KeepComparable: true,
	}, nil)
	require.Empty(t, errs)
	require.NotNil(t, result)
	require.Len(t, result.SkippedCommits, 1)
	assert.Equal(t, fixture.InvalidHash, result.SkippedCommits[0])
	require.Len(t, result.Commits, 2)
	assert.Equal(t, fixture.NewestHash, result.Commits[0].Hash)
	assert.Equal(t, fixture.OldestHash, result.Commits[1].Hash)
	require.NotNil(t, result.Commits[0].OldDocument)
	require.NotNil(t, result.Commits[0].Document)
	assert.Equal(t, string(result.Commits[1].Data), string(result.Commits[0].OldData))
	assert.NotNil(t, result.Commits[1].Document)
	assert.Nil(t, result.Commits[1].OldDocument)
}

func TestPopulateHistoryDetailed_LimitOneComparesAgainstParent(t *testing.T) {
	repoDir := t.TempDir()
	runGit(t, repoDir, "init")
	runGit(t, repoDir, "config", "user.name", "Test User")
	runGit(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "openapi.yaml"
	specPath := filepath.Join(repoDir, fileName)

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: first\n  version: '1.0'\npaths: {}\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: second\n  version: '1.1'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: ok\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "second")

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: third\n  version: '1.2'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: updated ok\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "third")

	progressChan := make(chan *model.ProgressUpdate, 64)
	errorChan := make(chan model.ProgressError, 64)

	history, errs := ExtractHistoryFromFile(repoDir, fileName, progressChan, errorChan, HistoryOptions{Limit: 1, LimitTime: -1})
	require.Empty(t, errs)
	require.Len(t, history, 1)

	result, errs := PopulateHistoryDetailed(history, progressChan, errorChan, HistoryOptions{
		KeepComparable: true,
	}, nil)
	require.Empty(t, errs)
	require.NotNil(t, result)
	require.Len(t, result.Commits, 1)

	commit := result.Commits[0]
	assert.Equal(t, gitOutput(t, repoDir, "rev-parse", "--short", "HEAD"), commit.Hash)
	require.NotNil(t, commit.Document)
	require.NotNil(t, commit.OldDocument)
	require.NotNil(t, commit.Changes)
	assert.Contains(t, string(commit.OldData), "title: second")
}

func TestPopulateHistoryDetailed_BaseCommitComparesAgainstExcludedParent(t *testing.T) {
	repoDir := t.TempDir()
	runGit(t, repoDir, "init")
	runGit(t, repoDir, "config", "user.name", "Test User")
	runGit(t, repoDir, "config", "user.email", "test@example.com")

	fileName := "openapi.yaml"
	specPath := filepath.Join(repoDir, fileName)

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: first\n  version: '1.0'\npaths: {}\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "first")

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: second\n  version: '1.1'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: ok\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "second")

	require.NoError(t, os.WriteFile(specPath, []byte("openapi: 3.0.3\ninfo:\n  title: third\n  version: '1.2'\npaths:\n  /pets:\n    get:\n      responses:\n        \"200\":\n          description: updated ok\n"), 0o644))
	runGit(t, repoDir, "add", fileName)
	runGit(t, repoDir, "commit", "-m", "third")

	progressChan := make(chan *model.ProgressUpdate, 64)
	errorChan := make(chan model.ProgressError, 64)
	baseCommit := gitOutput(t, repoDir, "rev-parse", "--short", "HEAD~2")

	history, errs := ExtractHistoryFromFile(repoDir, fileName, progressChan, errorChan, HistoryOptions{
		BaseCommit: baseCommit,
		LimitTime:  -1,
	})
	require.Empty(t, errs)
	require.Len(t, history, 2)

	result, errs := PopulateHistoryDetailed(history, progressChan, errorChan, HistoryOptions{
		KeepComparable: true,
	}, nil)
	require.Empty(t, errs)
	require.NotNil(t, result)
	require.Len(t, result.Commits, 2)

	oldestLoaded := result.Commits[1]
	assert.Equal(t, gitOutput(t, repoDir, "rev-parse", "--short", "HEAD~1"), oldestLoaded.Hash)
	require.NotNil(t, oldestLoaded.Document)
	require.NotNil(t, oldestLoaded.OldDocument)
	require.NotNil(t, oldestLoaded.Changes)
	assert.Contains(t, string(oldestLoaded.OldData), "title: first")
}

func runGit(t *testing.T, dir string, args ...string) {
	t.Helper()

	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	require.NoError(t, err, "git %v failed: %s", args, string(out))
}

func mustReadTestFile(t *testing.T, path string) []byte {
	t.Helper()

	bits, err := os.ReadFile(path)
	require.NoError(t, err, fmt.Sprintf("read test file %s", path))
	return bits
}

func gitOutput(t *testing.T, dir string, args ...string) string {
	t.Helper()

	cmd := exec.Command("git", args...)
	cmd.Dir = dir
	out, err := cmd.CombinedOutput()
	require.NoError(t, err, "git %v failed: %s", args, string(out))
	return strings.TrimSpace(string(out))
}

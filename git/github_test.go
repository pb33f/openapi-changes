// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package git

import (
	"context"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/pb33f/doctor/github"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockGitHubAPI implements the narrow githubAPI interface for testing.
type mockGitHubAPI struct {
	commitList  func(ctx context.Context, session *github.GitHubSession, owner, repo, path string, options *github.CommitListOptions) ([]github.Commit, error)
	commit      func(ctx context.Context, session *github.GitHubSession, owner, repo, sha string) (*github.Commit, error)
	fileContent func(ctx context.Context, session *github.GitHubSession, owner, repo, path, ref string) (*github.FileContent, error)
}

func (m *mockGitHubAPI) GetCommitList(ctx context.Context, session *github.GitHubSession, owner, repo, path string, options *github.CommitListOptions) ([]github.Commit, error) {
	return m.commitList(ctx, session, owner, repo, path, options)
}

func (m *mockGitHubAPI) GetCommit(ctx context.Context, session *github.GitHubSession, owner, repo, sha string) (*github.Commit, error) {
	return m.commit(ctx, session, owner, repo, sha)
}

func (m *mockGitHubAPI) GetFileContent(ctx context.Context, session *github.GitHubSession, owner, repo, path, ref string) (*github.FileContent, error) {
	return m.fileContent(ctx, session, owner, repo, path, ref)
}

func makeCommit(sha, message, author, email string, date time.Time, files []github.CommitFile) github.Commit {
	return github.Commit{
		SHA:     sha,
		Message: message,
		Author: github.CommitAuthor{
			Name:  author,
			Email: email,
			Date:  date,
		},
		Files: files,
	}
}

func makeProgressChans() (chan *model.ProgressUpdate, chan model.ProgressError) {
	return make(chan *model.ProgressUpdate, 100), make(chan model.ProgressError, 100)
}

// dummySession creates a minimal session for testing. The session is not connected
// to any real GitHub API — it's just used to satisfy the session parameter.
func dummySession() *github.GitHubSession {
	config := github.DefaultSessionConfig()
	return github.NewGitHubSession("test-token-for-unit-testing", config)
}

// makeCommitLookup returns a mock GetCommit function that looks up commits by SHA
// and attaches the given filename to the file list.
func makeCommitLookup(commits []github.Commit, filename string) func(context.Context, *github.GitHubSession, string, string, string) (*github.Commit, error) {
	return func(_ context.Context, _ *github.GitHubSession, _, _, sha string) (*github.Commit, error) {
		for i := range commits {
			if commits[i].SHA == sha {
				c := commits[i]
				c.Files = []github.CommitFile{{Filename: filename}}
				return &c, nil
			}
		}
		return nil, fmt.Errorf("commit not found: %s", sha)
	}
}

// makeStaticCommitList returns a mock GetCommitList function that always returns the given commits.
func makeStaticCommitList(commits []github.Commit) func(context.Context, *github.GitHubSession, string, string, string, *github.CommitListOptions) ([]github.Commit, error) {
	return func(_ context.Context, _ *github.GitHubSession, _, _, _ string, _ *github.CommitListOptions) ([]github.Commit, error) {
		return commits, nil
	}
}

// makeStaticFileContent returns a mock GetFileContent function that always returns base64-encoded content.
func makeStaticFileContent(content string) func(context.Context, *github.GitHubSession, string, string, string, string) (*github.FileContent, error) {
	return func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
		return &github.FileContent{Content: content}, nil
	}
}

func TestCreateSession_TokenRequired(t *testing.T) {
	t.Setenv(GithubToken, "")
	session, svc, err := createGitHubSession()
	assert.Nil(t, session)
	assert.Nil(t, svc)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "GH_TOKEN environment variable is required")
}

func TestCreateSession_AcceptableToken(t *testing.T) {
	// Use a syntactically valid token (>= 20 chars, printable ASCII).
	t.Setenv(GithubToken, "ghp_test1234567890abcdef")
	session, svc, err := createGitHubSession()
	assert.NoError(t, err)
	assert.NotNil(t, session)
	assert.NotNil(t, svc)
	session.Close()
}

func TestCreateSession_ShortToken(t *testing.T) {
	// Token < 20 chars should fail doctor's validation and return nil session.
	t.Setenv(GithubToken, "short")
	session, svc, err := createGitHubSession()
	assert.Nil(t, session)
	assert.Nil(t, svc)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to create GitHub session")
}

func TestGetCommitsForGithubFile_Basic(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111", "first", "Alice", "alice@test.com", now.Add(-3*time.Hour), nil),
		makeCommit("bbb222", "second", "Bob", "bob@test.com", now.Add(-2*time.Hour), nil),
		makeCommit("ccc333", "third", "Charlie", "charlie@test.com", now.Add(-1*time.Hour), nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("openapi: 3.0.0"))

	mock := &mockGitHubAPI{
		commitList:  makeStaticCommitList(commits),
		commit:      makeCommitLookup(commits, "api/spec.yaml"),
		fileContent: makeStaticFileContent(fileContent),
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "api/spec.yaml", "",
		progressChan, errorChan, false, 0, -1, session, mock)

	require.NoError(t, err)
	require.Len(t, result, 3)
	assert.Equal(t, "aaa111", result[0].Commit.SHA)
	assert.Equal(t, "bbb222", result[1].Commit.SHA)
	assert.Equal(t, "ccc333", result[2].Commit.SHA)
	assert.Equal(t, []byte("openapi: 3.0.0"), result[0].FileBytes)
}

func TestGetCommitsForGithubFile_Limit(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111", "first", "Alice", "alice@test.com", now.Add(-4*time.Hour), nil),
		makeCommit("bbb222", "second", "Bob", "bob@test.com", now.Add(-3*time.Hour), nil),
		makeCommit("ccc333", "third", "Charlie", "charlie@test.com", now.Add(-2*time.Hour), nil),
		makeCommit("ddd444", "fourth", "Dave", "dave@test.com", now.Add(-1*time.Hour), nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("spec"))

	mock := &mockGitHubAPI{
		commitList: func(_ context.Context, _ *github.GitHubSession, _, _, _ string, opts *github.CommitListOptions) ([]github.Commit, error) {
			assert.Equal(t, 3, opts.MaxResults) // limit=2 => MaxResults=3
			return commits, nil
		},
		commit:      makeCommitLookup(commits, "spec.yaml"),
		fileContent: makeStaticFileContent(fileContent),
	}

	// limit=2 should process 2+1=3 commits (extra for baseline)
	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 2, -1, session, mock)

	require.NoError(t, err)
	require.Len(t, result, 3)
}

func TestGetCommitsForGithubFile_BaseCommit(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111aaa111aaa111aaa111aaa111aaa111aaaa", "first", "Alice", "a@t.com", now.Add(-3*time.Hour), nil),
		makeCommit("bbb222bbb222bbb222bbb222bbb222bbb222bbbb", "second", "Bob", "b@t.com", now.Add(-2*time.Hour), nil),
		makeCommit("ccc333ccc333ccc333ccc333ccc333ccc333cccc", "third", "Charlie", "c@t.com", now.Add(-1*time.Hour), nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("data"))

	mock := &mockGitHubAPI{
		commitList:  makeStaticCommitList(commits),
		commit:      makeCommitLookup(commits, "spec.yaml"),
		fileContent: makeStaticFileContent(fileContent),
	}

	// Use prefix match — should stop at bbb222 (inclusive)
	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "bbb222",
		progressChan, errorChan, false, 0, -1, session, mock)

	require.NoError(t, err)
	require.Len(t, result, 2) // aaa111 and bbb222
	assert.Equal(t, "aaa111aaa111aaa111aaa111aaa111aaa111aaaa", result[0].Commit.SHA)
	assert.Equal(t, "bbb222bbb222bbb222bbb222bbb222bbb222bbbb", result[1].Commit.SHA)
}

func TestGetCommitsForGithubFile_TimeLimit(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111", "recent", "Alice", "a@t.com", now.Add(-1*time.Hour), nil),
		makeCommit("bbb222", "yesterday", "Bob", "b@t.com", now.Add(-25*time.Hour), nil),
		makeCommit("ccc333", "old", "Charlie", "c@t.com", now.Add(-72*time.Hour), nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("data"))

	mock := &mockGitHubAPI{
		commitList:  makeStaticCommitList(commits),
		commit:      makeCommitLookup(commits, "spec.yaml"),
		fileContent: makeStaticFileContent(fileContent),
	}

	// limitTime=2 means "last 2 days" — should only get commits within 2 days
	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, 2, session, mock)

	require.NoError(t, err)
	// aaa111 (1 hour ago) and bbb222 (25 hours ago) are within 2 days
	// ccc333 (72 hours ago) is outside the window
	// getCommitTimeLimit returns 2, then limit=2 => totalCommits = min(len, 2+1) = 3
	// but we only have 2 commits within time limit so limit=2 and totalCommits=3
	require.Len(t, result, 3)
}

func TestGetCommitsForGithubFile_TimeLimitZeroResults(t *testing.T) {
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	// All commits are older than 1 day
	commits := []github.Commit{
		makeCommit("aaa111", "old", "Alice", "a@t.com", time.Now().Add(-72*time.Hour), nil),
	}

	mock := &mockGitHubAPI{
		commitList: func(_ context.Context, _ *github.GitHubSession, _, _, _ string, _ *github.CommitListOptions) ([]github.Commit, error) {
			return commits, nil
		},
		commit: func(_ context.Context, _ *github.GitHubSession, _, _, _ string) (*github.Commit, error) {
			t.Fatal("should not be called when time limit filters everything")
			return nil, nil
		},
		fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
			t.Fatal("should not be called")
			return nil, nil
		},
	}

	// limitTime=0 means "0 days" — getCommitTimeLimit returns 0, so no commits match
	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, 0, session, mock)

	require.NoError(t, err)
	assert.Empty(t, result)
}

func TestGetCommitsForGithubFile_OrderPreserved(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	numCommits := 20
	commits := make([]github.Commit, numCommits)
	for i := 0; i < numCommits; i++ {
		commits[i] = makeCommit(
			fmt.Sprintf("sha%03d", i),
			fmt.Sprintf("commit %d", i),
			"Author",
			"a@t.com",
			now.Add(-time.Duration(numCommits-i)*time.Hour),
			nil,
		)
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("data"))

	mock := &mockGitHubAPI{
		commitList:  makeStaticCommitList(commits),
		commit:      makeCommitLookup(commits, "spec.yaml"),
		fileContent: makeStaticFileContent(fileContent),
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, -1, session, mock)

	require.NoError(t, err)
	require.Len(t, result, numCommits)

	// Verify order is preserved despite concurrent fetching.
	for i := 0; i < numCommits; i++ {
		assert.Equal(t, fmt.Sprintf("sha%03d", i), result[i].Commit.SHA,
			"commit at index %d should be sha%03d", i, i)
	}
}

func TestGetCommitsForGithubFile_DeletedFile(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111", "first", "Alice", "a@t.com", now.Add(-3*time.Hour), nil),
		makeCommit("bbb222", "deleted here", "Bob", "b@t.com", now.Add(-2*time.Hour), nil),
		makeCommit("ccc333", "third", "Charlie", "c@t.com", now.Add(-1*time.Hour), nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("data"))

	mock := &mockGitHubAPI{
		commitList: makeStaticCommitList(commits),
		commit:     makeCommitLookup(commits, "spec.yaml"),
		fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, ref string) (*github.FileContent, error) {
			if ref == "bbb222" {
				return nil, fmt.Errorf("404 Not Found")
			}
			return &github.FileContent{Content: fileContent}, nil
		},
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, -1, session, mock)

	require.NoError(t, err)
	// bbb222 should be skipped, leaving aaa111 and ccc333
	require.Len(t, result, 2)
	assert.Equal(t, "aaa111", result[0].Commit.SHA)
	assert.Equal(t, "ccc333", result[1].Commit.SHA)
}

func TestPathMatching(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	commits := []github.Commit{
		makeCommit("aaa111", "first", "Alice", "a@t.com", now, nil),
	}

	fileContent := base64.StdEncoding.EncodeToString([]byte("data"))

	tests := []struct {
		name       string
		targetPath string
		commitFile string
		wantBytes  bool
	}{
		{"exact match", "api/spec.yaml", "api/spec.yaml", true},
		{"nested path", "src/api/v2/openapi.json", "src/api/v2/openapi.json", true},
		{"no match - different dir", "api/spec.yaml", "other/spec.yaml", false},
		{"no match - similar name", "api/spec.yaml", "api/spec.yml", false},
		{"root file", "openapi.yaml", "openapi.yaml", true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			mock := &mockGitHubAPI{
				commitList: func(_ context.Context, _ *github.GitHubSession, _, _, _ string, _ *github.CommitListOptions) ([]github.Commit, error) {
					return commits, nil
				},
				commit: func(_ context.Context, _ *github.GitHubSession, _, _, _ string) (*github.Commit, error) {
					c := commits[0]
					c.Files = []github.CommitFile{{Filename: tt.commitFile}}
					return &c, nil
				},
				fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
					return &github.FileContent{Content: fileContent}, nil
				},
			}

			result, err := GetCommitsForGithubFile("owner", "repo", tt.targetPath, "",
				progressChan, errorChan, false, 0, -1, session, mock)

			require.NoError(t, err)
			require.Len(t, result, 1)

			if tt.wantBytes {
				assert.NotEmpty(t, result[0].FileBytes, "expected file bytes for matching path")
			} else {
				assert.Empty(t, result[0].FileBytes, "expected no file bytes for non-matching path")
			}
		})
	}
}

func TestFileContentBase64(t *testing.T) {
	session := dummySession()
	defer session.Close()
	ctx := context.Background()

	original := "openapi: '3.1.0'\ninfo:\n  title: Test API\n  version: 1.0.0"
	// Simulate GitHub's base64 with embedded newlines
	encoded := base64.StdEncoding.EncodeToString([]byte(original))
	// Insert newlines every 76 chars like GitHub does
	var withNewlines string
	for i := 0; i < len(encoded); i += 76 {
		end := i + 76
		if end > len(encoded) {
			end = len(encoded)
		}
		withNewlines += encoded[i:end] + "\n"
	}

	mock := &mockGitHubAPI{
		fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
			return &github.FileContent{Content: withNewlines}, nil
		},
	}

	result, err := getFileBytes(ctx, mock, session, "owner", "repo", "spec.yaml", "abc123")
	require.NoError(t, err)
	assert.Equal(t, original, string(result))
}

func TestFileContentDownloadFallback(t *testing.T) {
	// Set up a test HTTP server to serve the download URL.
	expectedContent := "openapi: '3.0.0'"
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(expectedContent))
	}))
	defer server.Close()

	session := dummySession()
	defer session.Close()
	ctx := context.Background()

	mock := &mockGitHubAPI{
		fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
			return &github.FileContent{
				Content:     "", // Empty content = large file
				DownloadURL: server.URL + "/raw/spec.yaml",
			}, nil
		},
	}

	result, err := getFileBytes(ctx, mock, session, "owner", "repo", "spec.yaml", "abc123")
	require.NoError(t, err)
	assert.Equal(t, expectedContent, string(result))
}

func TestFileContentNoContent(t *testing.T) {
	session := dummySession()
	defer session.Close()
	ctx := context.Background()

	mock := &mockGitHubAPI{
		fileContent: func(_ context.Context, _ *github.GitHubSession, _, _, _, _ string) (*github.FileContent, error) {
			return &github.FileContent{Content: "", DownloadURL: ""}, nil
		},
	}

	_, err := getFileBytes(ctx, mock, session, "owner", "repo", "spec.yaml", "abc123")
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "no content available")
}

func TestConvertCommitsToModel(t *testing.T) {
	now := time.Now()

	commits := []*fetchedCommit{
		{
			Commit: makeCommit("aaa111", "add spec", "Alice", "alice@test.com", now.Add(-2*time.Hour), nil),
			FileBytes: []byte(`openapi: "3.0.0"
info:
  title: Test
  version: "1.0"
paths: {}`),
		},
		{
			Commit: makeCommit("bbb222", "update spec", "Bob", "bob@test.com", now.Add(-1*time.Hour), nil),
			FileBytes: []byte(`openapi: "3.0.0"
info:
  title: Test
  version: "2.0"
paths: {}`),
		},
	}

	progressChan, errorChan := makeProgressChans()

	result, errs := ConvertGithubCommitsIntoModel(commits, progressChan, errorChan, "", false, false, nil)

	// BuildCommitChangelog may produce errors for minimal specs, but should produce results
	if len(errs) > 0 {
		// Even with errors, we should get some normalized commits back
		t.Logf("got %d errors during normalization (expected for minimal specs)", len(errs))
	}
	assert.NotEmpty(t, result)

	// Verify the first commit's fields
	if len(result) > 0 {
		assert.Equal(t, "aaa111", result[0].Hash)
		assert.Equal(t, "add spec", result[0].Message)
		assert.Equal(t, "Alice", result[0].Author)
		assert.Equal(t, "alice@test.com", result[0].AuthorEmail)
	}
}

func TestConvertCommitsToModel_SkipsEmptyBytes(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()

	commits := []*fetchedCommit{
		{
			Commit:    makeCommit("aaa111", "first", "Alice", "a@t.com", now, nil),
			FileBytes: nil, // No file bytes — should be skipped
		},
		{
			Commit:    makeCommit("bbb222", "second", "Bob", "b@t.com", now, nil),
			FileBytes: []byte{}, // Empty bytes — should be skipped
		},
	}

	result, _ := ConvertGithubCommitsIntoModel(commits, progressChan, errorChan, "", false, false, nil)
	// Both commits have empty/nil bytes, so none should be converted
	assert.Empty(t, result)
}

func TestProcessGithubRepo_EmptyParams(t *testing.T) {
	progressChan, errorChan := makeProgressChans()

	tests := []struct {
		name     string
		user     string
		repo     string
		filePath string
	}{
		{"empty user", "", "repo", "file"},
		{"empty repo", "user", "", "file"},
		{"empty filePath", "user", "repo", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, errs := ProcessGithubRepo(tt.user, tt.repo, tt.filePath, "",
				progressChan, errorChan, false, 0, -1, "", false, false, nil)
			assert.Nil(t, result)
			require.Len(t, errs, 1)
			assert.Contains(t, errs[0].Error(), "please supply valid github")
		})
	}
}

func TestProcessGithubRepo_NoToken(t *testing.T) {
	t.Setenv(GithubToken, "")
	progressChan, errorChan := makeProgressChans()

	result, errs := ProcessGithubRepo("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, -1, "", false, false, nil)
	assert.Nil(t, result)
	require.Len(t, errs, 1)
	assert.Contains(t, errs[0].Error(), "GH_TOKEN")
}

func TestGetCommitTimeLimit(t *testing.T) {
	now := time.Now()

	commits := []github.Commit{
		makeCommit("aaa", "recent", "A", "a@t.com", now.Add(-1*time.Hour), nil),
		makeCommit("bbb", "today", "B", "b@t.com", now.Add(-12*time.Hour), nil),
		makeCommit("ccc", "yesterday", "C", "c@t.com", now.Add(-36*time.Hour), nil),
		makeCommit("ddd", "old", "D", "d@t.com", now.Add(-96*time.Hour), nil),
	}

	tests := []struct {
		name      string
		limitTime int
		want      int
	}{
		{"zero limit returns 0", 0, 0},
		{"negative limit returns 0", -1, 0},
		{"1 day - 2 commits within range", 1, 2},
		{"2 days - 3 commits within range", 2, 3},
		{"5 days - all 4 commits", 5, 4},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := getCommitTimeLimit(tt.limitTime, commits)
			assert.Equal(t, tt.want, got)
		})
	}
}

func TestIsNotFoundError(t *testing.T) {
	assert.True(t, isNotFoundError(fmt.Errorf("GET https://api.github.com/...: 404 Not Found")))
	assert.True(t, isNotFoundError(fmt.Errorf("404 error")))
	assert.True(t, isNotFoundError(fmt.Errorf("Not Found: resource")))
	assert.False(t, isNotFoundError(fmt.Errorf("403 Forbidden")))
	assert.False(t, isNotFoundError(fmt.Errorf("500 Internal Server Error")))
	assert.False(t, isNotFoundError(nil))
}

func TestGetCommitsForGithubFile_SizeCutoff(t *testing.T) {
	now := time.Now()
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	// Create 5 commits, each with a large file that pushes over the 50MB threshold.
	numCommits := 5
	commits := make([]github.Commit, numCommits)
	for i := 0; i < numCommits; i++ {
		commits[i] = makeCommit(
			fmt.Sprintf("sha%03d", i),
			fmt.Sprintf("commit %d", i),
			"Author", "a@t.com",
			now.Add(-time.Duration(numCommits-i)*time.Hour),
			nil,
		)
	}

	// Each file is ~20MB, so after 2-3 files the 50MB threshold is exceeded.
	largeContent := make([]byte, 20*1024*1024)
	for i := range largeContent {
		largeContent[i] = 'x'
	}
	encodedContent := base64.StdEncoding.EncodeToString(largeContent)

	mock := &mockGitHubAPI{
		commitList:  makeStaticCommitList(commits),
		commit:      makeCommitLookup(commits, "spec.yaml"),
		fileContent: makeStaticFileContent(encodedContent),
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, true, 0, -1, session, mock)

	require.NoError(t, err)
	// With forceCutoff=true and large files, the results should be truncated
	assert.Less(t, len(result), numCommits, "results should be truncated due to size cutoff")
}

func TestGetCommitsForGithubFile_EmptyCommitList(t *testing.T) {
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	mock := &mockGitHubAPI{
		commitList: func(_ context.Context, _ *github.GitHubSession, _, _, _ string, _ *github.CommitListOptions) ([]github.Commit, error) {
			return []github.Commit{}, nil
		},
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, -1, session, mock)

	require.NoError(t, err)
	assert.Nil(t, result)
}

func TestGetCommitsForGithubFile_CommitListError(t *testing.T) {
	progressChan, errorChan := makeProgressChans()
	session := dummySession()
	defer session.Close()

	mock := &mockGitHubAPI{
		commitList: func(_ context.Context, _ *github.GitHubSession, _, _, _ string, _ *github.CommitListOptions) ([]github.Commit, error) {
			return nil, fmt.Errorf("API rate limit exceeded")
		},
	}

	result, err := GetCommitsForGithubFile("owner", "repo", "spec.yaml", "",
		progressChan, errorChan, false, 0, -1, session, mock)

	assert.Nil(t, result)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "failed to list commits")
}

func TestProcessGithubRepo_EndToEnd(t *testing.T) {
	// This test requires a valid GH_TOKEN to create a real session.
	// If GH_TOKEN is not set, we skip the end-to-end test.
	if os.Getenv(GithubToken) == "" {
		t.Skip("GH_TOKEN not set, skipping end-to-end test")
	}

	// The end-to-end test would hit the real GitHub API.
	// We verify only that session creation works with a real token.
	session, svc, err := createGitHubSession()
	require.NoError(t, err)
	require.NotNil(t, session)
	require.NotNil(t, svc)
	session.Close()
}

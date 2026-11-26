// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"context"
	"fmt"
	"testing"
	"time"

	doctorgithub "github.com/pb33f/doctor/github"
	"github.com/pb33f/libopenapi/jsonschema"
	"github.com/pb33f/testify/require"
)

type schemaFileHistory struct {
	stubGitHubService
	doctorgithub.FileService
	requests map[string][]string
}

func (s *schemaFileHistory) GetFileContent(_ context.Context, _ *doctorgithub.GitHubSession, owner, repo, path, ref string) (*doctorgithub.FileContent, error) {
	s.requests[ref] = append(s.requests[ref], owner+"/"+repo+"/"+path)
	switch ref {
	case "a0a0a0":
		return &doctorgithub.FileContent{Content: "minLength: 2\n"}, nil
	case "b1b1b1":
		return &doctorgithub.FileContent{Content: "minLength: 3\n"}, nil
	default:
		return nil, fmt.Errorf("unexpected revision %q", ref)
	}
}

func TestGitHubSchemaHistoryReadsSiblingFromOwningRevision(t *testing.T) {
	factory := newGitHubService
	t.Cleanup(func() { newGitHubService = factory })
	initial, latest := "a0a0a0", "b1b1b1"
	data := []byte("$ref: money.yaml\n")
	mock := &schemaFileHistory{requests: make(map[string][]string)}
	mock.createSessionWithOptionalToken = func(_ string, cfg *doctorgithub.SessionConfig) *doctorgithub.GitHubSession {
		return doctorgithub.NewAnonymousGitHubSession(cfg)
	}
	mock.getFileHistory = func(_ context.Context, _ *doctorgithub.GitHubSession, owner, repo, path string, _ *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error) {
		require.Equal(t, "schemas/customer.yaml", path)
		return []*doctorgithub.FileRevision{makeDoctorRevision(latest, "tighten", time.Now(), data), makeDoctorRevision(initial, "original", time.Now().Add(-time.Hour), data)}, nil
	}
	newGitHubService = func() githubHistoryService { return mock }
	ch, errsCh := progressChans()
	result, errs := ProcessGithubRepoDetailed("owner", "repo", "schemas/customer.yaml", ch, errsCh, HistoryOptions{Schema: true, Lazy: true, LimitTime: -1}, nil)
	require.Empty(t, errs)
	require.Len(t, result.Commits, 2)
	t.Cleanup(result.Commits[0].Window.Close)
	commit, release, err := result.Commits[0].PrepareHistory()
	require.NoError(t, err)
	defer release()
	diff, err := jsonschema.Compare(commit.OldSchemaDocument, commit.SchemaDocument, nil)
	require.NoError(t, err)
	require.NotNil(t, diff)
	require.Len(t, diff.GetAllChanges(), 1)
	change := diff.GetAllChanges()[0]
	require.Equal(t, "2", change.Original)
	require.Equal(t, "3", change.New)
	require.Equal(t, map[string][]string{initial: {"owner/repo/schemas/money.yaml"}, latest: {"owner/repo/schemas/money.yaml"}}, mock.requests)
}

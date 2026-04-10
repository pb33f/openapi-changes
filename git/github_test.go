// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package git

import (
	"context"
	"errors"
	"os"
	"testing"
	"time"

	doctorgithub "github.com/pb33f/doctor/github"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type stubGitHubService struct {
	createSessionWithOptionalToken func(token string, config *doctorgithub.SessionConfig) *doctorgithub.GitHubSession
	getFileHistory                 func(ctx context.Context, session *doctorgithub.GitHubSession, owner, repo, path string, options *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error)
}

func (s *stubGitHubService) CreateSessionWithOptionalToken(token string, config *doctorgithub.SessionConfig) *doctorgithub.GitHubSession {
	return s.createSessionWithOptionalToken(token, config)
}

func (s *stubGitHubService) GetFileHistory(ctx context.Context, session *doctorgithub.GitHubSession, owner, repo, path string, options *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error) {
	return s.getFileHistory(ctx, session, owner, repo, path, options)
}

func makeDoctorRevision(sha, message string, when time.Time, data []byte) *doctorgithub.FileRevision {
	return &doctorgithub.FileRevision{
		Commit: doctorgithub.Commit{
			SHA:     sha,
			Message: message,
			Author: doctorgithub.CommitAuthor{
				Name:  "tester",
				Email: "tester@example.com",
				Date:  when,
			},
		},
		FileBytes: data,
	}
}

func progressChans() (chan *model.ProgressUpdate, chan model.ProgressError) {
	return make(chan *model.ProgressUpdate, 100), make(chan model.ProgressError, 100)
}

func TestProcessGithubRepo_EmptyParams(t *testing.T) {
	progressChan, errorChan := progressChans()

	tests := []struct {
		name     string
		user     string
		repo     string
		filePath string
	}{
		{"empty user", "", "repo", "spec.yaml"},
		{"empty repo", "user", "", "spec.yaml"},
		{"empty filePath", "user", "repo", ""},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, errs := ProcessGithubRepo(tt.user, tt.repo, tt.filePath,
				progressChan, errorChan, HistoryOptions{LimitTime: -1}, nil)
			assert.Nil(t, result)
			require.Len(t, errs, 1)
			assert.Contains(t, errs[0].Error(), "please supply valid github")
		})
	}
}

func TestProcessGithubRepo_UsesOptionalTokenSessionFromDoctor(t *testing.T) {
	originalFactory := newGitHubService
	t.Cleanup(func() {
		newGitHubService = originalFactory
	})

	var capturedToken string
	newGitHubService = func() githubHistoryService {
		return &stubGitHubService{
			createSessionWithOptionalToken: func(token string, config *doctorgithub.SessionConfig) *doctorgithub.GitHubSession {
				capturedToken = token
				return doctorgithub.NewAnonymousGitHubSession(config)
			},
			getFileHistory: func(ctx context.Context, session *doctorgithub.GitHubSession, owner, repo, path string, options *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error) {
				return []*doctorgithub.FileRevision{
					makeDoctorRevision("aaa111", "first", time.Now(), []byte("openapi: 3.0.0\ninfo:\n  title: test\n  version: 1.0.0\npaths: {}\n")),
					makeDoctorRevision("bbb222", "base", time.Now().Add(-time.Hour), []byte("openapi: 3.0.0\ninfo:\n  title: test\n  version: 0.9.0\npaths: {}\n")),
				}, nil
			},
		}
	}

	t.Setenv(GithubToken, "")
	progressChan, errorChan := progressChans()

	result, errs := ProcessGithubRepo("owner", "repo", "spec.yaml", progressChan, errorChan, HistoryOptions{LimitTime: -1}, nil)

	require.Nil(t, errs)
	require.NotEmpty(t, result)
	assert.Empty(t, capturedToken)
}

func TestProcessGithubRepo_PropagatesDoctorHistoryErrors(t *testing.T) {
	originalFactory := newGitHubService
	t.Cleanup(func() {
		newGitHubService = originalFactory
	})

	newGitHubService = func() githubHistoryService {
		return &stubGitHubService{
			createSessionWithOptionalToken: func(token string, config *doctorgithub.SessionConfig) *doctorgithub.GitHubSession {
				return doctorgithub.NewAnonymousGitHubSession(config)
			},
			getFileHistory: func(ctx context.Context, session *doctorgithub.GitHubSession, owner, repo, path string, options *doctorgithub.FileHistoryOptions) ([]*doctorgithub.FileRevision, error) {
				return nil, errors.New("doctor history failed")
			},
		}
	}

	progressChan, errorChan := progressChans()
	result, errs := ProcessGithubRepo("owner", "repo", "spec.yaml", progressChan, errorChan, HistoryOptions{LimitTime: -1}, nil)

	assert.Nil(t, result)
	require.Len(t, errs, 1)
	assert.Contains(t, errs[0].Error(), "doctor history failed")
}

func TestConvertGitHubRevisionsIntoModel_BuildsCommitHistory(t *testing.T) {
	progressChan, errorChan := progressChans()

	newer, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)
	older, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)

	revisions := []*doctorgithub.FileRevision{
		makeDoctorRevision("aaa111", "new", time.Now(), newer),
		makeDoctorRevision("bbb222", "old", time.Now().Add(-time.Hour), older),
	}

	result, errs := convertGitHubRevisionsIntoModel(revisions, progressChan, errorChan, HistoryOptions{}, nil)

	require.Nil(t, errs)
	require.NotEmpty(t, result)
	assert.Equal(t, "aaa111", result[0].Hash)
	assert.NotNil(t, result[0].Document)
}

func TestConvertGitHubRevisionsIntoModel_ReturnsBuildErrors(t *testing.T) {
	progressChan, errorChan := progressChans()

	revisions := []*doctorgithub.FileRevision{
		makeDoctorRevision("aaa111", "bad", time.Now(), []byte("not: [yaml")),
		makeDoctorRevision("bbb222", "old", time.Now().Add(-time.Hour), []byte("openapi: 3.0.0\ninfo:\n  title: ok\n  version: 1.0.0\npaths: {}\n")),
	}

	result, errs := convertGitHubRevisionsIntoModel(revisions, progressChan, errorChan, HistoryOptions{}, &whatChangedModel.BreakingRulesConfig{})

	assert.NotNil(t, result)
	require.NotEmpty(t, errs)
}

// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/doctor/changerator"
	v3 "github.com/pb33f/doctor/model/high/v3"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRunChangerator_RewritesChangedNodeOriginsToRepoRelativePaths(t *testing.T) {
	repoDir, fileName := createMovedRefGitSpecRepo(t)

	commits, err := loadGitHistoryCommits(repoDir, fileName, summaryOpts{base: repoDir, noColor: true, limitTime: -1}, nil)
	require.NoError(t, err)
	require.NotEmpty(t, commits)

	target := firstComparableCommit(commits)
	require.NotNil(t, target)

	result, err := runChangerator(target, nil)
	require.NoError(t, err)
	require.NotNil(t, result)
	defer result.Release()

	origins := collectChangedNodeOrigins(result.Changerator.ChangedNodes)
	require.NotEmpty(t, origins)

	hasRepoRelativeOrigin := false
	for _, origin := range origins {
		assert.NotContains(t, origin, repoDir)
		assert.False(t, filepath.IsAbs(filepath.FromSlash(origin)), "origin should be repo-relative: %s", origin)
		if origin == "spec.yaml" || strings.HasPrefix(origin, "common") {
			hasRepoRelativeOrigin = true
		}
	}
	assert.True(t, hasRepoRelativeOrigin, "expected at least one repo-relative origin, got %v", origins)
}

func firstComparableCommit(commits []*model.Commit) *model.Commit {
	for _, commit := range commits {
		if commit != nil && commit.Document != nil && commit.OldDocument != nil {
			return commit
		}
	}
	return nil
}

func collectChangedNodeOrigins(nodes []*v3.Node) []string {
	seen := make(map[*v3.Node]struct{}, len(nodes))
	var origins []string

	var walk func(*v3.Node)
	walk = func(node *v3.Node) {
		if node == nil {
			return
		}
		if _, ok := seen[node]; ok {
			return
		}
		seen[node] = struct{}{}

		if node.Origin != nil {
			if node.Origin.AbsoluteLocation != "" {
				origins = append(origins, node.Origin.AbsoluteLocation)
			}
			if node.Origin.AbsoluteLocationValue != "" {
				origins = append(origins, node.Origin.AbsoluteLocationValue)
			}
		}
		if node.OriginLocation != "" {
			origins = append(origins, node.OriginLocation)
		}
		for _, child := range node.Children {
			walk(child)
		}
	}

	for _, node := range nodes {
		walk(node)
	}
	return origins
}

func TestResolveChangeTreeRoot_PrefersChangedRoot(t *testing.T) {
	fallback := &v3.Node{Id: "document-root"}
	changedRoot := &v3.Node{Id: "root"}
	ctr := &changerator.Changerator{
		ChangedNodes: []*v3.Node{
			{Id: "paths"},
			changedRoot,
		},
	}

	assert.Same(t, changedRoot, resolveChangeTreeRoot(ctr, fallback))
}

func TestResolveChangeTreeRoot_FallsBackToDocumentRoot(t *testing.T) {
	fallback := &v3.Node{Id: "document-root"}
	ctr := &changerator.Changerator{
		ChangedNodes: []*v3.Node{
			{Id: "paths"},
		},
	}

	assert.Same(t, fallback, resolveChangeTreeRoot(ctr, fallback))
	assert.Same(t, fallback, resolveChangeTreeRoot(nil, fallback))
}

func TestResolveChangeTreeRoot_UsesChangeratorRootForPetstoreFixture(t *testing.T) {
	commits, err := loadLeftRightCommits("../sample-specs/petstorev3-original.json", "../sample-specs/petstorev3.json", summaryOpts{noColor: true})
	require.NoError(t, err)
	require.Len(t, commits, 1)

	result, err := runChangerator(commits[0], nil)
	require.NoError(t, err)
	require.NotNil(t, result)
	defer result.Release()

	fallback := result.RightDrDoc.V3Document.Node
	root := resolveChangeTreeRoot(result.Changerator, fallback)
	require.NotNil(t, root)
	assert.Equal(t, "root", root.Id)

	foundInChangedNodes := false
	for _, node := range result.Changerator.ChangedNodes {
		if node == root {
			foundInChangedNodes = true
			break
		}
	}
	assert.True(t, foundInChangedNodes, "expected selected root to come from changerator.ChangedNodes")
}

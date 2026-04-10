// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"os"
	"testing"
	"time"

	"github.com/pb33f/libopenapi"
	"github.com/pb33f/openapi-changes/internal/changecounts"
	"github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestPetstoreRegressionCounts verifies the exact deduplicated change counts
// for the canonical petstore fixture pair. These numbers are the contract
// between doctor/libopenapi and this tool's output. If they drift after a
// dependency bump, the bump changed comparison semantics.
//
// Expected counts are documented in AGENTS.md § "Expected Petstore Fixture Counts".
func TestPetstoreRegressionCounts(t *testing.T) {
	leftBytes, err := os.ReadFile("../sample-specs/petstorev3-original.json")
	require.NoError(t, err)
	rightBytes, err := os.ReadFile("../sample-specs/petstorev3.json")
	require.NoError(t, err)

	leftDoc, err := libopenapi.NewDocument(leftBytes)
	require.NoError(t, err)
	rightDoc, err := libopenapi.NewDocument(rightBytes)
	require.NoError(t, err)

	commit := &model.Commit{
		Hash:        "petstore-regression",
		Message:     "regression fixture",
		Author:      "test",
		CommitDate:  time.Now(),
		Data:        rightBytes,
		OldData:     leftBytes,
		Document:    rightDoc,
		OldDocument: leftDoc,
	}

	result, err := runChangerator(commit, nil)
	require.NoError(t, err)
	require.NotNil(t, result, "changerator must produce a result for the petstore fixtures")
	defer result.Release()

	deduped := result.Changerator.DeduplicateChanges()
	require.NotEmpty(t, deduped, "deduplicated changes must not be empty")

	counts := changecounts.FromChanges(deduped)

	assert.Equal(t, 42, counts.Total, "total deduplicated changes")
	assert.Equal(t, 18, counts.Breaking, "breaking changes")
	assert.Equal(t, 12, counts.Additions, "additions")
	assert.Equal(t, 20, counts.Modifications, "modifications")
	assert.Equal(t, 10, counts.Removals, "removals")
	assert.Equal(t, 8, counts.BreakingModifications, "breaking modifications")
	assert.Equal(t, 10, counts.BreakingRemovals, "breaking removals")
}

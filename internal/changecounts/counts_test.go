// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package changecounts

import (
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func TestFromChanges(t *testing.T) {
	changes := []*whatChangedModel.Change{
		{ChangeType: whatChangedModel.ObjectAdded, Breaking: false},
		{ChangeType: whatChangedModel.PropertyAdded, Breaking: true},
		{ChangeType: whatChangedModel.Modified, Breaking: true},
		{ChangeType: whatChangedModel.PropertyRemoved, Breaking: false},
		{ChangeType: whatChangedModel.ObjectRemoved, Breaking: true},
	}

	counts := FromChanges(changes)

	assert.Equal(t, 5, counts.Total)
	assert.Equal(t, 3, counts.Breaking)
	assert.Equal(t, 2, counts.Additions)
	assert.Equal(t, 1, counts.Modifications)
	assert.Equal(t, 2, counts.Removals)
	assert.Equal(t, 1, counts.BreakingAdditions)
	assert.Equal(t, 1, counts.BreakingModifications)
	assert.Equal(t, 1, counts.BreakingRemovals)
}

func TestFromChanges_NilsExcludedFromTotal(t *testing.T) {
	changes := []*whatChangedModel.Change{
		{ChangeType: whatChangedModel.ObjectAdded},
		nil,
		{ChangeType: whatChangedModel.Modified},
		nil,
	}

	counts := FromChanges(changes)

	assert.Equal(t, 2, counts.Total, "Total should exclude nil entries")
	assert.Equal(t, 1, counts.Additions)
	assert.Equal(t, 1, counts.Modifications)
	assert.Equal(t, counts.Additions+counts.Modifications+counts.Removals, counts.Total,
		"Total should equal sum of categorized changes")
}

func TestFromChanges_Empty(t *testing.T) {
	counts := FromChanges(nil)
	assert.Equal(t, 0, counts.Total)
	assert.Equal(t, 0, counts.Breaking)
}

func TestFromChanges_AllNils(t *testing.T) {
	changes := []*whatChangedModel.Change{nil, nil, nil}
	counts := FromChanges(changes)
	assert.Equal(t, 0, counts.Total)
}

func TestFromChanges_UnknownTypeCountsTowardTotalOnly(t *testing.T) {
	changes := []*whatChangedModel.Change{
		{ChangeType: 999, Breaking: true},
	}

	counts := FromChanges(changes)

	assert.Equal(t, 1, counts.Total)
	assert.Equal(t, 1, counts.Breaking)
	assert.Equal(t, 0, counts.Additions)
	assert.Equal(t, 0, counts.Modifications)
	assert.Equal(t, 0, counts.Removals)
	assert.Equal(t, 0, counts.BreakingAdditions)
	assert.Equal(t, 0, counts.BreakingModifications)
	assert.Equal(t, 0, counts.BreakingRemovals)
}

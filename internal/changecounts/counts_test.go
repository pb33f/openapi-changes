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

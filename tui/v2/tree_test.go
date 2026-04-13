// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package v2

import (
	"testing"

	v3 "github.com/pb33f/doctor/model/high/v3"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// mockChanged implements what_changed.Changed for testing.
type mockChanged struct {
	changes []*whatChangedModel.Change
}

func (m *mockChanged) GetAllChanges() []*whatChangedModel.Change { return m.changes }
func (m *mockChanged) TotalChanges() int                         { return len(m.changes) }
func (m *mockChanged) TotalBreakingChanges() int {
	n := 0
	for _, c := range m.changes {
		if c.Breaking {
			n++
		}
	}
	return n
}
func (m *mockChanged) GetPropertyChanges() []*whatChangedModel.Change { return m.changes }
func (m *mockChanged) PropertiesOnly()                                {}

func makeTestTree() *v3.Node {
	// Root
	//   ├── Paths (has 2 leaf changes)
	//   │   └── /pets (has 1 leaf change)
	//   └── Info (has 1 leaf change)

	addChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Property:   "description",
		New:        "A pet store",
	}
	modChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "title",
		Original:   "Old",
		New:        "New",
	}
	removeChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Property:   "deprecated",
		Original:   "true",
		Breaking:   true,
	}
	infoChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "version",
		Original:   "1.0",
		New:        "2.0",
	}

	petsNode := &v3.Node{
		Label: "/pets",
		Type:  "PathItem",
	}
	petsNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{removeChange}})

	pathsNode := &v3.Node{
		Label:    "Paths",
		Type:     "Paths",
		Children: []*v3.Node{petsNode},
	}
	pathsNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{addChange, modChange}})

	infoNode := &v3.Node{
		Label: "Info",
		Type:  "Info",
	}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{infoChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{pathsNode, infoNode},
	}

	return root
}

func makeRootChangeTree() *v3.Node {
	openapiChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "openapi",
		Original:   "3.0.0",
		New:        "3.1.0",
		Breaking:   true,
	}
	infoChange := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Property:   "version",
		Original:   "1.0",
		New:        "2.0",
	}

	infoNode := &v3.Node{
		Label: "Info",
		Type:  "Info",
	}
	infoNode.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{infoChange}})

	root := &v3.Node{
		Label:    "Document",
		Type:     "Document",
		Children: []*v3.Node{infoNode},
	}
	root.AppendChange(&mockChanged{changes: []*whatChangedModel.Change{openapiChange}})
	return root
}

func TestFlattenNodeTree_AllExpanded(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// Expected entries:
	// 0: Paths (branch)
	// 1: /pets (branch)
	// 2: [-] deprecated (leaf on /pets)
	// 3: [+] description (leaf on Paths)
	// 4: [M] title (leaf on Paths)
	// 5: Info (branch)
	// 6: [M] version (leaf on Info)

	assert.Equal(t, 7, len(tm.entries))

	assert.Equal(t, "Paths", tm.entries[0].node.Label)
	assert.Nil(t, tm.entries[0].change)
	assert.True(t, tm.entries[0].hasKids)

	assert.Equal(t, "/pets", tm.entries[1].node.Label)
	assert.Nil(t, tm.entries[1].change)

	assert.NotNil(t, tm.entries[2].change)
	assert.Equal(t, "deprecated", tm.entries[2].change.Property)

	assert.NotNil(t, tm.entries[6].change)
	assert.Equal(t, "version", tm.entries[6].change.Property)
}

func TestCursorStartsOnFirstLeaf(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// Cursor should land on the first leaf (index 2: the deprecated removal)
	assert.Equal(t, 2, tm.cursor)
	entry := tm.selectedEntry()
	require.NotNil(t, entry)
	assert.NotNil(t, entry.change)
	assert.Equal(t, "deprecated", entry.change.Property)
}

func TestFlattenNodeTree_IncludesRootOwnedLeaves(t *testing.T) {
	root := makeRootChangeTree()
	tm := newTreeModel(root, 20)

	require.Len(t, tm.entries, 3)
	require.NotNil(t, tm.entries[0].change)
	assert.Equal(t, "openapi", tm.entries[0].change.Property)
	assert.Equal(t, "Info", tm.entries[1].node.Label)
	require.NotNil(t, tm.entries[2].change)
	assert.Equal(t, "version", tm.entries[2].change.Property)
}

func TestCursorStartsOnRootOwnedLeaf(t *testing.T) {
	root := makeRootChangeTree()
	tm := newTreeModel(root, 20)

	require.Equal(t, 0, tm.cursor)
	entry := tm.selectedEntry()
	require.NotNil(t, entry)
	require.NotNil(t, entry.change)
	assert.Equal(t, "openapi", entry.change.Property)
}

func TestMoveDown_SkipsBranchNodes(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// Starts at index 2 (first leaf)
	assert.Equal(t, 2, tm.cursor)

	// Move down — should land on next leaf (index 3: description added)
	tm.moveDown(1)
	assert.NotNil(t, tm.entries[tm.cursor].change)
	assert.Equal(t, "description", tm.entries[tm.cursor].change.Property)

	// Move down again — index 4: title modified
	tm.moveDown(1)
	assert.Equal(t, "title", tm.entries[tm.cursor].change.Property)

	// Move down again — should skip Info branch (index 5) to index 6: version
	tm.moveDown(1)
	assert.Equal(t, "version", tm.entries[tm.cursor].change.Property)

	// Move down again — no more leaves, stay put
	prev := tm.cursor
	tm.moveDown(1)
	assert.Equal(t, prev, tm.cursor)
}

func TestMoveUp_SkipsBranchNodes(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// Go to last leaf
	tm.moveDown(100)
	assert.Equal(t, "version", tm.entries[tm.cursor].change.Property)

	// Move up — should skip Info branch, land on title
	tm.moveUp(1)
	assert.Equal(t, "title", tm.entries[tm.cursor].change.Property)

	// Move up — description
	tm.moveUp(1)
	assert.Equal(t, "description", tm.entries[tm.cursor].change.Property)

	// Move up — deprecated
	tm.moveUp(1)
	assert.Equal(t, "deprecated", tm.entries[tm.cursor].change.Property)

	// Move up again — no more leaves, stay put
	prev := tm.cursor
	tm.moveUp(1)
	assert.Equal(t, prev, tm.cursor)
}

func TestMoveDown_MultipleSteps(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// 4 leaf changes total: deprecated, description, title, version
	// Move down by 3 from first leaf → should land on version (last leaf)
	tm.moveDown(3)
	assert.Equal(t, "version", tm.entries[tm.cursor].change.Property)
}

func TestComputeStats(t *testing.T) {
	root := makeTestTree()
	cache := make(map[*v3.Node]nodeStats)
	stats := computeStats(root, cache)

	assert.Equal(t, 4, stats.total)
	assert.Equal(t, 1, stats.additions)
	assert.Equal(t, 2, stats.modifications)
	assert.Equal(t, 1, stats.deletions)
	assert.Equal(t, 1, stats.totalBreaking)
	assert.Equal(t, 0, stats.directBreaking) // breaking is in grandchild, not shown on root

	pathsStats := cache[root.Children[0]]
	assert.Equal(t, 3, pathsStats.total)
	assert.Equal(t, 1, pathsStats.totalBreaking)
	assert.Equal(t, 0, pathsStats.directBreaking) // Paths' own leaves aren't breaking

	petsStats := cache[root.Children[0].Children[0]]
	assert.Equal(t, 1, petsStats.totalBreaking)
	assert.Equal(t, 1, petsStats.directBreaking) // /pets owns the breaking leaf
}

func TestSelectedEntry_AlwaysLeaf(t *testing.T) {
	root := makeTestTree()
	tm := newTreeModel(root, 20)

	// Selected entry should always be a leaf change
	entry := tm.selectedEntry()
	require.NotNil(t, entry)
	assert.NotNil(t, entry.change, "cursor should always be on a leaf change")
}

func TestSelectedEntry_Empty(t *testing.T) {
	tm := newTreeModel(nil, 20)
	assert.Nil(t, tm.selectedEntry())
}

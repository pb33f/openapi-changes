package v2

import (
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/testify/assert"
	"testing"
)

func ptrInt(n int) *int { return &n }
func TestResolveSpecAndLine_Removed(t *testing.T) {
	newLines := []string{"new1", "new2"}
	oldLines := []string{"old1", "old2"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyRemoved,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(2),
		},
	}

	lines, changeLn := resolveSpecAndLine(ch, newLines, oldLines)
	assert.Equal(t, oldLines, lines)
	assert.Equal(t, 2, changeLn)
}

func TestResolveSpecAndLine_Added(t *testing.T) {
	newLines := []string{"new1", "new2"}
	oldLines := []string{"old1", "old2"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.PropertyAdded,
		Context: &whatChangedModel.ChangeContext{
			NewLine: ptrInt(1),
		},
	}

	lines, changeLn := resolveSpecAndLine(ch, newLines, oldLines)
	assert.Equal(t, newLines, lines)
	assert.Equal(t, 1, changeLn)
}

func TestResolveSpecAndLine_Modified(t *testing.T) {
	newLines := []string{"new1", "new2"}
	oldLines := []string{"old1", "old2"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Context: &whatChangedModel.ChangeContext{
			NewLine:      ptrInt(2),
			OriginalLine: ptrInt(1),
		},
	}

	lines, changeLn := resolveSpecAndLine(ch, newLines, oldLines)
	assert.Equal(t, newLines, lines)
	assert.Equal(t, 2, changeLn) // prefers NewLine
}

func TestResolveSpecAndLine_MissingCandidateCoordinate(t *testing.T) {
	newLines := []string{"new1", "new2"}
	oldLines := []string{"old1", "old2"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
		Context: &whatChangedModel.ChangeContext{
			OriginalLine: ptrInt(1),
		},
	}

	lines, changeLn := resolveSpecAndLine(ch, newLines, oldLines)
	assert.Empty(t, lines)
	assert.Equal(t, 0, changeLn)
}

func TestResolveSpecAndLine_NilContext(t *testing.T) {
	newLines := []string{"new1", "new2"}
	oldLines := []string{"old1", "old2"}

	ch := &whatChangedModel.Change{
		ChangeType: whatChangedModel.Modified,
	}

	lines, changeLn := resolveSpecAndLine(ch, newLines, oldLines)
	assert.Empty(t, lines)
	assert.Equal(t, 0, changeLn)
}

func TestResolveSpecAndLine_ExternalSourceIsNotRoot(t *testing.T) {
	ch := &whatChangedModel.Change{ChangeType: whatChangedModel.Modified, Context: &whatChangedModel.ChangeContext{DocumentLocation: "schemas/pet.yaml", NewLine: ptrInt(1)}}
	lines, line := resolveSpecAndLine(ch, []string{"unrelated: root"}, []string{"old: root"})
	assert.Empty(t, lines)
	assert.Zero(t, line)
	assert.NotContains(t, renderDiff(ch, []string{"unrelated: root"}, nil, 80, newNoColorStyles()), "unrelated: root")
}

func TestDiffAdapterPreservesSemanticCardAndCodeLines(t *testing.T) {
	ch := &whatChangedModel.Change{ChangeType: whatChangedModel.Modified, Property: "description", Original: "old", New: "new", Breaking: true, Context: &whatChangedModel.ChangeContext{NewLine: ptrInt(2)}}
	lines := []string{"Pet:", "  description: new"}
	card := renderDiff(ch, lines, nil, 80, newNoColorStyles())
	assert.Contains(t, card, "Modified: description")
	assert.Contains(t, card, "BREAKING CHANGE")
	assert.Contains(t, card, "- description: old")
	assert.Contains(t, card, "+ description: new")
	assert.Contains(t, card, "> 2")
	source := renderSpecLines(lines, highlightRange{2, 2}, ch.ChangeType, 80, newNoColorStyles())
	assert.Contains(t, source, "1│ Pet:")
	assert.Contains(t, source, "> 2│")
}

func singleLineRange(line int) highlightRange { return highlightRange{line, line} }

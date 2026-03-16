package tui

import (
	"testing"

	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	changesModel "github.com/pb33f/openapi-changes/model"
	"github.com/stretchr/testify/require"
)

func TestRenderDiff_DoesNotPanicOnShortNewData(t *testing.T) {
	newLine := 1
	newColumn := 1

	prevCommit := activeCommit
	activeCommit = &changesModel.Commit{
		Data: []byte("value"),
	}
	t.Cleanup(func() {
		activeCommit = prevCommit
	})

	left := BuildTextView()
	right := BuildTextView()
	diffView := BuildDiffView(left, right)

	change := &whatChangedModel.Change{
		Context: &whatChangedModel.ChangeContext{
			NewLine:   &newLine,
			NewColumn: &newColumn,
		},
		NewObject: struct{}{},
		New:       "value",
	}

	require.NotPanics(t, func() {
		RenderDiff(left, right, diffView, change)
	})
}

func TestRenderDiff_DoesNotPanicOnShortOriginalData(t *testing.T) {
	originalLine := 1
	originalColumn := 1

	prevCommit := activeCommit
	activeCommit = &changesModel.Commit{
		OldData: []byte("value"),
	}
	t.Cleanup(func() {
		activeCommit = prevCommit
	})

	left := BuildTextView()
	right := BuildTextView()
	diffView := BuildDiffView(left, right)

	change := &whatChangedModel.Change{
		Context: &whatChangedModel.ChangeContext{
			OriginalLine:   &originalLine,
			OriginalColumn: &originalColumn,
		},
		OriginalObject: struct{}{},
		Original:       "value",
	}

	require.NotPanics(t, func() {
		RenderDiff(left, right, diffView, change)
	})
}

func TestRenderDiff_DoesNotPanicWhenLineExceedsDocumentLength(t *testing.T) {
	newLine := 25

	prevCommit := activeCommit
	activeCommit = &changesModel.Commit{
		Data: []byte("value"),
	}
	t.Cleanup(func() {
		activeCommit = prevCommit
	})

	left := BuildTextView()
	right := BuildTextView()
	diffView := BuildDiffView(left, right)

	change := &whatChangedModel.Change{
		Context: &whatChangedModel.ChangeContext{
			NewLine: &newLine,
		},
		NewObject: struct{}{},
		New:       "value",
	}

	require.NotPanics(t, func() {
		RenderDiff(left, right, diffView, change)
	})
}

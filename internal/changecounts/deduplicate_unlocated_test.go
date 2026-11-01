// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package changecounts

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestDeduplicate_UnlocatedChangesUseSourcePosition(t *testing.T) {
	line, column, otherLine := 21, 43, 30
	first := &wcModel.Change{Property: "enum", ChangeType: wcModel.PropertyAdded, New: "c",
		Context: &wcModel.ChangeContext{NewLine: &line, NewColumn: &column}}
	repeat := *first
	repeat.Context = &wcModel.ChangeContext{NewLine: &line, NewColumn: &column}
	elsewhere := *first
	elsewhere.Context = &wcModel.ChangeContext{NewLine: &otherLine, NewColumn: &column}
	noContext := &wcModel.Change{Property: "enum", ChangeType: wcModel.PropertyAdded, New: "c"}
	noContextAgain := *noContext

	result := Deduplicate([]*wcModel.Change{first, &repeat, &elsewhere, noContext, &noContextAgain})

	require.Len(t, result, 4, "a repeat at one position collapses; positions and unknowns stay apart")
	assert.Same(t, first, result[0])
}

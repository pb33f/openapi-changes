// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func intPtr(v int) *int { return &v }

// --- splitParameterPath ---

func TestSplitParameterPath_EmptyString(t *testing.T) {
	_, _, _, ok := splitParameterPath("")
	assert.False(t, ok)
}

func TestSplitParameterPath_NoParametersKeyword(t *testing.T) {
	_, _, _, ok := splitParameterPath("$.paths['/pets'].get.responses")
	assert.False(t, ok)
}

func TestSplitParameterPath_SimpleIndex(t *testing.T) {
	prefix, idx, suffix, ok := splitParameterPath("$.paths['/pets'].get.parameters[0]")
	assert.True(t, ok)
	assert.Equal(t, "$.paths['/pets'].get.parameters", prefix)
	assert.Equal(t, 0, idx)
	assert.Equal(t, "", suffix)
}

func TestSplitParameterPath_WithSuffix(t *testing.T) {
	prefix, idx, suffix, ok := splitParameterPath("$.paths['/pets'].get.parameters[1].schema")
	assert.True(t, ok)
	assert.Equal(t, "$.paths['/pets'].get.parameters", prefix)
	assert.Equal(t, 1, idx)
	assert.Equal(t, ".schema", suffix)
}

func TestSplitParameterPath_DeepSuffix(t *testing.T) {
	prefix, idx, suffix, ok := splitParameterPath("$.paths['/pets'].get.parameters[2].schema.type")
	assert.True(t, ok)
	assert.Equal(t, "$.paths['/pets'].get.parameters", prefix)
	assert.Equal(t, 2, idx)
	assert.Equal(t, ".schema.type", suffix)
}

func TestSplitParameterPath_NonNumericIndex(t *testing.T) {
	_, _, _, ok := splitParameterPath("$.paths['/pets'].get.parameters[abc]")
	assert.False(t, ok)
}

func TestSplitParameterPath_MissingClosingBracket(t *testing.T) {
	_, _, _, ok := splitParameterPath("$.paths['/pets'].get.parameters[0")
	assert.False(t, ok)
}

func TestSplitParameterPath_MultipleParametersSegments_UsesLast(t *testing.T) {
	prefix, idx, suffix, ok := splitParameterPath("$.paths['/pets'].parameters[0].parameters[1]")
	assert.True(t, ok)
	assert.Equal(t, "$.paths['/pets'].parameters[0].parameters", prefix)
	assert.Equal(t, 1, idx)
	assert.Equal(t, "", suffix)
}

func TestSplitParameterPath_PathLevelParameters(t *testing.T) {
	prefix, idx, suffix, ok := splitParameterPath("$.paths['/pets'].parameters[0]")
	assert.True(t, ok)
	assert.Equal(t, "$.paths['/pets'].parameters", prefix)
	assert.Equal(t, 0, idx)
	assert.Equal(t, "", suffix)
}

func TestSplitParameterPath_LargeIndex(t *testing.T) {
	_, idx, _, ok := splitParameterPath("$.paths['/pets'].get.parameters[99]")
	assert.True(t, ok)
	assert.Equal(t, 99, idx)
}

// --- findParameterNameForLine ---

func TestFindParameterNameForLine_NilLine(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "", findParameterNameForLine(ranges, nil))
}

func TestFindParameterNameForLine_ZeroLine(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "", findParameterNameForLine(ranges, intPtr(0)))
}

func TestFindParameterNameForLine_EmptyRanges(t *testing.T) {
	assert.Equal(t, "", findParameterNameForLine(nil, intPtr(5)))
}

func TestFindParameterNameForLine_LineBeforeFirstRange(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "", findParameterNameForLine(ranges, intPtr(5)))
}

func TestFindParameterNameForLine_LineAtRangeStart(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "a", findParameterNameForLine(ranges, intPtr(10)))
}

func TestFindParameterNameForLine_LineInMiddle(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "a", findParameterNameForLine(ranges, intPtr(15)))
}

func TestFindParameterNameForLine_LineAtRangeEnd(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "a", findParameterNameForLine(ranges, intPtr(20)))
}

func TestFindParameterNameForLine_LineAfterRangeEnd(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 20}}
	assert.Equal(t, "", findParameterNameForLine(ranges, intPtr(21)))
}

func TestFindParameterNameForLine_OpenEndedRange(t *testing.T) {
	ranges := []parameterLineRange{{name: "a", start: 10, end: 0}}
	assert.Equal(t, "a", findParameterNameForLine(ranges, intPtr(999)))
}

func TestFindParameterNameForLine_MultipleRanges_MatchesSecond(t *testing.T) {
	ranges := []parameterLineRange{
		{name: "a", start: 10, end: 15},
		{name: "b", start: 16, end: 25},
	}
	assert.Equal(t, "b", findParameterNameForLine(ranges, intPtr(20)))
}

func TestFindParameterNameForLine_MultipleRanges_LastOpenEnded(t *testing.T) {
	ranges := []parameterLineRange{
		{name: "a", start: 10, end: 15},
		{name: "b", start: 16, end: 0},
	}
	assert.Equal(t, "b", findParameterNameForLine(ranges, intPtr(100)))
}

// --- resolveName ---

func TestResolveName_NilScope(t *testing.T) {
	var s *parameterScope
	change := &wcModel.Change{Path: "$.test"}
	assert.Equal(t, "", s.resolveName(change, 0))
}

func TestResolveName_BothNamesMatch(t *testing.T) {
	s := &parameterScope{
		byIndex:        map[int]string{0: "petId"},
		originalRanges: []parameterLineRange{{name: "petId", start: 10, end: 20}},
		newRanges:      []parameterLineRange{{name: "petId", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(15), NewLine: intPtr(15)},
	}
	assert.Equal(t, "petId", s.resolveName(change, 0))
}

func TestResolveName_Modified_UsesNewName(t *testing.T) {
	s := &parameterScope{
		byIndex:        map[int]string{},
		originalRanges: []parameterLineRange{{name: "limit", start: 10, end: 20}},
		newRanges:      []parameterLineRange{{name: "offset", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(15), NewLine: intPtr(15)},
	}
	assert.Equal(t, "offset", s.resolveName(change, 0))
}

func TestResolveName_PropertyAdded_UsesNewName(t *testing.T) {
	s := &parameterScope{
		byIndex:   map[int]string{},
		newRanges: []parameterLineRange{{name: "offset", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.PropertyAdded,
		Context:    &wcModel.ChangeContext{NewLine: intPtr(15)},
	}
	assert.Equal(t, "offset", s.resolveName(change, 0))
}

func TestResolveName_ObjectAdded_UsesNewName(t *testing.T) {
	s := &parameterScope{
		byIndex:   map[int]string{},
		newRanges: []parameterLineRange{{name: "offset", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Context:    &wcModel.ChangeContext{NewLine: intPtr(15)},
	}
	assert.Equal(t, "offset", s.resolveName(change, 0))
}

func TestResolveName_PropertyRemoved_UsesOriginalName(t *testing.T) {
	s := &parameterScope{
		byIndex:        map[int]string{},
		originalRanges: []parameterLineRange{{name: "limit", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.PropertyRemoved,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(15)},
	}
	assert.Equal(t, "limit", s.resolveName(change, 0))
}

func TestResolveName_ObjectRemoved_UsesOriginalName(t *testing.T) {
	s := &parameterScope{
		byIndex:        map[int]string{},
		originalRanges: []parameterLineRange{{name: "limit", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectRemoved,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(15)},
	}
	assert.Equal(t, "limit", s.resolveName(change, 0))
}

func TestResolveName_OnlyNewName_FallsThrough(t *testing.T) {
	s := &parameterScope{
		byIndex:   map[int]string{},
		newRanges: []parameterLineRange{{name: "offset", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.PropertyRemoved,
		Context:    &wcModel.ChangeContext{NewLine: intPtr(15)},
	}
	assert.Equal(t, "offset", s.resolveName(change, 0))
}

func TestResolveName_OnlyOriginalName_FallsThrough(t *testing.T) {
	s := &parameterScope{
		byIndex:        map[int]string{},
		originalRanges: []parameterLineRange{{name: "limit", start: 10, end: 20}},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(15)},
	}
	assert.Equal(t, "limit", s.resolveName(change, 0))
}

func TestResolveName_NoLineMatch_FallsBackToIndex(t *testing.T) {
	s := &parameterScope{
		byIndex: map[int]string{0: "petId"},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(999), NewLine: intPtr(999)},
	}
	assert.Equal(t, "petId", s.resolveName(change, 0))
}

func TestResolveName_NoMatch_ReturnsEmpty(t *testing.T) {
	s := &parameterScope{
		byIndex: map[int]string{},
	}
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Context:    &wcModel.ChangeContext{OriginalLine: intPtr(999), NewLine: intPtr(999)},
	}
	assert.Equal(t, "", s.resolveName(change, 0))
}

func TestResolveName_NilContext_FallsBackToIndex(t *testing.T) {
	s := &parameterScope{
		byIndex: map[int]string{0: "petId"},
	}
	change := &wcModel.Change{ChangeType: wcModel.Modified}
	assert.Equal(t, "petId", s.resolveName(change, 0))
}

// --- NormalizeChange integration ---

func TestNormalizeChange_NonParameterPath(t *testing.T) {
	n := &changePathNormalizer{
		parameterScopes: map[string]*parameterScope{},
	}
	change := &wcModel.Change{Path: "$.paths['/pets'].get.responses.200"}
	path, rawPath := n.NormalizeChange(change)
	assert.Equal(t, "$.paths['/pets'].get.responses.200", path)
	assert.Equal(t, "$.paths['/pets'].get.responses.200", rawPath)
}

func TestNormalizeChange_WithMatchingScope(t *testing.T) {
	n := &changePathNormalizer{
		parameterScopes: map[string]*parameterScope{
			"$.paths['/pets'].get.parameters": {
				byIndex: map[int]string{0: "petId", 1: "limit"},
			},
		},
	}
	change := &wcModel.Change{
		Path:       "$.paths['/pets'].get.parameters[1].schema",
		ChangeType: wcModel.Modified,
	}
	path, rawPath := n.NormalizeChange(change)
	assert.Equal(t, "$.paths['/pets'].get.parameters['limit'].schema", path)
	assert.Equal(t, "$.paths['/pets'].get.parameters[1].schema", rawPath)
}

func TestNormalizeChange_NoMatchingScope(t *testing.T) {
	n := &changePathNormalizer{
		parameterScopes: map[string]*parameterScope{
			"$.paths['/dogs'].get.parameters": {
				byIndex: map[int]string{0: "dogId"},
			},
		},
	}
	change := &wcModel.Change{
		Path:       "$.paths['/cats'].get.parameters[0]",
		ChangeType: wcModel.Modified,
	}
	path, rawPath := n.NormalizeChange(change)
	assert.Equal(t, "$.paths['/cats'].get.parameters[0]", path)
	assert.Equal(t, "$.paths['/cats'].get.parameters[0]", rawPath)
}

// --- isSimpleJSONPathProperty ---

func TestIsSimpleJSONPathProperty(t *testing.T) {
	tests := []struct {
		input    string
		expected bool
	}{
		{"", false},
		{"get", true},
		{"my_prop", true},
		{"prop1", true},
		{"1prop", false},
		{"a.b", false},
		{"my-prop", false},
		{"/pets", false},
		{"it's", false},
		{"MyProp", true},
		{"x", true},
	}
	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			assert.Equal(t, tt.expected, isSimpleJSONPathProperty(tt.input))
		})
	}
}

// --- appendJSONPathProperty ---

func TestAppendJSONPathProperty(t *testing.T) {
	tests := []struct {
		name     string
		path     string
		property string
		expected string
	}{
		{"EmptyPath", "", "get", ""},
		{"EmptyProperty", "$.paths", "", "$.paths"},
		{"SimpleProperty", "$.paths", "get", "$.paths.get"},
		{"NeedsQuoting", "$.paths", "/pets", "$.paths['/pets']"},
		{"SingleQuoteEscape", "$.paths", "it's", "$.paths['it\\'s']"},
		{"BothEmpty", "", "", ""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.expected, appendJSONPathProperty(tt.path, tt.property))
		})
	}
}

// --- canonicalRawPath ---

func TestCanonicalRawPath_NilScope(t *testing.T) {
	var s *parameterScope
	assert.Equal(t, "p[0].s", s.canonicalRawPath("p", "a", ".s", 0))
}

func TestCanonicalRawPath_NameFoundInIndex(t *testing.T) {
	s := &parameterScope{byIndex: map[int]string{0: "a", 1: "b"}}
	assert.Equal(t, "p[1].s", s.canonicalRawPath("p", "b", ".s", 0))
}

func TestCanonicalRawPath_NameNotFound_UsesFallback(t *testing.T) {
	s := &parameterScope{byIndex: map[int]string{0: "a"}}
	assert.Equal(t, "p[5].s", s.canonicalRawPath("p", "c", ".s", 5))
}

func TestCanonicalRawPath_EmptySuffix(t *testing.T) {
	s := &parameterScope{byIndex: map[int]string{0: "a"}}
	assert.Equal(t, "p[0]", s.canonicalRawPath("p", "a", "", 0))
}

// --- buildParameterLineRanges ---

func TestBuildParameterLineRanges_NilSlice(t *testing.T) {
	assert.Empty(t, buildParameterLineRanges(nil))
}

func TestBuildParameterLineRanges_EmptySlice(t *testing.T) {
	assert.Empty(t, buildParameterLineRanges(nil))
}

func TestBuildParameterLineRanges_AllNilParams(t *testing.T) {
	assert.Empty(t, buildParameterLineRanges(nil))
}

// --- cloneChange ---

func TestCloneChange_Nil(t *testing.T) {
	assert.Nil(t, cloneChange(nil))
}

func TestCloneChange_WithoutContext(t *testing.T) {
	original := &wcModel.Change{Property: "name", Path: "$.info.title"}
	cloned := cloneChange(original)
	assert.Equal(t, original.Property, cloned.Property)
	assert.Equal(t, original.Path, cloned.Path)
	cloned.Property = "mutated"
	assert.Equal(t, "name", original.Property)
}

func TestCloneChange_WithContext(t *testing.T) {
	original := &wcModel.Change{
		Property: "name",
		Context:  &wcModel.ChangeContext{OriginalLine: intPtr(10), NewLine: intPtr(20)},
	}
	cloned := cloneChange(original)
	assert.Equal(t, 10, *cloned.Context.OriginalLine)
	// Context struct is copied, so replacing the pointer field isolates the clone
	newLine := 999
	cloned.Context.OriginalLine = &newLine
	assert.Equal(t, 10, *original.Context.OriginalLine)
}

// --- rawPathIfChanged ---

func TestRawPathIfChanged_EmptyRaw(t *testing.T) {
	assert.Equal(t, "", rawPathIfChanged("", "$.foo"))
}

func TestRawPathIfChanged_SamePaths(t *testing.T) {
	assert.Equal(t, "", rawPathIfChanged("$.foo", "$.foo"))
}

func TestRawPathIfChanged_DifferentPaths(t *testing.T) {
	assert.Equal(t, "$.parameters[0]", rawPathIfChanged("$.parameters[0]", "$.parameters['petId']"))
}

// --- escapeJSONPathSingleQuote ---

func TestEscapeJSONPathSingleQuote_NoQuotes(t *testing.T) {
	assert.Equal(t, "/pets", escapeJSONPathSingleQuote("/pets"))
}

func TestEscapeJSONPathSingleQuote_WithQuote(t *testing.T) {
	assert.Equal(t, "it\\'s", escapeJSONPathSingleQuote("it's"))
}

func TestEscapeJSONPathSingleQuote_MultipleQuotes(t *testing.T) {
	assert.Equal(t, "a\\'b\\'c", escapeJSONPathSingleQuote("a'b'c"))
}

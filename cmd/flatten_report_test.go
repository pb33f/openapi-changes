// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	openapiModel "github.com/pb33f/openapi-changes/model"
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

// --- normalizeParameterPath ---

func TestNormalizeParameterPath_NonParameterPath(t *testing.T) {
	names := map[string]string{"$.paths['/pets'].get.parameters[0]": "petId"}
	change := &wcModel.Change{Path: "$.paths['/pets'].get.responses.200"}
	path, rawPath := normalizeParameterPath(change, names)
	assert.Equal(t, "$.paths['/pets'].get.responses.200", path)
	assert.Equal(t, "$.paths['/pets'].get.responses.200", rawPath)
}

func TestNormalizeParameterPath_WithMatchingName(t *testing.T) {
	names := map[string]string{
		"$.paths['/pets'].get.parameters[0]": "petId",
		"$.paths['/pets'].get.parameters[1]": "limit",
	}
	change := &wcModel.Change{Path: "$.paths['/pets'].get.parameters[1].schema"}
	path, rawPath := normalizeParameterPath(change, names)
	assert.Equal(t, "$.paths['/pets'].get.parameters['limit'].schema", path)
	assert.Equal(t, "$.paths['/pets'].get.parameters[1].schema", rawPath)
}

func TestNormalizeParameterPath_NoMatchingName(t *testing.T) {
	names := map[string]string{"$.paths['/dogs'].get.parameters[0]": "dogId"}
	change := &wcModel.Change{Path: "$.paths['/cats'].get.parameters[0]"}
	path, rawPath := normalizeParameterPath(change, names)
	assert.Equal(t, "$.paths['/cats'].get.parameters[0]", path)
	assert.Equal(t, "$.paths['/cats'].get.parameters[0]", rawPath)
}

func TestNormalizeParameterPath_NilChange(t *testing.T) {
	path, rawPath := normalizeParameterPath(nil, map[string]string{})
	assert.Equal(t, "", path)
	assert.Equal(t, "", rawPath)
}

func TestNormalizeParameterPath_EmptyPath(t *testing.T) {
	change := &wcModel.Change{Path: ""}
	path, rawPath := normalizeParameterPath(change, map[string]string{})
	assert.Equal(t, "", path)
	assert.Equal(t, "", rawPath)
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

func TestFlattenReport_SortsChangesDeterministically(t *testing.T) {
	report := &openapiModel.Report{
		Commit: &openapiModel.Commit{
			Changes: &wcModel.DocumentChanges{
				PropertyChanges: wcModel.NewPropertyChanges([]*wcModel.Change{
					{
						Context:    &wcModel.ChangeContext{},
						ChangeType: wcModel.PropertyAdded,
						Path:       "$.paths['/pets'].post",
						Property:   "summary",
						Type:       "operation",
						New:        "create a pet",
					},
					{
						Context:    &wcModel.ChangeContext{},
						ChangeType: wcModel.Modified,
						Path:       "$.info",
						Property:   "title",
						Type:       "info",
						Original:   "zeta",
						New:        "alpha",
					},
					{
						Context:    &wcModel.ChangeContext{},
						ChangeType: wcModel.PropertyRemoved,
						Path:       "$.paths['/pets'].get",
						Property:   "description",
						Type:       "operation",
						Original:   "list pets",
					},
				}),
			},
		},
	}

	flat := FlattenReport(report)

	assert.Len(t, flat.Changes, 3)
	assert.Equal(t, "$.info", flat.Changes[0].Path)
	assert.Equal(t, "$.paths['/pets'].get", flat.Changes[1].Path)
	assert.Equal(t, "$.paths['/pets'].post", flat.Changes[2].Path)
}

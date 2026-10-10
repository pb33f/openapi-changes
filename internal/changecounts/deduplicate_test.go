// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package changecounts

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/testify/assert"
	"github.com/pb33f/testify/require"
)

func TestDeduplicate_ComponentIdentity(t *testing.T) {
	for _, property := range []string{"schemas", "responses", "parameters", "examples", "requestBodies",
		"headers", "securitySchemes", "links", "callbacks", "pathItems", "mediaTypes"} {
		t.Run(property, func(t *testing.T) {
			for _, changeType := range []int{wcModel.ObjectAdded, wcModel.PropertyAdded, wcModel.ObjectRemoved, wcModel.PropertyRemoved} {
				first := &wcModel.Change{Path: "$.components", Property: property, ChangeType: changeType, New: "First", Original: "First"}
				second := &wcModel.Change{Path: "$.components", Property: property, ChangeType: changeType, New: "Second", Original: "Second"}
				duplicate := *first
				changes := Deduplicate([]*wcModel.Change{first, second, &duplicate})
				require.Len(t, changes, 2)
				assert.Equal(t, "$.components."+property+"['First']", changes[0].Path)
				assert.Equal(t, "$.components."+property+"['Second']", changes[1].Path)
				assert.Equal(t, "$.components", first.Path, "raw tree changes must not be mutated")
				assert.Equal(t, "$.components", second.Path)
			}
		})
	}
}

func TestDeduplicate_PreservesPropertyIdentity(t *testing.T) {
	changes := []*wcModel.Change{
		{Path: "$.components.schemas['First']", Property: "description", ChangeType: wcModel.Modified, New: "updated"},
		{Path: "$.components.schemas['First']", Property: "description", ChangeType: wcModel.Modified, New: "updated"},
		{Path: "$.components.schemas['Second']", Property: "description", ChangeType: wcModel.Modified, New: "updated"},
		{Path: "$.components.schemas['First']", Property: "title", ChangeType: wcModel.Modified, New: "updated"},
	}
	result := Deduplicate(changes)
	require.Len(t, result, 3)
	assert.Same(t, changes[0], result[0])
	assert.Same(t, changes[2], result[1])
	assert.Same(t, changes[3], result[2])
}

func TestDeduplicate_ComponentPathBoundaries(t *testing.T) {
	for _, tt := range []struct {
		name   string
		change wcModel.Change
		path   string
	}{
		{"escaped addition", wcModel.Change{Path: "$.components", Property: "schemas", ChangeType: wcModel.ObjectAdded, New: `a\b'c`}, `$.components.schemas['a\\b\'c']`},
		{"removal uses original", wcModel.Change{Path: "$.components", Property: "schemas", ChangeType: wcModel.ObjectRemoved, Original: "Old", New: "Other"}, "$.components.schemas['Old']"},
		{"extension", wcModel.Change{Path: "$.components", Property: "x-custom", ChangeType: wcModel.PropertyAdded, New: "text"}, "$.components"},
		{"modification", wcModel.Change{Path: "$.components", Property: "schemas", ChangeType: wcModel.Modified, New: "text"}, "$.components"},
		{"unnamed addition", wcModel.Change{Path: "$.components", Property: "schemas", ChangeType: wcModel.ObjectAdded}, "$.components"},
		{"existing path", wcModel.Change{Path: "$.components.schemas['Named']", Property: "schemas", ChangeType: wcModel.ObjectAdded, New: "Named"}, "$.components.schemas['Named']"},
	} {
		t.Run(tt.name, func(t *testing.T) {
			result := Deduplicate([]*wcModel.Change{nil, &tt.change})
			require.Len(t, result, 1)
			assert.Equal(t, tt.path, result[0].Path)
		})
	}
	assert.Empty(t, Deduplicate(nil))
}

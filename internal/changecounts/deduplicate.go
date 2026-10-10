// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package changecounts

import (
	"strings"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
)

// Deduplicate keeps one change per semantic JSONPath and property. Component
// additions and removals use the component name, since doctor reports those
// changes at the shared $.components path. The input changes are not modified.
func Deduplicate(changes []*wcModel.Change) []*wcModel.Change {
	type identity struct{ path, property string }
	seen := make(map[identity]struct{}, len(changes))
	result := make([]*wcModel.Change, 0, len(changes))
	for _, change := range changes {
		if change == nil {
			continue
		}
		path := componentPath(change)
		key := identity{path, change.Property}
		if _, ok := seen[key]; ok {
			continue
		}
		seen[key] = struct{}{}
		if path != change.Path {
			copy := *change
			copy.Path = path
			change = &copy
		}
		result = append(result, change)
	}
	return result
}

func componentPath(change *wcModel.Change) string {
	if change.Path != "$.components" {
		return change.Path
	}
	switch change.Property {
	case "schemas", "responses", "parameters", "examples", "requestBodies",
		"headers", "securitySchemes", "links", "callbacks", "pathItems", "mediaTypes":
	default:
		return change.Path
	}
	var name string
	switch change.ChangeType {
	case wcModel.ObjectAdded, wcModel.PropertyAdded:
		name = change.New
	case wcModel.ObjectRemoved, wcModel.PropertyRemoved:
		name = change.Original
	}
	if name == "" {
		return change.Path
	}
	name = strings.ReplaceAll(name, "\\", "\\\\")
	name = strings.ReplaceAll(name, "'", "\\'")
	return change.Path + "." + change.Property + "['" + name + "']"
}

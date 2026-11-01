// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package changecounts

import (
	"strings"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
)

// identity separates distinct edits to one property, such as an enum addition and
// removal, so a repeat is only ever a second report of the same edit.
type identity struct {
	path, property, original, modified     string
	originalEncoded, newEncoded, reference string
	changeType                             int
	breaking                               bool
	// Changes without a semantic path are identified by their source position, or
	// by the change itself when that is unknown too.
	position  sourcePosition
	unlocated *wcModel.Change
}

type sourcePosition struct {
	document                                         string
	originalLine, originalColumn, newLine, newColumn int
}

// Deduplicate keeps one change per semantic edit. Component additions and removals
// use the component name, since doctor reports those changes at the shared
// $.components path. The input changes are not modified.
func Deduplicate(changes []*wcModel.Change) []*wcModel.Change {
	seen := make(map[identity]struct{}, len(changes))
	result := make([]*wcModel.Change, 0, len(changes))
	for _, change := range changes {
		if change == nil {
			continue
		}
		path := componentPath(change)
		key := identity{
			path: path, property: change.Property, original: change.Original, modified: change.New,
			originalEncoded: change.OriginalEncoded, newEncoded: change.NewEncoded,
			reference: change.Reference, changeType: change.ChangeType, breaking: change.Breaking,
		}
		if path == "" {
			if position, ok := changePosition(change.Context); ok {
				key.position = position
			} else {
				key.unlocated = change
			}
		}
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

func changePosition(context *wcModel.ChangeContext) (sourcePosition, bool) {
	if context == nil || (context.OriginalLine == nil && context.NewLine == nil) {
		return sourcePosition{}, false
	}
	value := func(number *int) int {
		if number == nil {
			return -1
		}
		return *number
	}
	return sourcePosition{
		document:       context.DocumentLocation,
		originalLine:   value(context.OriginalLine),
		originalColumn: value(context.OriginalColumn),
		newLine:        value(context.NewLine),
		newColumn:      value(context.NewColumn),
	}, true
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

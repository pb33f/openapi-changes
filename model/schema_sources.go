// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package model

import "github.com/pb33f/libopenapi/jsonschema"

// SchemaSources holds the source bytes for one side of a comparison.
type SchemaSources struct {
	Root  string
	Files map[string][]byte
}

// NewSchemaSources shares the immutable buffers owned by the parsed input.
func NewSchemaSources(doc *jsonschema.Document) *SchemaSources {
	if doc == nil {
		return nil
	}
	sources := &SchemaSources{Files: make(map[string][]byte, len(doc.Sources))}
	if doc.Root != nil {
		sources.Root = doc.Root.Source.Name
	}
	for name, source := range doc.Sources {
		sources.Files[name] = source.Data
	}
	return sources
}

// Extra returns source text outside the root, whose bytes the report already carries.
func (s *SchemaSources) Extra() map[string]string {
	if s == nil {
		return nil
	}
	var files map[string]string
	for name, data := range s.Files {
		if name != s.Root {
			if files == nil {
				files = make(map[string]string)
			}
			files[name] = string(data)
		}
	}
	return files
}

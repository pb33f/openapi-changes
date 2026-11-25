// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package model

import (
	"testing"

	"github.com/pb33f/libopenapi/jsonschema"
	"github.com/pb33f/testify/require"
)

func TestAutoDetectsAuthoredSchemaDeclaration(t *testing.T) {
	for _, tc := range []struct {
		input, kind string
		fast        bool
	}{
		{`{"title":"A","$schema":"` + jsonschema.Dialect + `"}`, "JSON Schema", true},
		{"---\ntitle: A\n'$schema': " + jsonschema.Dialect + "\n", "JSON Schema", true},
		{`{"\u0024schema":"` + jsonschema.Dialect + `"}`, "JSON Schema", false},
		{`{"openapi":"3.1.0","info":{"title":"A","version":"1"},"components":{"schemas":{"A":{"$schema":"` + jsonschema.Dialect + `"}}}}`, "OpenAPI", false},
		{"openapi: 3.1.0\ninfo: {title: A, version: v1}\ncomponents:\n  schemas:\n    A:\n      $schema: " + jsonschema.Dialect, "OpenAPI", false},
	} {
		data := []byte(tc.input)
		require.Equal(t, tc.fast, schemaMarker(data))
		got, err := ParseInput(data, "input.yaml", nil, SchemaInputOptions{})
		require.NoError(t, err)
		require.Equal(t, tc.kind, got.Kind())
		got.Release()
	}
}

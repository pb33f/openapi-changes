// Copyright 2023-2026 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package security

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func TestIsSecurityScopeChange(t *testing.T) {
	tests := []struct {
		name     string
		change   *wcModel.Change
		expected bool
	}{
		{
			name: "empty property",
			change: &wcModel.Change{
				Property: "",
			},
			expected: false,
		},
		{
			name: "property with slash",
			change: &wcModel.Change{
				Property: "parameters/chaps",
			},
			expected: false,
		},
		{
			name: "known non-security property",
			change: &wcModel.Change{
				Property: "servers",
			},
			expected: false,
		},
		{
			name: "valid security scope addition",
			change: &wcModel.Change{
				Property:   "read:scope",
				ChangeType: wcModel.ObjectAdded,
				New:        "read:scope",
			},
			expected: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.expected, IsSecurityScopeChange(tt.change))
		})
	}
}

func TestFormatSecurityScopeTitle(t *testing.T) {
	tests := []struct {
		name     string
		change   *wcModel.Change
		expected string
	}{
		{
			name: "scopes property",
			change: &wcModel.Change{
				Property:     "scopes",
				ChangeType:   wcModel.ObjectAdded,
				NewObject:    "read",
				New:          "true",
			},
			expected: "scopes/read (true)",
		},
		{
			name: "standard property",
			change: &wcModel.Change{
				Property:   "security",
				ChangeType: wcModel.ObjectAdded,
				New:        "oauth2",
			},
			expected: "security/oauth2",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.expected, FormatSecurityScopeTitle(tt.change))
		})
	}
}

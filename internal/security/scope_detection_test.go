// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package security

import (
	"testing"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
)

func TestIsSecurityScopeChange_Added(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "read:pets",
	}
	assert.True(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_Removed(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectRemoved,
		Property:   "petstore_auth",
		Original:   "write:pets",
	}
	assert.True(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_EmptyProperty(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "",
		New:        "read:pets",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_PropertyWithSlash(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "parameters/chaps",
		New:        "some value",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_KnownNonSecurityProperty(t *testing.T) {
	for _, prop := range []string{"servers", "description", "paths", "tags", "info", "components"} {
		change := &wcModel.Change{
			ChangeType: wcModel.ObjectAdded,
			Property:   prop,
			New:        "some value",
		}
		assert.False(t, IsSecurityScopeChange(change), "should reject known property: %s", prop)
	}
}

func TestIsSecurityScopeChange_NewContainsURL(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "https://example.com/auth",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_NewContainsSlash(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "some/path",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_NewEqualsProperty(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "petstore_auth",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_EmptyNew(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_ModifiedIgnored(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Property:   "petstore_auth",
		New:        "read:pets",
		Original:   "write:pets",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestIsSecurityScopeChange_CaseInsensitivePropertyLookup(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "Servers",
		New:        "some value",
	}
	assert.False(t, IsSecurityScopeChange(change))
}

func TestFormatSecurityScopeTitle_AddedWithScopesKey(t *testing.T) {
	change := &wcModel.Change{
		ChangeType:    wcModel.ObjectAdded,
		Property:      "scopes",
		New:           "Access all pets",
		NewObject:     "read:pets",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "scopes/read:pets (Access all pets)", result)
}

func TestFormatSecurityScopeTitle_AddedWithScopesKeyOnly(t *testing.T) {
	change := &wcModel.Change{
		ChangeType:    wcModel.ObjectAdded,
		Property:      "scopes",
		New:           "read:pets",
		NewObject:     "read:pets",
	}
	// value == key, so no parenthetical
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "scopes/read:pets", result)
}

func TestFormatSecurityScopeTitle_RemovedWithScopesKey(t *testing.T) {
	change := &wcModel.Change{
		ChangeType:       wcModel.ObjectRemoved,
		Property:         "scopes",
		Original:         "Write pets",
		OriginalObject:   "write:pets",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "scopes/write:pets (Write pets)", result)
}

func TestFormatSecurityScopeTitle_AddedNonScopes(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "read:pets",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "petstore_auth/read:pets", result)
}

func TestFormatSecurityScopeTitle_RemovedNonScopes(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectRemoved,
		Property:   "petstore_auth",
		Original:   "write:pets",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "petstore_auth/write:pets", result)
}

func TestFormatSecurityScopeTitle_FallbackToProperty(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.Modified,
		Property:   "some_scheme",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "some_scheme", result)
}

func TestFormatSecurityScopeTitle_AddedEmptyNew(t *testing.T) {
	change := &wcModel.Change{
		ChangeType: wcModel.ObjectAdded,
		Property:   "petstore_auth",
		New:        "",
	}
	result := FormatSecurityScopeTitle(change)
	assert.Equal(t, "petstore_auth", result)
}

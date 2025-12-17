// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package security

import (
	"strings"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
)

// knownNonSecurityProperties is a package-level constant - allocated once at startup.
// This avoids allocating a new map on every call to IsSecurityScopeChange.
var knownNonSecurityProperties = map[string]bool{
	"servers": true, "parent": true, "kind": true, "enum": true,
	"default": true, "description": true, "name": true, "url": true,
	"summary": true, "title": true, "version": true, "email": true,
	"license": true, "contact": true, "termsofservice": true,
	"openapi": true, "info": true, "tags": true, "paths": true,
	"components": true, "security": true, "externaldocs": true,
	"identifier": true, "jsonschemadialect": true, "$self": true,
	"parameters": true, "codes": true, "callbacks": true,
	"required": true, "type": true,
}

// IsSecurityScopeChange checks if this is a security scope change where
// Property contains scheme name and New/Original contains scope value.
// We need to be restrictive to avoid false positives on other change types.
func IsSecurityScopeChange(change *wcModel.Change) bool {
	if change.Property == "" {
		return false
	}

	// Security scheme names don't contain "/" - if Property has "/" it's something else
	// (e.g., "parameters/chaps" is a parameter addition, not a security scope)
	if strings.Contains(change.Property, "/") {
		return false
	}

	// Use lowercase for single lookup (all keys in map are lowercase)
	if knownNonSecurityProperties[strings.ToLower(change.Property)] {
		return false
	}

	// Only consider ObjectAdded/ObjectRemoved, not property changes
	switch change.ChangeType {
	case wcModel.ObjectAdded:
		// Security scopes are simple strings without URLs or special patterns
		if change.New != "" && change.New != change.Property &&
			!strings.Contains(change.New, "://") && !strings.Contains(change.New, "/") {
			return true
		}
	case wcModel.ObjectRemoved:
		if change.Original != "" && change.Original != change.Property &&
			!strings.Contains(change.Original, "://") && !strings.Contains(change.Original, "/") {
			return true
		}
	}
	return false
}

// FormatSecurityScopeTitle formats security scope changes as "scheme/scope"
func FormatSecurityScopeTitle(change *wcModel.Change) string {
	switch change.ChangeType {
	case wcModel.ObjectAdded, wcModel.PropertyAdded:
		if change.New != "" {
			return change.Property + "/" + change.New
		}
	case wcModel.ObjectRemoved, wcModel.PropertyRemoved:
		if change.Original != "" {
			return change.Property + "/" + change.Original
		}
	}
	return change.Property
}

// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"reflect"
	"strings"

	v3 "github.com/pb33f/libopenapi/datamodel/low/v3"
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/internal/security"
	"github.com/pterm/pterm"
	"github.com/pterm/pterm/putils"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// pendingParamChanges stores parameter addition/removal changes from PropertyChanges
// to be merged with ParameterChanges when building the tree
var pendingParamChanges []*wcModel.Change

func buildConsoleTreeNode(list *[]pterm.LeveledListItem, object any, level int, markdown bool) {
	if object == nil {
		return
	}
	if reflect.ValueOf(object).IsZero() {
		return
	}
	v := reflect.ValueOf(object).Elem()
	num := v.NumField()
	upper := cases.Title(language.English)
	for i := 0; i < num; i++ {
		fName := v.Type().Field(i).Name
		field := v.FieldByName(fName)
		switch field.Type() {

		case reflect.TypeOf(&wcModel.PropertyChanges{}):
			topChanges := field.Elem().Interface().(wcModel.PropertyChanges).Changes

			// Separate tag and parameter changes from other changes so we can group them
			var tagChanges []*wcModel.Change
			var paramChanges []*wcModel.Change
			var otherChanges []*wcModel.Change
			for y := range topChanges {
				prop := strings.ToLower(topChanges[y].Property)
				if prop == "tags" {
					tagChanges = append(tagChanges, topChanges[y])
				} else if prop == "parameters" {
					paramChanges = append(paramChanges, topChanges[y])
				} else {
					otherChanges = append(otherChanges, topChanges[y])
				}
			}

			// Create Tags node if there are tag changes
			if len(tagChanges) > 0 {
				*list = append(*list, pterm.LeveledListItem{Level: level, Text: "Tags"})
				for _, change := range tagChanges {
					*list = append(*list, pterm.LeveledListItem{Level: level + 1, Text: generateTreeState(change, markdown)})
				}
			}

			// Store parameter changes to be merged with ParameterChanges later
			// Only set if there are actual parameter changes (to avoid overwriting from nested objects)
			if len(paramChanges) > 0 {
				pendingParamChanges = paramChanges
			}

			// Process other changes normally
			for y := range otherChanges {
				*list = append(*list, pterm.LeveledListItem{Level: level, Text: generateTreeState(otherChanges[y], markdown)})
			}
			continue
		case reflect.TypeOf(&wcModel.Change{}):
			topChanges := field.Elem().Interface().(wcModel.PropertyChanges).Changes
			for y := range topChanges {
				*list = append(*list, pterm.LeveledListItem{Level: level, Text: generateTreeState(topChanges[y], markdown)})
			}
			continue
		case reflect.TypeOf(&wcModel.InfoChanges{}):
			DigIntoObject[wcModel.InfoChanges](list, field, level, upper.String(v3.InfoLabel), markdown)

		case reflect.TypeOf(&wcModel.ContactChanges{}):
			DigIntoObject[wcModel.ContactChanges](list, field, level, upper.String(v3.ContactLabel), markdown)

		case reflect.TypeOf(&wcModel.ItemsChanges{}):
			DigIntoObject[wcModel.ItemsChanges](list, field, level, upper.String(v3.ItemsLabel), markdown)

		case reflect.TypeOf(&wcModel.LicenseChanges{}):
			DigIntoObject[wcModel.LicenseChanges](list, field, level, upper.String(v3.LicenseLabel), markdown)

		case reflect.TypeOf(&wcModel.PathsChanges{}):
			DigIntoObject[wcModel.PathsChanges](list, field, level, upper.String(v3.PathsLabel), markdown)

		case reflect.TypeOf(&wcModel.OperationChanges{}):
			DigIntoObject[wcModel.OperationChanges](list, field, level, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), markdown)

		case reflect.TypeOf(&wcModel.ServerChanges{}):
			DigIntoObject[wcModel.ServerChanges](list, field, level, upper.String(v3.ServerLabel), markdown)

		case reflect.TypeOf(&wcModel.ComponentsChanges{}):
			DigIntoObject[wcModel.ComponentsChanges](list, field, level, upper.String(v3.ComponentsLabel), markdown)

		case reflect.TypeOf(&wcModel.RequestBodyChanges{}):
			DigIntoObject[wcModel.RequestBodyChanges](list, field, level, "Request Body", markdown)

		case reflect.TypeOf([]*wcModel.TagChanges{}):
			BuildSliceTreeNode[wcModel.TagChanges](list, field, level, upper.String(v3.TagsLabel), markdown)

		case reflect.TypeOf([]*wcModel.SchemaChanges{}):
			BuildSliceTreeNode[wcModel.SchemaChanges](list, field, level, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), markdown)

		case reflect.TypeOf([]*wcModel.ServerChanges{}):
			BuildSliceTreeNode[wcModel.ServerChanges](list, field, level, upper.String(v3.ServersLabel), markdown)

		case reflect.TypeOf([]*wcModel.SecurityRequirementChanges{}):
			BuildSliceTreeNode[wcModel.SecurityRequirementChanges](list, field, level, "Security Requirements", markdown)

		case reflect.TypeOf([]*wcModel.ParameterChanges{}):
			BuildParameterSliceTreeNode(list, field, level, upper.String(v3.ParametersLabel), markdown)

		case reflect.TypeOf(&wcModel.SchemaChanges{}):
			DigIntoObject[wcModel.SchemaChanges](list, field, level, upper.String(v3.SchemaLabel), markdown)

		case reflect.TypeOf(&wcModel.ExamplesChanges{}):
			DigIntoObject[wcModel.ExamplesChanges](list, field, level, upper.String(v3.ExamplesLabel), markdown)

		case reflect.TypeOf(&wcModel.ExtensionChanges{}):
			DigIntoObject[wcModel.ExtensionChanges](list, field, level, "Extensions", markdown)

		case reflect.TypeOf(&wcModel.ExternalDocChanges{}):
			DigIntoObject[wcModel.ExternalDocChanges](list, field, level, "External Docs", markdown)

		case reflect.TypeOf(&wcModel.XMLChanges{}):
			DigIntoObject[wcModel.XMLChanges](list, field, level, upper.String(v3.XMLLabel), markdown)

		case reflect.TypeOf(&wcModel.ScopesChanges{}):
			DigIntoObject[wcModel.ScopesChanges](list, field, level, upper.String(v3.Scopes), markdown)

		case reflect.TypeOf(&wcModel.OAuthFlowChanges{}):
			DigIntoObject[wcModel.OAuthFlowChanges](list, field, level, "oAuth Flow", markdown)

		case reflect.TypeOf(&wcModel.OAuthFlowsChanges{}):
			DigIntoObject[wcModel.OAuthFlowsChanges](list, field, level, "oAuth Flows", markdown)

		case reflect.TypeOf(&wcModel.DiscriminatorChanges{}):
			DigIntoObject[wcModel.DiscriminatorChanges](list, field, level, "Discriminator", markdown)

		case reflect.TypeOf(&wcModel.ResponsesChanges{}):
			DigIntoObject[wcModel.ResponsesChanges](list, field, level, upper.String(v3.ResponsesLabel), markdown)

		case reflect.TypeOf(map[string]*wcModel.PathItemChanges{}),
			reflect.TypeOf(map[string]*wcModel.ResponseChanges{}),
			reflect.TypeOf(map[string]*wcModel.SchemaChanges{}),
			reflect.TypeOf(map[string]*wcModel.CallbackChanges{}),
			reflect.TypeOf(map[string]*wcModel.ExampleChanges{}),
			reflect.TypeOf(map[string]*wcModel.EncodingChanges{}),
			reflect.TypeOf(map[string]*wcModel.HeaderChanges{}),
			reflect.TypeOf(map[string]*wcModel.ServerVariableChanges{}),
			reflect.TypeOf(map[string]*wcModel.MediaTypeChanges{}),
			reflect.TypeOf(map[string]*wcModel.SecuritySchemeChanges{}),
			reflect.TypeOf(map[string]*wcModel.LinkChanges{}),
			reflect.TypeOf(map[string]*wcModel.OperationChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				label := getLabelForMapField(fName)
				BuildLabeledTreeMapNode(list, field, level, label, markdown)
			}

		}

	}
}

func generateTreeState(change *wcModel.Change, markdown bool) string {
	breaking := ""
	if change.Breaking {
		breaking = "❌ "
	}

	// Helper function to safely dereference int pointers
	safeDeref := func(ptr *int) int {
		if ptr == nil {
			return 0
		}
		return *ptr
	}

	// For "codes", "tags", and "parameters" properties, use the actual value instead of the generic label
	property := change.Property

	// Special handling for security scope changes (scheme/scope format)
	if security.IsSecurityScopeChange(change) {
		property = security.FormatSecurityScopeTitle(change)
	} else {
		lowerProp := strings.ToLower(change.Property)
		// Handle "component/name" format (e.g., "schemas/Tree") - extract just the name
		// But don't transform callback expressions like "{$request.body#/callbackUrl}"
		isCallbackExpression := strings.HasPrefix(change.Property, "{$") && strings.HasSuffix(change.Property, "}")
		if idx := strings.LastIndex(change.Property, "/"); idx != -1 && idx < len(change.Property)-1 && !isCallbackExpression {
			property = change.Property[idx+1:]
		} else if lowerProp == "codes" || lowerProp == "tags" || lowerProp == "parameters" {
			switch change.ChangeType {
			case wcModel.Modified, wcModel.PropertyRemoved, wcModel.ObjectRemoved:
				if change.Original != "" {
					property = change.Original
				}
			case wcModel.ObjectAdded, wcModel.PropertyAdded:
				if change.New != "" {
					property = change.New
				}
			}
		}
	}

	switch change.ChangeType {
	case wcModel.Modified:
		if markdown {
			return fmt.Sprintf("[🔀] %s (%d:%d)%s", property,
				safeDeref(change.Context.NewLine), safeDeref(change.Context.NewColumn), breaking)
		}
		return fmt.Sprintf("[M] %s (%d:%d)%s", property,
			safeDeref(change.Context.NewLine), safeDeref(change.Context.NewColumn), breaking)
	case wcModel.ObjectAdded, wcModel.PropertyAdded:
		if markdown {
			return fmt.Sprintf("[➕] %s (%d:%d)%s", property,
				safeDeref(change.Context.NewLine), safeDeref(change.Context.NewColumn), breaking)
		}
		return fmt.Sprintf("[+] %s (%d:%d)%s", property,
			safeDeref(change.Context.NewLine), safeDeref(change.Context.NewColumn), breaking)
	case wcModel.ObjectRemoved, wcModel.PropertyRemoved:
		if markdown {
			return fmt.Sprintf("[➖] %s (%d:%d)%s", property,
				safeDeref(change.Context.OriginalLine), safeDeref(change.Context.OriginalColumn), breaking)
		}
		return fmt.Sprintf("[-] %s (%d:%d)%s", property,
			safeDeref(change.Context.OriginalLine), safeDeref(change.Context.OriginalColumn), breaking)
	}
	return ""
}

func buildConsoleTree(doc *wcModel.DocumentChanges, markdown bool) {
	var ll []pterm.LeveledListItem

	buildConsoleTreeNode(&ll, doc, 0, markdown)

	// Generate tree from LeveledList.
	root := putils.TreeFromLeveledList(ll)

	// Render TreePrinter
	if markdown {
		fmt.Println()
		fmt.Println()
		fmt.Println("```")
	}
	pterm.DefaultTree.WithRoot(root).Render()
	if markdown {
		fmt.Println("```")
	}
	fmt.Println()

}

func BuildSliceTreeNode[T any](list *[]pterm.LeveledListItem, field reflect.Value, level int, label string, markdown bool) {
	if !field.IsZero() && field.Len() > 0 {
		// Add the label ONCE for the entire slice
		*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
		for k := 0; k < field.Len(); k++ {
			f := field.Index(k)
			if f.Elem().IsValid() && !f.Elem().IsZero() {
				ob := f.Elem().Interface().(T)
				buildConsoleTreeNode(list, &ob, level+1, markdown)
			}
		}
	}
}

// BuildParameterSliceTreeNode builds tree nodes for parameter changes, adding the parameter name as a label.
// It also includes any pending parameter addition/removal changes from PropertyChanges.
func BuildParameterSliceTreeNode(list *[]pterm.LeveledListItem, field reflect.Value, level int, label string, markdown bool) {
	hasParamChanges := !field.IsZero() && field.Len() > 0
	hasPendingChanges := len(pendingParamChanges) > 0

	if hasParamChanges || hasPendingChanges {
		// Add the "Parameters" label ONCE for the entire section
		*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})

		// First, add changes for existing parameters (property modifications)
		if hasParamChanges {
			for k := 0; k < field.Len(); k++ {
				f := field.Index(k)
				if f.Elem().IsValid() && !f.Elem().IsZero() {
					paramChanges := f.Elem().Interface().(wcModel.ParameterChanges)
					// Add the parameter name as a label
					if paramChanges.Name != "" {
						*list = append(*list, pterm.LeveledListItem{Level: level + 1, Text: paramChanges.Name})
						buildConsoleTreeNode(list, &paramChanges, level+2, markdown)
					} else {
						buildConsoleTreeNode(list, &paramChanges, level+1, markdown)
					}
				}
			}
		}

		// Then, add parameter addition/removal changes from PropertyChanges
		for _, change := range pendingParamChanges {
			*list = append(*list, pterm.LeveledListItem{Level: level + 1, Text: generateTreeState(change, markdown)})
		}
		// Clear pending changes after use
		pendingParamChanges = nil
	}
}

func DigIntoObject[T any](list *[]pterm.LeveledListItem, field reflect.Value, level int, label string, markdown bool) {
	if !field.IsZero() && field.Elem().IsValid() && !field.Elem().IsZero() {
		*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
		level++
		obj := field.Elem().Interface().(T)
		buildConsoleTreeNode(list, &obj, level, markdown)
	}
}

func BuildTreeMapNode(list *[]pterm.LeveledListItem, field reflect.Value, level int, markdown bool) {
	BuildLabeledTreeMapNode(list, field, level, "", markdown)
}

// BuildLabeledTreeMapNode builds tree nodes for a map field with an optional label.
// If label is non-empty, it adds the label as a parent node before the map entries.
func BuildLabeledTreeMapNode(list *[]pterm.LeveledListItem, field reflect.Value, level int, label string, markdown bool) {
	if !field.IsZero() {
		entryLevel := level
		if label != "" {
			*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
			entryLevel = level + 1
		}

		for _, e := range field.MapKeys() {
			v := field.MapIndex(e)
			switch t := v.Interface().(type) {

			default:
				if t != nil {
					*list = append(*list, pterm.LeveledListItem{Level: entryLevel, Text: fmt.Sprint(e)})
					buildConsoleTreeNode(list, t, entryLevel+1, markdown)
				}
			}
		}
	}
}

// getLabelForMapField returns the appropriate tree label for a map field based on its name.
// Returns empty string if no label should be added (e.g., for path items where the key is self-explanatory).
func getLabelForMapField(fieldName string) string {
	switch fieldName {
	// Components maps
	case "SchemaChanges":
		return "Schemas"
	case "SecuritySchemeChanges":
		return "Security Schemes"
	// Schema property maps
	case "SchemaPropertyChanges":
		return "Properties"
	case "DependentSchemasChanges":
		return "Dependent Schemas"
	case "PatternPropertiesChanges":
		return "Pattern Properties"
	// Response/Parameter/Header/RequestBody content
	case "ContentChanges":
		return "Content"
	case "HeadersChanges", "HeaderChanges":
		return "Headers"
	case "LinkChanges":
		return "Links"
	// Examples
	case "ExamplesChanges", "ExampleChanges":
		return "Examples"
	// Encoding
	case "EncodingChanges":
		return "Encoding"
	case "ItemEncodingChanges":
		return "Item Encoding"
	// Server variables
	case "ServerVariableChanges":
		return "Variables"
	// Callbacks
	case "CallbackChanges":
		return "Callbacks"
	// Document webhooks
	case "WebhookChanges":
		return "Webhooks"
	// Additional operations (OpenAPI 3.2+)
	case "AdditionalOperationChanges":
		return "Additional Operations"
	// These don't need labels - the keys are self-explanatory
	case "PathItemsChanges", "ResponseChanges", "ExpressionChanges":
		return ""
	default:
		return ""
	}
}

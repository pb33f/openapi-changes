// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	v3 "github.com/pb33f/libopenapi/datamodel/low/v3"
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pterm/pterm"
	"github.com/pterm/pterm/putils"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"reflect"
	"strings"
)

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
			for y := range topChanges {
				*list = append(*list, pterm.LeveledListItem{Level: level, Text: generateTreeState(topChanges[y], markdown)})
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
			DigIntoObject[wcModel.RequestBodyChanges](list, field, level, upper.String(v3.RequestBodyLabel), markdown)

		case reflect.TypeOf([]*wcModel.TagChanges{}):
			BuildSliceTreeNode[wcModel.TagChanges](list, field, level, upper.String(v3.TagsLabel), markdown)

		case reflect.TypeOf([]*wcModel.SchemaChanges{}):
			BuildSliceTreeNode[wcModel.SchemaChanges](list, field, level, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), markdown)

		case reflect.TypeOf([]*wcModel.ServerChanges{}):
			BuildSliceTreeNode[wcModel.ServerChanges](list, field, level, upper.String(v3.ServersLabel), markdown)

		case reflect.TypeOf([]*wcModel.SecurityRequirementChanges{}):
			BuildSliceTreeNode[wcModel.SecurityRequirementChanges](list, field, level, "Security Requirements", markdown)

		case reflect.TypeOf([]*wcModel.ParameterChanges{}):
			BuildSliceTreeNode[wcModel.ParameterChanges](list, field, level, upper.String(v3.ParametersLabel), markdown)

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

		case reflect.TypeOf(map[string]*wcModel.PathItemChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.ResponseChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.SchemaChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.CallbackChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.ExampleChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.EncodingChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.HeaderChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.ServerVariableChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.MediaTypeChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.SecuritySchemeChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		case reflect.TypeOf(map[string]*wcModel.LinkChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(list, field, level, markdown)
			}

		}

	}
}

func generateTreeState(change *wcModel.Change, markdown bool) string {
	breaking := ""
	if change.Breaking {
		breaking = "❌ "
	}
	switch change.ChangeType {
	case wcModel.Modified:
		if markdown {
			return fmt.Sprintf("[🔀] %s (%d:%d)%s", change.Property, *change.Context.NewLine, *change.Context.NewColumn, breaking)
		}
		return fmt.Sprintf("[M] %s (%d:%d)%s", change.Property, *change.Context.NewLine, *change.Context.NewColumn, breaking)
	case wcModel.ObjectAdded, wcModel.PropertyAdded:
		if markdown {
			return fmt.Sprintf("[➕] %s (%d:%d)%s", change.Property, *change.Context.NewLine, *change.Context.NewColumn, breaking)
		}
		return fmt.Sprintf("[+] %s (%d:%d)%s", change.Property, *change.Context.NewLine, *change.Context.NewColumn, breaking)
	case wcModel.ObjectRemoved, wcModel.PropertyRemoved:
		if markdown {
			return fmt.Sprintf("[➖] %s (%d:%d)%s", change.Property, *change.Context.OriginalLine, *change.Context.OriginalColumn, breaking)
		}
		return fmt.Sprintf("[-] %s (%d:%d)%s", change.Property, *change.Context.OriginalLine, *change.Context.OriginalColumn, breaking)
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
	if !field.IsZero() {
		for k := 0; k < field.Len(); k++ {
			f := field.Index(k)
			ob := f.Elem().Interface().(T)
			*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
			buildConsoleTreeNode(list, &ob, level+1, markdown)
		}
	}
}

func DigIntoObject[T any](list *[]pterm.LeveledListItem, field reflect.Value, level int, label string, markdown bool) {
	if !field.IsZero() {
		*list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
		level++
		obj := field.Elem().Interface().(T)
		buildConsoleTreeNode(list, &obj, level, markdown)
	}
}

func BuildTreeMapNode(list *[]pterm.LeveledListItem, field reflect.Value, level int, markdown bool) {
	if !field.IsZero() {

		for _, e := range field.MapKeys() {
			v := field.MapIndex(e)
			switch t := v.Interface().(type) {

			default:
				if t != nil {
					*list = append(*list, pterm.LeveledListItem{Level: level, Text: fmt.Sprint(e)})
					buildConsoleTreeNode(list, t, level+1, markdown)
				}
			}
		}
	}
}

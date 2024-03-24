// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import (
	"fmt"
	"github.com/gdamore/tcell/v2"
	"github.com/pb33f/libopenapi"
	whatChangedModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/rivo/tview"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"reflect"
	"strings"
)

func BuildTreeView(commit *model.Commit) *tview.TreeView {
	root := BuildTreeModel(commit.Document, commit.Changes)
	if root == nil {
		return nil
	}
	tree := tview.NewTreeView()
	tree.SetRoot(root).SetCurrentNode(root)
	return tree
}

func BuildTreeModel(doc libopenapi.Document, changes *whatChangedModel.DocumentChanges) *tview.TreeNode {
	if doc == nil {
		return nil
	}
	root := tview.NewTreeNode(doc.GetSpecInfo().SpecType).SetColor(CYAN_CELL_COLOR)
	if changes != nil {
		buildTreeNode(root, changes)
	}
	return root
}

func buildTreeNode(root *tview.TreeNode, object any) *tview.TreeNode {
	if object == nil {
		return nil
	}

	v := reflect.ValueOf(object).Elem()
	num := v.NumField()

	var topChanges []*whatChangedModel.Change
	for i := 0; i < num; i++ {
		fName := v.Type().Field(i).Name
		field := v.FieldByName(fName)
		switch field.Type() {

		case reflect.TypeOf(&whatChangedModel.PropertyChanges{}):
			topChanges = field.Elem().Interface().(whatChangedModel.PropertyChanges).Changes
			continue

		case reflect.TypeOf([]*whatChangedModel.Change{}):
			slice, ok := field.Interface().([]*whatChangedModel.Change)
			if !ok {
				continue
			}
			topChanges = append(topChanges, slice...)
			continue

		case reflect.TypeOf(&whatChangedModel.InfoChanges{}):
			node := CreateNode("Info", object)
			DigIntoObject[whatChangedModel.InfoChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ContactChanges{}):
			node := CreateNode("Contact", object)
			DigIntoObject[whatChangedModel.ContactChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ItemsChanges{}):
			node := CreateNode("Items", object)
			DigIntoObject[whatChangedModel.ItemsChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.LicenseChanges{}):
			node := CreateNode("License", object)
			DigIntoObject[whatChangedModel.LicenseChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.PathsChanges{}):
			node := CreateNode("Paths", object)
			DigIntoObject[whatChangedModel.PathsChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.OperationChanges{}):
			node := CreateNode(strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), object)
			DigIntoObject[whatChangedModel.OperationChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ServerChanges{}):
			node := CreateNode("Servers", object)
			DigIntoObject[whatChangedModel.ServerChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ComponentsChanges{}):
			node := CreateNode("Components", object)
			DigIntoObject[whatChangedModel.ComponentsChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.RequestBodyChanges{}):
			node := CreateNode("Request Bodies", object)
			DigIntoObject[whatChangedModel.RequestBodyChanges](root, node, field)

		case reflect.TypeOf([]*whatChangedModel.ServerChanges{}):
			BuildSliceTreeNode[whatChangedModel.ServerChanges](field, root, object, "Servers")

		case reflect.TypeOf([]*whatChangedModel.SecurityRequirementChanges{}):
			BuildSliceTreeNode[whatChangedModel.SecurityRequirementChanges](field, root, object, "Security Requirements")

		case reflect.TypeOf([]*whatChangedModel.ParameterChanges{}):
			BuildSliceTreeNode[whatChangedModel.ParameterChanges](field, root, object, "Parameters")

		case reflect.TypeOf(&whatChangedModel.SchemaChanges{}):
			node := CreateNode("Schemas", object)
			DigIntoObject[whatChangedModel.SchemaChanges](root, node, field)

		case reflect.TypeOf([]*whatChangedModel.SchemaChanges{}):
			BuildSliceTreeNode[whatChangedModel.SchemaChanges](field, root, object, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")))

		case reflect.TypeOf(&whatChangedModel.ExamplesChanges{}):
			node := CreateNode("Examples", object)
			DigIntoObject[whatChangedModel.ExamplesChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ExtensionChanges{}):
			node := CreateNode("Extensions", object)
			DigIntoObject[whatChangedModel.ExtensionChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ExternalDocChanges{}):
			node := CreateNode("External Docs", object)
			DigIntoObject[whatChangedModel.ExternalDocChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.XMLChanges{}):
			node := CreateNode("XML", object)
			DigIntoObject[whatChangedModel.XMLChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ScopesChanges{}):
			node := CreateNode("Scopes", object)
			DigIntoObject[whatChangedModel.ScopesChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.OAuthFlowChanges{}):
			node := CreateNode("OAuth Flow", object)
			DigIntoObject[whatChangedModel.OAuthFlowChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.OAuthFlowsChanges{}):
			node := CreateNode("OAuth Flows", object)
			DigIntoObject[whatChangedModel.OAuthFlowsChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.DiscriminatorChanges{}):
			node := CreateNode("Discriminator", object)
			DigIntoObject[whatChangedModel.DiscriminatorChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.ResponsesChanges{}):

			node := CreateNode("Responses", object)
			DigIntoObject[whatChangedModel.ResponsesChanges](root, node, field)

		case reflect.TypeOf([]*whatChangedModel.TagChanges{}):
			BuildSliceTreeNode[whatChangedModel.TagChanges](field, root, object, "Tag")

		case reflect.TypeOf(&whatChangedModel.ResponseChanges{}):
			node := CreateNode("Response", object)
			DigIntoObject[whatChangedModel.ExtensionChanges](root, node, field)

		case reflect.TypeOf(&whatChangedModel.SchemaChanges{}):
			node := CreateNode("Schema", object)
			DigIntoObject[whatChangedModel.SchemaChanges](root, node, field)

		case reflect.TypeOf(map[string]*whatChangedModel.ResponseChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(field, root)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.SchemaChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Schema", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.CallbackChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Callbacks", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.ExampleChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Example", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.EncodingChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Encoding", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.HeaderChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Headers", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.ServerVariableChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Server Vars", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.MediaTypeChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Content", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.LinkChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("Links", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.SecuritySchemeChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				BuildTreeMapNode(field, root)
			}

		case reflect.TypeOf(map[string]*whatChangedModel.PathItemChanges{}):
			if !field.IsZero() && len(field.MapKeys()) > 0 {
				node := CreateNode("PathItems", object)
				root.AddChild(node)
				BuildTreeMapNode(field, node)
			}
		}

	}

	caser := cases.Title(language.AmericanEnglish)
	for i := range topChanges {

		msg := ""
		var color RGB
		if topChanges[i].ChangeType == whatChangedModel.PropertyRemoved || topChanges[i].ChangeType == whatChangedModel.ObjectRemoved {
			var br = ""
			color = CYAN_RGB
			if topChanges[i].Breaking {
				br = "{X}"
				color = RGB{255, 0, 0}
			}
			msg = fmt.Sprintf(" - %s Removed %s", caser.String(topChanges[i].Property), br)
		}
		if topChanges[i].ChangeType == whatChangedModel.PropertyAdded || topChanges[i].ChangeType == whatChangedModel.ObjectAdded {
			msg = fmt.Sprintf(" + %s Added", caser.String(topChanges[i].Property))
			color = CYAN_RGB
		}

		if topChanges[i].ChangeType == whatChangedModel.Modified {
			msg = fmt.Sprintf(" %s Changed", caser.String(topChanges[i].Property))
			color = MAGENTA_RGB
		}

		node := tview.NewTreeNode(msg).
			SetReference(topChanges[i]).
			SetSelectable(true)

		node.SetColor(tcell.NewRGBColor(color.R(), color.G(), color.B()))
		root.AddChild(node)
	}
	return root
}

func BuildSliceTreeNode[T any](field reflect.Value, root *tview.TreeNode, obj any, label string) {
	if !field.IsZero() {
		node := CreateNode(label, obj)
		root.AddChild(node)
		for k := 0; k < field.Len(); k++ {
			f := field.Index(k)
			ob := f.Elem().Interface().(T)
			buildTreeNode(node, &ob)
		}
	}
}

func BuildTreeMapNode(field reflect.Value, root *tview.TreeNode) {
	if !field.IsZero() {
		for _, e := range field.MapKeys() {
			v := field.MapIndex(e)
			switch t := v.Interface().(type) {
			default:
				node := tview.NewTreeNode(fmt.Sprint(e)).
					SetReference(t).
					SetSelectable(true).
					SetExpanded(true)
				buildTreeNode(node, t)
				root.AddChild(node)
			}
		}
	}
}

func CreateNode(name string, object any) *tview.TreeNode {
	return tview.NewTreeNode(name).
		SetReference(object).
		SetSelectable(true).
		SetExpanded(true)
}

func DigIntoObject[T any](root, node *tview.TreeNode, field reflect.Value) {
	if !field.IsZero() {
		obj := field.Elem().Interface().(T)
		buildTreeNode(node, &obj)
		root.AddChild(node)
	}
}

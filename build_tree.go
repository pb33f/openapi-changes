// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package main

import (
    "fmt"
    "github.com/gdamore/tcell/v2"
    "github.com/pb33f/libopenapi"
    "github.com/pb33f/libopenapi/what-changed/model"
    "github.com/rivo/tview"
    "golang.org/x/text/cases"
    "golang.org/x/text/language"
    "reflect"
    "strings"
)

func BuildTree(doc libopenapi.Document, changes *model.DocumentChanges) *tview.TreeNode {

    //model, _ := doc.BuildV3Model()

    root := tview.NewTreeNode(doc.GetSpecInfo().SpecType).SetColor(tcell.ColorRed)
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

    var topChanges []*model.Change
    // var infoChanges *model.InfoChanges

    for i := 0; i < num; i++ {
        fName := v.Type().Field(i).Name
        field := v.FieldByName(fName)
        switch field.Type() {

        case reflect.TypeOf(&model.PropertyChanges{}):
            topChanges = field.Elem().Interface().(model.PropertyChanges).Changes
            continue

        case reflect.TypeOf([]*model.Change{}):
            topChanges = append(topChanges, field.Elem().Interface().([]*model.Change)...)
            continue

        case reflect.TypeOf(&model.InfoChanges{}):
            node := CreateNode("Info", object)
            DigIntoObject[model.InfoChanges](root, node, field)

        case reflect.TypeOf(&model.ContactChanges{}):
            node := CreateNode("Contact", object)
            DigIntoObject[model.ContactChanges](root, node, field)

        case reflect.TypeOf(&model.ItemsChanges{}):
            node := CreateNode("Items", object)
            DigIntoObject[model.ItemsChanges](root, node, field)

        case reflect.TypeOf(&model.LicenseChanges{}):
            node := CreateNode("License", object)
            DigIntoObject[model.LicenseChanges](root, node, field)

        case reflect.TypeOf(&model.PathsChanges{}):
            node := CreateNode("Paths", object)
            DigIntoObject[model.PathsChanges](root, node, field)

        case reflect.TypeOf(&model.OperationChanges{}):
            node := CreateNode(strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), object)
            DigIntoObject[model.OperationChanges](root, node, field)

        case reflect.TypeOf(&model.ServerChanges{}):
            node := CreateNode("Servers", object)
            DigIntoObject[model.ServerChanges](root, node, field)

        case reflect.TypeOf(&model.ComponentsChanges{}):
            node := CreateNode("Components", object)
            DigIntoObject[model.ComponentsChanges](root, node, field)

        case reflect.TypeOf(&model.ItemsChanges{}):
            node := CreateNode("Items", object)
            DigIntoObject[model.ItemsChanges](root, node, field)

        case reflect.TypeOf(&model.RequestBodyChanges{}):
            node := CreateNode("Request Bodies", object)
            DigIntoObject[model.RequestBodyChanges](root, node, field)

        case reflect.TypeOf([]*model.ServerChanges{}):
            BuildSliceTreeNode[model.ServerChanges](field, root, object, "Servers")

        case reflect.TypeOf([]*model.SecurityRequirementChanges{}):
            BuildSliceTreeNode[model.SecurityRequirementChanges](field, root, object, "Security Requirements")

        case reflect.TypeOf([]*model.ParameterChanges{}):
            BuildSliceTreeNode[model.ParameterChanges](field, root, object, "Parameters")

        case reflect.TypeOf(&model.SchemaChanges{}):
            node := CreateNode("Schemas", object)
            DigIntoObject[model.SchemaChanges](root, node, field)

        case reflect.TypeOf([]*model.SchemaChanges{}):
            BuildSliceTreeNode[model.SchemaChanges](field, root, object, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")))

        case reflect.TypeOf(&model.ExamplesChanges{}):
            node := CreateNode("Examples", object)
            DigIntoObject[model.ExamplesChanges](root, node, field)

        case reflect.TypeOf(&model.ExtensionChanges{}):
            node := CreateNode("Extensions", object)
            DigIntoObject[model.ExtensionChanges](root, node, field)

        case reflect.TypeOf(&model.ExternalDocChanges{}):
            node := CreateNode("External Docs", object)
            DigIntoObject[model.ExternalDocChanges](root, node, field)

        case reflect.TypeOf(&model.XMLChanges{}):
            node := CreateNode("XML", object)
            DigIntoObject[model.XMLChanges](root, node, field)

        case reflect.TypeOf(&model.ScopesChanges{}):
            node := CreateNode("Scopes", object)
            DigIntoObject[model.ScopesChanges](root, node, field)

        case reflect.TypeOf(&model.OAuthFlowChanges{}):
            node := CreateNode("OAuth Flow", object)
            DigIntoObject[model.OAuthFlowChanges](root, node, field)

        case reflect.TypeOf(&model.OAuthFlowsChanges{}):
            node := CreateNode("OAuth Flows", object)
            DigIntoObject[model.OAuthFlowsChanges](root, node, field)

        case reflect.TypeOf(&model.DiscriminatorChanges{}):
            node := CreateNode("Discriminator", object)
            DigIntoObject[model.DiscriminatorChanges](root, node, field)

        case reflect.TypeOf(&model.ResponsesChanges{}):

            node := CreateNode("Responses", object)
            DigIntoObject[model.ResponsesChanges](root, node, field)

        case reflect.TypeOf([]*model.TagChanges{}):
            BuildSliceTreeNode[model.TagChanges](field, root, object, "Tag")

        case reflect.TypeOf(&model.ResponseChanges{}):
            node := CreateNode("Response", object)
            DigIntoObject[model.ExtensionChanges](root, node, field)

        case reflect.TypeOf(&model.SchemaChanges{}):
            node := CreateNode("Schema", object)
            DigIntoObject[model.SchemaChanges](root, node, field)

        case reflect.TypeOf(map[string]*model.ResponseChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(field, root)
            }

        case reflect.TypeOf(map[string]*model.SchemaChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Schema", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.CallbackChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Callbacks", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.ExampleChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Example", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.EncodingChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Encoding", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.HeaderChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Headers", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.ServerVariableChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Server Vars", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.MediaTypeChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Content", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.LinkChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("Links", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }

        case reflect.TypeOf(map[string]*model.SecuritySchemeChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(field, root)
            }

        case reflect.TypeOf(map[string]*model.PathItemChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                node := CreateNode("PathItems", object)
                root.AddChild(node)
                BuildTreeMapNode(field, node)
            }
        }

    }

    /*
       s := reflect.ValueOf(t)

       		for i := 0; i < s.Len(); i++ {
       			fmt.Println(s.Index(i))
       		}
    */
    caser := cases.Title(language.AmericanEnglish)
    for i := range topChanges {

        msg := ""
        var color rgb
        if topChanges[i].ChangeType == model.PropertyRemoved || topChanges[i].ChangeType == model.ObjectRemoved {
            var br = ""
            color = CYAN_RGB
            if topChanges[i].Breaking {
                br = "{X}"
                color = rgb{255, 0, 0}
            }

            msg = fmt.Sprintf(" - %s Removed %s", caser.String(topChanges[i].Property), br)

            //   val = topChanges[i].Original

        }
        if topChanges[i].ChangeType == model.PropertyAdded || topChanges[i].ChangeType == model.ObjectAdded {
            msg = fmt.Sprintf(" + %s Added", caser.String(topChanges[i].Property))
            color = CYAN_RGB
            //   val = topChanges[i].Original
        }

        if topChanges[i].ChangeType == model.Modified {
            msg = fmt.Sprintf(" %s Changed", caser.String(topChanges[i].Property))
            color = MAGENTA_RGB
        }

        node := tview.NewTreeNode(msg).
            SetReference(topChanges[i]).
            SetSelectable(true)

        node.SetColor(tcell.NewRGBColor(color.r(), color.g(), color.b()))

        root.AddChild(node)

    }

    //fmt.Println(topChanges, infoChanges)
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

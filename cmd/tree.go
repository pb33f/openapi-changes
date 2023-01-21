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

func buildConsoleTreeNode(list *[]pterm.LeveledListItem, object any, level int) {
    if object == nil {
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
                *list = append(*list, pterm.LeveledListItem{Level: level, Text: generateTreeState(topChanges[y])})
            }
            continue
        case reflect.TypeOf(&wcModel.Change{}):
            topChanges := field.Elem().Interface().(wcModel.PropertyChanges).Changes
            for y := range topChanges {
                *list = append(*list, pterm.LeveledListItem{Level: level, Text: generateTreeState(topChanges[y])})
            }
            continue
        case reflect.TypeOf(&wcModel.InfoChanges{}):
            DigIntoObject[wcModel.InfoChanges](list, field, level, upper.String(v3.InfoLabel))

        case reflect.TypeOf(&wcModel.ContactChanges{}):
            DigIntoObject[wcModel.ContactChanges](list, field, level, upper.String(v3.ContactLabel))

        case reflect.TypeOf(&wcModel.ItemsChanges{}):
            DigIntoObject[wcModel.ItemsChanges](list, field, level, upper.String(v3.ItemsLabel))

        case reflect.TypeOf(&wcModel.LicenseChanges{}):
            DigIntoObject[wcModel.LicenseChanges](list, field, level, upper.String(v3.LicenseLabel))

        case reflect.TypeOf(&wcModel.PathsChanges{}):
            DigIntoObject[wcModel.PathsChanges](list, field, level, upper.String(v3.PathsLabel))

        case reflect.TypeOf(&wcModel.OperationChanges{}):
            DigIntoObject[wcModel.OperationChanges](list, field, level, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")))

        case reflect.TypeOf(&wcModel.ServerChanges{}):
            DigIntoObject[wcModel.ServerChanges](list, field, level, upper.String(v3.ServerLabel))

        case reflect.TypeOf(&wcModel.ComponentsChanges{}):
            DigIntoObject[wcModel.ComponentsChanges](list, field, level, upper.String(v3.ComponentsLabel))

        case reflect.TypeOf(&wcModel.RequestBodyChanges{}):
            DigIntoObject[wcModel.RequestBodyChanges](list, field, level, upper.String(v3.RequestBodyLabel))

        case reflect.TypeOf([]*wcModel.TagChanges{}):
            BuildSliceTreeNode[wcModel.TagChanges](list, field, level, upper.String(v3.TagsLabel))

        case reflect.TypeOf([]*wcModel.SchemaChanges{}):
            BuildSliceTreeNode[wcModel.SchemaChanges](list, field, level, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")))

        case reflect.TypeOf([]*wcModel.ServerChanges{}):
            BuildSliceTreeNode[wcModel.ServerChanges](list, field, level, upper.String(v3.ServersLabel))

        case reflect.TypeOf([]*wcModel.SecurityRequirementChanges{}):
            BuildSliceTreeNode[wcModel.SecurityRequirementChanges](list, field, level, "Security Requirements")

        case reflect.TypeOf([]*wcModel.ParameterChanges{}):
            BuildSliceTreeNode[wcModel.ParameterChanges](list, field, level, upper.String(v3.ParametersLabel))

        case reflect.TypeOf(&wcModel.SchemaChanges{}):
            DigIntoObject[wcModel.SchemaChanges](list, field, level, upper.String(v3.SchemaLabel))

        case reflect.TypeOf(&wcModel.ExamplesChanges{}):
            DigIntoObject[wcModel.ExamplesChanges](list, field, level, upper.String(v3.ExamplesLabel))

        case reflect.TypeOf(&wcModel.ExtensionChanges{}):
            DigIntoObject[wcModel.ExtensionChanges](list, field, level, "Extensions")

        case reflect.TypeOf(&wcModel.ExternalDocChanges{}):
            DigIntoObject[wcModel.ExternalDocChanges](list, field, level, "External Docs")

        case reflect.TypeOf(&wcModel.XMLChanges{}):
            DigIntoObject[wcModel.XMLChanges](list, field, level, upper.String(v3.XMLLabel))

        case reflect.TypeOf(&wcModel.ScopesChanges{}):
            DigIntoObject[wcModel.ScopesChanges](list, field, level, upper.String(v3.Scopes))

        case reflect.TypeOf(&wcModel.OAuthFlowChanges{}):
            DigIntoObject[wcModel.OAuthFlowChanges](list, field, level, "oAuth Flow")

        case reflect.TypeOf(&wcModel.OAuthFlowsChanges{}):
            DigIntoObject[wcModel.OAuthFlowsChanges](list, field, level, "oAuth Flows")

        case reflect.TypeOf(&wcModel.DiscriminatorChanges{}):
            DigIntoObject[wcModel.DiscriminatorChanges](list, field, level, "Discriminator")

        case reflect.TypeOf(&wcModel.ResponsesChanges{}):
            DigIntoObject[wcModel.ResponsesChanges](list, field, level, upper.String(v3.ResponsesLabel))

        case reflect.TypeOf(map[string]*wcModel.PathItemChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.ResponseChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.SchemaChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.CallbackChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.ExampleChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.EncodingChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.HeaderChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.ServerVariableChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.MediaTypeChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.SecuritySchemeChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        case reflect.TypeOf(map[string]*wcModel.LinkChanges{}):
            if !field.IsZero() && len(field.MapKeys()) > 0 {
                BuildTreeMapNode(list, field, level)
            }

        }

    }
}

func generateTreeState(change *wcModel.Change) string {
    breaking := ""
    if change.Breaking {
        breaking = "❌"
    }
    switch change.ChangeType {
    case wcModel.Modified:
        return fmt.Sprintf(" ✏️%s %s (%d:%d)", breaking, change.Property, *change.Context.NewLine, *change.Context.NewColumn)
    case wcModel.ObjectAdded, wcModel.PropertyAdded:
        return fmt.Sprintf(" 🟩%s %s (%d:%d)", breaking, change.Property, *change.Context.NewLine, *change.Context.NewColumn)
    case wcModel.ObjectRemoved, wcModel.PropertyRemoved:
        return fmt.Sprintf(" 🟥%s %s (%d:%d)", breaking, change.Property, *change.Context.OriginalLine, *change.Context.OriginalColumn)

    }
    return "NO!"
}

func buildConsoleTree(doc *wcModel.DocumentChanges) {
    var ll []pterm.LeveledListItem

    buildConsoleTreeNode(&ll, doc, 0)

    // Generate tree from LeveledList.
    root := putils.TreeFromLeveledList(ll)

    // Render TreePrinter
    pterm.DefaultTree.WithRoot(root).Render()
}

func BuildSliceTreeNode[T any](list *[]pterm.LeveledListItem, field reflect.Value, level int, label string) {
    if !field.IsZero() {
        for k := 0; k < field.Len(); k++ {
            f := field.Index(k)
            ob := f.Elem().Interface().(T)
            *list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
            buildConsoleTreeNode(list, &ob, level+1)
        }
    }
}

func DigIntoObject[T any](list *[]pterm.LeveledListItem, field reflect.Value, level int, label string) {
    if !field.IsZero() {
        *list = append(*list, pterm.LeveledListItem{Level: level, Text: label})
        level++
        obj := field.Elem().Interface().(T)
        buildConsoleTreeNode(list, &obj, level)
    }
}

func BuildTreeMapNode(list *[]pterm.LeveledListItem, field reflect.Value, level int) {
    if !field.IsZero() {

        for _, e := range field.MapKeys() {
            v := field.MapIndex(e)
            switch t := v.Interface().(type) {
            default:
                *list = append(*list, pterm.LeveledListItem{Level: level, Text: fmt.Sprint(e)})
                buildConsoleTreeNode(list, t, level+1)
            }
        }
    }
}

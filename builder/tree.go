// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
    "fmt"
    v3 "github.com/pb33f/libopenapi/datamodel/low/v3"
    wcModel "github.com/pb33f/libopenapi/what-changed/model"
    "github.com/pb33f/libopenapi/what-changed/reports"
    "github.com/twinj/uuid"
    "golang.org/x/text/cases"
    "golang.org/x/text/language"
    "reflect"
    "strings"
)

var upper cases.Caser

func init() {
    upper = cases.Title(language.English)
}

type TreeNode struct {
    TitleString     string          `json:"titleString"`
    Title           string          `json:"title,omitempty"`
    Key             string          `json:"key"`
    IsLeaf          bool            `json:"isLeaf,omitempty"`
    Selectable      bool            `json:"selectable,omitempty"`
    TotalChanges    int             `json:"totalChanges,omitempty"`
    BreakingChanges int             `json:"breakingChanges,omitempty"`
    Change          *wcModel.Change `json:"change,omitempty"`
    Children        []*TreeNode     `json:"children,omitempty"`
}

func BuildTree(obj any) *TreeNode {

    n := &TreeNode{
        TitleString: "Document",
        Key:         "root",
        IsLeaf:      false,
        Selectable:  false,
    }
    exploreTreeObject(n, obj)
    return n
}

func exploreTreeObject(parent *TreeNode, object any) {

    v := reflect.ValueOf(object).Elem()
    num := v.NumField()
    for i := 0; i < num; i++ {
        fName := v.Type().Field(i).Name
        field := v.FieldByName(fName)
        if !field.IsZero() {
            switch field.Type() {
            case reflect.TypeOf(&wcModel.PropertyChanges{}):
                topChanges := field.Elem().Interface().(wcModel.PropertyChanges).Changes
                for x := range topChanges {
                    title := upper.String(topChanges[x].Property)
                    if strings.ToLower(topChanges[x].Property) == "codes" {
                        switch topChanges[x].ChangeType {
                        case wcModel.Modified, wcModel.PropertyRemoved, wcModel.ObjectRemoved:
                            title = topChanges[x].Original
                            break
                        case wcModel.ObjectAdded, wcModel.PropertyAdded:
                            title = topChanges[x].New
                        }
                    }

                    parent.Children = append(parent.Children, &TreeNode{
                        TitleString: title,
                        Key:         uuid.NewV4().String(),
                        Change:      topChanges[x],
                        IsLeaf:      true,
                        Selectable:  true,
                    })
                }
                continue
            case reflect.TypeOf(&wcModel.InfoChanges{}):
                m := field.Elem().Interface().(wcModel.InfoChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.InfoChanges](parent, field, upper.String(v3.InfoLabel), tc, br)

            case reflect.TypeOf(&wcModel.ContactChanges{}):
                m := field.Elem().Interface().(wcModel.ContactChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ContactChanges](parent, field, upper.String(v3.ContactLabel), tc, br)

            case reflect.TypeOf(&wcModel.ItemsChanges{}):
                m := field.Elem().Interface().(wcModel.ItemsChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ItemsChanges](parent, field, upper.String(v3.ItemsLabel), tc, br)

            case reflect.TypeOf(&wcModel.LicenseChanges{}):
                m := field.Elem().Interface().(wcModel.LicenseChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.LicenseChanges](parent, field, upper.String(v3.LicenseLabel), tc, br)

            case reflect.TypeOf(&wcModel.PathsChanges{}):
                m := field.Elem().Interface().(wcModel.PathsChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.PathsChanges](parent, field, upper.String(v3.PathsLabel), tc, br)

            case reflect.TypeOf(&wcModel.OperationChanges{}):
                m := field.Elem().Interface().(wcModel.OperationChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.OperationChanges](parent, field, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), tc, br)

            case reflect.TypeOf(&wcModel.ServerChanges{}):
                m := field.Elem().Interface().(wcModel.ServerChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ServerChanges](parent, field, upper.String(v3.ServerLabel), tc, br)

            case reflect.TypeOf(&wcModel.ComponentsChanges{}):
                m := field.Elem().Interface().(wcModel.ComponentsChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ComponentsChanges](parent, field, upper.String(v3.ComponentsLabel), tc, br)

            case reflect.TypeOf(&wcModel.RequestBodyChanges{}):
                m := field.Elem().Interface().(wcModel.RequestBodyChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.RequestBodyChanges](parent, field, upper.String(v3.RequestBodyLabel), tc, br)

            case reflect.TypeOf([]*wcModel.TagChanges{}):
                DigIntoTreeNodeSlice[wcModel.TagChanges](parent, field, upper.String(v3.TagsLabel))

            case reflect.TypeOf([]*wcModel.SchemaChanges{}):
                DigIntoTreeNodeSlice[wcModel.SchemaChanges](parent, field, strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")))

            case reflect.TypeOf([]*wcModel.ServerChanges{}):
                DigIntoTreeNodeSlice[wcModel.ServerChanges](parent, field, upper.String(v3.ServersLabel))

            case reflect.TypeOf([]*wcModel.SecurityRequirementChanges{}):
                DigIntoTreeNodeSlice[wcModel.SecurityRequirementChanges](parent, field, "Security Requirements")

            case reflect.TypeOf([]*wcModel.ParameterChanges{}):
                DigIntoTreeNodeSlice[wcModel.ParameterChanges](parent, field, upper.String(v3.ParametersLabel))

            case reflect.TypeOf(&wcModel.SchemaChanges{}):
                m := field.Elem().Interface().(wcModel.SchemaChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.SchemaChanges](parent, field, upper.String(v3.SchemaLabel), tc, br)

            case reflect.TypeOf(&wcModel.ExamplesChanges{}):
                m := field.Elem().Interface().(wcModel.ExamplesChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ExamplesChanges](parent, field, upper.String(v3.ExamplesLabel), tc, br)

            case reflect.TypeOf(&wcModel.ExtensionChanges{}):
                m := field.Elem().Interface().(wcModel.ExtensionChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ExtensionChanges](parent, field, "Extensions", tc, br)

            case reflect.TypeOf(&wcModel.ExternalDocChanges{}):
                m := field.Elem().Interface().(wcModel.ExternalDocChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ExternalDocChanges](parent, field, "External Docs", tc, br)

            case reflect.TypeOf(&wcModel.XMLChanges{}):
                m := field.Elem().Interface().(wcModel.XMLChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.XMLChanges](parent, field, upper.String(v3.XMLLabel), tc, br)

            case reflect.TypeOf(&wcModel.ScopesChanges{}):
                m := field.Elem().Interface().(wcModel.ScopesChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ScopesChanges](parent, field, upper.String(v3.Scopes), tc, br)

            case reflect.TypeOf(&wcModel.OAuthFlowChanges{}):
                m := field.Elem().Interface().(wcModel.OAuthFlowChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.OAuthFlowChanges](parent, field, "oAuth Flow", tc, br)

            case reflect.TypeOf(&wcModel.OAuthFlowsChanges{}):
                m := field.Elem().Interface().(wcModel.OAuthFlowsChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.OAuthFlowsChanges](parent, field, "oAuth Flows", tc, br)

            case reflect.TypeOf(&wcModel.DiscriminatorChanges{}):
                m := field.Elem().Interface().(wcModel.SchemaChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.DiscriminatorChanges](parent, field, "Discriminator", tc, br)

            case reflect.TypeOf(&wcModel.ResponsesChanges{}):
                m := field.Elem().Interface().(wcModel.ResponsesChanges)
                k := &m
                tc, br := extractChangeCount(k)
                DigIntoTreeNode[wcModel.ResponsesChanges](parent, field, upper.String(v3.ResponsesLabel), tc, br)

            case reflect.TypeOf(map[string]*wcModel.PathItemChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.ResponseChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.SchemaChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.CallbackChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.ExampleChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.EncodingChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.HeaderChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.ServerVariableChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.MediaTypeChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.SecuritySchemeChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }

            case reflect.TypeOf(map[string]*wcModel.LinkChanges{}):
                if !field.IsZero() && len(field.MapKeys()) > 0 {
                    BuildTreeMapNode(parent, field)
                }
            }
        }
    }
}

func extractChangeCount(change reports.HasChanges) (int, int) {
    return change.TotalChanges(), change.TotalBreakingChanges()
}

func DigIntoTreeNode[T any](parent *TreeNode, field reflect.Value, label string, tc, br int) {
    if !field.IsZero() {
        if strings.ToLower(label) == "codes" {
            fmt.Sprint("codes")
        }
        e := &TreeNode{
            TitleString:     label,
            Key:             uuid.NewV4().String(),
            IsLeaf:          false,
            Selectable:      false,
            TotalChanges:    tc,
            BreakingChanges: br,
        }
        parent.Children = append(parent.Children, e)
        obj := field.Elem().Interface().(T)
        exploreTreeObject(e, &obj)
    }
}

func DigIntoTreeNodeSlice[T any](parent *TreeNode, field reflect.Value, label string) {
    if !field.IsZero() {
        for k := 0; k < field.Len(); k++ {
            f := field.Index(k)
            if strings.ToLower(label) == "codes" {
                fmt.Sprint("codes")
            }
            e := &TreeNode{
                TitleString: label,
                Key:         uuid.NewV4().String(),
                IsLeaf:      false,
                Selectable:  true,
            }
            obj := f.Elem().Interface().(T)
            ch, br := countChanges(obj)
            if ch > -1 {
                e.TotalChanges = ch
            }
            if br > -1 {
                e.BreakingChanges = br
            }
            parent.Children = append(parent.Children, e)
            exploreTreeObject(e, &obj)
        }
    }
}

func BuildTreeMapNode(parent *TreeNode, field reflect.Value) {
    if !field.IsZero() {
        for _, e := range field.MapKeys() {
            v := field.MapIndex(e)
            switch t := v.Interface().(type) {
            default:
                if strings.ToLower(e.String()) == "codes" {
                    fmt.Sprint("codes")
                }
                tn := &TreeNode{
                    TitleString: e.String(),
                    Key:         uuid.NewV4().String(),
                    IsLeaf:      false,
                    Selectable:  true,
                }
                ch, br := countChanges(t)
                if ch > -1 {
                    tn.TotalChanges = ch
                }
                if br > -1 {
                    tn.BreakingChanges = br
                }
                parent.Children = append(parent.Children, tn)
                exploreTreeObject(tn, t)
            }
        }
    }
}

func countChanges(i any) (int, int) {
    if ch, ok := i.(reports.HasChanges); ok {
        return ch.TotalChanges(), ch.TotalBreakingChanges()
    }
    return -1, -1

}
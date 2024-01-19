// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package builder

import (
	"fmt"
	v3 "github.com/pb33f/libopenapi/datamodel/low/v3"
	wcModel "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"github.com/twinj/uuid"
	"reflect"
	"strings"
)

const DefaultHeight = 25
const LeafHeight = 45
const DefaultWidth = 150
const MaxWidth = 250
const TextLimit = 20
const TextSizeBumpIncrement = 5
const TextWidthSizeBumpIncrement = 10

func BuildGraph(obj any) ([]*model.NodeData[any], []*model.EdgeData[any]) {

	var nodes []*model.NodeData[any]
	var edges []*model.EdgeData[any]
	initHeight := DefaultHeight

	n := &model.NodeData[any]{
		Id:     "root",
		Text:   "Document",
		Height: &initHeight,
	}

	nodes = append(nodes, n)
	exploreGraphObject(n, obj, &nodes, &edges)

	return nodes, edges
}

func exploreGraphObject(parent *model.NodeData[any], object any, nodes *[]*model.NodeData[any],
	edges *[]*model.EdgeData[any]) {

	v := reflect.ValueOf(object).Elem()
	if v.IsValid() && !v.IsZero() {
		num := v.NumField()

		for i := 0; i < num; i++ {
			height := LeafHeight
			width := DefaultWidth
			fName := v.Type().Field(i).Name
			field := v.FieldByName(fName)
			if !field.IsZero() {
				switch field.Type() {
				case reflect.TypeOf(&wcModel.PropertyChanges{}):

					topChanges := field.Elem().Interface().(wcModel.PropertyChanges).Changes

					for x := range topChanges {
						newWidth := calcWidth(topChanges[x].New)
						origWidth := calcWidth(topChanges[x].Original)
						if (newWidth > origWidth) && (newWidth > width) {
							width = newWidth
						}
						if (newWidth < origWidth) && (origWidth > width) {
							width = origWidth
						}
						if width > MaxWidth {
							width = MaxWidth // time to truncate, this is too wide.
						}

						// shrink if there are no values to show
						if topChanges[x].New == "" && topChanges[x].Original == "" {
							height = DefaultHeight + 2 // add a little extra because borders are thick.
						}

						n := buildNode(topChanges[x].Property, width, height, topChanges[x])
						if parent != nil {
							e := &model.EdgeData[any]{
								Id:   fmt.Sprintf("%s-to-%s", parent.Id, n.Id),
								From: parent.Id,
								To:   n.Id,
							}
							*edges = append(*edges, e)
						}
						*nodes = append(*nodes, n)
					}
					continue

				case reflect.TypeOf(&wcModel.InfoChanges{}):
					DigIntoObject[wcModel.InfoChanges](parent, field, nodes, upper.String(v3.InfoLabel), edges)

				case reflect.TypeOf(&wcModel.ContactChanges{}):
					DigIntoObject[wcModel.ContactChanges](parent, field, nodes, upper.String(v3.ContactLabel), edges)

				case reflect.TypeOf(&wcModel.ItemsChanges{}):
					DigIntoObject[wcModel.ItemsChanges](parent, field, nodes, upper.String(v3.ItemsLabel), edges)

				case reflect.TypeOf(&wcModel.LicenseChanges{}):
					DigIntoObject[wcModel.LicenseChanges](parent, field, nodes, upper.String(v3.LicenseLabel), edges)

				case reflect.TypeOf(&wcModel.PathsChanges{}):
					DigIntoObject[wcModel.PathsChanges](parent, field, nodes, upper.String(v3.PathsLabel), edges)

				case reflect.TypeOf(&wcModel.OperationChanges{}):
					DigIntoObject[wcModel.OperationChanges](parent, field, nodes,
						strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), edges)

				case reflect.TypeOf(&wcModel.ServerChanges{}):
					DigIntoObject[wcModel.ServerChanges](parent, field, nodes, upper.String(v3.ServerLabel), edges)

				case reflect.TypeOf(&wcModel.ComponentsChanges{}):
					DigIntoObject[wcModel.ComponentsChanges](parent, field, nodes, upper.String(v3.ComponentsLabel), edges)

				case reflect.TypeOf(&wcModel.RequestBodyChanges{}):
					DigIntoObject[wcModel.RequestBodyChanges](parent, field, nodes, upper.String(v3.RequestBodyLabel), edges)

				case reflect.TypeOf([]*wcModel.TagChanges{}):
					BuildSliceGraphNode[wcModel.TagChanges](parent, field, nodes, upper.String(v3.TagsLabel), edges)

				case reflect.TypeOf([]*wcModel.SchemaChanges{}):
					BuildSliceGraphNode[wcModel.SchemaChanges](parent, field, nodes,
						strings.ToUpper(strings.ReplaceAll(fName, "Changes", "")), edges)

				case reflect.TypeOf([]*wcModel.ServerChanges{}):
					BuildSliceGraphNode[wcModel.ServerChanges](parent, field, nodes, upper.String(v3.ServersLabel), edges)

				case reflect.TypeOf([]*wcModel.SecurityRequirementChanges{}):
					BuildSliceGraphNode[wcModel.SecurityRequirementChanges](parent, field, nodes,
						"Security Requirements", edges)

				case reflect.TypeOf([]*wcModel.ParameterChanges{}):
					BuildSliceGraphNode[wcModel.ParameterChanges](parent, field, nodes,
						upper.String(v3.ParametersLabel), edges)

				case reflect.TypeOf(&wcModel.SchemaChanges{}):
					DigIntoObject[wcModel.SchemaChanges](parent, field, nodes, upper.String(v3.SchemaLabel), edges)

				case reflect.TypeOf(&wcModel.ExamplesChanges{}):
					DigIntoObject[wcModel.ExamplesChanges](parent, field, nodes, upper.String(v3.ExamplesLabel), edges)

				case reflect.TypeOf(&wcModel.ExtensionChanges{}):
					DigIntoObject[wcModel.ExtensionChanges](parent, field, nodes, "Extensions", edges)

				case reflect.TypeOf(&wcModel.ExternalDocChanges{}):
					DigIntoObject[wcModel.ExternalDocChanges](parent, field, nodes, "External Docs", edges)

				case reflect.TypeOf(&wcModel.XMLChanges{}):
					DigIntoObject[wcModel.XMLChanges](parent, field, nodes, upper.String(v3.XMLLabel), edges)

				case reflect.TypeOf(&wcModel.ScopesChanges{}):
					DigIntoObject[wcModel.ScopesChanges](parent, field, nodes, upper.String(v3.Scopes), edges)

				case reflect.TypeOf(&wcModel.OAuthFlowChanges{}):
					DigIntoObject[wcModel.OAuthFlowChanges](parent, field, nodes, "oAuth Flow", edges)

				case reflect.TypeOf(&wcModel.OAuthFlowsChanges{}):
					DigIntoObject[wcModel.OAuthFlowsChanges](parent, field, nodes, "oAuth Flows", edges)

				case reflect.TypeOf(&wcModel.DiscriminatorChanges{}):
					DigIntoObject[wcModel.DiscriminatorChanges](parent, field, nodes, "Discriminator", edges)

				case reflect.TypeOf(&wcModel.ResponsesChanges{}):
					DigIntoObject[wcModel.ResponsesChanges](parent, field, nodes, upper.String(v3.ResponsesLabel), edges)

				case reflect.TypeOf(map[string]*wcModel.PathItemChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.ResponseChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.SchemaChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.CallbackChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.ExampleChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.EncodingChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.HeaderChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.ServerVariableChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.MediaTypeChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.SecuritySchemeChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				case reflect.TypeOf(map[string]*wcModel.LinkChanges{}):
					if !field.IsZero() && len(field.MapKeys()) > 0 {
						BuildGraphMapNode(parent, field, nodes, edges)
					}

				}

			}
		}
	}
}

func buildId(label string) string {
	return fmt.Sprintf("%s-%s", strings.ToLower(label), uuid.NewV4().String()[:6])
}

func calcWidth(label string) int {
	l := DefaultWidth
	if len(label) > TextLimit {
		num := len(label[TextLimit-1:])
		l += TextWidthSizeBumpIncrement * num
	}
	return l
}

func buildNode(text string, width, height int, data any) *model.NodeData[any] {
	if len(text) > TextLimit {
		num := len(text[TextLimit:])
		width += TextSizeBumpIncrement * num
	}
	d := &model.NodeData[any]{
		Id:     buildId(text),
		Text:   text,
		Width:  &width,
		Height: &height,
	}
	if data != nil {
		d.Data = data
	}
	return d
}

func disableNode(node *model.NodeData[any]) {
	d := true
	node.Disabled = &d
}

func DigIntoObject[T any](parent *model.NodeData[any], field reflect.Value, nodes *[]*model.NodeData[any],
	label string, edges *[]*model.EdgeData[any]) {

	if !field.IsZero() {
		lowerLabel := strings.ToLower(label)
		n := buildNode(lowerLabel, calcWidth(lowerLabel), DefaultHeight, nil)
		if parent != nil {
			e := &model.EdgeData[any]{
				Id:   fmt.Sprintf("%s-to-%s", parent.Id, n.Id),
				From: parent.Id,
				To:   n.Id,
			}
			*edges = append(*edges, e)
		}
		disableNode(n)
		*nodes = append(*nodes, n)

		obj := field.Elem().Interface().(T)
		exploreGraphObject(n, &obj, nodes, edges)
	}
}

func BuildSliceGraphNode[T any](parent *model.NodeData[any], field reflect.Value, nodes *[]*model.NodeData[any],
	label string, edges *[]*model.EdgeData[any]) {

	if !field.IsZero() {
		for k := 0; k < field.Len(); k++ {
			f := field.Index(k)
			lowerLabel := strings.ToLower(label)
			n := buildNode(lowerLabel, calcWidth(lowerLabel), DefaultHeight, nil)
			if parent != nil {
				e := &model.EdgeData[any]{
					Id:   fmt.Sprintf("%s-to-%s", parent.Id, n.Id),
					From: parent.Id,
					To:   n.Id,
				}
				*edges = append(*edges, e)
			}
			disableNode(n)
			*nodes = append(*nodes, n)
			obj := f.Elem().Interface().(T)
			exploreGraphObject(n, &obj, nodes, edges)
		}
	}
}

func BuildGraphMapNode(parent *model.NodeData[any], field reflect.Value, nodes *[]*model.NodeData[any],
	edges *[]*model.EdgeData[any]) {

	if !field.IsZero() {
		for _, e := range field.MapKeys() {
			v := field.MapIndex(e)
			switch t := v.Interface().(type) {
			default:
				lowerLabel := strings.ToLower(e.String())
				n := buildNode(lowerLabel, calcWidth(lowerLabel), DefaultHeight, nil)
				if parent != nil {
					ed := &model.EdgeData[any]{
						Id:   fmt.Sprintf("%s-to-%s", parent.Id, n.Id),
						From: parent.Id,
						To:   n.Id,
					}
					*edges = append(*edges, ed)
				}
				disableNode(n)
				*nodes = append(*nodes, n)
				exploreGraphObject(n, t, nodes, edges)
			}
		}
	}
}

// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package model

type GraphResult struct {
	Nodes []*NodeData[any] `json:"nodes"`
	Edges []*EdgeData[any] `json:"edges"`
}

type CanvasDirection string
type CanvasPosition string
type PortSide string

type NodeData[T any] struct {
	Id                string      `json:"id,omitempty"`
	Disabled          *bool       `json:"disabled,omitempty"`
	Text              any         `json:"text,omitempty"`
	Height            *int        `json:"height,omitempty"`
	Width             *int        `json:"width,omitempty"`
	Parent            string      `json:"parent,omitempty"`
	Ports             []*PortData `json:"ports,omitempty"`
	Icon              *IconData   `json:"icon,omitempty"`
	NodePadding       []int       `json:"nodePadding,omitempty"`
	Data              T           `json:"data,omitempty"`
	ClassName         string      `json:"className,omitempty"`
	LayoutOptions     any         `json:"layoutOptions,omitempty"`
	SelectionDisabled *bool       `json:"selectionDisabled,omitempty"`
}

type IconData struct {
	Url    string `json:"url,omitempty"`
	Height *int   `json:"height,omitempty"`
	Width  *int   `json:"width,omitempty"`
}

type PortData struct {
	Id        string         `json:"id,omitempty"`
	Height    *int           `json:"height,omitempty"`
	Width     *int           `json:"weight,omitempty"`
	Hidden    bool           `json:"hidden,omitempty"`
	ClassName string         `json:"className,omitempty"`
	Alignment CanvasPosition `json:"alignment,omitempty"`
	Side      PortSide       `json:"side,omitempty"`
}

type EdgeData[T any] struct {
	Id                 string `json:"id,omitempty"`
	Disabled           *bool  `json:"disabled,omitempty"`
	Text               string `json:"text,omitempty"`
	From               string `json:"from,omitempty"`
	To                 string `json:"to,omitempty"`
	FromPort           string `json:"fromPort,omitempty"`
	ToPort             string `json:"toPort,omitempty"`
	Data               T      `json:"data,omitempty"`
	ClassName          string `json:"className,omitempty"`
	ContainerClassName string `json:"containerClassName,omitempty"`
	ArrowHeadType      any    `json:"arrowHeadType,omitempty"`
	Parent             string `json:"parent,omitempty"`
	SelectionDisabled  string `json:"selectionDisabled,omitempty"`
}

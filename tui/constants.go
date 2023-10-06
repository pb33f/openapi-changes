// Copyright 2022 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

package tui

import "github.com/gdamore/tcell/v2"

type ColorType int
type ViewType int

type RGB []int32

func (r RGB) R() int32 {
	return r[0]
}
func (r RGB) G() int32 {
	return r[1]
}
func (r RGB) B() int32 {
	return r[2]
}

var CYAN_RGB = RGB{103, 234, 249}
var MAGENTA_RGB = RGB{234, 103, 249}
var CYAN_CELL_COLOR = tcell.NewRGBColor(CYAN_RGB.R(), CYAN_RGB.G(), CYAN_RGB.B())
var MAGENTA_CELL_COLOR = tcell.NewRGBColor(MAGENTA_RGB.R(), MAGENTA_RGB.G(), MAGENTA_RGB.B())

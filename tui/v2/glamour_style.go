// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"image/color"
	"strings"

	"github.com/charmbracelet/glamour"
	"github.com/charmbracelet/glamour/ansi"
	"github.com/muesli/termenv"
	"github.com/pb33f/doctor/terminal"
)

func strPtr(s string) *string { return &s }
func boolPtr(b bool) *bool    { return &b }
func uintPtr(u uint) *uint    { return &u }

func colorPtr(c color.Color) *string {
	if c == nil {
		return nil
	}
	r, g, b, _ := c.RGBA()
	return strPtr(fmt.Sprintf("#%02x%02x%02x", uint8(r>>8), uint8(g>>8), uint8(b>>8)))
}

// createPb33fReportStyle creates a glamour ansi.StyleConfig matching vacuum's
// CreatePb33fDocsStyle. Adapted for the report modal context.
func createPb33fReportStyle(contentWidth int, palette terminal.Palette) ansi.StyleConfig {
	truePointer := boolPtr(true)
	falsePointer := boolPtr(false)

	primary := colorPtr(palette.Primary)
	secondary := colorPtr(palette.Secondary)
	addition := colorPtr(palette.Addition)
	modification := colorPtr(palette.Modification)
	muted := colorPtr(palette.Muted)
	detail := colorPtr(palette.Detail)
	primaryBG := colorPtr(palette.PrimaryBG)
	secondaryBG := colorPtr(palette.SecondaryBG)
	subtleBG := colorPtr(palette.SubtleBG)

	sectionHeader := ansi.StyleBlock{
		StylePrimitive: ansi.StylePrimitive{
			BlockPrefix:     "\n",
			BackgroundColor: primaryBG,
			Prefix:          fmt.Sprintf("%s\n \u2605 ", strings.Repeat("\u2500", contentWidth)),
			Suffix:          fmt.Sprintf("\n%s\n", strings.Repeat("\u2500", contentWidth)),
			Color:           primary,
			Bold:            truePointer,
		},
	}

	return ansi.StyleConfig{
		Document: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{},
		},
		H1: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				BlockPrefix: "\n",
				BlockSuffix: "\n",
				Color:       secondary,
				Bold:        truePointer,
			},
		},
		H2: sectionHeader,
		H3: sectionHeader,
		H4: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: primary,
				Bold:  truePointer,
			},
		},
		H5: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: secondary,
			},
		},
		H6: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: secondary,
			},
		},
		Emph: ansi.StylePrimitive{
			Color:  detail,
			Italic: truePointer,
		},
		Strong: ansi.StylePrimitive{
			BackgroundColor: secondaryBG,
			Bold:            truePointer,
		},
		Code: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Prefix:          "[",
				Suffix:          "]",
				Bold:            truePointer,
				Color:           addition,
				BackgroundColor: subtleBG,
			},
		},
		CodeBlock: ansi.StyleCodeBlock{
			StyleBlock: ansi.StyleBlock{
				StylePrimitive: ansi.StylePrimitive{
					BackgroundColor: secondaryBG,
					Color:           detail,
				},
				Margin: uintPtr(1),
			},
			Theme: "monokai",
			Chroma: &ansi.Chroma{
				Keyword: ansi.StylePrimitive{
					Color: primary,
					Bold:  falsePointer,
				},
				Text: ansi.StylePrimitive{
					Color: secondary,
					Bold:  truePointer,
				},
				LiteralString: ansi.StylePrimitive{
					Color: addition,
				},
				LiteralNumber: ansi.StylePrimitive{
					Color: secondary,
				},
				Comment: ansi.StylePrimitive{
					Color:  muted,
					Italic: truePointer,
				},
				NameFunction: ansi.StylePrimitive{
					Color: addition,
				},
				NameTag: ansi.StylePrimitive{
					Color: primary,
					Bold:  falsePointer,
				},
				NameAttribute: ansi.StylePrimitive{
					Color: addition,
				},
				Operator: ansi.StylePrimitive{
					Color: modification,
				},
				Punctuation: ansi.StylePrimitive{
					Color: muted,
				},
				NameBuiltin: ansi.StylePrimitive{
					Color: primary,
				},
				NameClass: ansi.StylePrimitive{
					Color: addition,
					Bold:  truePointer,
				},
				NameConstant: ansi.StylePrimitive{
					Color: secondary,
				},
			},
		},
		Link: ansi.StylePrimitive{
			Color:     primary,
			Underline: truePointer,
		},
		LinkText: ansi.StylePrimitive{
			Color:  primary,
			Prefix: "[",
			Suffix: "]",
			Bold:   truePointer,
		},
		List: ansi.StyleList{
			StyleBlock: ansi.StyleBlock{
				StylePrimitive: ansi.StylePrimitive{
					Color: primary,
				},
				Indent: uintPtr(2),
			},
			LevelIndent: 2,
		},
		Item: ansi.StylePrimitive{
			Prefix: "> ",
			Color:  primary,
		},
		Enumeration: ansi.StylePrimitive{
			Color: primary,
		},
		BlockQuote: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color:  muted,
				Italic: truePointer,
			},
			Indent:      uintPtr(1),
			IndentToken: strPtr("\u2502 "),
		},
		HorizontalRule: ansi.StylePrimitive{
			Color:  muted,
			Format: fmt.Sprintf("\n%s\n", strings.Repeat("-", contentWidth)),
		},
		Table: ansi.StyleTable{
			StyleBlock: ansi.StyleBlock{
				StylePrimitive: ansi.StylePrimitive{},
			},
			CenterSeparator: strPtr("\u253c"),
			ColumnSeparator: strPtr("\u2502"),
			RowSeparator:    strPtr("\u2500"),
		},
		Strikethrough: ansi.StylePrimitive{
			CrossedOut: truePointer,
			Color:      muted,
		},
		Task: ansi.StyleTask{
			StylePrimitive: ansi.StylePrimitive{},
			Ticked:         "\u2713 ",
			Unticked:       "\u2610 ",
		},
		Paragraph: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{},
			Margin:         uintPtr(1),
		},
		DefinitionTerm: ansi.StylePrimitive{
			Color: primary,
			Bold:  truePointer,
		},
		DefinitionDescription: ansi.StylePrimitive{
			Color: detail,
		},
	}
}

// renderMarkdown renders markdown content using glamour with the pb33f style.
// Falls back to raw markdown on error.
func renderMarkdown(markdown string, contentWidth int, palette terminal.Palette) string {
	style := createPb33fReportStyle(contentWidth, palette)

	renderer, err := glamour.NewTermRenderer(
		glamour.WithStyles(style),
		glamour.WithWordWrap(contentWidth),
		glamour.WithColorProfile(termenv.TrueColor),
	)
	if err != nil {
		return markdown
	}

	rendered, err := renderer.Render(markdown)
	if err != nil {
		return markdown
	}
	return rendered
}

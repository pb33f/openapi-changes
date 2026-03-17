// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package v2

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/glamour"
	"github.com/charmbracelet/glamour/ansi"
	"github.com/muesli/termenv"
)

// glamour/chroma color constants matching vacuum's palette.
// Kept unexported — these are library-specific values that don't belong in doctor/terminal.
var (
	glamourBlue      = strPtr("45")
	glamourSoftBlue  = strPtr("117")
	glamourBlueBg    = strPtr("#002329")
	glamourPink      = strPtr("201")
	glamourPinkBg    = strPtr("#2a1a2a")
	glamourGreen     = strPtr("46")
	glamourGrey      = strPtr("246")
	glamourDarkGrey  = strPtr("236")
	glamourLightGrey = strPtr("253")

	chromaBlue      = strPtr("#00d7ff")
	chromaPink      = strPtr("#ff5fff")
	chromaYellow    = strPtr("#ffd700")
	chromaGreen     = strPtr("#00ff00")
	chromaGrey      = strPtr("#8a8a8a")
	chromaLightPink = strPtr("#d75fd7")
)

func strPtr(s string) *string  { return &s }
func boolPtr(b bool) *bool     { return &b }
func uintPtr(u uint) *uint     { return &u }

// createPb33fReportStyle creates a glamour ansi.StyleConfig matching vacuum's
// CreatePb33fDocsStyle. Adapted for the report modal context.
func createPb33fReportStyle(contentWidth int) ansi.StyleConfig {
	truePointer := boolPtr(true)
	falsePointer := boolPtr(false)

	sectionHeader := ansi.StyleBlock{
		StylePrimitive: ansi.StylePrimitive{
			BlockPrefix:     "\n",
			BackgroundColor: glamourBlueBg,
			Prefix:          fmt.Sprintf("%s\n \u2605 ", strings.Repeat("\u2500", contentWidth)),
			Suffix:          fmt.Sprintf("\n%s\n", strings.Repeat("\u2500", contentWidth)),
			Color:           glamourBlue,
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
				Color:       glamourPink,
				Bold:        truePointer,
			},
		},
		H2: sectionHeader,
		H3: sectionHeader,
		H4: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: glamourBlue,
				Bold:  truePointer,
			},
		},
		H5: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: glamourPink,
			},
		},
		H6: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color: glamourPink,
			},
		},
		Emph: ansi.StylePrimitive{
			Color:  glamourPink,
			Italic: truePointer,
		},
		Strong: ansi.StylePrimitive{
			Color:           glamourPink,
			BackgroundColor: glamourPinkBg,
			Bold:            truePointer,
			Underline:       truePointer,
		},
		Code: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Prefix:          "[",
				Suffix:          "]",
				Bold:            truePointer,
				Color:           glamourGreen,
				BackgroundColor: glamourDarkGrey,
			},
		},
		CodeBlock: ansi.StyleCodeBlock{
			StyleBlock: ansi.StyleBlock{
				StylePrimitive: ansi.StylePrimitive{
					BackgroundColor: glamourPinkBg,
					Color:           glamourLightGrey,
				},
				Margin: uintPtr(1),
			},
			Theme: "monokai",
			Chroma: &ansi.Chroma{
				Keyword: ansi.StylePrimitive{
					Color: chromaBlue,
					Bold:  falsePointer,
				},
				Text: ansi.StylePrimitive{
					Color: chromaPink,
					Bold:  truePointer,
				},
				LiteralString: ansi.StylePrimitive{
					Color: chromaGreen,
				},
				LiteralNumber: ansi.StylePrimitive{
					Color: chromaPink,
				},
				Comment: ansi.StylePrimitive{
					Color:  chromaGrey,
					Italic: truePointer,
				},
				NameFunction: ansi.StylePrimitive{
					Color: chromaGreen,
				},
				NameTag: ansi.StylePrimitive{
					Color: chromaBlue,
					Bold:  falsePointer,
				},
				NameAttribute: ansi.StylePrimitive{
					Color: chromaGreen,
				},
				Operator: ansi.StylePrimitive{
					Color: chromaYellow,
				},
				Punctuation: ansi.StylePrimitive{
					Color: chromaGrey,
				},
				NameBuiltin: ansi.StylePrimitive{
					Color: chromaBlue,
				},
				NameClass: ansi.StylePrimitive{
					Color: chromaGreen,
					Bold:  truePointer,
				},
				NameConstant: ansi.StylePrimitive{
					Color: chromaLightPink,
				},
			},
		},
		Link: ansi.StylePrimitive{
			Color:     glamourSoftBlue,
			Underline: truePointer,
		},
		LinkText: ansi.StylePrimitive{
			Color:  glamourBlue,
			Prefix: "[",
			Suffix: "]",
			Bold:   truePointer,
		},
		List: ansi.StyleList{
			StyleBlock: ansi.StyleBlock{
				StylePrimitive: ansi.StylePrimitive{
					Color: glamourPink,
				},
				Indent: uintPtr(2),
			},
			LevelIndent: 2,
		},
		Item: ansi.StylePrimitive{
			Prefix: "> ",
			Color:  glamourBlue,
		},
		Enumeration: ansi.StylePrimitive{
			Color: glamourBlue,
		},
		BlockQuote: ansi.StyleBlock{
			StylePrimitive: ansi.StylePrimitive{
				Color:  glamourGrey,
				Italic: truePointer,
			},
			Indent:      uintPtr(1),
			IndentToken: strPtr("\u2502 "),
		},
		HorizontalRule: ansi.StylePrimitive{
			Color:  glamourPink,
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
			Color:      glamourGrey,
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
			Color: glamourPink,
			Bold:  truePointer,
		},
		DefinitionDescription: ansi.StylePrimitive{
			Color: glamourLightGrey,
		},
	}
}

// renderMarkdown renders markdown content using glamour with the pb33f style.
// Falls back to raw markdown on error.
func renderMarkdown(markdown string, contentWidth int) string {
	style := createPb33fReportStyle(contentWidth)

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

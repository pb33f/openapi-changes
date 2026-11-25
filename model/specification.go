package model

import (
	"errors"
	"fmt"
	"path/filepath"
	"strings"

	"github.com/pb33f/libasyncapi"
	"github.com/pb33f/libopenapi"
	"github.com/pb33f/libopenapi/datamodel"
	"github.com/pb33f/libopenapi/jsonschema"
)

// ComparisonSpecification identifies the native format and versions of both inputs.
type ComparisonSpecification struct {
	Kind            string `json:"kind"`
	OriginalVersion string `json:"originalVersion"`
	ModifiedVersion string `json:"modifiedVersion"`
}

// SetSpecification records format metadata without retaining parsed models.
func (c *Commit) SetSpecification() {
	if c.SchemaDocument != nil {
		c.Specification = &ComparisonSpecification{Kind: "jsonschema", ModifiedVersion: jsonschema.Dialect}
		if c.OldSchemaDocument != nil {
			c.Specification.OriginalVersion = jsonschema.Dialect
		}
	} else if c.AsyncDocument != nil {
		c.Specification = &ComparisonSpecification{Kind: "asyncapi", ModifiedVersion: c.AsyncDocument.GetVersion()}
		if c.OldAsyncDocument != nil {
			c.Specification.OriginalVersion = c.OldAsyncDocument.GetVersion()
		}
	} else if c.Document != nil {
		c.Specification = &ComparisonSpecification{Kind: "openapi", ModifiedVersion: c.Document.GetSpecInfo().Version}
		if c.OldDocument != nil {
			c.Specification.OriginalVersion = c.OldDocument.GetSpecInfo().Version
		}
	}
}

// APILabel returns the human-facing native format name.
func (c *Commit) APILabel() string {
	if c != nil && c.Specification != nil && c.Specification.Kind == "jsonschema" {
		return "JSON Schema"
	}
	if c != nil && c.Specification != nil && c.Specification.Kind == "asyncapi" {
		return "AsyncAPI"
	}
	return "OpenAPI"
}

// ParseSpecification parses once and selects the native model by its root version field.
func ParseSpecification(data []byte, config *datamodel.DocumentConfiguration) (libopenapi.Document, libasyncapi.Document, error) {
	doc, err := libopenapi.NewDocumentWithConfiguration(data, config)
	if err != nil {
		return nil, nil, err
	}
	info := doc.GetSpecInfo()
	fields := 0
	if info.RootNode != nil && len(info.RootNode.Content) > 0 {
		root := info.RootNode.Content[0]
		for i := 0; i+1 < len(root.Content); i += 2 {
			switch root.Content[i].Value {
			case "$schema":
				if strings.TrimSuffix(root.Content[i+1].Value, "#") == jsonschema.Dialect {
					doc.Release()
					return nil, nil, fmt.Errorf("conflicting JSON Schema and API version markers")
				}
			case "openapi", "swagger", "asyncapi":
				fields++
			}
		}
	}
	if fields != 1 {
		doc.Release()
		return nil, nil, fmt.Errorf("expected one specification version field")
	}
	if info.SpecType != "asyncapi" {
		return doc, nil, nil
	}
	defer doc.Release()
	if !strings.HasPrefix(info.Version, "3.") {
		return nil, nil, fmt.Errorf("AsyncAPI %s is unsupported; expected 3.x", info.Version)
	}
	ac := libasyncapi.NewDocumentConfiguration()
	if config != nil {
		ac.SpecFilePath = config.SpecFilePath
		ac.BasePath = config.BasePath
		ac.BaseURL = config.BaseURL
		ac.AllowFileReferences = config.AllowFileReferences
		ac.AllowRemoteReferences = config.AllowRemoteReferences
		ac.ExcludeExtensionRefs = config.ExcludeExtensionRefs
		ac.LocalFS = config.LocalFS
		ac.RemoteURLHandler = config.RemoteURLHandler
		ac.Logger = config.Logger
	}
	async, err := libasyncapi.NewDocumentFromNode(info.RootNode, ac)
	if err != nil {
		return nil, nil, err
	}
	if async.IsPartial() {
		err = fmt.Errorf("incomplete AsyncAPI document: %w", errors.Join(async.Errors()...))
		releaseParsed(nil, async)
		return nil, nil, err
	}
	return nil, async, nil
}

// Comparable reports whether both sides of a commit contain the same native format.
func (c *Commit) Comparable() bool {
	return c != nil && ((c.SchemaDocument != nil && c.OldSchemaDocument != nil) || (c.Source != nil && len(c.OldData) > 0) || (c.Document != nil && c.OldDocument != nil) || (c.AsyncDocument != nil && c.OldAsyncDocument != nil))
}

// ParsedSpecification holds the native model for one input.
type ParsedSpecification struct {
	OpenAPI  libopenapi.Document
	AsyncAPI libasyncapi.Document
	Schema   *jsonschema.Document
}

// SchemaInputOptions controls standalone schema selection and explicit local reference resolution.
type SchemaInputOptions struct {
	Explicit bool
	BasePath string
}

// ParseInput selects the native engine. Explicit schema mode also accepts unmarked roots.
func ParseInput(data []byte, source string, config *datamodel.DocumentConfiguration, schema SchemaInputOptions) (ParsedSpecification, error) {
	if !schema.Explicit {
		api, async, err := ParseSpecification(data, config)
		if !errors.Is(err, datamodel.ErrUnsupportedSpecType) {
			return ParsedSpecification{OpenAPI: api, AsyncAPI: async}, err
		}
	}
	if schema.BasePath != "" && config != nil {
		adjusted := *config
		name := config.SpecFilePath
		if name == "" {
			name = source
		}
		adjusted.SpecFilePath = filepath.Join(schema.BasePath, filepath.Base(name))
		adjusted.BaseURL = nil
		config = &adjusted
	}
	doc, err := jsonschema.Load(data, source, config, schema.Explicit)
	return ParsedSpecification{Schema: doc}, err
}

// Kind reports the native document label for diagnostics.
func (p ParsedSpecification) Kind() string {
	if p.Schema != nil {
		return "JSON Schema"
	}
	if p.AsyncAPI != nil {
		return "AsyncAPI"
	}
	return "OpenAPI"
}

// Release drops the parsed source and its indexes.
func (p ParsedSpecification) Release() {
	releaseParsed(p.OpenAPI, p.AsyncAPI)
	p.Schema.Release()
}

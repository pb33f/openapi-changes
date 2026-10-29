package model

import (
	async "github.com/pb33f/libasyncapi/what-changed/model"
	openapi "github.com/pb33f/libopenapi/what-changed/model"
)

// ComparisonRules keeps independent policies for each engine. SchemaRules
// applies to JSON Schemas embedded in AsyncAPI documents only.
type ComparisonRules struct {
	Legacy   bool                         `yaml:"-"` // an unscoped OpenAPI policy must not silently apply to AsyncAPI
	OpenAPI  *openapi.BreakingRulesConfig `yaml:"openapiRules"`
	AsyncAPI *async.BreakingRulesConfig   `yaml:"asyncapiRules"`
	Schema   *openapi.BreakingRulesConfig `yaml:"schemaRules"`
}

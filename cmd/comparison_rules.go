package cmd

import (
	"fmt"
	"github.com/pb33f/go-yaml"
	async "github.com/pb33f/libasyncapi/what-changed/model"
	openapi "github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pb33f/openapi-changes/model"
	"os"
)

func loadComparisonRules(path string) (*model.ComparisonRules, error) {
	paths := []string{path}
	if path == "" {
		paths = getDefaultConfigPaths()
	}
	for _, candidate := range paths {
		expanded, err := expandUserPath(candidate)
		if err != nil {
			return nil, err
		}
		data, err := os.ReadFile(expanded)
		if os.IsNotExist(err) && path == "" {
			continue
		}
		if err != nil {
			return nil, err
		}
		var root yaml.Node
		if err = yaml.Unmarshal(data, &root); err != nil {
			return nil, &ConfigParseError{FilePath: expanded, Err: err}
		}
		if len(root.Content) == 0 {
			return &model.ComparisonRules{}, nil
		}
		node := root.Content[0]
		envelope := false
		for i := 0; i+1 < len(node.Content); i += 2 {
			switch node.Content[i].Value {
			case "openapiRules", "asyncapiRules", "schemaRules":
				envelope = true
			}
		}
		if !envelope {
			legacy, err := loadConfigFromPath(expanded, true)
			return &model.ComparisonRules{OpenAPI: legacy, Legacy: true}, err
		}
		if node.Kind != yaml.MappingNode {
			return nil, fmt.Errorf("rules must be a mapping")
		}
		for i := 0; i+1 < len(node.Content); i += 2 {
			key, value := node.Content[i].Value, node.Content[i+1]
			encoded, err := yaml.Marshal(value)
			if err != nil {
				return nil, err
			}
			switch key {
			case "openapiRules", "schemaRules":
				if invalid := openapi.ValidateBreakingRulesConfigYAML(encoded); invalid != nil {
					return nil, &ConfigValidationError{FilePath: expanded, Result: invalid}
				}
			case "asyncapiRules":
				if invalid := async.ValidateBreakingRulesConfigYAML(encoded); invalid != nil {
					return nil, fmt.Errorf("invalid asyncapiRules in %s: %v", expanded, invalid)
				}
			default:
				return nil, fmt.Errorf("unknown rules section %q", key)
			}
		}
		var rules model.ComparisonRules
		if err = node.Decode(&rules); err != nil {
			return nil, err
		}
		return &rules, nil
	}
	return &model.ComparisonRules{}, nil
}

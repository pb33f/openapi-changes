// Copyright 2022-2025 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/libopenapi/what-changed/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLoadBreakingRulesConfig_ValidFile(t *testing.T) {
	config, err := LoadBreakingRulesConfig("../sample-specs/sample_configs/valid-config.yaml")

	require.NoError(t, err)
	require.NotNil(t, config)

	// verify some rules were loaded
	assert.NotNil(t, config.PathItem)
	assert.NotNil(t, config.PathItem.Get)
	assert.NotNil(t, config.PathItem.Get.Removed)
	assert.False(t, *config.PathItem.Get.Removed)

	assert.NotNil(t, config.Schema)
	assert.NotNil(t, config.Schema.Enum)
	assert.NotNil(t, config.Schema.Enum.Removed)
	assert.False(t, *config.Schema.Enum.Removed)
}

func TestLoadBreakingRulesConfig_MissingUserSpecifiedFile(t *testing.T) {
	config, err := LoadBreakingRulesConfig("nonexistent-file.yaml")

	assert.Error(t, err)
	assert.Nil(t, config)
	assert.Contains(t, err.Error(), "config file not found")
}

func TestLoadBreakingRulesConfig_MissingDefaultFile(t *testing.T) {
	// when no config path is specified and no default config exists,
	// should return nil config (no error) to use libopenapi defaults
	_, err := LoadBreakingRulesConfig("")

	// this may or may not find a config depending on the test environment
	// but it should not error - it either finds one or returns nil
	assert.NoError(t, err)
}

func TestLoadBreakingRulesConfig_InvalidYAML(t *testing.T) {
	config, err := LoadBreakingRulesConfig("../sample-specs/sample_configs/invalid-config.yaml")

	assert.Error(t, err)
	assert.Nil(t, config)
	// Could be either a validation error (invalid YAML caught during validation)
	// or a parse error (caught during unmarshal)
	assert.True(t,
		strings.Contains(err.Error(), "invalid YAML") ||
			strings.Contains(err.Error(), "failed to parse config file") ||
			strings.Contains(err.Error(), "config validation failed"),
		"error should indicate invalid config: %s", err.Error())
}

func TestLoadBreakingRulesConfig_PartialConfig(t *testing.T) {
	config, err := LoadBreakingRulesConfig("../sample-specs/sample_configs/partial-config.yaml")

	require.NoError(t, err)
	require.NotNil(t, config)

	// verify partial config loaded correctly
	assert.NotNil(t, config.Schema)
	assert.NotNil(t, config.Schema.Enum)
	assert.NotNil(t, config.Schema.Enum.Removed)
	assert.False(t, *config.Schema.Enum.Removed)

	// unspecified fields should be nil
	assert.Nil(t, config.PathItem)
}

func TestExpandUserPath_TildeExpansion(t *testing.T) {
	home, err := os.UserHomeDir()
	require.NoError(t, err)

	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "bare tilde",
			input:    "~",
			expected: home,
		},
		{
			name:     "tilde with path",
			input:    "~/config/rules.yaml",
			expected: filepath.Join(home, "config/rules.yaml"),
		},
		{
			name:     "absolute path unchanged",
			input:    "/etc/config.yaml",
			expected: "/etc/config.yaml",
		},
		{
			name:     "relative path unchanged",
			input:    "config/rules.yaml",
			expected: "config/rules.yaml",
		},
		{
			name:     "empty path",
			input:    "",
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := expandUserPath(tt.input)
			require.NoError(t, err)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestExpandUserPath_NoTilde(t *testing.T) {
	result, err := expandUserPath("/absolute/path/to/config.yaml")

	require.NoError(t, err)
	assert.Equal(t, "/absolute/path/to/config.yaml", result)
}

func TestGetDefaultConfigPaths(t *testing.T) {
	paths := getDefaultConfigPaths()

	// should have at least one path (current directory)
	assert.NotEmpty(t, paths)

	// first path should be in current directory
	cwd, err := os.Getwd()
	require.NoError(t, err)
	assert.Equal(t, filepath.Join(cwd, DefaultConfigFileName), paths[0])

	// if we have two paths, second should be in ~/.config
	if len(paths) > 1 {
		home, err := os.UserHomeDir()
		require.NoError(t, err)
		assert.Equal(t, filepath.Join(home, ".config", DefaultConfigFileName), paths[1])
	}
}

func TestApplyBreakingRulesConfig_MergesWithDefaults(t *testing.T) {
	// reset to clean state
	model.ResetDefaultBreakingRules()
	model.ResetActiveBreakingRulesConfig()
	defer func() {
		model.ResetActiveBreakingRulesConfig()
		model.ResetDefaultBreakingRules()
	}()

	// create a custom config that overrides one rule
	falseVal := false
	customConfig := &model.BreakingRulesConfig{
		Schema: &model.SchemaRules{
			Enum: &model.BreakingChangeRule{
				Removed: &falseVal,
			},
		},
	}

	ApplyBreakingRulesConfig(customConfig)

	// verify the custom rule is applied
	activeConfig := model.GetActiveBreakingRulesConfig()
	require.NotNil(t, activeConfig)
	require.NotNil(t, activeConfig.Schema)
	require.NotNil(t, activeConfig.Schema.Enum)
	require.NotNil(t, activeConfig.Schema.Enum.Removed)
	assert.False(t, *activeConfig.Schema.Enum.Removed)

	// verify other defaults are still present (not nil)
	assert.NotNil(t, activeConfig.PathItem)
}

func TestApplyBreakingRulesConfig_NilResets(t *testing.T) {
	// reset to clean state
	model.ResetDefaultBreakingRules()
	model.ResetActiveBreakingRulesConfig()
	defer func() {
		model.ResetActiveBreakingRulesConfig()
		model.ResetDefaultBreakingRules()
	}()

	// apply a custom config
	falseVal := false
	customConfig := &model.BreakingRulesConfig{
		Schema: &model.SchemaRules{
			Enum: &model.BreakingChangeRule{
				Removed: &falseVal,
			},
		},
	}
	ApplyBreakingRulesConfig(customConfig)

	// verify custom config was applied
	activeConfig := model.GetActiveBreakingRulesConfig()
	require.NotNil(t, activeConfig)
	require.NotNil(t, activeConfig.Schema)
	require.NotNil(t, activeConfig.Schema.Enum)
	require.NotNil(t, activeConfig.Schema.Enum.Removed)
	assert.False(t, *activeConfig.Schema.Enum.Removed)

	// now reset by passing nil
	ApplyBreakingRulesConfig(nil)

	// verify active config was reset (returns non-nil config from defaults)
	activeConfig = model.GetActiveBreakingRulesConfig()
	require.NotNil(t, activeConfig)
	// after reset, we should have a valid config with expected structure
	require.NotNil(t, activeConfig.Schema)
}

func TestResetBreakingRulesConfig(t *testing.T) {
	// reset to clean state
	model.ResetDefaultBreakingRules()
	model.ResetActiveBreakingRulesConfig()
	defer func() {
		model.ResetActiveBreakingRulesConfig()
		model.ResetDefaultBreakingRules()
	}()

	// apply a custom config
	falseVal := false
	customConfig := &model.BreakingRulesConfig{
		Schema: &model.SchemaRules{
			Enum: &model.BreakingChangeRule{
				Removed: &falseVal,
			},
		},
	}
	ApplyBreakingRulesConfig(customConfig)

	// verify custom config was applied
	activeConfig := model.GetActiveBreakingRulesConfig()
	require.NotNil(t, activeConfig)
	assert.False(t, *activeConfig.Schema.Enum.Removed)

	// reset
	ResetBreakingRulesConfig()

	// verify reset returns a valid config (from defaults)
	activeConfig = model.GetActiveBreakingRulesConfig()
	require.NotNil(t, activeConfig)
	require.NotNil(t, activeConfig.Schema)
}

func TestLoadConfigFromPath_Required(t *testing.T) {
	// test that required=true returns error for missing file
	config, err := loadConfigFromPath("nonexistent.yaml", true)

	assert.Error(t, err)
	assert.Nil(t, config)
	assert.Contains(t, err.Error(), "config file not found")
}

func TestLoadConfigFromPath_NotRequired(t *testing.T) {
	// test that required=false returns nil, nil for missing file
	config, err := loadConfigFromPath("nonexistent.yaml", false)

	assert.NoError(t, err)
	assert.Nil(t, config)
}

func TestDefaultConfigFileName(t *testing.T) {
	assert.Equal(t, "changes-rules.yaml", DefaultConfigFileName)
}

func TestLoadBreakingRulesConfig_ValidationError(t *testing.T) {
	// Create a temp file with misplaced config
	tmpFile, err := os.CreateTemp("", "bad-config-*.yaml")
	require.NoError(t, err)
	defer os.Remove(tmpFile.Name())

	badConfig := `schema:
  discriminator:
    propertyName:
      modified: false
  xml:
    name:
      added: true
`
	_, err = tmpFile.WriteString(badConfig)
	require.NoError(t, err)
	tmpFile.Close()

	config, err := LoadBreakingRulesConfig(tmpFile.Name())

	assert.Error(t, err)
	assert.Nil(t, config)

	// Check it's a validation error
	validationErr, ok := err.(*ConfigValidationError)
	require.True(t, ok, "expected ConfigValidationError")
	assert.Equal(t, 2, len(validationErr.Result.Errors))

	// Check error details
	foundDiscriminator := false
	foundXML := false
	for _, e := range validationErr.Result.Errors {
		if e.FoundKey == "discriminator" {
			foundDiscriminator = true
			// Path includes full traversal to where the misplaced key was found
			assert.Contains(t, e.Path, "schema.discriminator")
		}
		if e.FoundKey == "xml" {
			foundXML = true
			// Path includes full traversal to where the misplaced key was found
			assert.Contains(t, e.Path, "schema.xml")
		}
	}
	assert.True(t, foundDiscriminator, "should detect nested discriminator")
	assert.True(t, foundXML, "should detect nested xml")
}

func TestConfigValidationError_Error(t *testing.T) {
	result := &model.ConfigValidationResult{
		Errors: []*model.ConfigValidationError{
			{Message: "test error"},
		},
	}
	err := &ConfigValidationError{
		FilePath: "/path/to/config.yaml",
		Result:   result,
	}

	assert.Equal(t, "config validation failed for '/path/to/config.yaml': 1 error(s) found", err.Error())
}

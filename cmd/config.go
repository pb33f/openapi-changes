// Copyright 2022-2025 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: MIT

package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/pb33f/libopenapi/what-changed/model"
	"github.com/pterm/pterm"
	"go.yaml.in/yaml/v4"
)

const (
	// DefaultConfigFileName is the default name for the breaking rules config file
	DefaultConfigFileName = "changes-rules.yaml"
)

// LoadBreakingRulesConfig loads a breaking rules configuration from the specified path.
// If configPath is empty, it searches default locations (current directory, then ~/.config).
// Returns nil config if no config is found in default locations (uses libopenapi defaults).
// Returns error if user-specified config path doesn't exist or has invalid YAML.
func LoadBreakingRulesConfig(configPath string) (*model.BreakingRulesConfig, error) {
	// If user specified a config path, it must exist
	if configPath != "" {
		return loadConfigFromPath(configPath, true)
	}

	// Check default locations
	defaultPaths := getDefaultConfigPaths()
	for _, path := range defaultPaths {
		config, err := loadConfigFromPath(path, false)
		if err != nil {
			// Return error only for YAML parsing errors, not for missing files
			return nil, err
		}
		if config != nil {
			return config, nil
		}
	}

	// No config found in default locations - return nil to use libopenapi defaults
	return nil, nil
}

// loadConfigFromPath loads config from a specific path.
// If required is true, returns error if file doesn't exist.
// If required is false, returns nil, nil if file doesn't exist.
func loadConfigFromPath(configPath string, required bool) (*model.BreakingRulesConfig, error) {
	// Expand ~ to home directory
	expandedPath, err := expandUserPath(configPath)
	if err != nil {
		return nil, fmt.Errorf("failed to expand config path '%s': %w", configPath, err)
	}

	_, err = os.Stat(expandedPath)
	if os.IsNotExist(err) {
		if required {
			return nil, fmt.Errorf("config file not found: %s", expandedPath)
		}
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("failed to access config file '%s': %w", expandedPath, err)
	}

	data, err := os.ReadFile(expandedPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read config file '%s': %w", expandedPath, err)
	}

	// Validate config structure before parsing
	if validationResult := model.ValidateBreakingRulesConfigYAML(data); validationResult != nil {
		return nil, &ConfigValidationError{
			FilePath: expandedPath,
			Result:   validationResult,
		}
	}

	var config model.BreakingRulesConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, &ConfigParseError{
			FilePath: expandedPath,
			Err:      err,
		}
	}

	return &config, nil
}

// getDefaultConfigPaths returns the list of default paths to search for config files.
// order: current directory, then ~/.config
// silently skips paths if directory cannot be resolved
func getDefaultConfigPaths() []string {
	paths := make([]string, 0, 2)

	cwd, err := os.Getwd()
	if err == nil {
		paths = append(paths, filepath.Join(cwd, DefaultConfigFileName))
	}

	home, err := os.UserHomeDir()
	if err == nil {
		paths = append(paths, filepath.Join(home, ".config", DefaultConfigFileName))
	}

	return paths
}

// expandUserPath expands ~ to the user's home directory
func expandUserPath(path string) (string, error) {
	if path == "" {
		return "", nil
	}

	if strings.HasPrefix(path, "~") {
		home, err := os.UserHomeDir()
		if err != nil {
			return "", fmt.Errorf("unable to resolve home directory: %w", err)
		}
		if path == "~" {
			return home, nil
		}
		if strings.HasPrefix(path, "~/") || strings.HasPrefix(path, "~\\") {
			return filepath.Join(home, path[2:]), nil
		}
	}

	return path, nil
}

// ApplyBreakingRulesConfig sets the active breaking rules config in libopenapi.
// If config is nil, uses libopenapi defaults.
// The config is merged on top of defaults, so only specified rules are overridden.
func ApplyBreakingRulesConfig(config *model.BreakingRulesConfig) {
	if config == nil {
		model.ResetActiveBreakingRulesConfig()
		return
	}

	// Get defaults and merge user config on top
	defaults := model.GenerateDefaultBreakingRules()
	defaults.Merge(config)
	model.SetActiveBreakingRulesConfig(defaults)
}

// ResetBreakingRulesConfig resets the active breaking rules to libopenapi defaults.
func ResetBreakingRulesConfig() {
	model.ResetActiveBreakingRulesConfig()
}

// ConfigParseError represents a YAML parsing error with context
type ConfigParseError struct {
	FilePath string
	Err      error
}

func (e *ConfigParseError) Error() string {
	return fmt.Sprintf("failed to parse config file '%s': %v", e.FilePath, e.Err)
}

func (e *ConfigParseError) Unwrap() error {
	return e.Err
}

// ConfigValidationError represents validation errors in the config structure
type ConfigValidationError struct {
	FilePath string
	Result   *model.ConfigValidationResult
}

func (e *ConfigValidationError) Error() string {
	return fmt.Sprintf("config validation failed for '%s': %d error(s) found", e.FilePath, len(e.Result.Errors))
}

// PrintConfigError prints a config error with nice formatting using pterm.
// Displays in red with spacing above and below.
func PrintConfigError(err error) {
	fmt.Println() // space above

	if validationErr, ok := err.(*ConfigValidationError); ok {
		pterm.Error.Printf("Breaking rules config has %d error(s)\n", len(validationErr.Result.Errors))
		fmt.Println()
		pterm.FgRed.Printf("  File: %s\n", validationErr.FilePath)
		fmt.Println()

		for _, e := range validationErr.Result.Errors {
			if e.Line > 0 {
				pterm.FgRed.Printf("  ✗ Line %d: %s\n", e.Line, e.Message)
			} else {
				pterm.FgRed.Printf("  ✗ %s\n", e.Message)
			}
			pterm.FgLightYellow.Printf("    → Move '%s' to the top level of your config\n", e.FoundKey)
			fmt.Println()
		}

		pterm.FgLightCyan.Println("  Components like 'discriminator', 'xml', 'contact', 'license', etc.")
		pterm.FgLightCyan.Println("  must be defined at the top level, not nested under other components.")
		pterm.FgLightCyan.Println("  See: https://pb33f.io/libopenapi/what-changed/")
	} else if parseErr, ok := err.(*ConfigParseError); ok {
		pterm.Error.Println("Failed to parse breaking rules config file")
		fmt.Println()
		pterm.FgRed.Printf("  File: %s\n", parseErr.FilePath)
		pterm.FgRed.Printf("  Error: %s\n", parseErr.Err.Error())
		fmt.Println()
		pterm.FgLightYellow.Println("  Ensure the YAML structure matches libopenapi's BreakingRulesConfig format.")
		pterm.FgLightYellow.Println("  See: https://pb33f.io/libopenapi/what-changed/")
	} else {
		pterm.Error.Printf("Config error: %s\n", err.Error())
	}

	fmt.Println() // space below
}

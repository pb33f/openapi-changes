// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

// Package breakingrules provides mutex-guarded access to the global breaking
// rules configuration in libopenapi. All code paths that set the global config
// must go through this package to prevent data races if the git layer or cmd
// layer are ever parallelized.
package breakingrules

import (
	"sync"

	wcModel "github.com/pb33f/libopenapi/what-changed/model"
)

var mu sync.Mutex

// Apply merges the given config on top of libopenapi defaults and sets it as
// the active breaking rules configuration. If config is nil, resets to defaults.
// Thread-safe — acquires the package-level mutex.
func Apply(config *wcModel.BreakingRulesConfig) {
	mu.Lock()
	defer mu.Unlock()
	if config == nil {
		wcModel.ResetActiveBreakingRulesConfig()
		return
	}
	defaults := wcModel.GenerateDefaultBreakingRules()
	defaults.Merge(config)
	wcModel.SetActiveBreakingRulesConfig(defaults)
}

// Reset resets the active breaking rules to libopenapi defaults.
// Thread-safe — acquires the package-level mutex.
func Reset() {
	mu.Lock()
	defer mu.Unlock()
	wcModel.ResetActiveBreakingRulesConfig()
}

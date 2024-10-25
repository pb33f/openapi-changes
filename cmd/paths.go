package cmd

import (
	"fmt"
	"os"
	"path"
	"path/filepath"
)

func absoluteRepoPath(p string) (string, error) {
	if !path.IsAbs(p) {
		wd, err := os.Getwd()
		if err != nil {
			return "", fmt.Errorf("get working dir: %v", err)
		}
		return filepath.Join(wd, p), nil
	}

	return p, nil
}

// Copyright 2023-2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

package cmd

import (
	"errors"
	"fmt"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"strings"
)

func absoluteRepoPath(p string) (string, error) {
	if !filepath.IsAbs(p) {
		wd, err := os.Getwd()
		if err != nil {
			return "", fmt.Errorf("get working dir: %v", err)
		}
		return filepath.Join(wd, p), nil
	}

	return p, nil
}

func ExtractGithubDetailsFromURL(specURL *url.URL) (string, string, string, error) {
	if specURL == nil {
		return "", "", "", errors.New("github URL is required")
	}
	if specURL.Host != "github.com" {
		return "", "", "", fmt.Errorf("unsupported host: %s", specURL.Host)
	}

	parts := strings.Split(strings.Trim(specURL.Path, "/"), "/")
	if len(parts) < 5 {
		return "", "", "", fmt.Errorf("invalid github file URL: %s", specURL.String())
	}
	if parts[2] != "blob" {
		return "", "", "", fmt.Errorf("github URL must point to a blob: %s", specURL.String())
	}

	user := parts[0]
	repo := parts[1]
	filePath := path.Join(parts[4:]...)
	if user == "" || repo == "" || filePath == "" {
		return "", "", "", fmt.Errorf("invalid github file URL: %s", specURL.String())
	}
	return user, repo, filePath, nil
}

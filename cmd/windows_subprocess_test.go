//go:build windows

package cmd

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

const windowsCreateNoWindow = 0x08000000

func TestWindowsNoConsoleSubprocessDoesNotHang(t *testing.T) {
	tests := []struct {
		name string
		args []string
	}{
		{
			name: "root",
			args: []string{"--no-logo"},
		},
		{
			name: "summary",
			args: []string{
				"summary",
				"--no-logo",
				filepath.Join("..", "sample-specs", "petstorev3.json"),
				filepath.Join("..", "sample-specs", "petstorev3.json"),
			},
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			runWindowsNoConsoleHelper(t, tc.name, tc.args)
		})
	}
}

func TestWindowsNoConsoleSubprocessHelper(t *testing.T) {
	rawArgs := os.Getenv("OPENAPI_CHANGES_WINDOWS_HELPER_ARGS")
	if rawArgs == "" {
		return
	}

	_ = os.Unsetenv("PB33F_DARK_BACKGROUND")
	_ = os.Unsetenv("COLORFGBG")

	Version = "test"
	Commit = "test"
	Date = "test"
	var args []string
	if err := json.Unmarshal([]byte(rawArgs), &args); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	rootCmd.SetArgs(args)
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
	os.Exit(0)
}

func runWindowsNoConsoleHelper(t *testing.T, name string, args []string) {
	t.Helper()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, os.Args[0], "-test.run=TestWindowsNoConsoleSubprocessHelper")
	cmd.Env = envWithoutKeys(os.Environ(), "PB33F_DARK_BACKGROUND", "COLORFGBG")
	rawArgs, err := json.Marshal(args)
	require.NoError(t, err)
	cmd.Env = append(cmd.Env, "OPENAPI_CHANGES_WINDOWS_HELPER_ARGS="+string(rawArgs))
	cmd.SysProcAttr = &syscall.SysProcAttr{CreationFlags: windowsCreateNoWindow}

	stdin, err := cmd.StdinPipe()
	require.NoError(t, err)
	defer stdin.Close()

	var stdout bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err = cmd.Run()
	if ctx.Err() == context.DeadlineExceeded {
		t.Fatalf("%s hung with no console and redirected stdin; stdout=%q stderr=%q", name, stdout.String(), stderr.String())
	}
	require.NoError(t, err, "stdout=%q stderr=%q", stdout.String(), stderr.String())
}

func envWithoutKeys(env []string, keys ...string) []string {
	filtered := env[:0]
	for _, entry := range env {
		keep := true
		for _, key := range keys {
			if strings.HasPrefix(entry, key+"=") {
				keep = false
				break
			}
		}
		if keep {
			filtered = append(filtered, entry)
		}
	}
	return filtered
}

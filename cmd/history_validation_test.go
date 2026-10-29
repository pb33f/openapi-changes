package cmd

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/pb33f/testify/require"
	"github.com/spf13/cobra"
)

func singleRevisionHistory(t *testing.T, spec string) string {
	t.Helper()
	dir := t.TempDir()
	runGitInDir(t, dir, "init")
	runGitInDir(t, dir, "config", "user.name", "Fixture")
	runGitInDir(t, dir, "config", "user.email", "fixture@example.test")
	require.NoError(t, os.WriteFile(filepath.Join(dir, "api.yaml"), []byte(spec), 0600))
	runGitInDir(t, dir, "add", "api.yaml")
	runGitInDir(t, dir, "commit", "-m", "first version")
	return dir
}

func TestHistoryCommandsRejectMalformedFirstRevision(t *testing.T) {
	dir := singleRevisionHistory(t, "asyncapi: [\n")
	for name, factory := range map[string]func() *cobra.Command{
		"summary": GetSummaryCommand, "console": GetConsoleCommand,
		"report": GetReportCommand, "markdown": GetMarkdownReportCommand, "html": GetHTMLReportCommand,
	} {
		t.Run(name, func(t *testing.T) {
			cmd := testRootCmd(factory(), "--no-logo", "--no-color", "--global-revisions", "--limit", "0", "--limit-time", "-1", dir, "api.yaml")
			output := captureStdout(t, func() {
				err := cmd.Execute()
				require.Error(t, err)
				require.Contains(t, err.Error(), "unable to parse specification")
			})
			require.NotContains(t, output, noChangesFoundMessage)
			require.NotContains(t, output, noPriorVersionMessage)
		})
	}
}

func TestHistoryFirstRevisionIsNotUnchanged(t *testing.T) {
	for _, spec := range []string{
		"openapi: 3.0.0\ninfo: {title: API, version: 1.0.0}\npaths: {}\n",
		"asyncapi: 3.0.0\ninfo: {title: Events, version: 1.0.0}\nchannels: {}\n",
	} {
		dir := singleRevisionHistory(t, spec)
		for _, factory := range []func() *cobra.Command{GetSummaryCommand, GetConsoleCommand} {
			cmd := testRootCmd(factory(), "--no-logo", "--no-color", "--global-revisions", "--limit", "0", "--limit-time", "-1", dir, "api.yaml")
			output := captureStdout(t, func() { require.NoError(t, cmd.Execute()) })
			require.Contains(t, output, noPriorVersionMessage)
			require.NotContains(t, output, noChangesFoundMessage)
		}
		require.NoError(t, os.WriteFile(filepath.Join(dir, "api.yaml"), []byte(spec+"# unchanged\n"), 0600))
		runGitInDir(t, dir, "add", "api.yaml")
		runGitInDir(t, dir, "commit", "-m", "unchanged contract")
		cmd := testRootCmd(GetSummaryCommand(), "--no-logo", "--no-color", "--global-revisions", "--limit", "0", "--limit-time", "-1", dir, "api.yaml")
		output := captureStdout(t, func() { require.NoError(t, cmd.Execute()) })
		require.Contains(t, output, "No changes detected between")
		require.NotContains(t, output, noPriorVersionMessage)
	}
}

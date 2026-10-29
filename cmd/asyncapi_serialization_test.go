package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pb33f/testify/require"
)

func TestAsyncAPIHTMLPreservesAliasBounds(t *testing.T) {
	var source strings.Builder
	source.WriteString("asyncapi: 3.0.0\ninfo: {title: Events, version: 1.0.0}\nx-data:\n  a0: &a0 {value: data}\n")
	var sizes []int
	for _, levels := range []int{0, 8} {
		for i := 1; i <= levels; i++ {
			aliases := strings.TrimSuffix(strings.Repeat(fmt.Sprintf("*a%d, ", i-1), 8), ", ")
			fmt.Fprintf(&source, "  a%d: &a%d [%s]\n", i, i, aliases)
		}
		dir := t.TempDir()
		left, right := filepath.Join(dir, "left.yaml"), filepath.Join(dir, "right.yaml")
		require.NoError(t, os.WriteFile(left, []byte(source.String()), 0600))
		require.NoError(t, os.WriteFile(right, []byte(strings.Replace(source.String(), "title: Events", "title: Events v2", 1)), 0600))
		commits, err := loadLeftRightCommits(left, right, summaryOpts{})
		require.NoError(t, err)
		report, err := generateHTMLReport(commits, nil, false, left, right)
		require.NoError(t, err)
		sizes = append(sizes, len(report))
		if levels > 0 {
			require.Contains(t, string(report), "$yamlAlias")
		}
	}
	require.Less(t, sizes[1]-sizes[0], 100000, "HTML must not expand alias targets in node properties")
}

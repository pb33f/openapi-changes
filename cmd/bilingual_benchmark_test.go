package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// BenchmarkOpenAPIReport includes loading, model construction, comparison and
// JSON flattening. Run unchanged against the base branch for regression checks.
func BenchmarkOpenAPIReport(b *testing.B) {
	b.ReportAllocs()
	for b.Loop() {
		report, err := runLeftRightReport("../sample-specs/petstorev3-original.json", "../sample-specs/petstorev3.json", summaryOpts{}, nil)
		if err != nil {
			b.Fatal(err)
		}
		if report == nil || len(report.Changes) == 0 {
			b.Fatal("expected petstore changes")
		}
	}
}

// BenchmarkAsyncAPIReport measures the complete pipeline when many channels
// share one message schema. Fixture generation is outside the measured work.
func BenchmarkAsyncAPIReport(b *testing.B) {
	for _, channels := range []int{10, 100, 1000} {
		b.Run(fmt.Sprint(channels), func(b *testing.B) {
			var spec strings.Builder
			spec.WriteString("asyncapi: 3.0.0\ninfo: {title: Synthetic events, version: 1.0.0}\nchannels:\n")
			for i := 0; i < channels; i++ {
				fmt.Fprintf(&spec, "  event%d:\n    address: event%d\n    messages:\n      event: {$ref: '#/components/messages/event'}\n", i, i)
			}
			spec.WriteString("components:\n  messages:\n    event:\n      payload: {type: string}\n")
			dir := b.TempDir()
			left, right := filepath.Join(dir, "left.yaml"), filepath.Join(dir, "right.yaml")
			for path, data := range map[string]string{left: spec.String(), right: strings.Replace(spec.String(), "type: string", "type: integer", 1)} {
				if err := os.WriteFile(path, []byte(data), 0600); err != nil {
					b.Fatal(err)
				}
			}
			b.ReportAllocs()
			for b.Loop() {
				report, err := runLeftRightReport(left, right, summaryOpts{}, nil)
				if err != nil {
					b.Fatal(err)
				}
				if report == nil || len(report.Changes) == 0 {
					b.Fatal("expected shared schema changes")
				}
			}
		})
	}
}

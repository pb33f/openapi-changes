package cmd

import "testing"

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

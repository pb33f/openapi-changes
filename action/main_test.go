package main

import (
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"testing"
)

const fixtureSpec = `openapi: 3.0.3
info:
  title: Synthetic Action API
  version: 1.0.0
paths:
  /pets:
    get:
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: './schema.yaml'
`

func writeFixture(t *testing.T, path, content string) {
	t.Helper()
	if err := os.WriteFile(path, []byte(content), 0600); err != nil {
		t.Fatal(err)
	}
}
func gitFixture(t *testing.T, repo string, args ...string) string {
	t.Helper()
	cmd := exec.Command("git", args...)
	cmd.Dir = repo
	data, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("git %v: %v: %s", args, err, data)
	}
	return strings.TrimSpace(string(data))
}
func createFixture(t *testing.T, repo, scenario, prefix string) (string, string) {
	t.Helper()
	dir := filepath.Join(repo, prefix)
	if err := os.MkdirAll(dir, 0700); err != nil {
		t.Fatal(err)
	}
	gitFixture(t, repo, "config", "user.name", "Action fixture")
	gitFixture(t, repo, "config", "user.email", "fixture@example.invalid")
	spec, schema := filepath.Join(dir, "openapi.yaml"), filepath.Join(dir, "schema.yaml")
	rules := filepath.Join(repo, "rules.yaml")
	writeFixture(t, spec, fixtureSpec)
	writeFixture(t, schema, "type: string\n")
	writeFixture(t, rules, "schema:\n  type:\n    modified: true\n")
	gitFixture(t, repo, "add", "--", spec, schema, rules)
	gitFixture(t, repo, "commit", "-qm", "Fixture base")
	base := gitFixture(t, repo, "rev-parse", "HEAD")
	switch scenario {
	case "unchanged":
	case "permitted":
		writeFixture(t, spec, strings.Replace(fixtureSpec, "version: 1.0.0", "version: 1.1.0", 1))
	case "breaking":
		writeFixture(t, spec, strings.Split(fixtureSpec, "paths:")[0]+"paths: {}\n")
	case "invalid":
		writeFixture(t, spec, "openapi: [broken\n")
	case "reference", "rules":
		writeFixture(t, schema, "type: integer\n")
	case "missing-reference":
		writeFixture(t, spec, strings.ReplaceAll(fixtureSpec, "./schema.yaml", "./missing.yaml"))
	case "remote-reference":
		writeFixture(t, spec, strings.ReplaceAll(fixtureSpec, "./schema.yaml", "https://example.invalid/schema.yaml"))
	default:
		t.Fatalf("unknown fixture %s", scenario)
	}
	writeFixture(t, rules, "schema:\n  type:\n    modified: false\n")
	gitFixture(t, repo, "add", "--", spec, schema, rules)
	gitFixture(t, repo, "commit", "--allow-empty", "-qm", "Fixture head")
	head := gitFixture(t, repo, "rev-parse", "HEAD")
	writeFixture(t, schema, "not: [valid\n")
	writeFixture(t, filepath.Join(repo, "changes-rules.yaml"), "schema:\n  type:\n    modified: false\n")
	return base, head
}

var buildOnce sync.Once
var testBinary string
var buildError error
var buildOutput []byte
var binaryDirectory string

func TestMain(m *testing.M) {
	code := m.Run()
	if binaryDirectory != "" {
		_ = os.RemoveAll(binaryDirectory)
	}
	os.Exit(code)
}
func cliBinary(t *testing.T) string {
	t.Helper()
	buildOnce.Do(func() {
		testBinary = os.Getenv("OPENAPI_CHANGES_BINARY")
		if testBinary != "" {
			return
		}
		binaryDirectory, buildError = os.MkdirTemp("", "openapi-action-test-bin-")
		if buildError != nil {
			return
		}
		testBinary = filepath.Join(binaryDirectory, "openapi-changes.exe")
		cmd := exec.Command("go", "build", "-trimpath", "-o", testBinary, "..")
		cmd.Env = append(os.Environ(), "GOWORK=off")
		buildOutput, buildError = cmd.CombinedOutput()
	})
	if buildError != nil {
		t.Fatalf("build CLI: %v: %s", buildError, buildOutput)
	}
	return testBinary
}
func readText(t *testing.T, path string) string {
	t.Helper()
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	return string(data)
}
func runCase(t *testing.T, scenario, policy string, overrides map[string]string) (map[string]string, string) {
	t.Helper()
	dir := t.TempDir()
	repo := filepath.Join(dir, "repo")
	if err := os.Mkdir(repo, 0700); err != nil {
		t.Fatal(err)
	}
	gitFixture(t, repo, "init", "-q")
	base, head := createFixture(t, repo, scenario, "")
	env := map[string]string{
		"GITHUB_WORKSPACE": repo, "RUNNER_TEMP": dir, "GITHUB_OUTPUT": filepath.Join(dir, "output"),
		"GITHUB_STEP_SUMMARY": filepath.Join(dir, "summary"), "OPENAPI_CHANGES_BINARY": cliBinary(t),
		"INPUT_SPEC": "openapi.yaml", "INPUT_BASE": base, "INPUT_HEAD": head, "INPUT_FAIL_ON": policy,
	}
	for k, v := range overrides {
		env[k] = v
	}
	if err := run(func(k string) string { return env[k] }); err != nil {
		t.Fatal(err)
	}
	outputs := make(map[string]string)
	for _, line := range strings.Split(strings.TrimSpace(readText(t, env["GITHUB_OUTPUT"])), "\n") {
		key, value, ok := strings.Cut(line, "=")
		if !ok {
			t.Fatalf("invalid output %q", line)
		}
		outputs[key] = value
	}
	summary := readText(t, env["GITHUB_STEP_SUMMARY"])
	if outputs["base-sha"] != "" && (outputs["base-sha"] != base || outputs["head-sha"] != head) {
		t.Fatal("incorrect revision identity")
	}
	return outputs, summary
}
func TestAnalysisAndPolicy(t *testing.T) {
	for _, tc := range []struct{ scenario, policy, outcome string }{
		{"unchanged", "breaking", "passed"}, {"permitted", "breaking", "passed"},
		{"breaking", "breaking", "policy-failed"}, {"reference", "breaking", "policy-failed"},
		{"invalid", "breaking", "analysis-error"}, {"breaking", "none", "passed"},
		{"invalid", "none", "analysis-error"}, {"permitted", "changes", "policy-failed"},
		{"missing-reference", "breaking", "analysis-error"}, {"remote-reference", "breaking", "analysis-error"},
	} {
		t.Run(tc.scenario+"/"+tc.policy, func(t *testing.T) {
			out, summary := runCase(t, tc.scenario, tc.policy, nil)
			if out["outcome"] != tc.outcome {
				t.Fatalf("got %s, want %s: %s", out["outcome"], tc.outcome, readText(t, filepath.Join(out["artifact-path"], "analysis.log")))
			}
			if !strings.Contains(summary, out["base-sha"]) || out["base-sha"] == "" || !strings.Contains(summary, out["head-sha"]) {
				t.Fatal("summary lacks revision identity")
			}
			if tc.outcome == "analysis-error" {
				if strings.Contains(summary, "No changes found") || out["total"] != "" {
					t.Fatal("analysis error presented as complete")
				}
				return
			}
			dir := out["artifact-path"]
			wantTotal, wantBreaking := "1", "0"
			if tc.scenario == "unchanged" {
				wantTotal = "0"
			} else if tc.scenario == "breaking" || tc.scenario == "reference" {
				wantBreaking = "1"
			}
			if out["total"] != wantTotal || out["breaking"] != wantBreaking {
				t.Fatalf("incorrect counts: %v", out)
			}
			var saved struct {
				Total    *int `json:"total"`
				Breaking *int `json:"breaking"`
			}
			if err := json.Unmarshal([]byte(readText(t, filepath.Join(dir, "outcome.json"))), &saved); err != nil || saved.Total == nil || saved.Breaking == nil {
				t.Fatalf("outcome must retain numeric counts: %v", err)
			}
			if !json.Valid([]byte(readText(t, filepath.Join(dir, "report.json")))) {
				t.Fatal("invalid JSON report")
			}
			for _, name := range []string{"report.md", "report.html"} {
				if readText(t, filepath.Join(dir, name)) == "" {
					t.Fatalf("empty %s", name)
				}
			}
			if !strings.Contains(summary, "https://pb33f.io/doctor/") {
				t.Fatal("missing Doctor link")
			}
			if tc.scenario == "breaking" || tc.scenario == "reference" {
				if !strings.Contains(summary, "### Breaking highlights") || !strings.Contains(summary, "pets") {
					t.Fatal("missing breaking highlight")
				}
			}
		})
	}
}
func TestRulesFromBase(t *testing.T) {
	out, _ := runCase(t, "rules", "breaking", map[string]string{"INPUT_BREAKING_RULES": "rules.yaml"})
	if out["outcome"] != "policy-failed" {
		t.Fatal(out)
	}
	if !strings.Contains(readText(t, filepath.Join(out["artifact-path"], "breaking-rules.yaml")), "modified: true") {
		t.Fatal("rules were not read from base")
	}
}
func TestInvalidInputs(t *testing.T) {
	for _, override := range []map[string]string{
		{"INPUT_SPEC": "../openapi.yaml"}, {"INPUT_BASE": "--help"}, {"INPUT_HEAD": "missing"},
		{"INPUT_FAIL_ON": "typo"}, {"INPUT_SPEC": "openapi.yaml\nspoof=true"},
	} {
		t.Run("invalid", func(t *testing.T) {
			out, _ := runCase(t, "unchanged", "breaking", override)
			if out["outcome"] != "analysis-error" {
				t.Fatal(out)
			}
		})
	}
}

// TestWorkflowFixture prepares synthetic revisions for the hosted Action matrix.
func TestWorkflowFixture(t *testing.T) {
	scenario := os.Getenv("ACTION_FIXTURE_CASE")
	if scenario == "" {
		t.Skip("only used by the Action workflow")
	}
	base, head := createFixture(t, os.Getenv("GITHUB_WORKSPACE"), scenario, ".action-fixtures")
	f, err := os.OpenFile(os.Getenv("GITHUB_OUTPUT"), os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0600)
	if err != nil {
		t.Fatal(err)
	}
	_, err = f.WriteString("base=" + base + "\nhead=" + head + "\n")
	closeErr := f.Close()
	if err != nil {
		t.Fatal(err)
	}
	if closeErr != nil {
		t.Fatal(closeErr)
	}
}

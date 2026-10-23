// The action runner compares committed specifications without executing repository code.
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"html"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"slices"
	"strings"
)

var refPattern = regexp.MustCompile(`^[A-Za-z0-9_][A-Za-z0-9_./-]*$`)
var shaPattern = regexp.MustCompile(`^([0-9a-f]{40}|[0-9a-f]{64})$`)

func repositoryPath(value string) (string, error) {
	if value == "" || strings.HasPrefix(value, "/") || strings.HasPrefix(value, "-") || strings.ContainsAny(value, `\:`) {
		return "", errors.New("expected a repository-relative file path")
	}
	for _, c := range value {
		if c < 32 || c == 127 {
			return "", errors.New("expected a repository-relative file path")
		}
	}
	for _, part := range strings.Split(value, "/") {
		if part == "" || part == "." || part == ".." {
			return "", errors.New("expected a repository-relative file path")
		}
	}
	return value, nil
}

func gitOutput(workspace string, args ...string) ([]byte, error) {
	command := exec.Command("git", args...)
	command.Dir = workspace
	output, err := command.Output()
	if err != nil {
		if exit, ok := err.(*exec.ExitError); ok {
			return nil, fmt.Errorf("git: %w: %s", err, exit.Stderr)
		}
		return nil, err
	}
	return output, nil
}

func resolveRef(ref, workspace string) (string, error) {
	if !refPattern.MatchString(ref) {
		return "", errors.New("expected a ref name or commit SHA")
	}
	output, err := gitOutput(workspace, "rev-parse", "--verify", "--end-of-options", ref+"^{commit}")
	if err != nil {
		return "", err
	}
	sha := strings.TrimSpace(string(output))
	if !shaPattern.MatchString(sha) {
		return "", errors.New("git did not return a commit SHA")
	}
	return sha, nil
}

func writeJSON(path string, value any) error {
	data, err := json.MarshalIndent(value, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(path, append(data, '\n'), 0600)
}

func appendFile(path string, data []byte) error {
	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0600)
	if err != nil {
		return err
	}
	_, writeErr := file.Write(data)
	return errors.Join(writeErr, file.Close())
}

func compare(directory, workspace, binary string, getenv func(string) string) (map[string]any, error) {
	spec, err := repositoryPath(getenv("INPUT_SPEC"))
	if err != nil {
		return nil, err
	}
	policy := getenv("INPUT_FAIL_ON")
	if policy == "" {
		policy = "breaking"
	}
	if policy != "breaking" && policy != "changes" && policy != "none" {
		return nil, errors.New("fail-on must be breaking, changes, or none")
	}
	base, err := resolveRef(getenv("INPUT_BASE"), workspace)
	if err != nil {
		return nil, err
	}
	head, err := resolveRef(getenv("INPUT_HEAD"), workspace)
	if err != nil {
		return nil, err
	}
	metadata := map[string]string{"base": base, "head": head, "spec": spec, "failOn": policy}
	if err := writeJSON(filepath.Join(directory, "comparison.json"), metadata); err != nil {
		return nil, err
	}
	configPath := filepath.Join(directory, "breaking-rules.yaml")
	config := []byte("{}\n")
	if rules := getenv("INPUT_BREAKING_RULES"); rules != "" {
		rules, err = repositoryPath(rules)
		if err != nil {
			return nil, err
		}
		config, err = gitOutput(workspace, "show", base+":"+rules)
		if err != nil {
			return nil, err
		}
	}
	if err := os.WriteFile(configPath, config, 0600); err != nil {
		return nil, err
	}
	common := []string{"--no-logo", "--no-color", "--remote=false", "--config", configPath}
	sources := []string{base + ":" + spec, head + ":" + spec}
	invoke := func(command string, flags []string, output string) error {
		log, err := os.OpenFile(filepath.Join(directory, "analysis.log"), os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0600)
		if err != nil {
			return err
		}
		var stream *os.File
		var stdout io.Writer = log
		if output != "" {
			stream, err = os.Create(output)
			if err != nil {
				return errors.Join(err, log.Close())
			}
			stdout = stream
		}
		args := append([]string{command}, common...)
		args = append(args, flags...)
		args = append(args, sources...)
		process := exec.Command(binary, args...)
		process.Dir, process.Stdout, process.Stderr = workspace, stdout, log
		err = process.Run()
		if stream != nil {
			err = errors.Join(err, stream.Close())
		}
		return errors.Join(err, log.Close())
	}
	summaryPath := filepath.Join(directory, "summary.md")
	resultPath := filepath.Join(directory, "result.json")
	if err := invoke("markdown-report", []string{"--compact", "--report-file", summaryPath, "--result-file", resultPath}, ""); err != nil {
		return nil, err
	}
	data, err := os.ReadFile(resultPath)
	if err != nil {
		return nil, err
	}
	var result struct {
		Total    *int `json:"total"`
		Breaking *int `json:"breaking"`
	}
	if err := json.Unmarshal(data, &result); err != nil {
		return nil, err
	}
	if result.Total == nil || result.Breaking == nil || *result.Breaking < 0 || *result.Total < *result.Breaking {
		return nil, errors.New("invalid comparison result counts")
	}
	total, breaking := *result.Total, *result.Breaking
	reportPath := filepath.Join(directory, "report.json")
	if err := invoke("report", []string{"--reproducible"}, reportPath); err != nil {
		return nil, err
	}
	data, err = os.ReadFile(reportPath)
	if err != nil {
		return nil, err
	}
	if !json.Valid(data) {
		return nil, errors.New("invalid JSON report")
	}
	for _, report := range []struct{ command, name string }{{"markdown-report", "report.md"}, {"html-report", "report.html"}} {
		path := filepath.Join(directory, report.name)
		if err := invoke(report.command, []string{"--report-file", path}, ""); err != nil {
			return nil, err
		}
		info, err := os.Stat(path)
		if err == nil {
			if !info.Mode().IsRegular() {
				return nil, errors.New("report is not a regular file")
			}
			continue
		}
		if !errors.Is(err, os.ErrNotExist) {
			return nil, err
		}
		if total != 0 {
			return nil, errors.New("a report was not written")
		}
		content := "No changes found.\n"
		if report.name == "report.html" {
			content = "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><title>OpenAPI changes</title><body><p>No changes found.</p></body></html>\n"
		}
		if err := os.WriteFile(path, []byte(content), 0600); err != nil {
			return nil, err
		}
	}
	// A missing compact summary is an analysis failure, not an empty successful report.
	if _, err := os.ReadFile(summaryPath); err != nil {
		return nil, err
	}
	outcome := "passed"
	if policy == "breaking" && breaking > 0 || policy == "changes" && total > 0 {
		outcome = "policy-failed"
	}
	footer := fmt.Sprintf("\n### Comparison\n\n- Base: `%s`\n- Head: `%s`\n- Specification: <code>%s</code>\n- Policy: `%s`\n- Result: `%s`\n", base, head, html.EscapeString(spec), policy, outcome)
	if err := appendFile(summaryPath, []byte(footer)); err != nil {
		return nil, err
	}
	return map[string]any{"outcome": outcome, "base-sha": base, "head-sha": head, "total": total, "breaking": breaking}, nil
}

func run(getenv func(string) string) error {
	for _, key := range []string{"RUNNER_TEMP", "GITHUB_WORKSPACE", "OPENAPI_CHANGES_BINARY", "GITHUB_OUTPUT", "GITHUB_STEP_SUMMARY"} {
		if getenv(key) == "" {
			return fmt.Errorf("missing %s", key)
		}
	}
	directory, err := os.MkdirTemp(getenv("RUNNER_TEMP"), "openapi-changes-")
	if err != nil {
		return err
	}
	outputs := map[string]any{"artifact-path": directory, "outcome": "analysis-error"}
	result, analysisErr := compare(directory, getenv("GITHUB_WORKSPACE"), getenv("OPENAPI_CHANGES_BINARY"), getenv)
	if analysisErr != nil {
		// Keep untrusted process diagnostics in the artifact, never in the workflow log.
		if err := appendFile(filepath.Join(directory, "analysis.log"), []byte("\n"+analysisErr.Error()+"\n")); err != nil {
			return err
		}
		summary := "## OpenAPI changes\n\nAnalysis failed. Download the report artifact for diagnostics.\nNo policy result is available.\n"
		data, err := os.ReadFile(filepath.Join(directory, "comparison.json"))
		if err == nil {
			var metadata map[string]string
			if err := json.Unmarshal(data, &metadata); err != nil {
				return err
			}
			outputs["base-sha"], outputs["head-sha"] = metadata["base"], metadata["head"]
			summary += fmt.Sprintf("\n- Base: `%s`\n- Head: `%s`\n", metadata["base"], metadata["head"])
		} else if !errors.Is(err, os.ErrNotExist) {
			return err
		}
		if err := os.WriteFile(filepath.Join(directory, "summary.md"), []byte(summary), 0600); err != nil {
			return err
		}
	} else {
		for key, value := range result {
			outputs[key] = value
		}
	}
	if err := writeJSON(filepath.Join(directory, "outcome.json"), outputs); err != nil {
		return err
	}
	keys := make([]string, 0, len(outputs))
	for key := range outputs {
		keys = append(keys, key)
	}
	slices.Sort(keys)
	var output strings.Builder
	for _, key := range keys {
		value := fmt.Sprint(outputs[key])
		if strings.ContainsAny(value, "\r\n") {
			return errors.New("invalid workflow output value")
		}
		fmt.Fprintf(&output, "%s=%s\n", key, value)
	}
	if err := appendFile(getenv("GITHUB_OUTPUT"), []byte(output.String())); err != nil {
		return err
	}
	summary, err := os.ReadFile(filepath.Join(directory, "summary.md"))
	if err != nil {
		return err
	}
	return appendFile(getenv("GITHUB_STEP_SUMMARY"), summary)
}

func main() {
	if err := run(os.Getenv); err != nil {
		fmt.Fprintln(os.Stderr, "OpenAPI changes could not publish the analysis result.")
		os.Exit(1)
	}
}

# AGENTS.md

`openapi-changes` is a pb33f tool built by Princess Beef Heavy Industries, LLC.

This file is the fast path for agents and maintainers. Read this before changing command behavior, report semantics, or UI payloads.

Public documentation:

- https://pb33f.io/openapi-changes/

## What This Repo Is

`openapi-changes` is a Go CLI for comparing OpenAPI specifications across:

- direct left/right file or URL comparison
- local git history for a file in a repository
- GitHub-hosted file history via file URL

The public command surface is:

- `console`
- `summary`
- `report`
- `markdown-report`
- `html-report`

All five commands use the current engine built on `doctor`, the open source Apache 2.0 library from pb33f:

- https://github.com/pb33f/doctor

## Source Of Truth

The code is the source of truth.

If behavior, comments, tests, and internal docs disagree, bring them back into alignment in the same change. Do not leave drift behind.

## Architecture At A Glance

- `cmd/` owns CLI orchestration, shared flag handling, commit loading, doctor execution, JSON flattening, and report file writing.
- `git/` owns local git and GitHub history extraction and comparable commit/document preparation.
- `html-report/` owns the HTML payload contract, templates, and embedded frontend assets.
- `tui/v2/` owns the canonical Bubbletea console UI.
- `internal/changecounts/` owns deduplicated semantic count derivation.
- `internal/security/` owns security-scope labeling helpers.
- `github.com/pb33f/doctor` is the authoritative backend for changerator traversal, semantic tree rendering, markdown/HTML rendering, and GitHub history service integration.

All `cmd/` implementation files use their canonical names (e.g., `cmd/summary.go`, `cmd/console.go`).

## Non-Negotiable Invariants

### Counts and semantics

- `summary` is the semantic human report.
- `summary` headline, highlights, and visible summary counts are deduplicated by `JSONPath + property`.
- `markdown-report` top summary and object stats are also deduplicated.
- `report` is the machine-readable JSON interface and should prefer stable semantic identity over renderer-local structure.

### Machine-readable JSON

- `report` should emit semantic `path` values whenever possible.
- If semantic normalization rewrites an engine path, preserve the original path in `rawPath`.
- Parameter identity must not depend on array index positions when a stable semantic name exists.

### Left/right behavior

- Left/right comparisons are synthetic comparisons, not fake git history.
- Do not emit synthetic commit metadata in left/right machine- or human-facing report output.

### Failure semantics

- Partial render/build failure must fail the command.
- Do not silently succeed on mixed-success histories for `summary`, `markdown-report`, or `html-report`.
- “No prior comparable version” and “no changes found” are distinct states.

### HTML payload integrity

- The HTML payload must preserve the raw changed-node tree for the document/explorer views.
- Do not run summary-style pruning/transforms on the HTML tree payload if they can drop valid branches such as `$.components`.

## Change Strategy

- Keep commands thin.
- Put shared logic in shared helpers instead of copying per-command behavior.
- Prefer using doctor as the rendering source of truth instead of recreating semantic renderers locally.
- Prefer semantic output over diagnostic/internal output for human-facing commands.
- For machine-facing output, stable identity beats pretty formatting.
- If the counted thing and the displayed thing diverge, fix that before shipping.

## Files That Matter Most

- `cmd/root.go` — root Cobra command, CLI entry point, subcommand registration
- `cmd/common.go` — shared option flags and Lip Gloss styling for all doctor-based commands
- `cmd/loaders.go` — loads specs from files, URLs, and git history; progress tracking and error aggregation
- `cmd/engine.go` — wraps doctor changerator for API comparison; manages document resource cleanup and mutex-guarded breaking config
- `cmd/summary.go` — styled terminal summary with deduplicated breaking/addition/modification/removal counts
- `cmd/report.go` — machine-readable JSON report pipeline
- `cmd/markdown_report.go` — markdown-formatted change reports via doctor renderer
- `cmd/html_report.go` — self-contained interactive HTML reports with embedded assets
- `cmd/console.go` — launches the interactive Bubbletea terminal UI
- `cmd/flatten_report.go` — flattens hierarchical change reports into flat structures with hashed changes and normalized paths
- `cmd/report_common.go` — shared utilities: summary report creation from commits, formatted report file writing
- `git/read_local.go` — local git history extraction via git commands; commit and file content preparation
- `git/github.go` — remote file history fetching from GitHub repos via doctor GitHub service
- `html-report/generator.go` — renders self-contained HTML using embedded templates and syntax-highlighted code
- `model/report.go` — hashed change structures with SHA256 hashes and raw paths for serialization
- `tui/v2/model.go` — Bubbletea model: panels for commits, tree view, diffs, and modals

## Known Sharp Edges

- `git/read_local.go` still forces `ExcludeExtensionRefs = true`, which weakens the practical effect of `--ext-refs` on that path.
- libopenapi breaking-rule configuration is global. `cmd/engine.go` guards this with `breakingConfigMu`, but `git/read_local.go` also writes to the global config via `SetActiveBreakingRulesConfig` — if the `git` layer is ever parallelized, it needs its own guard.
- The residual `tui/` package still exists in-repo, but it is not the canonical console implementation. The canonical console is `tui/v2/` (Bubbletea).
- **Dependency version sensitivity**: `doctor` (currently `v0.0.49`) and `libopenapi` (currently `v0.34.4`) version bumps can silently change comparison output, count semantics, or tree structure. After upgrading either dependency, always re-run the petstore regression fixtures and verify counts match expectations.

## Regression Fixtures

Use these files whenever you change semantics, counts, report rendering, or UI payload shape:

- `sample-specs/petstorev3-original.json`
- `sample-specs/petstorev3.json`

These fixtures are the canonical side-by-side comparison set.

### Expected Petstore Fixture Counts

After running `summary` on the petstore fixtures, the deduplicated counts must be:

| Document Element | Total Changes | Breaking Changes |
|---|---|---|
| components | 9 | 2 |
| info | 4 | 0 |
| paths | 28 | 16 |
| tags | 1 | 0 |

**Summary totals (deduplicated):**
- 42 total changes, 18 breaking
- Additions: 12, Modifications: 20, Removals: 10
- Breaking Modifications: 8, Breaking Removals: 10

**Report JSON totals (raw, not deduplicated):**
- Components: 10 total / 3 breaking

The `report` JSON numbers are intentionally higher than `summary` because summary deduplicates by `JSONPath + property`. This difference is correct behavior, not a bug. If these counts drift after a change, the change broke semantics.

## Validation Workflow

For command or report changes:

1. Run `go test ./cmd -count=1`
2. Run `go test ./... -count=1`
3. Check help output for the affected command with `go run . <command> --help`
4. Re-run the petstore comparison for the affected command(s)

Recommended smoke checks:

- `go run . summary --no-logo --no-color sample-specs/petstorev3-original.json sample-specs/petstorev3.json`
- `go run . report sample-specs/petstorev3-original.json sample-specs/petstorev3.json`
- `go run . markdown-report --report-file /tmp/report.md sample-specs/petstorev3-original.json sample-specs/petstorev3.json`
- `go run . html-report --report-file /tmp/report.html sample-specs/petstorev3-original.json sample-specs/petstorev3.json`

## Documentation Rule

When you change behavior, update the docs in `.ai-docs/` in the same change.

At minimum, update the relevant pages for:

- command behavior
- architecture or ownership changes
- model or payload contract changes
- HTML or console UI integration changes

Do not leave migration-era language, dead package references, or stale command names in the docs.

## Style Expectations

- Prefer ASCII unless the file already uses Unicode meaningfully.
- Do not reintroduce deleted legacy command paths or reflection-based renderers.
- Keep comments short and only where they prevent confusion.

## Definition Of Done

A change is not done until:

- behavior is correct
- tests pass
- docs match the code
- the petstore regression fixture still makes sense for the affected surface
- no new split-brain contract was introduced between headline counts, visible output, and payload data

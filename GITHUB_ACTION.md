# Check API changes in a pull request

Use this Action to compare one OpenAPI root file and its local references. It
adds a compact job summary and a downloadable report artifact. It needs no
Doctor account and no pull-request write permission.

```yaml
name: API changes
on: pull_request
permissions:
  contents: read
jobs:
  api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: pb33f/openapi-changes@<FULL_COMMIT_SHA>
        with:
          spec: openapi.yaml
          base: ${{ github.event.pull_request.base.sha }}
          head: ${{ github.event.pull_request.head.sha }}
```

Replace `<FULL_COMMIT_SHA>` with a reviewed commit that contains `action.yml`.
The Action builds the CLI from that same revision, with the Go version and
modules in its `go.mod`. The first run needs time to download and compile them.
It does not build or execute code from the repository being compared.
Linux runners need git and Python 3; `ubuntu-latest` includes both.

Use `pull_request`, including for fork PRs. Do not use `pull_request_target` to
run code from a PR. Keep `contents: read` and `persist-credentials: false`.
The checkout must contain both commits. The Action does not fetch missing refs.
It compares the exact base and head, not an inferred merge base.

## Inputs

| Input | Meaning |
| --- | --- |
| `spec` | Required root specification path, relative to the repository root. |
| `base` | Required base git revision. Prefer the full commit SHA. |
| `head` | Required head git revision. Prefer the full commit SHA. |
| `breaking-rules` | Optional rules file path. Read from the base revision so a PR cannot relax its own policy. |
| `fail-on` | `breaking` (default), `changes`, or `none`. Analysis errors always fail. |
| `artifact-name` | Artifact name. Set a unique name for each matrix job or Action call. |

Keep rules in the same repository. With no `breaking-rules` input, the Action
uses engine defaults and ignores automatic config files in the checkout or home directory. Local references resolve from each selected
revision, even if a different copy exists in the checkout. Remote references are
not enabled by the Action. Missing roots or invalid specifications are analysis
errors; they are not empty reports.

## Results

The workflow job supplies the status used by branch protection. A valid breaking
comparison retains its reports before the Action fails under `fail-on: breaking`.
`fail-on: none` permits detected changes but does not permit an analysis error.

The artifact contains the compact summary, full JSON, Markdown, and HTML reports,
and comparison metadata. If there are no changes, it contains an explicit
no-change report. Analysis failures retain diagnostics instead of a clean result.
Artifacts can contain specification content; normal repository artifact access
and retention rules apply. Open downloaded HTML locally to inspect the full report.

The `outcome` output is `passed`, `policy-failed`, or `analysis-error`. Other outputs
include `base-sha`, `head-sha`, `total`, `breaking`, and `artifact-path`. Counts use
the human summary's deduplicated semantics. Existing full JSON retains its raw
count semantics. Do not compare these counts as if they were the same measure.

For workspace history, diagnostics, and pipeline controls, open
[OpenAPI Doctor](https://pb33f.io/doctor/). Sign in and use its normal repository
connection flow. This link sends no specification, repository identity, or token
to Doctor. The report is not automatically saved in a Doctor workspace.

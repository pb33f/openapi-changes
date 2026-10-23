# Compact Markdown reports

`markdown-report --compact` compares two direct inputs and writes a short report.
Inputs can be files, URLs, or git revision paths. Repository history is not
supported in this mode. `--include-diff` cannot be used with `--compact`.

Example:

```sh
openapi-changes markdown-report --compact \
  --report-file summary.md --result-file result.json \
  HEAD~1:openapi.yaml HEAD:openapi.yaml
```

The report contains the total and breaking change counts, up to eight semantic
breaking highlights from Doctor, and a link to the public Doctor page. Each
highlight is limited to 300 characters. If Doctor supplies no highlight for a
whole-object removal, the report shows its changed path and property. Spec text cannot inject Markdown links,
HTML, or mentions. Counts use the same JSONPath + property deduplication as
`summary`. Existing detailed Markdown and raw JSON reports do not change.

A successful comparison always writes the compact report, including when no
changes exist. Invalid or missing comparison documents fail; they do not produce
a clean comparison result. The command does not apply a failure policy: valid
breaking changes still exit successfully, as with the detailed Markdown report.

The optional `--result-file` requires `--compact`. It writes this JSON only after
the comparison and Markdown write succeed:

```json
{"total":42,"breaking":18}
```

Use a fresh result path for each run and require command success before reading
it. An existing result file is not deleted on failure. This small result records
completed semantic counts; it is not a replacement for the full `report` JSON.
Consumers can fail on `breaking > 0` or `total > 0` without confusing an analysis
error with a breaking change. Result and report paths must differ.

No account, upload, private repository metadata, or platform token is needed.
The Doctor link opens its normal entry page. It does not transfer reports or
open a workspace-specific comparison.

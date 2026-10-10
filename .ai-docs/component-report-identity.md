# Component identity in reports

`summary`, `markdown-report`, and `html-report` use the shared
`internal/changecounts.Deduplicate` helper for their counts and change lists.
The helper keeps one change per semantic JSONPath and property.

Doctor reports component additions and removals at `$.components`, with the
category in `property` and the component name in `new` or `original`. Before
deduplication, the helper copies these changes and sets a name-based path, such
as `$.components.schemas['Pet']`. This preserves individual entries within a
category while removing repeated occurrences of the same component change.

The HTML summary, statistics table, history chart, and standard graph change
list use this same list. The raw doctor tree remains intact for the document
view and the separate explorer graph. Machine-readable `report` output is
unchanged and retains the original engine paths.

The canonical petstore fixture still has 42 deduplicated changes, including 18
breaking changes. `cmd/component_report_test.go` covers additions and removals
across component categories through HTML, summary, and Markdown reports.

# OpenAPI and AsyncAPI comparisons

One command family supports OpenAPI and AsyncAPI 3.x. `model.ParseSpecification`
uses libopenapi's strict YAML/JSON parser once, checks the root version marker,
and transfers the parsed AsyncAPI tree to libasyncapi. Mixed formats, ambiguous
markers, unsupported AsyncAPI versions and partial AsyncAPI models fail clearly.

`cmd.runChangerator` selects doctor's native engine. Both engines return the
existing change primitives and node graph. Commands share count, flattening,
rendering, exit-code and report-file code. Native OpenAPI `Commit.Changes` remains
available; `Commit.AllChanges` selects the additive neutral report when present.

## Policy

Existing unscoped rule files remain OpenAPI-only. A combined file has optional
`openapiRules`, `asyncapiRules`, and `schemaRules` sections. The last section
configures JSON Schemas embedded in AsyncAPI; it does not change OpenAPI policy.
Unknown sections are rejected. Rules are merged into fresh defaults. The CLI's
shared breakingrules lock covers the entire delegated comparison and restores
defaults afterwards, including comparisons without a custom policy.

## Source and resource ownership

Direct file, URL and revision inputs use the same source loader for both formats.
Local revision references use GitRevisionFS. GitHub references use that virtual
filesystem with doctor's GitHub file service, pinned to the same commit SHA.
The working tree is never used to supply a historical sibling reference.

Canonical history loading retains source bytes and configuration factories.
Batch reports keep a two-document model window and reuse adjacent revisions.
Malformed predecessor inputs are bypassed; selected baseline bytes and revision
identity are preserved. Failed candidate revisions still reach the existing
warning and JSON `metaData.partial/skippedCommits` handling. A successful
unchanged pair counts as success. The console disables idle model retention;
its existing bounded result cache owns and releases each comparison pair.
The console stores only scalar total/breaking counts outside that cache. Counts
appear after a revision is visited and survive graph eviction; unvisited and
baseline-only revisions show `-`, while unchanged comparisons show zero.
Summary and console validate lazy first revisions before reporting that no prior
version exists. A malformed first revision fails instead of reporting no changes.

The JSON flattening boundary drops model-only object pointers and copies only
commit metadata. It preserves semantic paths, rawPath when normalized, and the
raw versus deduplicated count distinction. Reports add a `specification` object
with `kind`, `originalVersion`, and `modifiedVersion`; direct reports continue
to omit synthetic git metadata. HTML items have the same additive metadata and
retain the unpruned graph for the document and explorer views.

The shared UI renders native AsyncAPI document labels and send/receive actions.
Action badges use primary blue for send and success green for receive, following
the selected theme in the document tree, explorer, and detail views.
Channels use hash icons in the document tree and explorer. Icons are embedded
in the offline report bundle; the UI dependency is pinned to a reviewed Git
commit until the corresponding package release.

HTML and Markdown use doctor's native AsyncAPI report traversal with the same
section levels, object headings, separators and change formatting as OpenAPI.
Channels also use the hash icon in the report statistics. JSONPaths remain
machine identities; the human report uses object names and nested message,
payload, variable, tag and example labels.

Both serialized graphs include parent-child edges with stable IDs. The explorer
filters those edges with its changed-node tree, so every retained child stays
connected. Reference edges preserve authored targets. Shared definition edits
appear once in node timelines and detail rows; distinct edits to a property
remain visible. The native machine-readable change list remains raw.

## Verification

Keep the canonical petstore totals unchanged: summary 42 changes / 18 breaking;
components summary 9/2 and raw JSON 10/3. Run cmd and full Go suites, race checks
on dispatch/policy/history, and command smoke checks. Compare
`BenchmarkOpenAPIReport` against the base branch with the same Go toolchain and
hardware; use `-benchmem` and multiple samples. The model-window test verifies
that 30 adjacent revisions parse once each and retain at most two idle models.

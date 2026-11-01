# OpenAPI and AsyncAPI comparisons

One command family supports OpenAPI and AsyncAPI 3.x. `model.ParseSpecification`
uses libopenapi's strict YAML/JSON parser once, checks the root version marker,
and transfers the parsed AsyncAPI tree to libasyncapi. Mixed formats, ambiguous
markers, unsupported AsyncAPI versions and partial AsyncAPI models fail clearly.

The stack uses libopenapi v0.42.3. Its default YAML alias expansion limit remains
enabled for both formats. Excessive alias expansion fails during loading; normal
aliases retain bounded HTML previews. Doctor tests opt in to trusted excessive
aliases through libasyncapi to exercise graph bounds independently of this limit.

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
Action badges use `--primary-color` for send and `--terminal-text` for receive,
matching the method badge palette, with vertically centered badges and spaced labels in the
document tree, explorer, and detail views. Cowboy's shared external
`native-labels.css.ts` supplies these rules in each component's shadow root,
using Cowboy palette tokens directly instead of inline Shoelace color overrides.
Channels use hash icons in the document tree and explorer. Icons are embedded
in the offline report bundle. The UI pins the public Cowboy Components 0.16.0
package; installation does not require private Git repository access.

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

Change-view card dimensions include the header, changed child rows and extension
metadata. Change-count badges remain below the card; they do not add an empty
body row or widen child rows. Operation widths include native action labels.
Change-view rows center icons, chevrons, badges and labels within each 25px row.
Extension counts remain right-aligned; change annotations align with the card's
left edge in both regular Doctor and change views.
SVG node wrappers permit decoration overflow so selected borders do not clip
the annotation badges or active arrow. The explorer viewport remains clipped.

## Build runtime

CI and publication read Node 26.13.0 from the root `.nvmrc`, matching Cowboy
Components. The Docker UI builder pins the same version in its Node image.
The report UI lockfile retains its Mermaid, UUID, and KaTeX
overrides; dependency overrides in Cowboy do not propagate to consumers.
Rebuild both embedded bundles whenever the Cowboy pin or build dependencies
change. Use the locked public npm package when rebuilding these assets.

## Verification

Keep the canonical petstore totals unchanged: summary 45 changes / 19 breaking;
components 10/3 in both summary and raw JSON. Run cmd and full Go suites, race checks
on dispatch/policy/history, and command smoke checks. Compare
`BenchmarkOpenAPIReport` against the base branch with the same Go toolchain and
hardware; use `-benchmem` and multiple samples. The model-window test verifies
that 30 adjacent revisions parse once each and retain at most two idle models.

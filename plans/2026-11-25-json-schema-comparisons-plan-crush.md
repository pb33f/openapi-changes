<!--
Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
SPDX-License-Identifier: Apache-2.0
-->

# Plan-crush review of native JSON Schema comparisons

This review challenged the first draft's single-schema path, collection matching, and release order against the dependencies selected by CLI `f9f73e7`. The [implementation plan](2026-11-25-json-schema-comparisons.md) incorporates the findings below.

## [P1] Standalone breaking rules can change existing API reports

The single-schema draft extended `CompareSchemas` with new compatibility defaults. AsyncAPI calls that function for embedded schemas. A direct probe also showed that the existing comparator marks both boolean transitions as breaking, misses a rename of `$anchor`, and misses an edit or addition confined to unreferenced `$defs`. The low model already reads and hashes both keywords. A global policy change would affect existing users and still leave the missing traversal. [Shared entry point](https://github.com/pb33f/libopenapi/blob/db27aae96380883740653c3658a79b4110ea35ff/what-changed/model/schema.go#L415) and [AsyncAPI caller](https://github.com/pb33f/libasyncapi/blob/v0.0.7/what-changed/model/schema.go#L15)

Add a standalone entry to the same comparator, expose the missing edits there, and carry explicit overrides into it. The existing API entry keeps its contract. Prove directional defaults with both boolean transitions, an isolated string bound, a negation case, and an annotation. Prove address changes with an unused definition and an anchor. Run embedded API cases with and without overrides. Confidence is high for the observed gaps. Composition behavior needs its own fixtures before a directional rule applies.

## [P1] Two independent definitions can become one edit

The collection draft retained the resource name for display but did not require it in count or hash identity. I constructed two native changes with equal paths, coordinates, old and new values, and different `context.document` values. Doctor returned **one** after deduplication. The CLI produced **identical hashes**. Its human counter also uses file position only when the path is empty. A display label cannot repair records that have already collapsed. [Doctor edit key](https://github.com/pb33f/doctor/blob/v0.0.88/changerator/renderer/asyncapi_report.go#L130), [CLI edit key](../internal/changecounts/deduplicate.go), and [hash input](../model/report.go#L52)

Carry the owning `schemaResource` with each native edit. Use it in the schema count key, graph node ID, hash, and sort, with the path relative to that resource. Verify two independent edits yield two counts and hashes, while two uses of one changed definition yield one human edit and two reference edges. This preserves the raw machine report and avoids a second deduplication pass. Confidence is high from the reproduced collision.

## [P1] First-wins ID registration can select the wrong target

The collection draft relied on Rolodex registration to reject an ambiguous collection. I registered distinct origins with the same resolved `$id` through `RegisterSchemaId`. Both calls returned success, and lookup retained the first origin. By the time the public registry is enumerated, the other declaration has been lost. [Registration result](https://github.com/pb33f/libopenapi/blob/db27aae96380883740653c3658a79b4110ea35ff/index/schema_id_registry.go#L18) and [public registration](https://github.com/pb33f/libopenapi/blob/db27aae96380883740653c3658a79b4110ea35ff/index/spec_index_accessors.go#L381)

Surface the duplicate outcome at registration for schema comparisons. Reuse the index for lookup. Treat a second visit to the same authored declaration as one origin. Register all declared resources on a side before resolving its references. Reverse enumeration order and require the same two-origin diagnostic. Also verify a forward reference to a local canonical ID with network lookup disabled. Confidence is high from the registration probe.

## [P1] A rendered change list does not supply an interactive tree

The single-schema draft connected `SchemaChanges` to the renderer. In a probe, Doctor produced Markdown and HTML for a newly required `Customer.id` and Diagramatron drew the Customer class. The native edit's path was empty. Doctor's `BuildNodeChangeTree` returns immediately when a neutral `ChangeReport` is set. The CLI explorer also filters out edges whose endpoints were dropped. [Native tree handling](https://github.com/pb33f/doctor/blob/v0.0.88/changerator/cleaner.go#L63), [working AsyncAPI adapter](https://github.com/pb33f/doctor/blob/v0.0.88/changerator/asyncapi.go#L37), and [explorer construction](../html-report/generator.go)

Have Doctor attach edits to a prepared native node tree before invoking existing renderers. Keep authored reference edges and original-side removals. For collections, retain each immediate use site of a changed definition and its ancestors when selecting explorer nodes. Verify connected graph endpoints, navigation from both uses, and one edit on the defining node. Confidence is high for the code paths. The new interactive behavior remains a milestone test.

## [P1] A line number can open the wrong file

The source-navigation draft carried a resource name alongside a path. The existing HTML item supplies one original string and one modified string, its graph line map is keyed by line alone, and the terminal source helper declines any change with an external document location. Two schemas in one file can also share source bytes. A copy of the whole source per node would multiply payload size without resolving which side owns a removal. [HTML source contract](../html-report/generator.go#L87), [console lookup](../tui/v2/diff.go#L47), and [Cowboy focused diff](https://github.com/pb33f/cowboy-components/blob/v0.16.0/src/components/diff-viewer/diff-focus.ts#L45)

Introduce file selection in milestone 1 when a single root first reaches a sibling. Store source text once per file and side and use that same lookup for collections. Verify different files at the same line, a stable-ID move with an edit, and a deletion available only on the original side. Open the HTML offline and drive the console code view. Confidence is high for the current limitation.

## [P2] Directory dispatch differs by command

The directory draft added collection loading at the shared CLI loader. The JSON command has a separate directory-to-history branch. Compact Markdown rejects a directory before loading it. Summary and console also inspect the first argument to choose their empty-history message. Implementing collection routing at only one site would give different meanings to the same two paths. [Shared loader](../cmd/common.go#L227), [JSON route](../cmd/report.go#L252), [compact validation](../cmd/markdown_report.go#L238), [summary](../cmd/summary.go#L496), and [console](../cmd/console.go#L100)

Use one argument-mode decision across these sites. Two local directories under `--schema` select a collection. A repository and file select named-file history. Verify all five normal commands, compact Markdown, two empty collections, and the existing history syntax. Confidence is high from inspection of all five directory checks.

## Crushed plan

1. Deliver the `Customer` fixture through the five public commands. Reuse the comparator, index, renderer, and UI. Add only schema input, scoped compatibility, native edit locations, and source selection. This removes the need for an API envelope, a comparison registry, or separate report implementations.
2. After that gate, add per-side member discovery and matching. Put each edit on its definition and retain its incoming references. Accept the collection stage only when the shared-Money and independent-edit fixtures both pass.
3. Keep the initial scope to Draft 2020-12, named-file history, and explicit local directory pairs. Additional dialects, directory history, and a general schema-containment solver have separate requirements.

The existing Petstore count, AsyncAPI reports, external references, graph connectivity, partial history, and reproducible JSON tests passed on the CLI baseline. The same six focused tests passed with an isolated libopenapi `v0.44.0` pin. That checks a dependency integration risk. The two milestone gates are future implementation work.

# Lightweight PR checks

The GitHub Action compares one root specification at two explicit git revisions.
It reuses the CLI and its Doctor comparison engine. It adds no hosted service.
Doctor remains the destination for workspaces, diagnostics, and pipeline controls.

## Implementation plan and boundary

1. Add opt-in compact Markdown over the existing comparison result. Use semantic
   counts and Doctor highlights. Keep current report defaults unchanged.
2. Package revision comparison, job summary, full artifacts, and policy evaluation
   as one Action. Resolve refs once and use those SHAs for every report.
3. Link to the existing Doctor entry page. Do not upload specifications to Doctor.
4. Test valid, invalid, unchanged, breaking, and referenced-file changes. Review
   the change independently before publication.

The plan review removed a separate GitHub App, comment service, hosted viewer,
account system, and transfer API. The workflow job provides the check status.
The compact result file separates completed analysis from a command error;
exit code 1 alone cannot identify a breaking change.

Shared-engine contextual rules, stable finding IDs, scoped exceptions, and new
report formats remain a separate release. This release does not claim oasdiff
rule parity. Existing CLI semantics and petstore regression counts must hold.

## Ownership and verification

`cmd/compact_report.go` owns compact presentation using existing shared counts
and Doctor highlights. `action/compare.py` owns git revision selection, command
orchestration, artifact paths, and policy. It does not classify API changes.
`action.yml` builds the CLI from the pinned Action source, uploads artifacts, and
applies the recorded outcome. Compilation adds setup time; it avoids a separate
CLI version that could drift from the Action interface.

The integration tests run the real CLI against synthetic git history. The Action
workflow runs the complete composite Action with read-only repository permission.
It checks both the report outcome and the Action step status. A read-only CI run
is not proof of a separately opened fork PR or authenticated Doctor onboarding.
No platform services or account data are changed by these tests.

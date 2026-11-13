<!-- Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley -->

# Recover a failed release

Open the Tag Release run for the release commit. If the tag was pushed and
the dispatch failed, check for a Publish run for that version before retrying.
Check that the release tag and the current head of `main` point to the same
commit. Publish checks out the commit from the dispatch event.

If the commits match and Publish has not started, dispatch the existing tag
once. For example, for `v0.4.2`:

```sh
gh api repos/pb33f/openapi-changes/dispatches \
  -f event_type=publish-event \
  -f 'client_payload[new-tag]=v0.4.2' \
  -f 'client_payload[release-notes]='
```

If Publish has already started, use its job logs. When Apple returns
`FORBIDDEN.REQUIRED_AGREEMENTS_MISSING_OR_EXPIRED`, the Apple Developer
Account Holder must review the pending agreement. After the agreement is in
effect, retry the failed jobs in the original Publish run:

```sh
gh run rerun RUN_ID --failed --repo pb33f/openapi-changes
```

This retries GoReleaser and the dependent npm job. A successful Docker job
keeps its original result.

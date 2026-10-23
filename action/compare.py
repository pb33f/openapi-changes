#!/usr/bin/env python3
"""Compare committed specifications without running code from the target repository."""

import html
import json
import os
from pathlib import Path, PurePosixPath
import re
import subprocess
import tempfile


def repository_path(value):
    """Accept only a relative Git tree path with no traversal or control bytes."""
    path = PurePosixPath(value)
    if (not value or value.startswith(('/', '-')) or '\\' in value or ':' in value
            or any(ord(c) < 32 or ord(c) == 127 for c in value)
            or any(part in ('', '.', '..') for part in value.split('/'))
            or path.is_absolute()):
        raise ValueError('expected a repository-relative file path')
    return value


def resolve_ref(ref, workspace):
    """Resolve a literal ref name or SHA, never Git revision expressions."""
    if not re.fullmatch(r'[A-Za-z0-9_][A-Za-z0-9_./-]*', ref):
        raise ValueError('expected a ref name or commit SHA')
    result = subprocess.run(
        ['git', 'rev-parse', '--verify', '--end-of-options', ref + '^{commit}'],
        cwd=workspace, capture_output=True, check=True, text=True)
    sha = result.stdout.strip()
    if not re.fullmatch(r'[0-9a-f]{40}|[0-9a-f]{64}', sha):
        raise ValueError('git did not return a commit SHA')
    return sha


def compare(directory, workspace, binary):
    """Write reports and return a policy outcome only after all reports succeed."""
    spec = repository_path(os.environ.get('INPUT_SPEC', ''))
    policy = os.environ.get('INPUT_FAIL_ON', 'breaking')
    if policy not in ('breaking', 'changes', 'none'):
        raise ValueError('fail-on must be breaking, changes, or none')
    base = resolve_ref(os.environ.get('INPUT_BASE', ''), workspace)
    head = resolve_ref(os.environ.get('INPUT_HEAD', ''), workspace)
    metadata = {'base': base, 'head': head, 'spec': spec, 'failOn': policy}
    (directory / 'comparison.json').write_text(json.dumps(metadata, indent=2) + '\n')
    common = ['--no-logo', '--no-color', '--remote=false']
    config_path = directory / 'breaking-rules.yaml'
    config_path.write_text('{}\n')
    common += ['--config', str(config_path)]
    rules = os.environ.get('INPUT_BREAKING_RULES', '')
    if rules:
        rules = repository_path(rules)
        config = subprocess.run(['git', 'show', base + ':' + rules], cwd=workspace,
                                capture_output=True, check=True)
        config_path.write_bytes(config.stdout)
    sources = [base + ':' + spec, head + ':' + spec]

    def run(command, flags, output=None):
        with (directory / 'analysis.log').open('ab') as log:
            if output is None:
                subprocess.run([binary, command, *common, *flags, *sources],
                               cwd=workspace, stdout=log, stderr=log, check=True)
            else:
                with output.open('wb') as stream:
                    subprocess.run([binary, command, *common, *flags, *sources],
                                   cwd=workspace, stdout=stream, stderr=log, check=True)

    run('markdown-report', ['--compact', '--report-file', str(directory / 'summary.md'),
                            '--result-file', str(directory / 'result.json')])
    result = json.loads((directory / 'result.json').read_text())
    total, breaking = result['total'], result['breaking']
    if (type(total) is not int or type(breaking) is not int
            or not 0 <= breaking <= total):
        raise ValueError('invalid comparison result counts')
    run('report', ['--reproducible'], directory / 'report.json')
    # Parse the artifact before declaring the run valid.
    json.loads((directory / 'report.json').read_text())
    run('markdown-report', ['--report-file', str(directory / 'report.md')])
    run('html-report', ['--report-file', str(directory / 'report.html')])
    for name in ('report.md', 'report.html'):
        if not (directory / name).is_file():
            if total:
                raise ValueError('a report was not written')
            content = 'No changes found.\n'
            if name.endswith('.html'):
                content = '<!doctype html><html lang="en"><meta charset="utf-8"><title>OpenAPI changes</title><body><p>No changes found.</p></body></html>\n'
            (directory / name).write_text(content)
    failed = (policy == 'breaking' and breaking > 0) or (policy == 'changes' and total > 0)
    outcome = 'policy-failed' if failed else 'passed'
    with (directory / 'summary.md').open('a') as summary:
        summary.write('\n### Comparison\n\n'
                      f'- Base: `{base}`\n- Head: `{head}`\n'
                      f'- Specification: <code>{html.escape(spec)}</code>\n'
                      f'- Policy: `{policy}`\n- Result: `{outcome}`\n')
    return {'outcome': outcome, 'base-sha': base, 'head-sha': head,
            'total': total, 'breaking': breaking}


def main():
    directory = Path(tempfile.mkdtemp(prefix='openapi-changes-', dir=os.environ['RUNNER_TEMP']))
    outputs = {'artifact-path': str(directory), 'outcome': 'analysis-error'}
    try:
        outputs.update(compare(directory, os.environ['GITHUB_WORKSPACE'],
                               os.environ['OPENAPI_CHANGES_BINARY']))
    except (OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError) as error:
        # Never send untrusted CLI output or Git errors to the workflow log.
        with (directory / 'analysis.log').open('a') as log:
            log.write(f'\n{type(error).__name__}: {error}\n')
            if isinstance(error, subprocess.CalledProcessError) and error.stderr:
                diagnostic = error.stderr
                if isinstance(diagnostic, bytes):
                    diagnostic = diagnostic.decode('utf-8', errors='replace')
                log.write(diagnostic)
        (directory / 'summary.md').write_text(
            '## OpenAPI changes\n\nAnalysis failed. Download the report artifact for diagnostics.\n'
            'No policy result is available.\n')
        metadata_file = directory / 'comparison.json'
        if metadata_file.is_file():
            metadata = json.loads(metadata_file.read_text())
            outputs.update({'base-sha': metadata['base'], 'head-sha': metadata['head']})
            with (directory / 'summary.md').open('a') as summary:
                summary.write(f'\n- Base: `{metadata["base"]}`\n'
                              f'- Head: `{metadata["head"]}`\n')
    (directory / 'outcome.json').write_text(json.dumps(outputs, indent=2) + '\n')
    with open(os.environ['GITHUB_OUTPUT'], 'a') as output:
        for key, value in outputs.items():
            output.write(f'{key}={value}\n')
    with open(os.environ['GITHUB_STEP_SUMMARY'], 'a') as summary:
        summary.write((directory / 'summary.md').read_text())


if __name__ == '__main__':
    main()

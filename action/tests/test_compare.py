"""Exercise the Action runner with real git revisions and the built CLI."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / 'action' / 'compare.py'
SPEC = '''openapi: 3.0.3
info:
  title: Synthetic Action API
  version: 1.0.0
paths:
  /pets:
    get:
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: './schema.yaml'
'''


def git(repo, *args):
    return subprocess.check_output(['git', '-C', str(repo), *args], text=True).strip()


def fixture(repo, case, prefix=''):
    """Create two fixture commits; leave an unrelated dirty sibling on disk."""
    directory = repo / prefix
    directory.mkdir(parents=True, exist_ok=True)
    git(repo, 'config', 'user.name', 'Action fixture')
    git(repo, 'config', 'user.email', 'fixture@example.invalid')
    (directory / 'openapi.yaml').write_text(SPEC)
    (directory / 'schema.yaml').write_text('type: string\n')
    git(repo, 'add', '--', str(directory / 'openapi.yaml'), str(directory / 'schema.yaml'))
    (repo / 'rules.yaml').write_text('schema:\n  type:\n    modified: true\n')
    git(repo, 'add', 'rules.yaml')
    git(repo, 'commit', '-qm', 'Fixture base')
    base = git(repo, 'rev-parse', 'HEAD')
    if case == 'permitted':
        (directory / 'openapi.yaml').write_text(SPEC.replace('version: 1.0.0', 'version: 1.1.0'))
    elif case == 'breaking':
        (directory / 'openapi.yaml').write_text(SPEC[:SPEC.index('paths:')] + 'paths: {}\n')
    elif case == 'invalid':
        (directory / 'openapi.yaml').write_text('openapi: [broken\n')
    elif case == 'missing-reference':
        (directory / 'openapi.yaml').write_text(SPEC.replace('./schema.yaml', './missing.yaml'))
    elif case == 'remote-reference':
        (directory / 'openapi.yaml').write_text(SPEC.replace('./schema.yaml', 'https://example.invalid/schema.yaml'))
    elif case in ('reference', 'rules'):
        (directory / 'schema.yaml').write_text('type: integer\n')
    elif case != 'unchanged':
        raise ValueError(case)
    git(repo, 'add', '--', str(directory / 'openapi.yaml'), str(directory / 'schema.yaml'))
    (repo / 'rules.yaml').write_text('schema:\n  type:\n    modified: false\n')
    git(repo, 'add', 'rules.yaml')
    git(repo, 'commit', '--allow-empty', '-qm', 'Fixture head')
    head = git(repo, 'rev-parse', 'HEAD')
    (directory / 'schema.yaml').write_text('not: [valid\n')
    (repo / 'changes-rules.yaml').write_text('schema:\n  type:\n    modified: false\n')
    return base, head


@unittest.skipUnless(os.environ.get('OPENAPI_CHANGES_BINARY'), 'Set OPENAPI_CHANGES_BINARY to the built CLI')
class CompareIntegration(unittest.TestCase):
    def run_case(self, case, policy='breaking', **overrides):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        directory = Path(temporary.name)
        repo = directory / 'repo'
        repo.mkdir()
        git(repo, 'init', '-q')
        base, head = fixture(repo, case)
        output, summary = directory / 'output', directory / 'summary'
        env = dict(os.environ, GITHUB_WORKSPACE=str(repo), RUNNER_TEMP=str(directory),
                   GITHUB_OUTPUT=str(output), GITHUB_STEP_SUMMARY=str(summary),
                   INPUT_SPEC='openapi.yaml', INPUT_BASE=base, INPUT_HEAD=head,
                   INPUT_BREAKING_RULES='', INPUT_FAIL_ON=policy)
        env.update(overrides)
        completed = subprocess.run([sys.executable, str(SCRIPT)], env=env, capture_output=True, text=True)
        self.assertEqual(completed.returncode, 0, completed.stderr + completed.stdout)
        outputs = dict(line.split('=', 1) for line in output.read_text().splitlines())
        return outputs, summary.read_text(), base, head

    def test_analysis_and_policy(self):
        for case, expected in [('unchanged', 'passed'), ('permitted', 'passed'),
                               ('breaking', 'policy-failed'), ('reference', 'policy-failed'),
                               ('invalid', 'analysis-error')]:
            with self.subTest(case=case):
                outputs, summary, base, head = self.run_case(case)
                self.assertEqual(outputs['outcome'], expected)
                self.assertIn(base, summary)
                self.assertIn(head, summary)
                artifacts = Path(outputs['artifact-path'])
                if expected != 'analysis-error':
                    if case in ('breaking', 'reference'):
                        self.assertIn('### Breaking highlights', summary)
                        self.assertIn('pets', summary)
                    self.assertTrue((artifacts / 'report.json').is_file())
                    json.loads((artifacts / 'report.json').read_text())
                    self.assertIn('https://pb33f.io/doctor/', summary)
                    self.assertTrue((artifacts / 'report.html').is_file())
                    self.assertTrue((artifacts / 'report.md').is_file())
                    self.assertEqual(outputs['base-sha'], base)
                    self.assertEqual(outputs['head-sha'], head)
                else:
                    self.assertNotIn('No changes found', summary)

    def test_policy_none_does_not_hide_analysis_errors(self):
        for case, expected in [('breaking', 'passed'), ('invalid', 'analysis-error')]:
            with self.subTest(case=case):
                self.assertEqual(self.run_case(case, 'none')[0]['outcome'], expected)

    def test_rules_are_read_from_base(self):
        outputs = self.run_case('rules', INPUT_BREAKING_RULES='rules.yaml')[0]
        self.assertEqual(outputs['outcome'], 'policy-failed')
        rules = Path(outputs['artifact-path']) / 'breaking-rules.yaml'
        self.assertIn('modified: true', rules.read_text())

    def test_unresolved_references_fail_analysis(self):
        for case in ('missing-reference', 'remote-reference'):
            with self.subTest(case=case):
                self.assertEqual(self.run_case(case)[0]['outcome'], 'analysis-error')

    def test_all_changes_policy(self):
        self.assertEqual(self.run_case('permitted', 'changes')[0]['outcome'], 'policy-failed')

    def test_invalid_inputs_fail_closed(self):
        for overrides in [{'INPUT_SPEC': '../openapi.yaml'}, {'INPUT_BASE': '--help'},
                          {'INPUT_HEAD': 'missing'}, {'INPUT_FAIL_ON': 'typo'},
                          {'INPUT_SPEC': 'openapi.yaml\nspoof=true'}]:
            with self.subTest(overrides=overrides):
                self.assertEqual(self.run_case('unchanged', **overrides)[0]['outcome'], 'analysis-error')


if __name__ == '__main__':
    if len(sys.argv) == 3 and sys.argv[1] == '--fixture':
        base, head = fixture(Path.cwd(), sys.argv[2], '.action-fixtures')
        with open(os.environ['GITHUB_OUTPUT'], 'a') as output:
            output.write(f'base={base}\nhead={head}\n')
    else:
        unittest.main()

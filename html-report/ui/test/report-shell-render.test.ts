import { describe, it, expect } from 'vitest';
import { createMinimalPayload, createMultiCommitPayload } from './fixtures.js';

import '../src/components/report-shell-lite.js';

type ShellElement = HTMLElement & {
    data: any;
    activeItemIndex: number;
    selectedDiffChanges: any[];
    updateComplete: Promise<boolean>;
};

function injectPayload(payload: any): void {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.id = 'report-data';
    script.textContent = JSON.stringify(payload);
    document.body.appendChild(script);
}

async function createShell(payload: any): Promise<ShellElement> {
    injectPayload(payload);
    const el = document.createElement('openapi-changes-report') as ShellElement;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
}

function queryAll(el: ShellElement, selector: string): Element[] {
    return Array.from(el.shadowRoot!.querySelectorAll(selector));
}

function queryOne(el: ShellElement, selector: string): Element | null {
    return el.shadowRoot!.querySelector(selector);
}

function tabTexts(el: ShellElement): string[] {
    return queryAll(el, 'sl-tab[slot="nav"]').map(t => t.textContent!.trim());
}

describe('ReportShellLite render structure', () => {
    describe('single-item mode', () => {
        it('renders correct tab labels', async () => {
            const el = await createShell(createMinimalPayload());
            const tabs = tabTexts(el);

            // single-commit: "Change Report" (combined overview), "Changed Items", "Change List", "View Diff"
            expect(tabs).toContain('Change Report');
            expect(tabs).toContain('Changed Items');
            expect(tabs).toContain('Change List');
            expect(tabs).toContain('View Diff');
            // should NOT have separate "Overview" in single commit mode
            expect(tabs).not.toContain('Overview');
        });

        it('does not render timeline panel', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, '.timeline-scroll-container')).toBeNull();
        });

        it('renders model tree in navigator', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, '.navigator-panel pb33f-model-tree')).not.toBeNull();
        });

        it('renders split panel layout', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, 'sl-split-panel')).not.toBeNull();
            expect(queryOne(el, '.navigator-panel')).not.toBeNull();
            expect(queryOne(el, '.main-content')).not.toBeNull();
        });

        it('renders diff viewer', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, 'pb33f-diff-viewer')).not.toBeNull();
        });

        it('renders combined report with summary in single-commit overview', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, '.combined-report')).not.toBeNull();
            expect(queryOne(el, '.change-summary')).not.toBeNull();
        });
    });

    describe('multi-commit mode', () => {
        it('renders "Overview" and "Change Report" as separate tabs', async () => {
            const el = await createShell(createMultiCommitPayload(3));
            const tabs = tabTexts(el);

            expect(tabs).toContain('Overview');
            expect(tabs).toContain('Change Report');
        });

        it('renders timeline with correct number of items', async () => {
            const el = await createShell(createMultiCommitPayload(3));
            const timelineItems = queryAll(el, 'pb33f-timeline-item');
            expect(timelineItems).toHaveLength(3);
        });

        it('renders commit info in overview', async () => {
            const el = await createShell(createMultiCommitPayload(2));
            expect(queryOne(el, '.commit-hash')).not.toBeNull();
            expect(queryOne(el, '.commit-message')).not.toBeNull();
        });

        it('renders history chart when changeData is present', async () => {
            const el = await createShell(createMultiCommitPayload(3));
            expect(queryOne(el, '.history-section')).not.toBeNull();
            expect(queryOne(el, '.history-section pb33f-chart')).not.toBeNull();
        });

        it('marks first timeline item as selected by default', async () => {
            const el = await createShell(createMultiCommitPayload(3));
            const items = queryAll(el, 'pb33f-timeline-item');
            expect(items[0].classList.contains('selected')).toBe(true);
            expect(items[1].classList.contains('selected')).toBe(false);
        });
    });

    describe('no history chart for single commit', () => {
        it('does not render .history-section', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, '.history-section')).toBeNull();
        });
    });

    describe('breaking changes doughnut', () => {
        it('renders two doughnut charts when breakingChanges > 0', async () => {
            const payload = createMinimalPayload();
            payload.items[0].summary.breakingChanges = 2;
            const el = await createShell(payload);
            const doughnuts = queryAll(el, 'pb33f-doughnut-chart');
            expect(doughnuts).toHaveLength(2);
        });

        it('renders one doughnut chart when breakingChanges is 0', async () => {
            const payload = createMinimalPayload();
            payload.items[0].summary.breakingChanges = 0;
            const el = await createShell(payload);
            const doughnuts = queryAll(el, 'pb33f-doughnut-chart');
            expect(doughnuts).toHaveLength(1);
        });
    });

    describe('header and footer', () => {
        it('renders header with theme switcher', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, 'pb33f-header')).not.toBeNull();
            expect(queryOne(el, 'pb33f-theme-switcher')).not.toBeNull();
        });

        it('renders footer with generated date', async () => {
            const el = await createShell(createMinimalPayload());
            const footer = queryOne(el, 'pb33f-footer');
            expect(footer).not.toBeNull();
        });

        it('renders app version when present', async () => {
            const payload = createMinimalPayload({ appVersion: '1.2.3' } as any);
            const el = await createShell(payload);
            const version = queryOne(el, '.header-version');
            expect(version).not.toBeNull();
            expect(version!.textContent).toContain('1.2.3');
        });
    });

    describe('spec paths', () => {
        it('renders spec paths when originalPath and modifiedPath are set', async () => {
            const payload = createMinimalPayload({
                originalPath: '/old/spec.yaml',
                modifiedPath: '/new/spec.yaml',
            } as any);
            const el = await createShell(payload);
            const paths = queryOne(el, '.spec-paths');
            expect(paths).not.toBeNull();
        });

        it('omits spec paths when not set', async () => {
            const el = await createShell(createMinimalPayload());
            expect(queryOne(el, '.spec-paths')).toBeNull();
        });
    });
});

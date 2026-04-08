import { describe, it, expect, vi } from 'vitest';
import { createMinimalPayload, createMultiCommitPayload, createMinimalNode, createMinimalChange } from './fixtures.js';

import '../src/components/report-shell-lite.js';

type ShellElement = HTMLElement & {
    data: any;
    activeItemIndex: number;
    error: string;
    selectedDiffChanges: any[];
    selectedNodeId: string | null;
    selectedNodeChanges: any[];
    activeMainTab: string;
    _changeDataset: any[];
    _breakingDataset: any[];
    _graphNodeMap: Map<string, any>;
    updateComplete: Promise<boolean>;
    selectItem(index: number): void;
    selectNode(nodeId: string): void;
    navigateToDiffForChanges(changes: any[]): void;
    mainTabGroup: any;
};

function injectPayload(payload: any): void {
    const script = document.createElement('script');
    script.type = 'application/json';
    script.id = 'report-data';
    script.textContent = JSON.stringify(payload);
    document.body.appendChild(script);
}

async function createShell(payload?: any): Promise<ShellElement> {
    if (payload) injectPayload(payload);
    const el = document.createElement('openapi-changes-report') as ShellElement;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
}

describe('ReportShellLite state management', () => {
    describe('activeItem getter', () => {
        it('returns items[activeItemIndex]', async () => {
            const payload = createMultiCommitPayload(3);
            const el = await createShell(payload);

            const item = (el as any).activeItem;
            expect(item).not.toBeNull();
            expect(item.changeId).toBe('change-0');
        });

        it('returns null when items is empty', async () => {
            const payload = createMinimalPayload({ items: [] });
            const el = await createShell(payload);
            expect((el as any).activeItem).toBeNull();
        });

        it('returns null when data is null', async () => {
            const el = await createShell();
            expect((el as any).activeItem).toBeNull();
        });
    });

    describe('isMultiCommit getter', () => {
        it('returns false for single item', async () => {
            const el = await createShell(createMinimalPayload());
            expect((el as any).isMultiCommit).toBe(false);
        });

        it('returns true for multiple items', async () => {
            const el = await createShell(createMultiCommitPayload(2));
            expect((el as any).isMultiCommit).toBe(true);
        });

        it('returns false when data is null', async () => {
            const el = await createShell();
            expect((el as any).isMultiCommit).toBe(false);
        });
    });

    describe('selectItem()', () => {
        it('sets activeItemIndex and clears selections', async () => {
            const payload = createMultiCommitPayload(3);
            const el = await createShell(payload);

            // first set some selection state
            (el as any).selectedDiffChanges = [createMinimalChange()];
            (el as any).selectedNodeId = 'some-node';
            (el as any).selectedNodeChanges = [createMinimalChange()];

            (el as any).selectItem(2);

            expect(el.activeItemIndex).toBe(2);
            expect(el.selectedDiffChanges).toEqual([]);
            expect(el.selectedNodeId).toBeNull();
            expect(el.selectedNodeChanges).toEqual([]);
        });
    });

    describe('selectNode()', () => {
        it('populates changes from graph node map', async () => {
            const el = await createShell(createMinimalPayload());
            const changes = [createMinimalChange({ property: 'title' })];
            const node = createMinimalNode('test-node', { timeline: changes });

            // manually populate the graph node map
            (el as any)._graphNodeMap = new Map([['test-node', node]]);

            (el as any).selectNode('test-node');

            expect(el.selectedNodeId).toBe('test-node');
            expect(el.selectedNodeChanges).toEqual(changes);
            expect(el.selectedDiffChanges).toEqual(changes);
        });

        it('clears changes for unknown node id', async () => {
            const el = await createShell(createMinimalPayload());
            (el as any)._graphNodeMap = new Map();

            (el as any).selectNode('nonexistent');

            expect(el.selectedNodeId).toBe('nonexistent');
            expect(el.selectedNodeChanges).toEqual([]);
            expect(el.selectedDiffChanges).toEqual([]);
        });
    });

    describe('updateChartData()', () => {
        it('populates chart datasets from item summary', async () => {
            const payload = createMinimalPayload();
            payload.items[0].summary = {
                ...payload.items[0].summary,
                totalChanges: 10,
                breakingChanges: 3,
                additions: 4,
                removals: 2,
                modifications: 4,
            };
            const el = await createShell(payload);

            // willUpdate should have run and populated datasets
            const changeDs = (el as any)._changeDataset;
            expect(changeDs).toHaveLength(1);
            expect(changeDs[0].data).toEqual([4, 4, 2]); // modifications, additions, removals

            const breakingDs = (el as any)._breakingDataset;
            expect(breakingDs).toHaveLength(1);
            expect(breakingDs[0].data).toEqual([3, 7]); // breaking, non-breaking
        });

        it('caches and skips recomputation for same data and index', async () => {
            const el = await createShell(createMinimalPayload());

            const firstRef = (el as any)._changeDataset;

            // trigger willUpdate with same data+index by requesting update
            (el as any).requestUpdate();
            await el.updateComplete;

            // same references mean it was cached
            expect((el as any)._changeDataset).toBe(firstRef);
        });
    });

    describe('navigateToDiffForChanges()', () => {
        it('sets selectedDiffChanges and calls mainTabGroup.show', async () => {
            const el = await createShell(createMinimalPayload());
            await el.updateComplete;

            // spy on the real queried sl-tab-group element's show method
            const tabGroup = el.shadowRoot!.querySelector('.tab-content > sl-tab-group') as any;
            if (tabGroup) {
                const showSpy = vi.spyOn(tabGroup, 'show');

                const changes = [createMinimalChange()];
                (el as any).navigateToDiffForChanges(changes);

                expect(el.selectedDiffChanges).toHaveLength(1);
                expect(el.selectedDiffChanges[0]).toEqual(changes[0]);
                expect(showSpy).toHaveBeenCalledWith('diff');
            }
        });

        it('does nothing for empty changes array', async () => {
            const el = await createShell(createMinimalPayload());
            const before = el.selectedDiffChanges;

            (el as any).navigateToDiffForChanges([]);
            expect(el.selectedDiffChanges).toBe(before);
        });

        it('does nothing for null changes', async () => {
            const el = await createShell(createMinimalPayload());
            (el as any).navigateToDiffForChanges(null);
            // no throw
        });
    });

    describe('onTabShow()', () => {
        it('sets activeMainTab from event detail', async () => {
            const el = await createShell(createMinimalPayload());

            const fakeEvent = { detail: { name: 'diff' } };
            (el as any).onTabShow(fakeEvent);

            expect(el.activeMainTab).toBe('diff');
        });
    });
});

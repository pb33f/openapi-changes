// Minimal fixture factories for report shell tests.
// Types are imported as type-only (stripped at compile time) so they work with the mocked module.

import type { ReportPayload, ReportItem, Change, Node, ChangeHistory } from '@pb33f/cowboy-components/static-report';

function makeCommitInfo(index: number) {
    return {
        hash: `abc${index}234567890`,
        date: new Date(2026, 0, 1 + index).toISOString(),
        message: `Test commit ${index}`,
        author: 'Test Author',
        authorEmail: 'test@example.com',
    };
}

function makeSummary(overrides?: Record<string, unknown>) {
    return {
        created: '2026-01-01T00:00:00Z',
        totalChanges: 5,
        breakingChanges: 1,
        additions: 2,
        removals: 1,
        modifications: 2,
        ...overrides,
    };
}

function makeItem(index: number, overrides?: Partial<ReportItem>): ReportItem {
    return {
        changeId: `change-${index}`,
        graph: { nodes: [], edges: [], changes: [] },
        summary: makeSummary(),
        htmlReport: `<p>Report ${index}</p>`,
        originalSpec: 'openapi: "3.0.0"\ninfo:\n  title: Old',
        modifiedSpec: 'openapi: "3.1.0"\ninfo:\n  title: New',
        commit: makeCommitInfo(index),
        ...overrides,
    } as ReportItem;
}

export function createMinimalPayload(overrides?: Partial<ReportPayload>): ReportPayload {
    return {
        version: 1,
        dateGenerated: '2026-01-01T00:00:00Z',
        items: [makeItem(0)],
        history: { qualityData: null, changeData: null, violationData: null, changeIds: [] } as unknown as ChangeHistory,
        ...overrides,
    } as ReportPayload;
}

export function createMultiCommitPayload(count = 3): ReportPayload {
    const items = Array.from({ length: count }, (_, i) => makeItem(i));
    return {
        version: 1,
        dateGenerated: '2026-01-01T00:00:00Z',
        items,
        history: {
            qualityData: null,
            violationData: null,
            changeIds: items.map(it => it.changeId),
            changeData: {
                labels: items.map(it => it.commit.date),
                datasets: [
                    { label: 'Additions', data: items.map(() => 2), borderColor: '#0f0' },
                    { label: 'Modifications', data: items.map(() => 3), borderColor: '#ff0' },
                    { label: 'Removals', data: items.map(() => 1), borderColor: '#f00' },
                ],
            },
        } as unknown as ChangeHistory,
    } as ReportPayload;
}

export function createMinimalNode(id: string, overrides?: Partial<Node>): Node {
    return {
        id,
        label: id,
        timeline: [],
        children: [],
        ...overrides,
    } as unknown as Node;
}

export function createMinimalChange(overrides?: Partial<Change>): Change {
    return {
        change: 1,
        changeText: 'modified',
        property: 'description',
        breaking: false,
        original: 'old value',
        new: 'new value',
        ...overrides,
    } as unknown as Change;
}

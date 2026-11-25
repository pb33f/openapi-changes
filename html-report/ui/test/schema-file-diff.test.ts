// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

import {expect, it, vi} from 'vitest';
import {DiffViewer} from '@pb33f/cowboy-components/components/diff-viewer/diff-viewer.js';

const base = 'title: Money';
const changed = 'title: Money\nmaxLength: 12';

it.each([
    ['moved with an added constraint', 'a/money.yaml', 'b/money.yaml', {change: 2, changeText: 'property_added', breaking: true, new: '12'}],
    ['moved with a removed constraint', 'b/money.yaml', 'a/money.yaml', {change: 5, changeText: 'property_removed', breaking: false, original: '12'}],
    ['added as a new file', undefined, 'b/money.yaml', {change: 3, changeText: 'object_added', breaking: false, new: changed}],
    ['removed as a file', 'b/money.yaml', undefined, {change: 4, changeText: 'object_removed', breaking: true, original: changed}],
] as const)('shows the file pair for a schema %s', async (_name, original, modified, edit) => {
    const viewer = new DiffViewer();
    const addition = 'new' in edit;
    viewer.originalSources = original ? {[original]: addition ? base : changed} : {};
    viewer.modifiedSources = modified ? {[modified]: addition ? changed : base} : {};
    const wholeFile = !original || !modified;
    const line = wholeFile ? 1 : 2;
    viewer.selectedChanges = [{
        schemaResource: 'urn:money', path: wholeFile ? '$' : '$.maxLength',
        property: wholeFile ? 'schema' : 'maxLength', type: 'schema',
        ...edit,
        context: {originalDocument: original, modifiedDocument: modified,
            ...(addition ? {newLine: line, newColumn: 1} : {originalLine: line, originalColumn: 1})},
    }];
    document.body.appendChild(viewer);
    await viewer.updateComplete;
    const toggle = viewer.shadowRoot!.querySelector('sl-radio-group')!;
    toggle.value = 'file';
    toggle.dispatchEvent(new CustomEvent('sl-change'));
    await vi.waitFor(() => {
        const panels = [...viewer.shadowRoot!.querySelectorAll('.diff-panel')];
        const lines = panels.map(panel => [...panel.querySelectorAll('.line-content')]
            .map(line => line.textContent).filter(Boolean));
        expect(lines).toEqual([
            original ? (addition ? base : changed).split('\n') : [],
            modified ? (addition ? changed : base).split('\n') : [],
        ]);
    });
});

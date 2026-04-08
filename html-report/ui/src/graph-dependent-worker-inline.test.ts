import { describe, it, expect, vi } from 'vitest';
import { createGraphDependentWorker } from './graph-dependent-worker-inline.js';

function waitForMessage(worker: Worker): Promise<MessageEvent> {
    return new Promise(resolve => {
        worker.onmessage = (e) => resolve(e);
    });
}

describe('InlineGraphDependentWorker', () => {
    it('returns an object with the Worker interface', () => {
        const w = createGraphDependentWorker();
        expect(typeof w.postMessage).toBe('function');
        expect(typeof w.addEventListener).toBe('function');
        expect(typeof w.removeEventListener).toBe('function');
        expect(typeof w.terminate).toBe('function');
    });

    it('traverses a simple tree with child nodes', async () => {
        const w = createGraphDependentWorker();
        const p = waitForMessage(w);

        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a', 'b'] },
            nodes: [
                { id: 'root', nodes: ['a', 'b'] },
                { id: 'a' },
                { id: 'b' },
            ],
            edges: [],
        });

        const evt = await p;
        const { filteredNodes } = evt.data;
        expect(filteredNodes.has('a')).toBe(true);
        expect(filteredNodes.has('b')).toBe(true);
    });

    it('traverses recursively through nested children', async () => {
        const w = createGraphDependentWorker();
        const p = waitForMessage(w);

        w.postMessage({
            dependentNode: { id: 'a', nodes: ['b'] },
            nodes: [
                { id: 'a', nodes: ['b'] },
                { id: 'b', nodes: ['c'] },
                { id: 'c' },
            ],
            edges: [],
        });

        const evt = await p;
        const { filteredNodes } = evt.data;
        expect(filteredNodes.has('b')).toBe(true);
        expect(filteredNodes.has('c')).toBe(true);
    });

    it('includes edges whose targets match child nodes', async () => {
        const w = createGraphDependentWorker();
        const p = waitForMessage(w);

        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a'] },
            nodes: [
                { id: 'root', nodes: ['a'] },
                { id: 'a' },
            ],
            edges: [
                { id: 'e1', sources: ['root'], targets: ['a'] },
                { id: 'e2', sources: ['root'], targets: ['z'] },
            ],
        });

        const evt = await p;
        const { filteredEdges } = evt.data;
        expect(filteredEdges.has('e1')).toBe(true);
        expect(filteredEdges.has('e2')).toBe(false);
    });

    it('emits nothing when dependentNode is missing', async () => {
        const w = createGraphDependentWorker();
        const handler = vi.fn();
        w.onmessage = handler;

        w.postMessage({ nodes: [], edges: [] } as any);

        // give microtask time to fire
        await new Promise(r => setTimeout(r, 10));
        expect(handler).not.toHaveBeenCalled();
    });

    it('emits nothing after terminate()', async () => {
        const w = createGraphDependentWorker();
        const handler = vi.fn();
        w.onmessage = handler;

        w.terminate();
        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a'] },
            nodes: [{ id: 'root', nodes: ['a'] }, { id: 'a' }],
            edges: [],
        });

        await new Promise(r => setTimeout(r, 10));
        expect(handler).not.toHaveBeenCalled();
    });

    it('supports addEventListener and removeEventListener', async () => {
        const w = createGraphDependentWorker();
        const listener1 = vi.fn();
        const listener2 = vi.fn();

        w.addEventListener('message', listener1);
        w.addEventListener('message', listener2);
        w.removeEventListener('message', listener2);

        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a'] },
            nodes: [{ id: 'root', nodes: ['a'] }, { id: 'a' }],
            edges: [],
        });

        // wait for microtask + message delivery
        await new Promise(r => setTimeout(r, 10));
        expect(listener1).toHaveBeenCalled();
        expect(listener2).not.toHaveBeenCalled();
    });

    it('supports EventListenerObject form', async () => {
        const w = createGraphDependentWorker();
        const handleEvent = vi.fn();
        const listenerObj = { handleEvent };

        w.addEventListener('message', listenerObj);

        const p = new Promise<void>(resolve => {
            handleEvent.mockImplementation(() => resolve());
        });

        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a'] },
            nodes: [{ id: 'root', nodes: ['a'] }, { id: 'a' }],
            edges: [],
        });

        await p;
        expect(handleEvent).toHaveBeenCalledTimes(1);
        expect(handleEvent.mock.calls[0][0]).toBeInstanceOf(MessageEvent);
    });

    it('passes through collapse flag', async () => {
        const w = createGraphDependentWorker();
        const p = waitForMessage(w);

        w.postMessage({
            dependentNode: { id: 'root', nodes: ['a'] },
            nodes: [{ id: 'root', nodes: ['a'] }, { id: 'a' }],
            edges: [],
            collapse: true,
        });

        const evt = await p;
        expect(evt.data.collapse).toBe(true);
    });

    it('handles nodes without children gracefully', async () => {
        const w = createGraphDependentWorker();
        const p = waitForMessage(w);

        w.postMessage({
            dependentNode: { id: 'leaf' },
            nodes: [{ id: 'leaf' }],
            edges: [],
        });

        const evt = await p;
        expect(evt.data.filteredNodes.size).toBe(0);
    });
});

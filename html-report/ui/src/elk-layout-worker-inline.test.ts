import { describe, it, expect, vi } from 'vitest';

// Mock ELK before importing the worker
const mockLayout = vi.fn();
vi.mock('@report-elkjs', () => {
    return {
        default: class MockELK {
            layout = mockLayout;
            terminateWorker() {}
        },
    };
});

import { createElkLayoutWorker } from './elk-layout-worker-inline.js';

function waitForMessage(worker: Worker): Promise<MessageEvent> {
    return new Promise(resolve => {
        worker.onmessage = (e) => resolve(e);
    });
}

describe('InlineElkLayoutWorker', () => {
    beforeEach(() => {
        mockLayout.mockReset();
        mockLayout.mockResolvedValue({ id: 'root', children: [] });
    });

    it('returns an object with the Worker interface', () => {
        const w = createElkLayoutWorker();
        expect(typeof w.postMessage).toBe('function');
        expect(typeof w.addEventListener).toBe('function');
        expect(typeof w.removeEventListener).toBe('function');
        expect(typeof w.terminate).toBe('function');
    });

    it('responds with success for a valid layout request', async () => {
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            requestId: 42,
            graph: { id: 'root', children: [] },
            layoutOptions: { 'elk.algorithm': 'layered' },
        });

        const evt = await p;
        expect(evt.data.success).toBe(true);
        expect(evt.data.requestId).toBe(42);
        expect(evt.data.graph).toEqual({ id: 'root', children: [] });
    });

    it('returns error when graph is missing', async () => {
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            requestId: 1,
            layoutOptions: { 'elk.algorithm': 'layered' },
        } as any);

        const evt = await p;
        expect(evt.data.success).toBe(false);
        expect(evt.data.error).toBe('Missing graph or layoutOptions');
        expect(evt.data.requestId).toBe(1);
    });

    it('returns error when layoutOptions is missing', async () => {
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            requestId: 2,
            graph: { id: 'root' },
        } as any);

        const evt = await p;
        expect(evt.data.success).toBe(false);
        expect(evt.data.error).toBe('Missing graph or layoutOptions');
    });

    it('returns error when ELK layout throws', async () => {
        mockLayout.mockRejectedValueOnce(new Error('Layout failed'));
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            requestId: 3,
            graph: { id: 'root' },
            layoutOptions: {},
        });

        const evt = await p;
        expect(evt.data.success).toBe(false);
        expect(evt.data.error).toBe('Layout failed');
        expect(evt.data.requestId).toBe(3);
    });

    it('passes through requestId', async () => {
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            requestId: 999,
            graph: { id: 'g' },
            layoutOptions: {},
        });

        const evt = await p;
        expect(evt.data.requestId).toBe(999);
    });

    it('emits nothing after terminate()', async () => {
        const w = createElkLayoutWorker();
        const handler = vi.fn();
        w.onmessage = handler;

        w.terminate();
        w.postMessage({
            graph: { id: 'root' },
            layoutOptions: {},
        });

        await new Promise(r => setTimeout(r, 10));
        expect(handler).not.toHaveBeenCalled();
    });

    it('supports addEventListener and removeEventListener for messages', async () => {
        const w = createElkLayoutWorker();
        const listener = vi.fn();

        w.addEventListener('message', listener);

        const p = new Promise<void>(resolve => {
            listener.mockImplementation(() => resolve());
        });

        w.postMessage({
            graph: { id: 'root' },
            layoutOptions: {},
        });

        await p;
        expect(listener).toHaveBeenCalledTimes(1);

        // remove and verify
        listener.mockClear();
        w.removeEventListener('message', listener);

        w.postMessage({
            graph: { id: 'root' },
            layoutOptions: {},
        });

        await new Promise(r => setTimeout(r, 10));
        expect(listener).not.toHaveBeenCalled();
    });

    it('lazily creates ELK instance on first request', async () => {
        const w = createElkLayoutWorker();
        // no ELK call yet
        expect(mockLayout).not.toHaveBeenCalled();

        const p = waitForMessage(w);
        w.postMessage({
            graph: { id: 'root' },
            layoutOptions: {},
        });

        await p;
        expect(mockLayout).toHaveBeenCalledTimes(1);
    });

    it('handles non-Error throws from ELK', async () => {
        mockLayout.mockRejectedValueOnce('string error');
        const w = createElkLayoutWorker();
        const p = waitForMessage(w);

        w.postMessage({
            graph: { id: 'root' },
            layoutOptions: {},
        });

        const evt = await p;
        expect(evt.data.success).toBe(false);
        expect(evt.data.error).toBe('Unknown error');
    });
});

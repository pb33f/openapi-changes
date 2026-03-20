/**
 * In-process adapter for the graph-dependent worker.
 * Mirrors the logic from cowboy-components/src/workers/graph-dependent.worker.ts
 * but runs on the main thread via queueMicrotask, avoiding blob URL Workers
 * that browsers block in file:// context.
 */

interface NodeLike {
    id: string;
    nodes?: string[];
}

interface EdgeLike {
    id: string;
    sources: string[];
    targets: string[];
}

function visitDependents(
    node: NodeLike,
    filteredNodes: Map<string, NodeLike>,
    filteredEdges: Map<string, EdgeLike>,
    nodeMap: Map<string, NodeLike>,
    _edgeMap: Map<string, EdgeLike>,
    edgeTargets: Map<string, EdgeLike[]>,
) {
    if (node && node.nodes) {
        for (const id of node.nodes) {
            if (!filteredNodes.has(id)) {
                filteredNodes.set(id, nodeMap.get(id)!);
                const targets = edgeTargets.get(id);
                if (targets) {
                    targets.forEach(target => {
                        if (!filteredEdges.has(target.id)) {
                            filteredEdges.set(target.id, target);
                        }
                    });
                }
                visitDependents(nodeMap.get(id)!, filteredNodes, filteredEdges, nodeMap, _edgeMap, edgeTargets);
            }
        }
    }
}

class InlineGraphDependentWorker {
    onmessage: ((event: MessageEvent) => void) | null = null;
    onerror: ((event: ErrorEvent) => void) | null = null;

    private readonly messageListeners = new Set<EventListenerOrEventListenerObject>();

    postMessage(data: any): void {
        queueMicrotask(() => this.handleRequest(data));
    }

    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void {
        if (!listener) return;
        if (type === 'message') this.messageListeners.add(listener);
    }

    removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void {
        if (!listener) return;
        if (type === 'message') this.messageListeners.delete(listener);
    }

    terminate(): void {
        this.messageListeners.clear();
        this.onmessage = null;
        this.onerror = null;
    }

    private handleRequest(data: any): void {
        if (!data.dependentNode) return;

        const node: NodeLike = data.dependentNode;
        const nodes: NodeLike[] = data.nodes;
        const edges: EdgeLike[] = data.edges;
        const filteredNodes = new Map<string, NodeLike>();
        const filteredEdges = new Map<string, EdgeLike>();
        const extractedEdgeTargets = new Map<string, EdgeLike[]>();

        const nodeMap = new Map<string, NodeLike>();
        const edgeMap = new Map<string, EdgeLike>();
        nodes.forEach(n => nodeMap.set(n.id, n));
        edges.forEach(e => {
            edgeMap.set(e.id, e);
            e.targets.forEach(target => {
                if (!extractedEdgeTargets.has(target)) {
                    extractedEdgeTargets.set(target, []);
                }
                extractedEdgeTargets.get(target)!.push(e);
            });
        });

        visitDependents(node, filteredNodes, filteredEdges, nodeMap, edgeMap, extractedEdgeTargets);

        const event = new MessageEvent('message', {
            data: { filteredNodes, filteredEdges, collapse: data.collapse },
        });
        this.onmessage?.(event);
        for (const listener of this.messageListeners) {
            if (typeof listener === 'function') listener(event);
            else listener.handleEvent(event);
        }
    }
}

export function createGraphDependentWorker(): Worker {
    return new InlineGraphDependentWorker() as unknown as Worker;
}

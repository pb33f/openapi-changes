import ELK from '@report-elkjs';

type LayoutRequest = {
    requestId?: number;
    graph?: unknown;
    layoutOptions?: unknown;
};

type LayoutResponse = {
    success: boolean;
    requestId?: number;
    graph?: unknown;
    error?: string;
};

function notifyListener(listener: EventListenerOrEventListenerObject, event: Event): void {
    if (typeof listener === 'function') {
        listener(event);
        return;
    }
    listener.handleEvent(event);
}

class InlineElkLayoutWorker {
    onmessage: ((event: MessageEvent<LayoutResponse>) => void) | null = null;
    onerror: ((event: ErrorEvent) => void) | null = null;

    private readonly messageListeners = new Set<EventListenerOrEventListenerObject>();
    private readonly errorListeners = new Set<EventListenerOrEventListenerObject>();
    private elk: ELK | null = null;
    private terminated = false;

    postMessage(data: LayoutRequest): void {
        queueMicrotask(() => {
            void this.handleRequest(data);
        });
    }

    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void {
        if (!listener) return;
        if (type === 'message') {
            this.messageListeners.add(listener);
        }
        if (type === 'error') {
            this.errorListeners.add(listener);
        }
    }

    removeEventListener(type: string, listener: EventListenerOrEventListenerObject | null): void {
        if (!listener) return;
        if (type === 'message') {
            this.messageListeners.delete(listener);
        }
        if (type === 'error') {
            this.errorListeners.delete(listener);
        }
    }

    terminate(): void {
        this.terminated = true;
        this.messageListeners.clear();
        this.errorListeners.clear();
        this.onmessage = null;
        this.onerror = null;
        if (this.elk?.terminateWorker) {
            try {
                this.elk.terminateWorker();
            } catch {
                // ELK's internal worker may not support terminate in inline mode
            }
        }
        this.elk = null;
    }

    private getElk(): ELK {
        if (!this.elk) {
            this.elk = new ELK();
        }
        return this.elk;
    }

    private async handleRequest(data: LayoutRequest): Promise<void> {
        if (this.terminated) return;

        const { graph, layoutOptions, requestId } = data;
        if (!graph || !layoutOptions) {
            this.emitMessage({
                success: false,
                error: 'Missing graph or layoutOptions',
                requestId,
            });
            return;
        }

        try {
            const result = await this.getElk().layout(graph, {
                layoutOptions,
                logging: false,
                measureExecutionTime: false,
            });

            this.emitMessage({
                success: true,
                graph: result,
                requestId,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.emitMessage({
                success: false,
                error: message,
                requestId,
            });
        }
    }

    private emitMessage(data: LayoutResponse): void {
        if (this.terminated) return;

        const event = new MessageEvent<LayoutResponse>('message', { data });
        this.onmessage?.(event);

        for (const listener of this.messageListeners) {
            notifyListener(listener, event);
        }
    }

}

export function createElkLayoutWorker(): Worker {
    return new InlineElkLayoutWorker() as unknown as Worker;
}

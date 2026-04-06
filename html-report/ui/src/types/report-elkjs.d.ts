declare module '@report-elkjs' {
    export default class ELK {
        constructor(options?: unknown);
        layout(graph: unknown, options?: unknown): Promise<unknown>;
        terminateWorker?(): void;
    }
}

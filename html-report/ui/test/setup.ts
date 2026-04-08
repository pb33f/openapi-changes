import { vi, afterEach } from 'vitest';

// --- Browser API polyfills for jsdom ---

globalThis.ResizeObserver ??= class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
} as any;

globalThis.requestAnimationFrame ??= ((cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 0)) as any;
globalThis.cancelAnimationFrame ??= ((handle: number) => clearTimeout(handle)) as any;

// --- Mock cowboy-components ---

vi.mock('@pb33f/cowboy-components/static-report', () => {
    class StubElement extends HTMLElement {}
    return {
        HeaderComponent: StubElement,
        FooterComponent: StubElement,
        HttpMethodComponent: StubElement,
        PathRenderComponent: StubElement,
        RenderJSONPathComponent: StubElement,
        TimelineComponent: StubElement,
        TimelineItemComponent: StubElement,
        SpecSummaryTimelineItem: StubElement,
        ThemeSwitcher: StubElement,
        DiffViewer: StubElement,
        ExplorerComponent: Object.assign(StubElement, {
            elkWorkerFactory: null,
            graphDependentWorkerFactory: null,
        }),
        ExplorerChangePanel: StubElement,
        FocusedDiffPanel: StubElement,
        ModelTreeNodeClicked: 'model-tree-node-clicked',
        ExplorerNodeClicked: 'explorer-node-clicked',
        GraphMode: { standard: 'standard', change: 'change' },
        scrollbarCss: [],
    };
});

// --- Mock Shoelace side-effect imports ---

vi.mock('@shoelace-style/shoelace/dist/components/tab-group/tab-group.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tab/tab.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tooltip/tooltip.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/icon/icon.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/split-panel/split-panel.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/relative-time/relative-time.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/format-number/format-number.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/badge/badge.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/icon-button/icon-button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tag/tag.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/input/input.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/button/button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/range/range.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/switch/switch.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tree/tree.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/tree-item/tree-item.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/radio-group/radio-group.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/components/radio-button/radio-button.js', () => ({}));
vi.mock('@shoelace-style/shoelace/dist/events/sl-tab-show.js', () => ({}));

// --- Stub custom elements that need methods called on them in jsdom ---

// sl-tab-group has a .show() method called by the shell
if (!customElements.get('sl-tab-group')) {
    class StubTabGroup extends HTMLElement {
        show(_panel: string) {}
    }
    customElements.define('sl-tab-group', StubTabGroup);
}

// --- Cleanup ---

afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
    delete (window as any).__REPORT_DATA__;
});

import { LitElement, html, nothing, TemplateResult } from 'lit';
import { state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { SlTabShowEvent } from '@shoelace-style/shoelace/dist/events/sl-tab-show.js';
import reportCss from '../css/report.css.js';

// Import cowboy-components via the static-report entrypoint.
// This registers the custom elements as side effects.
import {
    HeaderComponent, FooterComponent, HttpMethodComponent, PathRenderComponent, RenderJSONPathComponent,
    TimelineComponent, TimelineItemComponent, SpecSummaryTimelineItem,
    ThemeSwitcher, ModelTreeNodeClicked, DiffViewer,
} from '@pb33f/cowboy-components/static-report';
import type {
    NodeClickedEvent, ReportPayload, ReportItem, Change, Node, ChangeHistory,
} from '@pb33f/cowboy-components/static-report';
// Ensure components are registered (tree-shaking guard)
void HeaderComponent;
void FooterComponent;
void HttpMethodComponent;
void PathRenderComponent;
void RenderJSONPathComponent;
void TimelineComponent;
void TimelineItemComponent;
void SpecSummaryTimelineItem;
void ThemeSwitcher;
void DiffViewer;

// Shoelace components used directly in the shell template
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/format-number/format-number.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';

const CHANGE_LABELS = ['MODIFIED', 'ADDED', 'REMOVED'];
const BREAKING_LABELS = ['BREAKING', 'NON-BREAKING'];

// maps dataset labels to dynamic color property keys on pb33f-chart
const HISTORY_COLOR_KEYS: Record<string, string> = {
    'Additions': 'ok',
    'Modifications': 'tertiary',
    'Removals': 'error',
};

function formatChartDate(iso: string): string {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
        return iso;
    }
}

function buildPointArrays(count: number, activeIdx: number, bg: string, color: string) {
    return {
        pointRadius: Array.from({ length: count }, (_, i) => i === activeIdx ? 12 : 4),
        pointBackgroundColor: Array.from({ length: count }, (_, i) => i === activeIdx ? bg : color),
        pointBorderColor: Array(count).fill(color),
        pointBorderWidth: Array.from({ length: count }, (_, i) => i === activeIdx ? 3 : 1),
    };
}

interface ChartDataset {
    labels: string[];
    data: number[];
}

interface ModelTreeElement extends HTMLElement {
    nodeMap: Map<string, Node>;
    node: Node | null;
    changesEnabled: boolean;
    violationMap: Map<string, unknown>;
    explorerClicked(nodeId: string): void;
}

interface ChartElement extends HTMLElement {
    datasets: unknown[];
    labels: string[];
    background?: string;
    chart?: ChartInstance;
    buildChart(): void;
    [key: string]: unknown;
}

interface ChartInstance {
    ctx: CanvasRenderingContext2D;
    data: { datasets: any[] };
    getSortedVisibleDatasetMetas(): any[];
    update(mode?: string): void;
}

interface DoughnutChartElement extends HTMLElement {
    chart?: { resize(): void; update(mode?: string): void };
}

interface TabGroupElement extends HTMLElement {
    show(panel: string): void;
    updateComplete: Promise<boolean>;
}

/**
 * Shared base class for both the full and lite report shells.
 * Contains all common state, data loading, chart logic, rendering, and event wiring.
 * Subclasses register the custom element and override hooks for explorer-specific behavior.
 */
export abstract class ReportShellBase extends LitElement {
    static styles = reportCss;

    @state() protected data: ReportPayload | null = null;
    @state() protected activeItemIndex: number = 0;
    @state() protected error: string = '';
    @state() protected activeMainTab: string = 'overview';
    @state() protected selectedDiffChanges: Change[] = [];
    @state() protected selectedNodeId: string | null = null;
    @state() protected selectedNodeChanges: Change[] = [];

    private _graphNodeMap: Map<string, Node> = new Map();
    private _cachedChartIndex: number = -1;
    private _cachedData: ReportPayload | null = null;
    protected _changeDataset: ChartDataset[] = [];
    protected _breakingDataset: ChartDataset[] = [];

    @query('.navigator-panel pb33f-model-tree') protected modelTree!: ModelTreeElement;
    @query('pb33f-chart') protected beefyChart!: ChartElement;
    @query('.tab-content > sl-tab-group') protected mainTabGroup!: TabGroupElement;

    private _overviewResizeObserver: ResizeObserver | null = null;
    private _chartsInitialized = false;

    private _onThemeChange = () => {
        // Delay to let Colorful base class re-resolve CSS variable colors
        requestAnimationFrame(() => {
            this.updateBeefyChart();
            this.resizeDoughnutCharts();
        });
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.loadData();
        this.addEventListener(ModelTreeNodeClicked, this._onTreeNodeClicked as EventListener);
        window.addEventListener('pb33f-theme-change', this._onThemeChange);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener(ModelTreeNodeClicked, this._onTreeNodeClicked as EventListener);
        window.removeEventListener('pb33f-theme-change', this._onThemeChange);
        this._overviewResizeObserver?.disconnect();
    }

    private loadData(): void {
        try {
            const scriptEl = document.getElementById('report-data');
            if (scriptEl?.textContent) {
                this.data = JSON.parse(scriptEl.textContent);
                return;
            }
            if ((window as any).__REPORT_DATA__) {
                this.data = (window as any).__REPORT_DATA__;
                return;
            }
            this.error = 'No report data found';
        } catch (e) {
            this.error = `Failed to parse report data: ${e}`;
        }
    }

    protected get activeItem(): ReportItem | null {
        if (!this.data?.items?.length) return null;
        return this.data.items[this.activeItemIndex] || null;
    }

    protected get isMultiCommit(): boolean {
        return (this.data?.items?.length ?? 0) > 1;
    }

    protected selectItem(index: number): void {
        this.activeItemIndex = index;
        this.selectedDiffChanges = [];
        this.selectedNodeId = null;
        this.selectedNodeChanges = [];
    }

    protected selectNode(nodeId: string): void {
        this.selectedNodeId = nodeId;
        const node = this._graphNodeMap.get(nodeId);
        if (node) {
            this.selectedNodeChanges = node.timeline || [];
            this.selectedDiffChanges = node.timeline || [];
        } else {
            this.selectedNodeChanges = [];
            this.selectedDiffChanges = [];
        }
    }

    protected updateModelTree(): void {
        const item = this.activeItem;
        if (!this.modelTree || !item?.graph?.nodes) return;

        const nodeMap = new Map<string, Node>();
        for (const node of item.graph.nodes) {
            nodeMap.set(node.id, node);
        }
        this._graphNodeMap = nodeMap;
        this.modelTree.nodeMap = nodeMap;
        this.modelTree.node = nodeMap.get('root') || null;
        this.modelTree.changesEnabled = true;
        this.modelTree.violationMap = new Map();
    }

    protected updateBeefyChart(): void {
        if (!this.beefyChart || !this.data?.history?.changeData) return;
        const cd = this.data.history.changeData;
        const pointCount = cd.labels.length;
        const activeIdx = this.activeItemIndex;

        const bg = this.beefyChart.background || '#1a1e2e';
        const isLight = document.documentElement.getAttribute('theme') === 'light';
        const lightColors: Record<string, string> = {
            'ok': '#000',
            'tertiary': '#999',
            'error': '#555',
        };
        this.beefyChart.datasets = cd.datasets.map((ds: any) => {
            const colorKey = HISTORY_COLOR_KEYS[ds.label] || '';
            const color = isLight
                ? (lightColors[colorKey] || '#666')
                : (ds.borderColor || (colorKey && this.beefyChart[colorKey]) || '#888');
            return {
                ...ds,
                borderColor: color,
                borderWidth: 3,
                tension: 0,
                fill: false,
                pointStyle: 'rect',
                ...buildPointArrays(pointCount, activeIdx, bg, color),
            };
        });
        this.beefyChart.labels = cd.labels.map((l: string) => formatChartDate(l));
        this.beefyChart.buildChart();
        requestAnimationFrame(() => this._drawActiveGlow());
    }

    private _drawActiveGlow(): void {
        const chartInst = this.beefyChart?.chart;
        if (!chartInst) return;
        const activeIdx = this.activeItemIndex;
        const ctx = chartInst.ctx;
        for (const meta of chartInst.getSortedVisibleDatasetMetas()) {
            const point = meta.data[activeIdx];
            if (!point) continue;
            const color = (chartInst.data.datasets[meta.index] as any)?.borderColor || '#fff';
            const size = 12;
            // Multiple passes for a stronger, softer glow — stroke only, no fill
            for (let pass = 0; pass < 5; pass++) {
                ctx.save();
                ctx.shadowColor = color;
                ctx.shadowBlur = 25 + pass * 12;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.9;
                ctx.strokeRect(point.x - size, point.y - size, size * 2, size * 2);
                ctx.restore();
            }
        }
    }

    private updateBeefyChartHighlight(): void {
        const chartInst = this.beefyChart?.chart;
        if (!chartInst) return;
        const activeIdx = this.activeItemIndex;
        const bg = this.beefyChart.background || '#1a1e2e';
        for (const ds of chartInst.data.datasets) {
            const n = ds.data.length;
            Object.assign(ds, buildPointArrays(n, activeIdx, bg, ds.borderColor));
        }
        chartInst.update('none');
        requestAnimationFrame(() => this._drawActiveGlow());
    }

    willUpdate(changedProperties: Map<string, unknown>): void {
        if (changedProperties.has('activeItemIndex') || changedProperties.has('data')) {
            this.updateChartData();
        }
    }

    updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);
        if (changedProperties.has('activeItemIndex') || changedProperties.has('data')) {
            this.updateComplete.then(() => {
                this.onDataOrIndexChanged(changedProperties);
                this._upgradeReportIcons();
            });
        }
    }

    /** Upgrade model icons in the doctor-rendered HTML from tiny to medium. */
    private _upgradeReportIcons(): void {
        const icons = this.renderRoot.querySelectorAll('.change-report pb33f-model-icon');
        for (const icon of icons) {
            if (icon.getAttribute('size') !== 'medium') {
                icon.setAttribute('size', 'medium');
            }
        }
    }

    /**
     * Called after updateComplete when data or activeItemIndex changes.
     * Subclasses can override to add explorer updates.
     */
    protected onDataOrIndexChanged(changedProperties: Map<string, unknown>): void {
        this.updateModelTree();
        if (changedProperties.has('data')) {
            // Shoelace tab group doesn't auto-activate the first tab when rendered
            // inside a Lit shadow DOM. Explicitly activate and observe for visibility.
            requestAnimationFrame(() => {
                if (this.mainTabGroup) {
                    this.mainTabGroup.show('overview');
                }
                this._observeOverviewPanel();
            });
        }
        if (changedProperties.has('activeItemIndex') && this._chartsInitialized) {
            this.updateBeefyChartHighlight();
        }
    }

    private _observeOverviewPanel(): void {
        if (this._overviewResizeObserver) return;
        const overview = this.renderRoot.querySelector('.overview-content');
        if (!overview) return;

        this._overviewResizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect.width > 0 && entry.contentRect.height > 0 && !this._chartsInitialized) {
                    this._chartsInitialized = true;
                    this.updateBeefyChart();
                    this.resizeDoughnutCharts();
                }
            }
        });
        this._overviewResizeObserver.observe(overview);
    }

    /** Bound handler for use in lit templates. Delegates to the overridable onTabShow(). */
    protected handleTabShow = (event: SlTabShowEvent): void => {
        this.onTabShow(event);
    }

    /** Override in subclasses to extend tab-show behavior (e.g. center explorer on graph tab). */
    protected onTabShow(event: SlTabShowEvent): void {
        this.activeMainTab = event.detail.name;
        if (event.detail.name === 'overview') {
            this.updateComplete.then(() => {
                this.updateBeefyChart();
                this.resizeDoughnutCharts();
            });
        }
    }

    private resizeDoughnutCharts(): void {
        const doughnuts = this.renderRoot.querySelectorAll<DoughnutChartElement>('pb33f-doughnut-chart');
        for (const d of doughnuts) {
            d.chart?.resize();
        }
    }

    private updateChartData(): void {
        if (this._cachedChartIndex === this.activeItemIndex && this._cachedData === this.data) return;
        this._cachedChartIndex = this.activeItemIndex;
        this._cachedData = this.data;
        const item = this.activeItem;
        if (!item) return;

        this._changeDataset = [{
            labels: CHANGE_LABELS,
            data: [item.summary.modifications || 0, item.summary.additions || 0, item.summary.removals || 0],
        }];
        this._breakingDataset = [{
            labels: BREAKING_LABELS,
            data: [item.summary.breakingChanges || 0, (item.summary.totalChanges || 0) - (item.summary.breakingChanges || 0)],
        }];
    }

    /**
     * Handle tree node clicks. Subclasses can override to intercept clicks
     * when the graph tab is active (e.g. to reveal nodes in the explorer).
     */
    protected handleTreeNodeClicked(evt: CustomEvent<NodeClickedEvent>): void {
        const { changes } = evt.detail;
        if (changes && changes.length > 0) {
            this.navigateToDiffForChanges(changes as Change[]);
        }
    }

    private _onTreeNodeClicked = (evt: CustomEvent<NodeClickedEvent>): void => {
        this.handleTreeNodeClicked(evt);
    }

    protected navigateToDiffForChanges(changes: Change[]): void {
        if (!changes || changes.length === 0) return;
        this.selectedDiffChanges = [...changes];

        if (this.mainTabGroup) {
            this.mainTabGroup.show('diff');
        }
    }

    protected renderNavigator(): TemplateResult {
        return html`
            <div class="navigator-content">
                <sl-tab-group class="navigator-tabs">
                    <sl-tab slot="nav" panel="document">Document</sl-tab>
                    ${this.isMultiCommit ? html`
                        <sl-tab slot="nav" panel="timeline">Timeline</sl-tab>
                    ` : nothing}

                    <sl-tab-panel name="document">
                        <div class="tree-scroll-container">
                            <pb33f-model-tree expand></pb33f-model-tree>
                        </div>
                    </sl-tab-panel>

                    ${this.isMultiCommit ? html`
                        <sl-tab-panel name="timeline">
                            <div class="timeline-scroll-container">
                                <pb33f-timeline ?skinny=${true}>
                                    ${this.data!.items.map((item, i) => {
                                        const hasBreaking = (item.summary.breakingChanges || 0) > 0;
                                        return html`
                                            <pb33f-timeline-item ?skinny=${true}
                                                class="${i === this.activeItemIndex ? 'selected' : ''}"
                                                @click=${() => this.selectItem(i)}>
                                                <div slot="time"
                                                    class="time ${hasBreaking ? 'heart-breaker' : 'dream-maker'} ${i === this.activeItemIndex ? 'selected-bar' : ''}">
                                                    <sl-relative-time date="${item.commit.date}" format="narrow"></sl-relative-time>
                                                </div>
                                                <div slot="content">
                                                    <div class="change-content ${hasBreaking ? 'heart-breaker' : 'dream-maker'} ${i === this.activeItemIndex ? 'selected-bar' : ''}">
                                                        <pb33f-spec-summary-timeline-item
                                                            .specSummary=${item.summary}
                                                            .hideScore=${true}>
                                                        </pb33f-spec-summary-timeline-item>
                                                    </div>
                                                </div>
                                            </pb33f-timeline-item>
                                        `;
                                    })}
                                </pb33f-timeline>
                            </div>
                        </sl-tab-panel>
                    ` : nothing}
                </sl-tab-group>
            </div>
        `;
    }

    protected renderSummary(): TemplateResult | typeof nothing {
        const item = this.activeItem;
        if (!item) return nothing;

        return html`
            <div class="change-summary">
                <div class="charts-row">
                    <pb33f-doughnut-chart changesChart width=300 height=120
                        .datasets=${this._changeDataset} .labels=${CHANGE_LABELS}
                    ></pb33f-doughnut-chart>
                    ${(item.summary.breakingChanges || 0) > 0 ? html`
                        <pb33f-doughnut-chart breakingChanges width=300 height=120
                            .datasets=${this._breakingDataset} .labels=${BREAKING_LABELS}
                        ></pb33f-doughnut-chart>
                    ` : nothing}
                </div>
                <pb33f-spec-summary-timeline-item
                    .large=${true}
                    .hideScore=${true}
                    .specSummary=${item.summary}
                ></pb33f-spec-summary-timeline-item>
            </div>
        `;
    }

    protected renderHistoryChart(): TemplateResult | typeof nothing {
        if (!this.isMultiCommit || !this.data?.history?.changeData) return nothing;

        const cd = this.data.history.changeData;
        const labels = cd.labels.map((l: string) => formatChartDate(l));
        const datasets = cd.datasets.map((ds: any) => ({
            ...ds,
            borderWidth: 3,
            tension: 0,
            fill: false,
        }));

        return html`
            <div class="history-section">
                <h2>Change History Chart</h2>
                <pb33f-chart
                    .datasets=${datasets}
                    .labels=${labels}
                    .height=${550}
                    .legend=${true}
                    .title=${''}
                    style="height: 550px; display: block;"
                ></pb33f-chart>
            </div>
        `;
    }

    protected renderOverview(): TemplateResult | typeof nothing {
        const item = this.activeItem;
        if (!item) return nothing;

        return html`
            <div class="overview-content">
                <div class="commit-info">
                    <span class="commit-hash">${item.commit.hash.substring(0, 8)}</span>
                    <span class="commit-message">${item.commit.message || 'No message'}</span>
                    <span class="commit-meta">
                        ${item.commit.author ? html`<span class="commit-author">${item.commit.author}</span>` : nothing}
                        <span class="commit-date">${new Date(item.commit.date).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                        })}</span>
                    </span>
                </div>
                ${this.renderSummary()}
                ${this.renderHistoryChart()}
            </div>
        `;
    }

    /**
     * Render the content tabs (Overview, Change Report, Changed Items, Change List, View Diff).
     * The full shell overrides renderExtraTabNavs/Panels to add the "Explore Changes" graph tab.
     */
    // Note: htmlReport content is trusted server-generated HTML from the doctor renderer.
    // The Go backend's json.Marshal escapes <, >, & preventing </script> injection.
    // TODO: upstream fix needed in doctor's renderCodeSpan/renderFencedCodeBlock to
    // HTML-escape user content (OpenAPI descriptions/examples) in code spans.
    private renderHtmlReport(item: ReportItem): TemplateResult {
        return item.htmlReport
            ? html`<div class="change-report">${unsafeHTML(item.htmlReport)}</div>`
            : html`<p>No report available</p>`;
    }

    protected renderCombinedReport(item: ReportItem): TemplateResult {
        return html`
            <div class="combined-report overview-content">
                ${this.data?.originalPath && this.data?.modifiedPath ? html`
                    <div class="spec-paths">
                        <span class="spec-path-label">Original:</span> <code>${this.data.originalPath}</code>
                        <span class="spec-path-arrow">→</span>
                        <span class="spec-path-label">Modified:</span> <code>${this.data.modifiedPath}</code>
                    </div>
                ` : nothing}
                ${this.renderSummary()}
                ${this.renderHtmlReport(item)}
            </div>
        `;
    }

    protected renderContentTabs(item: ReportItem): TemplateResult {
        return html`
            <sl-tab-group @sl-tab-show=${this.handleTabShow}>
                ${this.isMultiCommit ? html`
                    <sl-tab slot="nav" panel="overview">Overview</sl-tab>
                    <sl-tab slot="nav" panel="report">Change Report</sl-tab>
                ` : html`
                    <sl-tab slot="nav" panel="overview">Change Report</sl-tab>
                `}
                <sl-tab slot="nav" panel="changelist">Changed Items</sl-tab>
                <sl-tab slot="nav" panel="list">Change List</sl-tab>
                ${this.renderExtraTabNavs()}
                <sl-tab slot="nav" panel="diff">View Diff</sl-tab>

                <sl-tab-panel name="overview">
                    ${this.isMultiCommit
                        ? this.renderOverview()
                        : this.renderCombinedReport(item)}
                </sl-tab-panel>

                ${this.isMultiCommit ? html`
                    <sl-tab-panel name="report">
                        ${this.renderHtmlReport(item)}
                    </sl-tab-panel>
                ` : nothing}

                <sl-tab-panel name="changelist">
                    <pb33f-changes-component .changes=${item.graph.changes || []}></pb33f-changes-component>
                </sl-tab-panel>

                <sl-tab-panel name="list">
                    <pb33f-change-list .changes=${item.graph.changes || []}></pb33f-change-list>
                </sl-tab-panel>

                ${this.renderExtraTabPanels()}

                <sl-tab-panel name="diff">
                    <pb33f-diff-viewer
                        .originalSpec=${item.originalSpec}
                        .modifiedSpec=${item.modifiedSpec}
                        .originalHighlighted=${item.originalHighlighted || {}}
                        .modifiedHighlighted=${item.modifiedHighlighted || {}}
                        .selectedChanges=${this.selectedDiffChanges}
                    ></pb33f-diff-viewer>
                </sl-tab-panel>
            </sl-tab-group>
        `;
    }

    /** Override in subclass to insert extra tab nav items (e.g. "Explore Changes"). */
    protected renderExtraTabNavs(): TemplateResult | typeof nothing {
        return nothing;
    }

    /** Override in subclass to insert extra tab panels (e.g. the explorer panel). */
    protected renderExtraTabPanels(): TemplateResult | typeof nothing {
        return nothing;
    }

    render(): TemplateResult {
        if (this.error) {
            return html`<div class="no-changes">${this.error}</div>`;
        }
        if (!this.data) {
            return html`<div class="no-changes">Loading...</div>`;
        }
        if (!this.data.items.length) {
            return html`<div class="no-changes">No changes found</div>`;
        }

        const item = this.activeItem!;

        return html`
            <pb33f-header name="openapi-changes" fluid>
                <div class="header-content">
                    <span class="header-meta">
                        ${this.data?.appVersion ? html`<span class="header-version">v${this.data.appVersion}</span>` : nothing}
                    </span>
                    <pb33f-theme-switcher></pb33f-theme-switcher>
                </div>
            </pb33f-header>
            <div class="report-layout">
                <sl-split-panel class="split-panel" position="18">
                    <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                    <div slot="start" class="navigator-panel">
                        ${this.renderNavigator()}
                    </div>
                    <div slot="end" class="main-content">
                        <div class="tab-content">
                            ${this.renderContentTabs(item)}
                        </div>
                    </div>
                </sl-split-panel>
            </div>
            <pb33f-footer fluid
                url="https://pb33f.io/openapi-changes/"
                .build=${'Generated ' + new Date(this.data?.dateGenerated || '').toLocaleString()}>
            </pb33f-footer>
        `;
    }
}

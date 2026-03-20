import { LitElement, html, nothing, TemplateResult } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { SlTabShowEvent } from '@shoelace-style/shoelace/dist/events/sl-tab-show.js';
import reportCss from '../css/report.css.js';
import type { ReportPayload, ReportItem } from '../model/report-payload.js';
import './diff-viewer.js';

// Import cowboy-components via the static-report entrypoint.
// This registers the custom elements as side effects.
import { ExplorerComponent, HeaderComponent } from '@pb33f/cowboy-components/static-report';
import { createElkLayoutWorker } from '../elk-layout-worker-inline.js';
import { createGraphDependentWorker } from '../graph-dependent-worker-inline.js';
ExplorerComponent.elkWorkerFactory = createElkLayoutWorker;
ExplorerComponent.graphDependentWorkerFactory = createGraphDependentWorker;

// Ensure HeaderComponent is registered (tree-shaking guard)
void HeaderComponent;

// Shoelace components used directly in the shell template
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

const CHANGE_LABELS = ['MODIFIED', 'ADDED', 'REMOVED'];
const BREAKING_LABELS = ['BREAKING', 'NON-BREAKING'];

@customElement('openapi-changes-report')
export class ReportShell extends LitElement {
    static styles = [reportCss];

    @state() private data: ReportPayload | null = null;
    @state() private activeItemIndex: number = 0;
    @state() private error: string = '';

    private _cachedChartIndex: number = -1;
    private _changeDataset: any[] = [];
    private _breakingDataset: any[] = [];

    @query('pb33f-explorer') private explorer: any;
    @query('pb33f-model-tree') private modelTree: any;
    @query('pb33f-chart') private beefyChart: any;

    connectedCallback() {
        super.connectedCallback();
        this.loadData();
    }

    private loadData() {
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

    private get activeItem(): ReportItem | null {
        if (!this.data?.items?.length) return null;
        return this.data.items[this.activeItemIndex] || null;
    }

    private get isMultiCommit(): boolean {
        return (this.data?.items?.length ?? 0) > 1;
    }

    private selectItem(index: number) {
        this.activeItemIndex = index;
        // updated() lifecycle handles imperative updates when activeItemIndex changes
    }

    private updateExplorer() {
        const item = this.activeItem;
        if (!this.explorer || !item) return;

        this.explorer.embeddedMode = true;
        this.explorer.renderEqualizer = false;
        if (this.explorer.equalizer) {
            this.explorer.equalizer.renderEqualizer = false;
        }
        this.explorer.updateGraphResponse(item.graph as any);
    }

    private updateModelTree() {
        const item = this.activeItem;
        if (!this.modelTree || !item?.graph?.nodes) return;

        const nodeMap = new Map<string, any>();
        for (const node of item.graph.nodes) {
            nodeMap.set(node.id, node);
        }
        this.modelTree.nodeMap = nodeMap;
        this.modelTree.node = nodeMap.get('root') || null;
        this.modelTree.changesEnabled = true;
        this.modelTree.violationMap = new Map();
    }

    private updateBeefyChart() {
        if (!this.beefyChart || !this.data?.history?.changeData) return;
        const cd = this.data.history.changeData;
        this.beefyChart.datasets = cd.datasets;
        this.beefyChart.labels = cd.labels;
        this.beefyChart.buildChart();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);
        if (changedProperties.has('activeItemIndex') || changedProperties.has('data')) {
            this.updateComplete.then(() => {
                this.updateExplorer();
                this.updateModelTree();
                if (changedProperties.has('data')) {
                    this.updateBeefyChart();
                }
            });
        }
    }

    private handleTabShow = (event: SlTabShowEvent) => {
        if (event.detail.name !== 'graph') return;

        this.updateComplete.then(() => {
            if (this.explorer) {
                // Reset viewBox after tab becomes visible so container dimensions are correct.
                // Without this, the explorer computes a viewBox based on zero-height container.
                setTimeout(() => {
                    this.explorer.reset();
                }, 100);
            }
            this.updateModelTree();
        });
    }

    private renderSidebar(): TemplateResult | typeof nothing {
        if (!this.data || this.data.items.length <= 1) return nothing;

        return html`
            <div class="sidebar">
                <h2>Changes</h2>
                ${this.data.items.map((item, i) => html`
                    <div class="commit-item ${i === this.activeItemIndex ? 'active' : ''}"
                         @click=${() => this.selectItem(i)}>
                        <div class="commit-hash">${item.commit.hash.substring(0, 8)}</div>
                        <div class="commit-message">${item.commit.message || 'No message'}</div>
                        <div class="commit-date">${new Date(item.commit.date).toLocaleDateString()}</div>
                        <pb33f-spec-summary-timeline-item
                            .specSummary=${item.summary}
                            .hideScore=${true}
                        ></pb33f-spec-summary-timeline-item>
                    </div>
                `)}
            </div>
        `;
    }

    private updateChartData(): void {
        if (this._cachedChartIndex === this.activeItemIndex) return;
        this._cachedChartIndex = this.activeItemIndex;
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

    private renderStatsBar(): TemplateResult {
        const item = this.activeItem;
        if (!item) return html``;

        this.updateChartData();

        return html`
            <div class="stats-bar">
                <div class="stat-box total">
                    ${item.summary.totalChanges || 0}
                    <span class="stat-label">Total</span>
                </div>
                <div class="stat-box breaking">
                    ${item.summary.breakingChanges || 0}
                    <span class="stat-label">Breaking</span>
                </div>
                <div class="stat-box additions">
                    ${item.summary.additions || 0}
                    <span class="stat-label">Added</span>
                </div>
                <div class="stat-box modifications">
                    ${item.summary.modifications || 0}
                    <span class="stat-label">Modified</span>
                </div>
                <div class="stat-box removals">
                    ${item.summary.removals || 0}
                    <span class="stat-label">Removed</span>
                </div>
            </div>
            <div class="charts-row">
                <pb33f-doughnut-chart changesChart width=250 height=120
                    .datasets=${this._changeDataset} .labels=${CHANGE_LABELS}
                ></pb33f-doughnut-chart>
                ${(item.summary.breakingChanges || 0) > 0 ? html`
                    <pb33f-doughnut-chart breakingChanges width=250 height=120
                        .datasets=${this._breakingDataset} .labels=${BREAKING_LABELS}
                    ></pb33f-doughnut-chart>
                ` : nothing}
            </div>
        `;
    }

    private renderHistoryChart(): TemplateResult | typeof nothing {
        if (!this.isMultiCommit || !this.data?.history?.changeData) return nothing;

        return html`
            <div class="history-section">
                <h3>Change History</h3>
                <pb33f-chart
                    .datasets=${this.data.history.changeData.datasets}
                    .labels=${this.data.history.changeData.labels}
                    style="height: 200px; display: block;"
                ></pb33f-chart>
            </div>
        `;
    }

    render() {
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
        const isSingleItem = this.data.items.length === 1;

        return html`
            <pb33f-header name="openapi-changes" fluid></pb33f-header>
            <div class="report-layout ${isSingleItem ? 'single-item' : ''}">
                ${this.renderSidebar()}
                <div class="main-content">
                    ${this.renderStatsBar()}
                    ${this.renderHistoryChart()}
                    <div class="tab-content">
                        <sl-tab-group @sl-tab-show=${this.handleTabShow}>
                            <sl-tab slot="nav" panel="report">Change Report</sl-tab>
                            <sl-tab slot="nav" panel="changelist">Changed Items</sl-tab>
                            <sl-tab slot="nav" panel="list">Change List</sl-tab>
                            <sl-tab slot="nav" panel="graph">Explore Changes</sl-tab>
                            <sl-tab slot="nav" panel="diff">View Diff</sl-tab>

                            <sl-tab-panel name="report">
                                <div class="change-report">
                                    ${item.htmlReport ? unsafeHTML(item.htmlReport) : html`<p>No report available</p>`}
                                </div>
                            </sl-tab-panel>

                            <sl-tab-panel name="changelist">
                                <pb33f-changes-component .changes=${item.graph.changes || []}></pb33f-changes-component>
                            </sl-tab-panel>

                            <sl-tab-panel name="list">
                                <pb33f-change-list .changes=${item.graph.changes || []}></pb33f-change-list>
                            </sl-tab-panel>

                            <sl-tab-panel name="graph">
                                <pb33f-explorer></pb33f-explorer>
                                <pb33f-model-tree expand style="padding-top: 10px;"></pb33f-model-tree>
                            </sl-tab-panel>

                            <sl-tab-panel name="diff">
                                <openapi-changes-diff-viewer
                                    .originalSpec=${item.originalSpec}
                                    .modifiedSpec=${item.modifiedSpec}
                                    language="yaml"
                                ></openapi-changes-diff-viewer>
                            </sl-tab-panel>
                        </sl-tab-group>
                    </div>
                </div>
            </div>
        `;
    }
}

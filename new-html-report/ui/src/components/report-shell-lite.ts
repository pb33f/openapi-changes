// Lite report shell — same as report-shell but without the explorer tab and ELK dependency.
// This drops ~1.7MB from the bundle by not importing ExplorerComponent or the ELK workers.

import { LitElement, html, nothing, TemplateResult } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import reportCss from '../css/report.css.js';
import type { ReportPayload, ReportItem } from '../model/report-payload.js';
import './diff-viewer.js';

// Import cowboy-components WITHOUT ExplorerComponent — no ELK dependency.
import { HeaderComponent, HttpMethodComponent, PathRenderComponent, ModelTreeNodeClicked } from '@pb33f/cowboy-components/static-report';
import type { NodeClickedEvent } from '@pb33f/cowboy-components/static-report';
import type { DiffViewer } from './diff-viewer.js';
import type { Change } from '../model/report-payload.js';

// Ensure components are registered (tree-shaking guard)
void HeaderComponent;
void HttpMethodComponent;
void PathRenderComponent;

// Shoelace components used directly in the shell template
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';

const CHANGE_LABELS = ['MODIFIED', 'ADDED', 'REMOVED'];
const BREAKING_LABELS = ['BREAKING', 'NON-BREAKING'];

@customElement('openapi-changes-report')
export class ReportShellLite extends LitElement {
    static styles = [reportCss];

    @state() private data: ReportPayload | null = null;
    @state() private activeItemIndex: number = 0;
    @state() private error: string = '';

    private _cachedChartIndex: number = -1;
    private _cachedData: ReportPayload | null = null;
    private _changeDataset: any[] = [];
    private _breakingDataset: any[] = [];

    @query('.navigator-panel pb33f-model-tree') private modelTree: any;
    @query('pb33f-chart') private beefyChart: any;
    @query('.tab-content > sl-tab-group') private mainTabGroup: any;
    @query('openapi-changes-diff-viewer') private diffViewer: DiffViewer;

    connectedCallback() {
        super.connectedCallback();
        this.loadData();
        this.addEventListener(ModelTreeNodeClicked, this._onTreeNodeClicked as EventListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(ModelTreeNodeClicked, this._onTreeNodeClicked as EventListener);
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

    willUpdate(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('activeItemIndex') || changedProperties.has('data')) {
            this.updateChartData();
        }
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);
        if (changedProperties.has('activeItemIndex') || changedProperties.has('data')) {
            this.updateComplete.then(() => {
                this.updateModelTree();
                if (changedProperties.has('data')) {
                    this.updateBeefyChart();
                }
            });
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

    private _onTreeNodeClicked = (evt: CustomEvent<NodeClickedEvent>) => {
        const { changes } = evt.detail;
        if (changes && changes.length > 0) {
            this.navigateToDiffForChanges(changes as Change[]);
        }
    }

    private navigateToDiffForChanges(changes: Change[]) {
        const change = changes.find(c =>
            (c.context?.originalLine > 0) || (c.context?.newLine > 0)
        );
        if (!change) return;

        const originalLine = change.context?.originalLine || 0;
        const modifiedLine = change.context?.newLine || 0;

        if (this.mainTabGroup) {
            this.mainTabGroup.show('diff');
            this.mainTabGroup.updateComplete.then(() => {
                this.diffViewer?.scrollToLine(originalLine, modifiedLine);
            });
        }
    }

    private renderNavigator(): TemplateResult {
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
                                ${this.data!.items.map((item, i) => html`
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
                        </sl-tab-panel>
                    ` : nothing}
                </sl-tab-group>
            </div>
        `;
    }

    private renderSummary(): TemplateResult {
        const item = this.activeItem;
        if (!item) return html``;

        return html`
            <div class="change-summary">
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
                <pb33f-spec-summary-timeline-item
                    .large=${true}
                    .hideScore=${true}
                    .specSummary=${item.summary}
                ></pb33f-spec-summary-timeline-item>
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

        return html`
            <pb33f-header name="openapi-changes" fluid></pb33f-header>
            <div class="report-layout">
                <sl-split-panel class="split-panel" position="18">
                    <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                    <div slot="start" class="navigator-panel">
                        ${this.renderNavigator()}
                    </div>
                    <div slot="end" class="main-content">
                        ${this.renderSummary()}
                        ${this.renderHistoryChart()}
                        <div class="tab-content">
                            <sl-tab-group>
                                <sl-tab slot="nav" panel="report">Change Report</sl-tab>
                                <sl-tab slot="nav" panel="changelist">Changed Items</sl-tab>
                                <sl-tab slot="nav" panel="list">Change List</sl-tab>
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
                </sl-split-panel>
            </div>
        `;
    }
}

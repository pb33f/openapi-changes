import { html, nothing, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { SlTabShowEvent } from '@shoelace-style/shoelace/dist/events/sl-tab-show.js';
import { ReportShellBase } from './report-shell-base.js';
import type { Change } from '../model/report-payload.js';

import { ExplorerComponent, ExplorerNodeClicked } from '@pb33f/cowboy-components/static-report';
import type { NodeClickedEvent } from '@pb33f/cowboy-components/static-report';
import { createElkLayoutWorker } from '../elk-layout-worker-inline.js';
import { createGraphDependentWorker } from '../graph-dependent-worker-inline.js';

ExplorerComponent.elkWorkerFactory = createElkLayoutWorker;
ExplorerComponent.graphDependentWorkerFactory = createGraphDependentWorker;

@customElement('openapi-changes-report')
export class ReportShell extends ReportShellBase {

    @query('pb33f-explorer') private explorer!: ExplorerComponent;

    private _onExplorerNodeClicked = (e: Event) => {
        const nodeId = (e as CustomEvent).detail?.nodeId;
        if (!nodeId) return;
        this.selectNode(nodeId);
        if (this.modelTree) {
            this.modelTree.explorerClicked(nodeId);
        }
        if (this.explorer && this.activeMainTab === 'graph') {
            this.explorer.revealPathToNode(nodeId);
        }
    };

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener(ExplorerNodeClicked, this._onExplorerNodeClicked);
    }

    disconnectedCallback(): void {
        this.removeEventListener(ExplorerNodeClicked, this._onExplorerNodeClicked);
        super.disconnectedCallback();
    }

    protected override onDataOrIndexChanged(changedProperties: Map<string, unknown>): void {
        this.updateExplorer();
        super.onDataOrIndexChanged(changedProperties);
    }

    protected override selectItem(index: number): void {
        if (this.explorer) {
            this.explorer.resetSelection();
        }
        super.selectItem(index);
    }

    protected override onTabShow(event: SlTabShowEvent): void {
        super.onTabShow(event);
        if (event.detail.name === 'graph' && this.explorer) {
            if (this.selectedNodeId) {
                this.updateComplete.then(() => {
                    const node = this.explorer.nodeMap?.get(this.selectedNodeId!);
                    if (node) {
                        this.explorer.revealPathToNode(this.selectedNodeId!);
                    }
                });
            } else {
                this.updateComplete.then(() => {
                    setTimeout(() => this.explorer.centerOnRoot(), 200);
                });
            }
        }
        if (event.detail.name === 'diff' && this.selectedNodeChanges.length > 0) {
            this.selectedDiffChanges = [...this.selectedNodeChanges];
        }
    }

    protected override handleTreeNodeClicked(evt: CustomEvent<NodeClickedEvent>): void {
        const { nodeId } = evt.detail;
        if (!nodeId) return;
        this.selectNode(nodeId);
        if (this.activeMainTab === 'graph' && this.explorer) {
            this.explorer.revealPathToNode(nodeId);
            return;
        }
        super.handleTreeNodeClicked(evt);
    }

    private updateExplorer(): void {
        const item = this.activeItem;
        if (!this.explorer || !item) return;

        this.explorer.embeddedMode = true;
        this.explorer.renderEqualizer = false;
        this.explorer.disablePovMode = true;
        if (this.explorer.equalizer) {
            this.explorer.equalizer.renderEqualizer = false;
        }
        this.explorer.updateGraphResponse(item.graph as any);
    }

    protected override renderExtraTabNavs(): TemplateResult {
        return html`<sl-tab slot="nav" panel="graph">Explore Changes</sl-tab>`;
    }

    protected override renderExtraTabPanels(): TemplateResult | typeof nothing {
        return html`
            <sl-tab-panel name="graph">
                <pb33f-explorer></pb33f-explorer>
            </sl-tab-panel>
        `;
    }
}

import { html, nothing, TemplateResult, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import type { SlTabShowEvent } from '@shoelace-style/shoelace/dist/events/sl-tab-show.js';
import { ReportShellBase } from './report-shell-base.js';
import type { Change } from '@pb33f/cowboy-components/static-report';

import { ExplorerComponent, ExplorerChangePanel, ExplorerNodeClicked, FocusedDiffPanel, GraphMode, createInlineGraphDependentWorker } from '@pb33f/cowboy-components/static-report';
import type { NodeClickedEvent } from '@pb33f/cowboy-components/static-report';
void ExplorerChangePanel;
void FocusedDiffPanel;
import { createElkLayoutWorker } from '../elk-layout-worker-inline.js';

ExplorerComponent.elkWorkerFactory = createElkLayoutWorker;
ExplorerComponent.graphDependentWorkerFactory = createInlineGraphDependentWorker;

@customElement('openapi-changes-report')
export class ReportShell extends ReportShellBase {

    @query('pb33f-explorer') private explorer!: ExplorerComponent;
    @query('.graph-split') private graphSplit!: HTMLElement & { position: number; disabled: boolean };
    @query('.graph-split > sl-icon[slot="divider"]') private graphSplitDivider!: HTMLElement;
    @state() private _changePanelExpanded = false;
    private _manuallyCollapsed = false;
    private _lastExpandedPosition = 70;

    private _applySplitCollapsed() {
        const s = this.graphSplit;
        if (!s) return;
        s.position = 100;
        s.disabled = true;
        s.style.setProperty('--min', '20px');
        s.style.setProperty('--max', 'calc(100% - 20px)');
        s.style.setProperty('--divider-width', '0px');
        s.classList.add('collapsed');
        if (this.graphSplitDivider) this.graphSplitDivider.style.display = 'none';
    }

    private _applySplitExpanded() {
        const s = this.graphSplit;
        if (!s) return;
        s.position = this._lastExpandedPosition;
        s.disabled = false;
        s.style.setProperty('--min', '200px');
        s.style.setProperty('--max', 'calc(100% - 200px)');
        s.style.setProperty('--divider-width', '2px');
        s.classList.remove('collapsed');
        if (this.graphSplitDivider) this.graphSplitDivider.style.display = '';
    }

    protected override updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has('_changePanelExpanded')) {
            if (this._changePanelExpanded) {
                this._applySplitExpanded();
            } else {
                this._applySplitCollapsed();
            }
            // After split panel resize, the explorer's viewBox needs to update
            // for its new container width so node centering works correctly.
            requestAnimationFrame(() => {
                if (this.explorer?.updateViewBoxForContainer) {
                    this.explorer.updateViewBoxForContainer();
                }
            });
        }
    }

    private _onSplitReposition = (e: Event) => {
        const split = e.target as HTMLElement & { position: number };
        if (split && this._changePanelExpanded) {
            this._lastExpandedPosition = split.position;
        }
    };

    private _onChangePanelToggled = (e: Event) => {
        const hidden = (e as CustomEvent).detail.hidden;
        // Save current position before collapsing so we can restore on re-expand
        if (hidden && this.graphSplit?.position && this.graphSplit.position < 100) {
            this._lastExpandedPosition = this.graphSplit.position;
        }
        this._changePanelExpanded = !hidden;
        this._manuallyCollapsed = hidden;
    };

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
        this.addEventListener('explorer-change-panel-toggled', this._onChangePanelToggled);
    }

    disconnectedCallback(): void {
        this.removeEventListener(ExplorerNodeClicked, this._onExplorerNodeClicked);
        this.removeEventListener('explorer-change-panel-toggled', this._onChangePanelToggled);
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
        this._manuallyCollapsed = false;
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

    protected override selectNode(nodeId: string): void {
        super.selectNode(nodeId);
        if (this.selectedNodeChanges.length > 0 && !this._manuallyCollapsed && !this._changePanelExpanded) {
            this._changePanelExpanded = true; // triggers updated() → _applySplitExpanded()
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
        this.explorer.hideExamples = true;
        this.explorer.graphMode = GraphMode.change;
        if (this.explorer.equalizer) {
            this.explorer.equalizer.renderEqualizer = false;
        }
        this.explorer.updateGraphResponse((item.explorerGraph || item.graph) as any);
    }

    protected override renderExtraTabNavs(): TemplateResult {
        return html`<sl-tab slot="nav" panel="graph">Explore Changes</sl-tab>`;
    }

    protected override renderExtraTabPanels(): TemplateResult | typeof nothing {
        const item = this.activeItem;
        return html`
            <sl-tab-panel name="graph">
                <sl-split-panel class="graph-split" @sl-reposition=${this._onSplitReposition}>
                    <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                    <pb33f-explorer slot="start"></pb33f-explorer>
                    <pb33f-explorer-change-panel slot="end"
                        .changes=${this.selectedNodeChanges}
                        ?panel-hidden=${!this._changePanelExpanded}>
                        ${this._changePanelExpanded && item ? html`
                            <pb33f-focused-diff-panel compact
                                .changes=${this.selectedNodeChanges}
                                .originalSpec=${item.originalSpec || ''}
                                .modifiedSpec=${item.modifiedSpec || ''}
                                .originalHighlighted=${item.originalHighlighted || {}}
                                .modifiedHighlighted=${item.modifiedHighlighted || {}}>
                            </pb33f-focused-diff-panel>
                        ` : nothing}
                    </pb33f-explorer-change-panel>
                </sl-split-panel>
            </sl-tab-panel>
        `;
    }
}

import { html, nothing, TemplateResult } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { SlTabShowEvent } from '@shoelace-style/shoelace/dist/events/sl-tab-show.js';
import { ReportShellBase } from './report-shell-base.js';
import type { Change } from '../model/report-payload.js';

import { ExplorerComponent } from '@pb33f/cowboy-components/static-report';
import type { NodeClickedEvent } from '@pb33f/cowboy-components/static-report';
import { createElkLayoutWorker } from '../elk-layout-worker-inline.js';
import { createGraphDependentWorker } from '../graph-dependent-worker-inline.js';

ExplorerComponent.elkWorkerFactory = createElkLayoutWorker;
ExplorerComponent.graphDependentWorkerFactory = createGraphDependentWorker;

@customElement('openapi-changes-report')
export class ReportShell extends ReportShellBase {

    @query('pb33f-explorer') private explorer!: ExplorerComponent;

    protected override onDataOrIndexChanged(changedProperties: Map<string, unknown>): void {
        this.updateExplorer();
        super.onDataOrIndexChanged(changedProperties);
    }

    protected override onTabShow(event: SlTabShowEvent): void {
        super.onTabShow(event);

        if (event.detail.name !== 'graph') return;

        this.updateComplete.then(() => {
            if (this.explorer) {
                // Use centerOnRoot() instead of reset() — reset() triggers a full ELK
                // re-layout that causes the container to scroll out of view.
                setTimeout(() => {
                    this.explorer.centerOnRoot();
                }, 200);
            }
        });
    }

    protected override handleTreeNodeClicked(evt: CustomEvent<NodeClickedEvent>): void {
        const { nodeId, changes } = evt.detail;

        if (this.activeMainTab === 'graph' && this.explorer && nodeId) {
            this.explorer.revealPathToNode(nodeId);
            return;
        }

        if (changes && changes.length > 0) {
            this.navigateToDiffForChanges(changes as Change[]);
        }
    }

    private updateExplorer(): void {
        const item = this.activeItem;
        if (!this.explorer || !item) return;

        this.explorer.embeddedMode = true;
        this.explorer.renderEqualizer = false;
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

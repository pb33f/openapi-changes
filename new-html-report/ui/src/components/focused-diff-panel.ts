import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Change } from '../model/report-payload.js';
import {
    buildFocusedDiffSections,
    type FocusedDiffSection,
    type FocusValueBlock,
    type FocusContextBlock,
    type FocusContextLine,
} from './diff-focus.js';
import { focusedDiffSharedCss } from '../css/focused-diff-shared.css.js';
import focusedDiffPanelCss from '../css/focused-diff-panel.css.js';

import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { RenderJSONPathComponent } from '@pb33f/cowboy-components/static-report';
void RenderJSONPathComponent;

@customElement('openapi-changes-focused-diff-panel')
export class FocusedDiffPanel extends LitElement {

    static styles = [focusedDiffSharedCss, focusedDiffPanelCss];

    @property({ type: Array }) changes: Change[] = [];
    @property() originalSpec: string = '';
    @property() modifiedSpec: string = '';
    @property({ type: Object }) originalHighlighted: Record<number, string> = {};
    @property({ type: Object }) modifiedHighlighted: Record<number, string> = {};
    @property({ type: Boolean }) compact: boolean = false;

    private _cachedSections: FocusedDiffSection[] | null = null;

    willUpdate(changed: PropertyValues) {
        if (changed.has('changes') || changed.has('originalSpec') || changed.has('modifiedSpec')
            || changed.has('originalHighlighted') || changed.has('modifiedHighlighted')) {
            this._cachedSections = null;
        }
    }

    private _getSections(): FocusedDiffSection[] {
        if (this._cachedSections !== null) return this._cachedSections;
        if (!this.changes.length) return [];
        this._cachedSections = buildFocusedDiffSections(
            this.changes,
            this.originalSpec,
            this.modifiedSpec,
            this.originalHighlighted || {},
            this.modifiedHighlighted || {},
            this.compact ? 5 : undefined,
        );
        return this._cachedSections;
    }

    private renderValueBlock(block: FocusValueBlock) {
        return html`
            <div class="focus-panel value-panel ${block.tone}">
                ${!this.compact ? html`<div class="focus-panel-header">${block.title}</div>` : nothing}
                <div class="focus-panel-body">
                    ${block.lines.map(line => html`<div class="focus-value-line">${line}</div>`)}
                </div>
            </div>
        `;
    }

    private renderDiffLine(line: FocusContextLine, tone: 'added' | 'removed') {
        const type = (line.emphasis === 'primary' || line.emphasis === 'range')
            ? (tone === 'removed' ? 'removed' : 'added')
            : 'equal';
        const gutter = type === 'removed' ? '\u2212' : type === 'added' ? '+' : '';
        const lineNum = String(line.lineNum || '');
        return html`
            <div class="diff-line ${type}" data-emphasis=${line.emphasis}>
                <span class="line-gutter">${gutter}</span>
                <span class="line-number">${lineNum}</span>
                <span class="line-content">${line.highlightedContent
                    ? unsafeHTML(line.highlightedContent)
                    : line.content}</span>
            </div>
        `;
    }

    private renderContextBlock(block: FocusContextBlock) {
        return html`
            <div class="focus-panel context-panel ${block.tone}">
                ${!this.compact ? html`<div class="focus-panel-header">${block.title}</div>` : nothing}
                <div class="focus-panel-body">
                    ${block.lines.map(line => this.renderDiffLine(line, block.tone))}
                </div>
            </div>
        `;
    }

    render() {
        const sections = this._getSections();
        if (!sections.length) return nothing;

        return html`
            <div class="stacked-diff">
                ${sections.map(section => {
                    const leftValue = section.valueBlocks.find(b => b.tone === 'removed');
                    const rightValue = section.valueBlocks.find(b => b.tone === 'added');
                    const leftContext = section.contextBlocks.find(b => b.tone === 'removed');
                    const rightContext = section.contextBlocks.find(b => b.tone === 'added');

                    if (this.compact) {
                        return html`
                            <section class="change-card">
                                ${section.breaking ? html`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking</div>` : nothing}
                                ${leftContext ? this.renderContextBlock(leftContext) : nothing}
                                ${rightContext ? this.renderContextBlock(rightContext) : nothing}
                            </section>
                        `;
                    }
                    return html`
                        <section class="change-card">
                            <div class="change-card-header">
                                <div class="change-card-meta">
                                    <h3>${section.title}</h3>
                                    ${section.path ? html`<pb33f-render-json-path class="change-path" .path=${section.path}></pb33f-render-json-path>` : nothing}
                                </div>
                                ${section.breaking ? html`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking</div>` : nothing}
                            </div>
                            ${leftValue ? this.renderValueBlock(leftValue) : nothing}
                            ${leftContext ? this.renderContextBlock(leftContext) : nothing}
                            ${rightValue ? this.renderValueBlock(rightValue) : nothing}
                            ${rightContext ? this.renderContextBlock(rightContext) : nothing}
                        </section>
                    `;
                })}
            </div>
        `;
    }
}

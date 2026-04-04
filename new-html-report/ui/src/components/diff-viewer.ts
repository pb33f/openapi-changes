import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import diffViewerCss from '../css/diff-viewer.css.js';
import type { Change } from '../model/report-payload.js';
import {
    buildFocusedDiffSections,
    type FocusContextBlock,
    type FocusValueBlock,
    type FocusedDiffSection,
} from './diff-focus.js';
import DiffMatchPatch from 'diff-match-patch';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';

interface DiffLine {
    type: 'equal' | 'added' | 'removed' | 'spacer';
    content: string;
    highlightedContent?: string;
    originalLineNum?: number;
    modifiedLineNum?: number;
}

const SPACER: DiffLine = Object.freeze({ type: 'spacer', content: '' } as DiffLine);
const LINE_HEIGHT = 20;
const OVERSCAN = 20;

@customElement('openapi-changes-diff-viewer')
export class DiffViewer extends LitElement {
    static styles = [diffViewerCss];

    @property() originalSpec: string = '';
    @property() modifiedSpec: string = '';
    @property({ type: Object }) originalHighlighted: Record<number, string> = {};
    @property({ type: Object }) modifiedHighlighted: Record<number, string> = {};
    @property({ type: Array }) selectedChanges: Change[] = [];

    @state() private contentMode: 'file' | 'change' = 'file';
    @state() private viewMode: 'side-by-side' | 'unified' = 'side-by-side';
    private _cachedFocusedSections: FocusedDiffSection[] = [];

    private cachedLeft: DiffLine[] = [];
    private cachedRight: DiffLine[] = [];
    private cachedUnified: DiffLine[] = [];

    private originalLineToIndex = new Map<number, number>();
    private modifiedLineToIndex = new Map<number, number>();

    private readonly dmp = (() => { const d = new DiffMatchPatch(); d.Diff_Timeout = 5; return d; })();
    private _highlightTimer: number = 0;
    private _highlightedElement: Element | null = null;

    private _panels: HTMLElement[] = [];
    private _scrollListeners: Array<() => void> = [];
    private _resizeObserver: ResizeObserver | null = null;
    private _rafId = 0;
    private _scrollDirty = false;
    private _syncing = false;
    private _rendering = false;

    private _renderStart: number[] = [0, 0];
    private _renderEnd: number[] = [0, 0];
    private _viewportHeight: number[] = [0, 0];
    private _lastScrollTop: number = 0;

    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('selectedChanges')) {
            this.contentMode = this.hasSelection ? 'change' : 'file';
        }

        const specChanged = changedProperties.has('originalSpec') || changedProperties.has('modifiedSpec');

        if (specChanged) {
            this.recomputeDiffs();
        } else if (changedProperties.has('originalHighlighted') || changedProperties.has('modifiedHighlighted')) {
            this._applyHighlights();
        }

        if (specChanged || changedProperties.has('selectedChanges')
            || changedProperties.has('originalHighlighted') || changedProperties.has('modifiedHighlighted')) {
            this._cachedFocusedSections = [];
        }
    }

    updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        if (changedProperties.has('contentMode') && this.contentMode === 'change') {
            this._teardownScrolling();
        }

        if (
            this.contentMode === 'file' &&
            (changedProperties.has('contentMode')
                || changedProperties.has('viewMode')
                || changedProperties.has('originalSpec')
                || changedProperties.has('modifiedSpec'))
        ) {
            const switchedFromFocused = changedProperties.has('contentMode')
                && changedProperties.get('contentMode') === 'change';

            this.updateComplete.then(() => {
                requestAnimationFrame(() => {
                    let jumpLine = 0;
                    let jumpModLine = 0;
                    if (switchedFromFocused && this.selectedChanges.length > 0) {
                        const change = this.selectedChanges.find(c =>
                            (c.context?.originalLine > 0) || (c.context?.newLine > 0)
                        );
                        if (change) {
                            jumpLine = change.context?.originalLine || 0;
                            jumpModLine = change.context?.newLine || 0;
                        }
                    }
                    this._setupScrolling(jumpLine, jumpModLine);
                });
            });
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._teardownScrolling();
        if (this._highlightTimer) {
            clearTimeout(this._highlightTimer);
            this._highlightTimer = 0;
        }
    }

    private get hasSelection(): boolean {
        return Array.isArray(this.selectedChanges) && this.selectedChanges.length > 0;
    }

    private recomputeDiffs(): void {
        const a = this.dmp.diff_linesToChars_(this.originalSpec, this.modifiedSpec);
        const diffs = this.dmp.diff_main(a.chars1, a.chars2, false);
        this.dmp.diff_charsToLines_(diffs, a.lineArray);

        const left: DiffLine[] = [];
        const right: DiffLine[] = [];
        const unified: DiffLine[] = [];

        const origHL = this.originalHighlighted || {};
        const modHL = this.modifiedHighlighted || {};

        const origMap = new Map<number, number>();
        const modMap = new Map<number, number>();

        let origLine = 1;
        let modLine = 1;

        for (const [op, text] of diffs) {
            const lines = text.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            for (const line of lines) {
                if (op === 0) {
                    const idx = left.length;
                    const dl: DiffLine = {
                        type: 'equal',
                        content: line,
                        highlightedContent: origHL[origLine] || modHL[modLine],
                        originalLineNum: origLine,
                        modifiedLineNum: modLine,
                    };
                    left.push(dl);
                    right.push(dl);
                    unified.push(dl);
                    origMap.set(origLine, idx);
                    modMap.set(modLine, idx);
                    origLine++;
                    modLine++;
                } else if (op === -1) {
                    const idx = left.length;
                    const dl: DiffLine = {
                        type: 'removed',
                        content: line,
                        highlightedContent: origHL[origLine],
                        originalLineNum: origLine,
                    };
                    left.push(dl);
                    right.push(SPACER);
                    unified.push(dl);
                    origMap.set(origLine, idx);
                    origLine++;
                } else if (op === 1) {
                    const idx = right.length;
                    const dl: DiffLine = {
                        type: 'added',
                        content: line,
                        highlightedContent: modHL[modLine],
                        modifiedLineNum: modLine,
                    };
                    right.push(dl);
                    left.push(SPACER);
                    unified.push(dl);
                    modMap.set(modLine, idx);
                    modLine++;
                }
            }
        }

        this.cachedLeft = left;
        this.cachedRight = right;
        this.cachedUnified = unified;
        this.originalLineToIndex = origMap;
        this.modifiedLineToIndex = modMap;
        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
    }

    private _applyHighlights(): void {
        const origHL = this.originalHighlighted || {};
        const modHL = this.modifiedHighlighted || {};

        // left and right arrays cover all lines; equal lines share object refs
        // with cachedUnified, so mutating here updates unified too.
        for (const line of this.cachedLeft) {
            if (line.type === 'spacer') continue;
            if (line.originalLineNum) line.highlightedContent = origHL[line.originalLineNum];
            else if (line.modifiedLineNum) line.highlightedContent = modHL[line.modifiedLineNum];
        }
        for (const line of this.cachedRight) {
            if (line.type === 'spacer') continue;
            if (line.modifiedLineNum) line.highlightedContent = modHL[line.modifiedLineNum];
            else if (line.originalLineNum) line.highlightedContent = origHL[line.originalLineNum];
        }

        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
    }

    private _pendingJump: [number, number] = [0, 0];

    private _setupScrolling(jumpOrigLine = 0, jumpModLine = 0) {
        this._teardownScrolling();
        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
        this._lastScrollTop = 0;
        this._pendingJump = [jumpOrigLine, jumpModLine];

        const panels = Array.from(this.renderRoot.querySelectorAll('.diff-panel')) as HTMLElement[];
        this._panels = panels;

        if (!panels.length) return;

        for (const panel of panels) {
            panel.scrollTop = 0;
        }

        this._resizeObserver = new ResizeObserver(() => {
            this._markDirty();
        });

        for (let i = 0; i < panels.length; i++) {
            const panel = panels[i];
            this._resizeObserver.observe(panel);

            const listener = () => {
                if (this._rendering || this._syncing) return;
                this._lastScrollTop = panel.scrollTop;
                if (this.viewMode === 'side-by-side' && panels.length === 2) {
                    this._syncing = true;
                    panels[1 - i].scrollTop = this._lastScrollTop;
                    this._syncing = false;
                }
                this._markDirty();
            };
            panel.addEventListener('scroll', listener, { passive: true });
            this._scrollListeners.push(() => panel.removeEventListener('scroll', listener));
        }

        this._markDirty();
    }

    private _teardownScrolling() {
        for (const remove of this._scrollListeners) remove();
        this._scrollListeners = [];
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        if (this._rafId) {
            cancelAnimationFrame(this._rafId);
            this._rafId = 0;
        }
        this._scrollDirty = false;
        this._panels = [];
    }

    private _markDirty() {
        if (this._scrollDirty) return;
        this._scrollDirty = true;
        this._rafId = requestAnimationFrame(() => {
            this._scrollDirty = false;
            this._rafId = 0;
            this._updateAllPanels();
        });
    }

    private _updateAllPanels() {
        const sharedScroll = this._lastScrollTop;

        for (let i = 0; i < this._panels.length; i++) {
            const panel = this._panels[i];
            const lines = this._getLinesForPanel(i);
            const scrollTop = this.viewMode === 'side-by-side' ? sharedScroll : panel.scrollTop;
            const viewportH = panel.clientHeight;
            this._viewportHeight[i] = viewportH;

            const totalLines = lines.length;
            const start = Math.max(0, Math.floor(scrollTop / LINE_HEIGHT) - OVERSCAN);
            const end = Math.min(totalLines, Math.ceil((scrollTop + viewportH) / LINE_HEIGHT) + OVERSCAN);

            if (start === this._renderStart[i] && end === this._renderEnd[i]) continue;

            this._renderStart[i] = start;
            this._renderEnd[i] = end;

            const side = this._getSideForPanel(i);
            this._renderRange(panel, lines, start, end, totalLines, side);
        }

        // Apply pending jump after first render creates scroll height
        if (this._pendingJump[0] > 0 || this._pendingJump[1] > 0) {
            const [origLine, modLine] = this._pendingJump;
            this._pendingJump = [0, 0];
            requestAnimationFrame(() => this.scrollToLine(origLine, modLine));
        }
    }

    private _getLinesForPanel(panelIndex: number): DiffLine[] {
        if (this.viewMode === 'unified') return this.cachedUnified;
        return panelIndex === 0 ? this.cachedLeft : this.cachedRight;
    }

    private _getSideForPanel(panelIndex: number): 'left' | 'right' | 'unified' {
        if (this.viewMode === 'unified') return 'unified';
        return panelIndex === 0 ? 'left' : 'right';
    }

    private _renderRange(
        panel: HTMLElement,
        lines: DiffLine[],
        start: number,
        end: number,
        total: number,
        side: 'left' | 'right' | 'unified',
    ) {
        const padTop = panel.querySelector('.scroll-pad-top') as HTMLElement;
        const visibleContainer = panel.querySelector('.visible-lines') as HTMLElement;
        const padBottom = panel.querySelector('.scroll-pad-bottom') as HTMLElement;

        if (!padTop || !visibleContainer || !padBottom) return;

        if (this._highlightedElement) {
            this._highlightedElement = null;
        }

        this._rendering = true;
        const savedScroll = panel.scrollTop;

        padTop.style.height = `${start * LINE_HEIGHT}px`;
        padBottom.style.height = `${(total - end) * LINE_HEIGHT}px`;

        const fragment = document.createDocumentFragment();
        for (let i = start; i < end; i++) {
            fragment.appendChild(this._createLineElement(lines[i], side));
        }
        visibleContainer.replaceChildren(fragment);

        panel.scrollTop = savedScroll;
        this._rendering = false;
    }

    private _createLineElement(line: DiffLine, side: 'left' | 'right' | 'unified'): HTMLElement {
        const div = document.createElement('div');
        div.className = `diff-line ${line.type}`;

        if (line.originalLineNum) div.dataset.originalLine = String(line.originalLineNum);
        if (line.modifiedLineNum) div.dataset.modifiedLine = String(line.modifiedLineNum);

        const gutter = document.createElement('span');
        gutter.className = 'line-gutter';
        if (line.type === 'removed') gutter.textContent = '−';
        else if (line.type === 'added') gutter.textContent = '+';
        div.appendChild(gutter);

        const numSpan = document.createElement('span');
        numSpan.className = 'line-number';
        if (side === 'left') {
            numSpan.textContent = line.originalLineNum ? String(line.originalLineNum) : '';
        } else if (side === 'right') {
            numSpan.textContent = line.modifiedLineNum ? String(line.modifiedLineNum) : '';
        } else {
            const orig = line.originalLineNum;
            const mod = line.modifiedLineNum;
            numSpan.textContent = line.type === 'equal' ? String(orig || '') : String(orig || mod || '');
        }
        div.appendChild(numSpan);

        const content = document.createElement('span');
        content.className = 'line-content';
        if (line.highlightedContent) content.innerHTML = line.highlightedContent;
        else content.textContent = line.content;
        div.appendChild(content);

        return div;
    }

    async scrollToLine(originalLine: number, modifiedLine?: number): Promise<void> {
        await this.updateComplete;
        if (this.contentMode !== 'file') return;
        if (originalLine <= 0 && (!modifiedLine || modifiedLine <= 0)) return;

        let targetIndex = -1;
        if (originalLine > 0) {
            targetIndex = this.originalLineToIndex.get(originalLine) ?? -1;
        }
        if (targetIndex < 0 && modifiedLine && modifiedLine > 0) {
            targetIndex = this.modifiedLineToIndex.get(modifiedLine) ?? -1;
        }
        if (targetIndex < 0) return;

        const panel = this._panels[0];
        if (!panel) return;
        const vpHeight = this._viewportHeight[0] || panel.clientHeight;
        const targetScroll = Math.max(0, (targetIndex * LINE_HEIGHT) - (vpHeight / 2) + (LINE_HEIGHT / 2));
        panel.scrollTop = targetScroll;

        if (this._panels.length > 1) {
            this._panels[1].scrollTop = targetScroll;
        }

        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        const selector = originalLine > 0
            ? `[data-original-line="${originalLine}"]`
            : `[data-modified-line="${modifiedLine}"]`;
        const target = panel.querySelector(selector);

        if (target) {
            if (this._highlightTimer) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = 0;
            }
            if (this._highlightedElement) {
                this._highlightedElement.classList.remove('highlight');
                this._highlightedElement = null;
            }

            target.classList.add('highlight');
            this._highlightedElement = target;
            this._highlightTimer = window.setTimeout(() => {
                target?.classList.remove('highlight');
                this._highlightedElement = null;
                this._highlightTimer = 0;
            }, 2000);
        }
    }

    private renderControls() {
        return html`
            <div class="view-toggle">
                ${this.hasSelection ? html`
                    <sl-radio-group class="view-radio-group" size="small"
                        value=${this.contentMode}
                        @sl-change=${(e: Event) => {
                            this.contentMode = (e.target as HTMLInputElement).value;
                        }}>
                        <sl-radio-button value="change" size="small">Focused</sl-radio-button>
                        <sl-radio-button value="file" size="small">File Diff</sl-radio-button>
                    </sl-radio-group>
                ` : nothing}
                ${this.contentMode === 'file' ? html`
                    <sl-radio-group class="view-radio-group" size="small"
                        value=${this.viewMode}
                        @sl-change=${(e: Event) => {
                            this.viewMode = (e.target as HTMLInputElement).value;
                        }}>
                        <sl-radio-button value="side-by-side" size="small">Side by Side</sl-radio-button>
                        <sl-radio-button value="unified" size="small">Unified</sl-radio-button>
                    </sl-radio-group>
                ` : nothing}
            </div>
        `;
    }

    private renderFocusedDiff() {
        if (!this._cachedFocusedSections.length && this.selectedChanges.length) {
            this._cachedFocusedSections = buildFocusedDiffSections(
                this.selectedChanges,
                this.originalSpec,
                this.modifiedSpec,
                this.originalHighlighted || {},
                this.modifiedHighlighted || {},
            );
        }
        const sections = this._cachedFocusedSections;

        if (!sections.length) {
            return html`
                ${this.renderControls()}
                <div class="no-data">No focused changes available</div>
            `;
        }

        // Collect left (removed/original) and right (added/modified) content across all sections
        const leftParts: unknown[] = [];
        const rightParts: unknown[] = [];

        for (const section of sections) {
            const header = html`
                <div class="change-card-header">
                    <div class="change-card-meta">
                        <h3>${section.title}</h3>
                        ${section.path ? html`<pb33f-render-json-path class="change-path" .path=${section.path}></pb33f-render-json-path>` : nothing}
                    </div>
                    ${section.breaking ? html`<div class="breaking-pill"><sl-icon name="heartbreak-fill"></sl-icon> Breaking Change</div>` : nothing}
                </div>
            `;

            const leftValue = section.valueBlocks.find(b => b.tone === 'removed');
            const rightValue = section.valueBlocks.find(b => b.tone === 'added');
            const leftContext = section.contextBlocks.find(b => b.tone === 'removed');
            const rightContext = section.contextBlocks.find(b => b.tone === 'added');

            const hasLeft = !!(leftValue || leftContext);
            const hasRight = !!(rightValue || rightContext);

            if (hasLeft) {
                leftParts.push(html`
                    <section class="change-card">
                        ${header}
                        ${leftValue ? this.renderValueBlock(leftValue) : nothing}
                        ${leftContext ? this.renderContextBlock(leftContext) : nothing}
                    </section>
                `);
            }
            if (hasRight) {
                rightParts.push(html`
                    <section class="change-card">
                        ${header}
                        ${rightValue ? this.renderValueBlock(rightValue) : nothing}
                        ${rightContext ? this.renderContextBlock(rightContext) : nothing}
                    </section>
                `);
            }
        }

        const hasLeftContent = leftParts.length > 0;
        const hasRightContent = rightParts.length > 0;

        // Single-side only: full-width, no split panel
        if (hasLeftContent && !hasRightContent) {
            return html`
                ${this.renderControls()}
                <div class="focused-diff-panel full">${leftParts}</div>
            `;
        }
        if (hasRightContent && !hasLeftContent) {
            return html`
                ${this.renderControls()}
                <div class="focused-diff-panel full">${rightParts}</div>
            `;
        }

        return html`
            ${this.renderControls()}
            <sl-split-panel class="focus-split-main">
                <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                <div slot="start" class="focused-diff-panel">
                    ${leftParts}
                </div>
                <div slot="end" class="focused-diff-panel">
                    ${rightParts}
                </div>
            </sl-split-panel>
        `;
    }

    private renderValueBlock(block: FocusValueBlock) {
        return html`
            <div class="focus-panel value-panel ${block.tone}">
                <div class="focus-panel-header">${block.title}</div>
                <div class="focus-panel-body">
                    ${block.lines.map(line => html`<div class="focus-value-line">${line}</div>`)}
                </div>
            </div>
        `;
    }

    private renderContextBlock(block: FocusContextBlock) {
        const side: 'left' | 'right' = block.tone === 'removed' ? 'left' : 'right';
        const lineElements = block.lines.map(line => {
            const dl: DiffLine = {
                type: (line.emphasis === 'primary' || line.emphasis === 'range')
                    ? (block.tone === 'removed' ? 'removed' : 'added')
                    : 'equal',
                content: line.content,
                highlightedContent: line.highlightedContent,
                originalLineNum: block.tone === 'removed' ? line.lineNum : undefined,
                modifiedLineNum: block.tone === 'added' ? line.lineNum : undefined,
            };
            const el = this._createLineElement(dl, side);
            if (line.emphasis === 'primary') el.dataset.emphasis = 'primary';
            else if (line.emphasis === 'range') el.dataset.emphasis = 'range';
            return el;
        });

        return html`
            <div class="focus-panel context-panel ${block.tone}">
                <div class="focus-panel-header">${block.title}</div>
                <div class="focus-panel-body">${lineElements}</div>
            </div>
        `;
    }

    render() {
        if (!this.originalSpec && !this.modifiedSpec) {
            return html`<div class="no-data">No spec data available</div>`;
        }

        if (this.contentMode === 'change' && this.hasSelection) {
            return this.renderFocusedDiff();
        }

        if (this.viewMode === 'unified') {
            return html`
                ${this.renderControls()}
                <div class="diff-container unified">
                    <div class="diff-panel">
                        <div class="diff-header">Unified Diff</div>
                        <div class="scroll-pad-top"></div>
                        <div class="visible-lines"></div>
                        <div class="scroll-pad-bottom"></div>
                    </div>
                </div>
            `;
        }

        return html`
            ${this.renderControls()}
            <sl-split-panel class="diff-split">
                <sl-icon slot="divider" name="grip-vertical" class="divider-vert" aria-hidden="true"></sl-icon>
                <div slot="start" class="diff-panel">
                    <div class="diff-header">Original</div>
                    <div class="scroll-pad-top"></div>
                    <div class="visible-lines"></div>
                    <div class="scroll-pad-bottom"></div>
                </div>
                <div slot="end" class="diff-panel">
                    <div class="diff-header">Modified</div>
                    <div class="scroll-pad-top"></div>
                    <div class="visible-lines"></div>
                    <div class="scroll-pad-bottom"></div>
                </div>
            </sl-split-panel>
        `;
    }
}

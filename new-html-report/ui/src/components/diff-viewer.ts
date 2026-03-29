import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import diffViewerCss from '../css/diff-viewer.css.js';
// @ts-ignore
import DiffMatchPatch from 'diff-match-patch';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

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

    @state() private viewMode: 'side-by-side' | 'unified' = 'side-by-side';

    private cachedLeft: DiffLine[] = [];
    private cachedRight: DiffLine[] = [];
    private cachedUnified: DiffLine[] = [];

    // Line number → array index lookup maps for scrollToLine
    private originalLineToIndex = new Map<number, number>();
    private modifiedLineToIndex = new Map<number, number>();

    private readonly dmp = new DiffMatchPatch();
    private _highlightTimer: number = 0;
    private _highlightedElement: Element | null = null;

    // Virtual scroll state
    private _panels: HTMLElement[] = [];
    private _scrollListeners: Array<() => void> = [];
    private _resizeObserver: ResizeObserver | null = null;
    private _rafId = 0;
    private _scrollDirty = false;
    private _syncing = false;
    private _rendering = false;

    // Per-panel render state
    private _renderStart: number[] = [0, 0];
    private _renderEnd: number[] = [0, 0];
    private _viewportHeight: number[] = [0, 0];
    private _lastScrollTop: number = 0;

    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('originalSpec') || changedProperties.has('modifiedSpec')) {
            this.recomputeDiffs();
        } else if (changedProperties.has('originalHighlighted') || changedProperties.has('modifiedHighlighted')) {
            // Specs unchanged — only update highlight data on existing cached lines
            this._applyHighlights();
        }
    }

    updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);
        if (changedProperties.has('viewMode') || changedProperties.has('originalSpec') ||
            changedProperties.has('modifiedSpec')) {
            // DOM structure changed — wait for layout to settle before attaching
            this.updateComplete.then(() => {
                // Double-rAF ensures the browser has laid out the new DOM
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        this._setupScrolling();
                    });
                });
            });
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._teardownScrolling();
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
                        type: 'equal', content: line,
                        highlightedContent: origHL[origLine] || modHL[modLine],
                        originalLineNum: origLine, modifiedLineNum: modLine,
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
                        type: 'removed', content: line,
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
                        type: 'added', content: line,
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

        // Reset render ranges to force re-render
        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
    }

    // Update highlight data on existing cached lines without recomputing the diff
    private _applyHighlights(): void {
        const origHL = this.originalHighlighted || {};
        const modHL = this.modifiedHighlighted || {};

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
        for (const line of this.cachedUnified) {
            if (line.type === 'spacer') continue;
            if (line.originalLineNum) line.highlightedContent = origHL[line.originalLineNum];
            else if (line.modifiedLineNum) line.highlightedContent = modHL[line.modifiedLineNum];
        }

        // Force re-render of visible range
        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
    }

    // ── Virtual scroll setup/teardown ──

    private _setupScrolling() {
        this._teardownScrolling();

        // Reset render state and scroll positions on view mode switch
        this._renderStart = [-1, -1];
        this._renderEnd = [-1, -1];
        this._lastScrollTop = 0;

        const panels = Array.from(this.renderRoot.querySelectorAll('.diff-panel')) as HTMLElement[];
        this._panels = panels;

        if (!panels.length) return;

        // Reset scroll positions to top
        for (const panel of panels) {
            panel.scrollTop = 0;
        }

        // ResizeObserver to track viewport height
        this._resizeObserver = new ResizeObserver(() => {
            this._markDirty();
        });

        for (let i = 0; i < panels.length; i++) {
            const panel = panels[i];
            this._resizeObserver.observe(panel);

            const listener = () => {
                // Guards rely on passive scroll listeners firing asynchronously (true in all modern browsers).
                // _rendering: prevents feedback from DOM mutation in _renderRange shifting scrollTop.
                // _syncing: prevents A→B→A loop during linked scroll sync.
                if (this._rendering || this._syncing) return;
                this._lastScrollTop = panel.scrollTop;
                // Linked scrolling for side-by-side — sync immediately
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

        // Initial render
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
        // In side-by-side, use the shared scroll position for both panels
        // so they render from the exact same value in the same frame.
        const sharedScroll = this._lastScrollTop;

        for (let i = 0; i < this._panels.length; i++) {
            const panel = this._panels[i];
            const lines = this._getLinesForPanel(i);
            const scrollTop = (this.viewMode === 'side-by-side') ? sharedScroll : panel.scrollTop;
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
    }

    private _getLinesForPanel(panelIndex: number): DiffLine[] {
        if (this.viewMode === 'unified') return this.cachedUnified;
        return panelIndex === 0 ? this.cachedLeft : this.cachedRight;
    }

    private _getSideForPanel(panelIndex: number): 'left' | 'right' | 'unified' {
        if (this.viewMode === 'unified') return 'unified';
        return panelIndex === 0 ? 'left' : 'right';
    }

    // ── Imperative DOM rendering ──

    private _renderRange(panel: HTMLElement, lines: DiffLine[], start: number, end: number, total: number, side: 'left' | 'right' | 'unified') {
        const padTop = panel.querySelector('.scroll-pad-top') as HTMLElement;
        const visibleContainer = panel.querySelector('.visible-lines') as HTMLElement;
        const padBottom = panel.querySelector('.scroll-pad-bottom') as HTMLElement;

        if (!padTop || !visibleContainer || !padBottom) return;

        // Clear stale highlight reference — replaceChildren will destroy the element
        if (this._highlightedElement) {
            this._highlightedElement = null;
        }

        // Guard: prevent scroll events fired by DOM mutation from causing feedback
        this._rendering = true;
        const savedScroll = panel.scrollTop;

        padTop.style.height = `${start * LINE_HEIGHT}px`;
        padBottom.style.height = `${(total - end) * LINE_HEIGHT}px`;

        const fragment = document.createDocumentFragment();
        for (let i = start; i < end; i++) {
            fragment.appendChild(this._createLineElement(lines[i], side));
        }
        visibleContainer.replaceChildren(fragment);

        // Restore scroll position in case the DOM mutation shifted it
        panel.scrollTop = savedScroll;
        this._rendering = false;
    }

    private _createLineElement(line: DiffLine, side: 'left' | 'right' | 'unified'): HTMLElement {
        const div = document.createElement('div');
        div.className = `diff-line ${line.type}`;

        if (line.originalLineNum) div.dataset.originalLine = String(line.originalLineNum);
        if (line.modifiedLineNum) div.dataset.modifiedLine = String(line.modifiedLineNum);

        // Gutter
        const gutter = document.createElement('span');
        gutter.className = 'line-gutter';
        if (line.type === 'removed') gutter.textContent = '−';
        else if (line.type === 'added') gutter.textContent = '+';
        div.appendChild(gutter);

        // Line number
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

        // Content
        const content = document.createElement('span');
        content.className = 'line-content';
        if (line.highlightedContent) {
            content.innerHTML = line.highlightedContent;
        } else {
            content.textContent = line.content;
        }
        div.appendChild(content);

        return div;
    }

    // ── scrollToLine (virtualization-aware) ──

    async scrollToLine(originalLine: number, modifiedLine?: number): Promise<void> {
        await this.updateComplete;
        if (originalLine <= 0 && (!modifiedLine || modifiedLine <= 0)) return;

        // Find target array index
        let targetIndex = -1;
        if (originalLine > 0) {
            targetIndex = this.originalLineToIndex.get(originalLine) ?? -1;
        }
        if (targetIndex < 0 && modifiedLine && modifiedLine > 0) {
            targetIndex = this.modifiedLineToIndex.get(modifiedLine) ?? -1;
        }
        if (targetIndex < 0) return;

        // Scroll to center the target
        const panel = this._panels[0];
        if (!panel) return;
        const vpHeight = this._viewportHeight[0] || panel.clientHeight;
        const targetScroll = Math.max(0, (targetIndex * LINE_HEIGHT) - (vpHeight / 2) + (LINE_HEIGHT / 2));
        panel.scrollTop = targetScroll;

        // If side-by-side, sync the other panel too
        if (this._panels.length > 1) {
            this._panels[1].scrollTop = targetScroll;
        }

        // Wait for the render to complete (double-rAF ensures DOM update)
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

        // Find and highlight the element
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

    // ── Lit render (skeleton only) ──

    render() {
        if (!this.originalSpec && !this.modifiedSpec) {
            return html`<div class="no-data">No spec data available</div>`;
        }

        if (this.viewMode === 'unified') {
            return html`
                <div class="view-toggle">
                    <button @click=${() => this.viewMode = 'side-by-side'}>Side by Side</button>
                    <button class="active" @click=${() => this.viewMode = 'unified'}>Unified</button>
                </div>
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
            <div class="view-toggle">
                <button class="active" @click=${() => this.viewMode = 'side-by-side'}>Side by Side</button>
                <button @click=${() => this.viewMode = 'unified'}>Unified</button>
            </div>
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

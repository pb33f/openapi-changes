import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import diffViewerCss from '../css/diff-viewer.css.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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

@customElement('openapi-changes-diff-viewer')
export class DiffViewer extends LitElement {
    static styles = [diffViewerCss];

    @property() originalSpec: string = '';
    @property() modifiedSpec: string = '';
    @property({ type: Object }) originalHighlighted: Record<number, string> = {};
    @property({ type: Object }) modifiedHighlighted: Record<number, string> = {};

    @state() private viewMode: 'side-by-side' | 'unified' = 'side-by-side';
    @state() private cachedLeft: DiffLine[] = [];
    @state() private cachedRight: DiffLine[] = [];
    @state() private cachedUnified: DiffLine[] = [];

    private readonly dmp = new DiffMatchPatch();
    private _highlightTimer: number = 0;
    private _highlightedElement: Element | null = null;

    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('originalSpec') || changedProperties.has('modifiedSpec') ||
            changedProperties.has('originalHighlighted') || changedProperties.has('modifiedHighlighted')) {
            this.recomputeDiffs();
        }
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

        let origLine = 1;
        let modLine = 1;

        for (const [op, text] of diffs) {
            const lines = text.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            for (const line of lines) {
                if (op === 0) {
                    const dl: DiffLine = {
                        type: 'equal', content: line,
                        highlightedContent: origHL[origLine] || modHL[modLine],
                        originalLineNum: origLine, modifiedLineNum: modLine,
                    };
                    left.push(dl);
                    right.push(dl);
                    unified.push(dl);
                    origLine++;
                    modLine++;
                } else if (op === -1) {
                    const dl: DiffLine = {
                        type: 'removed', content: line,
                        highlightedContent: origHL[origLine],
                        originalLineNum: origLine,
                    };
                    left.push(dl);
                    right.push(SPACER);
                    unified.push(dl);
                    origLine++;
                } else if (op === 1) {
                    const dl: DiffLine = {
                        type: 'added', content: line,
                        highlightedContent: modHL[modLine],
                        modifiedLineNum: modLine,
                    };
                    right.push(dl);
                    left.push(SPACER);
                    unified.push(dl);
                    modLine++;
                }
            }
        }

        this.cachedLeft = left;
        this.cachedRight = right;
        this.cachedUnified = unified;
    }

    private renderDiffLine(line: DiffLine, side: 'left' | 'right' | 'unified'): TemplateResult {
        let lineNum: number | string = '';
        if (side === 'left') {
            lineNum = line.originalLineNum ?? '';
        } else if (side === 'right') {
            lineNum = line.modifiedLineNum ?? '';
        } else {
            // Unified: show both when available
            const orig = line.originalLineNum ?? '';
            const mod = line.modifiedLineNum ?? '';
            lineNum = line.type === 'equal' ? orig : (orig || mod);
        }

        const gutter = line.type === 'removed' ? '−' : line.type === 'added' ? '+' : '';

        return html`
            <div class="diff-line ${line.type}"
                 data-original-line="${line.originalLineNum ?? ''}"
                 data-modified-line="${line.modifiedLineNum ?? ''}">
                <span class="line-gutter">${gutter}</span>
                <span class="line-number">${lineNum}</span>
                <span class="line-content">${unsafeHTML(line.highlightedContent || line.content)}</span>
            </div>
        `;
    }

    async scrollToLine(originalLine: number, modifiedLine?: number): Promise<void> {
        await this.updateComplete;
        if (originalLine <= 0 && (!modifiedLine || modifiedLine <= 0)) return;

        let target: Element | null = null;

        if (this.viewMode === 'side-by-side') {
            const panels = this.renderRoot.querySelectorAll('.diff-panel');
            if (originalLine > 0 && panels[0]) {
                target = panels[0].querySelector(`[data-original-line="${originalLine}"]`);
            }
            if (!target && modifiedLine && modifiedLine > 0 && panels[1]) {
                target = panels[1].querySelector(`[data-modified-line="${modifiedLine}"]`);
            }
        } else {
            if (originalLine > 0) {
                target = this.renderRoot.querySelector(`[data-original-line="${originalLine}"]`);
            }
            if (!target && modifiedLine && modifiedLine > 0) {
                target = this.renderRoot.querySelector(`[data-modified-line="${modifiedLine}"]`);
            }
        }

        if (target) {
            // Clear previous highlight before starting a new one
            if (this._highlightTimer) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = 0;
            }
            if (this._highlightedElement) {
                this._highlightedElement.classList.remove('highlight');
                this._highlightedElement = null;
            }

            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight');
            this._highlightedElement = target;
            this._highlightTimer = window.setTimeout(() => {
                target?.classList.remove('highlight');
                this._highlightedElement = null;
                this._highlightTimer = 0;
            }, 2000);
        }
    }

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
                        ${this.cachedUnified.map((line) => this.renderDiffLine(line, 'unified'))}
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
                    ${this.cachedLeft.map((line) => this.renderDiffLine(line, 'left'))}
                </div>
                <div slot="end" class="diff-panel">
                    <div class="diff-header">Modified</div>
                    ${this.cachedRight.map((line) => this.renderDiffLine(line, 'right'))}
                </div>
            </sl-split-panel>
        `;
    }
}

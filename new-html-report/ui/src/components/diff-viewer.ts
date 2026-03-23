import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import diffViewerCss from '../css/diff-viewer.css.js';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
// @ts-ignore
import DiffMatchPatch from 'diff-match-patch';

interface DiffLine {
    type: 'equal' | 'added' | 'removed';
    content: string;
    highlightedContent?: string;
    originalLineNum?: number;
    modifiedLineNum?: number;
}

const SPACER: DiffLine = Object.freeze({ type: 'equal', content: '' } as DiffLine);

@customElement('openapi-changes-diff-viewer')
export class DiffViewer extends LitElement {
    static styles = [diffViewerCss];

    @property() originalSpec: string = '';
    @property() modifiedSpec: string = '';
    @property() language: string = 'yaml';

    @state() private viewMode: 'side-by-side' | 'unified' = 'side-by-side';
    @state() private cachedLeft: DiffLine[] = [];
    @state() private cachedRight: DiffLine[] = [];
    @state() private cachedUnified: DiffLine[] = [];

    private readonly dmp = new DiffMatchPatch();

    willUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('originalSpec') || changedProperties.has('modifiedSpec') || changedProperties.has('language')) {
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

        const grammar = this.language === 'json' ? Prism.languages.json : Prism.languages.yaml;
        const lang = this.language;
        const highlight = (content: string): string => {
            try {
                return Prism.highlight(content, grammar, lang);
            } catch {
                return content;
            }
        };

        let origLine = 1;
        let modLine = 1;

        for (const [op, text] of diffs) {
            const lines = text.split('\n');
            if (lines[lines.length - 1] === '') lines.pop();

            for (const line of lines) {
                const highlighted = highlight(line);
                if (op === 0) {
                    const dl: DiffLine = {
                        type: 'equal', content: line, highlightedContent: highlighted,
                        originalLineNum: origLine, modifiedLineNum: modLine,
                    };
                    left.push(dl);
                    right.push(dl);
                    unified.push(dl);
                    origLine++;
                    modLine++;
                } else if (op === -1) {
                    const dl: DiffLine = {
                        type: 'removed', content: line, highlightedContent: highlighted,
                        originalLineNum: origLine,
                    };
                    left.push(dl);
                    // Spacer on right side to keep panels aligned
                    right.push(SPACER);
                    unified.push(dl);
                    origLine++;
                } else if (op === 1) {
                    const dl: DiffLine = {
                        type: 'added', content: line, highlightedContent: highlighted,
                        modifiedLineNum: modLine,
                    };
                    right.push(dl);
                    // Spacer on left side to keep panels aligned
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

        return html`
            <div class="diff-line ${line.type}"
                 data-original-line="${line.originalLineNum ?? ''}"
                 data-modified-line="${line.modifiedLineNum ?? ''}">
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
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('highlight');
            setTimeout(() => target?.classList.remove('highlight'), 2000);
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
            <div class="diff-container">
                <div class="diff-panel">
                    <div class="diff-header">Original</div>
                    ${this.cachedLeft.map((line) => this.renderDiffLine(line, 'left'))}
                </div>
                <div class="diff-panel">
                    <div class="diff-header">Modified</div>
                    ${this.cachedRight.map((line) => this.renderDiffLine(line, 'right'))}
                </div>
            </div>
        `;
    }
}

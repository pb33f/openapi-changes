import { css } from 'lit';

/**
 * Shared CSS for focused diff rendering — used by both the full diff viewer
 * and the narrow explorer side panel. Single source of truth.
 */
export const focusedDiffSharedCss = css`
    .change-card {
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        background: var(--background-color);
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
        padding: var(--global-padding-half) var(--global-padding) 40px var(--global-padding);
        margin-bottom: var(--global-padding);
    }

    .change-card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: var(--global-padding);
    }

    .change-card-meta h3 {
        margin: 0;
        border: 0;
        padding: 0;
        color: var(--font-color);
    }

    .change-path {
        display: block;
        word-break: break-word;
        font-size: 0.8rem;
    }

    .breaking-pill {
        border: 1px solid var(--error-color);
        color: var(--error-color);
        padding: var(--global-padding-half) var(--global-padding);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        white-space: nowrap;
        font-size: 0.8rem;
        margin-top: var(--global-padding);
    }

    .breaking-pill > sl-icon {
        font-size: 1rem;
        vertical-align: middle;
    }

    .focus-panel {
        border: 1px solid var(--hrcolor);
        min-width: 0;
        overflow: hidden;
    }

    .focus-panel-header {
        padding: var(--global-padding-half) var(--global-padding);
        border-bottom: 1px solid var(--hrcolor);
        text-transform: uppercase;
        color: var(--font-color-sub1);
        font-family: var(--font-stack), monospace;
        background: var(--background-color);
    }

    .focus-panel-body {
        padding: 0;
        font-size: 0.9rem;
    }

    .value-panel .focus-panel-body {
        padding: 6px 12px;
        background: var(--secondary-color-very-lowalpha);
    }

    .value-panel.added .focus-panel-body {
        background: var(--ok-color-lowalpha);
    }

    .value-panel.removed .focus-panel-body {
        background: var(--error-color-loweralpha);
    }

    .focus-value-line {
        white-space: pre-wrap;
        word-break: break-word;
        font-family: var(--font-stack-bold), monospace;
        line-height: var(--global-padding-double);
    }

    /* Diff line rendering */
    .diff-line {
        display: flex;
        height: var(--global-padding-double);
        white-space: pre;
        contain: layout style;
    }

    .line-number {
        flex-shrink: 0;
        width: 50px;
        text-align: right;
        padding: 0 8px;
        color: var(--font-color-sub3);
        user-select: none;
        background: var(--background-color);
    }

    .line-gutter {
        flex-shrink: 0;
        width: 16px;
        text-align: center;
        user-select: none;
        font-weight: bold;
    }

    .diff-line.removed .line-gutter {
        color: var(--error-color);
    }

    .diff-line.added .line-gutter {
        color: var(--ok-color);
    }

    .line-content {
        flex: 1;
        padding: 0 8px;
        overflow: hidden;
    }

    .diff-line.added {
        background: var(--ok-color-lowalpha);
    }

    .diff-line.added .line-number {
        background: var(--ok-color-lowalpha);
        color: var(--ok-color);
    }

    .diff-line.removed {
        background: var(--error-color-loweralpha);
    }

    .diff-line.removed .line-number {
        background: var(--error-color-lowalpha);
        color: var(--error-color);
    }

    /* Emphasis levels for focused view */
    .diff-line[data-emphasis="range"].added {
        background: var(--ok-color-verylowalpha);
    }
    .diff-line[data-emphasis="range"].added .line-number {
        background: var(--ok-color-verylowalpha);
    }
    .diff-line[data-emphasis="range"].removed {
        background: var(--error-color-verylowalpha);
    }
    .diff-line[data-emphasis="range"].removed .line-number {
        background: var(--error-color-verylowalpha);
    }

    /* Light mode overrides */
    :host-context(html[theme="light"]) .diff-line[data-emphasis="range"].added,
    :host-context(html[theme="light"]) .diff-line[data-emphasis="range"].added .line-number {
        background: rgba(0, 0, 0, 0.06);
    }
    :host-context(html[theme="light"]) .diff-line[data-emphasis="range"].removed,
    :host-context(html[theme="light"]) .diff-line[data-emphasis="range"].removed .line-number {
        background: rgba(0, 0, 0, 0.12);
    }
    :host-context(html[theme="light"]) .diff-line.added {
        background: rgba(0, 0, 0, 0.08);
    }
    :host-context(html[theme="light"]) .diff-line.added .line-number {
        background: rgba(0, 0, 0, 0.12);
    }
    :host-context(html[theme="light"]) .diff-line.added .line-gutter {
        color: #000;
    }
    :host-context(html[theme="light"]) .diff-line.removed {
        background: rgba(0, 0, 0, 0.15);
    }
    :host-context(html[theme="light"]) .diff-line.removed .line-number {
        background: rgba(0, 0, 0, 0.2);
    }
    :host-context(html[theme="light"]) .diff-line.removed .line-gutter {
        color: #000;
    }
    :host-context(html[theme="light"]) .value-panel.added .focus-panel-body {
        background: rgba(0, 0, 0, 0.05);
    }
    :host-context(html[theme="light"]) .value-panel.removed .focus-panel-body {
        background: rgba(0, 0, 0, 0.1);
    }

    /* Chroma syntax highlighting */
    .line-content .nt { color: var(--secondary-color); }
    .line-content .k, .line-content .kn,
    .line-content .kp, .line-content .kr { color: var(--secondary-color); }
    .line-content .kc { color: var(--tertiary-color); }
    .line-content .kd { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .kt { color: var(--primary-color); }
    .line-content .na { color: var(--terminal-text); }
    .line-content .nb { color: var(--primary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nc { color: var(--terminal-text); }
    .line-content .nf { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .nl { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nx { color: var(--font-color); }
    .line-content .nv, .line-content .vc, .line-content .vg,
    .line-content .vi { color: var(--primary-color); font-family: var(--font-stack-italic), monospace; }
    .line-content .s, .line-content .sa, .line-content .sb, .line-content .sc,
    .line-content .dl, .line-content .sd, .line-content .s2, .line-content .se,
    .line-content .sh, .line-content .si, .line-content .sx, .line-content .sr,
    .line-content .ss { color: var(--primary-color); }
    .line-content .s1 { color: var(--primary-color); }
    .line-content .l { color: var(--primary-color); }
    .line-content .m, .line-content .mb, .line-content .mf, .line-content .mh,
    .line-content .mi, .line-content .il, .line-content .mo { color: var(--tertiary-color); }
    .line-content .o, .line-content .ow { color: var(--secondary-color); }
    .line-content .p { color: var(--font-color-sub1); }
    .line-content .c, .line-content .ch, .line-content .cm,
    .line-content .c1, .line-content .cs { color: var(--chroma-comment, #6272a4); }
    .line-content .cp, .line-content .cpf { color: var(--secondary-color); }
    .line-content .gd { color: var(--error-color); }
    .line-content .gi { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .ge { text-decoration: underline; }
    .line-content .gh, .line-content .gu { font-family: var(--font-stack-bold), monospace; }
`;

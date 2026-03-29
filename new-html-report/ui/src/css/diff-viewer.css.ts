import { css } from 'lit';

export default css`
    :host {
        display: block;
        overflow: hidden;
        height: 100%;
    }

    .diff-split {
        --divider-width: 2px;
        width: 100%;
        height: 100%;
        font-family: var(--font-stack);
        font-size: 12px;
        line-height: 1.5;
    }

    .diff-split::part(divider) {
        background-color: var(--secondary-color);
    }

    .diff-split sl-icon.divider-vert {
        position: absolute;
        left: 2px;
        border-radius: 0;
        background: var(--secondary-color);
        color: var(--background-color);
        padding: 0;
        width: 10px;
        height: 40px;
    }

    .diff-split::part(divider):focus-visible {
        background-color: var(--primary-color);
    }

    .diff-split:focus-within sl-icon {
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    .diff-container {
        display: flex;
        font-family: var(--font-stack);
        font-size: 12px;
        line-height: 1.5;
    }

    .diff-panel {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        contain: content;
    }

    .diff-panel::-webkit-scrollbar {
        width: 8px;
    }

    .diff-panel::-webkit-scrollbar-track {
        background-color: var(--background-color);
    }

    .diff-panel::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }

    .diff-header {
        padding: 6px 12px;
        background: var(--background-color);
        font-family: var(--font-stack-bold, inherit), monospace;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--font-color-sub1);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .diff-line {
        display: flex;
        min-height: 20px;
        white-space: pre;
        contain: layout style;
        content-visibility: auto;
        contain-intrinsic-size: auto 20px;
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

    .diff-line.spacer {
        background: var(--secondary-color-very-lowalpha);
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

    .view-toggle {
        padding: 6px 12px;
        background: var(--background-color);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        display: flex;
        gap: 8px;
    }

    .view-toggle button {
        background: transparent;
        border: 1px dashed var(--secondary-color-dimmer);
        color: var(--font-color-sub1);
        padding: 3px 10px;
        border-radius: 0;
        cursor: pointer;
        font-family: var(--font-stack, inherit), monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .view-toggle button:hover {
        border-color: var(--secondary-color);
        color: var(--font-color);
    }

    .view-toggle button.active {
        background: var(--secondary-color-very-lowalpha);
        border-color: var(--secondary-color);
        color: var(--font-color);
    }

    .unified .diff-panel {
        flex: none;
        width: 100%;
    }

    .no-data {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        color: var(--font-color-sub2);
        font-family: var(--font-stack, inherit), monospace;
    }

    .diff-line.highlight {
        outline: 1px solid var(--secondary-color);
        background: var(--secondary-color);
        color: var(--background-color);
    }

    .diff-line.highlight .line-number {
        background: var(--secondary-color);
        color: var(--background-color);
    }

    /* Chroma syntax highlighting — pb33f theme
       Keys (nt) = secondary, Strings = primary, Booleans/Numbers = tertiary */
    /* Keys / tags — the property names in JSON/YAML */
    .line-content .nt { color: var(--secondary-color); }
    /* Keywords */
    .line-content .k, .line-content .kn,
    .line-content .kp, .line-content .kr { color: var(--secondary-color); }
    .line-content .kc { color: var(--tertiary-color); }
    .line-content .kd { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .kt { color: var(--primary-color); }
    /* Names */
    .line-content .na { color: var(--terminal-text); }
    .line-content .nb { color: var(--primary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nc { color: var(--terminal-text); }
    .line-content .nf { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .nl { color: var(--secondary-color); font-family: var(--font-stack-bold), monospace; }
    .line-content .nx { color: var(--font-color); }
    .line-content .nv, .line-content .vc, .line-content .vg,
    .line-content .vi { color: var(--primary-color); font-family: var(--font-stack-italic), monospace; }
    /* Strings — values in JSON/YAML */
    .line-content .s, .line-content .sa, .line-content .sb, .line-content .sc,
    .line-content .dl, .line-content .sd, .line-content .s2, .line-content .se,
    .line-content .sh, .line-content .si, .line-content .sx, .line-content .sr,
    .line-content .ss { color: var(--primary-color); }
    .line-content .s1 { color: var(--primary-color); }
    /* Literals / numbers */
    .line-content .l { color: var(--primary-color); }
    .line-content .m, .line-content .mb, .line-content .mf, .line-content .mh,
    .line-content .mi, .line-content .il, .line-content .mo { color: var(--tertiary-color); }
    /* Operators / punctuation */
    .line-content .o, .line-content .ow { color: var(--secondary-color); }
    .line-content .p { color: var(--font-color-sub1); }
    /* Comments */
    .line-content .c, .line-content .ch, .line-content .cm,
    .line-content .c1, .line-content .cs { color: var(--chroma-comment, #6272a4); }
    .line-content .cp, .line-content .cpf { color: var(--secondary-color); }
    /* Generic */
    .line-content .gd { color: var(--error-color); }
    .line-content .gi { color: var(--terminal-text); font-family: var(--font-stack-bold), monospace; }
    .line-content .ge { text-decoration: underline; }
    .line-content .gh, .line-content .gu { font-family: var(--font-stack-bold), monospace; }

`;

import { css } from 'lit';

export default css`
    :host {
        display: block;
        overflow: auto;
        height: 100%;
    }

    .diff-container {
        display: flex;
        font-family: var(--font-stack, 'BerkeleyMono-Regular', 'Roboto Mono', Monaco, Menlo, monospace);
        font-size: 12px;
        line-height: 1.5;
    }

    .diff-panel {
        flex: 1;
        overflow-x: auto;
        border-right: 1px dashed var(--secondary-color-dimmer);
    }

    .diff-panel:last-child {
        border-right: none;
    }

    .diff-header {
        padding: 6px 12px;
        background: var(--terminal-background);
        font-family: var(--font-stack-bold, inherit), monospace;
        font-weight: normal;
        font-size: 11px;
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
    }

    .line-number {
        flex-shrink: 0;
        width: 50px;
        text-align: right;
        padding: 0 8px;
        color: var(--font-color-sub3);
        user-select: none;
        background: var(--terminal-background);
    }

    .line-content {
        flex: 1;
        padding: 0 8px;
        overflow-x: auto;
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

    .diff-line.modified {
        background: var(--warn-400-lowalpha);
    }

    .view-toggle {
        padding: 6px 12px;
        background: var(--terminal-background);
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
        font-size: 11px;
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

    /* Scrollbar styling */
    :host::-webkit-scrollbar {
        width: 8px;
    }

    :host::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    :host::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }
`;

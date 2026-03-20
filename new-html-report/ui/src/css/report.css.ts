import { css } from 'lit';

export default css`
    :host {
        display: block;
        width: 100%;
        height: 100vh;
        background-color: var(--background-color);
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
    }

    .report-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        grid-template-rows: auto 1fr;
        height: calc(100vh - 57px);
        overflow: hidden;
    }

    .sidebar {
        grid-row: 1 / -1;
        background: var(--terminal-background);
        border-right: 1px dashed var(--secondary-color-dimmer);
        overflow-y: auto;
        padding: 10px;
    }

    .sidebar h2 {
        font-size: 14px;
        color: var(--secondary-color);
        font-family: var(--font-stack-bold), monospace;
        margin: 0 0 10px 0;
        padding: 5px 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .commit-item {
        padding: 8px 10px;
        cursor: pointer;
        border-radius: 0;
        margin-bottom: 4px;
        border: 1px dashed transparent;
        transition: all 0.15s ease;
    }

    .commit-item:hover {
        background: var(--secondary-color-very-lowalpha);
        border-color: var(--secondary-color-dimmer);
    }

    .commit-item.active {
        background: var(--secondary-color-very-lowalpha);
        border-color: var(--secondary-color);
    }

    .commit-hash {
        font-family: var(--font-stack), monospace;
        font-size: 11px;
        color: var(--primary-color);
    }

    .commit-message {
        font-size: 12px;
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
        margin-top: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .commit-date {
        font-size: 10px;
        color: var(--font-color-sub2);
        font-family: var(--font-stack), monospace;
        margin-top: 2px;
    }

    .main-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .stats-bar {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px 20px;
        background: var(--terminal-background);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        flex-wrap: wrap;
    }

    .stat-box {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 0;
        font-size: 13px;
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    .stat-box.total { color: var(--primary-color); }
    .stat-box.breaking { color: var(--error-color); }
    .stat-box.additions { color: var(--ok-color); }
    .stat-box.modifications { color: var(--warn-400); }
    .stat-box.removals { color: var(--error-color); }

    .stat-label {
        font-size: 10px;
        font-weight: normal;
        font-family: var(--font-stack), monospace;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .tab-content {
        flex: 1;
        overflow: hidden;
    }

    sl-tab-group::part(tabs) {
        height: 30px;
    }

    sl-tab::part(base) {
        padding: 0 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-family: var(--font-stack), monospace;
        font-size: 0.9rem;
    }

    sl-tab-group {
        display: flex;
        flex-direction: column;
        height: 100%;
        --indicator-color: var(--secondary-color);
    }

    sl-tab-group::part(body) {
        flex: 1;
        overflow: hidden;
    }

    sl-tab-panel::part(base) {
        padding-top: 10px;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    sl-tab-panel {
        padding: 10px;
    }

    sl-tab-panel[name="graph"] {
        padding: 0;
        overflow: hidden;
    }

    sl-tab-panel[name="graph"] pb33f-explorer {
        display: block;
        height: calc(100vh - 300px);
    }

    .change-report {
        padding: 10px 20px;
        line-height: 1.6;
        overflow: auto;
    }

    .change-report h1, .change-report h2, .change-report h3 {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
        border-bottom: 1px dashed var(--hrcolor);
        padding-bottom: 5px;
    }

    .no-changes {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: var(--font-color-sub2);
        font-size: 18px;
        font-family: var(--font-stack), monospace;
    }

    .report-layout.single-item {
        grid-template-columns: 1fr;
    }

    .report-layout.single-item .sidebar {
        display: none;
    }

    .charts-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        flex-wrap: wrap;
    }

    .history-section {
        padding: 10px 20px;
    }

    .history-section h3 {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
        font-size: 14px;
        margin: 0 0 10px 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* Scrollbar styling */
    .sidebar::-webkit-scrollbar {
        width: 8px;
    }

    .sidebar::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    .sidebar::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }
`;

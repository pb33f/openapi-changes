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
        height: calc(100vh - 57px);
        overflow: hidden;
    }

    /* ── Split panel ── */
    .split-panel {
        --min: 30px;
        --max: 850px;
        width: 100%;
        height: 100%;
        --divider-width: 2px;
    }

    .split-panel::part(divider) {
        background-color: var(--secondary-color);
    }

    sl-icon.divider-vert {
        position: absolute;
        left: 2px;
        border-radius: 0;
        background: var(--secondary-color);
        color: var(--background-color);
        padding: 0;
        width: 10px;
        height: 40px;
    }

    .split-panel::part(divider):focus-visible {
        background-color: var(--primary-color);
    }

    .split-panel:focus-within sl-icon {
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    /* ── Navigator panel (left, inside split start slot) ── */
    .navigator-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--background-color);
        overflow: hidden;
    }

    .navigator-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        overflow: hidden;   
        margin-top: 8px;
        
    }

    .navigator-tabs {
        --indicator-color: var(--secondary-color);
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .navigator-tabs::part(base) {
        height: 100%;
    }

    .navigator-tabs::part(tabs) {
        height: 30px;
        flex-shrink: 0;
    }

    .navigator-tabs::part(body) {
        flex: 1;
        overflow: hidden;
    }

    .navigator-tabs sl-tab::part(base) {
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-family: var(--font-stack), monospace;
        font-size: 0.9rem;
        padding: 0 0.8rem;
    }

    .navigator-tabs sl-tab-panel::part(base) {
        padding-top: 10px;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .navigator-tabs sl-tab-panel {
        height: 100%;
    }

    /* Shared scrollbar styling */
    .tree-scroll-container::-webkit-scrollbar,
    .timeline-scroll-container::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    .tree-scroll-container::-webkit-scrollbar-track,
    .timeline-scroll-container::-webkit-scrollbar-track {
        background-color: var(--terminal-background);
    }

    .tree-scroll-container::-webkit-scrollbar-thumb,
    .timeline-scroll-container::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: var(--secondary-color-lowalpha);
    }

    .tree-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }

    /* ── Timeline tab (commit list) ── */
    .timeline-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 0 10px;
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

    /* ── Main content area ── */
    .main-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* ── Summary row (top of right panel) ── */
    .change-summary {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px 20px;
        background: var(--terminal-background);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        flex-wrap: wrap;
        flex-shrink: 0;
    }

    .charts-row {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* ── Content tabs ── */
    .tab-content {
        flex: 1;
        min-height: 0;
        overflow: auto;
        margin-top: 8px;
    }

    sl-tab-group {
        --indicator-color: var(--secondary-color);
    }

    sl-tab-group::part(tabs) {
        position: sticky;
        top: 0;
        z-index: 1;
        background: var(--background-color);
        height: 30px;
    }

    sl-tab::part(base) {
        padding: 0 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-family: var(--font-stack), monospace;
        font-size: 0.9rem;
    }

    
    sl-tab-panel::part(base) {
        padding-top: var(--global-padding);
    }

    sl-tab-panel[name="graph"] {
        padding: 0;
    }

    sl-tab-panel[name="graph"] pb33f-explorer {
        display: block;
        height: calc(100vh - 200px);
    }

    /* ── Change report (doctor-rendered HTML) ── */
    .change-report {
        padding: 0 20px;
        line-height: 1.7em;
        overflow: auto;
        font-size: 0.8rem;
    }

    /* Text formatting */
    .change-report p {
        line-height: 1.7em;
        margin-bottom: 30px;
        font-family: var(--font-stack-paragraph), monospace;
    }

    .change-report em {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report i {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report strong {
        color: var(--secondary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    /* Headings */
    .change-report h1, .change-report h2, .change-report h3, .change-report h4, .change-report h5 {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        padding-bottom: 5px;
    }

    .change-report h2 {
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .change-report h3 {
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .change-report h4 {
        text-transform: uppercase;
        letter-spacing: 0.02em;
    }

    .change-report h4 > code, .change-report h3 > code {
        font-family: var(--font-stack-bold), monospace;
        color: var(--primary-color);
    }

    .change-report h1 > code, .change-report h3 > code,
    .change-report h4 > code, .change-report h5 > code,
    .change-report h4 > pb33f-render-operation-path {
        text-transform: none;
    }

    .change-report .heading-anchor {
        text-decoration: none;
        color: var(--primary-color);
    }

    /* Horizontal rules */
    .change-report hr {
        margin-top: 40px;
        border-top: none;
        border-bottom: 1px dashed var(--secondary-color);
        margin-bottom: 40px;
        height: 1px;
        border-left: none;
        border-right: none;
    }

    /* Links */
    .change-report a, .change-report a:visited, .change-report a:active {
        text-decoration: none;
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    .change-report a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }

    /* Lists */
    .change-report ul {
        padding-left: 20px;
    }

    .change-report ul > li {
        font-family: var(--font-stack-paragraph), monospace;
        font-weight: normal;
        list-style-type: none;
        line-height: 1.8em;
    }

    .change-report ul li:before {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        margin-right: 10px;
    }

    .change-report ul > li:before { content: ">"; }
    .change-report ul > li > ul > li:before { content: "-"; }
    .change-report ul > li > ul > li > ul > li:before { content: "*"; }

    .change-report ul > li > p {
        display: inline;
    }

    .change-report ul > li > ul {
        margin-top: 5px;
        padding-left: 25px;
    }

    .change-report ul > li > ul > li > ul {
        margin-top: 5px;
        padding-left: 25px;
    }

    .change-report ul > li code.code {
        vertical-align: baseline;
        height: 20px;
        display: inline-block;
    }

    .change-report ul > li code.language-yaml {
        border: none;
        background: none;
        padding: 0;
    }

    /* Inline code */
    .change-report code {
        font-family: var(--font-stack), monospace;
        border: 1px solid var(--secondary-color-lowalpha);
        color: var(--secondary-color);
        border-radius: 0;
        padding: 0 5px 1px 5px;
        margin: 0 0 2px 0;
        display: inline-block;
        background-color: var(--secondary-color-very-lowalpha);
        vertical-align: middle;
        font-size: 0.95rem;
    }

    /* Code blocks */
    .change-report pre {
        border: none;
        border-left: 2px solid var(--secondary-color);
        border-top: 1px dashed var(--secondary-color-lowalpha);
        border-bottom: 1px dashed var(--secondary-color-lowalpha);
        padding: 10px 0 10px 20px;
        margin-top: 0;
        margin-bottom: 20px;
        line-height: 1.4rem;
        width: calc(100% - 22px);
        background-image: linear-gradient(to right, var(--chroma-gradient-start, #171d25), var(--background-color));
    }

    .change-report pre > code {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        display: block;
        font-size: 0.85rem;
    }

    .change-report pre[class*="language-"] {
        border-radius: 0;
    }

    /* Blockquotes */
    .change-report blockquote {
        border-left: 5px solid var(--secondary-color);
        margin: 30px 0 30px 30px;
        padding: 0;
        width: 80%;
    }

    .change-report blockquote p {
        padding: 5px 0 10px 20px;
        display: block;
        margin: 0;
        color: var(--font-color-sub1);
        font-family: var(--font-stack-italic), monospace;
    }

    /* Reference links / component refs */
    .change-report .reflink {
        color: var(--terminal-text);
        font-size: 1.1rem;
        vertical-align: middle;
        margin-left: 8px;
        margin-right: 5px;
    }

    .change-report .component-reference {
        color: var(--terminal-text);
        border: none;
        background-color: transparent;
    }

    /* HTTP status code styles */
    .change-report .http-200 {
        color: var(--font-color);
        border-color: var(--font-color-sub2);
        background-color: transparent;
    }

    .change-report .http-400 {
        color: var(--warn-color);
        border-color: var(--warn-color-lowalpha);
        background-color: transparent;
    }

    .change-report .http-500 {
        color: var(--error-color);
        border-color: var(--error-color-dimmed);
        background-color: transparent;
    }

    /* Object change summary table */
    .change-report table.object-change-summary {
        width: 100%;
        border-spacing: 0;
    }

    .change-report table.object-change-summary > thead > tr > th {
        font-family: var(--font-stack-bold), sans-serif;
        background-color: var(--table-header-background-solid);
        text-align: left;
        padding: 10px;
        color: var(--font-color);
        border-bottom: 1px dashed var(--kv-table-dividers);
        border-top: 1px dashed var(--kv-table-header-border-top);
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .change-report table.object-change-summary > thead > tr > th:first-child {
        background: var(--kv-table-header-background-reversed);
        color: var(--primary-color);
    }

    .change-report table.object-change-summary > thead > tr > th:nth-child(2) {
        text-align: center;
        background-color: var(--kv-table-header-background-solid);
    }

    .change-report table.object-change-summary > thead > tr > th:last-child {
        background: var(--kv-table-header-background);
    }

    .change-report table.object-change-summary > tbody > tr > td {
        font-family: var(--font-stack-paragraph), monospace;
        color: var(--font-color-sub1);
        padding: 10px;
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .change-report table.object-change-summary > tbody > tr > td:first-child {
        color: var(--primary-color);
        border-right: 1px dashed var(--secondary-color-dimmer);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .change-report table.object-change-summary > tbody > tr > td:nth-child(2),
    .change-report table.object-change-summary > tbody > tr > td:last-child {
        text-align: center;
        border-right: 1px dashed var(--secondary-color-dimmer);
    }

    .change-report table.object-change-summary > tbody > tr > td:last-child {
        border-right: none;
    }

    .change-report table.object-change-summary pb33f-model-icon {
        vertical-align: middle;
        margin-right: 5px;
    }

    /* Breaking change badges */
    .change-report .breaking {
        color: var(--error-color);
        font-family: var(--font-stack-bold), sans-serif;
        padding: 1px 3px;
        border: 1px solid var(--error-color);
    }

    .change-report .breaking > sl-icon {
        vertical-align: middle;
    }

    /* Floating metadata sidebar */
    .change-report .metadata-sidebar {
        float: right;
        width: 45%;
        margin: 0 0 20px 10px;
        padding: 10px;
        border: 1px solid var(--secondary-color);
        border-radius: 0;
        text-transform: uppercase;
    }

    .change-report .metadata-sidebar table {
        font-size: 0.85rem;
    }

    .change-report .report-clearfix::after {
        content: "";
        display: table;
        clear: both;
    }

    @media (max-width: 1024px) {
        .change-report .metadata-sidebar {
            float: none;
            width: 100%;
            margin: 0 0 1rem 0;
        }
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

    .history-section {
        padding: 10px 20px;
        flex-shrink: 0;
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
`;

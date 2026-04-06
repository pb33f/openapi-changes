import { css } from 'lit';
import { scrollbarCss } from './scrollbar.css.js';

export default [scrollbarCss, css`
    :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        background-color: var(--background-color);
        color: var(--font-color);
        font-family: var(--font-stack), monospace;

        --header-height: 57px;
        --tab-chrome: 38px;
        --footer-outer-height: 20px;
        --chrome-total: calc(var(--header-height) + var(--tab-chrome) + var(--footer-outer-height));
    }
    
    pb33f-theme-switcher {
        margin-right: var(--global-padding-double);
    }
        
    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 var(--global-padding);
    }

    .header-meta {
        display: flex;
        align-items: center;
        gap: 15px;
        font-family: var(--font-stack), monospace;
        color: var(--font-color-sub2);
    }

    .header-version {
        color: var(--primary-color);
    }

    .report-layout {
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    pb33f-footer {
        flex-shrink: 0;
    }

    /* ── Split panel ── */
    .split-panel {
        --min: 30px;
        --max: 850px;
        width: 100%;
        height: 100%;
        --divider-width: 2px;
    }

    .split-panel::part(panel), .split-panel::part(start), .split-panel::part(end) {
        overflow: hidden;
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
        user-select: none;
        -webkit-user-select: none;
    }

    .navigator-panel *::selection {
        background: transparent;
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
        user-select: none;
        -webkit-user-select: none;
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
        padding: 0 var(--global-padding);
    }

    .navigator-tabs sl-tab-panel::part(base) {
        padding: 10px 0 0;
        overflow: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .navigator-tabs sl-tab-panel {
        height: 100%;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    .tree-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }

    /* ── Timeline tab ── */
    .timeline-scroll-container {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 0 10px;
        user-select: none;
        -webkit-user-select: none;
    }

    /* Timeline icon styles */
    .breaking-change,
    .change-icon {
        background: var(--background-color);
        outline: none;
    }

    .breaking-change:focus,
    .change-icon:focus {
        outline: none;
    }

    .breaking-change {
        color: var(--error-color);
    }

    .change-icon {
        color: var(--secondary-color);
    }

    /* Left-border accents */
    .heart-breaker {
        border-left: 3px solid var(--error-color);
        padding-left: 5px;
    }

    .dream-maker {
        border-left: 3px solid var(--secondary-color-lowalpha);
        padding-left: 5px;
    }
    
    .change-heading {
        text-transform: none;
    }

    .change-content {
        height: 30px;
    }

    /* Selected state */
    pb33f-timeline-item.selected {
        background: linear-gradient(90deg, var(--background-color) 0%, var(--primary-color-verylowalpha) 100%);
        border-right: 4px solid var(--primary-color);
    }

    .selected-bar {
        border-left: 3px solid var(--primary-color) !important;
    }

    /* Hover */
    pb33f-timeline-item:hover {
        background-color: var(--secondary-color-very-lowalpha);
        cursor: pointer;
    }

    pb33f-timeline-item.selected:hover {
        background-color: var(--primary-color-verylowalpha);
        cursor: pointer;
    }

    sl-relative-time {
        text-transform: uppercase;
    }

    /* ── Main content area ── */
    .main-content {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    /* ── Overview tab content ── */
    .overview-content {
        padding: var(--global-padding) var(--global-padding) var(--global-padding) var(--global-padding-double);
        overflow: auto;
    }

    .commit-info {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .commit-hash {
        font-family: var(--font-stack), monospace;
        color: var(--primary-color);
    }

    .commit-message {
        color: var(--font-color);
        font-family: var(--font-stack), monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
    }

    .commit-meta {
        display: flex;
        align-items: baseline;
        gap: 10px;
        flex-shrink: 0;
    }

    .commit-author {
        color: var(--secondary-color);
        font-family: var(--font-stack), monospace;
    }

    .commit-date {
        color: var(--font-color-sub2);
        font-family: var(--font-stack), monospace;
    }

    .change-summary {
        display: flex;
        align-items: center;
        gap: var(--global-padding);
        padding: var(--global-padding) 0;
        flex-wrap: wrap;
    }

    .charts-row {
        display: flex;
        align-items: center;
        gap: var(--global-padding);
        flex-wrap: wrap;
    }

    .charts-row pb33f-doughnut-chart {
        display: block;
        width: 300px;
        height: 120px;
    }

    /* ── Content tabs ── */
    .tab-content {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding-top: calc(var(--global-padding-half) + 3px);
        scrollbar-width: thin;
       
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

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
        padding: 0 var(--global-padding);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-family: var(--font-stack), monospace;
    }

    
    sl-tab-panel::part(base) {
        padding-top: 0;
    }

    sl-tab-panel[name="graph"] {
        padding: 0;
        overflow: hidden;
        height: calc(100vh - var(--chrome-total) - var(--global-padding-half) - 3px);
        min-height: 0;
    }

    sl-tab-panel[name="graph"]::part(base) {
        overflow: hidden;
        padding: 0;
        height: 100%;
        min-height: 0;
    }

    .graph-split {
        width: 100%;
        height: calc(100vh - var(--chrome-total));
        min-height: 0;
        overflow: hidden;
        --divider-width: 0px;
        --min: 20px;
        --max: calc(100% - 20px);
    }

    .graph-split::part(panel) {
        min-height: 0;
    }

    .graph-split::part(start) {
        overflow: hidden;
        min-height: 0;
    }

    .graph-split::part(end) {
        min-height: 0;
        overflow: hidden;
    }

    .graph-split::part(divider) {
        background-color: var(--secondary-color);
    }

    sl-tab-panel[name="graph"] pb33f-explorer {
        display: block;
        height: 100%;
        min-height: 0;
    }

    sl-tab-panel[name="graph"] pb33f-explorer-change-panel {
        display: block;
        height: 100%;
        min-height: 0;
        overflow: hidden;
    }

    sl-tab-panel[name="diff"] {
        padding: 0;
        overflow: hidden;
        height: calc(100vh - var(--chrome-total));
    }

    sl-tab-panel[name="diff"]::part(base) {
        overflow: hidden;
        padding: 0;
        height: 100%;
    }

    sl-tab-panel[name="diff"] openapi-changes-diff-viewer {
        display: block;
        height: 100%;
    }

    /* ── Combined report (single comparison mode) ── */
    .spec-paths {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: var(--global-padding);
        margin-bottom: var(--global-padding);
        font-family: var(--font-stack), monospace;
        font-size: 0.85rem;
        color: var(--font-color-sub1);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
    }

    .spec-path-label {
        color: var(--font-color-sub2);
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.03em;
    }

    .spec-paths code {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
    }

    .spec-path-arrow {
        color: var(--secondary-color);
    }

    .combined-report .change-report {
        margin-top: var(--global-padding-double);
    }

    .combined-report .change-summary {
        contain: layout style;
    }

    /* ── Change report (doctor-rendered HTML) ── */
    .change-report {
        padding: 0 var(--global-padding) var(--global-padding-double) calc(var(--global-padding-double));
        overflow: auto;
    }

    /* Text formatting */
    .change-report p {
        font-family: var(--font-stack), monospace;
    }

    .change-report em {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report i {
        font-family: var(--font-stack-italic), monospace;
    }

    .change-report strong {
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    /* Headings */
    .change-report h1, .change-report h2, .change-report h3, .change-report h4, .change-report h5 {
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }

    .change-report h1 {
        text-transform: uppercase;
    }
    
    .change-report h2 {
        text-transform: uppercase;
        font-size: 2rem;
        border-bottom: 1px dashed var(--hrcolor);
        padding-bottom: var(--global-padding);
    }

    .change-report h3 {
        text-transform: uppercase;
        font-size: 1.7rem;
        margin-top: 80px;
    }

    .change-report h4 {
        font-size: 1.3rem;
  
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
        color: var(--font-color);
    }

    /* Horizontal rules */
    .change-report hr {
        margin-top: var(--global-padding);
        border-top: none;
        border-bottom: 1px dashed var(--primary-color-lowalpha);
        margin-bottom: calc(var(--global-padding-double) * 2);
        height: 1px;
        border-left: none;
        border-right: none;
    }
     

    /* Links */
    .change-report a, .change-report a:visited, .change-report a:active {
        text-decoration: none;
        color: var(--font-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
    }
    
    .change-report a:hover {
        color: var(--primary-color);
        text-decoration: underline;
    }

    /* Lists */
    .change-report ul {
        padding-left: var(--global-padding);
        margin-bottom: calc(var(--global-padding-double) *2);
    }

    .change-report ul > li {
        font-family: var(--font-stack-paragraph), monospace;
        font-weight: normal;
        list-style-type: none;
        padding: var(--global-padding-half) 0;
    }

    .change-report ul li:before {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        margin-right: var(--global-padding);
    }

    .change-report ul > li:before { content: ">"; }
    .change-report ul > li > ul > li:before { content: "-"; }
    .change-report ul > li > ul > li > ul > li:before { content: "*"; }

    .change-report ul > li > p {
        display: inline;
    }

    .change-report ul > li > ul {
        margin-top: var(--global-padding);
        padding-left: var(--global-padding-double);
    }

    .change-report ul > li > ul > li > ul {
        margin-top: var(--global-padding);
        padding-left: var(--global-padding-double);
    }

    .change-report ul > li code.code {
        vertical-align: baseline;
        height: var(--global-padding-double);
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
        padding: 2px var(--global-padding-half);
        display: inline-block;
        background-color: var(--secondary-color-very-lowalpha);
        vertical-align: middle;
    }

    /* Code blocks */
    .change-report pre {
        border: none;
        border-left: 2px solid var(--secondary-color);
        border-top: 1px dashed var(--secondary-color-lowalpha);
        border-bottom: 1px dashed var(--secondary-color-lowalpha);
        padding: var(--global-padding) 0 var(--global-padding) var(--global-padding);
        margin-top: 0;
        margin-bottom: var(--global-padding);
        width: calc(100% - 22px);
        background-image: linear-gradient(to right, var(--chroma-gradient-start, #171d25), var(--background-color));
    }

    .change-report pre > code {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        display: block;
    }

    .change-report pre[class*="language-"] {
        border-radius: 0;
    }

    /* Blockquotes */
    .change-report blockquote {
        border-left: 5px solid var(--secondary-color);
        margin: var(--global-padding-double);
        padding: 0;
        width: 80%;
    }

    .change-report blockquote p {
        padding: var(--global-padding) 0 var(--global-padding) var(--global-padding-double);
        display: block;
        margin: 0;
        color: var(--font-color-sub1);
        font-family: var(--font-stack-italic), monospace;
    }

    /* Reference links / component refs */
    .change-report .reflink {
        color: var(--terminal-text);
        vertical-align: middle;
        margin-left: var(--global-padding);
        margin-right: var(--global-padding);
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
        padding: var(--global-padding);
        color: var(--font-color);
        border-bottom: 1px dashed var(--kv-table-dividers);
        border-top: 1px dashed var(--kv-table-header-border-top);
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
        text-align: center;
        background: var(--kv-table-header-background);
    }

    .change-report table.object-change-summary > tbody > tr > td {
        font-family: var(--font-stack-paragraph), monospace;
        color: var(--font-color-sub1);
        padding: var(--global-padding);
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
        margin-right: var(--global-padding);
    }

    /* Breaking change badges */
    .change-report .breaking {
        color: var(--error-color);
        font-family: var(--font-stack-bold), sans-serif;
        padding: var(--global-padding-half);
      
    }

    .change-report .breaking > sl-icon {
        vertical-align: middle;
    }

    /* Floating metadata sidebar */
    .change-report .metadata-sidebar {
        float: right;
        position: relative;
        z-index: 1;
        width: 45%;
        margin: 0 0 var(--global-padding-double) var(--global-padding);
        padding: var(--global-padding);
        border: 1px solid var(--secondary-color);
        border-radius: 0;
        text-transform: uppercase;
        background-color: var(--background-color);
    }

    .change-report .metadata-sidebar > p:first-child {
        margin-top: 0;
        padding-top: 0;
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
            margin: 0 0 var(--global-padding) 0;
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
        padding: var(--global-padding);
        flex-shrink: 0;
    }


    .history-section h2 {
        color: var(--primary-color);
        font-family: var(--font-stack-bold), monospace;
        font-weight: normal;
        margin: 0 0 var(--global-padding) 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding-bottom: var(--global-padding);
        border-bottom: 1px dashed var(--hrcolor);
    }
`];

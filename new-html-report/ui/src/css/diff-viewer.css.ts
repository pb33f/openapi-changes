import {css} from 'lit';
import {focusedDiffSharedCss} from './focused-diff-shared.css.js';
import {scrollbarCss} from './scrollbar.css.js';

export default [focusedDiffSharedCss, scrollbarCss, css`
    :host {
        display: block;
        overflow: hidden;
        height: 100%;
    }

    .diff-split, .focus-split-main {
        --divider-width: 2px;
        width: 100%;
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
        font-family: var(--font-stack);
        line-height: 1.5;
    }

    .diff-split::part(divider), .focus-split-main::part(divider) {
        background-color: var(--secondary-color);
    }

    .diff-split sl-icon.divider-vert, .focus-split-main sl-icon.divider-vert {
        position: absolute;
        left: 2px;
        border-radius: 0;
        background: var(--secondary-color);
        color: var(--background-color);
        padding: 0;
        width: 10px;
        height: 40px;
    }

    .diff-split::part(divider):focus-visible, .focus-split-main::part(divider):focus-visible {
        background-color: var(--primary-color);
    }

    .diff-split:focus-within sl-icon, .focus-split-main:focus-within sl-icon {
        background-color: var(--primary-color);
        color: var(--background-color);
    }

    .diff-container {
        display: flex;
        font-family: var(--font-stack);
        line-height: 1.5;
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
    }

    .diff-panel {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        contain: content;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

    .diff-header {
        padding: var(--global-padding);
        background: var(--background-color);
        font-family: var(--font-stack, inherit), monospace;
        text-transform: uppercase;
        color: var(--font-color-sub1);
        
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .scroll-pad-top, .scroll-pad-bottom {
        margin: 0;
        padding: 0;
        border: 0;
    }

    .visible-lines {
        contain: layout style;
        font-size: 0.9rem;
    }

    .diff-line.spacer {
        background: var(--secondary-color-very-lowalpha);
    }

    .view-toggle {
        padding: var(--global-padding);
        background: var(--background-color);
        border-bottom: 1px dashed var(--secondary-color-dimmer);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--global-padding-double);
    }

    .view-radio-group {
        --sl-color-primary-600: var(--primary-color);
        --sl-color-primary-700: var(--primary-color);
    }

    .view-radio-group sl-radio-button::part(button) {
        font-family: var(--font-stack), monospace;
        text-transform: uppercase;
        border-radius: 0;
        font-size: 0.9rem;
        background: transparent;
        color: var(--font-color-sub3);
        border-color: var(--font-color-sub3);
        transition: color 0.15s, border-color 0.15s;
    }

    .view-radio-group sl-radio-button::part(button--checked) {
        background: var(--primary-color) !important;
        color: var(--background-color) !important;
        border-color: var(--primary-color) !important;
        font-family: var(--font-stack-bold), monospace;
    }

    .view-radio-group sl-radio-button::part(button):hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
    }

    .unified .diff-panel {
        flex: none;
        width: 100%;
    }

    .focused-diff-panel {
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        padding-left: var(--global-padding-half);
        padding-right: var(--global-padding);
        padding-bottom: 50px;
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
    }

    .focused-diff-panel.full {
        height: calc(100% - 37px); /* 37px = .view-toggle bar height */
        font-family: var(--font-stack);
        line-height: 1.5;
    }

    /* scrollbar styling inherited from scrollbarCss shared fragment */

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

    .diff-line.highlight * {
        color: var(--background-color) !important;
    }

    .diff-line.highlight .line-number {
        background: var(--secondary-color);
        color: var(--background-color);
    }
`];

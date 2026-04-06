import { css } from 'lit';

export default css`
    :host {
        display: block;
    }

    .stacked-diff {
        display: flex;
        flex-direction: column;
        gap: var(--global-padding);
        padding: var(--global-padding-half) 0;
    }

    /* Narrow panel: lines must wrap */
    .diff-line {
        white-space: pre-wrap;
        word-break: break-all;
        height: auto;
    }

    .line-number {
        width: 35px;
        font-size: 0.8rem;
    }

    .change-card {
        padding-bottom: var(--global-padding);
    }
`;

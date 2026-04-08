import { describe, it, expect } from 'vitest';
import { createMinimalPayload } from './fixtures.js';

// Import the lite shell to register the custom element
import '../src/components/report-shell-lite.js';

type ShellElement = HTMLElement & {
    data: any;
    error: string;
    updateComplete: Promise<boolean>;
};

async function createElement(): Promise<ShellElement> {
    const el = document.createElement('openapi-changes-report') as ShellElement;
    document.body.appendChild(el);
    await el.updateComplete;
    return el;
}

describe('ReportShellLite data loading', () => {
    it('loads data from #report-data script element', async () => {
        const payload = createMinimalPayload();
        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'report-data';
        script.textContent = JSON.stringify(payload);
        document.body.appendChild(script);

        const el = await createElement();
        expect(el.data).not.toBeNull();
        expect(el.data.version).toBe(1);
        expect(el.data.items).toHaveLength(1);
    });

    it('loads data from window.__REPORT_DATA__', async () => {
        const payload = createMinimalPayload();
        (window as any).__REPORT_DATA__ = payload;

        const el = await createElement();
        expect(el.data).toBe(payload);
    });

    it('prefers #report-data script over window.__REPORT_DATA__', async () => {
        const scriptPayload = createMinimalPayload({ dateGenerated: 'from-script' });
        const windowPayload = createMinimalPayload({ dateGenerated: 'from-window' });

        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'report-data';
        script.textContent = JSON.stringify(scriptPayload);
        document.body.appendChild(script);
        (window as any).__REPORT_DATA__ = windowPayload;

        const el = await createElement();
        expect(el.data.dateGenerated).toBe('from-script');
    });

    it('sets error on invalid JSON in script element', async () => {
        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'report-data';
        script.textContent = '{ invalid json }}}';
        document.body.appendChild(script);

        const el = await createElement();
        expect(el.error).toMatch(/^Failed to parse report data/);
    });

    it('sets error when no data source is found', async () => {
        const el = await createElement();
        expect(el.error).toBe('No report data found');
    });

    it('renders error message in .no-changes div', async () => {
        const el = await createElement();
        await el.updateComplete;

        const noChanges = el.shadowRoot!.querySelector('.no-changes');
        expect(noChanges).not.toBeNull();
        expect(noChanges!.textContent).toBe('No report data found');
    });

    it('renders "No changes found" when items array is empty', async () => {
        const payload = createMinimalPayload({ items: [] });
        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'report-data';
        script.textContent = JSON.stringify(payload);
        document.body.appendChild(script);

        const el = await createElement();
        await el.updateComplete;

        const noChanges = el.shadowRoot!.querySelector('.no-changes');
        expect(noChanges).not.toBeNull();
        expect(noChanges!.textContent).toBe('No changes found');
    });

    it('renders full layout when data has items', async () => {
        const payload = createMinimalPayload();
        const script = document.createElement('script');
        script.type = 'application/json';
        script.id = 'report-data';
        script.textContent = JSON.stringify(payload);
        document.body.appendChild(script);

        const el = await createElement();
        await el.updateComplete;

        expect(el.shadowRoot!.querySelector('pb33f-header')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('.report-layout')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('pb33f-footer')).not.toBeNull();
        expect(el.shadowRoot!.querySelector('sl-split-panel')).not.toBeNull();
    });
});

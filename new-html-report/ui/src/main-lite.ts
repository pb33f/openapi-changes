// Lite entry point — excludes the explorer graph and ELK layout engine (~1.7MB savings).
// Used when --no-explorer flag is passed to the CLI.

import { registerReportIcons } from './icon-registry.js';

// Real pb33f theme (Vite bundles these into the single CSS output)
import '@pb33f/cowboy-components/pb33f-theme.css';
import '@pb33f/cowboy-components/cowboy-components.css';

// Shoelace theme CSS — light first so dark overrides as default
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';

// Set theme attribute so CSS variables activate
document.documentElement.setAttribute('theme', 'dark');
document.documentElement.classList.add('sl-theme-dark');

// Register inline SVG icons so the report works offline
registerReportIcons();

// Import the lite report shell (excludes explorer component)
import './components/report-shell-lite.js';

// Remove preloader and mount the report
const preloader = document.getElementById('preloader');
if (preloader) {
    preloader.remove();
}

const app = document.getElementById('app');
if (app) {
    const report = document.createElement('openapi-changes-report');
    app.appendChild(report);
}

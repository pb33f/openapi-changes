// Lite report shell — same as report-shell but without the explorer tab and ELK dependency.
// This drops ~1.7MB from the bundle by not importing ExplorerComponent or the ELK workers.

import { customElement } from 'lit/decorators.js';
import { ReportShellBase } from './report-shell-base.js';

@customElement('openapi-changes-report')
export class ReportShellLite extends ReportShellBase {}

// Copyright 2026 Princess Beef Heavy Industries, LLC / Dave Shanley
// SPDX-License-Identifier: Apache-2.0

import {getIconLibrary} from '@shoelace-style/shoelace/dist/components/icon/library.js';
import {expect, it} from 'vitest';
import {registerReportIcons} from '../src/icon-registry.js';

it('embeds the JSON Schema braces icon for offline use', () => {
    registerReportIcons();
    const icon = getIconLibrary('default')!.resolver('braces');
    expect(icon).toMatch(/^data:image\/svg\+xml,/);
    expect(decodeURIComponent(icon)).toContain('bi-braces');
});

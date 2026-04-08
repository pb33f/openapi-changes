import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    dedupe: ['lit', '@shoelace-style/shoelace'],
    alias: {
      // Shoelace events are not in the package exports map — redirect to the actual file
      '@shoelace-style/shoelace/dist/events/sl-tab-show.js': resolve(
        __dirname, 'node_modules/@shoelace-style/shoelace/dist/events/sl-tab-show.js',
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
    setupFiles: ['./test/setup.ts'],
    deps: {
      optimizer: {
        web: {
          include: ['@pb33f/cowboy-components', '@shoelace-style/shoelace', 'lit'],
        },
      },
    },
  },
});

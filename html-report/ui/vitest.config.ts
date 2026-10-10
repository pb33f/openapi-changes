import { defineConfig } from 'vitest/config';
export default defineConfig({
  resolve: {
    dedupe: ['lit', '@shoelace-style/shoelace'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
    setupFiles: ['./test/setup.ts'],
    deps: {
      optimizer: {
        client: {
          include: ['@pb33f/cowboy-components', '@shoelace-style/shoelace', 'lit'],
        },
      },
    },
  },
});

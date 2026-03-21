import { defineConfig, Plugin } from 'vite';
import { resolve } from 'path';

/**
 * Vite plugin that stubs ALL `?worker&inline` imports from cowboy-components.
 *
 * Both the ELK layout worker and graph-dependent worker are provided by
 * in-process adapters set via ExplorerComponent.elkWorkerFactory and
 * ExplorerComponent.graphDependentWorkerFactory. The original `?worker&inline`
 * imports are never called at runtime, but Vite still tries to resolve and
 * bundle them at build time — which fails because blob URL workers can't
 * create nested workers (required by elkjs).
 */
function stubWorkerInline(): Plugin {
  return {
    name: 'stub-worker-inline',
    enforce: 'pre',
    resolveId(source) {
      if (source.includes('.worker') && source.includes('?worker')) {
        return '\0stub-worker-inline:' + source;
      }
      return null;
    },
    load(id) {
      if (id.startsWith('\0stub-worker-inline:')) {
        return `
          export default class StubWorker {
            postMessage() {}
            addEventListener() {}
            removeEventListener() {}
            terminate() {}
            set onmessage(_fn) {}
            set onerror(_fn) {}
          }
        `;
      }
      return null;
    },
  };
}

// Support building the lite bundle via BUNDLE_LITE=1 env var.
const isLite = !!process.env.BUNDLE_LITE;

export default defineConfig({
  plugins: [
    stubWorkerInline(),
  ],
  resolve: {
    dedupe: [
      '@shoelace-style/shoelace',
      'lit',
    ],
    alias: {
      '@report-elkjs': resolve(__dirname, '../../../cowboy-components/node_modules/elkjs/lib/elk.bundled.js'),
    },
  },
  build: {
    outDir: 'build/static',
    emptyOutDir: !isLite, // Don't wipe when building lite (full bundle already there)
    lib: {
      entry: resolve(__dirname, isLite ? 'src/main-lite.ts' : 'src/main.ts'),
      name: 'openapiChangesReport',
      fileName: () => isLite ? 'bundle-lite.js' : 'bundle.js',
      cssFileName: 'bundle',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'bundle[extname]',
      },
    },
    cssCodeSplit: false,
    minify: true,
    sourcemap: false,
  },
});

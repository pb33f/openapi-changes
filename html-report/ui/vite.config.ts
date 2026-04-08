import { defineConfig, Plugin } from 'vite';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

/**
 * Inline font files as base64 data URIs in @font-face CSS declarations.
 *
 * The pb33f-theme.css references fonts via relative URLs (../fonts/BerkeleyMono-*.woff2).
 * These break when the CSS is inlined into a <style> tag in the self-contained HTML report.
 * This plugin resolves each url() reference to the actual font file and replaces it with
 * a base64 data URI so fonts work for everyone, not just users with BerkeleyMono installed.
 */
function inlineFontDataURIs(): Plugin {
  const require = createRequire(import.meta.url);
  const fontsDir = dirname(require.resolve('@pb33f/cowboy-components/fonts/BerkeleyMono-Regular.woff2'));

  return {
    name: 'inline-font-data-uris',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.css') || !code.includes('BerkeleyMono-')) return null;

      const result = code.replace(
        /url\(\s*['"]?(\.\.\/fonts\/(BerkeleyMono-[^'")]+))\s*['"]?\)/g,
        (_match, _relPath, filename) => {
          const ext = filename.split('.').pop();
          const mime = ext === 'woff2' ? 'font/woff2' : 'font/woff';
          try {
            const fontPath = resolve(fontsDir, filename);
            const data = readFileSync(fontPath);
            return `url(data:${mime};base64,${data.toString('base64')})`;
          } catch {
            // font file not found — leave the original reference
            return _match;
          }
        }
      );

      return { code: result, map: null };
    },
  };
}

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
    inlineFontDataURIs(),
    stubWorkerInline(),
  ],
  resolve: {
    dedupe: [
      '@shoelace-style/shoelace',
      'lit',
      'chart.js',
    ],
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

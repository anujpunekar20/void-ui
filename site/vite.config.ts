import { defineConfig } from 'vite';
import StyleX from 'unplugin-stylex/vite';
import { fileURLToPath } from 'node:url';

// The landing page builds the library straight from ../src, so demos always
// match the source. esbuild's automatic JSX runtime means no React plugin.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [StyleX()],
  esbuild: { jsx: 'automatic' },
});

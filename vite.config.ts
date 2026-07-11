import { defineConfig } from 'vite';
import StyleX from 'unplugin-stylex/vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    StyleX(),
    dts({ include: ['src'], exclude: ['src/**/*.test.tsx'] }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', '@floating-ui/react'],
    },
  },
});

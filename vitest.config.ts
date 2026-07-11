import { defineConfig } from 'vitest/config';
import StyleX from 'unplugin-stylex/vite';

export default defineConfig({
  plugins: [StyleX()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});

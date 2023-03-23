import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        dir: '../../docs/top-down-shooter',
      },
    },
  },
  base: 'web-game-engine/top-down-shooter',
});

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        dir: '../../docs/top-down-shooter',
      },
    },
  },
})

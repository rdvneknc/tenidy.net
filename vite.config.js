import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { localMediaPlugin } from './vite-plugin-local-media.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), localMediaPlugin()],
  server: {
    proxy: {
      // local-media is handled by the Vite plugin; other /api/* can still hit Express if needed
      '/api/upload': 'http://localhost:3001',
      '/api/notify-message': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
})

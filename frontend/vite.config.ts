import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Em desenvolvimento, /api é encaminhado para o backend (evita CORS).
const target = process.env.API_PROXY_TARGET ?? 'http://localhost:3333'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true, proxy: { '/api': target } },
  preview: { port: 5173, host: true, proxy: { '/api': target } },
})

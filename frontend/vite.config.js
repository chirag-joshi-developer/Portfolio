import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Allow Cloudflare / domain Host headers (default Vite only allows localhost → 403).
    allowedHosts: true,
    // Same-origin /api and /media in the browser; Vite forwards to Django.
    // Avoids CORS and localhost HTTPS-upgrade issues on project detail pages.
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://backend:8000',
        changeOrigin: true,
      },
    },
  },
})

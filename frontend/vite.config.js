import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function blockNonAppFiles() {
  const blockedPaths = new Set([
    '/Dockerfile',
    '/docker-compose.yml',
    '/docker-compose.prod.yml',
    '/nginx.conf',
    '/default.conf',
    '/package-lock.json',
    '/package.json',
  ])

  return {
    name: 'block-non-app-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split('?')[0] || ''

        if (blockedPaths.has(pathname) || pathname.startsWith('/.')) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end('Not found')
          return
        }

        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), blockNonAppFiles()],
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

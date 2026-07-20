import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import sitemapPlugin from './src/lib/viteSitemapPlugin.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin(), // Auto-generate sitemap at build time
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

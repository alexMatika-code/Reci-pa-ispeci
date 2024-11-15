import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://reci-pa-ispeci-q8z2.onrender.com',
        changeOrigin: true,
        secure: true, // Since your BE uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
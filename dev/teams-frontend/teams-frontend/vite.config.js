import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": {
        target: "https://reci-pa-ispeci-q8z2.onrender.com",
        changeOrigin: true
      },
    },
  },
})
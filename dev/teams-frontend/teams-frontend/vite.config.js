import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://reci-pa-ispeci-be.onrender.com',
                changeOrigin: true,
            },
        },
    },
});

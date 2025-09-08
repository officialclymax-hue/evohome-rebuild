import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: we host the admin at /admin,
// so tell Vite to prefix built asset paths with /admin/
export default defineConfig({
  base: '/admin/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

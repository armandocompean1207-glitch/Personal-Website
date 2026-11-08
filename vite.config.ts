import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The lazily loaded 3D chunk (three.js + R3F) is ~1 MB minified / ~290 kB
    // gzipped. It loads after the HTML renders, so the default 500 kB warning
    // is raised rather than split three.js into many small requests.
    chunkSizeWarningLimit: 1200,
  },
})

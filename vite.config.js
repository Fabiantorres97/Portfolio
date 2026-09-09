import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  // Serves and bundles files straight from the sibling /assets folder
  // (the portfolio images + tracker.xlsx that ship with this package),
  // so there's no need to duplicate them inside portfolio-site/.
  publicDir: fileURLToPath(new URL('../assets', import.meta.url)),
})

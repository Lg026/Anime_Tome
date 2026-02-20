import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Anime_Tome/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        404: 'index.html',
      },
    },
  },
})


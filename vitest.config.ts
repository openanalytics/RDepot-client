/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    includeSource: ['src/**/*.{js,ts,vue}'],
    deps: {
      inline: ['vuetify']
    },
    environment: 'jsdom'
  },
  define: {
    'import.meta.vitest': 'undefined'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

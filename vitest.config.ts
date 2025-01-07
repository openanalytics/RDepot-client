/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url'

import {
  defineConfig as defineViteConfig,
  mergeConfig
} from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'

import vue from '@vitejs/plugin-vue'

const viteConfig = defineVitestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    includeSource: ['src/**/*.{js,ts,vue}'],
    server: {
      deps: {
        inline: ['vuetify', 'moment']
      }
    },
    testTimeout: 20000,
    setupFiles: ['./src/__tests__/config/globalMocks.ts']
  }
})
// https://vitejs.dev/config/
const vitestConfig = defineViteConfig({
  plugins: [vue()],
  define: {
    'import.meta.vitest': 'undefined'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

export default mergeConfig(viteConfig, vitestConfig)

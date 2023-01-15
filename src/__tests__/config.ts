import { createVuetify } from 'vuetify/lib/framework.mjs'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { routes } from '@/router/routes'
import {
  createMemoryHistory,
  createRouter
} from 'vue-router'
import { beforeAll, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useI18n } from 'vue-i18n'
import vue from '@vitejs/plugin-vue'
import Notifications, {
  useNotification
} from '@kyvg/vue3-notification'

const vuetify = createVuetify({ components, directives })
export const router = createRouter({
  history: createMemoryHistory(),
  routes
})

beforeEach(() => {
  setActivePinia(createPinia())
})

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }
})

export const globalConfig = {
  mocks: {
    $t: (msg: String) => msg,
    $i18n: (msg: String) => msg
  },
  plugins: [vuetify, router]
}

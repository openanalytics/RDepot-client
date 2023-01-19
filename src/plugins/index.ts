/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import vuelidate from '@vuelidate/core'
import Notifications from '@kyvg/vue3-notification'

import type { App } from 'vue'
import { i18n } from './i18n'

export function registerPlugins(app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(vuelidate)
    .use(Notifications)
}

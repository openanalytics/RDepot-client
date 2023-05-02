import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Notifications from '@kyvg/vue3-notification'
import { i18nInstance } from '@/plugins/i18n'

const vuetify = createVuetify({
  components,
  directives
})

export const plugins = [
  vuetify,
  Notifications,
  i18nInstance
]
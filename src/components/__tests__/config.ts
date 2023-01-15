import { createVuetify } from 'vuetify/lib/framework.mjs'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

export const global = {
  mocks: {
    $t: (msg: String) => msg
  },
  plugins: [vuetify]
}

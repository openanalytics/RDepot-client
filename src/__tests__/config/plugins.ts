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

import { createVuetify } from 'vuetify/lib/framework.mjs'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { i18nInstance } from '@/plugins/i18n'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'

const vuetify = createVuetify({
  components,
  directives
})

export const plugins = [
  vuetify,
  Vue3Toastify,
  i18nInstance,
  VueDOMPurifyHTML
]

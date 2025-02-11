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

/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '@/plugins/router'
import { abilitiesPlugin } from '@casl/vue'
import type { App } from 'vue'
import { i18nInstance } from './i18n'
import { caslAbility } from './casl'
import { VueDOMPurifyHTMLconfig } from './vueDompurifyHtml'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import Vue3Toastify, {
  toast,
  type ToastContainerOptions
} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useToast } from '@/composable/toasts'
import VueApexCharts from 'vue3-apexcharts'

export function registerPlugins(app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18nInstance)
    .use(abilitiesPlugin, caslAbility)
    .use(VueApexCharts)
    .use(VueDOMPurifyHTML, VueDOMPurifyHTMLconfig)
    .use(Vue3Toastify, {
      autoClose: 3000,
      limit: 5,
      clearOnUrlChange: false,
      theme: useToast().getToastTheme(),
      position: toast.POSITION.BOTTOM_LEFT
    } as ToastContainerOptions)
}

/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'

import { createVuetify } from 'vuetify'
import getEnv from '@/utils/env'

const primaryDark = getEnv(
  'VITE_PRIMARY_COLOUR_DARK',
  '#32a6d3'
)
const primaryLight = getEnv(
  'VITE_PRIMARY_COLOUR_LIGHT',
  '#32a6d3'
)
const secondaryDark = getEnv(
  'VITE_SECONDARY_COLOUR_DARK',
  '#b0bec5'
)
const secondaryLight = getEnv(
  'VITE_SECONDARY_COLOUR_LIGHT',
  '#000'
)
const accentDark = getEnv(
  'VITE_ACCENT_COLOUR_DARK',
  '#8c9eff'
)
const accentLight = getEnv(
  'VITE_ACCENT_COLOUR_LIGHT',
  '#fff'
)

const backgroundLight = getEnv(
  'VITE_BACKGROUND_COLOUR_LIGHT',
  '#fff'
)

const backgroundDark = getEnv(
  'VITE_BACKGROUND_COLOUR_DARK',
  '#fff'
)

const borderRadiusEnabled =
  getEnv('VITE_BORDER_RADIUS') !== 'false'

export default createVuetify({
  defaults: {
    global: {
      rounded: borderRadiusEnabled ? undefined : 0
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          headerText: '#fff',
          primary: primaryDark,
          secondary: secondaryDark,
          accent: accentDark,
          error: '#b71c1c',
          background: backgroundDark,
          oared: '#e52323',
          'primary-darken-2': '#00729c',
          'primary-lighten-2': '#84cae5',
          darkoared: '#be1717',
          docsblue: '#30638e',
          lightyellow: '#f9eebf',
          darkyellow: '#ffd512',
          green: '#c3ed07',
          pink: '#fc53be',
          text: '#2d2d2d',
          'about-package': '#b5b3b3',
          'about-background': '#404746',
          code: '#6b6e6d',
          table: '#404746'
        }
      },
      light: {
        colors: {
          headerText: '#fff',
          primary: primaryLight,
          secondary: secondaryLight,
          accent: accentLight,
          error: '#b71c1c',
          background: backgroundLight,
          oared: '#e52323',
          'primary-darken-2': '#00729c',
          'primary-lighten-2': '#84cae5',
          docsblue: '#30638e',
          lightyellow: '#f9eebf',
          darkyellow: '#ffd512',
          green: '#c3ed07',
          pink: '#fc53be',
          text: '#fff',
          'about-package': '#555555',
          'about-background': '#bbb9b9',
          code: '#e0dfdf',
          table: '#84cae5'
        }
      }
    }
  }
})

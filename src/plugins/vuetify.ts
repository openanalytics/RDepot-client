/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          headerText: '#fff',
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          background: '#073642',
          oared: '#e52323',
          oablue: '#32a6d3',
          'oablue-darken-2': '#00729c',
          darkoared: '#be1717',
          docsblue: '#30638e',
          lightyellow: '#f9eebf',
          darkyellow: '#ffd512',
          green: '#c3ed07',
          pink: '#fc53be',
          text: '#2d2d2d',
          'about-package': '#b5b3b3',
          'about-background': '#404746',
          code: '#6b6e6d'
        }
      },
      light: {
        colors: {
          headerText: '#fff',
          primary: '#000',
          secondary: '#000',
          accent: '#fff',
          error: '#b71c1c',
          background: '#edebeb',
          oared: '#e52323',
          oablue: '#32a6d3',
          'oablue-darken-2': '#00729c',
          docsblue: '#30638e',
          lightyellow: '#f9eebf',
          darkyellow: '#ffd512',
          green: '#c3ed07',
          pink: '#fc53be',
          text: '#fff',
          'about-package': '#555555',
          'about-background': '#bbb9b9',
          code: '#e0dfdf'
        }
      }
    }
  }
})

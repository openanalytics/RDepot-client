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
    themes: {
      dark: {
        colors: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          background: '#073642',
          oared: '#e52323',
          oablue: '#32a6d3',
          'oablue-darken-2': '#00729c',
          docsblue: '#30638e',
          lightyellow: '#f9eebf',
          darkyellow: '#ffd512',
          green: '#c3ed07',
          pink: '#fc53be',
          text: '#2d2d2d'
        }
      },
      light: {
        colors: {
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
          text: '#fff'
        }
      }
    }
  }
})

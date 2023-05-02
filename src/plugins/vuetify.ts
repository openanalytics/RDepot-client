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

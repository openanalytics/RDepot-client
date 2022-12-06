import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        background: '#073642',
        oared: '#e52323',
        oablue: '#32a6d3',
        docsblue: '#30638e',
        lightyellow: '#f9eebf',
        darkyellow: '#ffd512',
        green: '#c3ed07',
        pink: '#fc53be',
        text: '#2d2d2d'
      },
      dark: {
        primary: '#000',
        secondary: '#000',
        accent: '#fff',
        error: '#b71c1c',
        background: '#666666',
        oared: '#e52323',
        oablue: '#32a6d3',
        docsblue: '#30638e',
        lightyellow: '#f9eebf',
        darkyellow: '#ffd512',
        green: '#c3ed07',
        pink: '#fc53be',
        text: '#fff'
      }
    }
  }
})
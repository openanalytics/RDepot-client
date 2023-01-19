/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import keycloak from './plugins/keycloak'
import { useI18n } from 'vue-i18n'

const app = createApp(App)

registerPlugins(app)
app.config.globalProperties.$keycloak = keycloak

app.mount('#app')

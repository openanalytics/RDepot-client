import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'
import VueI18n from 'vue-i18n'
import { messages } from './locales/messages'
import { api } from '@/plugins/index'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: "en",
  messages: messages
})

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

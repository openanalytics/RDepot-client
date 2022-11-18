import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Notifications from 'vue-notification'
import VueI18n from 'vue-i18n'
import { messages } from './locales/messages'
import { keycloak, updateToken } from './plugins/keycloak'
import { LoginType } from '@/enum/LoginType'

Vue.use(Notifications)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: "en",
  messages: messages
})

if(store.state.users.loginType == LoginType.KEYCLOAK){
  keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      new Vue({
        i18n,
        router,
        store,
        vuetify,
        render: h => h(App, { props: { keycloak: keycloak, } })
      }).$mount('#app');
      localStorage.setItem('vue-token', keycloak.token!);
      localStorage.setItem('vue-refresh-token', keycloak.refreshToken!)
    }

    setInterval(() => { updateToken }, 6000)

  }).catch((e) => {
    alert("Login Failure " + e)
  })

  Vue.prototype.$keycloak = keycloak
} else{
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
}

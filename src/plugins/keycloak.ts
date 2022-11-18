import store from '@/store';
import Keycloak from 'keycloak-js'
import Vue from 'vue';
import { LoginType } from '@/enum/LoginType';

const options = {
  url: 'http://192.168.49.17:8080/auth',
  realm: 'RDepot',
  clientId: 'oa-rdepot-vue-client',
  responsType: 'code',
  redirectUri: "http://localhost:3000",
  state: "4dfe4cff-7cc2-446d-8f6a-581dc04eff90",
  login: "true",
  scope: "openid",
  onLoad: "login-required"
}

export const keycloak = new Keycloak(options)

export async function updateToken(){
  Vue.prototype.$keycloak.updateToken(70).then((refreshed: string) => {
    if (refreshed) {
      console.log('Token refreshed' + refreshed);
    } else {
      console.log('Token not refreshed, valid for '
        + Math.round(keycloak.tokenParsed!.exp! + keycloak.timeSkew! - new Date().getTime() / 1000) + ' seconds');
    }
  }).catch(() => {
    console.log('Failed to refresh token');
  });
}

export async function initKeycloak(){
  keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      store.dispatch("chooseLoginType", LoginType.KEYCLOAK);
    }
    setInterval(() => { updateToken }, 6000)
  
  }).catch((e) => {
    alert("Login Failure " + e)
  })
  
  Vue.prototype.$keycloak = keycloak
}

import Keycloak from 'keycloak-js'
import Vue from 'vue';

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

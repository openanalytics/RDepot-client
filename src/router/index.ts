import store from '@/store'
import LoginVue from '@/views/users/Login.vue'
import RepositoriesVue from '@/views/repositories/Repositories.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const DEFAULT_TITLE = "RDepot"

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginVue,
    meta: {title: 'RDepot - login'}
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: RepositoriesVue,
    meta: {title: 'RDepot - repositories'}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const basePath = window.location.toString()
  console.log(Vue.prototype.$keycloak.authenticated)
  if (!Vue.prototype.$keycloak.authenticated) {
    Vue.prototype.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
  } 
  if (to.name !== 'login' && store.state.users.userToken == '' &&
  !localStorage.getItem('vue-token')
  ) next({ name: 'login' }) 
  else next();
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || DEFAULT_TITLE;
  });
})

export default router

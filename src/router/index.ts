import store from '@/store'
import LoginVue from '@/views/users/Login.vue'
import RepositoriesVue from '@/views/repositories/Repositories.vue'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { LoginType } from '@/enum/LoginType'
import PackagesVue from '@/views/packages/Packages.vue'
import AddSubmissionVue from '@/views/submissions/AddSubmission.vue'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'RDepot'

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
    meta: { title: 'RDepot - login' }
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: RepositoriesVue,
    meta: { title: 'RDepot - repositories' }
  },
  {
    path: '/packages',
    name: 'packages',
    component: PackagesVue,
    meta: { title: 'RDepot - packages' }
  },
  {
    path: '/add-packages',
    name: 'addSubmission',
    component: AddSubmissionVue,
    meta: { title: 'RDepot - add packages' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const basePath = window.location.toString()
  // if(localStorage.getItem('authorizationType') != LoginType.DEFAULT.toString()){
  //   console.log(Vue.prototype.$keycloak )
  //   if (!Vue.prototype.$keycloak.authenticated) {
  //     Vue.prototype.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
  //   }
  // }
  // if ((to.name !== 'login' && store.state.users.userToken == '') && localStorage.getItem('authorizationType') == LoginType.DEFAULT.toString()
  // ) next({ name: 'login' })
  // else next();
  next()
})

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || DEFAULT_TITLE
  })
})

export default router

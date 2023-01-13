// Composables
import { createRouter, createWebHistory } from 'vue-router'
import PackagesVue from '@/views/packages/Packages.vue'
import LoginVue from '@/views/users/Login.vue'
import RepositoriesVue from '@/views/repositories/Repositories.vue'
import PackageDetailsVue from '@/views/packages/PackageDetails.vue'
import AddSubmissionVue from '@/views/submissions/AddSubmission.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
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
        path: '/package-details/:name',
        name: 'packageDetails',
        component: PackageDetailsVue,
        meta: { title: 'RDepot - package details' },
        props: true
      },
      {
        path: '/add-packages',
        name: 'addSubmission',
        component: AddSubmissionVue,
        meta: { title: 'RDepot - add packages' }
      }
    ],
  },
]

const DEFAULT_TITLE = 'RDepot'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

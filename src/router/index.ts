// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

const DEFAULT_TITLE = 'RDepot'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

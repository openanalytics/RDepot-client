// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { i18n } from '@/plugins/i18n'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  next()
})

export default router

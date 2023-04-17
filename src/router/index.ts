// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { i18n } from '@/plugins/i18n'
import { usePaginationStore } from '@/store/pagination'
import { useSortStore } from '@/store/sort'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const pagination = usePaginationStore()
  const sort = useSortStore()
  pagination.setPage(0)
  sort.reset()
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  next()
})

export default router

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { i18n } from '@/plugins/i18n'
import { usePaginationStore } from '@/store/pagination'
import { useLoggedUserStore } from '@/store/logged_user'
import defineAbilityFor from '@/services/abilities'

const DEFAULT_TITLE = i18n.t('common.projectTitle')

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const logged_user = useLoggedUserStore()
  const pagination = usePaginationStore()
  pagination.setPage(0)
  document.title = to.meta.title
    ? (to.meta.title as string)
    : DEFAULT_TITLE
  const abilities = defineAbilityFor(logged_user.userRole)
  return true //abilities.can('GET', to.name)
})

export default router

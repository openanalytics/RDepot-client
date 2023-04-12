import { useLoggedUserStore } from '@/store/logged_user'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Logged user store tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Default state', () => {
    const logged_user_store = useLoggedUserStore()

    expect(logged_user_store.userToken).toBe(
      import.meta.env.VITE_ADMIN_TOKEN
    )
    expect(logged_user_store.userLogin).toBe('einstein')
    expect(logged_user_store.userRole).toBe('admin')
    expect(logged_user_store.userId).toBe(8)
  })

  it('Change user', () => {
    const logged_user_store = useLoggedUserStore()

    logged_user_store.change_user(
      import.meta.env.VITE_REPOSITORY_MAINTAINER_TOKEN,
      'tesla',
      'repository maintainer',
      5
    )
  })
})

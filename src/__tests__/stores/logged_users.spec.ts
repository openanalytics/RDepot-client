/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { Role } from '@/enum/UserRoles'
import { useLoggedUserStore } from '@/store/logged_user'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it, beforeEach } from 'vitest'

describe('Logged user store tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Default state', () => {
    const loggedUserStore = useLoggedUserStore()

    expect(loggedUserStore.userToken).toBe(
      import.meta.env.VITE_ADMIN_TOKEN
    )
    expect(loggedUserStore.userLogin).toBe('einstein')
    expect(loggedUserStore.userRole).toBe(Role.enum.admin)
    expect(loggedUserStore.userId).toBe(8)
  })

  it('Change user', () => {
    const loggedUserStore = useLoggedUserStore()

    loggedUserStore.changeUser(
      import.meta.env.VITE_REPOSITORY_MAINTAINER_TOKEN,
      'tesla',
      Role.enum.repositoryMaintainer,
      5
    )

    expect(loggedUserStore.userLogin).toBe('tesla')
    expect(loggedUserStore.userRole).toBe(
      Role.enum.repositoryMaintainer
    )
    expect(loggedUserStore.userId).toBe(5)
  })
})

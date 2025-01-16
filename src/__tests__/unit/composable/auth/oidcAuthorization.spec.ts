/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import {
  describe,
  it,
  expect,
  beforeEach,
  vi
} from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useOIDCAuthorization } from '@/composable/auth/oidcAuthorization'
import { authService } from '@/plugins/oauth'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('oidc authorization composable', () => {
  it('should trigger login method', () => {
    const { login } = useOIDCAuthorization()
    const spy = vi.spyOn(authService, 'login')
    login()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger logout method', () => {
    const { logout } = useOIDCAuthorization()
    const spy = vi.spyOn(authService, 'logout')
    logout()
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should check if OIDC is Available', () => {
    const { isOIDCAuthAvailable } = useOIDCAuthorization()
    expect(isOIDCAuthAvailable()).toBeFalsy()
  })

  it('should check if user is logged in with OIDC', async () => {
    const { isUserLoggedInOIDC } = useOIDCAuthorization()
    expect(await isUserLoggedInOIDC()).toBeFalsy()
  })
})

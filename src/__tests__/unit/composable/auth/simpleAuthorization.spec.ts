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

import { describe, it, expect, vi } from 'vitest'

import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'
import { Login } from '@/models/users/Login'
import axios from 'axios'

describe('simple authorization composable', () => {
  it('should remove old data from local storage when logging in', () => {
    const { login } = useSimpleAuthorization()
    const spy = vi.spyOn(Storage.prototype, 'removeItem')
    login({ username: 'user', password: '' } as Login)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger axios post method when logging in', () => {
    const { login } = useSimpleAuthorization()
    const spy = vi.spyOn(axios, 'post')
    login({ username: 'user', password: '' } as Login)
    expect(spy).toHaveBeenCalledOnce()
  })

  it('should trigger logout method', () => {
    const { logout } = useSimpleAuthorization()
    const spy = vi.spyOn(Storage.prototype, 'removeItem')
    logout()
    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('should check if OIDC is Available', () => {
    const { isSimpleAuthAvailable } =
      useSimpleAuthorization()
    expect(isSimpleAuthAvailable()).toBeTruthy()
  })

  it('should check if user is logged in with OIDC', async () => {
    const { getTokenFromLocalStorage } =
      useSimpleAuthorization()
    const spy = vi.spyOn(Storage.prototype, 'getItem')
    getTokenFromLocalStorage()
    expect(spy).toHaveBeenCalledOnce()
  })
})

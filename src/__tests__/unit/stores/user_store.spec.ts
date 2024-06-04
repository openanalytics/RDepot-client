/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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

import { useUserStore } from '@/store/users'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('User Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const user_store = useUserStore()
    expect(user_store.userToken).toEqual('')
    expect(user_store.userName).toEqual('')
    expect(user_store.users).toEqual([])
    expect(user_store.chosenUser).toEqual({})
    expect(user_store.roles).toEqual([])
  })
})

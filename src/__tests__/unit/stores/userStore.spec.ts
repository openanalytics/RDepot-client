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

import { useUserStore } from '@/store/options/users'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

describe('User Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
  })

  it('Starting values', () => {
    const userStore = useUserStore()
    expect(userStore.userToken).toEqual('')
    expect(userStore.userName).toEqual('')
    expect(userStore.users).toEqual([])
    expect(userStore.pending).toStrictEqual([])
    expect(userStore.chosenUser).toEqual({})
    expect(userStore.roles).toEqual([])
    expect(userStore.totalNumber).toEqual(0)
  })
})

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

import { createPinia, setActivePinia } from 'pinia'
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  afterAll
} from 'vitest'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { useRepositoryStore } from '@/store/options/repositories'
import { usePagination } from '@/store/setup/pagination'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'

const defaultFiltration = {
  technologies: undefined,
  search: undefined,
  deleted: false,
  published: true,
  name: undefined,
  maintainer: undefined
}

const randomFiltration = {
  deleted: true,
  technologies: [Technologies.enum.R],
  search: '10',
  published: true,
  maintainer: ['tesla']
}

describe('Repository Store', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    server.listen()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
  })

  afterAll(() => {
    server.close()
  })

  it('Starting values', () => {
    const repositoriesStore = useRepositoryStore()
    expect(repositoriesStore.repositories).toStrictEqual([])
    expect(
      repositoriesStore.chosenRepository
    ).toStrictEqual({})
    expect(repositoriesStore.chosenRepository.name).toBe(
      undefined
    )
    expect(repositoriesStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Fetch repositories', async () => {
    const repositoriesStore = useRepositoryStore()

    await repositoriesStore.getRepositories()

    expect(repositoriesStore.repositories).toStrictEqual(
      repositories.data.content
    )
  })

  it('Edit filtration', () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePagination()
    const spy = vi.spyOn(
      repositoriesStore,
      'getRepositories'
    )
    paginationStore.page = 2

    repositoriesStore.setFiltration(randomFiltration)

    expect(paginationStore.page).toBe(1)
    expect(repositoriesStore.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePagination()
    repositoriesStore.filtration = randomFiltration
    paginationStore.page = 2

    repositoriesStore.clearFiltration()

    expect(paginationStore.page).toBe(1)
    expect(repositoriesStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', async () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePagination()
    const spy = vi.spyOn(
      repositoriesStore,
      'getRepositories'
    )
    repositoriesStore.filtration = randomFiltration
    paginationStore.page = 2

    await repositoriesStore.clearFiltrationAndFetch()

    expect(paginationStore.page).toBe(1)
    expect(repositoriesStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
    expect(repositoriesStore.repositories).toStrictEqual(
      repositories.data.content
    )
  })
})

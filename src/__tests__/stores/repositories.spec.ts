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

import { setupServer } from 'msw/node'
import { createPinia, setActivePinia } from 'pinia'
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  afterAll
} from 'vitest'
import packages from '@/__tests__/config/mockData/packages.json'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { rest } from 'msw'
import { useRepositoryStore } from '@/store/repositories'
import { usePaginationStore } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'

const defaultFiltration = {
  name: undefined,
  technologies: undefined,
  deleted: false
}

const randomFiltration = {
  name: 'Test',
  technologies: [Technologies.enum.R],
  deleted: true
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/repositories',
    (_, res, ctx) => {
      return res(ctx.json(repositories))
    }
  ),
  rest.get(
    'http://localhost:8017/api/v2/manager/packages',
    (_, res, ctx) => {
      return res(ctx.json(packages))
    }
  )
)

describe('Repository Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.listen()
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

    await repositoriesStore.fetchRepositories()

    expect(repositoriesStore.repositories).toStrictEqual(
      repositories.data.content
    )
  })

  it('Edit filtration', () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePaginationStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'fetchRepositories'
    )
    paginationStore.page = 2

    repositoriesStore.setFiltration(randomFiltration)

    expect(paginationStore.page).toBe(0)
    expect(repositoriesStore.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePaginationStore()
    repositoriesStore.filtration = randomFiltration
    paginationStore.page = 2

    repositoriesStore.clearFiltration()

    expect(paginationStore.page).toBe(0)
    expect(repositoriesStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', async () => {
    const repositoriesStore = useRepositoryStore()
    const paginationStore = usePaginationStore()
    const spy = vi.spyOn(
      repositoriesStore,
      'fetchRepositories'
    )
    repositoriesStore.filtration = randomFiltration
    paginationStore.page = 2

    await repositoriesStore.clearFiltrationAndFetch()

    expect(paginationStore.page).toBe(0)
    expect(repositoriesStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
    expect(repositoriesStore.repositories).toStrictEqual(
      repositories.data.content
    )
  })
})

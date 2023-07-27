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
import { usePagination } from '@/store/pagination'
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
    const repositories_store = useRepositoryStore()
    expect(repositories_store.repositories).toStrictEqual(
      []
    )
    expect(
      repositories_store.chosenRepository
    ).toStrictEqual({})
    expect(repositories_store.chosenRepository.name).toBe(
      undefined
    )
    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Fetch repositories', async () => {
    const repositories_store = useRepositoryStore()

    await repositories_store.fetchRepositories()

    expect(repositories_store.repositories).toStrictEqual(
      repositories.data.content
    )
  })

  it('Edit filtration', () => {
    const repositories_store = useRepositoryStore()
    const pagination = usePagination()
    const spy = vi.spyOn(
      repositories_store,
      'fetchRepositories'
    )
    pagination.page = 2

    repositories_store.setFiltration(randomFiltration)

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(repositories_store.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const repositories_store = useRepositoryStore()
    const pagination = usePagination()
    repositories_store.filtration = randomFiltration
    pagination.page = 2

    repositories_store.clearFiltration()

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', async () => {
    const repositories_store = useRepositoryStore()
    const pagination = usePagination()
    const spy = vi.spyOn(
      repositories_store,
      'fetchRepositories'
    )
    repositories_store.filtration = randomFiltration
    pagination.page = 2

    await repositories_store.clearFiltrationAndFetch()

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
    expect(repositories_store.repositories).toStrictEqual(
      repositories.data.content
    )
  })
})

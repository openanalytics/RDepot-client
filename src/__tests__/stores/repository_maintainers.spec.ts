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

import { createPinia, setActivePinia } from 'pinia'
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
  beforeAll,
  afterAll
} from 'vitest'
import repositoryMaintainers from '@/__tests__/config/mockData/repositoryMaintainers.json'
import repositories from '@/__tests__/config/mockData/repositories.json'
import packages from '@/__tests__/config/mockData/packages.json'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import { i18n } from '@/plugins/i18n'

const defaultFiltration = {
  deleted: undefined,
  technologies: undefined,
  search: undefined
}

const randomFiltration = {
  deleted: false,
  technologies: [Technologies.enum.Python],
  search: 'ana'
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/repository-maintainers',
    (_, res, ctx) => {
      return res(ctx.json(repositoryMaintainers))
    }
  ),
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
  ),
  rest.delete(
    'http://localhost:8017/api/v2/manager/repository-maintainers/:maintainer_id',
    (_, res, ctx) => {
      return res(ctx.status(202))
    }
  ),
  rest.patch(
    'http://localhost:8017/api/v2/manager/repository-maintainers/:maintainer_id',
    (_, res, ctx) => {
      return res(ctx.status(202))
    }
  )
)

describe('Repository Maintainers Store', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    server.resetHandlers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  afterAll(() => {
    server.close()
  })

  it('Starting values', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual([])
    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
    expect(
      repositoryMaintainersStore.chosenMaintainer
    ).toStrictEqual({})
  })

  it('Edit filtration', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const paginationStore = usePagination()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'fetchMaintainers'
    )
    paginationStore.page = 2

    expect(spy).toHaveBeenCalledTimes(0)
    repositoryMaintainersStore.setFiltration(
      randomFiltration
    )

    expect(paginationStore.page).toBe(1)
    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(randomFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const paginationStore = usePagination()
    paginationStore.page = 2

    repositoryMaintainersStore.filtration = randomFiltration
    repositoryMaintainersStore.clearFiltration()
    expect(paginationStore.page).toBe(1)
    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
  })

  it('Clear filtration and fetch', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const paginationStore = usePagination()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'fetchMaintainers'
    )

    repositoryMaintainersStore.filtration = randomFiltration
    paginationStore.page = 2

    await repositoryMaintainersStore.clearFiltrationAndFetch()

    expect(paginationStore.page).toBe(1)
    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual(repositoryMaintainers.data.content)
  })

  it('Set chosen maintainer without changes', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    repositoryMaintainersStore.maintainers =
      repositoryMaintainers.data.content

    repositoryMaintainersStore.setChosenMaintainer(
      repositoryMaintainers.data.content[3]
    )

    expect(
      repositoryMaintainersStore.maintainers[3]
    ).toStrictEqual(repositoryMaintainers.data.content[3])
  })

  it('Set chosen maintainer with changes', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    repositoryMaintainersStore.maintainers =
      repositoryMaintainers.data.content

    const changedMaintainer =
      repositoryMaintainers.data.content[3]
    changedMaintainer.deleted = !changedMaintainer.deleted

    repositoryMaintainersStore.setChosenMaintainer(
      changedMaintainer
    )

    expect(
      repositoryMaintainersStore.maintainers[3]
    ).toStrictEqual(changedMaintainer)
  })

  it('Fetch maintainers', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.fetchMaintainers()

    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual(repositoryMaintainers.data.content)
  })

  it('Fetch repositories', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.fetchRepositories()

    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual(repositories.data.content)
  })

  it('Delete chosen maintainer', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    // vi.mock('@kyvg/vue3-notification')
    vi.mock('vue3-toastify')
    const notify = await import('vue3-toastify')
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'fetchMaintainers'
    )

    repositoryMaintainersStore.fetchMaintainers()
    repositoryMaintainersStore.setChosenMaintainer(
      repositoryMaintainers.data.content[2]
    )

    await repositoryMaintainersStore.deleteMaintainer()

    expect(spy).toBeCalled()
    // expect(notify.notify).toBeCalledWith('success')
    expect(notify.toast.success).toBeCalled()
  })

  it('Save chosen maintainer', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'fetchMaintainers'
    )

    repositoryMaintainersStore.fetchMaintainers()
    repositoryMaintainersStore.setChosenMaintainer(
      repositoryMaintainers.data.content[2]
    )
    await repositoryMaintainersStore.updateMaintainer({
      id: repositoryMaintainers.data.content[2].id
    })

    expect(spy).toBeCalled()
  })
})

const failingServer = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/repository-maintainers',
    (_, res, ctx) => {
      return res(ctx.status(403))
    }
  ),
  rest.get(
    'http://localhost:8017/api/v2/manager/repositories',
    (_, res, ctx) => {
      return res(ctx.status(403))
    }
  ),
  rest.get(
    'http://localhost:8017/api/v2/manager/packages',
    (_, res, ctx) => {
      return res(ctx.status(403))
    }
  )
)

describe('Repository Maintainers Store requests with failing backend', () => {
  beforeAll(() => {
    failingServer.listen()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    failingServer.resetHandlers()
  })

  afterAll(() => {
    failingServer.close()
  })

  it('Fetch maintainers', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.fetchMaintainers()

    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual([])
  })

  it('Fetch repositories', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.fetchRepositories()

    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
  })

  it('Fetch packages', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.fetchRepositories()

    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
  })
})

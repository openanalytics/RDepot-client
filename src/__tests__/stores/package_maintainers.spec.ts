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

import { usePackageMaintainersStore } from '@/store/package_maintainers'
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
import packageMaintainers from '@/__tests__/config/mockData/packageMaintainers.json'
import repositories from '@/__tests__/config/mockData/repositories.json'
import packages from '@/__tests__/config/mockData/packages.json'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'

const defaultFiltration = defaultValues(
  PackageMaintainersFiltration
)

const randomFiltration = {
  deleted: true,
  technologies: [
    Technologies.enum.Python,
    Technologies.enum.R
  ]
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/package-maintainers',
    (_, res, ctx) => {
      return res(ctx.json(packageMaintainers))
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
    'http://localhost:8017/api/v2/manager/package-maintainers/3',
    (_, res, ctx) => {
      return res(ctx.status(202))
    }
  ),
  rest.patch(
    'http://localhost:8017/api/v2/manager/package-maintainers/3',
    (_, res, ctx) => {
      return res(ctx.status(202))
    }
  )
)

describe('Package Maintainers Store', () => {
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
    const packageMaintainersStore =
      usePackageMaintainersStore()
    expect(
      packageMaintainersStore.maintainers
    ).toStrictEqual([])
    expect(
      packageMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
    expect(
      packageMaintainersStore.repositories
    ).toStrictEqual([])
    expect(packageMaintainersStore.packages).toStrictEqual(
      []
    )
    expect(
      packageMaintainersStore.chosenMaintainer
    ).toStrictEqual({})
  })

  it('Edit filtration', () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const paginationStore = usePagination()
    paginationStore.page = 2
    const spy = vi.spyOn(
      packageMaintainersStore,
      'fetchMaintainers'
    )
    expect(spy).toHaveBeenCalledTimes(0)

    packageMaintainersStore.setFiltration(randomFiltration)

    expect(paginationStore.page).toBe(1)
    expect(
      packageMaintainersStore.filtration
    ).toStrictEqual(randomFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const paginationStore = usePagination()
    paginationStore.page = 2
    packageMaintainersStore.filtration = randomFiltration

    packageMaintainersStore.clearFiltration()

    expect(paginationStore.page).toBe(1)
    expect(
      packageMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
  })

  it('Clear filtration and fetch', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const paginationStore = usePagination()
    paginationStore.page = 2
    const spy = vi.spyOn(
      packageMaintainersStore,
      'fetchMaintainers'
    )

    packageMaintainersStore.filtration = randomFiltration
    await packageMaintainersStore.clearFiltrationAndFetch()

    expect(paginationStore.page).toBe(1)
    expect(
      packageMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(
      packageMaintainersStore.maintainers
    ).toStrictEqual(packageMaintainers.data.content)
  })

  it('Set chosen maintainer without changes', () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainersStore,
      'saveMaintainer'
    )
    packageMaintainersStore.maintainers =
      packageMaintainers.data.content

    expect(spy).toHaveBeenCalledTimes(0)

    packageMaintainersStore.setChosenMaintainer(
      packageMaintainers.data.content[3]
    )

    expect(
      packageMaintainersStore.maintainers[3]
    ).toStrictEqual(packageMaintainers.data.content[3])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Set chosen maintainer with changes', () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainersStore,
      'saveMaintainer'
    )
    packageMaintainersStore.maintainers =
      packageMaintainers.data.content

    const changedMaintainer =
      packageMaintainers.data.content[3]
    changedMaintainer.deleted = !changedMaintainer.deleted
    expect(spy).toHaveBeenCalledTimes(0)

    packageMaintainersStore.setChosenMaintainer(
      changedMaintainer
    )

    expect(
      packageMaintainersStore.maintainers[3]
    ).toStrictEqual(changedMaintainer)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Fetch maintainers', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchMaintainers()

    expect(
      packageMaintainersStore.maintainers
    ).toStrictEqual(packageMaintainers.data.content)
  })

  it('Fetch repositories', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchRepositories()

    expect(
      packageMaintainersStore.repositories
    ).toStrictEqual(repositories.data.content)
  })

  it('Fetch packages', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchPackages()

    expect(packageMaintainersStore.packages).toStrictEqual(
      packages.data.content
    )
  })

  it('Delete chosen maintainer', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainersStore,
      'fetchMaintainers'
    )

    packageMaintainersStore.fetchMaintainers()
    packageMaintainersStore.setChosenMaintainer(
      packageMaintainers.data.content[2]
    )

    await packageMaintainersStore.deleteChosenMaintainer()

    expect(spy).toBeCalled()
  })

  it('Edit chosen maintainer', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      packageMaintainersStore,
      'fetchMaintainers'
    )

    packageMaintainersStore.fetchMaintainers()
    packageMaintainersStore.setChosenMaintainer(
      packageMaintainers.data.content[2]
    )
    const newMaintainer = packageMaintainers.data.content[3]
    newMaintainer.id = packageMaintainers.data.content[2].id
    await packageMaintainersStore.updateMaintainer(
      newMaintainer
    )

    expect(spy).toBeCalled()
  })
})

const failingServer = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/package-maintainers',
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

describe('Package Maintainers Store requests with failing backend', () => {
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
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchMaintainers()

    expect(
      packageMaintainersStore.maintainers
    ).toStrictEqual([])
  })

  it('Fetch repositories', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchRepositories()

    expect(
      packageMaintainersStore.repositories
    ).toStrictEqual([])
  })

  it('Fetch packages', async () => {
    const packageMaintainersStore =
      usePackageMaintainersStore()

    await packageMaintainersStore.fetchPackages()

    expect(packageMaintainersStore.packages).toStrictEqual(
      []
    )
  })
})

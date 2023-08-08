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

import { usePackagesStore } from '@/store/packages'
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
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import {
  PackagesFiltration,
  defaultValues
} from '@/models/Filtration'
import { useUtilities } from '@/composable/utilities'

const defaultFiltration = defaultValues(PackagesFiltration)

const { deepCopyAny } = useUtilities()
const randomFiltration = {
  state: 'ACCEPTED',
  deleted: true,
  repository: 'testrepo1',
  technologies: [Technologies.enum.R]
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/packages',
    (_, res, ctx) => {
      return res(ctx.json(packages))
    }
  ),
  rest.get(
    'http://localhost:8017/api/v2/manager/packages/:package_id',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: packages.data.content.find(
            (elem) =>
              elem.id.toString() ===
              req.params.package_id.toString()
          )
        })
      )
    }
  ),
  rest.patch(
    'http://localhost:8017/api/v2/manager/r/packages/:package_id',
    (req, res, ctx) => {
      return res(ctx.status(202))
    }
  )
)

describe('Package Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  it('Starting values', () => {
    const package_store = usePackagesStore()
    expect(package_store.packages).toStrictEqual([])
    expect(package_store.package).toStrictEqual({})
    expect(package_store.vignettes).toStrictEqual({})
    expect(package_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(package_store.next).toStrictEqual(false)
  })

  it('Fetch packages', async () => {
    const package_store = usePackagesStore()

    await package_store.fetchPackages()

    expect(package_store.packages).toStrictEqual(
      packages.data.content
    )
  })

  it('Fetch package', async () => {
    const package_store = usePackagesStore()

    await package_store.fetchPackage(
      packages.data.content[2].id
    )

    expect(package_store.package).toStrictEqual(
      packages.data.content[2]
    )
  })

  it('Activate package', async () => {
    const package_store = usePackagesStore()
    const spy = vi.spyOn(package_store, 'fetchPackages')
    const newPackage = deepCopyAny(packages.data.content[2])

    await package_store.activatePackage(newPackage)

    expect(spy).toBeCalled()
  })

  it('Edit filtration', () => {
    const package_store = usePackagesStore()
    const spy = vi.spyOn(package_store, 'fetchPackages')
    const pagination = usePagination()
    pagination.page = 2

    package_store.setFiltration(randomFiltration)

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(package_store.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const package_store = usePackagesStore()
    const pagination = usePagination()
    pagination.page = 2

    package_store.filtration = randomFiltration
    package_store.clearFiltration()

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(package_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', async () => {
    const package_store = usePackagesStore()
    const spy = vi.spyOn(package_store, 'fetchPackages')
    const pagination = usePagination()
    pagination.page = 2

    package_store.filtration = randomFiltration
    await package_store.clearFiltrationAndFetch()

    expect(pagination.page).toBe(1)
    expect(pagination.fetchPage).toBe(0)
    expect(package_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
    expect(package_store.packages).toStrictEqual(
      packages.data.content
    )
  })

  it('Set repository filtration only', () => {
    const package_store = usePackagesStore()

    package_store.filtration = randomFiltration
    package_store.setFiltrationByRepositoryOnly(
      repositories.data.content[0].name
    )

    expect(
      package_store.filtration.repository
    ).toStrictEqual(repositories.data.content[0].name)
    expect(package_store.filtration.deleted).toBe(
      defaultFiltration.deleted
    )
    expect(package_store.filtration.state).toBe(
      defaultFiltration.state
    )
    expect(package_store.filtration.technologies).toBe(
      defaultFiltration.technologies
    )
  })
})

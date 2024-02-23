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
import submissions from '@/__tests__/config/mockData/submissions.json'
import repositories from '@/__tests__/config/mockData/repositories.json'
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import {
  PackagesFiltration,
  defaultValues
} from '@/models/Filtration'
import { useUtilities } from '@/composable/utilities'
import { http, HttpResponse } from 'msw'

const defaultFiltration = defaultValues(PackagesFiltration)

const { deepCopyAny } = useUtilities()
const randomFiltration = {
  submissionState: ['ACCEPTED'],
  repository: ['repository1'],
  deleted: false,
  technologies: [Technologies.enum.R],
  maintainer: ['newton'],
  search: 'a'
}

const server = setupServer(
  http.get(
    'http://localhost:8017/api/v2/manager/packages',
    () => {
      return HttpResponse.json(packages)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/submissions',
    () => {
      return HttpResponse.json(submissions)
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/r/packages/:package_id',
    ({ params }) => {
      const { package_id } = params
      return HttpResponse.json({
        data: packages.data.content.find(
          (elem) =>
            elem.id.toString() === package_id.toString()
        )
      })
    }
  ),
  http.get(
    'http://localhost:8017/api/v2/manager/submissions/:submission_id',
    ({ params }) => {
      const { submission_id } = params
      return HttpResponse.json({
        data: submissions.data.content.find(
          (elem) =>
            elem.id.toString() === submission_id.toString()
        )
      })
    }
  ),
  http.patch(
    'http://localhost:8017/api/v2/manager/r/packages/:package_id',
    () => {
      return new HttpResponse(null, {
        status: 202
      })
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
    const packageStore = usePackagesStore()
    expect(packageStore.packages).toStrictEqual([])
    expect(packageStore.package).toStrictEqual({})
    expect(packageStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(packageStore.next).toStrictEqual(false)
  })

  it('Fetch packages', async () => {
    const packageStore = usePackagesStore()

    await packageStore.fetchPackages()

    expect(packageStore.packages).toStrictEqual(
      packages.data.content
    )
  })

  it('Fetch package', async () => {
    const packageStore = usePackagesStore()
    await packageStore.fetchPackage(
      packages.data.content[2].id,
      'R'
    )

    expect(packageStore.package).toStrictEqual(
      packages.data.content[2]
    )
  })

  it('Activate package', async () => {
    const packageStore = usePackagesStore()
    const spy = vi.spyOn(packageStore, 'fetchPackages')
    const newPackage = deepCopyAny(packages.data.content[2])

    await packageStore.activatePackage(newPackage)

    expect(spy).toBeCalled()
  })

  it('Edit filtration', () => {
    const packageStore = usePackagesStore()
    const spy = vi.spyOn(packageStore, 'fetchPackages')
    const pagination = usePagination()
    pagination.page = 2

    packageStore.setFiltration(randomFiltration)

    expect(pagination.page).toBe(1)
    expect(packageStore.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const packageStore = usePackagesStore()
    const pagination = usePagination()
    pagination.page = 2

    packageStore.filtration = randomFiltration
    packageStore.clearFiltration()

    expect(pagination.page).toBe(1)
    expect(packageStore.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', async () => {
    const packageStore = usePackagesStore()
    const spy = vi.spyOn(packageStore, 'fetchPackages')
    const pagination = usePagination()
    pagination.page = 2

    packageStore.filtration = randomFiltration
    await packageStore.clearFiltrationAndFetch()

    expect(pagination.page).toBe(1)
    expect(packageStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
    expect(packageStore.packages).toStrictEqual(
      packages.data.content
    )
  })

  it('Set repository filtration only', () => {
    const packageStore = usePackagesStore()

    packageStore.filtration = randomFiltration
    packageStore.setFiltrationByRepositoryOnly(
      repositories.data.content[0].name
    )

    expect(
      packageStore.filtration.repository
    ).toStrictEqual(repositories.data.content[0].name)
    expect(packageStore.filtration.deleted).toBe(
      defaultFiltration.deleted
    )
    expect(packageStore.filtration.submissionState).toBe(
      defaultFiltration.submissionState
    )
    expect(packageStore.filtration.technologies).toBe(
      defaultFiltration.technologies
    )
  })
})

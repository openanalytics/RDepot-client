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
import { usePagination } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'
import {
  PackagesFiltration,
  defaultValues
} from '@/models/Filtration'
import { useAuthorizationStore } from '@/store/authorization'
import { server } from '@/__tests__/config/backend/server'

const defaultFiltration = defaultValues(PackagesFiltration)

const randomFiltration = {
  submissionState: ['ACCEPTED'],
  repository: ['repository1'],
  deleted: false,
  technologies: [Technologies.enum.R],
  maintainer: ['newton'],
  search: 'a'
}

describe('Package Store', () => {
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
    const packageStore = usePackagesStore()
    expect(packageStore.packages).toStrictEqual([])
    expect(packageStore.pending).toStrictEqual([])
    expect(packageStore.package).toStrictEqual({})
    expect(packageStore.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(packageStore.next).toStrictEqual(false)
    expect(packageStore.totalNumber).toStrictEqual(0)
  })

  it('Fetch packages', async () => {
    const packageStore = usePackagesStore()

    await packageStore.getPackages()

    expect(packageStore.packages).toStrictEqual(
      packages.data.content
    )

    expect(packageStore.totalNumber).toStrictEqual(
      packages.data.page.totalElements
    )
  })

  it('Edit filtration', () => {
    const packageStore = usePackagesStore()
    const spy = vi.spyOn(packageStore, 'getPackages')
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
    const spy = vi.spyOn(packageStore, 'getPackages')
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
    packageStore.setFiltrationBy({
      repository: [repositories.data.content[0].name]
    })

    expect(
      packageStore.filtration.repository
    ).toStrictEqual([repositories.data.content[0].name])
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

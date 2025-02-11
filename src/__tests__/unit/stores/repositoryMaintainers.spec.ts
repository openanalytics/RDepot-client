/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import { useRepositoryMaintainersStore } from '@/store/options/repositoryMaintainers'
import { Technologies } from '@/enum/Technologies'
import { useAuthorizationStore } from '@/store/options/authorization'
import { server } from '@/__tests__/config/backend/server'
import { failingServer } from '@/__tests__/config/backend/failingServer'
import {
  defaultValues,
  RepositoryMaintainersFiltration
} from '@/models/Filtration'

const defaultFiltration = defaultValues(
  RepositoryMaintainersFiltration
)

const randomFiltration = {
  deleted: false,
  technologies: [Technologies.enum.Python],
  search: 'ana'
}

describe('Repository Maintainers Store', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    server.resetHandlers()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
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
      repositoryMaintainersStore.pending
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
    expect(
      repositoryMaintainersStore.totalNumber
    ).toStrictEqual(0)
  })

  it('Edit filtration', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'getPage'
    )

    expect(spy).toHaveBeenCalledTimes(0)
    repositoryMaintainersStore.setFiltration(
      randomFiltration
    )

    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(randomFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    repositoryMaintainersStore.filtration = randomFiltration
    repositoryMaintainersStore.clearFiltration()
    expect(
      repositoryMaintainersStore.filtration
    ).toStrictEqual(defaultFiltration)
  })

  it('Clear filtration and fetch', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'getPage'
    )

    repositoryMaintainersStore.filtration = randomFiltration

    await repositoryMaintainersStore.clearFiltrationAndFetch()

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

    repositoryMaintainersStore.chosenMaintainer =
      repositoryMaintainers.data.content[3]

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

    repositoryMaintainersStore.chosenMaintainer =
      changedMaintainer

    expect(
      repositoryMaintainersStore.maintainers[3]
    ).toStrictEqual(changedMaintainer)
  })

  it('Fetch maintainers', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.getPage()

    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual(repositoryMaintainers.data.content)

    expect(
      repositoryMaintainersStore.totalNumber
    ).toStrictEqual(
      repositoryMaintainers.data.page.totalElements
    )
  })

  it('Fetch repositories', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.getRepositories()

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
      'getPage'
    )

    repositoryMaintainersStore.getPage()
    repositoryMaintainersStore.chosenMaintainer =
      repositoryMaintainers.data.content[2]

    await repositoryMaintainersStore.delete()

    expect(spy).toBeCalled()
    // expect(notify.notify).toBeCalledWith('success')
    expect(notify.toast.success).toBeCalled()
  })

  it('Save chosen maintainer', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repositoryMaintainersStore,
      'getPage'
    )

    repositoryMaintainersStore.getPage()
    repositoryMaintainersStore.chosenMaintainer =
      repositoryMaintainers.data.content[2]

    await repositoryMaintainersStore.patch({
      id: repositoryMaintainers.data.content[2].id
    })

    expect(spy).toBeCalled()
  })
})

describe('Repository Maintainers Store requests with failing backend', () => {
  beforeAll(() => {
    failingServer.listen()
  })

  beforeEach(async () => {
    setActivePinia(createPinia())
    failingServer.resetHandlers()
    const authorizationStore = useAuthorizationStore()
    await authorizationStore.getUserInfo()
  })

  afterAll(() => {
    failingServer.close()
  })

  it('Fetch maintainers', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.getPage()
    expect(
      repositoryMaintainersStore.maintainers
    ).toStrictEqual([])
  })

  it('Fetch repositories', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.getRepositories()

    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
  })

  it('Fetch packages', async () => {
    const repositoryMaintainersStore =
      useRepositoryMaintainersStore()

    await repositoryMaintainersStore.getRepositories()

    expect(
      repositoryMaintainersStore.repositories
    ).toStrictEqual([])
  })
})

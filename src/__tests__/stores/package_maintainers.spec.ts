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

const defaultFiltration = {
  deleted: undefined,
  technologies: undefined
}

const randomFiltration = {
  deleted: true,
  technologies: ['Python', 'R']
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

  afterAll(() => {
    server.close()
  })

  it('Starting values', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    expect(
      package_maintainers_store.maintainers
    ).toStrictEqual([])
    expect(
      package_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
    expect(
      package_maintainers_store.repositories
    ).toStrictEqual([])
    expect(
      package_maintainers_store.packages
    ).toStrictEqual([])
    expect(
      package_maintainers_store.chosenMaintainer
    ).toStrictEqual({})
  })

  it('Edit filtration', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      package_maintainers_store,
      'fetchMaintainers'
    )
    expect(spy).toHaveBeenCalledTimes(0)
    package_maintainers_store.setFiltration(
      randomFiltration
    )
    expect(
      package_maintainers_store.filtration
    ).toStrictEqual(randomFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()

    package_maintainers_store.filtration = randomFiltration
    package_maintainers_store.clearFiltration()
    expect(
      package_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
  })

  it('Clear filtration and fetch', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      package_maintainers_store,
      'fetchMaintainers'
    )

    expect(spy).toHaveBeenCalledTimes(0)
    package_maintainers_store.filtration = randomFiltration
    package_maintainers_store.clearFiltrationAndFetch()
    expect(
      package_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Set chosen maintainer without changes', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      package_maintainers_store,
      'saveMaintainer'
    )
    package_maintainers_store.maintainers =
      packageMaintainers.data.content

    expect(spy).toHaveBeenCalledTimes(0)

    package_maintainers_store.setChosenMaintainer(
      packageMaintainers.data.content[3]
    )

    expect(
      package_maintainers_store.maintainers[3]
    ).toStrictEqual(packageMaintainers.data.content[3])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Set chosen maintainer with changes', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    const spy = vi.spyOn(
      package_maintainers_store,
      'saveMaintainer'
    )
    package_maintainers_store.maintainers =
      packageMaintainers.data.content

    const changedMaintainer =
      packageMaintainers.data.content[3]
    changedMaintainer.deleted = !changedMaintainer.deleted
    expect(spy).toHaveBeenCalledTimes(0)

    package_maintainers_store.setChosenMaintainer(
      changedMaintainer
    )

    expect(
      package_maintainers_store.maintainers[3]
    ).toStrictEqual(changedMaintainer)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Fetch maintainers', async () => {
    const package_maintainers_store =
      usePackageMaintainersStore()

    await package_maintainers_store.fetchMaintainers()

    expect(
      package_maintainers_store.maintainers
    ).toStrictEqual(packageMaintainers.data.content)
  })

  it('Fetch repositories', async () => {
    const package_maintainers_store =
      usePackageMaintainersStore()

    await package_maintainers_store.fetchRepositories()

    expect(
      package_maintainers_store.repositories
    ).toStrictEqual(repositories.data.content)
  })

  it('Fetch packages', async () => {
    const package_maintainers_store =
      usePackageMaintainersStore()

    await package_maintainers_store.fetchPackages()

    expect(
      package_maintainers_store.packages
    ).toStrictEqual(packages.data.content)
  })

  it('Delete chosen maintainer', () => {
    const package_maintainers_store =
      usePackageMaintainersStore()
    package_maintainers_store.fetchMaintainers()
    package_maintainers_store.setChosenMaintainer(
      packageMaintainers.data.content[2]
    )
  })
})

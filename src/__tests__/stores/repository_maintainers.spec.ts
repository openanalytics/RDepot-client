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
import { i18n } from '@/plugins/i18n'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { usePaginationStore } from '@/store/pagination'
import { Technologies } from '@/enum/Technologies'

const defaultFiltration = {
  deleted: false,
  technologies: undefined
}

const randomFiltration = {
  deleted: true,
  technologies: [
    Technologies.enum.Python,
    Technologies.enum.R
  ]
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
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    expect(
      repository_maintainers_store.maintainers
    ).toStrictEqual([])
    expect(
      repository_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
    expect(
      repository_maintainers_store.repositories
    ).toStrictEqual([])
    expect(
      repository_maintainers_store.repositories
    ).toStrictEqual([])
    expect(
      repository_maintainers_store.chosenMaintainer
    ).toStrictEqual({})
  })

  it('Edit filtration', () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    const pagination_store = usePaginationStore()
    const spy = vi.spyOn(
      repository_maintainers_store,
      'fetchMaintainers'
    )
    pagination_store.page = 2

    expect(spy).toHaveBeenCalledTimes(0)
    repository_maintainers_store.setFiltration(
      randomFiltration
    )

    expect(pagination_store.page).toBe(0)
    expect(
      repository_maintainers_store.filtration
    ).toStrictEqual(randomFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Clear filtration', () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    const pagination_store = usePaginationStore()
    pagination_store.page = 2

    repository_maintainers_store.filtration =
      randomFiltration
    repository_maintainers_store.clearFiltration()
    expect(pagination_store.page).toBe(0)
    expect(
      repository_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
  })

  it('Clear filtration and fetch', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    const pagination_store = usePaginationStore()
    const spy = vi.spyOn(
      repository_maintainers_store,
      'fetchMaintainers'
    )

    repository_maintainers_store.filtration =
      randomFiltration
    pagination_store.page = 2

    await repository_maintainers_store.clearFiltrationAndFetch()

    expect(pagination_store.page).toBe(0)
    expect(
      repository_maintainers_store.filtration
    ).toStrictEqual(defaultFiltration)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(
      repository_maintainers_store.maintainers
    ).toStrictEqual(repositoryMaintainers.data.content)
  })

  it('Set chosen maintainer without changes', () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    repository_maintainers_store.maintainers =
      repositoryMaintainers.data.content

    repository_maintainers_store.setChosenMaintainer(
      repositoryMaintainers.data.content[3]
    )

    expect(
      repository_maintainers_store.maintainers[3]
    ).toStrictEqual(repositoryMaintainers.data.content[3])
  })

  it('Set chosen maintainer with changes', () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    repository_maintainers_store.maintainers =
      repositoryMaintainers.data.content

    const changedMaintainer =
      repositoryMaintainers.data.content[3]
    changedMaintainer.deleted = !changedMaintainer.deleted

    repository_maintainers_store.setChosenMaintainer(
      changedMaintainer
    )

    expect(
      repository_maintainers_store.maintainers[3]
    ).toStrictEqual(changedMaintainer)
  })

  it('Fetch maintainers', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    await repository_maintainers_store.fetchMaintainers()

    expect(
      repository_maintainers_store.maintainers
    ).toStrictEqual(repositoryMaintainers.data.content)
  })

  it('Fetch repositories', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    await repository_maintainers_store.fetchRepositories()

    expect(
      repository_maintainers_store.repositories
    ).toStrictEqual(repositories.data.content)
  })

  it('Delete chosen maintainer', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    vi.mock('@kyvg/vue3-notification')
    const notify = await import('@kyvg/vue3-notification')
    const spy = vi.spyOn(
      repository_maintainers_store,
      'fetchMaintainers'
    )

    repository_maintainers_store.fetchMaintainers()
    repository_maintainers_store.setChosenMaintainer(
      repositoryMaintainers.data.content[2]
    )

    await repository_maintainers_store.deleteMaintainer()

    expect(spy).toBeCalled()
    expect(notify.notify).toBeCalledWith({
      type: 'success',
      text: i18n.t(
        'notifications.successDeletePackageManager',
        repository_maintainers_store.chosenMaintainer.user
          ?.name || ''
      )
    })
  })

  it('Save chosen maintainer', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()
    const spy = vi.spyOn(
      repository_maintainers_store,
      'fetchMaintainers'
    )

    repository_maintainers_store.fetchMaintainers()
    repository_maintainers_store.setChosenMaintainer(
      repositoryMaintainers.data.content[2]
    )
    const newMaintainer =
      repositoryMaintainers.data.content[3]
    newMaintainer.id =
      repositoryMaintainers.data.content[2].id
    await repository_maintainers_store.saveMaintainer(
      newMaintainer
    )

    expect(spy).toBeCalled()
  })
})

const failing_server = setupServer(
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
    failing_server.listen()
  })

  beforeEach(() => {
    setActivePinia(createPinia())
    failing_server.resetHandlers()
  })

  afterAll(() => {
    failing_server.close()
  })

  it('Fetch maintainers', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    await repository_maintainers_store.fetchMaintainers()

    expect(
      repository_maintainers_store.maintainers
    ).toStrictEqual([])
  })

  it('Fetch repositories', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    await repository_maintainers_store.fetchRepositories()

    expect(
      repository_maintainers_store.repositories
    ).toStrictEqual([])
  })

  it('Fetch packages', async () => {
    const repository_maintainers_store =
      useRepositoryMaintainersStore()

    await repository_maintainers_store.fetchRepositories()

    expect(
      repository_maintainers_store.repositories
    ).toStrictEqual([])
  })
})

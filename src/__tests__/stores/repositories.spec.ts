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
import { useRepositoryStore } from '@/store/repositories'

const defaultFiltration = {
  name: undefined,
  technologies: undefined,
  deleted: undefined
}

const randomFiltration = {
  name: 'Test',
  technologies: ['R'],
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
    expect(repositories_store.chosenRepository).toBe(-1)
    expect(repositories_store.chosenRepositoryName).toBe('')
    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(
      repositories_store.repositoryPackages
    ).toStrictEqual([])
  })

  it('Fetch repositories', async () => {
    const repositories_store = useRepositoryStore()

    await repositories_store.fetchRepositories()

    expect(repositories_store.repositories).toStrictEqual(
      repositories.data.content
    )
  })

  it('Fetch packages', async () => {
    const repositories_store = useRepositoryStore()
    repositories_store.chosenRepositoryName =
      repositories.data.content[0].name

    await repositories_store.fetchPackages()

    expect(
      repositories_store.repositoryPackages
    ).toStrictEqual(packages.data.content)
  })

  it('Edit filtration', () => {
    const repositories_store = useRepositoryStore()
    const spy = vi.spyOn(
      repositories_store,
      'fetchRepositories'
    )

    repositories_store.setFiltration(randomFiltration)

    expect(repositories_store.filtration).toStrictEqual(
      randomFiltration
    )
    expect(spy).toHaveBeenCalled()
  })

  it('Clear filtration', () => {
    const repositories_store = useRepositoryStore()

    repositories_store.filtration = randomFiltration
    repositories_store.clearFiltration()

    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch events', () => {
    const repositories_store = useRepositoryStore()
    const spy = vi.spyOn(
      repositories_store,
      'fetchRepositories'
    )

    repositories_store.filtration = randomFiltration
    repositories_store.clearFiltrationAndFetch()

    expect(repositories_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toHaveBeenCalled()
  })
})

import { setActivePinia, createPinia } from 'pinia'
import { useSubmissionStore } from '@/store/submission'
import {
  describe,
  beforeEach,
  it,
  expect,
  afterAll,
  vi,
  afterEach
} from 'vitest'
import {
  EntityModelPackageDto,
  EntityModelRepositoryDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import packages from '@/__tests__/config/mockData/packages.json'
import submissions from '@/__tests__/config/mockData/submissions.json'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

var files = [
  {
    name: 'A3_1.0.0.tar.gz',
    type: 'application/gzip'
  } as File
]

const defaultFiltration = {
  package: undefined,
  state: undefined,
  assignedToMe: undefined
}

const randomFiltration = {
  package: packages.data
    .content[0] as EntityModelPackageDto,
  state: 'ACCEPTED',
  assignedToMe: true
}

const server = setupServer(
  rest.get(
    'http://localhost:8017/api/v2/manager/r/submissions',
    (_, res, ctx) => {
      return res(ctx.json(submissions))
    }
  ),
  rest.patch(
    'http://localhost:8017/api/v2/manager/r/submissions/:submission_id',
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: submissions.data.content.find(
            (elem) =>
              elem.id.toString() ===
              req.params.submission_id
          )
        })
      )
    }
  )
)

describe('Submissions Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.listen()
  })

  afterAll(() => server.close())

  it('Initial store state', () => {
    const submission_store = useSubmissionStore()

    expect(submission_store.packages).toStrictEqual([])
    expect(submission_store.submissions).toStrictEqual([])
    expect(submission_store.repository).toBeUndefined()
    expect(submission_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration', () => {
    const submission_store = useSubmissionStore()
    submission_store.filtration = randomFiltration

    submission_store.clearFiltration()

    expect(submission_store.filtration).toStrictEqual(
      defaultFiltration
    )
  })

  it('Clear filtration and fetch', async () => {
    const submission_store = useSubmissionStore()
    const spy = vi.spyOn(
      submission_store,
      'fetchSubmissions'
    )
    submission_store.filtration = randomFiltration

    await submission_store.clearFiltrationAndFetch()

    expect(submission_store.filtration).toStrictEqual(
      defaultFiltration
    )
    expect(spy).toBeCalled()
    expect(submission_store.submissions).toStrictEqual(
      submissions.data.content
    )
  })

  it('Set filtration', () => {
    const submission_store = useSubmissionStore()

    submission_store.setFiltration(randomFiltration)

    expect(submission_store.filtration).toStrictEqual(
      randomFiltration
    )
  })

  it('Set packages', () => {
    const submission_store = useSubmissionStore()

    submission_store.setPackages(files)

    expect(submission_store.packages).toStrictEqual(files)
  })

  it('Add package', () => {
    const submission_store = useSubmissionStore()

    submission_store.addPackage(files[0])

    expect(submission_store.packages).toStrictEqual(files)
  })

  it('Add packages', () => {
    const submission_store = useSubmissionStore()

    submission_store.addPackages(files)

    expect(submission_store.packages).toStrictEqual(files)
  })

  it('Set a repository', () => {
    const submission_store = useSubmissionStore()
    const repository: EntityModelRepositoryDto =
      packages.data.content[0].repository

    submission_store.setRepository(repository)

    expect(submission_store.repository).toMatchObject(
      repository
    )
  })

  it('Fetch submissiosn', async () => {
    const submission_store = useSubmissionStore()

    await submission_store.fetchSubmissions()

    expect(submission_store.submissions).toStrictEqual(
      submissions.data.content
    )
  })

  it('Update submissiosn', async () => {
    const submission_store = useSubmissionStore()
    const spy = vi.spyOn(
      submission_store,
      'fetchSubmissions'
    )

    await submission_store.updateSubmission(
      submissions.data.content[0].id,
      'CANCELED',
      'Test'
    )

    expect(spy).toBeCalled()
    expect(submission_store.submissions).toStrictEqual(
      submissions.data.content
    )
  })
})

const failing_server = setupServer(
  rest.get('', (_, res, ctx) => {
    return res(ctx.status(403))
  })
)

describe('Testing submissions store with failing backend', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    server.listen()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => server.close())

  it('Fetch submissiosn', async () => {
    const submission_store = useSubmissionStore()

    vi.mock('@kyvg/vue3-notification')
    const { notify } = await import(
      '@kyvg/vue3-notification'
    )

    await submission_store.fetchSubmissions()

    expect(submission_store.submissions).toStrictEqual([])
    expect(notify).toBeCalled()
  })

  it('Update submissiosn', async () => {
    const submission_store = useSubmissionStore()
    const spy = vi.spyOn(
      submission_store,
      'fetchSubmissions'
    )

    vi.mock('@kyvg/vue3-notification')
    const { notify } = await import(
      '@kyvg/vue3-notification'
    )

    await submission_store.updateSubmission(
      submissions.data.content[0].id,
      'CANCELED',
      'Test'
    )

    expect(spy).toBeCalledTimes(0)
    expect(notify).toBeCalled()
    expect(submission_store.submissions).toStrictEqual([])
  })
})

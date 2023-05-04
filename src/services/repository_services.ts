import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  EntityModelRepositoryDto,
  PythonRepositoryControllerApiFactory,
  PythonRepositoryDto,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RRepositoryControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { Technologies } from '@/enum/Technologies'
import { i18n } from '@/plugins/i18n'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { useSortStore } from '@/store/sort'
import { AxiosResponse } from 'axios'
import { repositorySchema } from '@/models/Schemas'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'

export function fetchRepositoriesServices(
  filtration?: RepositoriesFiltration,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelRepositoryDto>> {
  if (!isAuthorized('GET', 'repositories')) {
    return new Promise(() => validateRequest)
  }
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  const sort = useSortStore()

  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_api.getAllRepositories,
    [
      filtration?.deleted,
      filtration?.name,
      filtration?.technologies,
      page,
      pageSize,
      sort.getSortBy()
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest()
    }
  )
}

export function fetchRepositoriesServicesNoLoading(
  filtration?: RepositoriesFiltration,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelRepositoryDto>> {
  if (!isAuthorized('GET', 'repositories')) {
    return new Promise(() => validateRequest)
  }
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  const sort = useSortStore()

  return repository_api
    .getAllRepositories(
      filtration?.deleted,
      filtration?.name,
      filtration?.technologies,
      page,
      pageSize,
      sort.getSortBy()
    )
    .then(
      (res) =>
        validateRequest(
          res.data.data?.content,
          res.data.data?.page
        ),
      (msg) => {
        notify({ type: 'error', text: msg })
        return validateRequest()
      }
    )
}

export function fetchRRepositories(): Promise<
  validatedData<EntityModelRepositoryDto>
> {
  if (!isAuthorized('GET', 'repositories')) {
    return new Promise(() => validateRequest)
  }
  const r_repository_api = RRepositoryControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelRRepositoryDto>(
    r_repository_api.getAllRRepositories
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest()
    }
  )
}

export function createRepository(
  newRepository: EntityModelRepositoryDto
): Promise<boolean> {
  if (!isAuthorized('POST', 'repository')) {
    return new Promise(() => false)
  }
  const validatedRepository =
    repositorySchema.safeParse(newRepository)
  if (validatedRepository.success) {
    const { technology, ...repository } =
      validatedRepository.data
    let request
    if (technology === Technologies.enum.R) {
      const repository_api =
        RRepositoryControllerApiFactory(getConfiguration())
      request =
        openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
          repository_api.createRRepository,
          [repository]
        )
    } else {
      const repository_api =
        PythonRepositoryControllerApiFactory(
          getConfiguration()
        )
      request =
        openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
          repository_api.createPythonRepository,
          [repository as PythonRepositoryDto]
        )
    }
    return request.then(
      () => {
        notify({
          type: 'success',
          text: i18n.t(
            'notifications.successCreateRepository',
            newRepository.name || ''
          )
        })
        return true
      },
      (msg) => {
        notify({ type: 'error', text: msg })
        return false
      }
    )
  } else {
    notify({
      type: 'error',
      text: validatedRepository.error.message
    })
    return new Promise(() => false)
  }
}

export function updateRepository(
  oldRepository: EntityModelRepositoryDto,
  newRepository: EntityModelRepositoryDto
) {
  if (!isAuthorized('PATCH', 'repository')) {
    return new Promise(() => false)
  }

  const patchBody = createPatch(
    oldRepository,
    newRepository
  )

  if (oldRepository.technology === Technologies.enum.R) {
    const repository_api = RRepositoryControllerApiFactory(
      getConfiguration()
    )
    return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
      repository_api.updateRRepository,
      [patchBody, newRepository]
    ).then(
      () => true,
      (msg) => {
        notify({ text: msg, type: 'error' })
        return false
      }
    )
  } else if (
    oldRepository.technology === Technologies.enum.Python
  ) {
    const repository_api =
      PythonRepositoryControllerApiFactory(
        getConfiguration()
      )
    return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
      repository_api.updatePythonRepository,
      [patchBody, newRepository]
    ).then(
      () => true,
      (msg) => {
        notify({ text: msg, type: 'error' })
        return false
      }
    )
  } else {
    throw new Error(
      'Technologies not supported ' +
        oldRepository.technology
    )
  }
}

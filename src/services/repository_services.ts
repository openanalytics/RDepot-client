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
import { TechnologiesEnum } from '@/enum/Technologies'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import {
  openApiRequest,
  validateRequest
} from './open_api_access'

export function fetchRepositoriesServices(
  filtration?: RepositoriesFiltration,
  page?: number,
  pageSize?: number
) {
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_api.getAllRepositories,
    [
      filtration?.deleted,
      filtration?.name,
      filtration?.technologies,
      page,
      pageSize
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest<EntityModelRepositoryDto>()
    }
  )
}

export function fetchRRepositories() {
  const r_repository_api = RRepositoryControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelRRepositoryDto>(
    r_repository_api.getAllRRepositories
  )
}

export function createRepository(
  newRepository: EntityModelRepositoryDto
) {
  const { technology, ...repository } = newRepository
  if (technology && technology in TechnologiesEnum) {
    let request
    if (technology === TechnologiesEnum.R) {
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
      text: `Invalid technology '${newRepository.technology}'`
    })
    return new Promise<boolean>(() => false)
  }
}

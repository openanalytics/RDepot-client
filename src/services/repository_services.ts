import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  EntityModelRepositoryDto,
  PythonRepositoryControllerApiFactory,
  PythonRepositoryDto,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RRepositoryControllerApiFactory,
  RRepositoryDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'
import { TechnologiesEnum } from '@/enum/Technologies'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'

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
      filtration?.technology,
      page,
      pageSize
    ]
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
  if (newRepository.technology === TechnologiesEnum.R) {
    const repository_api = RRepositoryControllerApiFactory(
      getConfiguration()
    )
    return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
      repository_api.createRRepository,
      [newRepository as RRepositoryDto]
    ).then(
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
  } else if (
    newRepository.technology === TechnologiesEnum.Python
  ) {
    const repository_api =
      PythonRepositoryControllerApiFactory(
        getConfiguration()
      )
    return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
      repository_api.createPythonRepository,
      [newRepository as PythonRepositoryDto]
    ).then(
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

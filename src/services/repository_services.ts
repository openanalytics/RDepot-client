import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RRepositoryControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchRepositoriesServices(
  filtration: RepositoriesFiltration,
  page?: number,
  pageSize?: number
) {
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_api.getAllRepositories,
    [
      filtration.deleted,
      filtration.name,
      filtration.technology,
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

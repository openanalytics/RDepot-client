import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  ResponseDtoEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RRepositoryControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'
import { preparePatchBody } from './patchBody'

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

export function updateRRepository(
  id: number,
  fields: Map<string, any>
) {
  const r_repository_api = RRepositoryControllerApiFactory(
    getConfiguration()
  )
  const patch = preparePatchBody(fields)
  return openApiRequest<ResponseDtoEntityModelRepositoryDto>(
    r_repository_api.updateRRepository,
    [patch, id]
  )
}

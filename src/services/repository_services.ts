import {
  ApiV2RepositoryControllerApiFactory,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRRepositoryDto,
  RRepositoryControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchRepositoriesServices() {
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_api.getAllRepositories
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

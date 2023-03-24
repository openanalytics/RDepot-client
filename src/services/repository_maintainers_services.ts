import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  ResponseDtoPagedModelEntityModelRepositoryDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchRepositoryMaintainersServices() {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_maintainers_api.getAllRepositoryMaintainers
  )
}

export function updateRepositoryMaintainer(
  maintainer_id: number,
  repository_id: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  const patch = [
    {
      op: 'replace',
      path: '/repository/id',
      value: repository_id
    }
  ]
  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.updateRepositoryMaintainer,
    [patch, maintainer_id]
  )
}

export function deletedRepositoryMaintainer(
  maintainer_id: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.deleteRepositoryMaintainer,
    [maintainer_id]
  )
}

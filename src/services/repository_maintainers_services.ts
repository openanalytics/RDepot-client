import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  ResponseDtoPagedModelEntityModelRepositoryDto,
  ResponseDtoPagedModelEntityModelRepositoryMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'
import { preparePatchBody } from './patchBody'

export function fetchRepositoryMaintainersServices(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>(
    repository_maintainers_api.getAllRepositoryMaintainers,
    [
      filtration.deleted,
      filtration.technologies,
      page,
      pageSize
    ]
  )
}

export function updateRepositoryMaintainer(
  maintainer_id: number,
  fields: Map<string, any>
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  const patch = preparePatchBody(fields)
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

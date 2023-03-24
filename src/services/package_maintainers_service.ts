import { MaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2PackageMaintainerControllerApiFactory,
  ResponseDtoPagedModelEntityModelPackageMaintainerDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchPackageMaintainersService(
  filtration: MaintainersFiltration,
  page: number,
  pageSize: number
) {
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageMaintainerDto>(
    package_maintainers_api.getAllPackageMaintainers,
    [
      filtration.deleted,
      undefined, // TODO: use technology (maybe even technologies) as a filter,
      page,
      pageSize
    ]
  )
}

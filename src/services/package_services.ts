import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  ResponseDtoPagedModelEntityModelPackageDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchPackagesServices(
  filtration: PackagesFiltration,
  page?: number,
  pageSize?: number
) {
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageDto>(
    () =>
      packages_api.getAllPackages(
        filtration.repository,
        filtration.deleted,
        filtration.state,
        filtration.technology,
        page,
        pageSize
      )
  )
}

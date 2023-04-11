import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoPagedModelEntityModelPackageDto,
  RPackageControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'
import { preparePatchBody } from './patchBody'

export function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number
) {
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageDto>(
    packages_api.getAllPackages,
    [
      filtration?.repository,
      filtration?.deleted,
      filtration?.state,
      filtration?.technology,
      page,
      pageSize
    ]
  )
}

export function fetchPackagesWithoutProgressControl(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number
) {
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return packages_api.getAllPackages(
    filtration?.repository,
    filtration?.deleted,
    filtration?.state,
    filtration?.technology,
    page,
    pageSize
  )
}

export function fetchPackageServices(id: number) {
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoEntityModelPackageDto>(
    packages_api.getPackageById,
    [id]
  )
}

export function updateRPackage(
  id: number,
  fields: Map<string, any>
) {
  const packages_api = RPackageControllerApiFactory(
    getConfiguration()
  )
  const patch = preparePatchBody(fields)
  return openApiRequest<ResponseDtoEntityModelPackageDto>(
    packages_api.updatePackage,
    [patch, id]
  )
}

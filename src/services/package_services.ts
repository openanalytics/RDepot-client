import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoPagedModelEntityModelPackageDto,
  RPackageControllerApiFactory
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

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
  fieldName: string,
  value: any
) {
  const packages_api = RPackageControllerApiFactory(
    getConfiguration()
  )
  const patch = [
    {
      op: 'replace',
      path: '/' + fieldName,
      value: value
    }
  ]
  return openApiRequest<ResponseDtoEntityModelPackageDto>(
    packages_api.updatePackage,
    [patch, id]
  )
}

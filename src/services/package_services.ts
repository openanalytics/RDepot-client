import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  Link,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoPagedModelEntityModelPackageDto,
  RPackageControllerApiFactory
} from '@/openapi'
import { checkIfAuthorized } from '@/plugins/casl'
import { getConfiguration } from '@/services/api_config'
import {
  openApiRequest,
  Pagination,
  validateRequest
} from '@/services/open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'

export function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number
): Promise<[EntityModelPackageDto[], Pagination, Link[]]> {
  const authorized = checkIfAuthorized('GET', 'packages')
  if (!authorized) {
    return new Promise(() =>
      validateRequest<EntityModelPackageDto>()
    )
  }
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageDto>(
    packages_api.getAllPackages,
    [
      filtration?.repository,
      filtration?.deleted,
      filtration?.state,
      filtration?.technologies,
      page,
      pageSize
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest()
    }
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
    filtration?.technologies,
    page,
    pageSize
  )
}

export function fetchPackageServices(
  id: number
): Promise<EntityModelPackageDto | undefined> {
  const authorized = checkIfAuthorized('GET', 'packages')
  if (!authorized) {
    return new Promise(() => {})
  }
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoEntityModelPackageDto>(
    packages_api.getPackageById,
    [id]
  ).then(
    (res) => res.data.data,
    (msg) => {
      notify({ text: msg, type: 'error' })
      return {}
    }
  )
}

export function updateRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
): Promise<boolean> {
  const authorized = checkIfAuthorized('PATCH', 'r package')
  if (!authorized) {
    return new Promise(() => false)
  }
  const packages_api = RPackageControllerApiFactory(
    getConfiguration()
  )
  const patch = createPatch(oldPackage, newPackage)

  return openApiRequest<ResponseDtoEntityModelPackageDto>(
    packages_api.updatePackage,
    [patch, oldPackage.id]
  ).then(
    () => true,
    (msg) => {
      notify({ text: msg, type: 'error' })
      return false
    }
  )
}

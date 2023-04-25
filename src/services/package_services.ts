import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoPagedModelEntityModelPackageDto,
  RPackageControllerApiFactory
} from '@/openapi'
import { getConfiguration } from '@/services/api_config'
import {
  openApiRequest,
  validateRequest
} from '@/services/open_api_access'
import { useSortStore } from '@/store/sort'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'

export function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number
) {
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  const sort = useSortStore()
  var sortBy = sort.field + ',' + sort.direction
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageDto>(
    packages_api.getAllPackages,
    [
      filtration?.repository,
      filtration?.deleted,
      filtration?.state,
      filtration?.technologies,
      page,
      pageSize,
      sortBy
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest<EntityModelPackageDto>()
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
  const sort = ['name,asc']
  return packages_api.getAllPackages(
    filtration?.repository,
    filtration?.deleted,
    filtration?.state,
    filtration?.technologies,
    page,
    pageSize,
    sort
  )
}

export function fetchPackageServices(id: number) {
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
      return {} as EntityModelPackageDto
    }
  )
}

export function updateRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
) {
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

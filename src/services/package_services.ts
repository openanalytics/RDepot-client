import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoPagedModelEntityModelPackageDto,
  RPackageControllerApiFactory
} from '@/openapi'
import { isAuthorized } from '@/plugins/casl'
import { getConfiguration } from '@/services/api_config'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from '@/services/open_api_access'
import { useSortStore } from '@/store/sort'
import { notify } from '@kyvg/vue3-notification'
import { createPatch } from 'rfc6902'

export function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelPackageDto>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() =>
      validateRequest<EntityModelPackageDto>()
    )
  }
  const packages_api = ApiV2PackageControllerApiFactory(
    getConfiguration()
  )
  const sort = useSortStore()
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageDto>(
    packages_api.getAllPackages,
    [
      filtration?.repository,
      filtration?.deleted,
      filtration?.state,
      filtration?.technologies,
      page,
      pageSize,
      sort.getSortBy()
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
): Promise<validatedData<EntityModelPackageDto>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => validateRequest())
  }
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
  ).then(
    (res) => {
      return validateRequest(
        res.data.data?.content,
        res.data.data?.page
      )
    },
    (msg) => {
      notify({ type: 'error', text: msg })
      return validateRequest()
    }
  )
}

export function fetchPackageServices(
  id: number
): Promise<EntityModelPackageDto | undefined> {
  if (!isAuthorized('GET', 'packages')) {
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
  if (!isAuthorized('PATCH', 'package')) {
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
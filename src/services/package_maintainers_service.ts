import { PackageMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2PackageMaintainerControllerApiFactory,
  EntityModelPackageMaintainerDto,
  PackageMaintainerDto,
  ResponseDtoPagedModelEntityModelPackageMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from '@/services/api_config'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from '@/services/open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'

export function fetchPackageMaintainersService(
  filtration?: PackageMaintainersFiltration,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelPackageMaintainerDto>> {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest())
  }
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  const sort = useSortStore()
  var sortBy = sort.getSortBy()
  if (sort.field == 'name') {
    sortBy = 'user,' + sort.direction
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageMaintainerDto>(
    package_maintainers_api.getAllPackageMaintainers,
    [
      filtration?.deleted,
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
      return validateRequest()
    }
  )
}

export function deletePackageMaintainerService(
  maintainer: EntityModelPackageMaintainerDto
): Promise<boolean> {
  if (!isAuthorized('DELETE', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.deletePackageMaintainer,
    [maintainer.id]
  ).then(
    () => {
      notify({
        type: 'success',
        text: i18n.t(
          'notifications.successDeletePackageManager',
          maintainer.user?.name || ''
        )
      })
      return true
    },
    (msg) => {
      notify({ type: 'error', text: msg })
      return false
    }
  )
}

export function updatePackageMaintainerService(
  oldMaintainer: PackageMaintainerDto,
  newMaintainer: PackageMaintainerDto
): Promise<boolean> {
  if (!isAuthorized('PATCH', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )

  let patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.updatePackageMaintainer,
    [patch, oldMaintainer.id]
  ).then(
    () => {
      notify({
        type: 'success',
        text: i18n.t(
          'notifications.successUpdatePackageManager',
          newMaintainer.user?.name || ''
        )
      })
      return true
    },
    (msg) => {
      notify({ type: 'error', text: msg })
      return false
    }
  )
}
import { MaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2PackageMaintainerControllerApiFactory,
  PackageMaintainerDto,
  ResponseDtoPagedModelEntityModelPackageMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchPackageMaintainersService(
  filtration?: MaintainersFiltration,
  page?: number,
  pageSize?: number
) {
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageMaintainerDto>(
    package_maintainers_api.getAllPackageMaintainers,
    [
      filtration?.deleted,
      filtration?.technology.length
        ? [filtration?.technology]
        : undefined,
      page,
      pageSize
    ]
  )
}

export function deletePackageMaintainerService(
  maintainer_id: number
) {
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.deletePackageMaintainer,
    [maintainer_id]
  )
}

export function patchPackageMaintainerService(
  newMaintainer: PackageMaintainerDto,
  oldMaintainer: PackageMaintainerDto
) {
  const package_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )

  let patch = []
  if (
    newMaintainer.packageName !== oldMaintainer.packageName
  ) {
    patch.push({
      op: 'replace',
      path: '/packageName',
      value: newMaintainer.packageName
    })
  }

  if (
    newMaintainer.repository?.id !==
    oldMaintainer.repository?.id
  ) {
    patch.push({
      op: 'replace',
      path: '/repository',
      value: newMaintainer.repository
    })
  }
  console.log(patch)
  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.updatePackageMaintainer,
    [patch, oldMaintainer.id]
  )
}

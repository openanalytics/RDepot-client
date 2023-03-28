import { PackageMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2PackageMaintainerControllerApiFactory,
  PackageMaintainerDto,
  ResponseDtoPagedModelEntityModelPackageMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchPackageMaintainersService(
  filtration?: PackageMaintainersFiltration,
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
      filtration?.technologies,
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

export function updatePackageMaintainerService(
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
      path: '/repository/id',
      value: newMaintainer.repository?.id
    })
  }

  if (newMaintainer.deleted !== oldMaintainer.deleted) {
    patch.push({
      op: 'replace',
      path: '/deleted',
      value: newMaintainer.deleted
    })
  }
  console.log(patch)
  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.updatePackageMaintainer,
    [patch, oldMaintainer.id]
  )
}

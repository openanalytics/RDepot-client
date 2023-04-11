import { PackageMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2PackageMaintainerControllerApiFactory,
  PackageMaintainerDto,
  ResponseDtoPagedModelEntityModelPackageMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from '@/services/api_config'
import { openApiRequest } from '@/services/open_api_access'
import { preparePatchBody } from './patchBody'

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

export function updatePackageMaintainer(
  maintainer_id: number,
  fields: Map<string, any>
) {
  const repository_maintainers_api =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  const patch = preparePatchBody(fields)
  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.updatePackageMaintainer,
    [patch, maintainer_id]
  )
}

//to check - if we will update the maintainer, or maybe we will just upload new one and replace it with POST
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
  return openApiRequest<AxiosResponse<any>>(
    package_maintainers_api.updatePackageMaintainer,
    [patch, oldMaintainer.id]
  )
}

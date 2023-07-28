/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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
  const packageMaintainersApi =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  const sort = useSortStore()
  let sortBy = sort.getSortBy()
  if (sort.field == 'name') {
    sortBy = ['user,' + sort.direction]
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelPackageMaintainerDto>(
    packageMaintainersApi.getAllPackageMaintainers,
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
  const packageMaintainersApi =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    packageMaintainersApi.deletePackageMaintainer,
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
  const packageMaintainersApi =
    ApiV2PackageMaintainerControllerApiFactory(
      getConfiguration()
    )

  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<AxiosResponse<any>>(
    packageMaintainersApi.updatePackageMaintainer,
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

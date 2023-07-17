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

import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelRPackageDto,
  ResponseDtoEntityModelPackageDto,
  ResponseDtoEntityModelRPackageDto,
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
  pageSize?: number,
  showProgress = true
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
    ],
    showProgress
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

export function fetchPackageServices(
  id: number
): Promise<EntityModelPackageDto> {
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
    (res) => res.data.data || {},
    (msg) => {
      notify({ text: msg, type: 'error' })
      return {}
    }
  )
}

export function fetchRPackageServices(
  id: number
): Promise<EntityModelRPackageDto> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  const packages_api = RPackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<ResponseDtoEntityModelRPackageDto>(
    packages_api.getRPackageById,
    [id]
  ).then(
    (res) => res.data.data || {},
    (msg) => {
      notify({ text: msg, type: 'error' })
      return {}
    }
  )
}
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

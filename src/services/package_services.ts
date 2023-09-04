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
  RPackageControllerApiFactory
} from '@/openapi'
import { isAuthorized } from '@/plugins/casl'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from '@/services/open_api_access'
import { useSortStore } from '@/store/sort'
import { createPatch } from 'rfc6902'

export function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number,
  showProgress = true
): Promise<validatedData<EntityModelPackageDto[]>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => validateRequest)
  }
  const sort = useSortStore()
  return openApiRequest<EntityModelPackageDto[]>(
    ApiV2PackageControllerApiFactory().getAllPackages,
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
  )
}

export function fetchPackageServices(
  id: number
): Promise<validatedData<EntityModelPackageDto>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<EntityModelPackageDto>(
    ApiV2PackageControllerApiFactory().getPackageById,
    [id]
  )
}

export function updateRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
): Promise<validatedData<EntityModelPackageDto>> {
  if (!isAuthorized('PATCH', 'package')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldPackage, newPackage)

  return openApiRequest<EntityModelPackageDto>(
    RPackageControllerApiFactory().updatePackage,
    [patch, oldPackage.id]
  )
}

export function downloadReferenceManual(id: string) {
  const packagesApi = RPackageControllerApiFactory(
    getConfiguration()
  )
  return openApiRequest<Promise<boolean>>(
    packagesApi.downloadReferenceManual,
    [id]
  )
}

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
  PackageMaintainerDto
} from '@/openapi'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from '@/services/open_api_access'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'

export async function fetchPackageMaintainersService(
  filtration?: PackageMaintainersFiltration,
  page?: number,
  pageSize?: number
): Promise<
  validatedData<EntityModelPackageMaintainerDto[]>
> {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest)
  }
  const sort = useSortStore()
  const sortBy = sort.getSortBy()
  console.log(filtration)
  return openApiRequest<EntityModelPackageMaintainerDto[]>(
    ApiV2PackageMaintainerControllerApiFactory()
      .getAllPackageMaintainers,
    [
      page,
      pageSize,
      sortBy,
      filtration?.deleted,
      filtration?.technologies,
      filtration?.repository,
      filtration?.search
    ]
  )
}

export async function fetchAllPackageMaintainers(): Promise<
  validatedData<EntityModelPackageMaintainerDto[]>
> {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest)
  }
  return openApiRequest<EntityModelPackageMaintainerDto[]>(
    ApiV2PackageMaintainerControllerApiFactory()
      .getAllPackageMaintainers,
    [
      undefined,
      undefined,
      ['user.name,asc'],
      undefined,
      undefined,
      undefined,
      undefined
    ]
  )
}

export async function deletePackageMaintainerService(
  maintainer: EntityModelPackageMaintainerDto
): Promise<validatedData<EntityModelPackageMaintainerDto>> {
  if (!isAuthorized('DELETE', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .deletePackageMaintainer,
    [maintainer.id]
  )
}

export async function updatePackageMaintainerService(
  oldMaintainer: PackageMaintainerDto,
  newMaintainer: PackageMaintainerDto
): Promise<validatedData<EntityModelPackageMaintainerDto>> {
  if (!isAuthorized('PATCH', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .updatePackageMaintainer,
    [patch, oldMaintainer.id]
  )
}

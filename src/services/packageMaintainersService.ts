/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
} from '@/services/openApiAccess'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'

type ValidatedPackageMaintainers = Promise<
  validatedData<EntityModelPackageMaintainerDto[]>
>

type ValidatedPackageMaintainer = Promise<
  validatedData<EntityModelPackageMaintainerDto>
>

export async function fetch(
  filtration: PackageMaintainersFiltration,
  page?: number,
  pageSize?: number,
  sort?: string,
  showProgress = true
): ValidatedPackageMaintainers {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelPackageMaintainerDto[]>(
    ApiV2PackageMaintainerControllerApiFactory()
      .getAllPackageMaintainers,
    [
      page,
      pageSize,
      sort,
      filtration?.deleted,
      filtration?.technologies,
      filtration?.repository,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchPackageMaintainersService(
  filtration?: PackageMaintainersFiltration,
  page?: number,
  pageSize?: number
): ValidatedPackageMaintainers {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest([]))
  }
  const sort = useSortStore()
  const sortBy = sort.getSortBy()
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
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchAllPackageMaintainers(): ValidatedPackageMaintainers {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest([]))
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
    ],
    false
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchFullMaintainersList(
  page?: number,
  pageSize?: number,
  filtration?: PackageMaintainersFiltration,
  showProgress = false
): ValidatedPackageMaintainers {
  if (!isAuthorized('GET', 'packageMaintainers')) {
    return new Promise(() => validateRequest([]))
  }

  return openApiRequest<EntityModelPackageMaintainerDto[]>(
    ApiV2PackageMaintainerControllerApiFactory()
      .getAllPackageMaintainers,
    [
      page,
      pageSize,
      ['user.name,asc'],
      undefined,
      undefined,
      undefined,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function deletePackageMaintainerService(
  maintainer: EntityModelPackageMaintainerDto
): ValidatedPackageMaintainer {
  if (!isAuthorized('DELETE', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .deletePackageMaintainer,
    [maintainer.id]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function updatePackageMaintainerService(
  oldMaintainer: PackageMaintainerDto,
  newMaintainer: PackageMaintainerDto
): ValidatedPackageMaintainer {
  if (!isAuthorized('PATCH', 'packageMaintainers')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .updatePackageMaintainer,
    [patch, oldMaintainer.id]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function createPackageMaintainerService(
  maintainer: PackageMaintainerDto
): ValidatedPackageMaintainer {
  if (!isAuthorized('POST', 'packageMaintainers')) {
    return new Promise(() => false)
  }

  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .createPackageMaintainer,
    [maintainer]
  ).catch(() => {
    return validateRequest({})
  })
}

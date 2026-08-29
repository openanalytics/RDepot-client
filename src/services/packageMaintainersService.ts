/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
import { usePermissions } from '@/composable/authorities/userAuthorities'
import { hasPermission } from '@/utils/permissions'

type ValidatedPackageMaintainers = Promise<
  validatedData<EntityModelPackageMaintainerDto[]>
>

type ValidatedPackageMaintainer = Promise<
  validatedData<EntityModelPackageMaintainerDto>
>

const { has } = usePermissions()

export async function fetchPackageMaintainerService(
  filtration: PackageMaintainersFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedPackageMaintainers {
  if (!has('packageMaintainer.list')) {
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

export async function deletePackageMaintainerService(
  maintainer: EntityModelPackageMaintainerDto
): ValidatedPackageMaintainer {
  if (
    !hasPermission(
      maintainer.permissions,
      'packageMaintainer.delete.soft'
    )
  ) {
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
  if (
    !hasPermission(
      oldMaintainer.permissions,
      'packageMaintainer.edit'
    )
  ) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .updatePackageMaintainer,
    [oldMaintainer.id, patch]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function createPackageMaintainerService(
  maintainer: PackageMaintainerDto
): ValidatedPackageMaintainer {
  if (!has('packageMaintainer.create')) {
    return new Promise(() => false)
  }

  return openApiRequest<EntityModelPackageMaintainerDto>(
    ApiV2PackageMaintainerControllerApiFactory()
      .createPackageMaintainer,
    [maintainer],
    true
  ).catch(() => {
    return validateRequest({})
  })
}

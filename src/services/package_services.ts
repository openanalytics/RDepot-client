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

import { Technologies } from '@/enum/Technologies'
import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelPythonPackageDto,
  EntityModelRPackageDto,
  ResponseDtoListVignette,
  PythonPackageControllerApiFactory,
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

export async function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number,
  showProgress = false
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
      filtration?.name,
      page,
      pageSize,
      sort.getSortBy()
    ],
    showProgress
  )
}

// export function fetchPackageServices(
//   id: number,
//   showProgress = false
// ): Promise<validatedData<EntityModelPackageDto>> {
//   if (!isAuthorized('GET', 'packages')) {
//     return new Promise(() => {})
//   }
//   return openApiRequest<EntityModelPackageDto>(
//     ApiV2PackageControllerApiFactory().getPackageById,
//     [id],
//     showProgress
//   )
// }

export function fetchPackageServices(
  id: number,
  technology: Technologies,
  showProgress = false
) {
  switch (technology) {
    case Technologies.Enum.Python: {
      return fetchPythonPackageServices(id, showProgress)
    }
    case Technologies.Enum.R: {
      return fetchRPackageServices(id, showProgress)
    }
  }
}

function fetchRPackageServices(
  id: number,
  showProgress = false
): Promise<validatedData<EntityModelRPackageDto>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<EntityModelRPackageDto>(
    RPackageControllerApiFactory().getRPackageById,
    [id],
    showProgress
  )
}

function fetchPythonPackageServices(
  id: number,
  showProgress = false
): Promise<validatedData<EntityModelPythonPackageDto>> {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<EntityModelPythonPackageDto>(
    PythonPackageControllerApiFactory()
      .getAllPythonPackageById,
    [id],
    showProgress
  )
}

export async function updateRPackage(
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
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadReferenceManual,
    [id],
    true,
    true
  )
}

export function downloadVignetteHtml(
  id: string,
  name: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadVignetteHtml,
    [id, name],
    true,
    true
  )
}

export function downloadSourceFile(
  id: string,
  name: string,
  version: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadPackage,
    [id, name, version],
    true,
    true
  )
}

export function fetchVignettes(id: number) {
  return openApiRequest<Promise<ResponseDtoListVignette>>(
    RPackageControllerApiFactory().getVignetteLinks,
    [id],
    true
  )
}

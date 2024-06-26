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

import { Technologies } from '@/enum/Technologies'
import { PackagesFiltration } from '@/models/Filtration'
import {
  ApiV2PackageControllerApiFactory,
  EntityModelPackageDto,
  EntityModelPythonPackageDto,
  EntityModelRPackageDto,
  PythonPackageControllerApiFactory,
  RPackageControllerApiFactory,
  Vignette
} from '@/openapi'
import { isAuthorized } from '@/plugins/casl'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from '@/services/open_api_access'
import { useSortStore } from '@/store/sort'
import { createPatch } from 'rfc6902'

type ValidatedPackages = Promise<
  validatedData<EntityModelPackageDto[]>
>

type ValidatedPackage = Promise<
  validatedData<EntityModelPackageDto>
>

type ValidatedPackagePython = Promise<
  validatedData<EntityModelPythonPackageDto>
>

type ValidatedVignette = Promise<validatedData<Vignette[]>>

export async function fetch(
  filtration: PackagesFiltration,
  page?: number,
  pageSize?: number,
  sort?: string,
  showProgress = true
): ValidatedPackages {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelPackageDto[]>(
    ApiV2PackageControllerApiFactory().getAllPackages,
    [
      page,
      pageSize,
      sort,
      filtration?.repository,
      filtration?.deleted,
      filtration?.submissionState,
      filtration?.technologies,
      filtration?.search,
      filtration?.maintainer
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchPackagesServices(
  filtration?: PackagesFiltration,
  page?: number,
  pageSize?: number,
  showProgress = false
): ValidatedPackages {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => validateRequest)
  }
  const sort = useSortStore()
  return openApiRequest<EntityModelPackageDto[]>(
    ApiV2PackageControllerApiFactory().getAllPackages,
    [
      page,
      pageSize,
      sort.getSortBy(),
      filtration?.repository,
      filtration?.deleted,
      filtration?.submissionState,
      filtration?.technologies,
      filtration?.search,
      filtration?.maintainer
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export function fetchFullPackagesList(
  page?: number,
  pageSize?: number,
  filtration?: PackagesFiltration,
  showProgress = false
): ValidatedPackages {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => validateRequest([]))
  }

  return openApiRequest<EntityModelPackageDto[]>(
    ApiV2PackageControllerApiFactory().getAllPackages,
    [
      page,
      pageSize,
      ['name,asc'],
      filtration?.repository,
      undefined,
      undefined,
      undefined,
      filtration?.search,
      undefined
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

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
): ValidatedPackage {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<EntityModelRPackageDto>(
    RPackageControllerApiFactory().getRPackageById,
    [id],
    showProgress
  ).catch(() => {
    return validateRequest({})
  })
}

function fetchPythonPackageServices(
  id: number,
  showProgress = false
): ValidatedPackagePython {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<EntityModelPythonPackageDto>(
    PythonPackageControllerApiFactory()
      .getAllPythonPackageById,
    [id],
    showProgress
  ).catch(() => {
    return validateRequest({})
  })
}

export async function updateRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
): ValidatedPackage {
  if (!isAuthorized('PATCH', 'package')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldPackage, newPackage)

  return openApiRequest<EntityModelPackageDto>(
    RPackageControllerApiFactory().updatePackage,
    [patch, oldPackage.id]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function updatePythonPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
): ValidatedPackage {
  if (!isAuthorized('PATCH', 'package')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldPackage, newPackage)

  return openApiRequest<EntityModelPackageDto>(
    PythonPackageControllerApiFactory().updatePythonPackage,
    [patch, oldPackage.id]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function downloadReferenceManual(
  id: string,
  fileName: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadReferenceManual,
    [id],
    true,
    true,
    false,
    fileName
  ).catch(() => {
    return false
  })
}

export async function openVignetteHtml(
  id: string,
  name: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadVignetteHtml,
    [id, name],
    true,
    true,
    true
  ).catch(() => {
    return false
  })
}

export async function openVignettePdf(
  id: string,
  name: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadVignettePdf,
    [id, name],
    true,
    true,
    true
  ).catch(() => {
    return false
  })
}

export async function downloadVignetteHtml(
  id: string,
  name: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadVignetteHtml,
    [id, name],
    true,
    true
  ).catch(() => {
    return false
  })
}

export async function downloadVignettePdf(
  id: string,
  name: string
) {
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadVignettePdf,
    [id, name],
    true,
    true
  ).catch(() => {
    return false
  })
}

export async function downloadSourceFile(
  id: string,
  name: string,
  version: string,
  technology: string
) {
  if (technology === 'R') {
    return openApiRequest<Promise<boolean>>(
      RPackageControllerApiFactory().downloadRPackage,
      [id, name, version],
      true,
      true
    ).catch(() => {
      return false
    })
  } else {
    return openApiRequest<Promise<boolean>>(
      PythonPackageControllerApiFactory()
        .downloadPythonPackage,
      [id, name, version],
      true,
      true
    ).catch(() => {
      return false
    })
  }
}

export async function fetchVignettes(
  id: number
): ValidatedVignette {
  return openApiRequest<Vignette[]>(
    RPackageControllerApiFactory().getVignetteLinks,
    [id],
    true
  ).catch(() => {
    return validateRequest([])
  })
}

// export async function fetchVignettes(id: number) {
//   return openApiRequest<Promise<ResponseDtoListVignette>>(
//     RPackageControllerApiFactory().getVignetteLinks,
//     [id],
//     true
//   ).catch(() => {
//     return validateRequest({})
//   })
// }

export async function deletePythonPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
) {
  // if (!isAuthorized('PATCH', 'packages')) {
  //   return new Promise(() => false)
  // }

  const patch_body = createPatch(oldPackage, newPackage)

  return openApiRequest<EntityModelPackageDto>(
    PythonPackageControllerApiFactory().updatePythonPackage,
    [patch_body, oldPackage.id!]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function deleteRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto
) {
  // if (!isAuthorized('PATCH', 'packages')) {
  //   return new Promise(() => false)
  // }

  const patch_body = createPatch(oldPackage, newPackage)
  return openApiRequest<EntityModelPackageDto>(
    RPackageControllerApiFactory().updatePackage,
    [patch_body, oldPackage.id!]
  ).catch(() => {
    return validateRequest({})
  })
}

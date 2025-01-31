/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import { useUtilities } from '@/composable/utilities'
import { Technologies } from '@/enum/Technologies'
import {
  fetchTechnologyPackage,
  downloadTechnologyPackage
} from '@/maps/package/Technology'
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
} from '@/services/openApiAccess'
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

export async function fetchPackagesService(
  filtration: PackagesFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
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

export function fetchPackageService(
  id: number,
  technology: Technologies,
  showProgress = false
) {
  const fetchFn = fetchTechnologyPackage.get(technology)
  if (fetchFn) return fetchFn(id, showProgress)
}

export function fetchRPackageService(
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

export function fetchPythonPackageService(
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
  const downloadFn = downloadTechnologyPackage.get(
    technology as Technologies
  )
  if (downloadFn) return downloadFn(id, name, version)
}

export function downloadRPackageSourceFile(
  id: string,
  name: string,
  version: string
) {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
  return openApiRequest<Promise<boolean>>(
    RPackageControllerApiFactory().downloadRPackage,
    [id, name, version],
    true,
    true
  ).catch(() => {
    return false
  })
}

export function downloadPythonPackageSourceFile(
  id: string,
  name: string,
  version: string
) {
  if (!isAuthorized('GET', 'packages')) {
    return new Promise(() => {})
  }
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

export async function deletePackage(
  oldPackage: EntityModelPackageDto,
  ifToast = false
): Promise<validatedData<EntityModelPackageDto>> {
  // if (!isAuthorized('PATCH', 'packages')) {
  //   return new Promise(() => false)
  // }
  const { deepCopy } = useUtilities()

  let packagesApi
  const newPackage: EntityModelPackageDto =
    deepCopy(oldPackage)
  newPackage.deleted = true

  const patch_body = createPatch(oldPackage, newPackage)
  if (oldPackage.technology === Technologies.enum.R) {
    packagesApi =
      RPackageControllerApiFactory().updatePackage
  } else if (
    oldPackage.technology === Technologies.enum.Python
  ) {
    packagesApi =
      PythonPackageControllerApiFactory()
        .updatePythonPackage
  } else {
    return new Promise(() => false)
  }

  return openApiRequest<EntityModelPackageDto>(
    packagesApi,
    [patch_body, oldPackage.id!],
    undefined,
    undefined,
    undefined,
    undefined,
    ifToast
  )
}

export async function deletePythonPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto,
  ifToast = false
) {
  // if (!isAuthorized('PATCH', 'packages')) {
  //   return new Promise(() => false)
  // }

  const patch_body = createPatch(oldPackage, newPackage)

  return openApiRequest<EntityModelPackageDto>(
    PythonPackageControllerApiFactory().updatePythonPackage,
    [patch_body, oldPackage.id!],
    undefined,
    undefined,
    undefined,
    undefined,
    ifToast
  ).catch(() => {
    return validateRequest({})
  })
}

export async function deleteRPackage(
  oldPackage: EntityModelPackageDto,
  newPackage: EntityModelPackageDto,
  ifToast = false
) {
  // if (!isAuthorized('PATCH', 'packages')) {
  //   return new Promise(() => false)
  // }

  const patch_body = createPatch(oldPackage, newPackage)
  return openApiRequest<EntityModelPackageDto>(
    RPackageControllerApiFactory().updatePackage,
    [patch_body, oldPackage.id!],
    undefined,
    undefined,
    undefined,
    undefined,
    ifToast
  ).catch(() => {
    return validateRequest({})
  })
}

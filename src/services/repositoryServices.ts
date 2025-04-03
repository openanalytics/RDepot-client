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

import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  EntityModelPythonRepositoryDto,
  EntityModelRepositoryDto,
  EntityModelRRepositoryDto,
  PythonRepositoryControllerApiFactory,
  PythonRepositoryDto,
  RRepositoryControllerApiFactory,
  RRepositoryDto
} from '@/openapi'
import { Technologies } from '@/enum/Technologies'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './openApiAccess'
import { repositorySchema } from '@/models/Schemas'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { ApiV2StatusControllerApiFactory } from '@/openapi/apis/api-v2-status-controller-api'

type ValidatedRepositories = Promise<
  validatedData<EntityModelRepositoryDto[]>
>

type ValidatedRepository = Promise<
  validatedData<EntityModelRepositoryDto>
>

export async function fetchRepositoriesService(
  filtration: RepositoriesFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedRepositories {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelRepositoryDto[]>(
    ApiV2RepositoryControllerApiFactory()
      .getAllRepositories,
    [
      page,
      pageSize,
      sort,
      filtration?.deleted,
      filtration?.technologies,
      filtration?.published,
      filtration?.maintainer,
      filtration?.name,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchPythonRepositoriesService(
  filtration: RepositoriesFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedRepositories {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelPythonRepositoryDto[]>(
    PythonRepositoryControllerApiFactory()
      .getAllPythonRepositories,
    [
      page,
      pageSize,
      sort,
      filtration?.deleted,
      filtration?.name
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchRRepositoriesService(
  filtration: RepositoriesFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedRepositories {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelRRepositoryDto[]>(
    RRepositoryControllerApiFactory().getAllRRepositories,
    [
      page,
      pageSize,
      sort,
      filtration?.deleted,
      filtration?.name
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function createRepository(
  newRepository: EntityModelRepositoryDto
): ValidatedRepository {
  if (!isAuthorized('POST', 'repository')) {
    return new Promise(() => false)
  }
  const validatedRepository =
    repositorySchema.safeParse(newRepository)

  if (validatedRepository.success) {
    const { technology, ...repository } =
      validatedRepository.data
    if (technology === Technologies.enum.R) {
      return openApiRequest<RRepositoryDto>(
        RRepositoryControllerApiFactory().createRRepository,
        [repository as RRepositoryDto]
      )
    } else {
      return openApiRequest<PythonRepositoryDto>(
        PythonRepositoryControllerApiFactory()
          .createPythonRepository,
        [repository as PythonRepositoryDto],
        true
      )
    }
  } else {
    const toasts = useToast()
    toasts.error(i18n.t(validatedRepository.error.message))
    return new Promise(() => false)
  }
}

export async function updateRRepositoryService(
  oldRepository: EntityModelRRepositoryDto,
  newRepository: EntityModelRRepositoryDto
): ValidatedRepository {
  if (!isAuthorized('PATCH', 'repository')) {
    return new Promise(() => false)
  }

  const patchBody = createPatch(
    oldRepository,
    newRepository
  )

  if (oldRepository.technology === Technologies.enum.R) {
    return openApiRequest<RRepositoryDto>(
      RRepositoryControllerApiFactory().updateRRepository,
      [patchBody, newRepository.id]
    )
  } else if (
    oldRepository.technology === Technologies.enum.Python
  ) {
    return openApiRequest<PythonRepositoryDto>(
      PythonRepositoryControllerApiFactory()
        .updatePythonRepository,
      [patchBody, newRepository.id]
    )
  } else {
    throw new Error(
      'Technologies not supported ' +
        oldRepository.technology
    )
  }
}

export async function updatePythonRepositoryService(
  oldRepository: EntityModelPythonRepositoryDto,
  newRepository: EntityModelPythonRepositoryDto
): ValidatedRepository {
  if (!isAuthorized('PATCH', 'repository')) {
    return new Promise(() => false)
  }

  const patchBody = createPatch(
    oldRepository,
    newRepository
  )

  if (oldRepository.technology === Technologies.enum.R) {
    return openApiRequest<RRepositoryDto>(
      RRepositoryControllerApiFactory().updateRRepository,
      [patchBody, newRepository.id]
    )
  } else if (
    oldRepository.technology === Technologies.enum.Python
  ) {
    return openApiRequest<PythonRepositoryDto>(
      PythonRepositoryControllerApiFactory()
        .updatePythonRepository,
      [patchBody, newRepository.id]
    )
  } else {
    throw new Error(
      'Technologies not supported ' +
        oldRepository.technology
    )
  }
}

export async function republishRepositoryService(
  id: number,
  technology: Technologies
) {
  if (!isAuthorized('POST', 'repository')) {
    return new Promise(() => false)
  }

  if (technology === Technologies.enum.R) {
    return openApiRequest(
      RRepositoryControllerApiFactory()
        .republishRRepository,
      [id]
    )
  } else if (technology === Technologies.enum.Python) {
    return openApiRequest(
      PythonRepositoryControllerApiFactory()
        .republishRRepository1,
      [id]
    )
  } else {
    throw new Error(
      'Technologies not supported' + technology
    )
  }
}

export async function isServerAddressHealthy(
  serverAddress: string
): Promise<validatedData<boolean>> {
  return openApiRequest(
    ApiV2StatusControllerApiFactory()
      .validateNewServerAddress,
    [serverAddress]
  )
}

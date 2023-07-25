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

import { RepositoriesFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryControllerApiFactory,
  EntityModelRepositoryDto,
  PythonRepositoryControllerApiFactory,
  PythonRepositoryDto,
  RRepositoryControllerApiFactory,
  RRepositoryDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import { Technologies } from '@/enum/Technologies'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { useSortStore } from '@/store/sort'
import { repositorySchema } from '@/models/Schemas'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'

export function fetchRepositoriesServices(
  filtration?: RepositoriesFiltration,
  page?: number,
  pageSize?: number,
  showProgress = true
): Promise<validatedData<EntityModelRepositoryDto[]>> {
  if (!isAuthorized('GET', 'repositories')) {
    return new Promise(() => validateRequest)
  }
  const repository_api =
    ApiV2RepositoryControllerApiFactory(getConfiguration())
  const sort = useSortStore()
  sort.field = 'name'

  return openApiRequest<EntityModelRepositoryDto[]>(
    repository_api.getAllRepositories,
    [
      filtration?.deleted,
      filtration?.name,
      filtration?.technologies,
      page,
      pageSize,
      sort.getSortBy()
    ],
    showProgress
  )
}

export function createRepository(
  newRepository: EntityModelRepositoryDto
): Promise<validatedData<EntityModelRepositoryDto>> {
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
        [repository as PythonRepositoryDto]
      )
    }
  } else {
    notify({
      type: 'error',
      text: validatedRepository.error.message
    })
    return new Promise(() => false)
  }
}

export function updateRepository(
  oldRepository: EntityModelRepositoryDto,
  newRepository: EntityModelRepositoryDto
): Promise<validatedData<EntityModelRepositoryDto>> {
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

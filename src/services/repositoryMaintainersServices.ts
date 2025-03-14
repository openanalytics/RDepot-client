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

import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './openApiAccess'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'

type ValidatedRepositoryMaintainers = Promise<
  validatedData<EntityModelRepositoryMaintainerDto[]>
>

type ValidatedRepositoryMaintainer = Promise<
  validatedData<EntityModelRepositoryMaintainerDto>
>

export async function fetchRepositoryMaintainersService(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedRepositoryMaintainers {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<
    EntityModelRepositoryMaintainerDto[]
  >(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .getAllRepositoryMaintainers,
    [
      page,
      pageSize,
      sort,
      filtration?.deleted,
      filtration?.technologies,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function updateRepositoryMaintainer(
  oldMaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
): ValidatedRepositoryMaintainer {
  if (!isAuthorized('PATCH', 'repositoryMaintainers'))
    return new Promise(() => false)

  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<EntityModelRepositoryMaintainerDto>(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .updateRepositoryMaintainer,
    [patch, oldMaintainer.id],
    true
  ).catch(() => {
    return validateRequest({})
  })
}

export async function createRepositoryMaintainer(
  maintainer: EntityModelRepositoryMaintainerDto
): ValidatedRepositoryMaintainer {
  if (!isAuthorized('POST', 'repositoryMaintainers'))
    return new Promise(() => false)

  return openApiRequest<EntityModelRepositoryMaintainerDto>(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .createRepositoryMaintainer,
    [maintainer],
    true
  )
}

export async function deletedRepositoryMaintainer(
  maintainer: EntityModelRepositoryMaintainerDto
): ValidatedRepositoryMaintainer {
  if (!isAuthorized('DELETE', 'repositoryMaintainers')) {
    return new Promise(() => false)
  }
  return openApiRequest<EntityModelRepositoryMaintainerDto>(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .deleteRepositoryMaintainer,
    [maintainer.id],
    true
  ).catch(() => {
    return validateRequest({})
  })
}

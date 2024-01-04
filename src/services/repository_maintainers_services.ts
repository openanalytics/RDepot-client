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

import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './open_api_access'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'

export async function fetchRepositoryMaintainersServices(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number
): Promise<
  validatedData<EntityModelRepositoryMaintainerDto[]>
> {
  if (!isAuthorized('GET', 'repositoryMaintainers'))
    return new Promise(() => validateRequest)
  const sort = useSortStore()
  const sortBy = sort.getSortBy()
  return openApiRequest<
    EntityModelRepositoryMaintainerDto[]
  >(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .getAllRepositoryMaintainers,
    [
      page,
      pageSize,
      sortBy,
      filtration?.deleted,
      filtration?.technologies,
      filtration?.search
    ]
  )
}

export async function fetchAllRepositoryMaintainers(): Promise<
  validatedData<EntityModelRepositoryMaintainerDto[]>
> {
  if (!isAuthorized('GET', 'repositoryMaintainers'))
    return new Promise(() => validateRequest)
  const sort = useSortStore()
  const sortBy = sort.getSortBy()
  return openApiRequest<
    EntityModelRepositoryMaintainerDto[]
  >(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .getAllRepositoryMaintainers,
    [
      undefined,
      undefined,
      ['user.name,asc'],
      undefined,
      undefined,
      undefined
    ]
  )
}

export async function updateRepositoryMaintainer(
  oldMaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
): Promise<
  validatedData<EntityModelRepositoryMaintainerDto>
> {
  if (!isAuthorized('PATCH', 'repositoryMaintainers'))
    return new Promise(() => false)

  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<EntityModelRepositoryMaintainerDto>(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .updateRepositoryMaintainer,
    [patch, oldMaintainer.id]
  )
}

export async function deletedRepositoryMaintainer(
  maintainer: EntityModelRepositoryMaintainerDto
): Promise<
  validatedData<EntityModelRepositoryMaintainerDto>
> {
  if (!isAuthorized('DELETE', 'repositoryMaintainers')) {
    return new Promise(() => false)
  }
  return openApiRequest<EntityModelRepositoryMaintainerDto>(
    ApiV2RepositoryMaintainerControllerApiFactory()
      .deleteRepositoryMaintainer,
    [maintainer.id]
  )
}

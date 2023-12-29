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

import {
  ApiV2UserControllerApiFactory,
  EntityModelUserDto,
  RoleDto
} from '@/openapi'
import { UsersFiltration } from '@/models/Filtration'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './open_api_access'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { createPatch } from 'rfc6902'

export async function fetchUsers(
  page?: number,
  pageSize?: number,
  filtration?: UsersFiltration
): Promise<validatedData<EntityModelUserDto[]>> {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest)
  }
  const sort = useSortStore()

  return openApiRequest<EntityModelUserDto[]>(
    ApiV2UserControllerApiFactory().getAllUsers,
    [
      page,
      pageSize,
      sort.getSortBy(),
      filtration?.roles,
      filtration?.active,
      filtration?.search
    ]
  )
}

export async function updateUser(
  oldUser: EntityModelUserDto,
  newUser: EntityModelUserDto
): Promise<validatedData<EntityModelUserDto>> {
  if (!isAuthorized('PATCH', 'users')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldUser, newUser)
  return openApiRequest<EntityModelUserDto>(
    ApiV2UserControllerApiFactory().patchUser,
    [patch, oldUser.id]
  )
}

type ValidatedRRoles = Promise<validatedData<RoleDto[]>>

export async function fetchRoles(): ValidatedRRoles {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest)
  }
  return openApiRequest<RoleDto[]>(
    ApiV2UserControllerApiFactory().getRoles
  )
}

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
} from './openApiAccess'
import { isAuthorized } from '@/plugins/casl'
import { createPatch } from 'rfc6902'

type ValidatedUsers = Promise<
  validatedData<EntityModelUserDto[]>
>

type ValidatedUser = Promise<
  validatedData<EntityModelUserDto>
>

type ValidatedRRoles = Promise<validatedData<RoleDto[]>>

export async function fetchUsersService(
  filtration: UsersFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedUsers {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelUserDto[]>(
    ApiV2UserControllerApiFactory().getAllUsers,
    [
      page,
      pageSize,
      sort,
      filtration?.roles,
      filtration?.active,
      filtration?.deleted,
      filtration?.search
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function updateUser(
  oldUser: EntityModelUserDto,
  newUser: EntityModelUserDto
): ValidatedUser {
  if (!isAuthorized('PATCH', 'users')) {
    return new Promise(() => false)
  }
  const patch = createPatch(oldUser, newUser)
  return openApiRequest<EntityModelUserDto>(
    ApiV2UserControllerApiFactory().patchUser,
    [patch, oldUser.id]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function fetchRoles(): ValidatedRRoles {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest)
  }
  return openApiRequest<RoleDto[]>(
    ApiV2UserControllerApiFactory().getRoles
  ).catch(() => {
    return validateRequest([])
  })
}

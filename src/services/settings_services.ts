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

import { TokensFiltration } from '@/models/Filtration'
import {
  ApiV2AccessTokenControllerApiFactory,
  EntityModelAccessTokenDto,
  CreateAccessTokenDto
} from '@/openapi'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './open_api_access'
import { tokenSchema } from '@/models/Schemas'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'

type ValidatedTokens = Promise<
  validatedData<EntityModelAccessTokenDto[]>
>

type ValidatedToken = Promise<
  validatedData<EntityModelAccessTokenDto>
>

export async function fetch(
  filtration: TokensFiltration,
  page?: number,
  pageSize?: number,
  sort?: string,
  showProgress = true
): ValidatedTokens {
  if (!isAuthorized('GET', 'submissions')) {
    return new Promise(() => validateRequest([]))
  }
  return openApiRequest<EntityModelAccessTokenDto[]>(
    ApiV2AccessTokenControllerApiFactory()
      .getAllAccessTokens,
    [
      page,
      pageSize,
      sort,
      filtration?.search,
      filtration?.userLogin,
      filtration?.active,
      filtration?.expired
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function fetchTokens(
  filtration: TokensFiltration,
  logged_user_id?: number,
  page?: number,
  pageSize?: number,
  showProgress = true
): ValidatedTokens {
  if (!isAuthorized('GET', 'settings')) {
    return new Promise(() => validateRequest([]))
  }
  const sort = useSortStore()
  let sortBy = sort.getSortBy()
  if (sort.field == 'name') {
    sortBy = ['name,' + sort.direction]
  }
  return openApiRequest<EntityModelAccessTokenDto[]>(
    ApiV2AccessTokenControllerApiFactory()
      .getAllAccessTokens,
    [
      page,
      pageSize,
      sortBy,
      filtration?.search,
      filtration?.userLogin,
      filtration?.active,
      filtration?.expired
    ],
    showProgress
  ).catch(() => {
    return validateRequest([])
  })
}

export async function createToken(
  newToken: CreateAccessTokenDto
): ValidatedToken {
  if (!isAuthorized('POST', 'settings')) {
    return new Promise(() => false)
  }
  const validatedToken = tokenSchema.safeParse(newToken)

  if (validatedToken.success) {
    const { ...token } = validatedToken.data
    return openApiRequest<CreateAccessTokenDto>(
      ApiV2AccessTokenControllerApiFactory()
        .createAccessToken,
      [token as CreateAccessTokenDto]
    )
  } else {
    const toasts = useToast()
    toasts.error(i18n.t(validatedToken.error.message))
    return new Promise(() => false)
  }
}

export async function deleteToken(id: number) {
  return openApiRequest<CreateAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory()
      .deleteAccessToken,
    [id]
  )
}

export async function editToken(
  oldToken: EntityModelAccessTokenDto,
  newToken: EntityModelAccessTokenDto
): ValidatedToken {
  const patch_body = createPatch(oldToken, newToken)
  return openApiRequest<EntityModelAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory().patchAccessToken,
    [patch_body, oldToken.id!]
  ).catch(() => {
    return validateRequest({})
  })
}
export async function deactivateToken(
  oldToken: EntityModelAccessTokenDto,
  newToken: EntityModelAccessTokenDto
): ValidatedToken {
  const patch_body = createPatch(oldToken, newToken)
  return openApiRequest<EntityModelAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory().patchAccessToken,
    [patch_body, oldToken.id!]
  ).catch(() => {
    return validateRequest({})
  })
}

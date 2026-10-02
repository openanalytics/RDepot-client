/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
  CreateAccessTokenDto,
  EntityModelAccessTokenDto
} from '@/openapi'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './openApiAccess'
import { createPatch, Operation } from 'rfc6902'
import { hasPermission } from '@/utils/permissions'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { useTokenValidationSchema } from '@/composable/tokens/tokenSchema.ts'
import { usePermissions } from '@/composable/authorities/userAuthorities'

type ValidatedTokens = Promise<
  validatedData<EntityModelAccessTokenDto[]>
>

type ValidatedToken = Promise<
  validatedData<EntityModelAccessTokenDto>
>

const { has } = usePermissions()

export async function fetchSettingsService(
  filtration: TokensFiltration,
  page?: number,
  pageSize?: number,
  sort?: string[],
  showProgress = false
): ValidatedTokens {
  if (!has('accessToken.list.my')) {
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

export async function createToken(
  newToken: CreateAccessTokenDto
): ValidatedToken {
  if (!has('accessToken.create')) {
    return new Promise(() => false)
  }
  const { tokenSchema } = useTokenValidationSchema()
  const validatedToken = tokenSchema.safeParse(newToken)

  if (validatedToken.success) {
    const { ...token } = validatedToken.data
    return openApiRequest<CreateAccessTokenDto>(
      ApiV2AccessTokenControllerApiFactory()
        .createAccessToken,
      [token as CreateAccessTokenDto],
      true
    )
  } else {
    const toasts = useToast()
    toasts.error(i18n.t(validatedToken.error.message))
    return new Promise(() => false)
  }
}

export async function deleteToken(
  token: EntityModelAccessTokenDto
) {
  if (
    !hasPermission(
      token.permissions,
      'accessToken.delete.hard'
    )
  ) {
    return new Promise(() => false)
  }
  return openApiRequest<CreateAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory()
      .deleteAccessToken,
    [token.id]
  )
}

export async function editToken(
  oldToken: EntityModelAccessTokenDto,
  newToken: EntityModelAccessTokenDto
): ValidatedToken {
  if (
    !hasPermission(oldToken.permissions, 'accessToken.edit')
  ) {
    return new Promise(() => false)
  }
  const patch_body = createPatch(oldToken, newToken)
  return openApiRequest<EntityModelAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory().patchAccessToken,
    [oldToken.id!, patch_body]
  ).catch(() => {
    return validateRequest({})
  })
}

export async function deactivateToken(
  token: EntityModelAccessTokenDto
): ValidatedToken {
  if (
    !hasPermission(
      token.permissions,
      'accessToken.deactivate'
    )
  ) {
    return new Promise(() => false)
  }
  const patch_body: Operation[] = [
    { op: 'replace', path: '/active', value: false }
  ]
  return openApiRequest<EntityModelAccessTokenDto>(
    ApiV2AccessTokenControllerApiFactory().patchAccessToken,
    [token.id!, patch_body]
  ).catch(() => {
    return validateRequest({})
  })
}

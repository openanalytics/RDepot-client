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

import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './openApiAccess'
import { createPatch } from 'rfc6902'
import {
  ApiV2UserControllerApiFactory,
  ApiV2UserSettingsControllerApiFactory,
  EntityModelUserDto
} from '@/openapi'

type ValidatedUserType = Promise<
  validatedData<EntityModelUserDto>
>

export async function getMyData(): ValidatedUserType {
  return openApiRequest<EntityModelUserDto>(
    ApiV2UserControllerApiFactory().getUserInfo
  ).catch(() => {
    return validateRequest({})
  })
}

export function updateUserSettings(
  old_settings: UserSettingsProjection,
  new_settings: UserSettingsProjection,
  me: EntityModelUserDto
): Promise<validatedData<UserSettingsProjection>> {
  const patch = createPatch(old_settings, new_settings)
  return openApiRequest<UserSettingsProjection>(
    ApiV2UserSettingsControllerApiFactory()
      .patchUserSettingsByUserId,
    [patch, me.id],
    true
  ).catch(() => {
    return validateRequest({})
  })
}

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
  ApiV2ConfigControllerApiFactory,
  PublicConfigurationDto
} from '@/openapi'
import {
  openApiRequest,
  validatedData,
  validateRequest
} from './openApiAccess'
import { isAuthorized } from '@/plugins/casl'

type ValidatedConfig = Promise<
  validatedData<PublicConfigurationDto>
>

export async function fetchConfiguration(): ValidatedConfig {
  if (!isAuthorized('GET', 'config')) {
    return new Promise(() => validateRequest({}))
  }
  return openApiRequest<PublicConfigurationDto>(
    ApiV2ConfigControllerApiFactory().getPublicConfig,
    [],
    false
  ).catch(() => {
    return validateRequest({})
  })
}

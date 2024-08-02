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

import { EventsFiltration } from '@/models/Filtration'
import {
  ApiV2NewsfeedEventControllerApiFactory,
  EntityModelNewsfeedEventDto
} from '@/openapi'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './openApiAccess'
import { isAuthorized } from '@/plugins/casl'

type ValidatedNewsFeed = Promise<
  validatedData<EntityModelNewsfeedEventDto>
>

export async function fetch(
  filtration: EventsFiltration,
  page?: number,
  pageSize?: number
): ValidatedNewsFeed {
  if (!isAuthorized('GET', 'events')) {
    return new Promise(() => validateRequest({}))
  }
  let localFiltration = undefined
  if (
    filtration.technologies &&
    filtration.technologies.length > 0
  ) {
    localFiltration = filtration.technologies[0]
  }
  return openApiRequest<EntityModelNewsfeedEventDto>(
    ApiV2NewsfeedEventControllerApiFactory().getAllEvents,
    [
      page,
      pageSize,
      undefined,
      localFiltration,
      filtration.userName,
      filtration.eventType,
      filtration.resourceType,
      filtration.fromDate,
      filtration.toDate
    ]
  ).catch(() => {
    return validateRequest({})
  })
}

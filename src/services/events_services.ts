/* 
 *  R Depot
 *  
 *  Copyright (C) 2012-2023 Open Analytics NV
 *  
 *  ===========================================================================
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *  
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *  
 */

import { EventsFiltration } from '@/models/Filtration'
import {
  ApiV2NewsfeedEventControllerApiFactory,
  EntityModelNewsfeedEventDto,
  ResponseDtoPagedModelEntityModelNewsfeedEventDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { isAuthorized } from '@/plugins/casl'

export function fetchEventsServices(
  filtration: EventsFiltration,
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelNewsfeedEventDto>> {
  if (!isAuthorized('GET', 'events')) {
    return new Promise(() => validateRequest())
  }
  const events_api = ApiV2NewsfeedEventControllerApiFactory(
    getConfiguration()
  )
  var localFiltration = undefined
  if (
    filtration.technologies &&
    filtration.technologies.length > 0
  ) {
    localFiltration = filtration.technologies[0]
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelNewsfeedEventDto>(
    events_api.getAllEvents,
    [
      localFiltration,
      filtration.userId,
      filtration.resourceId,
      filtration.eventType,
      filtration.resourceType,
      page,
      pageSize
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page,
        res.data.data?.links
      ),
    (msg) => {
      notify({ text: msg, type: 'error' })
      return validateRequest()
    }
  )
}

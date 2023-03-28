import { EventsFiltration } from '@/models/Filtration'
import {
  ApiV2NewsfeedEventControllerApiFactory,
  ResponseDtoPagedModelEntityModelNewsfeedEventDto
} from '@/openapi'
import { getConfiguration } from './api_config'
import { openApiRequest } from './open_api_access'

export function fetchEventsServices(
  filtration: EventsFiltration,
  page?: number,
  pageSize?: number
) {
  const packages_api =
    ApiV2NewsfeedEventControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelNewsfeedEventDto>(
    () =>
      packages_api.getAllEvents(
        filtration.technology,
        filtration.userId,
        filtration.resourceId,
        filtration.eventType,
        filtration.resourceType,
        page,
        pageSize
      )
  )
}

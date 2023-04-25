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

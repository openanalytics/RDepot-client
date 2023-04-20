import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  EntityModelRepositoryMaintainerDto,
  ResponseDtoPagedModelEntityModelRepositoryMaintainerDto
} from '@/openapi'
import { AxiosResponse } from 'axios'
import { getConfiguration } from './api_config'
import {
  openApiRequest,
  validateRequest
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'

export function fetchRepositoryMaintainersServices(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  const sort = useSortStore()
  if (sort.field == 'name') {
    sort.setField('user')
  }
  var sortBy = sort.field + ',' + sort.direction

  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>(
    repository_maintainers_api.getAllRepositoryMaintainers,
    [
      filtration.deleted,
      filtration.technologies,
      page,
      pageSize,
      sortBy
    ]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({ text: msg, type: 'error' })
      return validateRequest<EntityModelRepositoryMaintainerDto>()
    }
  )
}

export function updateRepositoryMaintainer(
  oldMaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  const patch = createPatch(oldMaintainer, newMaintainer)

  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.updateRepositoryMaintainer,
    [patch, oldMaintainer.id]
  ).then(
    () => {
      notify({
        type: 'success',
        text: i18n.t(
          'notifications.successUpdateRepositoryMaintainer',
          newMaintainer.user?.name || ''
        )
      })
      return true
    },
    (msg) => {
      notify({
        type: 'error',
        text: msg
      })
      return false
    }
  )
}

export function deletedRepositoryMaintainer(
  maintainer: EntityModelRepositoryMaintainerDto
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.deleteRepositoryMaintainer,
    [maintainer.id]
  ).then(
    () => {
      notify({
        text: i18n.t(
          'notifications.successDeleteRepositoryMaintainer',
          maintainer.user?.name || ''
        ),
        type: 'success'
      })
      return true
    },
    (msg) => {
      notify({ text: msg, type: 'error' })
      return false
    }
  )
}

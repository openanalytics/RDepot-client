import { RepositoryMaintainersFiltration } from '@/models/Filtration'
import {
  ApiV2RepositoryMaintainerControllerApiFactory,
  EntityModelRepositoryMaintainerDto,
  ResponseDtoPagedModelEntityModelRepositoryDto
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

export function fetchRepositoryMaintainersServices(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryDto>(
    repository_maintainers_api.getAllRepositoryMaintainers,
    [
      filtration.deleted,
      filtration.technologies,
      page,
      pageSize
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
  oldmaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  const patch = createPatch(oldmaintainer, newMaintainer)

  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.updateRepositoryMaintainer,
    [patch, oldmaintainer.id]
  ).then(
    () => {
      notify({
        type: 'success',
        text: i18n.t(
          'notifications.successUpdateRepositoryManager'
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
  maintainer_id: number
) {
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )
  return openApiRequest<AxiosResponse<any>>(
    repository_maintainers_api.deleteRepositoryMaintainer,
    [maintainer_id]
  ).then(
    () => {
      notify({
        text: i18n.t(
          'notifications.successDeleteRepositoryMaintainer'
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

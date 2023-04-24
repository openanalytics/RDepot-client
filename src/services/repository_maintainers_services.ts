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
  validateRequest,
  validatedData
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { createPatch } from 'rfc6902'
import { isAuthorized } from '@/plugins/casl'

export function fetchRepositoryMaintainersServices(
  filtration: RepositoryMaintainersFiltration,
  page?: number,
  pageSize?: number
): Promise<
  validatedData<EntityModelRepositoryMaintainerDto>
> {
  if (!isAuthorized('GET', 'repositoryMaintainers'))
    return new Promise(() => validateRequest())
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
      return validateRequest()
    }
  )
}

export function updateRepositoryMaintainer(
  oldmaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
): Promise<boolean> {
  if (isAuthorized('PATCH', 'repositoryMaintainers'))
    return new Promise(() => false)
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
): Promise<boolean> {
  if (isAuthorized('DELETE', 'repositoryMaintainers')) {
    return new Promise(() => false)
  }
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

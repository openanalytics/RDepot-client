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
  validateRequest,
  validatedData
} from './open_api_access'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { createPatch } from 'rfc6902'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { log } from 'console'

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
  const sort = useSortStore()
  if (sort.field == 'name') {
    sort.setField('user')
  }
  return openApiRequest<ResponseDtoPagedModelEntityModelRepositoryMaintainerDto>(
    repository_maintainers_api.getAllRepositoryMaintainers,
    [
      filtration.deleted,
      filtration.technologies,
      page,
      pageSize,
      sort.getSortBy()
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
  oldMaintainer: EntityModelRepositoryMaintainerDto,
  newMaintainer: EntityModelRepositoryMaintainerDto
): Promise<boolean> {
  if (!isAuthorized('PATCH', 'repositoryMaintainers'))
    return new Promise(() => false)
  const repository_maintainers_api =
    ApiV2RepositoryMaintainerControllerApiFactory(
      getConfiguration()
    )

  console.log(oldMaintainer)
  console.log(newMaintainer)
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
): Promise<boolean> {
  if (!isAuthorized('DELETE', 'repositoryMaintainers')) {
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

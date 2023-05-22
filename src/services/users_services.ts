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

import { LoginApiData } from '@/models/users/Login'
import {
  ApiV2UserControllerApiFactory,
  EntityModelUserDto,
  ResponseDtoCollectionModelRoleDto,
  ResponseDtoPagedModelEntityModelUserDto,
  RoleDto
} from '@/openapi'
import api from '@/plugins/axios'
import { notify } from '@kyvg/vue3-notification'
import { getConfiguration } from './api_config'
import {
  openApiRequest,
  validateRequest,
  validatedData
} from './open_api_access'
import { useSortStore } from '@/store/sort'
import { isAuthorized } from '@/plugins/casl'
import { createPatch } from 'rfc6902'
import { i18n } from '@/plugins/i18n'
import { AxiosResponse } from 'axios'

export async function loginApi(data: LoginApiData) {
  try {
    var credentials = {
      password: data.password,
      username: data.username
    }
    console.log('user data ', credentials)

    let response = await api.post(
      `/api/auth/login`,
      credentials
    )
    console.log('response: ', response)

    if (response.status == 200) {
      notify({
        text: 'successfully logged in',
        type: 'success'
      })
    }
    return response
  } catch (error) {
    console.log('response: ', error)
    notify({
      text: 'Wrong credential data, please try again',
      type: 'warn'
    })
    return error
  }
}

export async function fetchUsers(
  page?: number,
  pageSize?: number
): Promise<validatedData<EntityModelUserDto>> {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest())
  }
  const user_api = ApiV2UserControllerApiFactory(
    getConfiguration()
  )
  const sort = useSortStore()

  return openApiRequest<ResponseDtoPagedModelEntityModelUserDto>(
    user_api.getAllUsers,
    [page, pageSize, sort.getSortBy()]
  ).then(
    (res) =>
      validateRequest(
        res.data.data?.content,
        res.data.data?.page
      ),
    (msg) => {
      notify({
        text: msg,
        type: 'error'
      })
      return validateRequest()
    }
  )
}

export async function updateUser(
  oldUser: EntityModelUserDto,
  newUser: EntityModelUserDto
): Promise<boolean> {
  if (!isAuthorized('PATCH', 'users')) {
    return new Promise(() => false)
  }
  const user_api = ApiV2UserControllerApiFactory(
    getConfiguration()
  )
  const patch = createPatch(oldUser, newUser)

  return openApiRequest<AxiosResponse<any>>(
    user_api.patchUser,
    [patch, oldUser.id]
  ).then(
    () => {
      notify({
        text: i18n.t('notifications.successUpdateUser'),
        type: 'success'
      })
      return true
    },
    (msg) => {
      notify({
        text: msg,
        type: 'error'
      })
      return false
    }
  )
}

export async function fetchRoles(): Promise<
  validatedData<RoleDto>
> {
  if (!isAuthorized('GET', 'users')) {
    return new Promise(() => validateRequest())
  }
  const user_api = ApiV2UserControllerApiFactory(
    getConfiguration()
  )
  console.log('user_api: ')
  return openApiRequest<ResponseDtoCollectionModelRoleDto>(
    user_api.getRoles
  ).then(
    (res) => {
      console.log('res: ', res)
      return validateRequest(res.data.data?.content)
    },
    (msg) => {
      notify({
        text: msg,
        type: 'error'
      })
      return validateRequest()
    }
  )
}

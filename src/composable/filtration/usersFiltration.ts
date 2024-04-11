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

import { EntityModelUserDto } from '@/openapi'
import { useUserStore } from '@/store/users'
import {
  useSelectStore,
  SelectState,
  UserObject,
  UserObjectCreate
} from '@/store/select_pagination'

export function useUsersFiltration() {
  const storeIdUser: SelectState = 'user'

  const selectStore = useSelectStore(storeIdUser)
  const userStore = useUserStore()

  async function resetPaginationUsers() {
    selectStore.resetItems()
    selectStore.resetPagination()
  }

  async function loadUsers() {
    if (
      selectStore.items.length !=
        selectStore.paginationData.totalNumber ||
      selectStore.paginationData.totalNumber == -1
    ) {
      selectStore.setPage(
        selectStore.paginationData.page + 1
      )
      if (
        selectStore.shouldFetchNextPage &&
        ((selectStore.paginationData.totalNumber > 0 &&
          selectStore.paginationData.page <=
            Math.ceil(
              selectStore.paginationData.totalNumber /
                selectStore.pageSize
            )) ||
          selectStore.paginationData.totalNumber < 0)
      ) {
        await userStore
          .fetchUsersList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          userStore.userList.map(
            (user: EntityModelUserDto) => {
              return {
                value: user.login,
                title: user.name
              } as UserObject
            }
          )
        )
      }
    }
  }

  async function loadUsersObjects(desiredRoles?: string) {
    if (
      selectStore.items.length !=
        selectStore.paginationData.totalNumber ||
      selectStore.paginationData.totalNumber == -1
    ) {
      selectStore.setPage(
        selectStore.paginationData.page + 1
      )
      if (
        selectStore.shouldFetchNextPage &&
        ((selectStore.paginationData.totalNumber > 0 &&
          selectStore.paginationData.page <=
            Math.ceil(
              selectStore.paginationData.totalNumber /
                selectStore.pageSize
            )) ||
          selectStore.paginationData.totalNumber < 0)
      ) {
        switch (desiredRoles) {
          case 'packageMaintainer':
            userStore.filtration.roles = [
              'packagemaintainer',
              'repositorymaintainer',
              'admin'
            ]
            break
          case 'repositoryMaintainer':
            userStore.filtration.roles = [
              'repositorymaintainer',
              'admin'
            ]
            break
          default:
            userStore.filtration.roles = undefined
            break
        }
        await userStore
          .fetchUsersList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          userStore.userList.map(
            (user: EntityModelUserDto) => {
              return {
                value: user.id,
                title: user.name
              } as UserObjectCreate
            }
          )
        )
      }
    }
  }

  function filtrateUsers(value: string | undefined) {
    if (userStore.filtration.search !== value) {
      userStore.setFiltrationByName(value)
    }
  }

  return {
    storeIdUser,
    loadUsers,
    loadUsersObjects,
    filtrateUsers,
    resetPaginationUsers
  }
}

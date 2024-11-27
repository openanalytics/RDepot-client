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
import { useUserStore } from '@/store/options/users'
import {
  useSelectStore,
  SelectState,
  UserObject,
  UserObjectCreate
} from '@/store/setup/selectPagination'
import { Role, roleToStringBackend } from '@/enum/UserRoles'

export function useUsersFiltration() {
  const storeIdUser: SelectState = 'user'

  const selectStore = useSelectStore(storeIdUser)
  const userStore = useUserStore()

  async function resetPaginationUsers() {
    selectStore.resetItems()
    selectStore.resetPagination()
  }

  async function getUsers() {
    await userStore
      .getList(
        selectStore.paginationData.page - 1,
        selectStore.pageSize
      )
      .then((res) => {
        selectStore.paginationData.totalNumber =
          res.totalNumber
        selectStore.paginationData.totalPages =
          res.totalPages
      })
  }

  async function loadUsers() {
    if (selectStore.shouldFetchNextPage) {
      selectStore.nextPage()
      if (selectStore.shouldFetchNextPage) {
        await getUsers()
        selectStore.addItems(
          userStore.users.map(
            (user: EntityModelUserDto) => {
              return {
                value: user.login,
                title: user.name,
                props: {
                  id: `select-input-user-${user.name?.replace(
                    ' ',
                    '-'
                  )}`
                }
              } as UserObject
            }
          )
        )
      }
    }
  }

  function setUsersFiltration(isAtLeastRole?: Role) {
    switch (isAtLeastRole) {
      case Role.enum.packageMaintainer:
        userStore.filtration.roles = [
          roleToStringBackend(Role.enum.packageMaintainer),
          roleToStringBackend(
            Role.enum.repositoryMaintainer
          ),
          roleToStringBackend(Role.enum.admin)
        ]
        break
      case Role.enum.repositoryMaintainer:
        userStore.filtration.roles = [
          roleToStringBackend(
            Role.enum.repositoryMaintainer
          ),
          roleToStringBackend(Role.enum.admin)
        ]
        break
      default:
        userStore.filtration.roles = undefined
        break
    }
  }

  async function loadUsersObjects(isAtLeastRole?: Role) {
    if (selectStore.shouldFetchNextPage) {
      selectStore.nextPage()
      if (selectStore.shouldFetchNextPage) {
        setUsersFiltration(isAtLeastRole)
        await getUsers()
        selectStore.addItems(
          userStore.users.map(
            (user: EntityModelUserDto) => {
              return {
                value: user.id,
                title: user.name,
                props: {
                  id: `select-input-user-${user.name?.replace(
                    ' ',
                    '-'
                  )}`
                }
              } as UserObjectCreate
            }
          )
        )
      }
    }
  }

  function filtrateUsers(value: string | undefined) {
    if (value === undefined) {
      userStore.clearFiltration()
    } else if (userStore.filtration.search !== value) {
      resetPaginationUsers()
      userStore.setFiltrationBy({ search: value })
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

/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

import { defineStore } from 'pinia'
import { LoginType } from '@/enum/LoginType'
import {
  fetchRoles,
  fetchUsers,
  updateUser
} from '@/services/users_services'
import { EntityModelUserDto, RoleDto } from '@/openapi'
import { Role } from '@/enum/UserRoles'
import { usePagination } from '@/store/pagination'
import {
  defaultValues,
  UsersFiltration
} from '@/models/Filtration'

interface State {
  userToken: string
  userName: string
  userList: EntityModelUserDto[]
  chosenUser: EntityModelUserDto
  filtration: UsersFiltration
  roles: RoleDto[]
}

export const useUserStore = defineStore('userStore', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      userList: [],
      chosenUser: {},
      filtration: defaultValues(UsersFiltration),
      roles: []
    }
  },
  getters: {
    isDefaultFiltration: (state) => {
      return (
        JSON.stringify(state.filtration) ===
        JSON.stringify(defaultValues(UsersFiltration))
      )
    }
  },
  actions: {
    async fetchUsers() {
      const pagination = usePagination()
      const [users, pageData] = await fetchUsers(
        pagination.fetchPage,
        pagination.pageSize,
        this.filtration
      )
      this.userList = users
      pagination.newPageWithoutRefresh(pageData.page)
      pagination.totalNumber = pageData.totalNumber
    },
    async fetchRoles() {
      if (this.roles.length === 0) {
        const [roles] = await fetchRoles()
        this.roles = roles
      }
    },
    async setFiltration(payload: UsersFiltration) {
      const pagination = usePagination()
      pagination.resetPage()
      if (UsersFiltration.safeParse(payload).success) {
        this.filtration = UsersFiltration.parse(payload)
      }
      await this.fetchUsers()
    },
    async saveUser(newUser: EntityModelUserDto) {
      await updateUser(this.chosenUser, newUser)
    },
    roleIdToRole(roleId: number) {
      return this.roles.length !== 0
        ? this.roles[Role.parse(roleId - 1)]
        : {}
    }
  }
})

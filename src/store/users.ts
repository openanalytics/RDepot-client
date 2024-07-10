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

import { defineStore } from 'pinia'
import {
  fetchRoles,
  fetchUsers,
  updateUser,
  fetchAllUsers,
  fetchFullUsersList,
  fetch
} from '@/services/usersServices'
import { EntityModelUserDto, RoleDto } from '@/openapi'
import { Role } from '@/enum/UserRoles'
import { usePagination } from '@/store/pagination'
import {
  defaultValues,
  UsersFiltration
} from '@/models/Filtration'
import { DataTableOptions } from '@/models/DataTableOptions'

interface State {
  userToken: string
  userName: string
  users: EntityModelUserDto[]
  chosenUser: EntityModelUserDto
  filtration: UsersFiltration
  roles: RoleDto[]
  loading: boolean
  totalNumber: number
}

export const useUserStore = defineStore('userStore', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      users: [],
      chosenUser: {},
      filtration: defaultValues(UsersFiltration),
      roles: [],
      loading: false,
      totalNumber: 0
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
    async fetchUsersPage(options: DataTableOptions) {
      this.loading = true
      const [users, pageData] = await fetch(
        this.filtration,
        options.page - 1,
        options.itemsPerPage,
        options.sortBy[0].key +
          ',' +
          options.sortBy[0].order
      )
      this.totalNumber = pageData.totalNumber
      this.loading = false
      this.users = users
    },
    async fetchUsers() {
      const pagination = usePagination()
      const [users, pageData] = await fetchUsers(
        pagination.fetchPage,
        pagination.pageSize,
        this.filtration
      )
      this.users = users
      pagination.newPageWithoutRefresh(pageData.page)
      pagination.totalNumber = pageData.totalNumber
    },
    async fetchAllUsers() {
      const pagination = usePagination()
      const [users, pageData] = await fetchAllUsers(
        pagination.fetchPage,
        pagination.pageSize,
        undefined
      )
      this.users = users
      pagination.newPageWithoutRefresh(pageData.page)
      pagination.totalNumber = pageData.totalNumber
    },
    async fetchUsersList(page: number, pageSize = 3) {
      const [repositories, pageData] =
        await fetchFullUsersList(
          page,
          pageSize,
          this.filtration
        )
      this.users = repositories
      return pageData
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
    setFiltrationByName(payload: string | undefined) {
      this.clearFiltration()
      this.filtration.search = payload
    },
    clearFiltration() {
      const pagination = usePagination()
      pagination.resetPage()
      this.filtration = defaultValues(UsersFiltration)
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

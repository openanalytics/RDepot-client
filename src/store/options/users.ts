/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
  updateUser,
  fetchUsersService
} from '@/services/usersServices'
import { EntityModelUserDto, RoleDto } from '@/openapi'
import { Role } from '@/enum/UserRoles'
import {
  defaultValues,
  UsersFiltration
} from '@/models/Filtration'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useUtilities } from '@/composable/utilities'
import { useOATable } from '@/store/setup/oatable'

const { deepCopy } = useUtilities()

interface State {
  userToken: string
  userName: string
  users: EntityModelUserDto[]
  pending: EntityModelUserDto[]
  chosenUser: EntityModelUserDto
  filtration: UsersFiltration
  roles: RoleDto[]
  loading: boolean
  totalNumber: number
  tableOptions?: DataTableOptions
}

export const useUserStore = defineStore('userStore', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      users: [],
      pending: [],
      chosenUser: {},
      filtration: defaultValues(UsersFiltration),
      roles: [],
      loading: false,
      totalNumber: 0,
      tableOptions: undefined
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
    async getPage(options?: DataTableOptions) {
      if (options) {
        this.tableOptions = options
      }
      this.loading = true
      const sortField =
        this.tableOptions?.sortBy[0].key || 'login'
      const sortOrder =
        this.tableOptions?.sortBy[0].order || 'asc'
      const [users, pageData] = await fetchUsersService(
        this.filtration,
        (this.tableOptions?.page || 1) - 1,
        this.tableOptions?.itemsPerPage ||
          useOATable().pageSize,
        [sortField + ',' + sortOrder]
      )
      this.totalNumber = pageData.totalNumber
      this.loading = false
      this.users = users
    },
    async getList(page: number, pageSize = 3) {
      const filtration = deepCopy(this.filtration)
      filtration.active = undefined
      const [users, pageData] = await fetchUsersService(
        this.filtration,
        page,
        pageSize,
        ['name,asc'],
        false
      )
      this.users = users
      return pageData
    },
    async getRoles() {
      if (this.roles.length === 0) {
        const [roles] = await fetchRoles()
        this.roles = roles
      }
    },
    async save(newUser: EntityModelUserDto, fetch = true) {
      this.pending.push(this.chosenUser)
      try {
        const response = await updateUser(
          this.chosenUser,
          newUser
        )
        if (fetch) {
          this.getPage()
        }
        return response
      } finally {
        this.pending = this.pending.filter(
          (item) => item.id != this.chosenUser.id
        )
      }
    },
    async setFiltration(payload: UsersFiltration) {
      if (UsersFiltration.safeParse(payload).success) {
        this.filtration = UsersFiltration.parse(payload)
      }
      await this.getPage()
    },
    setFiltrationBy(filtration: object) {
      this.clearFiltration()
      this.filtration = {
        ...defaultValues(UsersFiltration),
        ...(filtration as UsersFiltration)
      }
    },
    clearFiltration() {
      this.filtration = defaultValues(UsersFiltration)
    },
    roleIdToRole(roleId: number) {
      return this.roles.length !== 0
        ? this.roles[Role.parse(roleId - 1)]
        : {}
    }
  }
})

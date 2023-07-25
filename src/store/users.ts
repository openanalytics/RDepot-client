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
  getMyData,
  updateUser
} from '@/services/users_services'
import { EntityModelUserDto, RoleDto } from '@/openapi'
import { usePaginationStore } from './pagination'
import { Role } from '@/enum/UserRoles'

interface State {
  userToken: string
  userName: string
  loginType: LoginType
  userList: EntityModelUserDto[]
  chosenUser: EntityModelUserDto
  roles: RoleDto[]
  me: EntityModelUserDto
}

export const useUserStore = defineStore('user_store', {
  state: (): State => {
    return {
      userToken: '',
      userName: '',
      loginType: 'DEFAULT',
      userList: [],
      chosenUser: {},
      roles: [],
      me: {}
    }
  },
  actions: {
    chooseLoginType(payload: LoginType) {
      this.loginType = payload
    },
    async fetchUsers() {
      const pagination = usePaginationStore()
      const [users, pageInfo] = await fetchUsers()
      this.userList = users
      pagination.setPage(pageInfo.page)
      pagination.setTotalNumber(pageInfo.totalNumber)
    },
    async fetchRoles() {
      if (this.roles.length === 0) {
        const [roles] = await fetchRoles()
        this.roles = roles
      }
    },

    checkRoles(role: string | undefined) {
      if (
        this.me.role != role &&
        this.me.role != undefined
      ) {
        alert('change role ' + role)
        return false
      }
      return true
    },

    async getUserInfo() {
      const [me] = await getMyData()
      if (me) {
        if (this.checkRoles(me.role)) {
          this.me = me
        } else {
          alert('logout!')
        }
      }
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

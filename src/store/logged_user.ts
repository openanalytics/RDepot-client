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

import { Role } from '@/enum/UserRoles'
import {
  defineAbilityFor,
  Ability,
  Action,
  Subject
} from '@/plugins/casl'
import { defineStore } from 'pinia'

interface State {
  userToken: string
  userLogin: string
  userRole: Role
  userId: number
  ability: Ability
}

export const useLoggedUserStore = defineStore(
  'logged_user',
  {
    state: (): State => {
      return {
        userToken: '',
        userLogin: '',
        userRole: Role.enum.admin,
        userId: 8,
        ability: defineAbilityFor(Role.enum.admin)
      }
    },
    actions: {
      change_user(
        token: string,
        login: string,
        role: Role,
        id: number
      ) {
        this.userToken = token
        this.userLogin = login
        this.userRole = role
        this.userId = id
        const { rules } = defineAbilityFor(this.userRole)
        this.ability.update(rules)
      },
      can(action: Action, subject: Subject): boolean {
        return this.ability.can(action, subject)
      }
    }
  }
)

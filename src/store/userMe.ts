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
import { getMyData } from '@/services/logged_user_service'
import { defineStore } from 'pinia'
import { useAuthorizationStore } from './authorization'
import {
  defineAbilityFor,
  Ability,
  Action,
  Subject
} from '@/plugins/casl'
import { Role, stringToRole } from '@/enum/UserRoles'

interface State {
  me: EntityModelUserDto
  ability?: Ability
  userRole?: Role
}

export const useMeStore = defineStore('meStore', {
  state: (): State => {
    return {
      me: {},
      ability: undefined,
      userRole: undefined
    }
  },
  actions: {
    checkRoles(role: string | undefined) {
      if (
        this.me.role != role &&
        this.me.role != undefined
      ) {
        if (role) {
          alert(
            'role has changed from ' +
              this.me.role +
              ' to ' +
              role
          )
        }
        return false
      }
      return true
    },

    async getUserInfo() {
      const authorizationStore = useAuthorizationStore()
      const [me] = await getMyData()
      if (me) {
        if (me.role) {
          this.ability = defineAbilityFor(
            stringToRole(me.role)
          )
          this.userRole = stringToRole(me.role)
        }
        if (this.checkRoles(me.role)) {
          this.me = me
          authorizationStore.getUserSettings()
        } else {
          authorizationStore.logout()
        }
      }
    },
    can(action: Action, subject: Subject): boolean {
      if (
        this.me &&
        typeof this.ability?.can !== 'function'
      ) {
        this.ability = defineAbilityFor(
          stringToRole(this.me.role || '')
        )
      }
      return this.ability
        ? this.ability?.can(action, subject)
        : false
    }
  },
  persist: true
})

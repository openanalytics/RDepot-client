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

import { useUtilities } from '@/composable/utilities'
import { Role } from '@/enum/UserRoles'
import { EntityModelUserDto } from '@/openapi'
import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import {
  defineAbilityFor,
  Ability,
  Action,
  Subject
} from '@/plugins/casl'
import {
  getMyData,
  updateUserSettings
} from '@/services/logged_user_service'
import { defineStore } from 'pinia'

interface State {
  userToken: string
  userLogin: string
  userRole: Role
  userId: number
  ability: Ability
  me: EntityModelUserDto
}

export const useLoggedUserStore = defineStore(
  'logged_user',
  {
    state: (): State => {
      return {
        userToken: import.meta.env.VITE_ADMIN_TOKEN,
        userLogin: 'einstein',
        userRole: Role.enum.admin,
        userId: 8,
        ability: defineAbilityFor(Role.enum.admin),
        me: {}
      }
    },

    actions: {
      async updateSettings(
        old_settings: UserSettingsProjection,
        new_settings: UserSettingsProjection
      ) {
        await updateUserSettings(
          old_settings,
          new_settings,
          this.me
        )
        const [me] = await getMyData()
        this.me = me
      },

      getDefaultSettings(): UserSettingsProjection {
        return {
          language: 'en',
          theme: 'dark',
          pageSize: 10
        } as UserSettingsProjection
      },

      getCurrentSettings(): UserSettingsProjection {
        const { deepCopy } = useUtilities()
        return deepCopy(
          this.me.userSettings || this.getDefaultSettings()
        )
      },

      checkRoles(role: string | undefined) {
        if (
          this.me.role != role &&
          this.me.role != undefined
        ) {
          alert(
            'role has changed from ' +
              this.me.role +
              'to ' +
              role
          )
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
            this.logout()
          }
        }
      },

      async logout() {
        this.$reset()
        //perform logout action
        alert('logout!')
      },

      changeUser(
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

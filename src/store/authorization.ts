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

import { useSimpleAuthorization } from '@/composable/auth/simpleAuthorization'
import { useUserSettings } from '@/composable/user/userSettings'
import { useUtilities } from '@/composable/utilities'
import { LoginType } from '@/enum/LoginType'
import { Role, stringToRole } from '@/enum/UserRoles'
import { Login } from '@/models/users/Login'
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
import { authService } from '@/plugins/oauth'
import router from '@/plugins/router'
import { useOICDAuthorization } from '@/composable/auth/oicdAuthorization'
import { useConfigStore } from './config'
import { useMeStore } from './userMe'

interface State {
  userToken: string
  userLogin: string
  userId: number
  loginType: LoginType
  sidebar: boolean
}

export const useAuthorizationStore = defineStore(
  'authorizationStore',
  {
    state: (): State => {
      return {
        userToken: '',
        userLogin: '',
        userId: 8,
        loginType: LoginType.Enum.OICD,
        sidebar: false
      }
    },

    actions: {
      async postLoginOperations() {
        const configStore = useConfigStore()
        const meStore = useMeStore()
        await meStore.getUserInfo()
        configStore.fetchConfiguration()
      },

      async login() {
        this.chooseLoginType(LoginType.Enum.OICD)
        authService.login().finally(async () => {
          await this.postLoginOperations()
        })
      },

      async simpleLogin(data: Login) {
        const { login } = useSimpleAuthorization()
        this.chooseLoginType(LoginType.Enum.SIMPLE)
        await login(data).then(async (token) => {
          this.userToken = token
          await this.postLoginOperations()
          router.push({ name: 'packages' })
        })
      },

      async logout() {
        if (this.loginType == LoginType.Enum.OICD) {
          authService.logout()
        }
        const { logout } = useSimpleAuthorization()
        logout()
        this.$reset()
        await router.push({ name: 'login' })
        const meStore = useMeStore()
        meStore.ability = undefined
        meStore.userRole = undefined
      },

      async isUserLoggedIn(): Promise<boolean> {
        this.getTokenFromLocalStorage()
        const { isUserLoggedInOICD } =
          useOICDAuthorization()
        const { isSimpleAuthAvailable } =
          useSimpleAuthorization()
        return (
          (await isUserLoggedInOICD()) ||
          (isSimpleAuthAvailable() && this.userToken != '')
        )
      },

      getTokenFromLocalStorage() {
        const {
          getTokenFromLocalStorage,
          isSimpleAuthAvailable
        } = useSimpleAuthorization()
        if (isSimpleAuthAvailable()) {
          this.userToken = getTokenFromLocalStorage()
        }
      },

      getUserSettings() {
        const { getUserSettings } = useUserSettings()
        getUserSettings()
      },

      chooseLoginType(payload: LoginType) {
        this.$reset()
        this.loginType = payload
      },
      async updateSettings(
        oldSettings: UserSettingsProjection,
        newSettings: UserSettingsProjection
      ) {
        const meStore = useMeStore()
        await updateUserSettings(
          oldSettings,
          newSettings,
          meStore.me
        )
        const [me] = await getMyData()
        meStore.me = me
      },

      getDefaultSettings(): UserSettingsProjection {
        return {
          language: 'en',
          theme: 'dark',
          pageSize: 10
        } as UserSettingsProjection
      },

      getCurrentSettings(): UserSettingsProjection {
        const meStore = useMeStore()
        const { deepCopy } = useUtilities()
        return deepCopy(
          meStore.me.userSettings ||
            this.getDefaultSettings()
        )
      },

      // checkRoles(role: string | undefined) {
      //   if (
      //     this.me.role != role &&
      //     this.me.role != undefined
      //   ) {
      //     if (role) {
      //       alert(
      //         'role has changed from ' +
      //           this.me.role +
      //           ' to ' +
      //           role
      //       )
      //     }
      //     return false
      //   }
      //   return true
      // },

      // async getUserInfo() {
      //   const [me] = await getMyData()
      //   if (me) {
      //     if (me.role) {
      //       this.ability = defineAbilityFor(
      //         stringToRole(me.role)
      //       )
      //       this.userRole = stringToRole(me.role)
      //     }
      //     if (this.checkRoles(me.role)) {
      //       this.me = me
      //       this.getUserSettings()
      //     } else {
      //       this.logout()
      //     }
      //   }
      // },

      // can(action: Action, subject: Subject): boolean {
      //   return this.ability
      //     ? this.ability?.can(action, subject)
      //     : false
      // },

      hideSidebar(value: boolean) {
        this.sidebar = !value
      }
    }
  }
)

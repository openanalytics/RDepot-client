/*
 * R Depot
 *
 * Copyright (C) 2012-2026 Open Analytics NV
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
import {
  getMyData,
  updateUserSettings
} from '@/services/loggedUserService'
import { defineStore } from 'pinia'
import { authService } from '@/plugins/oauth'
import router from '@/plugins/router'
import { useOIDCAuthorization } from '@/composable/auth/oidcAuthorization'
import { useConfigStore } from './config'
import { RouteRecordName } from 'vue-router'
import { useCommonStore } from './common'
import {
  EntityModelUserDto,
  UserSettingsProjection
} from '@/openapi'
import vuetify from '@/plugins/vuetify'
import { useNotificationStore } from './notifications'
import { usePermissions } from '@/composable/authorities/userAuthorities'

interface State {
  userToken: string
  userLogin: string
  userId: number
  loginType: LoginType
  me: EntityModelUserDto
  userRole?: Role
  redirectUrl: string
}

export const useAuthorizationStore = defineStore(
  'authorizationStore',
  {
    state: (): State => {
      return {
        userToken: '',
        userLogin: '',
        userId: 8,
        loginType: LoginType.Enum.OIDC,
        me: {},
        userRole: undefined,
        redirectUrl: ''
      }
    },

    actions: {
      async postLoginOperations() {
        await this.getUserInfo()
        vuetify.theme.change(
          this.me.userSettings?.theme || 'system'
        )
        const commonStore = useCommonStore()
        commonStore.closeOverlay()
        const configStore = useConfigStore()
        configStore.fetchConfiguration()
        await this.redirectFromLogin()
      },

      async redirectFromLogin() {
        if (this.redirectUrl) {
          const localRedirectUrl = this.redirectUrl
          this.redirectUrl = ''
          await router.push({ path: localRedirectUrl })
        } else {
          await router.push({
            name: this.redirectUrl || 'packages'
          })
        }
      },

      postLoginAsyncOperations() {
        localStorage.setItem('shouldNotifyEvents', 'true')
        const notificationStore = useNotificationStore()
        notificationStore.getNotifications()
      },

      async login() {
        this.chooseLoginType(LoginType.Enum.OIDC)
        await authService.login()
        await this.redirectFromLogin()
      },

      async simpleLogin(data: Login) {
        const { login } = useSimpleAuthorization()
        this.chooseLoginType(LoginType.Enum.SIMPLE)
        await login(data).then(async (token) => {
          this.userToken = token
          await this.postLoginOperations()
          this.postLoginAsyncOperations()
        })
      },

      async logout() {
        if (this.loginType == LoginType.Enum.OIDC) {
          authService.logout()
        }
        const { logout } = useSimpleAuthorization()
        logout()
        this.$reset()
        await router.push({ name: 'login' })
        this.userRole = undefined
        this.me = {}
        localStorage.removeItem('authorizationStore')
        localStorage.removeItem(
          'notificationStore.shouldNotifyEvents'
        )
      },

      async isUserLoggedIn(): Promise<boolean> {
        this.getTokenFromLocalStorage()
        const { isUserLoggedInOIDC } =
          useOIDCAuthorization()
        const { isSimpleAuthAvailable } =
          useSimpleAuthorization()
        return (
          (await isUserLoggedInOIDC()) ||
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
        const localRedirectUrl = this.redirectUrl
        this.$reset()
        this.redirectUrl = localRedirectUrl
        this.loginType = payload
        this.$patch({ redirectUrl: localRedirectUrl })
      },
      async updateSettings(
        oldSettings: UserSettingsProjection,
        newSettings: UserSettingsProjection
      ) {
        await updateUserSettings(
          oldSettings,
          newSettings,
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

      checkUserAbility(pathName: RouteRecordName) {
        const { has } = usePermissions()
        switch (pathName) {
          case 'events':
            return has('event.list')
          case 'addSubmission':
            return has('submission.list')
          case 'packageMaintainers':
            return has('packageMaintainer.list')
          case 'repositoryMaintainers':
            return has('repositoryMaintainer.list')
          case 'users':
            return has('user.list')
          default:
            return true
        }
      },

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
        const [me] = await getMyData()
        if (me) {
          if (me.role) {
            this.userRole = stringToRole(me.role)
          }
          if (this.checkRoles(me.role)) {
            this.me = me
            this.getUserSettings()
          } else {
            this.logout()
          }
        }
      }
    },
    persist: true
  }
)

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

import {
  EntityModelAccessTokenDto,
  CreateAccessTokenDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  TokensFiltration,
  defaultValues
} from '@/models/Filtration'
import {
  fetchTokens,
  createToken,
  deleteToken,
  editToken,
  deactivateToken
} from '@/services/settings_services'
import { useUtilities } from '@/composable/utilities'
import { validatedData } from '@/services/open_api_access'
import { usePagination } from '@/store/pagination'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { OverlayEnum } from '@/enum/Overlay'
import { UserSettingsProjection } from '@/openapi/models/user-settings-projection'
import { useMeStore } from './me'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelAccessTokenDto>>
  packageBag: File
  state: string
  error: string[]
  response?: validatedData<EntityModelAccessTokenDto>
}

interface State {
  promises: PackagePromise[]
  tokens: EntityModelAccessTokenDto[]
  filtration: TokensFiltration
  changes: boolean
  pageSize: number
  newToken?: string
  currentToken: EntityModelAccessTokenDto
  newSettings?: UserSettingsProjection
}

const { deepCopy } = useUtilities()

export const useSettingsStore = defineStore(
  'settingsStore',
  {
    state: (): State => {
      return {
        promises: [],
        tokens: [],
        filtration: defaultValues(TokensFiltration),
        changes: false,
        pageSize: 0,
        newToken: '',
        currentToken: {},
        newSettings: undefined
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(defaultValues(TokensFiltration))
        )
      }
    },
    actions: {
      async fetchTokens() {
        const pagination = usePagination()
        const meStore = useMeStore()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          this.filtration,
          meStore.me.id
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: TokensFiltration,
        user_id?: number,
        showProgress = true
      ) {
        const [tokens, pageData] = await fetchTokens(
          filtration,
          user_id,
          page,
          pageSize,
          showProgress
        )
        this.tokens = tokens
        return pageData
      },
      async setFiltration(payload: TokensFiltration) {
        const pagination = usePagination()
        pagination.resetPage()
        if (TokensFiltration.safeParse(payload).success) {
          this.filtration = TokensFiltration.parse(payload)
        }
        await this.fetchTokens()
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltration')
        )
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(TokensFiltration)
      },
      setChosenToken(payload: EntityModelAccessTokenDto) {
        this.currentToken = payload
        this.saveToken()
      },
      saveToken() {
        this.tokens = this.tokens.map(
          (token: EntityModelAccessTokenDto) => {
            if (token.id == this.currentToken.id) {
              return this.currentToken
            }
            return token
          }
        )
      },

      saveChanges() {
        this.changes = false
        this.newSettings = undefined
      },
      fetchSettings() {},
      resetNewToken() {
        setTimeout(() => (this.newToken = ''), 200)
      },
      async createToken(newToken: CreateAccessTokenDto) {
        await createToken(newToken)?.then(
          async (success) => {
            if (success) {
              const commonStore = useCommonStore()
              commonStore.setOverlayModel(false)
              this.newToken = success[0].value
              commonStore.openOverlay(
                OverlayEnum.enum.Created
              )
              await this.fetchTokens()
            }
          }
        )
      },

      async deleteToken() {
        if (this.currentToken?.id) {
          await deleteToken(this.currentToken.id).then(
            async () => {
              const toast = useToast()
              toast.success(
                i18n.t('settings.message.deleted')
              )
              const commonStore = useCommonStore()
              commonStore.setOverlayModel(false)
              await this.fetchTokens()
            }
          )
        }
        this.currentToken = {}
      },

      async editToken(
        oldToken: EntityModelAccessTokenDto,
        newValues: Partial<EntityModelAccessTokenDto>
      ) {
        const newToken = {
          ...deepCopy(oldToken),
          ...newValues
        }
        await editToken(oldToken, newToken)?.then(
          async (success) => {
            if (success) {
              const toast = useToast()
              toast.success(
                i18n.t('settings.message.edited')
              )
              await this.fetchTokens()
            }
          }
        )
      },

      async deactivateToken(
        oldToken: EntityModelAccessTokenDto,
        newValues: Partial<EntityModelAccessTokenDto>
      ) {
        const newToken = {
          ...deepCopy(oldToken),
          ...newValues
        }
        await deactivateToken(oldToken, newToken)?.then(
          async (success) => {
            if (success) {
              const toast = useToast()
              toast.success(
                i18n.t('settings.message.deactivated')
              )
              const commonStore = useCommonStore()
              commonStore.setOverlayModel(false)
              await this.fetchTokens()
            }
          }
        )
      }
    }
  }
)

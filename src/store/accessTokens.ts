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
  createToken,
  deleteToken,
  editToken,
  deactivateToken,
  fetch
} from '@/services/settingsServices'
import { useUtilities } from '@/composable/utilities'
import { validatedData } from '@/services/openApiAccess'
import { usePagination } from '@/store/pagination'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { OverlayEnum } from '@/enum/Overlay'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'

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
  newToken?: string
  currentToken: EntityModelAccessTokenDto
  loading: boolean
  totalNumber: number
}

const { deepCopy } = useUtilities()

export const useAccessTokensStore = defineStore(
  'accessTokensStore',
  {
    state: (): State => {
      return {
        promises: [],
        tokens: [],
        filtration: defaultValues(TokensFiltration),
        newToken: '',
        currentToken: {},
        loading: false,
        totalNumber: 0
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
      async getPage(options: DataTableOptions) {
        this.loading = true
        const [tokens, pageData] = await fetch(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          [
            options.sortBy[0].key +
              ',' +
              options.sortBy[0].order
          ]
        )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.tokens = tokens
      },
      async get() {
        const pagination = usePagination()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          this.filtration
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: TokensFiltration,
        showProgress = true
      ) {
        const sort = useSortStore()
        let sortBy = sort.getSortBy()
        if (sort.field == 'name') {
          sortBy = ['name,' + sort.direction]
        }
        const [tokens, pageData] = await fetch(
          filtration,
          page,
          pageSize,
          sortBy,
          showProgress
        )
        this.tokens = tokens
        return pageData
      },
      async delete() {
        if (this.currentToken?.id) {
          await deleteToken(this.currentToken.id).then(
            async () => {
              const toast = useToast()
              toast.success(
                i18n.t('settings.message.deleted')
              )
              const commonStore = useCommonStore()
              commonStore.closeOverlay()
              await this.get()
            }
          )
        }
        this.currentToken = {}
      },
      async patch(
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
              await this.get()
            }
          }
        )
      },
      async create(newToken: CreateAccessTokenDto) {
        await createToken(newToken)?.then(
          async (success) => {
            if (success) {
              const commonStore = useCommonStore()
              commonStore.closeOverlay()
              this.newToken = success[0].value
              commonStore.openOverlay(
                OverlayEnum.enum.Created
              )
              await this.get()
            }
          }
        )
      },
      async deactivate(
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
              commonStore.closeOverlay()
              await this.get()
            }
          }
        )
      },
      reset() {
        setTimeout(() => (this.newToken = ''), 200)
      },
      setChosen(payload: EntityModelAccessTokenDto) {
        this.currentToken = payload
        this.save()
      },
      save() {
        this.tokens = this.tokens.map(
          (token: EntityModelAccessTokenDto) => {
            if (token.id == this.currentToken.id) {
              return this.currentToken
            }
            return token
          }
        )
      },
      async setFiltration(payload: TokensFiltration) {
        const pagination = usePagination()
        pagination.resetPage()
        if (TokensFiltration.safeParse(payload).success) {
          this.filtration = TokensFiltration.parse(payload)
        }
        await this.get()
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltration')
        )
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(TokensFiltration)
      }
    }
  }
)

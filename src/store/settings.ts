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

import {
  EntityModelAccessTokenDto,
  CreateAccessTokenDto
} from '@/openapi'
import { defineStore } from 'pinia'
import { useAuthorizationStore } from '@/store/authorization'
import {
  TokensFiltration,
  defaultValues
} from '@/models/Filtration'
import {
  fetchTokens,
  createToken,
  deleteToken
} from '@/services/settings_services'
import { useUtilities } from '@/composable/utilities'
import { validatedData } from '@/services/open_api_access'
import { usePagination } from '@/store/pagination'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

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
  showModal: boolean
  showCreatedModal: boolean
  showDeleteModal: boolean
  showEditModal: boolean
  pageSize: number
  newToken?: string
  currentToken?: EntityModelAccessTokenDto
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
        showModal: false,
        showCreatedModal: false,
        showDeleteModal: false,
        showEditModal: false,
        pageSize: 0,
        newToken: ''
        // currentToken: undefined
      }
    },
    actions: {
      async fetchTokens() {
        const pagination = usePagination()
        const authorizationStore = useAuthorizationStore()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          this.filtration,
          authorizationStore.me.id
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

      // async updateSubmission(
      //   oldSubmission: EntityModelSubmissionDto,
      //   newValues: Partial<EntityModelSubmissionDto>
      // ) {
      //   const newSubmission = {
      //     ...deepCopy(oldSubmission),
      //     ...newValues
      //   }
      //   await updateSubmission(
      //     oldSubmission,
      //     newSubmission
      //   ).then(async () => {
      //     await this.fetchSubmissions()
      //   })
      // },
      // async addSubmissionRequests() {
      //   this.promises = this.packages.map((packageBag) => {
      //     return {
      //       promise: addSubmission(
      //         this.repository?.name!,
      //         this.repository?.technology!,
      //         packageBag,
      //         !this.getGenerateManualForPackage(packageBag)
      //       ),
      //       packageBag: packageBag,
      //       state: 'pending',
      //       error: [],
      //       response: undefined
      //     }
      //   })
      //   let fulfilled = 0
      //   this.promises.forEach(async (promise) => {
      //     await promise.promise
      //       .then((response) => {
      //         promise.response = response
      //         promise.state = 'success'
      //       })
      //       .catch((err) => {
      //         promise.state = 'error'
      //         promise.error = err.response.data.data
      //       })
      //       .finally(() => {
      //         if (++fulfilled == this.promises.length) {
      //           this.resolved = true
      //         }
      //       })
      //   })
      // },

      saveChanges() {
        this.changes = false
      },
      fetchSettings() {},
      resetNewToken() {
        this.newToken = ''
      },
      async createToken(newToken: CreateAccessTokenDto) {
        await createToken(newToken)?.then(
          async (success) => {
            if (success) {
              this.showModal = false
              const commonStore = useCommonStore()
              this.newToken = success[0].value
              this.showCreatedModal = true
              commonStore.setOverlayModel(true)
              await this.fetchTokens()
            }
          }
        )
      },

      openDeleteModal(token: EntityModelAccessTokenDto) {
        this.currentToken = token
        this.showDeleteModal = true
        const commonStore = useCommonStore()
        commonStore.setOverlayModel(true)
      },
      async deleteToken() {
        if (this.currentToken?.id) {
          await deleteToken(this.currentToken.id).then(
            async () => {
              const toast = useToast()
              toast.success(
                i18n.t('settings.message.deleted')
              )
              this.showDeleteModal = false
              const commonStore = useCommonStore()
              commonStore.setOverlayModel(false)
              await this.fetchTokens()
            }
          )
        }
        this.currentToken = undefined
      },
      async editToken() {
        //TODO get actual token with modified name and update it
      }
    }
  }
)

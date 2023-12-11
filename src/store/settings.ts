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

import { EntityModelSubmissionDto } from '@/openapi'
import { defineStore } from 'pinia'
import { Token } from '@/models/Token'
import { useAuthorizationStore } from '@/store/authorization'
import {
  addSubmission,
  fetchSubmissions,
  updateSubmission
} from '@/services/submission_services'
import { useUtilities } from '@/composable/utilities'
import { validatedData } from '@/services/open_api_access'
import { usePagination } from '@/store/pagination'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelSubmissionDto>>
  packageBag: File
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
}

interface State {
  promises: PackagePromise[]
  tokens: EntityModelSubmissionDto[]
  changes: boolean
  showModal: boolean
  showCreatedModal: boolean
  showDeactivateModal: boolean
  showEditModal: boolean
  pageSize: number
  newToken: string
  currentToken?: Token
}

const { deepCopy } = useUtilities()

export const useSettingsStore = defineStore(
  'settingsStore',
  {
    state: (): State => {
      return {
        promises: [],
        tokens: [],
        changes: false,
        showModal: false,
        showCreatedModal: false,
        showDeactivateModal: false,
        showEditModal: false,
        pageSize: 0,
        newToken: '',
        currentToken: undefined
      }
    },
    actions: {
      async fetchSubmissions() {
        const pagination = usePagination()
        const authorizationStore = useAuthorizationStore()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          authorizationStore.me.id
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchData(
        page: number,
        pageSize: number,
        user_id?: number,
        showProgress = true
      ) {
        const [tokens, pageData] = await fetchSubmissions(
          user_id,
          page,
          pageSize,
          showProgress
        )
        this.tokens = tokens
        return pageData
      },

      async updateSubmission(
        oldSubmission: EntityModelSubmissionDto,
        newValues: Partial<EntityModelSubmissionDto>
      ) {
        const newSubmission = {
          ...deepCopy(oldSubmission),
          ...newValues
        }
        await updateSubmission(
          oldSubmission,
          newSubmission
        ).then(async () => {
          await this.fetchSubmissions()
        })
      },
      getGenerateManualForPackage(file: File) {
        if (this.repository?.technology == 'Python')
          return true
        return !!this.generateManual.find(
          (item) => item == file
        )
      },
      setPackages(payload: File[]) {
        this.packages = payload
      },
      addPackage(payload: File) {
        this.packages = [...this.packages, payload]
      },
      async addSubmissionRequests() {
        this.promises = this.packages.map((packageBag) => {
          return {
            promise: addSubmission(
              this.repository?.name!,
              this.repository?.technology!,
              packageBag,
              !this.getGenerateManualForPackage(packageBag)
            ),
            packageBag: packageBag,
            state: 'pending',
            error: [],
            response: undefined
          }
        })
        let fulfilled = 0
        this.promises.forEach(async (promise) => {
          await promise.promise
            .then((response) => {
              promise.response = response
              promise.state = 'success'
            })
            .catch((err) => {
              promise.state = 'error'
              promise.error = err.response.data.data
            })
            .finally(() => {
              if (++fulfilled == this.promises.length) {
                this.resolved = true
              }
            })
        })
      },

      saveChanges() {
        this.changes = false
      },
      fetchSettings() {},
      resetNewToken() {
        this.newToken = ''
      },
      async createToken(payload: Token) {
        // if (EventsFiltration.safeParse(payload).success) {
        //   this.filtration = EventsFiltration.parse(payload)
        // }
        // this.page = 0
        // this.events = []
        // await this.fetchEvents()
        // TODO await response and put to this.newToken, close modal and open the modal with clipboard
      },
      async deactivateToken() {
        //TODO get actual token and deactivate it
      },
      async editToken() {
        //TODO get actual token with modified name and update it
      }
    }
  }
)

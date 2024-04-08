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
  EntityModelRepositoryDto,
  EntityModelSubmissionDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import {
  addSubmission,
  fetchSubmissions,
  updateSubmission
} from '@/services/submission_services'
import { useUtilities } from '@/composable/utilities'
import { submissionsFiltrationLabels } from '@/maps/Filtration'
import { validatedData } from '@/services/open_api_access'
import { usePagination } from '@/store/pagination'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { useMeStore } from './me'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelSubmissionDto>>
  packageBag: File
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
}

interface State {
  packages: File[]
  generateManual: File[]
  replace: File[]
  files: File[]
  promises: PackagePromise[]
  repository?: EntityModelRepositoryDto
  submissions: EntityModelSubmissionDto[]
  filtration: SubmissionsFiltration
  resolved: boolean
  stepperKey: number
}

const { deepCopy } = useUtilities()

export const useSubmissionStore = defineStore(
  'submissionStore',
  {
    state: (): State => {
      return {
        packages: [],
        files: [],
        generateManual: [],
        replace: [],
        promises: [],
        submissions: [],
        repository: undefined,
        filtration: defaultValues(SubmissionsFiltration),
        resolved: false,
        stepperKey: 0
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(
            defaultValues(SubmissionsFiltration)
          )
        )
      }
    },
    actions: {
      async fetchPageOfSubmissions(
        page: number,
        pageSize = 8
      ) {
        const meStore = useMeStore()
        const pageData = await this.fetchData(
          page,
          pageSize,
          defaultValues(SubmissionsFiltration),
          meStore.me.id,
          false
        )
        return pageData
      },
      async fetchSubmissions() {
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
        filtration: SubmissionsFiltration,
        user_id?: number,
        showProgress = true
      ) {
        const [submissions, pageData] =
          await fetchSubmissions(
            filtration,
            user_id,
            page,
            pageSize,
            showProgress
          )
        this.submissions = submissions
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
      updateReplaceOptionForPackage(file: File) {
        if (this.getReplaceForPackage(file)) {
          this.removeReplaceOptionForPackage(file)
        } else {
          this.addReplaceOptionForPackage(file)
        }
      },
      addReplaceOptionForPackage(file: File) {
        this.replace.push(file)
      },
      removeReplaceOptionForPackage(file: File) {
        this.replace = this.replace.filter(
          (item) => item !== file
        )
      },
      getReplaceForPackage(file: File) {
        return !!this.replace.find((item) => item == file)
      },
      addGenerateManualOptionForPackage(file: File) {
        this.generateManual.push(file)
      },
      removeGenerateManualOptionForPackage(file: File) {
        this.generateManual = this.generateManual.filter(
          (item) => item !== file
        )
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
      addPackages(payload: File[]) {
        payload.forEach((packageBag: File) => {
          this.packages = [...this.packages, packageBag]
        })
      },
      async setRepository(
        payload: EntityModelRepositoryDto
      ) {
        this.repository = payload
      },
      async setFiltration(payload: SubmissionsFiltration) {
        const pagination = usePagination()
        pagination.resetPage()
        if (
          SubmissionsFiltration.safeParse(payload).success
        ) {
          this.filtration =
            SubmissionsFiltration.parse(payload)
        }
        await this.fetchSubmissions()
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltration')
        )
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(
          SubmissionsFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchSubmissions()
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltrationReset')
        )
      },
      updateStepperKey() {
        this.stepperKey += 1
        if (this.stepperKey > 100) {
          this.stepperKey = 0
        }
      },
      async addSubmissionRequests() {
        this.promises = this.packages.map((packageBag) => {
          return {
            promise: addSubmission(
              this.repository?.name!,
              this.repository?.technology!,
              packageBag,
              !this.getGenerateManualForPackage(packageBag),
              this.getReplaceForPackage(packageBag)
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
      getLabels() {
        return submissionsFiltrationLabels
      }
    }
  }
)

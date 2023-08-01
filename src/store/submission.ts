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
  EntityModelRepositoryDto,
  EntityModelSubmissionDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { useLoggedUserStore } from './logged_user'
import {
  addSubmission,
  fetchSubmissions,
  updateSubmission
} from '@/services/submission_services'
import { usePaginationStore } from '@/store/pagination'
import { useUtilities } from '@/composable/utilities'
import { submissionsFiltrationLabels } from '@/maps/Filtration'

export type PackagePromise = {
  promise: Promise<string[]>
  packageBag: File
  state: string
  message: string[]
}

interface State {
  packages: File[]
  generateManual: File[]
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
        generateManual: [],
        promises: [],
        submissions: [],
        repository: undefined,
        filtration: defaultValues(SubmissionsFiltration),
        resolved: false,
        stepperKey: 0
      }
    },
    actions: {
      async fetchSubmissions() {
        const loggedUserStore = useLoggedUserStore()
        const pagination = usePaginationStore()
        const [submissions, pageData] =
          await fetchSubmissions(
            this.filtration,
            loggedUserStore.userId,
            pagination.page,
            pagination.pageSize
          )
        this.submissions = submissions
        pagination.setTotalNumber(pageData.totalNumber)
        pagination.setPage(pageData.page)
      },
      async updateSubmission(
        oldSubmission: EntityModelSubmissionDto,
        newValues: Partial<EntityModelSubmissionDto>,
        textNotification: string
      ) {
        const newSubmission = {
          ...deepCopy(oldSubmission),
          ...newValues
        }
        await updateSubmission(
          oldSubmission,
          newSubmission,
          textNotification
        ).then(async (success) => {
          if (success) await this.fetchSubmissions()
        })
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
        const pagination = usePaginationStore()
        pagination.setPage(0)
        if (
          SubmissionsFiltration.safeParse(payload).success
        ) {
          this.filtration =
            SubmissionsFiltration.parse(payload)
        }
        await this.fetchSubmissions()
        notify({
          text: i18n.t('notifications.successFiltration'),
          type: 'success'
        })
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
        this.filtration = defaultValues(
          SubmissionsFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchSubmissions()
        notify({
          text: i18n.t(
            'notifications.successFiltrationReset'
          ),
          type: 'success'
        })
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
              !this.getGenerateManualForPackage(packageBag)
            ),
            packageBag: packageBag,
            state: 'pending',
            message: []
          }
        })
        let fulfilled = 0
        this.promises.forEach(async (promise) => {
          const isFulfilled = await promise.promise
          promise.message = isFulfilled
          if (
            fulfilled == 0 &&
            isFulfilled[0] == 'success'
          ) {
            promise.state = 'success'
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successCreateSubmissiom'
              )
            })
          } else if (isFulfilled[0] == 'success') {
            promise.state = 'success'
          } else {
            promise.state = 'error'
          }
          if (++fulfilled == this.promises.length) {
            this.resolved = true
          }
        })
      },
      getLabels() {
        return submissionsFiltrationLabels
      }
    }
  }
)

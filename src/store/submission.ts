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

interface State {
  packages: File[]
  repository?: EntityModelRepositoryDto
  submissions: EntityModelSubmissionDto[]
  filtration: SubmissionsFiltration
}

const { deepCopy } = useUtilities()

export const useSubmissionStore = defineStore(
  'submission_store',
  {
    state: (): State => {
      return {
        packages: [],
        submissions: [],
        repository: undefined,
        filtration: defaultValues(SubmissionsFiltration)
      }
    },
    actions: {
      async fetchSubmissions() {
        const logged_user = useLoggedUserStore()
        const pagination = usePaginationStore()
        const [submission, pageData] =
          await fetchSubmissions(
            this.filtration,
            logged_user.userId,
            pagination.page,
            pagination.pageSize
          )
        this.submissions = submission
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
      async addSubmissionRequests() {
        const promises: Promise<boolean>[] =
          this.packages.map((packageBag) =>
            addSubmission(
              this.repository?.name!,
              this.repository?.technology!,
              packageBag
            )
          )
        await Promise.all(promises)
        let fulfilled = 0
        promises.forEach(async (promise) => {
          const isFulfilled = await promise
          if (fulfilled == 0 && isFulfilled) {
            notify({
              type: 'success',
              text: i18n.t(
                'notifications.successCreateSubmissiom'
              )
            })
            fulfilled += 1
          }
        })
      },
      getLabels() {
        return submissionsFiltrationLabels
      }
    }
  }
)

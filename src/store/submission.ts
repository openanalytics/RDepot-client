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
import { validatedData } from '@/services/open_api_access'

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
      async fetchPageOfSubmissions(
        page: number,
        pageSize = 8
      ) {
        const logged_user_store = useLoggedUserStore()
        const pageData = await this.fetchData(
          page,
          pageSize,
          defaultValues(SubmissionsFiltration),
          logged_user_store.me.id,
          false
        )
        return pageData
      },
      async fetchSubmissions() {
        const logged_user_store = useLoggedUserStore()
        const pagination = usePaginationStore()
        const pageData = await this.fetchData(
          pagination.page,
          pagination.pageSize,
          this.filtration,
          logged_user_store.me.id
        )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
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
        const promises: Promise<
          validatedData<EntityModelSubmissionDto>
        >[] = this.packages.map((packageBag) =>
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

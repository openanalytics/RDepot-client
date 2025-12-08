/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import {
  fetchSubmissionsService,
  updateSubmission
} from '@/services/submissionServices'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import { useSubmissionAuthorizationCheck } from '@/composable/submissions/submissionAuthorities'
import { useOATable } from '@/store/setup/oatable'
import { PackagePromise } from '@/store/setup/uploadSubmission.ts'

export type EditSubmissions = {
  submissions: EntityModelSubmissionDto[]
  editOption: SubmissionEditOptions
  pending: boolean
  warnings?: EditSubmissionWarnings
  displayWarning?: boolean
}

export type EditSubmissionWarnings = {
  notMutableState: EntityModelSubmissionDto[]
  notAuthorizedToEditAndMutableState: EntityModelSubmissionDto[]
}

interface State {
  submissions: EntityModelSubmissionDto[]
  pending: EntityModelSubmissionDto[]
  selected: EntityModelSubmissionDto[]
  promises: PackagePromise[]
  submissionsToEdit?: EditSubmissions
  submissionsToEditWarnings?: EditSubmissionWarnings
  filtration: SubmissionsFiltration
  resolved: boolean
  loading: boolean
  totalNumber: number
  tableOptions?: DataTableOptions
  localOptions: DataTableOptions
}

const { deepCopy } = useUtilities()

export const useSubmissionStore = defineStore(
  'submissionStore',
  {
    state: (): State => {
      return {
        promises: [],
        submissions: [],
        pending: [],
        selected: [],
        submissionsToEdit: undefined,
        submissionsToEditWarnings: undefined,
        filtration: defaultValues(SubmissionsFiltration),
        resolved: false,
        loading: false,
        totalNumber: 0,
        tableOptions: undefined,
        localOptions: {
          itemsPerPage: -1,
          page: -1,
          sortBy: []
        }
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
      async getPage(options?: DataTableOptions) {
        if (options) {
          this.tableOptions = options
        }
        this.loading = true
        const sortField =
          this.tableOptions?.sortBy[0].key || 'state'
        const sortOrder =
          this.tableOptions?.sortBy[0].order || 'desc'
        const [submissions, pageData] =
          await fetchSubmissionsService(
            this.filtration,
            (this.tableOptions?.page || 1) - 1,
            this.tableOptions?.itemsPerPage ||
              useOATable().pageSize,
            [sortField + ',' + sortOrder]
          )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.submissions = submissions
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: SubmissionsFiltration,
        showProgress = false
      ) {
        const sort = useSortStore()
        let sortBy = sort.getSortBy()
        if (sort.field == 'name') {
          sortBy = ['packageBag,' + sort.direction]
        }
        const [submissions, pageData] =
          await fetchSubmissionsService(
            filtration,
            page,
            pageSize,
            sortBy,
            showProgress
          )
        this.submissions = submissions
        return pageData
      },
      async patch(
        oldSubmission: EntityModelSubmissionDto,
        newValues: Partial<EntityModelSubmissionDto>
      ) {
        this.pending.push(oldSubmission)
        const newSubmission = {
          ...deepCopy(oldSubmission),
          ...newValues
        }
        await updateSubmission(oldSubmission, newSubmission)
          .then(async (response) => {
            if (Object.keys(response[0]).length > 0) {
              await this.getPage()
            }
          })
          .finally(() => {
            this.pending = this.pending.filter(
              (item) => item.id != oldSubmission.id
            )
          })
      },

      prepareToEdit(editOption: SubmissionEditOptions) {
        const { getSubmissionsWarnings } =
          useSubmissionAuthorizationCheck()
        this.submissionsToEdit = {
          submissions: this.selected,
          editOption: editOption,
          pending: false,
          warnings: getSubmissionsWarnings(
            this.selected,
            editOption
          ),
          displayWarning: false
        }
      },
      async edit() {
        const { editSubmission } = useSubmissionActions()
        const toasts = useToast()
        if (this.submissionsToEdit) {
          this.submissionsToEdit.pending = true
          const promises =
            this.submissionsToEdit.submissions.map(
              (submission) => {
                this.pending.push(submission)
                return {
                  promise: editSubmission(
                    submission,
                    this.submissionsToEdit?.editOption
                  ),
                  packageBag: submission,
                  state: 'pending',
                  error: [],
                  response: undefined
                }
              }
            ) || []
          let fulfilled = 0
          let errors = 0
          promises.forEach(async (promise) => {
            await promise.promise

              .catch((err) => {
                promise.state = 'error'
                if (err.response?.data.data) {
                  errors++
                  promise.error = err.response.data.data
                  toasts.error(
                    `${promise.packageBag?.packageBag?.name} - ${err.response.data.data}`
                  )
                } else if (err.response?.data) {
                  errors++
                  promise.error = err.response.data
                  toasts.error(
                    `${promise.packageBag?.packageBag?.name} - ${err.response.data.data}`
                  )
                }
              })
              .finally(() => {
                this.pending = this.pending.filter(
                  (submission) =>
                    submission.id != promise.packageBag.id
                )
                if (++fulfilled == promises.length) {
                  this.resolved = true
                  const actionType =
                    this.submissionsToEdit?.editOption ===
                    SubmissionEditOptions.enum.download
                      ? 'Downloaded'
                      : 'Edited'
                  if (errors > 0) {
                    toasts.warning(
                      `${actionType} ${
                        fulfilled - errors
                      } submissions, failed with edition of ${errors} packages`
                    )
                  } else {
                    toasts.success(
                      `${actionType} all selected and available submissions`
                    )
                  }
                  this.resolved = true
                  this.selected = []
                  if (this.submissionsToEdit) {
                    this.submissionsToEdit.displayWarning =
                      true
                    this.submissionsToEdit.submissions = []
                    this.submissionsToEdit.pending = false
                  }
                  this.getPage()
                }
              })
          })
        }
      },
      async setFiltration(payload: SubmissionsFiltration) {
        if (
          SubmissionsFiltration.safeParse(payload).success
        ) {
          this.filtration =
            SubmissionsFiltration.parse(payload)
        }
        await this.getPage()
      },
      clearFiltration() {
        this.filtration = defaultValues(
          SubmissionsFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.getPage()
      }
    }
  }
)

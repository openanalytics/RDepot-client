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
  fetchSubmissionsService,
  updateSubmission,
  getRConfiguration
} from '@/services/submissionServices'
import { useUtilities } from '@/composable/utilities'
import { validatedData } from '@/services/openApiAccess'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import { useSubmissionAuthorizationCheck } from '@/composable/submissions/submissionAuthorities'
import { Technologies } from '@/enum/Technologies'
import { useOATable } from '@/store/setup/oatable'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelSubmissionDto>>
  packageBag?: File
  entity?: EntityModelSubmissionDto
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
  messageCode?: string
}

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
  packages: File[]
  generateManual: File[]
  replace: File[]
  binary: File[]
  notes: File[]
  rversion: { file: File; version: string }[]
  distribution: { file: File; distribution: string }[]
  architecture: { file: File; architecture: string }[]
  note: { file: File; note: string }[]
  files: File[]
  promises: PackagePromise[]
  repository?: EntityModelRepositoryDto
  submissions: EntityModelSubmissionDto[]
  pending: EntityModelSubmissionDto[]
  selected: EntityModelSubmissionDto[]
  submissionsToEdit?: EditSubmissions
  submissionsToEditWarnings?: EditSubmissionWarnings
  filtration: SubmissionsFiltration
  resolved: boolean
  stepperKey: number
  loading: boolean
  totalNumber: number
  allowedRVersions?: string[]
  allowedDistributions?: string[]
  allowedArchitectures?: string[]
  tableOptions?: DataTableOptions
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
        binary: [],
        notes: [],
        rversion: [],
        distribution: [],
        architecture: [],
        note: [],
        promises: [],
        submissions: [],
        pending: [],
        selected: [],
        submissionsToEdit: undefined,
        submissionsToEditWarnings: undefined,
        repository: undefined,
        filtration: defaultValues(SubmissionsFiltration),
        resolved: false,
        stepperKey: 0,
        loading: false,
        totalNumber: 0,
        allowedRVersions: [],
        allowedDistributions: [],
        allowedArchitectures: [],
        tableOptions: undefined
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
      async getRConfiguration() {
        await getRConfiguration().then((response) => {
          this.allowedRVersions =
            response[0].allowedRVersions
          this.allowedDistributions =
            response[0].allowedDistributions
          this.allowedArchitectures =
            response[0].allowedArchitectures
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
        if (
          this.repository?.technology ==
          Technologies.enum.Python
        )
          return false
        return !!this.generateManual.find(
          (item) => item == file
        )
      },
      getBinaryForPackage(file: File) {
        return !!this.binary.find((item) => item == file)
      },
      updateBinaryOptionForPackage(file: File) {
        if (this.getBinaryForPackage(file)) {
          this.removeBinaryOptionForPackage(file)
        } else {
          this.addBinaryOptionForPackage(file)
          this.removeGenerateManualOptionForPackage(file)
        }
      },
      getNotesForPackage(file: File) {
        return this.note.find((item) => item.file == file)
          ?.note
      },
      getNotesForPackageBool(file: File) {
        return !!this.notes.find((item) => item == file)
      },
      updateNotesOptionForPackage(file: File) {
        if (this.getNotesForPackageBool(file)) {
          this.removeNotesOptionForPackage(file)
        } else {
          this.addNotesOptionForPackage(file)
        }
      },
      removeNotesOptionForPackage(file: File) {
        this.notes = this.notes.filter(
          (item) => item !== file
        )
        this.note = this.note.filter(
          (item) => item.file !== file
        )
      },
      addNotesOptionForPackage(file: File) {
        this.notes.push(file)
      },
      removeBinaryOptionForPackage(file: File) {
        this.binary = this.binary.filter(
          (item) => item !== file
        )
      },
      addBinaryOptionForPackage(file: File) {
        this.binary.push(file)
      },
      addRversion(version: string, value: File) {
        const idx = this.rversion.findIndex(
          (item) => item.file === value
        )
        if (idx > -1) {
          this.rversion[idx].version = version
        } else {
          this.rversion.push({
            version: version,
            file: value
          })
        }
      },
      getRVersionForPackage(file: File) {
        return this.rversion.find(
          (item) => item.file == file
        )?.version
      },
      addArchitecture(architecture: string, value: File) {
        const idx = this.architecture.findIndex(
          (item) => item.file === value
        )
        if (idx > -1) {
          this.architecture[idx].architecture = architecture
        } else {
          this.architecture.push({
            architecture: architecture,
            file: value
          })
        }
      },
      addNote(note: string, value: File) {
        const idx = this.note.findIndex(
          (n) => n.file == value
        )
        if (idx >= 0) {
          this.note[idx].note = note
        } else {
          this.note.push({
            note: note,
            file: value
          })
        }
      },
      getArchitectureForPackage(file: File) {
        return this.architecture.find(
          (item) => item.file == file
        )?.architecture
      },
      addDistribution(distribution: string, value: File) {
        const idx = this.distribution.findIndex(
          (item) => item.file === value
        )
        if (idx > -1) {
          this.distribution[idx].distribution = distribution
        } else {
          this.distribution.push({
            distribution: distribution,
            file: value
          })
        }
      },
      getDistributionForPackage(file: File) {
        return this.distribution.find(
          (item) => item.file == file
        )?.distribution
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
      updateStepperKey() {
        this.stepperKey = ++this.stepperKey % 100
      },
      async addSubmissionRequests() {
        const toasts = useToast()
        let warnings = 0
        this.promises = this.packages.map((packageBag) => {
          return {
            promise: addSubmission(
              this.repository?.name!,
              this.repository?.technology!,
              packageBag,
              this.getGenerateManualForPackage(packageBag),
              this.getReplaceForPackage(packageBag),
              this.getBinaryForPackage(packageBag),
              this.getRVersionForPackage(packageBag),
              this.getArchitectureForPackage(packageBag),
              this.getDistributionForPackage(packageBag),
              this.getNotesForPackage(packageBag)
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
              promise.state =
                response[3] == 'SUCCESS'
                  ? 'success'
                  : 'warning'
              promise.messageCode =
                response[4] !== 'undefined'
                  ? response[4]
                  : ''
              if (promise.state == 'warning') {
                warnings++
              }
            })
            .catch((err) => {
              promise.state = 'error'
              if (err.response?.data.data) {
                promise.error = err.response.data.data
              } else if (err.response?.data) {
                promise.error = err.response.data
              }
            })
            .finally(() => {
              if (++fulfilled == this.promises.length) {
                this.resolved = true
                if (warnings > 0) {
                  toasts.warning(
                    i18n.t('submissions.upload.warning')
                  )
                }
              }
            })
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
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltration')
        )
      },
      clearFiltration() {
        this.filtration = defaultValues(
          SubmissionsFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.getPage()
        const toasts = useToast()
        toasts.success(
          i18n.t('notifications.successFiltrationReset')
        )
      }
    }
  }
)

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
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  EntityModelSubmissionDto
} from '@/openapi'
import {
  downloadReferenceManual,
  fetchPackageService,
  fetchPackagesService,
  deletePackage
} from '@/services/packageServices'
import { useUtilities } from '@/composable/utilities'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { fetchSubmission } from '@/services/submissionServices'
import { usePagination } from './pagination'
import { Technologies } from '@/enum/Technologies'
import { DataTableOptions } from '@/models/DataTableOptions'
import { validatedData } from '@/services/openApiAccess'
import { useToast } from '@/composable/toasts'
import { useSortStore } from '@/store/sort'
import {
  deleteTechnologyPackage,
  updateTechnologyPackage
} from '@/maps/package/Technology'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelPackageDto>>
  packageBag: EntityModelPackageDto
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
}

interface State {
  packages: EntityModelPackageDto[]
  packagesToDelete: EntityModelPackageDto[]
  packagesSelected: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  submission?: EntityModelSubmissionDto
  filtration: PackagesFiltration
  chosenPackage?: EntityModelPackageDto
  promises: PackagePromise[]
  totalNumber: number
  next?: boolean
  loading: boolean
  resolved: boolean
}

const { deepCopy } = useUtilities()

export const usePackagesStore = defineStore(
  'packagesStore',
  {
    state: (): State => {
      return {
        packages: [],
        packagesToDelete: [],
        packagesSelected: [],
        promises: [],
        package: {},
        submission: {},
        filtration: defaultValues(PackagesFiltration),
        chosenPackage: undefined,
        totalNumber: 0,
        resolved: false,
        next: false,
        loading: false
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(defaultValues(PackagesFiltration))
        )
      }
    },
    actions: {
      async getPage(options: DataTableOptions) {
        if (options.sortBy.length == 0) {
          options.sortBy = [{ key: 'name', order: 'asc' }]
        }
        this.loading = true
        fetchPackagesService(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          [
            options.sortBy[0].key +
              ',' +
              options.sortBy[0].order
          ]
        ).then((packages) => {
          this.packages = packages[0]
          this.loading = false
        })
      },
      async getList(page: number, pageSize = 8) {
        const filtration = {
          repository: this.filtration.repository,
          deleted: undefined,
          maintainer: undefined,
          technologies: undefined,
          search: this.filtration.search,
          submissionState: undefined
        }
        const [packages, pageData] =
          await fetchPackagesService(
            filtration,
            page,
            pageSize,
            ['name,asc'],
            false
          )
        this.packages = packages
        return pageData
      },
      async get(id: number, technology: Technologies) {
        this.package = (
          await fetchPackageService(id, technology)
        )[0]
        if (this.package?.submission?.id) {
          this.submission = (
            await fetchSubmission(
              this.package.submission.id
            )
          )[0]
        }
      },
      async getPackages(filtration?: PackagesFiltration) {
        const pagination = usePagination()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          filtration || this.filtration
        )
        pagination.newPageWithoutRefresh(pageData.page)
        this.totalNumber = pageData.totalNumber
      },
      async getManual(id: string, fileName: string) {
        await downloadReferenceManual(id, fileName).then(
          () => {}
        )
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: PackagesFiltration,
        showProgress = true
      ) {
        const sort = useSortStore()
        const [packages, pageData] =
          await fetchPackagesService(
            filtration,
            page,
            pageSize,
            sort.getSortBy(),
            showProgress
          )
        this.packages = packages
        return pageData
      },
      async delete() {
        if (this.chosenPackage) {
          const oldPackage: EntityModelPackageDto =
            deepCopy(this.chosenPackage)
          const newPackage = deepCopy(oldPackage)
          newPackage.deleted = true
          const deleteFn = deleteTechnologyPackage.get(
            oldPackage.technology as Technologies
          )
          if (deleteFn)
            await deleteFn(oldPackage, newPackage).then(
              async (success: any) => {
                if (success) await this.getPackages()
              }
            )
        }
      },
      async activatePackage(
        newPackage: EntityModelPackageDto
      ) {
        const oldPackage = deepCopy(newPackage)
        oldPackage.active = !newPackage.active
        const updateFn = updateTechnologyPackage.get(
          newPackage.technology as Technologies
        )
        if (updateFn)
          await updateFn(oldPackage, newPackage).then(
            async (success: any) => {
              if (success) await this.getPackages()
            }
          )
      },
      setChosen(payload?: EntityModelPackageDto) {
        this.chosenPackage = payload
      },
      async setFiltration(payload: PackagesFiltration) {
        const pagination = usePagination()
        pagination.resetPage()
        if (PackagesFiltration.safeParse(payload).success) {
          this.filtration =
            PackagesFiltration.parse(payload)
        }
        await this.getPackages()
      },
      setFiltrationBy(filtration: object) {
        this.clearFiltration()
        this.filtration = {
          ...defaultValues(PackagesFiltration),
          ...(filtration as PackagesFiltration)
        }
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(PackagesFiltration)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.getPackages()
      },
      getLabels() {
        return packagesFiltrationLabels
      },
      async deletePackages() {
        const toasts = useToast()
        this.promises = this.packagesToDelete.map(
          (packageBag) => {
            return {
              promise: deletePackage(packageBag),
              packageBag: packageBag,
              state: 'pending',
              error: [],
              response: undefined
            }
          }
        )
        let fulfilled = 0
        let errors = 0
        this.promises.forEach(async (promise) => {
          await promise.promise
            .then((response) => {
              promise.response = response
              promise.state =
                response[3] == 'SUCCESS'
                  ? 'success'
                  : 'warning'
            })
            .catch((err) => {
              promise.state = 'error'
              errors++
              if (err.response?.data.data) {
                promise.error = err.response.data.data
                toasts.error(
                  `${promise.packageBag.name} - ${err.response.data.data}`
                )
              } else if (err.response?.data) {
                promise.error = err.response.data
                toasts.error(
                  `${promise.packageBag.name} - ${err.response.data}`
                )
              }
            })
            .finally(() => {
              if (++fulfilled == this.promises.length) {
                if (errors > 0) {
                  toasts.warning(
                    `Deleted ${
                      fulfilled - errors
                    } packages, failed with deletion of ${errors} packages`
                  )
                } else {
                  toasts.success(
                    `Deleted all selected packages (${fulfilled})`
                  )
                }
                this.resolved = true
                this.promises = []
                this.packagesToDelete = []
                this.packagesSelected = []
                this.getPackages()
              }
            })
        })
      }
    }
  }
)

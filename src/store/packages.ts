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
import { fetchPackagesServices } from '@/services'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  EntityModelSubmissionDto
} from '@/openapi'
import {
  downloadReferenceManual,
  downloadVignetteHtml,
  downloadSourceFile,
  fetchPackageServices,
  updatePythonPackage,
  updateRPackage,
  deletePythonPackage,
  deleteRPackage,
  fetchFullPackagesList,
  fetch
} from '@/services/package_services'
import { useUtilities } from '@/composable/utilities'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { fetchSubmission } from '@/services/submission_services'
import { usePagination } from './pagination'
import { Technologies } from '@/enum/Technologies'
import { DataTableOptions } from '@/models/DataTableOptions'

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  submission?: EntityModelSubmissionDto
  filtration: PackagesFiltration
  chosenPackage?: EntityModelPackageDto
  next?: boolean
  loading: boolean
}

const { deepCopy } = useUtilities()

export const usePackagesStore = defineStore(
  'packagesStore',
  {
    state: (): State => {
      return {
        packages: [],
        package: {},
        submission: {},
        filtration: defaultValues(PackagesFiltration),
        chosenPackage: undefined,
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
      async fetchPackagesPage(options: DataTableOptions) {
        if (options.sortBy.length == 0) {
          options.sortBy = [{ key: 'name', order: 'asc' }]
        }
        this.loading = true
        fetch(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          options.sortBy[0].key +
            ',' +
            options.sortBy[0].order
        ).then((packages) => {
          this.packages = packages[0]
          this.loading = false
        })
      },
      async fetchPackages(filtration?: PackagesFiltration) {
        const pagination = usePagination()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          filtration || this.filtration
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchPackagesList(page: number, pageSize = 8) {
        const [packages, pageData] =
          await fetchFullPackagesList(
            page,
            pageSize,
            this.filtration
          )
        this.packages = packages
        return pageData
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: PackagesFiltration,
        showProgress = true
      ) {
        const [packages, pageData] =
          await fetchPackagesServices(
            filtration,
            page,
            pageSize,
            showProgress
          )
        this.packages = packages
        return pageData
      },
      async fetchPackage(
        id: number,
        technology: Technologies
      ) {
        this.package = (
          await fetchPackageServices(id, technology)
        )[0]
        if (this.package?.submission?.id) {
          this.submission = (
            await fetchSubmission(
              this.package.submission.id
            )
          )[0]
        }
      },
      async fetchRPackage(id: number) {
        this.package = (
          await fetchPackageServices(
            id,
            Technologies.Enum.R
          )
        )[0]
      },
      async activatePackage(
        newPackage: EntityModelPackageDto
      ) {
        const oldPackage = deepCopy(newPackage)
        oldPackage.active = !newPackage.active
        if (
          newPackage.technology == Technologies.Enum.Python
        ) {
          await updatePythonPackage(
            oldPackage,
            newPackage
          ).then(async (success) => {
            if (success) await this.fetchPackages()
          })
        } else {
          await updateRPackage(oldPackage, newPackage).then(
            async (success) => {
              if (success) await this.fetchPackages()
            }
          )
        }
      },
      async downloadManual(id: string, fileName: string) {
        await downloadReferenceManual(id, fileName).then(
          () => {}
        )
      },
      async downloadVignette(id: string, fileName: string) {
        await downloadVignetteHtml(id, fileName).then(
          () => {}
        )
      },
      async downloadSourceFile(
        id: string,
        name: string,
        version: string,
        technology: string
      ) {
        await downloadSourceFile(
          id,
          name,
          version,
          technology
        ).then(() => {})
      },
      async deletePackage() {
        if (this.chosenPackage) {
          const newPackage = deepCopy(this.chosenPackage)
          newPackage.deleted = true
          if (
            this.chosenPackage.technology ===
            Technologies.enum.Python
          ) {
            await deletePythonPackage(
              this.chosenPackage,
              newPackage
            ).then(async (success) => {
              if (success) await this.fetchPackages()
            })
          } else {
            if (this.chosenPackage.id) {
              await deleteRPackage(
                this.chosenPackage,
                newPackage
              ).then(async (success) => {
                if (success) await this.fetchPackages()
              })
            }
          }
        }
      },
      async setFiltration(payload: PackagesFiltration) {
        const pagination = usePagination()
        pagination.resetPage()
        if (PackagesFiltration.safeParse(payload).success) {
          this.filtration =
            PackagesFiltration.parse(payload)
        }
        await this.fetchPackages()
      },
      setFiltrationByName(payload: string | undefined) {
        this.clearFiltration()
        this.filtration.search = payload
      },
      setFiltrationByRepositoryOnly(payload?: string) {
        this.filtration = defaultValues(PackagesFiltration)
        this.filtration.repository = payload
          ? [payload]
          : undefined
      },
      setFiltrationWithoutRefresh(
        payload: PackagesFiltration
      ) {
        this.filtration = payload
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(PackagesFiltration)
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchPackages()
      },
      setChosenPackage(payload?: EntityModelPackageDto) {
        this.chosenPackage = payload
      },
      getLabels() {
        return packagesFiltrationLabels
      }
    }
  }
)

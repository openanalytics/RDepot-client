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
  updateRPackage
} from '@/services/package_services'
import { useUtilities } from '@/composable/utilities'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { fetchSubmission } from '@/services/submission_services'
import { usePagination } from './pagination'
import { Technologies } from '@/enum/Technologies'
import { reactive, toRaw } from 'vue'

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  submission?: EntityModelSubmissionDto
  filtration: PackagesFiltration
  chosenPackageId?: number
  next?: boolean
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
        chosenPackageId: undefined,
        next: false
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
      async fetchPageOfPackages(
        page: number,
        pageSize = 8
      ) {
        const pageData = await this.fetchData(
          page,
          pageSize,
          defaultValues(PackagesFiltration),
          false
        )
        return pageData
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
      async fetchData(
        page: number,
        pageSize: number,
        filtration: PackagesFiltration,
        showProgress = true
      ) {
        this.packages = []
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
        if (this.package?.submissionId) {
          this.submission = (
            await fetchSubmission(this.package.submissionId)
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
      async fetchPythonPackage(id: number) {
        this.package = (
          await fetchPackageServices(
            id,
            Technologies.Enum.Python
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
      async downloadManual(id: string) {
        await downloadReferenceManual(id).then((res) => {
          console.log(res)
        })
      },
      async downloadVignette(id: string, fileName: string) {
        await downloadVignetteHtml(id, fileName).then(
          (res) => {
            console.log(id, fileName, 'vignette.json', res)
          }
        )
      },
      async downloadSourceFile(
        id: string,
        name: string,
        version: string
      ) {
        await downloadSourceFile(id, name, version).then(
          (res) => {
            console.log(id, 'sourcefile', res)
          }
        )
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
      setFiltrationByRepositoryOnly(payload?: string) {
        this.filtration = defaultValues(PackagesFiltration)
        this.filtration.repository = payload
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
      setChosenPackage(id?: number) {
        this.chosenPackageId = id
      },
      getLabels() {
        return packagesFiltrationLabels
      }
    }
  }
)

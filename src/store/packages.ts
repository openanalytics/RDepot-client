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
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
import { fetchPackagesServices } from '@/services'
import { defineStore } from 'pinia'
import {
  EntityModelPackageDto,
  EntityModelSubmissionDto,
  ResponseDtoListVignette,
  RPackageControllerApiFactory
} from '@/openapi'
import {
  downloadReferenceManual,
  fetchPackageServices,
  fetchPythonPackageServices,
  fetchRPackageServices,
  updateRPackage
} from '@/services/package_services'
import { useUtilities } from '@/composable/utilities'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { fetchSubmission } from '@/services/submission_services'
import { usePagination } from './pagination'

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelPackageDto
  submission?: EntityModelSubmissionDto
  vignettes: ResponseDtoListVignette
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
        vignettes: {},
        filtration: defaultValues(PackagesFiltration),
        chosenPackageId: undefined,
        next: false
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
      async fetchPackage(id: number) {
        this.package = (await fetchPackageServices(id))[0]
        if (this.package?.submissionId) {
          this.submission = (
            await fetchSubmission(this.package.submissionId)
          )[0]
        }
      },
      async fetchRPackage(id: number) {
        this.package = (await fetchRPackageServices(id))[0]
      },
      async fetchPythonPackage(id: number) {
        this.package = (
          await fetchPythonPackageServices(id)
        )[0]
      },
      async activatePackage(
        newPackage: EntityModelPackageDto
      ) {
        const oldPackage = deepCopy(newPackage)
        oldPackage.active = !newPackage.active
        await updateRPackage(oldPackage, newPackage).then(
          async (success) => {
            if (success) await this.fetchPackages()
          }
        )
      },
      async downloadManual(id: string) {
        await downloadReferenceManual(id).then((res) => {
          console.log(res)
        })
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

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
  fetchPackageServices,
  fetchPythonPackageServices,
  fetchRPackageServices,
  updateRPackage
} from '@/services/package_services'
import { useUtilities } from '@/composable/utilities'
import { usePaginationStore } from './pagination'
import { packagesFiltrationLabels } from '@/maps/Filtration'
import { fetchSubmission } from '@/services/submission_services'

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
  'packages_store',
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
        const pagination = usePaginationStore()
        const pageData = await this.fetchData(
          pagination.page,
          pagination.pageSize,
          filtration || this.filtration
        )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
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
        this.package = await fetchPackageServices(id)
        if (this.package?.submissionId) {
          this.submission = await fetchSubmission(
            this.package.submissionId
          )
        }
      },
      async fetchRPackageFields() {
        if (this.package?.id) {
          this.package = {
            ...this.package,
            ...(await fetchRPackageServices(
              this.package.id
            ))
          }
        }
      },
      async fetchPythonPackageFields() {
        if (this.package?.id) {
          this.package = {
            ...this.package,
            ...(await fetchPythonPackageServices(
              this.package.id
            ))
          }
        }
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
      async downloadManual() {
        const rPackageApi = RPackageControllerApiFactory()
        if (this.package?.id) {
          return rPackageApi.downloadReferenceManual(
            this.package.id
          )
        }
      },
      async setFiltration(payload: PackagesFiltration) {
        const pagination = usePaginationStore()
        pagination.setPage(0)
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
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
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

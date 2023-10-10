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
  EntityModelRPackageDto,
  EntityModelSubmissionDto
} from '@/openapi'
import { fetchPackageServices } from '@/services/package_services'
import { fetchSubmission } from '@/services/submission_services'
import { Technologies } from '@/enum/Technologies'

interface State {
  packages: EntityModelPackageDto[]
  package?: EntityModelRPackageDto
  submission?: EntityModelSubmissionDto
  next?: boolean
}

export const usePackageDetailsStore = defineStore(
  'packageDetailsStore',
  {
    state: (): State => {
      return {
        packages: [],
        package: {},
        submission: {},
        next: false
      }
    },
    actions: {
      async fetchPackage(
        id: number,
        technology: Technologies
      ) {
        this.packages = []
        const [packageBag] = await fetchPackageServices(
          id,
          technology,
          false
        )
        this.package = packageBag
        if (packageBag.submissionId != undefined) {
          fetchSubmission(packageBag.submissionId)
        }
        this.fetchAllPackageVersions()
      },
      async fetchSubmission(id: number) {
        this.submission = (await fetchSubmission(id))[0]
      },
      async fetchAllPackageVersions(
        page = 1,
        pageSize = 10
      ) {
        if (this.package) {
          var filtration = defaultValues(PackagesFiltration)
          filtration.repository =
            this.package.repository?.name
          filtration.name = this.package.name
          const [packages, pageData] =
            await fetchPackagesServices(
              filtration,
              page,
              pageSize,
              false
            )
          this.packages = [...this.packages, ...packages]
          if (pageData.page < pageData.totalNumber) {
            this.fetchAllPackageVersions(pageData.page + 1)
          }
        }
      }
    }
  }
)

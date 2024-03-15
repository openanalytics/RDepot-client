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
  EntityModelPythonPackageDto,
  EntityModelRPackageDto,
  EntityModelSubmissionDto,
  Vignette
} from '@/openapi'
import {
  downloadReferenceManual,
  downloadVignetteHtml,
  openVignetteHtml,
  downloadSourceFile,
  fetchPackageServices,
  fetchVignettes
} from '@/services/package_services'
import { fetchSubmission } from '@/services/submission_services'
import { Technologies } from '@/enum/Technologies'

interface State {
  packages: EntityModelPackageDto[]
  packageBag?:
    | EntityModelRPackageDto
    | EntityModelPythonPackageDto
  submission?: EntityModelSubmissionDto
  next?: boolean
  vignettes?: Vignette[]
}

export const usePackageDetailsStore = defineStore(
  'packageDetailsStore',
  {
    state: (): State => {
      return {
        packages: [],
        packageBag: {},
        submission: {},
        vignettes: [],
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
        this.packageBag = packageBag
        if (packageBag.submission?.id != undefined) {
          this.submission = (await fetchSubmission(id))[0]
        }
        this.fetchAllPackageVersions()
        if (
          this.packageBag.id &&
          this.packageBag.technology === 'R'
        ) {
          this.fetchVignettes(this.packageBag.id)
        }
      },
      async fetchAllPackageVersions(
        page = 0,
        pageSize = 10
      ) {
        if (this.packageBag) {
          const filtration = defaultValues(
            PackagesFiltration
          )
          if (this.packageBag.repository?.name) {
            filtration.repository = [
              this.packageBag.repository?.name
            ]
          }
          filtration.search = this.packageBag.name
          const [packages, pageData] =
            await fetchPackagesServices(
              filtration,
              page,
              pageSize,
              false
            )
          this.packages = [...this.packages, ...packages]
          if (this.packages.length < pageData.totalNumber) {
            this.fetchAllPackageVersions(pageData.page + 1)
          }
        }
      },
      async downloadManual(id: string) {
        await downloadReferenceManual(id).then()
      },
      async openVignette(id: string, fileName: string) {
        await openVignetteHtml(id, fileName).then()
      },
      async downloadVignette(id: string, fileName: string) {
        await downloadVignetteHtml(id, fileName).then()
      },
      async downloadSourceFile(
        id: string,
        name: string,
        version: string
      ) {
        await downloadSourceFile(id, name, version).then()
      },
      async fetchVignettes(id: number) {
        const [vignettes] = await fetchVignettes(id)
        this.vignettes = vignettes
      }
    }
  }
)

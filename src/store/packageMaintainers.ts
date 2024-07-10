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
  EntityModelPackageMaintainerDto,
  EntityModelPythonRepositoryDto,
  EntityModelRPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
import {
  fetchPackagesServices,
  fetchRepositoriesServices
} from '@/services'
import {
  deletePackageMaintainerService,
  fetchPackageMaintainersService,
  updatePackageMaintainerService,
  createPackageMaintainerService,
  fetchFullMaintainersList,
  fetch
} from '@/services/packageMaintainersService'
import { useUtilities } from '@/composable/utilities'
import { packageMaintainersFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
  loading: boolean
  totalNumber: number
}

const { deepCopy } = useUtilities()

export const usePackageMaintainersStore = defineStore(
  'packageMaintainersStore',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: defaultValues(
          PackageMaintainersFiltration
        ),
        repositories: [],
        packages: [],
        chosenMaintainer: {},
        loading: false,
        totalNumber: 0
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(
            defaultValues(PackageMaintainersFiltration)
          )
        )
      }
    },
    actions: {
      async getPage(options: DataTableOptions) {
        this.loading = true
        const [maintainers, pageData] = await fetch(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          options.sortBy[0].key +
            ',' +
            options.sortBy[0].order
        )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async getList(page: number, pageSize = 8) {
        const [maintainers, pageData] =
          await fetchFullMaintainersList(
            page,
            pageSize,
            this.filtration
          )
        this.maintainers = maintainers
        return pageData
      },
      async get() {
        const pagination = usePagination()
        const [maintainers, pageData] =
          await fetchPackageMaintainersService(
            this.filtration,
            pagination.fetchPage,
            pagination.pageSize
          )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async fetchAndReturnAllMaintainers(
        filtration: PackageMaintainersFiltration
      ) {
        let page = 0
        const [maintainers, pageData] =
          await fetchPackageMaintainersService(
            filtration,
            page
          )
        let result: EntityModelPackageMaintainerDto[] =
          maintainers
        while (pageData.totalNumber > result.length) {
          await fetchPackageMaintainersService(
            filtration,
            ++page
          ).then(([maintainers]) => {
            result = [...result, ...maintainers]
          })
        }
        return maintainers
      },
      async getRepositories() {
        const [repositories] =
          await fetchRepositoriesServices()
        this.repositories = repositories
      },
      async getPackages() {
        const [packages] = await fetchPackagesServices()
        this.packages = packages
      },
      async deleteSoft() {
        if (this.chosenMaintainer) {
          this.patch({ deleted: true })
        }
      },
      async delete() {
        deletePackageMaintainerService(
          this.chosenMaintainer
        ).then(async (success) => {
          if (success) await this.get()
        })
      },
      async patch(
        newValues: Partial<PackageMaintainerDto>
      ) {
        const newMaintainer = {
          ...deepCopy(this.chosenMaintainer),
          ...newValues
        }
        updatePackageMaintainerService(
          this.chosenMaintainer,
          newMaintainer
        ).then(async (success) => {
          if (success) await this.get()
        })
      },
      async create(
        maintainer: Partial<PackageMaintainerDto>
      ) {
        createPackageMaintainerService(maintainer).then(
          async (success) => {
            if (success) await this.get()
          }
        )
      },
      setChosen(payload: EntityModelPackageMaintainerDto) {
        this.chosenMaintainer = payload
        this.save()
      },
      save() {
        this.maintainers = this.maintainers.map(
          (maintainer: EntityModelPackageMaintainerDto) => {
            if (maintainer.id == this.chosenMaintainer.id) {
              return this.chosenMaintainer
            }
            return maintainer
          }
        )
      },
      async setFiltration(
        payload: PackageMaintainersFiltration
      ) {
        const pagination = usePagination()
        pagination.resetPage()
        if (
          PackageMaintainersFiltration.safeParse(payload)
            .success
        ) {
          this.filtration =
            PackageMaintainersFiltration.parse(payload)
        }
        await this.get()
      },
      setFiltrationBy(
        field: string,
        payload: string | string[] | undefined
      ) {
        this.clearFiltration()
        this.filtration[field] = payload
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(
          PackageMaintainersFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.get()
      },
      getLabels() {
        return packageMaintainersFiltrationLabels
      }
    }
  }
)

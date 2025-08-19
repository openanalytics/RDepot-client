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
import { fetchPackagesService } from '@/services/packageServices'
import { fetchRepositoriesService } from '@/services/repositoryServices'
import {
  deletePackageMaintainerService,
  updatePackageMaintainerService,
  createPackageMaintainerService,
  fetchPackageMaintainerService
} from '@/services/packageMaintainersService'
import { useUtilities } from '@/composable/utilities'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'
import { useOATable } from '@/store/setup/oatable'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
  pending: EntityModelPackageMaintainerDto[]
  loading: boolean
  totalNumber: number
  tableOptions?: DataTableOptions
  localOptions: DataTableOptions
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
        pending: [],
        chosenMaintainer: {},
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
            defaultValues(PackageMaintainersFiltration)
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
          this.tableOptions?.sortBy[0].key || 'user'
        const sortOrder =
          this.tableOptions?.sortBy[0].order || 'asc'
        const [maintainers, pageData] =
          await fetchPackageMaintainerService(
            this.filtration,
            (this.tableOptions?.page || 1) - 1,
            this.tableOptions?.itemsPerPage ||
              useOATable().pageSize,
            [sortField + ',' + sortOrder]
          )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async getList(page: number, pageSize = 8) {
        const filtration = deepCopy(this.filtration)
        filtration.deleted = undefined
        filtration.technologies = undefined
        filtration.repository = undefined
        const [maintainers, pageData] =
          await fetchPackageMaintainerService(
            filtration,
            page,
            pageSize,
            ['user.name,asc'],
            false
          )
        this.maintainers = maintainers
        return pageData
      },
      async getAll(
        filtration: PackageMaintainersFiltration
      ) {
        let page = 0
        const sort = useSortStore()
        const [maintainers, pageData] =
          await fetchPackageMaintainerService(
            filtration,
            page,
            undefined,
            sort.getSortBy(),
            false
          )
        let result: EntityModelPackageMaintainerDto[] =
          maintainers
        while (pageData.totalNumber > result.length) {
          await fetchPackageMaintainerService(
            filtration,
            ++page,
            undefined,
            sort.getSortBy(),
            false
          ).then(([maintainers]) => {
            result = [...result, ...maintainers]
          })
        }
        return maintainers
      },
      async getRepositories() {
        const sort = useSortStore()
        const [repositories] =
          await fetchRepositoriesService(
            {
              technologies: undefined,
              search: undefined,
              name: undefined,
              deleted: undefined,
              published: undefined,
              maintainer: undefined
            },
            undefined,
            undefined,
            sort.getSortBy(),
            false
          )
        this.repositories = repositories
      },
      async getPackages() {
        const sort = useSortStore()
        const [packages] = await fetchPackagesService(
          {
            repository: undefined,
            deleted: undefined,
            submissionState: undefined,
            technologies: undefined,
            search: undefined,
            maintainer: undefined
          },
          undefined,
          undefined,
          sort.getSortBy(),
          false
        )
        this.packages = packages
      },
      async deleteSoft() {
        if (this.chosenMaintainer) {
          this.patch({ deleted: true })
        }
      },
      async delete() {
        this.pending.push(this.chosenMaintainer)
        deletePackageMaintainerService(
          this.chosenMaintainer
        )
          .then(async (success) => {
            if (success) await this.getPage()
          })
          .finally(() => {
            this.pending = this.pending.filter(
              (item) => item.id != this.chosenMaintainer.id
            )
          })
      },
      async patch(
        newValues: Partial<PackageMaintainerDto>
      ) {
        this.pending.push(newValues)
        const newMaintainer = {
          ...deepCopy(this.chosenMaintainer),
          ...newValues
        }
        updatePackageMaintainerService(
          this.chosenMaintainer,
          newMaintainer
        )
          .then(async (success) => {
            if (success) await this.getPage()
          })
          .finally(() => {
            this.pending = this.pending.filter(
              (item) => item.id != newValues.id
            )
          })
      },
      async create(
        maintainer: Partial<PackageMaintainerDto>
      ) {
        createPackageMaintainerService(maintainer).then(
          async (success) => {
            if (success) await this.getPage()
          }
        )
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
        if (
          PackageMaintainersFiltration.safeParse(payload)
            .success
        ) {
          this.filtration =
            PackageMaintainersFiltration.parse(payload)
        }
        await this.getPage()
      },
      setFiltrationBy(filtration: object) {
        this.clearFiltration()
        this.filtration = {
          ...defaultValues(PackageMaintainersFiltration),
          ...(filtration as PackageMaintainersFiltration)
        }
      },
      clearFiltration() {
        this.filtration = defaultValues(
          PackageMaintainersFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.getPage()
      }
    }
  }
)

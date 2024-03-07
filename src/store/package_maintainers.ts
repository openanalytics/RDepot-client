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
  fetchRepositoriesServices,
  fetchAllRepositoriesServices
} from '@/services'
import {
  deletePackageMaintainerService,
  fetchAllPackageMaintainers,
  fetchPackageMaintainersService,
  updatePackageMaintainerService
} from '@/services/package_maintainers_service'
import { useUtilities } from '@/composable/utilities'
import { packageMaintainersFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'

interface State {
  maintainers: EntityModelPackageMaintainerDto[]
  filtration: PackageMaintainersFiltration
  repositories: EntityModelPythonRepositoryDto[]
  packages: EntityModelRPackageDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
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
        chosenMaintainer: {}
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
      async fetchMaintainers() {
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
      async fetchAllMaintainers() {
        const [maintainers, pageData] =
          await fetchAllPackageMaintainers()
        this.maintainers = maintainers
      },
      async fetchRepositories() {
        const [repositories] =
          await fetchRepositoriesServices()
        this.repositories = repositories
      },
      async fetchAllRepositories() {
        const [repositories] =
          await fetchAllRepositoriesServices()
        this.repositories = repositories
      },
      async fetchPackages() {
        const [packages] = await fetchPackagesServices()
        this.packages = packages
      },
      setChosenMaintainer(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.chosenMaintainer = payload
        this.saveMaintainer()
      },
      saveMaintainer() {
        this.maintainers = this.maintainers.map(
          (maintainer: EntityModelPackageMaintainerDto) => {
            if (maintainer.id == this.chosenMaintainer.id) {
              return this.chosenMaintainer
            }
            return maintainer
          }
        )
      },
      async softDelete() {
        if (this.chosenMaintainer) {
          this.updateMaintainer({ deleted: true })
        }
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
        await this.fetchMaintainers()
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
        await this.fetchMaintainers()
      },
      async deleteChosenMaintainer() {
        deletePackageMaintainerService(
          this.chosenMaintainer
        ).then(async (success) => {
          if (success) await this.fetchMaintainers()
        })
      },
      async updateMaintainer(
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
          if (success) await this.fetchMaintainers()
        })
      },
      getLabels() {
        return packageMaintainersFiltrationLabels
      }
    }
  }
)

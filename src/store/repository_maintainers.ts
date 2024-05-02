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
  EntityModelRepositoryDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoryMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
import {
  deletedRepositoryMaintainer,
  fetchAllRepositoryMaintainers,
  fetchRepositoryMaintainersServices,
  updateRepositoryMaintainer,
  createRepositoryMaintainer,
  fetchFullMaintainersList,
  fetch
} from '@/services/repository_maintainers_services'
import {
  fetchRepositoriesServices,
  fetchAllRepositoriesServices
} from '@/services'
import { useUtilities } from '@/composable/utilities'
import { repositoryMaintainersFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'

const { deepCopy } = useUtilities()

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
  loading: boolean
}

export const useRepositoryMaintainersStore = defineStore(
  'repositoryMaintainersStore',
  {
    state: (): State => {
      return {
        maintainers: [],
        filtration: defaultValues(
          RepositoryMaintainersFiltration
        ),
        repositories: [],
        chosenMaintainer: {},
        loading: false
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(
            defaultValues(RepositoryMaintainersFiltration)
          )
        )
      }
    },
    actions: {
      async fetchMaintainersPage(
        options: DataTableOptions
      ) {
        if (options.sortBy.length == 0) {
          options.sortBy = [{ key: 'user', order: 'asc' }]
        }
        this.loading = true
        const [maintainers] = await fetch(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          options.sortBy[0].key +
            ',' +
            options.sortBy[0].order
        )
        this.loading = false
        this.maintainers = maintainers
      },
      async fetchMaintainers() {
        const pagination = usePagination()
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersServices(
            this.filtration,
            pagination.fetchPage,
            pagination.pageSize
          )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async fetchAllMaintainers() {
        const [maintainers] =
          await fetchAllRepositoryMaintainers()
        this.maintainers = maintainers
      },
      async fetchMaintainersList(
        page: number,
        pageSize = 8
      ) {
        const [maintainers, pageData] =
          await fetchFullMaintainersList(
            page,
            pageSize,
            this.filtration
          )
        this.maintainers = maintainers
        return pageData
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
      async setChosenMaintainer(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.chosenMaintainer = payload
      },
      async updateMaintainer(
        newValues: Partial<EntityModelPackageMaintainerDto>
      ) {
        if (
          this.chosenMaintainer.id &&
          this.chosenMaintainer.repository &&
          this.chosenMaintainer.repository.id
        ) {
          const newMaintainer = {
            ...deepCopy(this.chosenMaintainer),
            ...newValues
          }
          await updateRepositoryMaintainer(
            this.chosenMaintainer,
            newMaintainer
          ).then(async (success) => {
            if (success) await this.fetchMaintainers()
          })
        }
      },
      async createMaintainer(
        maintainer: Partial<EntityModelPackageMaintainerDto>
      ) {
        await createRepositoryMaintainer(maintainer).then(
          async (success) => {
            if (success) await this.fetchMaintainers()
          }
        )
      },
      async deleteMaintainer() {
        if (this.chosenMaintainer) {
          await deletedRepositoryMaintainer(
            this.chosenMaintainer
          ).then(async (success) => {
            if (success) await this.fetchMaintainers()
          })
        }
      },
      async softDelete() {
        if (this.chosenMaintainer) {
          this.updateMaintainer({ deleted: true })
        }
      },
      async setPage(payload: number) {
        const pagination = usePagination()
        pagination.page = payload
        this.fetchMaintainers()
      },

      async setFiltration(
        payload: RepositoryMaintainersFiltration
      ) {
        const pagination = usePagination()
        pagination.resetPage()
        if (
          RepositoryMaintainersFiltration.safeParse(payload)
            .success
        ) {
          this.filtration =
            RepositoryMaintainersFiltration.parse(payload)
        }
        await this.fetchMaintainers()
      },
      setFiltrationByName(payload: string | undefined) {
        this.clearFiltration()
        this.filtration.search = payload
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.resetPage()
        this.filtration = defaultValues(
          RepositoryMaintainersFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchMaintainers()
      },
      getLabels() {
        return repositoryMaintainersFiltrationLabels
      }
    }
  }
)

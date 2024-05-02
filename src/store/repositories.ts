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
  EntityModelRRepositoryDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import {
  fetchRepositoriesServices,
  fetchAllUndeletedRepositoriesServices
} from '@/services'
import {
  fetch,
  fetchFullRepositoriesList,
  updateRepository
} from '@/services/repository_services'
import { createRepository } from '@/services/repository_services'
import { useUtilities } from '@/composable/utilities'
import { repositoriesFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'

const { deepCopy } = useUtilities()

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  chosenRepository: EntityModelRRepositoryDto
  loading: boolean
  totalNumber: number
}

export const useRepositoryStore = defineStore(
  'repositoryStore',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: defaultValues(RepositoriesFiltration),
        chosenRepository: {},
        loading: false,
        totalNumber: 0
      }
    },
    getters: {
      isDefaultFiltration: (state) => {
        return (
          JSON.stringify(state.filtration) ===
          JSON.stringify(
            defaultValues(RepositoriesFiltration)
          )
        )
      }
    },
    actions: {
      async fetchRepositoriesPage(
        options: DataTableOptions
      ) {
        this.loading = true
        const [repositories, pageData] = await fetch(
          this.filtration,
          options.page - 1,
          options.itemsPerPage,
          options.sortBy[0].key +
            ',' +
            options.sortBy[0].order
        )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.repositories = repositories
      },
      async fetchRepositoriesList(
        page: number,
        pageSize = 8
      ) {
        const [repositories, pageData] =
          await fetchFullRepositoriesList(
            page,
            pageSize,
            this.filtration
          )
        this.repositories = repositories
        return pageData
      },
      async fetchRepositories() {
        const pagination = usePagination()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          this.filtration
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchAllRepositories() {
        const pagination = usePagination()
        const pageData = await this.fetchAllData()
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchAllData() {
        const [repositories, pageData] =
          await fetchAllUndeletedRepositoriesServices()
        this.repositories = repositories
        return pageData
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: RepositoriesFiltration,
        showProgress = true
      ) {
        const [repositories, pageData] =
          await fetchRepositoriesServices(
            filtration,
            page,
            pageSize,
            showProgress
          )
        this.repositories = repositories
        return pageData
      },
      async fetchRepository(
        name: string,
        showProgress = true
      ) {
        const [repository] =
          await fetchRepositoriesServices(
            {
              name: name
            } as RepositoriesFiltration,
            undefined,
            undefined,
            showProgress
          )
        return repository
      },
      async softDelete() {
        if (this.chosenRepository) {
          this.updateRepository({ deleted: true })
        }
      },
      async updateRepository(
        newValues: Partial<EntityModelRRepositoryDto>
      ) {
        const newRepository = {
          ...deepCopy(this.chosenRepository),
          ...newValues
        }
        await updateRepository(
          this.chosenRepository,
          newRepository
        ).then(() => {
          this.fetchRepositories()
        })
      },
      setChosenRepository(id: number | undefined) {
        let flag = true
        this.repositories.forEach((repository) => {
          if (repository.id == id) {
            this.chosenRepository = repository
            flag = false
          }
        })
        if (flag) {
          this.chosenRepository = {}
        }
      },
      async setFiltration(payload: RepositoriesFiltration) {
        const pagination = usePagination()
        pagination.page = 1
        if (
          RepositoriesFiltration.safeParse(payload).success
        ) {
          this.filtration =
            RepositoriesFiltration.parse(payload)
        }
        await this.fetchRepositories()
      },
      setFiltrationByName(payload: string | undefined) {
        this.clearFiltration()
        this.filtration.search = payload
      },
      setFiltrationByNameOnly(payload: string | undefined) {
        this.filtration.name = payload
      },
      clearFiltration() {
        const pagination = usePagination()
        pagination.page = 1
        this.filtration = defaultValues(
          RepositoriesFiltration
        )
      },
      async clearFiltrationAndFetch() {
        this.clearFiltration()
        await this.fetchRepositories()
      },
      async createRepository(
        newRepository: EntityModelRepositoryDto
      ) {
        await createRepository(newRepository)?.then(
          async (success) => {
            if (success) await this.fetchRepositories()
          }
        )
      },
      getLabels() {
        return repositoriesFiltrationLabels
      }
    }
  }
)

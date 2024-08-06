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
  fetchRepositoriesService,
  updateRepository
} from '@/services/repositoryServices'
import { createRepository } from '@/services/repositoryServices'
import { useUtilities } from '@/composable/utilities'
import { repositoriesFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'

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
      async getPage(options: DataTableOptions) {
        this.loading = true
        const [repositories, pageData] =
          await fetchRepositoriesService(
            this.filtration,
            options.page - 1,
            options.itemsPerPage,
            [
              options.sortBy[0].key +
                ',' +
                options.sortBy[0].order
            ]
          )
        this.totalNumber = pageData.totalNumber
        this.repositories = repositories
        this.loading = false
      },
      async getList(page: number, pageSize = 8) {
        const filtration = defaultValues(
          RepositoriesFiltration
        )
        filtration.search = this.filtration.search
        filtration.deleted = undefined
        filtration.published = undefined
        const [repositories, pageData] =
          await fetchRepositoriesService(
            filtration,
            page,
            pageSize,
            ['name,asc'],
            false
          )
        this.repositories = repositories
        return pageData
      },
      async get(name: string, showProgress = true) {
        const sort = useSortStore()
        const [repository] = await fetchRepositoriesService(
          {
            name: name
          } as RepositoriesFiltration,
          undefined,
          undefined,
          sort.getSortBy(),
          showProgress
        )
        return repository
      },
      async getRepositories() {
        const pagination = usePagination()
        const pageData = await this.fetchData(
          pagination.fetchPage,
          pagination.pageSize,
          this.filtration
        )
        pagination.newPageWithoutRefresh(pageData.page)
        pagination.totalNumber = pageData.totalNumber
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: RepositoriesFiltration,
        showProgress = true
      ) {
        const sort = useSortStore()
        const [repositories, pageData] =
          await fetchRepositoriesService(
            filtration,
            page,
            pageSize,
            sort.getSortBy(),
            showProgress
          )
        this.repositories = repositories
        return pageData
      },
      async deleteSoft() {
        if (this.chosenRepository) {
          this.patch({ deleted: true })
        }
      },
      async patch(
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
          this.getRepositories()
        })
      },
      async create(
        newRepository: EntityModelRepositoryDto
      ) {
        await createRepository(newRepository)?.then(
          async (success) => {
            if (success) await this.getRepositories()
          }
        )
      },
      setChosen(id: number | undefined) {
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
        await this.getRepositories()
      },
      setFiltrationBy(filtration: object) {
        this.clearFiltration()
        this.filtration = {
          ...defaultValues(RepositoriesFiltration),
          ...(filtration as RepositoriesFiltration)
        }
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
        await this.getRepositories()
      },
      getLabels() {
        return repositoriesFiltrationLabels
      }
    }
  }
)

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
  EntityModelRRepositoryDto,
  EntityModelRepositoryDto,
  EntityModelPythonRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchRepositoriesService } from '@/services/repositoryServices'
import { createRepository } from '@/services/repositoryServices'
import { useUtilities } from '@/composable/utilities'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'
import {
  fetchTechnologyRepository,
  updateTechnologyRepository
} from '@/maps/repository/RepositoriesTechnology'
import { Technologies } from '@/enum/Technologies'
import { useOATable } from '@/store/setup/oatable'

const { deepCopy } = useUtilities()

export type CombinedRepositoryModel =
  EntityModelRRepositoryDto & EntityModelPythonRepositoryDto

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  chosenRepository: CombinedRepositoryModel
  pending: CombinedRepositoryModel[]
  loading: boolean
  totalNumber: number
  tableOptions?: DataTableOptions
}

export const useRepositoryStore = defineStore(
  'repositoryStore',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: defaultValues(RepositoriesFiltration),
        chosenRepository: {},
        pending: [],
        loading: false,
        totalNumber: 0,
        tableOptions: undefined
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
      async getPage(options?: DataTableOptions) {
        if (options) {
          this.tableOptions = options
        }
        this.loading = true
        const sortField =
          this.tableOptions?.sortBy[0].key || 'name'
        const sortOrder =
          this.tableOptions?.sortBy[0].order || 'asc'
        const [repositories, pageData] =
          await fetchRepositoriesService(
            this.filtration,
            (this.tableOptions?.page || 1) - 1,
            this.tableOptions?.itemsPerPage ||
              useOATable().pageSize,
            [sortField + ',' + sortOrder]
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
      async get(
        name: string,
        technology?: Technologies,
        showProgress = false
      ): Promise<CombinedRepositoryModel[]> {
        const sort = useSortStore()

        const getFn = technology
          ? fetchTechnologyRepository.get(technology)
          : fetchRepositoriesService

        if (getFn) {
          const [repository] = await getFn(
            {
              name: name
            } as RepositoriesFiltration,
            undefined,
            undefined,
            sort.getSortBy(),
            showProgress
          )
          return repository
        }
        return []
      },
      async fetchData(
        page: number,
        pageSize: number,
        filtration: RepositoriesFiltration,
        showProgress = false
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
        newValues: Partial<
          | EntityModelRepositoryDto
          | EntityModelPythonRepositoryDto
        >
      ) {
        this.pending.push(this.chosenRepository)
        const newRepository = {
          ...deepCopy(this.chosenRepository),
          ...newValues
        }
        const updateFn = updateTechnologyRepository.get(
          newRepository.technology as Technologies
        )

        if (updateFn) {
          await updateFn(
            this.chosenRepository,
            newRepository
          )
            .then(async (success: any) => {
              if (success) {
                await this.getPage()
                if (
                  this.chosenRepository?.name &&
                  this.chosenRepository?.technology
                ) {
                  const repositories = await this.get(
                    this.chosenRepository?.name,
                    this.chosenRepository
                      ?.technology as Technologies
                  )
                  if (repositories.length > 0) {
                    this.chosenRepository = repositories[0]
                  }
                }
              }
            })
            .finally(() => {
              this.pending = this.pending.filter(
                (item) =>
                  item?.id != this.chosenRepository?.id
              )
            })
        }
      },
      async create(
        newRepository: EntityModelRepositoryDto
      ) {
        await createRepository(newRepository)?.then(
          async (success) => {
            if (success) await this.getPage()
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
        if (
          RepositoriesFiltration.safeParse(payload).success
        ) {
          this.filtration =
            RepositoriesFiltration.parse(payload)
        }
        await this.getPage()
      },
      setFiltrationBy(filtration: object) {
        this.filtration = {
          ...defaultValues(RepositoriesFiltration),
          ...(filtration as RepositoriesFiltration)
        }
      },
      async clearFiltration() {
        this.filtration = defaultValues(
          RepositoriesFiltration
        )
        // await this.getPage()
      }
    }
  }
)

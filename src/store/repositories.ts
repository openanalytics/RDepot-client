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
  EntityModelRRepositoryDto,
  EntityModelRepositoryDto
} from '@/openapi'
import { defineStore } from 'pinia'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import { fetchRepositoriesServices } from '@/services'
import { usePaginationStore } from './pagination'
import { updateRepository } from '@/services/repository_services'
import { createRepository } from '@/services/repository_services'
import { useUtilities } from '@/composable/utilities'
import { repositoriesFiltrationLabels } from '@/maps/Filtration'

const { deepCopy } = useUtilities()

interface State {
  repositories: EntityModelRepositoryDto[]
  filtration: RepositoriesFiltration
  chosenRepository: EntityModelRRepositoryDto
}

export const useRepositoryStore = defineStore(
  'repository_store',
  {
    state: (): State => {
      return {
        repositories: [],
        filtration: defaultValues(RepositoriesFiltration),
        chosenRepository: {}
      }
    },
    actions: {
      async fetchPageOfRepositories(
        page: number,
        pageSize = 8
      ) {
        const pageData = await this.fetchData(
          page,
          pageSize,
          defaultValues(RepositoriesFiltration),
          false
        )
        return pageData
      },
      async fetchRepositories() {
        const pagination = usePaginationStore()
        const pageData = await this.fetchData(
          pagination.page,
          pagination.pageSize,
          this.filtration
        )
        pagination.setPage(pageData.page)
        pagination.setTotalNumber(pageData.totalNumber)
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
      async fetchRepository(name: string) {
        const [repository] =
          await fetchRepositoriesServices(
            {
              name: name
            } as RepositoriesFiltration,
            undefined,
            undefined,
            true
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
        const pagination = usePaginationStore()
        pagination.setPage(0)
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
        this.filtration.name = payload
      },
      clearFiltration() {
        const pagination = usePaginationStore()
        pagination.setPage(0)
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

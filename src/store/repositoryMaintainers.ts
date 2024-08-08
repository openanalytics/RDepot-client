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
  updateRepositoryMaintainer,
  createRepositoryMaintainer,
  fetchRepositoryMaintainersService
} from '@/services/repositoryMaintainersServices'
import { fetchRepositoriesService } from '@/services/repositoryServices'
import { useUtilities } from '@/composable/utilities'
import { repositoryMaintainersFiltrationLabels } from '@/maps/Filtration'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'
import { useSortStore } from './sort'

const { deepCopy } = useUtilities()

interface State {
  maintainers: EntityModelRepositoryMaintainerDto[]
  filtration: RepositoryMaintainersFiltration
  repositories: EntityModelRepositoryDto[]
  pending: EntityModelRepositoryMaintainerDto[]
  chosenMaintainer: EntityModelPackageMaintainerDto
  loading: boolean
  totalNumber: number
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
        pending: [],
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
            defaultValues(RepositoryMaintainersFiltration)
          )
        )
      }
    },
    actions: {
      async getPage(options: DataTableOptions) {
        this.loading = true
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersService(
            this.filtration,
            options.page - 1,
            options.itemsPerPage,
            [
              options.sortBy[0].key +
                ',' +
                options.sortBy[0].order
            ]
          )
        this.loading = false
        this.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async getList(page: number, pageSize = 8) {
        const filtration = deepCopy(this.filtration)
        filtration.deleted = undefined
        filtration.technologies = undefined
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersService(
            filtration,
            page,
            pageSize,
            ['user.name,asc'],
            false
          )
        this.maintainers = maintainers
        return pageData
      },
      async get() {
        const pagination = usePagination()
        const sort = useSortStore()
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersService(
            this.filtration,
            pagination.fetchPage,
            pagination.pageSize,
            sort.getSortBy()
          )
        pagination.newPageWithoutRefresh(pageData.page)
        this.totalNumber = pageData.totalNumber
        this.maintainers = maintainers
      },
      async getAll(
        filtration: RepositoryMaintainersFiltration
      ) {
        let page = 0
        filtration.deleted = undefined
        filtration.technologies = undefined
        const [maintainers, pageData] =
          await fetchRepositoryMaintainersService(
            filtration,
            page,
            undefined,
            ['user.name,asc'],
            false
          )
        let result: EntityModelRepositoryMaintainerDto[] =
          maintainers
        while (pageData.totalNumber > result.length) {
          await fetchRepositoryMaintainersService(
            filtration,
            ++page,
            undefined,
            ['user.name,asc'],
            false
          ).then(([maintainers]) => {
            result = [...result, ...maintainers]
          })
        }
        return maintainers
      },
      async getRepositories() {
        const sortStore = useSortStore()
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
            sortStore.getSortBy()
          )
        this.repositories = repositories
      },
      async deleteSoft() {
        if (this.chosenMaintainer) {
          this.patch({ deleted: true })
        }
      },
      async delete() {
        if (this.chosenMaintainer) {
          await deletedRepositoryMaintainer(
            this.chosenMaintainer
          ).then(async (success) => {
            if (success) await this.get()
          })
        }
      },
      async patch(
        newValues: Partial<EntityModelPackageMaintainerDto>
      ) {
        if (
          this.chosenMaintainer.id &&
          this.chosenMaintainer.repository &&
          this.chosenMaintainer.repository.id
        ) {
          this.pending.push(this.chosenMaintainer)
          const newMaintainer = {
            ...deepCopy(this.chosenMaintainer),
            ...newValues
          }
          await updateRepositoryMaintainer(
            this.chosenMaintainer,
            newMaintainer
          )
            .then(async (success) => {
              if (success) await this.get()
            })
            .finally(() => {
              this.pending = this.pending.filter(
                (item) =>
                  item.id != this.chosenMaintainer.id
              )
            })
        }
      },
      async create(
        maintainer: Partial<EntityModelPackageMaintainerDto>
      ) {
        await createRepositoryMaintainer(maintainer).then(
          async (success) => {
            if (success) await this.get()
          }
        )
      },
      async setChosen(
        payload: EntityModelPackageMaintainerDto
      ) {
        this.chosenMaintainer = payload
      },
      async setPage(payload: number) {
        const pagination = usePagination()
        pagination.page = payload
        this.get()
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
        await this.get()
      },
      setFiltrationBy(filtration: object) {
        this.clearFiltration()
        this.filtration = {
          ...defaultValues(RepositoryMaintainersFiltration),
          ...(filtration as RepositoryMaintainersFiltration)
        }
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
        await this.get()
      },
      getLabels() {
        return repositoryMaintainersFiltrationLabels
      }
    }
  }
)

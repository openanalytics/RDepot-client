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
  EntityModelRepositoryDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import { useRepositoryMaintainersStore } from '@/store/repositoryMaintainers'
import {
  useSelectStore,
  SelectState,
  RepositoryObject
} from '@/store/selectPagination'

export function useRepositoriesFiltration() {
  const storeId: SelectState = 'repositories'

  const selectStore = useSelectStore(storeId)
  const repositoriesStore = useRepositoryStore()
  const repositoryMaintainerStore =
    useRepositoryMaintainersStore()

  async function resetRepositoriesPagination() {
    selectStore.resetPagination()
    selectStore.resetItems()
  }

  async function loadRepositories() {
    if (
      selectStore.items.length !=
        selectStore.paginationData.totalNumber ||
      selectStore.paginationData.totalNumber == -1
    ) {
      selectStore.nextPage()
      if (selectStore.fetchNextPageCondition) {
        await repositoriesStore
          .getList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          repositoriesStore.repositories.map(
            (repository: EntityModelRepositoryDto) =>
              repository.name
          )
        )
      }
    }
  }

  function prepareRepositoryObject(
    repository: EntityModelRepositoryDto,
    repositoryMaintainedByUser?: EntityModelRepositoryMaintainerDto
  ): RepositoryObject {
    return {
      title: repository.name,
      value: repository.id,
      props: {
        id: `select-input-repository-${repository.name}`,
        technology: repository.technology,
        subtitle: repositoryMaintainedByUser?.user?.name,
        disabled:
          repositoryMaintainedByUser?.user?.name || false
      }
    } as RepositoryObject
  }

  async function prepareRepositories(userName?: string) {
    let repositoriesMaintainedByUser: EntityModelRepositoryMaintainerDto[] =
      []
    if (userName) {
      repositoriesMaintainedByUser =
        await repositoryMaintainerStore.fetchAndReturnAllMaintainers(
          {
            deleted: false,
            search: userName,
            technologies: undefined
          }
        )
    }

    return repositoriesStore.repositories.map(
      (repository: EntityModelRepositoryDto) => {
        const repositoryMaintainedByUser =
          repositoriesMaintainedByUser.find(
            (maintainedRepository) =>
              maintainedRepository.repository?.id ==
              repository.id
          )
        return prepareRepositoryObject(
          repository,
          repositoryMaintainedByUser
        )
      }
    )
  }

  async function loadRepositoriesObjects(
    userName?: string
  ) {
    if (
      selectStore.items.length !=
        selectStore.paginationData.totalNumber ||
      selectStore.paginationData.totalNumber == -1
    ) {
      selectStore.nextPage()
      if (selectStore.fetchNextPageCondition) {
        await repositoriesStore
          .getList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          await prepareRepositories(userName)
        )
      }
    }
  }

  function filtrateRepositories(value: string | undefined) {
    if (repositoriesStore.filtration.name !== value) {
      repositoriesStore.setFiltrationBy('search', value)
    }
  }

  function filtrateRepositoriesObjects(
    value: string | undefined
  ) {
    if (value === undefined) {
      repositoriesStore.clearFiltration()
    } else if (
      repositoriesStore.filtration.name !== value
    ) {
      resetRepositoriesPagination()
      repositoriesStore.setFiltrationBy('search', value)
    }
  }

  return {
    storeId,
    loadRepositories,
    loadRepositoriesObjects,
    resetRepositoriesPagination,
    filtrateRepositories,
    filtrateRepositoriesObjects
  }
}

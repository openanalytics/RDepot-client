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

import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import {
  useSelectStore,
  SelectState,
  RepositoryObject
} from '@/store/select_pagination'

export function useRepositoriesFiltration() {
  const storeId: SelectState = 'repositories'

  const selectStore = useSelectStore(storeId)
  const repositoriesStore = useRepositoryStore()

  async function resetPagination() {
    selectStore.resetPagination()
    selectStore.resetItems()
  }

  async function loadRepositories() {
    selectStore.paginationData =
      await repositoriesStore.fetchRepositoriesList(
        selectStore.paginationData.page
      )
    selectStore.addItems(
      repositoriesStore.repositories.map(
        (repository: EntityModelRepositoryDto) =>
          repository.name
      )
    )
  }

  async function loadRepositoriesObjects() {
    selectStore.paginationData =
      await repositoriesStore.fetchRepositoriesList(
        selectStore.paginationData.page,
        2
      )
    selectStore.addItems(
      repositoriesStore.repositories.map(
        (repository: EntityModelRepositoryDto) => {
          return {
            title: repository.name,
            value: repository.id,
            props: { technology: repository.technology }
          } as RepositoryObject
        }
      )
    )
  }

  function filtrateRepositories(value: string | undefined) {
    if (repositoriesStore.filtration.name !== value) {
      repositoriesStore.setFiltrationByName(value)
    }
  }

  function filtrateRepositoriesObjects(
    value: string | undefined
  ) {
    if (repositoriesStore.filtration.name !== value) {
      repositoriesStore.setFiltrationByName(value)
    }
  }

  return {
    storeId,
    loadRepositories,
    loadRepositoriesObjects,
    resetPagination,
    filtrateRepositories,
    filtrateRepositoriesObjects
  }
}

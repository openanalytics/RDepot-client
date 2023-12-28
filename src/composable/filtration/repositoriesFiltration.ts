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

import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoryStore } from '@/store/repositories'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function useRepositoriesFiltration() {
  const storeId: SelectState = 'repositories'

  const selectStore = useSelectStore(storeId)
  const repositoriesStore = useRepositoryStore()

  async function loadRepositories() {
    selectStore.paginationData =
      await repositoriesStore.fetchRepositoriesList()
    selectStore.addItems(
      repositoriesStore.repositories.map(
        (repository: EntityModelRepositoryDto) =>
          repository.name
      )
    )
  }

  function filtrateRepositories(value: string | undefined) {
    if (repositoriesStore.filtration.name !== value) {
      repositoriesStore.setFiltrationByName(value)
    }
  }

  return {
    storeId,
    loadRepositories,
    filtrateRepositories
  }
}

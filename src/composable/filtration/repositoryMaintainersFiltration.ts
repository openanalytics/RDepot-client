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

import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function useRepositoryMaintainersFiltration() {
  const storeIdMaintainer: SelectState =
    'repositoryMaintainers'

  const selectStore = useSelectStore(storeIdMaintainer)
  const repositoryMaintainerStore =
    useRepositoryMaintainersStore()

  async function resetPaginationMaintainers() {
    selectStore.resetItems()
    selectStore.resetPagination()
  }

  async function loadMaintainers() {
    if (
      selectStore.items.length !=
        selectStore.paginationData.totalNumber ||
      selectStore.paginationData.totalNumber == -1
    ) {
      selectStore.setPage(
        selectStore.paginationData.page + 1
      )
      if (
        selectStore.shouldFetchNextPage &&
        ((selectStore.paginationData.totalNumber > 0 &&
          selectStore.paginationData.page <=
            Math.ceil(
              selectStore.paginationData.totalNumber /
                selectStore.pageSize
            )) ||
          selectStore.paginationData.totalNumber < 0)
      ) {
        await repositoryMaintainerStore
          .fetchMaintainersList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          repositoryMaintainerStore.maintainers.map(
            (
              maintainer: EntityModelRepositoryMaintainerDto
            ) => maintainer.user?.name
          )
        )
      }
    }
  }

  function filtrateMaintainers(value: string | undefined) {
    if (value === undefined) {
      repositoryMaintainerStore.clearFiltration()
    } else if (
      repositoryMaintainerStore.filtration.search !== value
    ) {
      resetPaginationMaintainers()
      repositoryMaintainerStore.setFiltrationByName(value)
    }
  }

  return {
    storeIdMaintainer,
    loadMaintainers,
    resetPaginationMaintainers,
    filtrateMaintainers
  }
}

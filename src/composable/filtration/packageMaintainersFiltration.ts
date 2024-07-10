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

import { EntityModelPackageMaintainerDto } from '@/openapi'
import { usePackageMaintainersStore } from '@/store/packageMaintainers'
import {
  useSelectStore,
  SelectState
} from '@/store/selectPagination'

export function usePackageMaintainersFiltration() {
  const storeIdMaintainer: SelectState =
    'packageMaintainers'

  const selectStore = useSelectStore(storeIdMaintainer)
  const packageMaintainerStore =
    usePackageMaintainersStore()

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
      selectStore.nextPage()
      if (selectStore.fetchNextPageCondition) {
        await packageMaintainerStore
          .getList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          packageMaintainerStore.maintainers.map(
            (maintainer: EntityModelPackageMaintainerDto) =>
              maintainer.user?.name
          )
        )
      }
    }
  }

  function filtrateMaintainers(value: string | undefined) {
    if (value === undefined) {
      packageMaintainerStore.clearFiltration()
    } else if (
      packageMaintainerStore.filtration.search !== value
    ) {
      resetPaginationMaintainers()
      packageMaintainerStore.setFiltrationBy(
        'search',
        value
      )
    }
  }

  return {
    storeIdMaintainer,
    loadMaintainers,
    resetPaginationMaintainers,
    filtrateMaintainers
  }
}

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

  async function loadMaintainers() {
    await repositoryMaintainerStore.fetchAllMaintainers()
    selectStore.addItems(
      repositoryMaintainerStore.maintainers.map(
        (maintainer: EntityModelRepositoryMaintainerDto) =>
          maintainer.user?.name
      )
    )
  }

  function filtrateMaintainers(value: string | undefined) {
    // if (
    //   repositoryMaintainerStore.filtration.name !== value
    // ) {
    //   // repositoryMaintainerStore.setFiltrationByName(value)
    // }
  }

  return {
    storeIdMaintainer,
    loadMaintainers,
    filtrateMaintainers
  }
}

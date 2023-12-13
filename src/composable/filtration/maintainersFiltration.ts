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

import { EntityModelPackageMaintainerDto } from '@/openapi'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'
import { useSortStore } from '@/store/sort'

export function usePackageMaintainersFiltration() {
  const storeIdMaintainer: SelectState =
    'packageMaintainers'

  const selectStore = useSelectStore(storeIdMaintainer)
  const packageMaintainerStore =
    usePackageMaintainersStore()

  async function loadMaintainers() {
    const sort = useSortStore()
    sort.setDefaultFields('user.name', 'asc')
    sort.resetSort()
    await packageMaintainerStore.fetchMaintainers()
    console.log(packageMaintainerStore.maintainers)
    selectStore.addItems(
      packageMaintainerStore.maintainers.map(
        (maintainer: EntityModelPackageMaintainerDto) =>
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

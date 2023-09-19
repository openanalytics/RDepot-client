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

import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import {
  useSelectStore,
  SelectState
} from '@/store/select_pagination'

export function usePackagesFiltration() {
  const storeId: SelectState = 'packages'

  const selectStore = useSelectStore(storeId)
  const packagesStore = usePackagesStore()

  async function loadPackages() {
    selectStore.paginationData =
      await packagesStore.fetchPageOfPackages(
        selectStore.paginationData.page
      )
    selectStore.addItems(
      packagesStore.packages.map(
        (packageBag: EntityModelPackageDto) =>
          packageBag.name
      )
    )
  }

  function filtratePackages(value: string | undefined) {
    if (packagesStore.filtration.repository !== value) {
      packagesStore.setFiltrationByRepositoryOnly(value)
    }
  }

  return {
    storeId,
    loadPackages,
    filtratePackages
  }
}

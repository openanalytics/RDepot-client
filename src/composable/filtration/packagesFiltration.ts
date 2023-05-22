/* 
 *  R Depot
 *  
 *  Copyright (C) 2012-2023 Open Analytics NV
 *  
 *  ===========================================================================
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *  
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
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

  const select_store = useSelectStore(storeId)
  const packages_store = usePackagesStore()

  async function loadPackages() {
    select_store.paginationData =
      await packages_store.fetchPageOfPackages(
        select_store.paginationData.page
      )
    select_store.addItems(
      packages_store.packages.map(
        (packageBag: EntityModelPackageDto) =>
          packageBag.name
      )
    )
  }

  function filtratePackages(value: string | undefined) {
    if (packages_store.filtration.repository !== value) {
      packages_store.setFiltrationByRepositoryOnly(value)
    }
  }

  return {
    storeId,
    loadPackages,
    filtratePackages
  }
}

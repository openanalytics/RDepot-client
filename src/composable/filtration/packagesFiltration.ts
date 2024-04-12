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

import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import {
  useSelectStore,
  SelectState,
  PackageObject
} from '@/store/select_pagination'

export function usePackagesFiltration() {
  const storeIdPackage: SelectState = 'packages'

  const selectStore = useSelectStore(storeIdPackage)
  const packagesStore = usePackagesStore()

  async function resetPaginationPackages() {
    selectStore.resetPagination()
    selectStore.resetItems()
  }

  async function loadPackagesObjects() {
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
        await packagesStore
          .fetchPackagesList(
            selectStore.paginationData.page - 1,
            selectStore.pageSize
          )
          .then((res) => {
            selectStore.paginationData.totalNumber =
              res.totalNumber
          })
        selectStore.addItems(
          packagesStore.packages.map(
            (packageBag: EntityModelPackageDto) => {
              return {
                title: packageBag.name,
                value: packageBag.name,
                props: { subtitle: packageBag.user?.name }
              } as PackageObject
            }
          )
        )
      }
    }
  }

  function filtratePackagesObjects(
    value: string | undefined
  ) {
    if (packagesStore.filtration.repository !== value) {
      packagesStore.setFiltrationByRepositoryOnly(value)
    }
  }

  return {
    storeIdPackage,
    loadPackagesObjects,
    filtratePackagesObjects,
    resetPaginationPackages
  }
}

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
  EntityModelPackageDto,
  PackageMaintainerDto
} from '@/openapi'
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import { usePackagesStore } from '@/store/options/packages'
import {
  useSelectStore,
  SelectState,
  PackageObject
} from '@/store/setup/selectPagination'
import { useArrayUnique } from '@vueuse/core'

export function usePackagesFiltration() {
  const storeIdPackage: SelectState = 'packages'

  const selectStore = useSelectStore(storeIdPackage)
  const packagesStore = usePackagesStore()
  const packageMaintainerStore =
    usePackageMaintainersStore()
  async function resetPaginationPackages() {
    selectStore.resetPagination()
    selectStore.resetItems()
  }

  function preparePackageMaintainerObject(
    packageBag: EntityModelPackageDto,
    packageMaintainedByUser?: PackageMaintainerDto
  ): PackageObject {
    return {
      title: packageBag.name,
      value: packageBag.name,
      props: {
        id: `select-input-package-${packageBag.name}-${packageBag.repository?.name}`,
        subtitle: [
          packageMaintainedByUser?.user?.name,
          packageBag.user?.name
        ]
          .filter(function (val) {
            return val
          })
          .join(', '),
        repoId: packageBag.repository?.id,
        disabled:
          packageMaintainedByUser?.user?.name || false
      }
    } as PackageObject
  }

  function preparePackageRepoObject(
    packageBag: EntityModelPackageDto
  ): PackageObject {
    return {
      title: packageBag.name,
      value: packageBag.name,
      props: {
        id: `select-input-package-${packageBag.name}-${packageBag.version}-${packageBag.repository?.name}`,
        subtitle: [packageBag.repository?.name]
          .filter(function (val) {
            return val
          })
          .join(', '),
        repoId: packageBag.repository?.id
      }
    } as PackageObject
  }

  async function preparePackages(
    userName: string,
    repositoryName: string
  ) {
    const packagesMaintainedByUser =
      await packageMaintainerStore.getAll({
        deleted: false,
        search: userName,
        repository: [repositoryName]
      })

    return packagesStore.packages.map(
      (packageBag: EntityModelPackageDto) => {
        const packageMaintainedByUser =
          packagesMaintainedByUser.find(
            (maintainedPackage) =>
              maintainedPackage.packageName ==
              packageBag.name
          )
        if (packageBag.user?.name == userName) {
          packageBag.user = {}
        }
        return preparePackageMaintainerObject(
          packageBag,
          packageMaintainedByUser
        )
      }
    )
  }

  async function getPackages() {
    await packagesStore
      .getList(
        selectStore.paginationData.page - 1,
        selectStore.pageSize
      )
      .then((res) => {
        selectStore.paginationData.totalNumber =
          res.totalNumber

        selectStore.paginationData.totalPages =
          res.totalPages
      })
  }

  async function loadPackagesObjects(
    userName: string,
    repositoryName: string
  ) {
    if (selectStore.shouldFetchNextPage) {
      selectStore.nextPage()
      if (selectStore.shouldFetchNextPage) {
        await getPackages()
        selectStore.addItems(
          await preparePackages(userName, repositoryName)
        )
      }
    }
  }

  async function loadPackagesRepositoriesObjects() {
    if (selectStore.shouldFetchNextPage) {
      selectStore.nextPage()
      if (selectStore.shouldFetchNextPage) {
        await getPackages()

        const packageList = packagesStore.packages.map(
          (packageBag: EntityModelPackageDto) => {
            return preparePackageRepoObject(packageBag)
          }
        )

        const uniquePackageList: PackageObject[] =
          useArrayUnique(
            packageList,
            (a: PackageObject, b: PackageObject) =>
              a.title === b.title &&
              a.props.subtitle === b.props.subtitle
          ).value

        selectStore.addItems(uniquePackageList)
      }
    }
  }

  function filtratePackagesObjects(
    value: string | undefined
  ) {
    if (value === undefined) {
      packagesStore.filtration.search = undefined
    } else if (packagesStore.filtration.search !== value) {
      resetPaginationPackages()
      packagesStore.filtration.search = value
    }
  }

  return {
    storeIdPackage,
    loadPackagesObjects,
    filtratePackagesObjects,
    resetPaginationPackages,
    loadPackagesRepositoriesObjects
  }
}

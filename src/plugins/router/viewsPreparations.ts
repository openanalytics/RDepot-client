/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import { usePackageMaintainersFiltration } from '@/composable/filtration/packageMaintainersFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/repositoryMaintainersFiltration'
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import { usePackagesStore } from '@/store/options/packages'
import { useSubmissionStore } from '@/store/options/submission'

export function preparePackagesView() {
  const packagesStore = usePackagesStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  const { resetPaginationMaintainers } =
    usePackageMaintainersFiltration()
  packagesStore.pending = []
  resetPaginationMaintainers()
  resetRepositoriesPagination()
}

export function prepareEventsView() {
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  resetRepositoriesPagination()
}

export function prepareSubmissionsView() {
  const submissionStore = useSubmissionStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  resetRepositoriesPagination()
  submissionStore.submissionsToEdit = undefined
}

export function preparePackageMaintainersView() {
  const packageMaintainersStore =
    usePackageMaintainersStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  packageMaintainersStore.pending = []
  resetRepositoriesPagination()
}

export function prepareRepositoriesView() {
  const { resetPaginationMaintainers } =
    useRepositoryMaintainersFiltration()
  resetPaginationMaintainers()
}

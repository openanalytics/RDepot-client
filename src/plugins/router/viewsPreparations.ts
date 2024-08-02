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

import { usePackageMaintainersFiltration } from '@/composable/filtration/packageMaintainersFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/repositoryMaintainersFiltration'
import { usePackageMaintainersStore } from '@/store/packageMaintainers'
import { useRepositoryStore } from '@/store/repositories'
import { useRepositoryMaintainersStore } from '@/store/repositoryMaintainers'
import { useSubmissionStore } from '@/store/submission'

export function prepareUploadPackagesView() {
  const submissionStore = useSubmissionStore()
  submissionStore.updateStepperKey()
  submissionStore.repository = undefined
  submissionStore.packages = []
}

export function preparePackagesView() {
  const repositoryStore = useRepositoryStore()
  const packageMaintainerStore =
    usePackageMaintainersStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  const { resetPaginationMaintainers } =
    usePackageMaintainersFiltration()
  repositoryStore.clearFiltration()
  packageMaintainerStore.clearFiltration()
  resetPaginationMaintainers()
  resetRepositoriesPagination()
}

export function prepareSubmissionsView() {
  const submissionStore = useSubmissionStore()
  const repositoryStore = useRepositoryStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  repositoryStore.clearFiltration()
  resetRepositoriesPagination()
  submissionStore.submissionsToEdit = undefined
}

export function preparePackageMaintainersView() {
  const repositoryStore = useRepositoryStore()
  const { resetRepositoriesPagination } =
    useRepositoriesFiltration()
  repositoryStore.clearFiltration()
  resetRepositoriesPagination()
}

export function prepareRepositoriesView() {
  const repositoryStore = useRepositoryStore()
  const repositoryMaintainersStore =
    useRepositoryMaintainersStore()
  const { resetPaginationMaintainers } =
    useRepositoryMaintainersFiltration()
  repositoryMaintainersStore.clearFiltration()
  repositoryStore.clearFiltration()
  resetPaginationMaintainers()
}

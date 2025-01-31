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

import { EntityModelRPackageDto } from '@/openapi'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { computed } from 'vue'

export function usePackageFiles() {
  const packageDetailsStore = usePackageDetailsStore()
  const packageBag = computed<EntityModelRPackageDto>(
    () =>
      packageDetailsStore.packageBag as EntityModelRPackageDto
  )

  async function openVignette(fileName?: string) {
    if (packageBag.value.id && fileName) {
      await packageDetailsStore.openVignette(
        packageBag.value.id.toString(),
        fileName
      )
    }
  }

  async function downloadVignette(fileName?: string) {
    if (packageBag.value.id && fileName) {
      await packageDetailsStore.getVignette(
        packageBag.value.id.toString(),
        fileName
      )
    }
  }

  async function downloadSourceFile() {
    if (
      packageBag.value.id &&
      packageBag.value.name &&
      packageBag.value.version &&
      packageBag.value.technology
    ) {
      await packageDetailsStore.getSourceFile(
        packageBag.value.id.toString(),
        packageBag.value.name,
        packageBag.value.version,
        packageBag.value.technology
      )
    }
  }

  async function downloadManual() {
    if (
      packageDetailsStore.packageBag &&
      packageDetailsStore.packageBag.id
    ) {
      await packageDetailsStore.getManual(
        packageDetailsStore.packageBag.id.toString(),
        `${packageDetailsStore.packageBag.name}_${packageDetailsStore.packageBag.version}_manual`
      )
    }
  }

  return {
    openVignette,
    downloadVignette,
    downloadSourceFile,
    downloadManual
  }
}

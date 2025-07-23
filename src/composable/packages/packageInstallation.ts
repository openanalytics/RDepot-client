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

export function usePackageInstallation() {
  const packageDetailsStore = usePackageDetailsStore()

  const packageBag = computed<EntityModelRPackageDto>(
    () =>
      packageDetailsStore.packageBag as EntityModelRPackageDto
  )

  const installCommands = {
    python: {
      standard: `pip install --index-url ${packageBag.value.repository?.publicationUri} ${packageBag.value.name}`,
      crane: `crane pip install --index-url ${packageBag.value.repository?.publicationUri} ${packageBag.value.name}`
    },

    r: {
      standard: `install.packages("${packageBag.value.name}", repos = c("rdepot_${packageBag.value.repository?.name}" = "${packageBag.value.repository?.publicationUri}", getOption("repos")))`,
      binary: `install.packages("${packageBag.value.name}", repos = c("rdepot_${packageBag.value.repository?.name}_binary" = "${packageBag.value.repository?.publicationUri}/linux/${packageBag.value.distribution}", "rdepot_${packageBag.value.repository?.name}_source" = "${packageBag.value.repository?.publicationUri}", getOption("repos")), headers = c("User-Agent" = getOption("HTTPUserAgent")))`
    }
  }

  const installHints = computed(() => {
    return {
      notPublished:
        'properties.packages.noInstallInstruction',
      python: {
        standard:
          'properties.packages.installInstruction-Python'
      },

      r: {
        standard:
          'properties.packages.installInstruction-R',
        standardCrane:
          'properties.packages.installInstructionCrane-R',
        binary:
          'properties.packages.installInstructionBinary',
        binaryCrane:
          'properties.packages.installInstructionBinaryCrane'
      }
    }
  })

  return { installCommands, installHints }
}

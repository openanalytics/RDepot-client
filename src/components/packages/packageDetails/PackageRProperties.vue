<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <template
    v-for="({ translation, value, id }, idx) in details"
    :key="idx"
  >
    <Property
      :id="id"
      :title="$t(translation)"
      :value="value || $t('package.propertyNotProvided')"
      :collapsible="false"
      show-divider
    />
  </template>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import Property from '@/components/packages/packageDetails/PackageProperty.vue'

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const details = computed(() => {
  return [
    {
      translation: 'packages.version',
      value: packageBag.value.version,
      id: 'r-package-version-property'
    },
    {
      translation: 'packages.systemRequirements',
      value: packageBag.value.systemRequirements,
      id: 'r-package-system-requirements-property'
    },
    {
      translation: 'packages.license',
      value: packageBag.value.license,
      id: 'r-package-license-property'
    },
    {
      translation: 'packages.url',
      value: packageBag.value.url,
      id: 'r-package-url-property'
    },
    {
      translation: 'packages.depends',
      value: packageBag.value.depends,
      id: 'r-package-depends-property'
    },
    {
      translation: 'packages.imports',
      value: packageBag.value.imports,
      id: 'r-package-imports-property'
    },
    {
      translation: 'packages.suggests',
      value: packageBag.value.suggests,
      id: 'r-package-suggests-property'
    },
    {
      translation: 'packages.md5sum',
      value: packageBag.value.md5sum,
      id: 'r-package-md5sum-property'
    }
  ]
})
</script>

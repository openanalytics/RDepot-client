<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <RPackageDetails
    v-if="
      package_store.package?.technology ===
      Technologies.enum.R
    "
  />
  <PythonPackageDetails
    v-if="
      package_store.package?.technology ===
      Technologies.enum.Python
    "
  />
</template>

<script setup lang="ts">
import RPackageDetails from '@/components/packages/RPackageDetails.vue'
import PythonPackageDetails from '@/components/packages/PythonPackageDetails.vue'
import { usePackagesStore } from '@/store/packages'
import { Technologies } from '@/enum/Technologies'
import { onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const package_store = usePackagesStore()
const route = useRoute()

onBeforeMount(async () => {
  await package_store.fetchPackage(Number(route.params.id))
})
</script>

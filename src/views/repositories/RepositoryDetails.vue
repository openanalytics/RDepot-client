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
  <div>
    <div class="repositoryname mt-10 ml-5">
      {{ props.name }}
    </div>
    <ShortPackagesList class="mt-10"></ShortPackagesList>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/common/Pagination.vue'
import ShortPackagesList from '@/components/packages/shortPackages/ShortPackagesList.vue'
import { usePackagesStore } from '@/store/packages'
import { onBeforeMount } from 'vue'

const props = defineProps({ name: String })

const package_store = usePackagesStore()

onBeforeMount(() => {
  if (props.name) {
    package_store.fetchPackages({
      repository: props.name,
      deleted: false
    })
  }
})
</script>

<style>
.repositoryname {
  font-size: 1.5em;
}
</style>

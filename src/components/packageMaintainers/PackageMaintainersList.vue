<template>
  <ResourcesList
    :resources="package_maintainers_store.maintainers"
  >
    <template #title>
      <PackageMaintainerRow title />
    </template>
    <template #expansion-row="slotProps">
      <PackageMaintainerRow
        :packageMaintainer="slotProps.resource"
      />
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { onBeforeMount } from 'vue'
import PackageMaintainerRow from '@/components/packageMaintainers/PackageMaintainerRow.vue'
import EmptyListing from '@/components/common/EmptyListing.vue'

const package_maintainers_store =
  usePackageMaintainersStore()

function updateData(): void {
  package_maintainers_store.fetchMaintainers()
}

onBeforeMount(() => {
  updateData()
})
</script>
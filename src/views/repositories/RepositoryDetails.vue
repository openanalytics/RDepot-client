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
    package_store.setFiltrationByRepositoryOnly(props.name)
  }
})
</script>

<style>
.repositoryname {
  font-size: 1.5em;
}
</style>

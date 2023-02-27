<template>
  <div>
    <div class="repositoryname mt-10 ml-5">
      {{ props.name }}
    </div>
    <ShortPackagesList class="mt-10"></ShortPackagesList>
  </div>
</template>

<script setup lang="ts">
import ShortPackagesList from '@/components/packages/shortPackages/ShortPackagesList.vue'

const props = defineProps({ name: String })
</script>

<style>
.repositoryname {
  font-size: 1.5em;
}
</style>

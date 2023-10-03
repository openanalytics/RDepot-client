<template>
  {{ packagesStore.packages }}
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { onMounted } from 'vue'

const packagesStore = usePackagesStore()

onMounted(() => {
  packagesStore.fetchPackages()
})
</script>

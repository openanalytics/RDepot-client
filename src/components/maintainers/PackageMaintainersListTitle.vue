<template>
  <v-expansion-panel>
    <PackageMaintainerRow :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PackageMaintainerRow from '@/components/maintainers/PackageMaintainerRow.vue'
const title = ref(true)
</script>

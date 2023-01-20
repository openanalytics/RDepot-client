<template>
  <v-expansion-panel>
    <package-row :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PackageRow from '@/components/packages/PackageRow.vue'
const title = ref(true)
</script>

<template>
  <v-expansion-panel>
    <RepositoryMaintainerRow :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RepositoryMaintainerRow from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'
const title = ref(true)
</script>

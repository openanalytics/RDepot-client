<template>
  <v-expansion-panel>
    <repository-row :title="title" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RepositoryRow from '@/components/repositories/RepositoryRow.vue'
const title = ref(true)
</script>

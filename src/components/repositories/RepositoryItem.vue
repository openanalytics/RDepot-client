<template>
  <v-expansion-panel>
    <repository-row :repository="props.repository" />
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { EntityModelRRepositoryDto } from '@/openapi'
import RepositoryRow from './RepositoryRow.vue'

const props = defineProps({
  repository: Object as () => EntityModelRRepositoryDto
})
</script>

<style lang="scss">
.content-divider {
  padding: 0 0 30px 0;
}
.content {
  text-align: justify;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}
</style>

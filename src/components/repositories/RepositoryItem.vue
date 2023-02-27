<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      @click="navigate"
      readonly
      id="expansionpaneltitle"
      class="no-icon"
    >
      <repository-row :repository="props.repository" />
    </v-expansion-panel-title>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { EntityModelRRepositoryDto } from '@/openapi'
import router from '@/router'
import RepositoryRow from './RepositoryRow.vue'

const props = defineProps({
  repository: Object as () => EntityModelRRepositoryDto
})

function navigate() {
  if (props.repository) {
    router.replace({
      name: 'repositoryDetails',
      params: {
        name: props.repository.name
      }
    })
  }
}
</script>

<style lang="scss">
.content {
  text-align: justify;
  font-size: 14px;
  padding: 0 40px 0 0;
}

.v-expansion-panel-title__icon {
  display: none !important;
}
.v-expansion-panel-title {
  padding: 0 !important;
}
</style>

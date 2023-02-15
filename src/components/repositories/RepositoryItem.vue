<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      id="expansionpaneltitle"
      class="no-icon"
    >
      <RepositoryRow :repository="props.repository" />
    </v-expansion-panel-title>
    <!-- <v-expansion-panel-text>
      <v-divider class="content-divider" />
      <div class="content">
        {{ props.repository?. }}
      </div>
    </v-expansion-panel-text> -->
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

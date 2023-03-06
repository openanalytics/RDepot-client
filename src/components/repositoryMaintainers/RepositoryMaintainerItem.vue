<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      readonly
      id="expansionpaneltitle"
      class="no-icon"
    >
      <RepositoryMaintainerRow
        :repositoryMaintainer="repositoryMaintainer"
      />
    </v-expansion-panel-title>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import RepositoryMaintainerRow from '@/components/repositoryMaintainers/RepositoryMaintainerRow.vue'

const props = defineProps({
  repositoryMaintainer:
    Object as () => EntityModelRepositoryMaintainerDto
})
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

#shortpackagelist {
  .v-expansion-panel-title {
    padding: 16px 24px !important;
  }
}
</style>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      readonly
      id="expansionpaneltitle"
      class="no-icon"
    >
      <PackageMaintainerRow
        :packageMaintainer="props.packageMaintainer"
      />
    </v-expansion-panel-title>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import PackageMaintainerRow from '@/components/maintainers/PackageMaintainerRow.vue'
import { EntityModelPackageMaintainerDto } from '@/openapi'

const props = defineProps({
  packageMaintainer:
    Object as () => EntityModelPackageMaintainerDto
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

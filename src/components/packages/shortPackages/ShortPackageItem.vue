<template>
  <v-expansion-panel id="shortpackagelist">
    <v-expansion-panel-title
      id="expansionpaneltitle"
      class="no-icon"
    >
      <ShortPackageRow :packageBag="props.packageBag" />
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="content mt-2">
        {{ props.packageBag?.description }}
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { EntityModelPackageDtoObjectObject } from '@/openapi'
import ShortPackageRow from './ShortPackageRow.vue'

const props = defineProps({
  packageBag:
    Object as () => EntityModelPackageDtoObjectObject
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

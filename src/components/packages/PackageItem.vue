<template>
  <v-expansion-panel>
    <v-expansion-panel-title
      id="expansionpaneltitle"
      class="no-icon"
    >
      <PackageRow :packageBag="props.packageBag" />
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="content mt-2">
        {{ props.packageBag?.description }}
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import PackageRow from '@/components/packages/PackageRow.vue'
import { EntityModelPackageDtoObjectObject } from '@/openapi'

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

.v-expansion-panel-title {
  padding: 0 !important;
}
</style>

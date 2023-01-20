<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title
        id="expansionpaneltitle"
        class="no-icon"
      >
        <PackageRow :packageBag="props.packageBag" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-divider class="content-divider" />
        <div class="content">
          {{ props.packageBag?.desc }}
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { Package } from '@/models/packages/Package'
import PackageRow from '@/components/packages/PackageRow.vue'

const props = defineProps({
  packageBag: Object as () => Package
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

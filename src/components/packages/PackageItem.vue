<template>
  <v-expansion-panel>
    <v-expansion-panel-title expand-icon="">
      <PackageRow :packageBag="props.packageBag" />
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-divider class="content-divider" />
      <div class="content">{{ props.packageBag?.desc }}</div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { Package } from "@/models/packages/Package";
import PackageRow from "./PackageRow.vue";

const props = defineProps({
  packageBag: Object as () => Package,
});
</script>

<style scoped lang="scss">
.content-divider {
  padding: 0 0 30px 0;
}
.content {
  // margin: 0 auto 10px auto;
  text-align: justify;
  padding: 0 40px 0 0;
}
</style>

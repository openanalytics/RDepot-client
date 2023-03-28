<template>
  <v-expansion-panels
    variant="inset"
    class="v-expansion mx-5"
  >
    <v-expansion-panel class="py-3">
      <PackageRow :title="true" />
    </v-expansion-panel>
    <EmptyListing
      v-show="packages === undefined || !packages.length"
    />
    <v-expansion-panel
      v-for="(item, index) in packages"
      :key="index"
    >
      <v-expansion-panel-title
        id="expansionpaneltitle"
        class="no-icon"
      >
        <PackageRow :packageBag="item" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="content mt-2">
          {{ item?.description }}
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { computed, onMounted } from 'vue'
import PackageRow from './PackageRow.vue'
import EmptyListing from '../common/EmptyListing.vue'

const packages_store = usePackagesStore()

const packages = computed(function () {
  return packages_store.packages
})

function updateState(): void {
  packages_store.fetchPackages()
}

onMounted(() => {
  updateState()
})
</script>

<style>
.v-expansion {
  max-width: 96% !important;
}

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

.v-col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.v-input__details {
  display: none !important;
}
</style>

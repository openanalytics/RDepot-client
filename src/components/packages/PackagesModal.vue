<template>
  <Overlay v-on:action="clearFiltration()">
    <template v-slot:props="{ closeModal }">
      <Filtration
        v-if="getFiltration"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/packages/Filtration.vue'
import { usePackagesStore } from '@/store/packages'

const packages_store = usePackagesStore()
const common_store = useCommonStore()

async function clearFiltration() {
  if (getFiltration.value) {
    await packages_store.clearFiltrationAndFetch()
  } else {
    const fields: Map<string, any> = new Map<string, any>()
    fields.set('deleted', true)
    packages_store.updatePackage(fields)
  }
}

const getFiltration = computed(common_store.isFiltration)
</script>

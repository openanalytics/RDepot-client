<template>
  <Overlay v-on:action="overlayEvent()">
    <template v-slot:props="{ closeModal }">
      <Filtration
        v-if="getFiltration"
        v-on:closeModal="closeModal"
      />
      <PackageMaintainerEdit
        v-if="getEdit"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/packageMaintainers/Filtration.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import PackageMaintainerEdit from '@/components/packageMaintainers/PackageMaintainerEdit.vue'

const maintainers_store = usePackageMaintainersStore()
const common_store = useCommonStore()

async function overlayEvent() {
  if (common_store.isReset()) {
    await maintainers_store.clearFiltrationAndFetch()
  } else if (common_store.isDelete()) {
    maintainers_store.deleteChosenMaintainer()
  }
}

const getFiltration = computed(common_store.isFiltration)

const getEdit = computed(common_store.isEdit)
</script>

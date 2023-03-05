<template>
  <Overlay v-on:action="clearFiltration()">
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
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/packageMaintainers/Filtration.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import PackageMaintainerEdit from './PackageMaintainerEdit.vue'

const maintainers_store = usePackageMaintainersStore()
const common_store = useCommonStore()

async function clearFiltration() {
  await maintainers_store.clearFiltrationAndFetch()
}

const getFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.MaintainersFiltration
  )
})

const getEdit = computed(() => {
  return common_store.overlayComponent == OverlayEnum.Edit
})
</script>

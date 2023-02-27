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
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { computed } from 'vue'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/repositories/Filtration.vue'
import { useRepositoryStore } from '@/store/repositories'

const repositories_store = useRepositoryStore()
const common_store = useCommonStore()

async function clearFiltration() {
  await repositories_store.clearFiltrationAndFetch()
}

const getFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.RepositoryFiltration
  )
})
</script>

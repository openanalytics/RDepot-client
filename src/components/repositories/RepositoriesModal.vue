<template>
  <Overlay v-on:action="performAction()">
    <template v-slot:props="{ closeModal }">
      <Filtration
        v-if="common_store.isFiltration()"
        v-on:closeModal="closeModal"
      />
      <Creation
        v-if="common_store.isCreate()"
        v-on:closeModal="closeModal"
      />
    </template>
  </Overlay>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/repositories/Filtration.vue'
import Creation from '@/components/repositories/Creation.vue'
import { useRepositoryStore } from '@/store/repositories'

const repositories_store = useRepositoryStore()
const common_store = useCommonStore()

async function performAction() {
  if (common_store.isFiltration()) {
    await repositories_store.clearFiltrationAndFetch()
  } else if (common_store.isDelete()) {
    await repositories_store.softDelete()
  }
}
</script>

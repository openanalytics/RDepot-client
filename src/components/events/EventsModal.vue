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
import { useEventsStore } from '@/store/events'
import { computed } from 'vue'
import Overlay from '@/components/common/Overlay.vue'
import Filtration from '@/components/events/Filtration.vue'

const event_store = useEventsStore()
const common_store = useCommonStore()

async function clearFiltration() {
  await event_store.clearFiltrationAndFetch()
}

const getFiltration = computed(common_store.isFiltration)
</script>

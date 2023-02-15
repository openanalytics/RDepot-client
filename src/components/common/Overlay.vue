<template>
  <v-overlay
    :absolute="absolute"
    v-model="common_store.overlayModel"
    :opacity="common_store.overlayOpacity"
    contained
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
    @click:outside="overlayValue(false)"
  >
    <PackageFiltration
      v-if="packageFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <EventsFiltration
      v-else-if="eventsFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <QuestionCard
      v-else-if="resetFiltration"
      :text="common_store.overlayText"
      v-on:sendEvent="overlayValue"
    />
  </v-overlay>
</template>

<script setup lang="ts">
import PackageFiltration from '@/components/packages/Filtration.vue'
import EventsFiltration from '@/components/events/Filtration.vue'
import QuestionCard from '@/components/common/QuestionCard.vue'
import { computed, onMounted } from 'vue'
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { usePackagesStore } from '@/store/packages'
import { useEventsStore } from '@/store/events'

const common_store = useCommonStore()
const package_store = usePackagesStore()
const event_store = useEventsStore()

const absolute = false

const packageFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.PackagesFiltration
  )
})

const eventsFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.EventsFiltration
  )
})

const resetFiltration = computed(function () {
  let a: boolean =
    common_store.overlayComponent ==
    OverlayEnum.PackagesFiltrationReset
  let b: boolean =
    common_store.overlayComponent ==
    OverlayEnum.EventsFiltrationReset
  return b || a
})

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if (e.code == 'Escape') {
      onKeyup()
    }
  })
})

function onKeyup() {
  overlayValue()
}

function overlayValue(value: boolean = false) {
  if (value) {
    if (
      common_store.overlayComponent ==
      OverlayEnum.PackagesFiltrationReset
    ) {
      package_store.clearFiltrationAndFetch()
    } else if (
      common_store.overlayComponent ==
      OverlayEnum.EventsFiltrationReset
    ) {
      event_store.clearFiltrationAndFetch()
    }
  }
  common_store.setOverlayModel(false)
}
</script>

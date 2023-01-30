<template>
  <v-overlay
    :absolute="absolute"
    v-model="props.overlay"
    :opacity="parentOpacity"
    contained
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
    @click:outside="sendEvent(false)"
  >
    <Filtration
      v-if="packagesFiltration"
      v-on:changeOptions="sendEvent(false)"
    />
    <QuestionCard
      v-else-if="resetPackagesFiltration"
      :text="parentText"
      v-on:sendEvent="sendEvent"
    />
  </v-overlay>
</template>

<script setup lang="ts">
import { computed, toRef, onMounted } from 'vue'
import Filtration from '@/components/packages/Filtration.vue'
import { OverlayEnum } from '@/enum/Overlay'
import QuestionCard from '@/components/common/QuestionCard.vue'

const props = defineProps({
  text: String,
  overlay: Boolean,
  opacity: Number,
  component: Number
})

const parentText = toRef(props, 'text')
const parentOpacity = toRef(props, 'opacity')
const parentComponent = toRef(props, 'component')

const emits = defineEmits(['overlayClicked'])
const absolute = true

const packagesFiltration = computed(function () {
  return (
    parentComponent.value == OverlayEnum.PackagesFiltration
  )
})
const resetPackagesFiltration = computed(function () {
  return (
    parentComponent.value ==
    OverlayEnum.PackagesFiltrationReset
  )
})

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if (e.code == 'Escape') {
      onKeyup()
    }
  })
})

function onKeyup() {
  sendEvent()
}

function sendEvent(value: boolean = false) {
  emits('overlayClicked', value)
}
</script>

<template>
  <v-overlay
    :absolute="absolute"
    v-model="parentOverlay"
    :opacity="parentOpacity"
    class="d-flex justify-center align-center"
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
import { computed, toRef } from 'vue'
import Filtration from '@/components/packages/Filtration.vue'
import { OverlayEnum } from '@/enum/Overlay'
import QuestionCard from './QuestionCard.vue'

const props = defineProps({
  text: String,
  overlay: Boolean,
  opacity: Number,
  component: Number
})

const parentText = toRef(props, 'text')
const parentOverlay = toRef(props, 'overlay')
const parentOpacity = toRef(props, 'opacity')
const parentComponent = toRef(props, 'component')

const emits = defineEmits(['overlayClicked'])
const absolute = true

const packagesFiltration = computed(function () {
  console.log('check if packages filtration')
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

function sendEvent(value: boolean) {
  emits('overlayClicked', value)
}
</script>

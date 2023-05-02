<template>
  <v-overlay
    :absolute="absolute"
    v-model="getOverlayModel"
    :opacity="getOpacity"
    @click:outside="closeModal"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
  >
    <slot name="props" :closeModal="closeModal">
      <QuestionCard
        :text="getText"
        v-on:reset="reset"
        v-on:cancel="closeModal"
      />
    </slot>
  </v-overlay>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/common/QuestionCard.vue'
import { computed, onMounted } from 'vue'
import { useCommonStore } from '@/store/common'

const common_store = useCommonStore()

const absolute = false

const emits = defineEmits(['action'])

const getOpacity = computed<number>(() => {
  return common_store.overlayOpacity
})

const getOverlayModel = computed<boolean>(() => {
  return common_store.overlayModel
})

const getText = computed<string>(() => {
  return common_store.overlayText
})

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if (e.code == 'Escape') {
      onKeyup()
    }
  })
})

function onKeyup() {
  reset()
}

async function reset() {
  closeModal()
  emits('action')
}

function closeModal() {
  common_store.setOverlayModel(false)
}
</script>

<style>
.v-overlay--absolute,
.v-overlay--contained .v-overlay__scrim {
  position: fixed !important;
  width: 100%;
}
</style>
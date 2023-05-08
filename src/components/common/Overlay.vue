<template>
  <v-overlay
    :absolute="absolute"
    v-model="common_store.overlayModel"
    :opacity="common_store.overlayOpacity"
    @click:outside="closeModal"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
  >
    <slot name="props" :closeModal="closeModal">
      <QuestionCard
        :text="common_store.overlayText"
        v-on:reset="reset"
        v-on:cancel="closeModal"
      />
    </slot>
  </v-overlay>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/common/QuestionCard.vue'
import { onMounted } from 'vue'
import { useCommonStore } from '@/store/common'

const emits = defineEmits(['action'])

const common_store = useCommonStore()

const absolute = false

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

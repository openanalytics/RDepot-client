<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <v-overlay
    v-model="commonStore.overlayModel"
    :absolute="absolute"
    :opacity="commonStore.overlayOpacity"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
    @click:outside="closeModal"
  >
    <slot name="props" :close-modal="closeModal">
      <QuestionCard
        :text="commonStore.overlayText"
        @reset="reset"
        @cancel="closeModal"
      />
    </slot>
  </v-overlay>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/common/overlay/QuestionCard.vue'
import { onMounted } from 'vue'
import { useCommonStore } from '@/store/common'

const emits = defineEmits(['action'])

const commonStore = useCommonStore()

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
  commonStore.setOverlayModel(false)
}
</script>

<style>
.v-overlay--absolute,
.v-overlay--contained .v-overlay__scrim {
  position: fixed !important;
  width: 100%;
}
</style>

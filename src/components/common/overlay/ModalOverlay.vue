<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
    v-model="commonStore.overlay"
    opacity="0.7"
    location-strategy="connected"
    class="d-flex justify-center align-center"
    @click:outside="closeOverlay"
  >
    <slot name="props" @reset="reset">
      <QuestionCard
        :text="commonStore.overlayText"
        @reset="reset"
        ><template #desc>
          <slot name="desc"></slot>
        </template>
      </QuestionCard>
    </slot>
  </v-overlay>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/common/overlay/QuestionCard.vue'
import { onMounted } from 'vue'
import { useCommonStore } from '@/store/options/common'

const emits = defineEmits(['action', 'closeOverlay'])

const commonStore = useCommonStore()

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

function closeOverlay() {
  commonStore.closeOverlay()
  emits('closeOverlay')
}

async function reset() {
  commonStore.closeOverlay()
  emits('action')
}
</script>

<style>
.v-overlay--absolute,
.v-overlay--contained .v-overlay__scrim {
  position: fixed !important;
  width: 100%;
}

.v-overlay__scrim {
  background-color: #000 !important;
}
</style>

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
  <div class="drop-zone">
    <div
      class="px-5 py-5 width"
      :data-active="active"
      @dragenter.prevent="activate"
      @dragover.prevent="activate"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop"
      :class="{ active: active }"
    >
      <slot :dropZoneActive="active"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const emit = defineEmits(['new-files'])

let active = ref<boolean>(false)
let inactiveTimeout: any = null

function activate() {
  active.value = true
  clearTimeout(inactiveTimeout)
}
function setInactive() {
  inactiveTimeout = setTimeout(() => {
    active.value = false
  }, 50)
}

function onDrop(e: any) {
  setInactive()
  emit('new-files', [...e.dataTransfer.files])
}

function preventDefaults(e: any) {
  e.preventDefault()
}

const events = [
  'dragenter',
  'dragover',
  'dragleave',
  'drop'
]

onMounted(() => {
  events.forEach((event) => {
    document.body.addEventListener(event, preventDefaults)
  })
})

onUnmounted(() => {
  events.forEach((event) => {
    document.body.removeEventListener(
      event,
      preventDefaults
    )
  })
})
</script>

<style lang="scss">
$background_color: rgba(var(--v-theme-background));

.drop-zone {
  background-color: $background_color;
  opacity: 0.6;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-play-state: paused;
  margin: 1rem 0;
  width: 100%;

  & > .active {
    animation: resize 0.5s ease-out infinite alternate;
    cursor: pointer;
    opacity: 1;
    border: dashed 1px #fff;
  }

  // &:hover {
  //   animation: resize 0.5s ease-out infinite alternate;
  //   cursor: pointer;
  //   opacity: 1;
  //   border: dashed 1px #fff;
  // }
}

// .active {
//   animation: resize 0.5s ease-out infinite alternate;
//   cursor: pointer;
//   opacity: 1;
//   border: dashed 1px #fff;
// }
.width {
  width: 100%;
}

@keyframes resize {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.01);
  }
}
</style>

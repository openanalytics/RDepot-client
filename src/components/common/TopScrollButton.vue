<template>
  <v-layout-item
    v-scroll="onScroll"
    class="text-end pointer-events-none"
    model-value
    style="position: fixed"
    position="bottom"
    size="88"
  >
    <div class="ma-4">
      <v-fab-transition>
        <v-btn
          v-show="showFab"
          class="mt-auto pointer-events-initial"
          color="primary"
          elevation="8"
          icon="mdi-chevron-up"
          size="large"
          @click="toTop"
        />
      </v-fab-transition>
    </div>
  </v-layout-item>
</template>

<script setup lang="ts">
import { ref } from 'vue'

var showFab = ref(false)

function onScroll(e: Event) {
  if (typeof window === 'undefined') return
  const top = window.scrollY || 0
  showFab.value = top > 20
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

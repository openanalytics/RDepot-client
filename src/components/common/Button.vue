<template>
  <v-btn
    id="commonbutton"
    color="oablue"
    dark
    dense
    @click="sendEvent"
  >
    {{ props.title }}
  </v-btn>
</template>

<script setup lang="ts">
var props = defineProps({
  title: String
})

const emits = defineEmits(['buttonClicked'])

function sendEvent() {
  emits('buttonClicked')
}
</script>

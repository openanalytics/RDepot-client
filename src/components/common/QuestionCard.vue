<template>
  <v-card class="pa-5" color="primary lighten-2">
    <v-card-title>
      {{ props.text }}
    </v-card-title>
    <v-card-text>
      <v-divider />
      <v-row
        align="center"
        justify="space-between"
        class="mx-3 mt-4"
      >
        <v-btn
          color="oablue darken-2"
          @click="sendEvent(false)"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          color="oablue darken-2"
          @click="sendEvent(true)"
        >
          {{ $t('common.apply') }}
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String
})

const emits = defineEmits(['sendEvent'])

function sendEvent(value: boolean) {
  emits('sendEvent', value)
}
</script>

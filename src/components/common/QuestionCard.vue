<template>
  <v-card class="pa-5">
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
          id="cancel-action"
          color="oablue darken-2"
          @click="cancel()"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          id="apply-action"
          color="oablue darken-2"
          @click="reset()"
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

const emits = defineEmits(['cancel', 'reset'])

function cancel() {
  emits('cancel')
}

function reset() {
  emits('reset')
}
</script>

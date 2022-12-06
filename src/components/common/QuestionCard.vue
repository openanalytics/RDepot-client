<template>
  <v-card class="pa-5" color="primary lighten-2">
    <v-card-title>
      {{ text }}
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
          @click="$emit('sendEvent', false)"
        >
          {{ $t('common.cancel') }}
        </v-btn>
        <v-btn
          color="oablue darken-2"
          @click="$emit('sendEvent', true)"
        >
          {{ $t('common.apply') }}
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'questionCard',
  props: {
    text: String
  }
})
</script>

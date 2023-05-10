<template>
  <v-card class="pa-5" width="400">
    <v-card-title> {{ props.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text :class="{ customHeight: !long }">
      <slot> </slot>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions :buttons="buttons"></card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import CardActions from '@/components/common/CardActions.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  long: {
    type: Boolean,
    required: false,
    default: false
  }
})

const buttons = [
  {
    id: 'cancel-button',
    text: i18n.t('common.cancel'),
    handler: () => changeDialogOptions()
  },
  {
    id: 'reset-button',
    spacer: true,
    text: i18n.t('common.clearForm'),
    handler: () => clearFiltration()
  },
  {
    id: 'set-filtration',
    text: i18n.t('common.apply'),
    handler: () => setFiltration()
  }
]

const emit = defineEmits<{
  (event: 'closeModal'): Promise<void>
  (event: 'changeDialogOptions'): void
  (event: 'setFiltration'): Promise<void>
  (event: 'clearFiltration'): Promise<void>
}>()

async function setFiltration() {
  await emit('setFiltration')
}

async function clearFiltration() {
  await emit('clearFiltration')
}

function changeDialogOptions() {
  emit('changeDialogOptions')
}
</script>

<style>
.customHeight {
  height: 300px;
}
</style>

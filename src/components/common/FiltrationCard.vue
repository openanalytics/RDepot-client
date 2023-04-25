<template>
  <v-card class="pa-5" width="400">
    <v-card-title> {{ props.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <slot> </slot>
      </v-form>
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
  }
})

const buttons = [
  {
    text: i18n.t('common.cancel'),
    handler: () => changeDialogOptions()
  },
  {
    spacer: true,
    text: i18n.t('common.clearForm'),
    handler: () => clearFiltration()
  },
  {
    text: i18n.t('common.apply'),
    handler: () => setFiltration()
  }
]

const emit = defineEmits([
  'closeModal',
  'changeDialogOptions',
  'setFiltration',
  'clearFiltration'
])

async function setFiltration() {
  emit('setFiltration')
}

async function clearFiltration() {
  emit('clearFiltration')
}

function changeDialogOptions() {
  emit('changeDialogOptions')
}
</script>

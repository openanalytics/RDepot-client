<template>
  <v-card class="pa-5">
    <v-card-title>
      {{ props.text }}
    </v-card-title>
    <v-divider />
    <card-actions :buttons="buttons"> </card-actions>
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { i18n } from '@/plugins/i18n'

const props = defineProps({
  text: String
})

const buttons = [
  {
    id: 'cancel-action',
    text: i18n.t('common.cancel'),
    handler: cancel
  },
  {
    id: 'apply-action',
    text: i18n.t('common.apply'),
    handler: reset
  }
]

const emits = defineEmits(['cancel', 'reset'])

function cancel() {
  emits('cancel')
}

function reset() {
  emits('reset')
}
</script>

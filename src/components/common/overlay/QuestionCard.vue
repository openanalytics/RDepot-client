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
  <v-card class="pa-5">
    <v-card-title>
      {{ componentProps.text }}
    </v-card-title>
    <v-divider />
    <card-actions
      :buttons="buttons"
      @clicked="handleCardActions"
    >
    </card-actions>
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { i18n } from '@/plugins/i18n'

const emits = defineEmits(['cancel', 'reset'])

const componentProps = defineProps({
  text: {
    type: String,
    required: true
  }
})

const buttons = [
  {
    id: 'cancel-action',
    text: i18n.t('common.cancel')
  },
  {
    id: 'apply-action',
    text: i18n.t('common.apply')
  }
]

function handleCardActions(buttonId: string) {
  switch (buttonId) {
    case 'cancel-action': {
      emits('cancel')
      break
    }

    case 'apply-action': {
      emits('reset')
      break
    }
    default: {
      break
    }
  }
}
</script>

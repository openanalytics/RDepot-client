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
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ componentProps.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p
        v-dompurify-html="
          $t('settings.deleteQuestion', [
            accessTokensStore.currentToken?.name
          ])
        "
      ></p>
    </v-card-text>
    <v-divider></v-divider>
    <card-actions
      :buttons="buttons"
      @clicked="handleCardActions"
    ></card-actions>
  </v-card>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useI18n } from 'vue-i18n'
import { useAccessTokensStore } from '@/store/access_tokens'

const componentProps = defineProps({
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

const { t } = useI18n()
const accessTokensStore = useAccessTokensStore()

const emit = defineEmits(['cancel', 'deleteToken'])

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel')
  },
  {
    id: 'ok-button',
    text: t('common.ok')
  }
]

function handleCardActions(buttonId: string) {
  switch (buttonId) {
    case 'cancel-button': {
      emit('cancel')
      break
    }

    case 'ok-button': {
      emit('deleteToken')
      break
    }
    default: {
      break
    }
  }
}
</script>

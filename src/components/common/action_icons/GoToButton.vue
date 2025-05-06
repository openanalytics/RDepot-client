<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <IconButton
    :id="`goTo-button-${item.id}`"
    :tooltip="tooltipMsg"
    :icon="Icons.get('goTo')"
    :color="disabled ? 'grey' : 'primary'"
    @click="goTo"
  />
</template>

<script setup lang="ts">
import IconButton from '@/components/common/buttons/IconButton.vue'
import Icons from '@/maps/Icons'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  tooltip: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const tooltipMsg = computed(() => {
  return props.disabled
    ? t('messages.general.goToDisabled')
    : props.tooltip
})

function goTo() {
  if (!props.disabled) {
    switch (props.from) {
      case 'submissions':
        router.push({
          name: 'packageDetails',
          params: {
            id: props.item.packageBag?.id,
            technology: props.item.packageBag?.technology
          }
        })
        break
      case 'packages':
        router.push({
          name: 'packageDetails',
          params: {
            id: props.item.id,
            technology: props.item.technology
          }
        })
        break
    }
  }
}
</script>

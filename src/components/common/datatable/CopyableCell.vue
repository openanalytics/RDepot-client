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
  <div
    :id="`resources-list-${value.replaceAll('@', '-').replaceAll(':', '')}`"
    class="d-flex justify-start align-center ga-2"
  >
    <span> {{ value }} </span>
    <v-icon
      :id="`resources-list-${value.replace('@', '-').replaceAll('/', '').replaceAll(':', '')}-copy`"
      v-tooltip="onHoverMessage"
      size="x-small"
      :icon="Icons.get('copy')"
      @click.stop="
        copyText(value, $t('common.copiedMessage'))
      "
    />
  </div>
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import Icons from '@/maps/Icons'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'

const componentProps = defineProps({
  value: {
    type: String,
    required: true
  },
  tooltipMessage: {
    type: String,
    required: false,
    default: ''
  }
})

const { copyText } = useUtilities()
const onHoverMessage = computed(
  () =>
    componentProps.tooltipMessage || i18n.t('packages.copy')
)
</script>

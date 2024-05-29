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
  <v-btn
    id="common-button"
    color="oablue"
    dark
    dense
    class="mx-3"
    @click="openModal"
  >
    <slot>{{ $t('filtration.title') }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { PropType } from 'vue'

const componentProps = defineProps({
  component: {
    type: String as PropType<OverlayEnum>,
    required: true
  }
})

const commonStore = useCommonStore()

function openModal() {
  commonStore.setOverlayText(i18n.t('filtration.makeSure'))
  commonStore.openOverlay(componentProps.component)
}
</script>

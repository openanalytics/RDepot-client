<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
    @click="openModal"
    class="mx-3"
  >
    <slot>{{ $t('filtration.title') }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
import { OverlayEnum } from '@/enum/Overlay'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'

var props = defineProps<{ component: OverlayEnum }>()

const common_store = useCommonStore()

function openModal() {
  common_store.setOverlayText(i18n.t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayComponent(props.component)
}
</script>

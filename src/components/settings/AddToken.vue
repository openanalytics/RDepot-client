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
  <v-container
    class="v-expansion mx-8"
    style="padding-left: 0; padding-right: 0"
  >
    <v-row>
      <v-spacer></v-spacer>
      <div id="tooltip-activator" class="d-flex flex-row">
        <v-btn
          id="common-button"
          color="oablue"
          size="small"
          dark
          dense
          @click="openModal"
          class="mx-3 ml-auto my-3"
        >
          <span> {{ $t('common.create') }}</span>
          <v-icon icon="mdi-plus" />
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { OverlayEnum } from '@/enum/Overlay'

const commonStore = useCommonStore()

function openModal() {
  commonStore.openOverlay(OverlayEnum.enum.Create)
}
</script>

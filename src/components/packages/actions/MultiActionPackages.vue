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
  <div class="d-flex align-center">
    <v-checkbox-btn
      id="packages-select-all"
      :model-value="allSelected"
      :indeterminate="someSelected && !allSelected"
      @update:model-value="selectAll"
    />
    <v-speed-dial
      location="bottom center"
      location-strategy="connected"
      transition="fade-transition"
      scroll-strategy="close"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          id="packages-multi-actions"
          variant="text"
          size="x-small"
          :icon="Icons.get('more')"
          color="oablue"
          v-bind="activatorProps"
          style="margin-left: -10px"
        >
        </v-btn>
      </template>
      <v-tooltip location="right">
        <template #activator="{ props: tooltipActivator }">
          <div v-bind="tooltipActivator">
            <v-btn
              id="packages-multi-delete"
              key="1"
              :icon="Icons.get('delete')"
              color="oared"
              :disabled="
                packagesStore.packagesSelected.length == 0
              "
              size="small"
              @click="openDeletePackagesModal"
            ></v-btn>
          </div>
        </template>
        <span
          >{{ i18n.t('common.delete') }}
          <span
            v-if="
              packagesStore.packagesSelected.length == 0
            "
            >({{ i18n.t('package.chooseOneToEnable') }})
          </span></span
        >
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/options/packages'
import { i18n } from '@/plugins/i18n'
import { usePackagesActions } from '@/composable/packages/packagesActions'
import Icons from '@/maps/Icons'

defineProps({
  allSelected: {
    type: Boolean,
    required: true
  },
  someSelected: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['selectAll'])

function selectAll() {
  emit('selectAll')
}

const { openDeletePackagesModal } = usePackagesActions()
const packagesStore = usePackagesStore()
</script>

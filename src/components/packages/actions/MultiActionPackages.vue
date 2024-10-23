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

      <v-btn
        id="submissions-multi-divert-attention"
        key="1"
        style="display: none"
      />
      <div
        v-for="(button, i) in actionButtons"
        :key="i"
        v-tooltip:end="button.tooltipMessage"
      >
        <v-btn
          :id="button.id"
          :key="i + 2"
          :icon="button.icon"
          :color="button.color"
          :disabled="disabled"
          size="small"
          @click="button.onClickAction"
        />
      </div>
    </v-speed-dial>
  </div>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/options/packages'
import { i18n } from '@/plugins/i18n'
import { usePackagesActions } from '@/composable/packages/packagesActions'
import Icons from '@/maps/Icons'
import { computed } from 'vue'
import { useConfigStore } from '@/store/options/config'

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

const actionButtons = computed(() => [
  {
    id: 'packages-multi-delete',
    icon: Icons.get('delete'),
    color: 'oared',
    tooltipMessage: `${i18n.t('common.delete')} ${
      onHoverMessage.value
    }`,
    onClickAction: () => openDeletePackagesModal()
  }
])

const { openDeletePackagesModal } = usePackagesActions()
const configStore = useConfigStore()
const packagesStore = usePackagesStore()

const disabled = computed(
  () =>
    !configStore.deletingPackages ||
    packagesStore.packagesSelected.length == 0
)

const onHoverMessage = computed(() => {
  if (!configStore.deletingPackages) {
    return (
      ' (' +
      i18n.t('config.deletingPackages').toLowerCase() +
      ')'
    )
  }
  if (packagesStore.packagesSelected.length == 0) {
    return ' (' + i18n.t('package.chooseOneToEnable') + ')'
  }
  return ''
})
</script>

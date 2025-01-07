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
  <v-table class="proptable">
    <tr
      v-for="(item, i) in items"
      :id="item.id"
      :key="i"
      class="packageRow"
    >
      <td>
        {{ item.key }}
      </td>
      <td
        class="d-flex ga-2 align-center"
        :style="{
          'justify-content':
            item.appendIcon && item.hideValue
              ? 'flex-end'
              : 'space-between'
        }"
      >
        <UrlValue
          v-if="item.hideValue != true"
          :to-parse-value="
            item.value || $t('package.propertyNotProvided')
          "
          :style="{ lineBreak: item.breakLine }"
        />

        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-if="item.appendIcon"
              v-tooltip="{
                text: item.appendIconTooltip,
                openOnHover: !!item.appendIconTooltip
              }"
              density="compact"
              variant="plain"
              :icon="item.appendIcon"
              :color="item.appendIconColor"
              size="small"
              v-bind="item.iconSlotName ? props : null"
              @click.stop="
                item.iconSlotName ? '' : clicked(item)
              "
            >
            </v-btn>
          </template>
          <slot
            v-if="item.iconSlotName"
            :name="item.iconSlotName"
          ></slot>
        </v-menu>
      </td>
    </tr>
  </v-table>
</template>

<script setup lang="ts">
import { useUtilities } from '@/composable/utilities'
import UrlValue from './UrlValue.vue'
import { i18n } from '@/plugins/i18n'
import { Property } from '@/models/Property'

const { copyText } = useUtilities()

defineProps({
  items: {
    type: Object as () => Property[],
    required: true
  }
})

const emit = defineEmits(['propertyClicked'])

function clicked(property: Property) {
  emit('propertyClicked', property.key)
  if (property.copyable && property.appendIconTooltip)
    copyText(
      property.appendIconTooltip,
      i18n.t('common.copiedMessage')
    )
}
</script>

<style>
.proptable {
  tr {
    td {
      padding: 5px 20px;
      &:has(> i) {
        text-align: center;
      }
    }
    &:last-child {
      td {
        border-bottom: none;
      }
    }
    &:nth-child(even) {
      background-color: rgba(
        var(--v-theme-table),
        0.2
      ) !important;
    }
  }
}
</style>

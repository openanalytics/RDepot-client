<!--
 R Depot
 
 Copyright (C) 2012-2026 Open Analytics NV
 
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
  <v-data-table-server
    :items-per-page="oaTableStore.pageSize"
    return-object
    :headers="headers"
    :sort-asc-icon="Icons.get('ascending')"
    :sort-desc-icon="Icons.get('descending')"
    color="primary"
    :items-per-page-options="oaTableStore.itemsPerPage"
    :items-per-page-text="$t('datatable.itemsPerPage')"
    :items-length="itemsLength"
    :items="items"
    :no-data-text="$t('datatable.noDataAvailable')"
    :row-props="rowProps"
  >
    <template #top>
      <div
        v-show="title"
        class="d-flex justify-space-between mx-3 my-5"
      >
        <h2>{{ title }}</h2>
        <div
          class="d-flex ga-2"
          style="justify-content: flex-end"
        >
          <slot name="topAction" />
          <RefreshButton @refresh="emits('refresh')" />
        </div>
      </div>
    </template>

    <template
      v-for="(item, i) in technologyKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <TechnologyChip
        :technology="value"
        @click="emits('chipClick', item, value)"
      />
    </template>

    <template
      v-for="(item, i) in dateKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <DateChip
        v-if="value"
        :date="value"
        @click="emits('chipClick', item, value)"
      />
    </template>

    <template
      v-for="(item, i) in stateKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <div @click="emits('chipClick', item, value)">
        <StateIcon :state="value" />
      </div>
    </template>

    <template #[`item.requiresAuthentication`]="{ value }">
      <AuthenticationInformation
        :value="value"
        :authentication="false"
      />
    </template>

    <template
      v-for="(item, i) in copyableKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <div class="d-flex justify-start align-center ga-2">
        <CopyableCell :value="value" />
      </div>
    </template>

    <!-- expose available slots -->

    <template
      v-for="(_, name) in $slots"
      #[`item.${name.toString().substring(5)}`]="slotProps"
    >
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>

    <template #[`header.data-table-select`]="slotProps">
      <slot
        name="header.data-table-select"
        v-bind="slotProps || {}"
      ></slot>
    </template>

    <template #[`expanded-row`]="slotProps">
      <slot
        name="expanded-row"
        v-bind="slotProps || {}"
      ></slot>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { useOATable } from '@/store/setup/oatable'
import TechnologyChip from '../chips/TechnologyChip.vue'
import Icons from '@/maps/Icons'
import type { PropType } from 'vue'
import { DataTableHeaders } from '@/models/DataTableOptions'
import DateChip from '../chips/DateChip.vue'
import StateIcon from '@/components/submissions/icons/StateIcon.vue'
import CopyableCell from './CopyableCell.vue'
import AuthenticationInformation from './AuthenticationInformation.vue'
import RefreshButton from '@/components/common/buttons/RefreshButton.vue'

const emits = defineEmits<{
  refresh: []
  chipClick: [field: string, value: string]
}>()
const oaTableStore = useOATable()
const technologyKeys = [
  'packageBag.repository.technology',
  'repository.technology',
  'technology'
]

const dateKeys = [
  'created',
  'creationDate',
  'expirationDate',
  'lastUsed'
]

const copyableKeys = [
  'serverAddress',
  'publicationUri',
  'email'
]

const stateKeys = ['state', 'submission.state']

const props = defineProps({
  headers: {
    type: Object as () => DataTableHeaders[],
    required: true
  },
  title: {
    type: String,
    required: false,
    default: undefined
  },
  items: {
    type: Object as () => any[],
    required: true
  },
  itemsLength: {
    type: Number,
    required: true
  },
  recentlyUpdated: {
    type: Array as PropType<number[]>,
    required: false,
    default: () => []
  },
  rowClassFn: {
    type: Function as PropType<
      (item: any) => string | undefined
    >,
    required: false,
    default: undefined
  }
})

function rowProps(item: any) {
  const classes: string[] = []
  if (item.item.deleted) classes.push('deletedItem')
  if (props.recentlyUpdated.includes(item.item.id)) {
    classes.push('row-updated')
  }
  if (props.rowClassFn) {
    const extra = props.rowClassFn(item.item)
    if (extra) classes.push(extra)
  }
  return { class: classes.join(' ') }
}
</script>

<style>
.deletedItem {
  background: rgb(255 230 230 / 20%) !important;
}

.v-theme--dark .deletedItem {
  background: rgb(255 86 86 / 20%) !important;
}

th.v-data-table__th--sortable {
  pointer-events: none;
}

th.v-data-table__th--sortable
  .v-data-table-header__content {
  pointer-events: auto;
  width: fit-content;
}

th.v-data-table__th--sortable
  .v-data-table-header__content:hover
  .v-data-table-header__sort-icon {
  animation: icon-bounce 0.4s ease;
}
</style>

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
  <v-data-table-server
    :items-per-page="pagination.pageSize"
    return-object
    :headers="headers"
    :sort-asc-icon="Icons.get('ascending')"
    :sort-desc-icon="Icons.get('descending')"
    color="oablue"
    :items-per-page-options="pagination.itemsPerPage"
    :items-per-page-text="$t('datatable.itemsPerPage')"
    :items-length="itemsLength"
    :items="items"
    :no-data-text="$t('datatable.noDataAvailable')"
  >
    <template #top>
      <div
        v-show="title"
        class="d-flex justify-space-between mx-3 my-5"
      >
        <h2>{{ title }}</h2>
        <slot name="topAction" />
      </div>
    </template>

    <template
      v-for="(item, i) in technologyKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <TechnologyChip :technology="value" />
    </template>

    <template
      v-for="(item, i) in dateKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <DateChip :date="value" />
    </template>

    <template
      v-for="(item, i) in stateKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <StateIcon :state="value" />
    </template>

    <template
      v-for="(item, i) in copyableKeys"
      :key="i"
      #[`item.${item}`]="{ value }"
    >
      <CopyableCell :value="value" />
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
import { usePagination } from '@/store/setup/pagination'
import TechnologyChip from '../chips/TechnologyChip.vue'
import Icons from '@/maps/Icons'
import { DataTableHeaders } from '@/models/DataTableOptions'
import DateChip from '../chips/DateChip.vue'
import StateIcon from '@/components/submissions/icons/StateIcon.vue'
import CopyableCell from './CopyableCell.vue'

const pagination = usePagination()

const technologyKeys = [
  'packageBag.repository.technology',
  'repository.technology',
  'technology'
]

const dateKeys = [
  'created',
  'creationDate',
  'expirationDate'
]

const copyableKeys = [
  'serverAddress',
  'publicationUri',
  'email'
]

const stateKeys = ['state', 'submission.state']

defineProps({
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
  }
})
</script>

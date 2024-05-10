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
    :headers="headers"
    v-model:items-per-page="pagination.pageSize"
    :items="packageMaintainersStore.maintainers"
    :items-length="packageMaintainersStore.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    @update:options="fetchData"
    :loading="packageMaintainersStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
  >
    <template v-slot:loading>
      <v-skeleton-loader
        type="`table-row-divider@15`"
      ></v-skeleton-loader>
    </template>
    <template #item.repository.technology="{ value }">
      <v-chip
        class="mr-5"
        size="small"
        color="oablue"
        style="cursor: pointer"
      >
        {{ value }}</v-chip
      ></template
    >
    <template #item.actions="{ item }">
      <span class="d-flex justify-end align-center">
        <EditIcon
          :disabled="!canPatch(item.links) || item.deleted"
          @set-entity="setEditEntity(item)"
          :text="getEditMessage(item)"
          :hoverMessage="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          " />
        <DeleteIcon
          :disabled="!canDelete(item.links) || item.deleted"
          :name="item.user?.name"
          @setResourceId="chooseMaintainer(item)"
          :hoverMessage="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          " /></span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { usePagination } from '@/store/pagination'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { i18n } from '@/plugins/i18n'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'

const packageMaintainersStore = usePackageMaintainersStore()
const pagination = usePagination()
const { canPatch, canDelete } = useUserAuthorities()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'user', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers: DataTableHeaders[] = [
  {
    title: i18n.t('columns.packageMaintainer.name'),
    align: 'start',
    key: 'user',
    value: 'user.name',
    width: 200
  },
  {
    title: i18n.t('columns.packageMaintainer.packageName'),
    align: 'start',
    key: 'packageName',
    width: 200
  },
  {
    title: i18n.t('columns.packageMaintainer.repository'),
    align: 'start',
    key: 'repository',
    value: 'repository.name'
  },
  {
    title: i18n.t('columns.packageMaintainer.technology'),
    align: 'center',
    key: 'repository.technology',
    width: 100
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    width: 100,
    key: 'actions',
    sortable: false
  }
]

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  packageMaintainersStore.fetchMaintainersPage(options)
}

function chooseMaintainer(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.setChosenMaintainer(item)
}

function setEditEntity(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.setChosenMaintainer(item)
}

function getEditMessage(
  item: EntityModelPackageMaintainerDto
) {
  return i18n.t('maintainers.edit', {
    maintainerName: item.user?.id
  })
}
</script>

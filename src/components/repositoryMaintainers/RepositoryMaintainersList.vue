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
    items-per-page="pagination.pageSize"
    :headers="headers"
    :items="repositoryMaintainersStore.maintainers"
    :items-length="repositoryMaintainersStore.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    :loading="repositoryMaintainersStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
    @update:options="fetchData"
  >
    <template #top>
      <div class="d-flex justify-space-between mx-3 my-5">
        <h2>{{ i18n.t('repositories.maintainers') }}</h2>
        <AddMaintainerButton
          v-if="
            authorizationStore.can(
              'POST',
              'repositoryMaintainers'
            )
          "
        />
      </div>
    </template>
    <template #[`item.repository.technology`]="{ value }">
      <v-chip
        class="mr-5"
        size="small"
        color="oablue"
        style="cursor: pointer"
      >
        {{ value }}</v-chip
      ></template
    >
    <template #[`item.actions`]="{ item }">
      <span class="d-flex justify-center align-center">
        <EditIcon
          :disabled="!canPatch(item.links) || item.deleted"
          :text="i18n.t('maintainers.edit')"
          :hover-message="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
          @set-entity="setEditMaintainer(item)"
        >
        </EditIcon>

        <delete-icon
          v-if="item.user?.name"
          :disabled="!canDelete(item.links) || item.deleted"
          :name="item.user?.name"
          :hover-message="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
          @set-resource-id="setEditMaintainer(item)"
        /> </span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { usePagination } from '@/store/pagination'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'
import { useAuthorizationStore } from '@/store/authorization'
import AddMaintainerButton from '@/components/common/buttons/AddMaintainerButton.vue'

const repositoryMaintainersStore =
  useRepositoryMaintainersStore()
const { canPatch, canDelete } = useUserAuthorities()
const authorizationStore = useAuthorizationStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'user', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers: DataTableHeaders[] = [
  {
    title: i18n.t('columns.repositoryMaintainer.name'),
    align: 'start',
    key: 'user',
    value: 'user.name',
    width: 200
  },
  {
    title: i18n.t(
      'columns.repositoryMaintainer.repository'
    ),
    value: 'repository.name',
    align: 'start',
    key: 'repository'
  },
  {
    title: i18n.t(
      'columns.repositoryMaintainer.technology'
    ),
    align: 'center',
    key: 'repository.technology',
    width: 130
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 50,
    sortable: false
  }
]
const pagination = usePagination()

function updateData(): void {
  repositoryMaintainersStore.fetchMaintainers()
}

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  repositoryMaintainersStore.fetchMaintainersPage(options)
}

function setEditMaintainer(
  item: EntityModelRepositoryMaintainerDto
) {
  repositoryMaintainersStore.setChosenMaintainer(item)
}

onMounted(() => {
  updateData()
})
</script>

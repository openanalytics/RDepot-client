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
    v-model:items-per-page="pagination.pageSize"
    :headers="filteredHeaders"
    :items="accessTokensStore.tokens"
    :items-length="accessTokensStore.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    :loading="accessTokensStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
    @update:options="fetchData"
  >
    <template #top>
      <div class="d-flex justify-space-between mx-3 my-5">
        <h2>{{ i18n.t('settings.tab.token') }}</h2>
        <AddToken />
      </div>
    </template>

    <template #[`item.creationDate`]="{ value }">
      <DateChip :date="value" />
    </template>

    <template #[`item.expirationDate`]="{ value }">
      <DateChip :date="value" />
    </template>
    <template #[`item.active`]="{ item }">
      <v-checkbox-btn
        id="checkbox-active"
        v-model="item.active"
        class="mr-8"
        color="oablue"
        disabled
      />
    </template>

    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <EditIcon
          :disabled="
            (!canPatch(item.links) && item.active) ||
            !item.active
          "
          :text="$t('common.edit')"
          :hover-message="
            !canPatch(item.links) && item.active
              ? undefined
              : $t('tokens.inacitve')
          "
          @set-entity="setEditEntity(item)" />
        <DeleteIcon
          v-if="item.name"
          :disabled="!canDelete(item.links)"
          :name="item.name"
          @set-resource-id="setEditEntity(item)" />
        <DeactivateIcon
          v-if="item.name"
          :disabled="
            (!canPatch(item.links) && item.active) ||
            !item.active
          "
          :name="item.name"
          :hover-message="
            !canPatch(item.links) && item.active
              ? undefined
              : $t('tokens.inacitve')
          "
          @set-resource-id="setEditEntity(item)" /></span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { usePagination } from '@/store/pagination'
import { useAuthorizationStore } from '@/store/authorization'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import DeactivateIcon from '@/components/common/action_icons/DeactivateIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { EntityModelAccessTokenDto } from '@/openapi'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { computed } from 'vue'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'
import AddToken from '@/components/common/buttons/AddToken.vue'
import { useAccessTokensStore } from '@/store/accessTokens'
import DateChip from '../common/chips/DateChip.vue'

const pagination = usePagination()
const authorizationStore = useAuthorizationStore()
const accessTokensStore = useAccessTokensStore()
const { canPatch, canDelete } = useUserAuthorities()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'name', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: i18n.t('columns.tokens.name'),
    align: 'start',
    key: 'name',
    width: 150
  },
  {
    title: i18n.t('columns.tokens.user'),
    align: 'start',
    key: 'user',
    value: 'user.name'
  },
  {
    title: i18n.t('columns.tokens.creationDate'),
    align: 'center',
    key: 'creationDate',
    width: 150
  },
  {
    title: i18n.t('columns.tokens.expirationDate'),
    align: 'center',
    key: 'expirationDate',
    width: 150
  },
  {
    title: i18n.t('columns.tokens.active'),
    align: 'start',
    key: 'active',
    width: 100
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 50,
    sortable: false
  }
])

function resetElementWidth() {
  headers.value[0].width = undefined
}

const filteredHeaders = computed(() => {
  if (
    !isAtLeastAdmin(
      authorizationStore.userRole
        ? authorizationStore.userRole
        : 0
    )
  ) {
    resetElementWidth()
    return headers.value.filter(
      (header) => header.key != 'user'
    )
  }
  return headers.value
})

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  accessTokensStore.getPage(options)
}

function setEditEntity(item: EntityModelAccessTokenDto) {
  accessTokensStore.setChosen(item)
}

function isPending(
  item: EntityModelAccessTokenDto
): boolean {
  return !!accessTokensStore.pending.find(
    (token) => token.id == item.id
  )
}
</script>

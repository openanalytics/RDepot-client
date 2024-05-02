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
    :items="userStore.users"
    :items-length="pagination.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    @update:options="fetchData"
    :loading="userStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
  >
    <template v-slot:loading>
      <v-skeleton-loader
        type="`table-row-divider@15`"
      ></v-skeleton-loader>
    </template>
    <template #item.active="{ item }">
      <v-tooltip
        location="top"
        :disabled="item.id !== meStore.me.id"
      >
        <template #activator="{ props }">
          <span v-bind="props">
            <v-checkbox-btn
              id="checkbox-active"
              @click.stop
              hide-details
              @change="updateUserActive(item)"
              class="mr-4"
              :readonly="
                !isAtLeastAdmin(
                  meStore.userRole ? meStore.userRole : 0
                ) || item.id === meStore.me.id
              "
              :color="
                !isAtLeastAdmin(
                  meStore.userRole ? meStore.userRole : 0
                ) || item.id === meStore.me.id
                  ? 'grey'
                  : 'oablue'
              "
              v-model="item.active"
            />
          </span>
        </template>
        <span>{{ $t('users.unableDeactivation') }}</span>
      </v-tooltip></template
    >
    <template #item.actions="{ item }">
      <span class="d-flex justify-center align-center">
        <EditIcon
          :disabled="!canPatch(item.links)"
          @set-entity="setEditUser(item)"
          :text="$t('common.edit')"
        /> </span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { useUserStore } from '@/store/users'
import { usePagination } from '@/store/pagination'
import { i18n } from '@/plugins/i18n'
import { EntityModelUserDto } from '@/openapi'
import { updateUser } from '@/services/users_services'
import { useUtilities } from '@/composable/utilities'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import {
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useMeStore } from '@/store/me'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'

const pagination = usePagination()
const meStore = useMeStore()
const userStore = useUserStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'login', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers = [
  {
    title: i18n.t('columns.users.username'),
    align: 'start',
    key: 'login',
    width: 200
  },
  {
    title: i18n.t('columns.users.name'),
    align: 'start',
    key: 'name',
    width: 200
  },
  {
    title: i18n.t('columns.users.email'),
    align: 'start',
    key: 'email'
  },
  {
    title: i18n.t('columns.users.active'),
    align: 'center',
    key: 'active',
    width: 200
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 50,
    sortable: false
  }
]

function updateData(): void {
  userStore.fetchUsers()
}

const { canPatch } = useUserAuthorities()

function setEditUser(item: EntityModelUserDto) {
  userStore.chosenUser = item
}
const { deepCopy } = useUtilities()

function updateUserActive(item: EntityModelUserDto): void {
  if (canPatch(item.links)) {
    const oldUser = deepCopy(item)
    oldUser.active = !oldUser.active
    updateUser(oldUser, item).then(
      () => {
        userStore.fetchUsers()
      },
      () => {
        userStore.fetchUsers()
      }
    )
  }
}

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  userStore.fetchUsersPage(options)
}

onMounted(() => {
  updateData()
  userStore.fetchRoles()
})
</script>

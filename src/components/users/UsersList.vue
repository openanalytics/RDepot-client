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
  <OATable
    :headers="headers"
    :items="userStore.users"
    :items-length="userStore.totalNumber"
    item-value="id"
    :loading="userStore.loading"
    :sort-by="sortBy"
    :title="i18n.t('common.users')"
    @update:options="fetchData"
  >
    <template #[`item.role`]="{ item }">
      {{
        roles.filter((r) => r.value === item.role)[0].title
      }}
    </template>
    <template #[`item.active`]="{ item }">
      <v-tooltip
        location="top"
        :disabled="
          item.id !== authorizationStore.me.id ||
          !isPending(item) ||
          !canPatch(item.links, 'active')
        "
      >
        <template #activator="{ props }">
          <span
            v-bind="props"
            style="width: 100%"
            class="d-flex justify-center"
          >
            <v-checkbox-btn
              id="checkbox-active"
              v-model="item.active"
              hide-details
              style="justify-content: center"
              class="mr-5"
              :readonly="
                !isAtLeastAdmin(
                  authorizationStore.userRole
                    ? authorizationStore.userRole
                    : 0
                ) ||
                item.id === authorizationStore.me.id ||
                isPending(item)
              "
              :color="
                !isAtLeastAdmin(
                  authorizationStore.userRole
                    ? authorizationStore.userRole
                    : 0
                ) ||
                item.id === authorizationStore.me.id ||
                isPending(item)
                  ? 'grey'
                  : 'oablue'
              "
              @click.stop
              @change="updateUserActive(item)"
            />
          </span>
        </template>
        <span v-if="isPending(item)">
          {{ $t('common.pending') }}</span
        >
        <span v-else>{{
          $t('users.unableDeactivation')
        }}</span>
      </v-tooltip></template
    >
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <EditIcon
          :icon-id="`edit-user-${item.id}`"
          :disabled="
            !canPatch(item.links, 'roleId') ||
            item.role == 'admin'
          "
          :hover-message="
            !canPatch(item.links, 'deleted')
              ? $t('common.notAuthorized')
              : item.role == 'admin'
                ? $t('users.editAdmin')
                : undefined
          "
          :text="$t('common.edit')"
          @set-entity="setEditUser(item)"
        />
        <DeleteIcon
          :id="`delete-user-${item.id}`"
          :disabled="
            !canPatch(item.links, 'deleted') || item.deleted
          "
          :name="item.name"
          :hover-message="
            !canPatch(item.links, 'deleted')
              ? $t('common.notAuthorized')
              : item.deleted
                ? $t('users.deleted')
                : undefined
          "
          @set-resource-id="setEditUser(item)"
        /> </span
    ></template>
  </OATable>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { useUserStore } from '@/store/options/users'
import { i18n } from '@/plugins/i18n'
import { EntityModelUserDto } from '@/openapi'
import { useUtilities } from '@/composable/utilities'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useAuthorizationStore } from '@/store/options/authorization'
import { ref, computed } from 'vue'
import { useSort } from '@/composable/sort'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import ProgressCircularSmall from '@/components/common/progress/ProgressCircularSmall.vue'
import OATable from '@/components/common/datatable/OATable.vue'

const authorizationStore = useAuthorizationStore()
const userStore = useUserStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'login', order: 'asc' }]
const sortBy = ref(defaultSort)
const { roles } = useEnumFiltration()

const headers = computed<DataTableHeaders[]>(() => [
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
    title: i18n.t('columns.users.role'),
    align: 'start',
    key: 'role',
    width: 200
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
])

const { canPatch } = useUserAuthorities()

function setEditUser(item: EntityModelUserDto) {
  userStore.chosenUser = item
}
const { deepCopy } = useUtilities()

function updateUserActive(item: EntityModelUserDto): void {
  if (canPatch(item.links)) {
    const oldUser = deepCopy(item)
    userStore.chosenUser = oldUser
    oldUser.active = !oldUser.active
    userStore.save(item)
  }
}

// function softDeleteUser(item: EntityModelUserDto): void {
//   if (canDelete(item.links)) {
//   userStore.chosenUser = item
//   item.deleted = true
//     userStore.save(item)
//   }
// }

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  userStore.getPage(options)
}

function isPending(item: EntityModelUserDto): boolean {
  return !!userStore.pending.find(
    (user) => user.id == item.id
  )
}

onMounted(() => {
  userStore.getRoles()
})
</script>

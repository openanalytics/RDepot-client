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
    :headers="filteredHeaders"
    :items="accessTokensStore.tokens"
    :items-length="accessTokensStore.totalNumber"
    item-value="id"
    :title="i18n.t('resources.token', 2)"
    :loading="accessTokensStore.loading"
    :sort-by="sortBy"
    @update:options="fetchData"
  >
    <template #topAction>
      <AddToken />
    </template>

    <template #[`item.active`]="{ item }">
      <v-icon
        id="access-token-active-icon"
        v-tooltip="
          item.active
            ? i18n.t('properties.general.active')
            : i18n.t('properties.general.inactive')
        "
        :icon="
          item.active
            ? Icons.get('success')
            : Icons.get('error')
        "
        class="mx-4"
        variant="text"
        :color="item.active ? 'success' : 'oared'"
      >
      </v-icon>
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
          :text="i18n.t('actions.general.edit')"
          :hover-message="
            (!canPatch(item.links) && item.active) ||
            !item.active
              ? i18n.t('properties.general.inactive')
              : i18n.t('actions.general.edit')
          "
          @set-entity="prepareEdition(item)"
        />
        <DeactivateIcon
          v-if="item.name"
          :disabled="
            (!canPatch(item.links) && item.active) ||
            !item.active
          "
          :name="item.name"
          :hover-message="
            !canPatch(item.links) && item.active
              ? i18n.t('actions.general.deactivate')
              : i18n.t('properties.general.inactive')
          "
          @set-resource-id="
            accessTokensStore.currentToken = item
          "
        />
        <DeleteIcon
          v-if="item.name"
          :disabled="!canDelete(item.links)"
          @set-resource-id="prepareDeletion(item)"
        /> </span
    ></template>
  </OATable>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import { useAuthorizationStore } from '@/store/options/authorization'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import DeactivateIcon from '@/components/common/action_icons/DeactivateIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { EntityModelAccessTokenDto } from '@/openapi'
import { isAtLeastAdmin } from '@/enum/UserRoles'
import { computed, ref } from 'vue'
import { useSort } from '@/composable/sort'
import AddToken from '@/components/common/buttons/AddToken.vue'
import OATable from '../common/datatable/OATable.vue'
import { useAccessTokensStore } from '@/store/options/accessTokens'
import Icons from '@/maps/Icons'
import { useCommonStore } from '@/store/options/common'
import { OverlayEnum } from '@/enum/Overlay'

const authorizationStore = useAuthorizationStore()
const accessTokensStore = useAccessTokensStore()
const { canPatch, canDelete } = useUserAuthorities()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'name', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: i18n.t('forms.general.name'),
    align: 'start',
    key: 'name',
    width: 150
  },
  {
    title: i18n.t('resources.user'),
    align: 'start',
    key: 'user',
    value: 'user.name'
  },
  {
    title: i18n.t('fields.tokens.lastUsed'),
    align: 'center',
    key: 'lastUsed',
    width: 150
  },
  {
    title: i18n.t('fields.general.createdOn'),
    align: 'center',
    key: 'creationDate',
    width: 150
  },
  {
    title: i18n.t('fields.tokens.expirationDate'),
    align: 'center',
    key: 'expirationDate',
    width: 150
  },
  {
    title: i18n.t('properties.general.active'),
    align: 'start',
    key: 'active',
    width: 100
  },
  {
    title: i18n.t('fields.general.actions'),
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

const commonStore = useCommonStore()

async function prepareEdition(
  item: EntityModelAccessTokenDto
) {
  accessTokensStore.currentToken = item
  commonStore.overlayText = i18n.t('actions.general.edit')
  commonStore.openOverlay(OverlayEnum.enum.Edit)
}

async function prepareDeletion(
  item: EntityModelAccessTokenDto
) {
  accessTokensStore.currentToken = item
  commonStore.overlayText = i18n.t(
    'messages.general.deleteQuestion',
    {
      resource_name: item.name
    }
  )
  commonStore.openOverlay(OverlayEnum.enum.Delete)
}

function isPending(
  item: EntityModelAccessTokenDto
): boolean {
  return !!accessTokensStore.pending.find(
    (token) => token.id == item.id
  )
}
</script>

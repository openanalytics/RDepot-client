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
    :items="packageMaintainersStore.maintainers"
    :items-length="packageMaintainersStore.totalNumber"
    item-value="id"
    :loading="packageMaintainersStore.loading"
    :title="i18n.t('resources.packageMaintainer', 2)"
    :sort-by="sortBy"
    @update:options="fetchData"
    @refresh="fetchData"
  >
    <template #topAction>
      <AddMaintainerButton v-if="postCondition" />
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span v-else class="d-flex justify-end align-center">
        <EditIcon
          :disabled="!canPatch(item.links) || item.deleted"
          :hover-message="
            item.deleted
              ? i18n.t('messages.general.deleted', {
                  resource_name: i18n.t(
                    'resources.packageMaintainer',
                    2
                  )
                })
              : i18n.t('actions.general.edit')
          "
          :icon-id="`edit-package-maintainer-${item.user?.name?.replace(
            ' ',
            '-'
          )}-${item.packageName}-${item.repository?.name}`"
          @set-entity="prepareEdition(item)" />
        <DeleteIcon
          v-if="item.user?.name"
          :disabled="!canDelete(item.links) || item.deleted"
          :name="item.user?.name"
          :hover-message="
            item.deleted
              ? i18n.t('messages.general.deleted', {
                  resource_name: i18n.t(
                    'resources.packageMaintainer',
                    2
                  )
                })
              : undefined
          "
          @set-resource-id="prepareDeletion(item)" /></span
    ></template>
  </OATable>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
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
import AddMaintainerButton from '@/components/common/buttons/AddMaintainerButton.vue'
import { useAuthorizationStore } from '@/store/options/authorization'
import { computed } from 'vue'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import OATable from '../common/datatable/OATable.vue'
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/options/common'

const packageMaintainersStore = usePackageMaintainersStore()
const { canPatch, canDelete } = useUserAuthorities()
const authorizationStore = useAuthorizationStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'user', order: 'asc' }]
const sortBy = ref(defaultSort)

const postCondition = computed(() =>
  authorizationStore.can('POST', 'packageMaintainers')
)

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: i18n.t('forms.general.name'),
    align: 'start',
    key: 'user',
    value: 'user.name',
    width: 200
  },
  {
    title: i18n.t('resources.package'),
    align: 'start',
    key: 'packageName',
    width: 200
  },
  {
    title: i18n.t('resources.repository'),
    align: 'start',
    key: 'repository',
    value: 'repository.name'
  },
  {
    title: i18n.t('resources.technology'),
    align: 'center',
    key: 'repository.technology',
    width: 100
  },
  {
    title: i18n.t('fields.general.actions'),
    align: 'center',
    width: 100,
    key: 'actions',
    sortable: false
  }
])

function fetchData(options?: DataTableOptions) {
  if (options) {
    packageMaintainersStore.localOptions = options
  }
  sortBy.value = getSort(
    packageMaintainersStore.localOptions.sortBy,
    defaultSort
  )
  packageMaintainersStore.getPage(
    packageMaintainersStore.localOptions
  )
}

const commonStore = useCommonStore()

async function prepareEdition(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.chosenMaintainer = item
  commonStore.overlayText = i18n.t('actions.general.edit')
  commonStore.openOverlay(OverlayEnum.enum.Edit)
}

async function prepareDeletion(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.chosenMaintainer = item
  commonStore.overlayText = i18n.t(
    'messages.general.deleteQuestion',
    {
      resource_name: item.user?.name
    }
  )
  commonStore.openOverlay(OverlayEnum.enum.Delete)
}

function isPending(
  item: EntityModelPackageMaintainerDto
): boolean {
  return !!packageMaintainersStore.pending.find(
    (maintainer) => maintainer.id == item.id
  )
}
</script>

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
    :headers="headers"
    :items="packageMaintainersStore.maintainers"
    :items-length="packageMaintainersStore.totalNumber"
    item-value="id"
    :sort-asc-icon="Icons.get('ascending')"
    :sort-desc-icon="Icons.get('descending')"
    color="oablue"
    :loading="packageMaintainersStore.loading"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
    :items-per-page-text="$t('datatable.itemsPerPage')"
    @update:options="fetchData"
  >
    <template #top>
      <div class="d-flex justify-space-between mx-3 my-5">
        <h2>{{ i18n.t('packages.maintainers') }}</h2>
        <AddMaintainerButton v-if="postCondition" />
      </div>
    </template>
    <template #[`item.repository.technology`]="{ value }">
      <TechnologyChip :technology="value" />
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span v-else class="d-flex justify-end align-center">
        <EditIcon
          :disabled="!canPatch(item.links) || item.deleted"
          :text="getEditMessage(item)"
          :hover-message="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
          :icon-id="`edit-package-maintainer-${item.user?.name?.replace(
            ' ',
            '-'
          )}-${item.packageName}-${item.repository?.name}`"
          @set-entity="setEditEntity(item)" />
        <DeleteIcon
          v-if="item.user?.name"
          :disabled="!canDelete(item.links) || item.deleted"
          :name="item.user?.name"
          :hover-message="
            item.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
          @set-resource-id="chooseMaintainer(item)" /></span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { usePagination } from '@/store/setup/pagination'
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
import TechnologyChip from '../common/chips/TechnologyChip.vue'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import Icons from '@/maps/Icons'

const packageMaintainersStore = usePackageMaintainersStore()
const pagination = usePagination()
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
])
function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  packageMaintainersStore.getPage(options)
}

function chooseMaintainer(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.chosenMaintainer = item
  packageMaintainersStore.save()
}

function setEditEntity(
  item: EntityModelPackageMaintainerDto
) {
  packageMaintainersStore.chosenMaintainer = item
  packageMaintainersStore.save()
}

function getEditMessage(
  item: EntityModelPackageMaintainerDto
) {
  return i18n.t('maintainers.edit', {
    maintainerName: item.user?.id
  })
}

function isPending(
  item: EntityModelPackageMaintainerDto
): boolean {
  return !!packageMaintainersStore.pending.find(
    (maintainer) => maintainer.id == item.id
  )
}
</script>

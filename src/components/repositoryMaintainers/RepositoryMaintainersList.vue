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
    :items="repositoryMaintainersStore.maintainers"
    :items-length="repositoryMaintainersStore.totalNumber"
    item-value="id"
    :loading="repositoryMaintainersStore.loading"
    :sort-by="sortBy"
    :title="i18n.t('resources.repositoryMaintainer', 2)"
    @update:options="fetchData"
  >
    <template #topAction>
      <AddMaintainerButton v-if="postCondition" />
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <EditIcon
          :disabled="!canPatch(item.links) || item.deleted"
          :hover-message="
            item.deleted
              ? i18n.t('messages.general.deleted', {
                  resource_name: i18n.t(
                    'resources.repositoryMaintainer'
                  )
                })
              : i18n.t('actions.general.edit')
          "
          :icon-id="`edit-repository-maintainer-${item.user?.name?.replace(
            ' ',
            '-'
          )}-${item.repository?.name}`"
          @set-entity="prepareEdition(item)"
        >
        </EditIcon>

        <DeleteIcon
          v-if="item.user?.name"
          :disabled="!canDelete(item.links) || item.deleted"
          :name="item.user?.name"
          :hover-message="
            item.deleted
              ? i18n.t('messages.general.deleted', {
                  resource_name: i18n.t(
                    'resources.repositoryMaintainer'
                  )
                })
              : undefined
          "
          @set-resource-id="prepareDeletion(item)"
        /> </span
    ></template>
  </OATable>
</template>

<script setup lang="ts">
import { useRepositoryMaintainersStore } from '@/store/options/repositoryMaintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import {
  EntityModelPackageMaintainerDto,
  EntityModelRepositoryMaintainerDto
} from '@/openapi'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { computed, ref } from 'vue'
import { useSort } from '@/composable/sort'
import { useAuthorizationStore } from '@/store/options/authorization'
import AddMaintainerButton from '@/components/common/buttons/AddMaintainerButton.vue'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import OATable from '../common/datatable/OATable.vue'
import { OverlayEnum } from '@/enum/Overlay.ts'
import { useCommonStore } from '@/store/options/common.ts'

const repositoryMaintainersStore =
  useRepositoryMaintainersStore()
const { canPatch, canDelete } = useUserAuthorities()
const authorizationStore = useAuthorizationStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'user', order: 'asc' }]
const sortBy = ref(defaultSort)

const postCondition = computed(() =>
  authorizationStore.can('POST', 'repositoryMaintainers')
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
    title: i18n.t('resources.repository'),
    value: 'repository.name',
    align: 'start',
    key: 'repository'
  },
  {
    title: i18n.t('resources.technology'),
    align: 'center',
    key: 'repository.technology',
    width: 130
  },
  {
    title: i18n.t('fields.general.actions'),
    align: 'center',
    key: 'actions',
    width: 50,
    sortable: false
  }
])

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  repositoryMaintainersStore.getPage(options)
}

function isPending(
  item: EntityModelRepositoryMaintainerDto
): boolean {
  return !!repositoryMaintainersStore.pending.find(
    (maintainer) => maintainer.id == item.id
  )
}

const commonStore = useCommonStore()

async function prepareEdition(
  item: EntityModelPackageMaintainerDto
) {
  repositoryMaintainersStore.chosenMaintainer = item
  commonStore.overlayText = i18n.t('actions.general.edit')
  commonStore.openOverlay(OverlayEnum.enum.Edit)
}

async function prepareDeletion(
  item: EntityModelPackageMaintainerDto
) {
  repositoryMaintainersStore.chosenMaintainer = item
  commonStore.overlayText = i18n.t(
    'messages.general.deleteQuestion',
    {
      resource_name: item.user?.name
    }
  )
  commonStore.openOverlay(OverlayEnum.enum.Delete)
}
</script>

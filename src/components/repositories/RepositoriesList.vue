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
    :headers="filteredHeaders"
    v-model:items-per-page="pagination.pageSize"
    :items="repositoryStore.repositories"
    :items-length="pagination.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    @update:options="fetchData"
    :loading="repositoryStore.loading"
    @click:row="navigate"
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
  >
    <template v-slot:loading>
      <v-skeleton-loader
        type="`table-row-divider@15`"
      ></v-skeleton-loader>
    </template>
    <template #item.technology="{ value }">
      <v-chip
        class="mr-5"
        size="small"
        color="oablue"
        style="cursor: pointer"
      >
        {{ value }}</v-chip
      ></template
    ><template #item.published="{ item }">
      <v-tooltip
        location="top"
        :disabled="!isDisabled(item)"
      >
        <template #activator="{ props }">
          <span v-bind="props">
            <v-checkbox-btn
              id="checkbox-published"
              hide-details
              v-model="item.published"
              @change="updateRepositoryPublished(item)"
              :readonly="
                !canPatch(item.links) ||
                configStore.declarativeMode
              "
              :color="
                !canPatch(item.links) ||
                configStore.declarativeMode
                  ? 'grey'
                  : 'oablue'
              "
              class="mr-8"
              @click.stop
            >
            </v-checkbox-btn>
          </span>
        </template>
        <span v-if="!canPatch(item.links)">{{
          $t('common.notAuthorized')
        }}</span>
        <span v-if="configStore.declarativeMode">{{
          $t('repositories.declarative.publish')
        }}</span>
      </v-tooltip></template
    ><template #item.actions="{ item }">
      <span class="d-flex justify-center align-center">
        <EditIcon
          :disabled="
            !canPatch(item.links) ||
            configStore.declarativeMode
          "
          @set-entity="chooseRepositoryToUpdate(item)"
          :text="$t('common.edit')"
          :hoverMessage="
            configStore.declarativeMode
              ? $t('repositories.declarative.edit')
              : undefined
          "
        />
        <DeleteIcon
          :disabled="
            !configStore.deletingRepositories ||
            !canDelete(item.links) ||
            configStore.declarativeMode
          "
          :name="item.name"
          @setResourceId="chooseRepository"
          :hoverMessage="
            configStore.declarativeMode
              ? $t('repositories.declarative.delete')
              : undefined
          "
        /> </span
    ></template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { EntityModelRepositoryDto } from '@/openapi'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import router from '@/plugins/router'
import { useRepositoryStore } from '@/store/repositories'
import { onMounted } from 'vue'
import { usePackagesStore } from '@/store/packages'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { usePagination } from '@/store/pagination'
import { i18n } from '@/plugins/i18n'
import {
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useConfigStore } from '@/store/config'
import { useUtilities } from '@/composable/utilities'
import { updateRepository } from '@/services/repository_services'
import { computed } from 'vue'
import { isAtLeastRepositoryMaintainer } from '@/enum/UserRoles'
import { useMeStore } from '@/store/me'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'

const packagesStore = usePackagesStore()
const { deepCopy } = useUtilities()
const repositoryStore = useRepositoryStore()
const pagination = usePagination()
const { canDelete, canPatch } = useUserAuthorities()
const configStore = useConfigStore()
const meStore = useMeStore()

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'name', order: 'asc' }]
const sortBy = ref(defaultSort)

const headers = [
  {
    title: i18n.t('columns.repository.name'),
    align: 'start',
    key: 'name',
    width: 200
  },
  {
    title: i18n.t('columns.repository.publicationUri'),
    align: 'start',
    key: 'publicationUri',
    width: 250
  },
  {
    title: i18n.t('columns.repository.serverAddress'),
    align: 'start',
    key: 'serverAddress'
  },
  {
    title: i18n.t('columns.repository.technology'),
    align: 'center',
    key: 'technology',
    width: 130
  },
  {
    title: i18n.t('columns.repository.version'),
    align: 'center',
    key: 'version',
    width: 130
  },
  {
    title: i18n.t('columns.repository.packagesNo'),
    align: 'center',
    key: 'numberOfPackages',
    width: 130,
    sortable: false
  },
  {
    title: i18n.t('columns.repository.published'),
    align: 'center',
    key: 'published',
    width: 150
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 100,
    sortable: false
  }
]

const filteredHeaders = computed(() => {
  if (
    !isAtLeastRepositoryMaintainer(
      meStore.userRole ? meStore.userRole : 0
    )
  ) {
    headers[1].width = undefined
    return headers.filter(
      (header) => header.key != 'serverAddress'
    )
  }
  return headers
})

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  repositoryStore.fetchRepositoriesPage(options)
}

function navigate(_event: Event, dataTableRepo: any) {
  chooseRepository(
    dataTableRepo.internalItem.raw.name
      ? dataTableRepo.internalItem.raw.name
      : ''
  )
  router.push({
    name: 'packages'
  })
}

function isDisabled(item: EntityModelRepositoryDto) {
  return (
    configStore.declarativeMode || !canPatch(item.links)
  )
}

function updateRepositoryPublished(
  item: EntityModelRepositoryDto
): void {
  if (!isDisabled(item) && canPatch(item.links)) {
    const oldRepository = deepCopy(item)
    oldRepository.published = !oldRepository.published
    updateRepository(oldRepository, item).then(
      () => {
        repositoryStore.fetchRepositories()
      },
      () => {
        repositoryStore.fetchRepositories()
      }
    )
  }
}

function chooseRepository(name: string) {
  packagesStore.setFiltrationByRepositoryOnly(name)
}

function chooseRepositoryToUpdate(
  item: EntityModelRepositoryDto
) {
  repositoryStore.setChosenRepository(item.id)
}

onMounted(() => {
  repositoryStore.clearFiltration()
  repositoryStore.fetchRepositories()
})
</script>

<style>
.v-selection-control {
  justify-content: center;
}
</style>

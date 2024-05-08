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
    :items="packagesStore.packages"
    :items-length="pagination.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    @update:options="fetchData"
    :loading="packagesStore.loading"
    v-model:expanded="expanded"
    expand-on-click
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
    >
    <template #item.submission.state="{ value }">
      <v-tooltip location="bottom center">
        <template #activator="{ props }">
          <div
            id="tooltip-activator"
            v-bind="props"
            class="mr-5"
          >
            <v-icon
              :icon="
                getStatusIcon(
                  value ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
              :color="
                getStatusColor(
                  value ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
            ></v-icon>
          </div>
        </template>
        <span id="tooltip-wait">{{
          getTooltipMessage(
            value ||
              EntityModelSubmissionDtoStateEnum.WAITING
          )
        }}</span>
      </v-tooltip></template
    >
    <template #item.active="{ item }">
      <v-tooltip
        location="top"
        :disabled="canPatch(item.links)"
      >
        <template #activator="{ props }">
          <span v-bind="props">
            <v-checkbox-btn
              hide-details
              id="checkbox-active"
              @click.stop
              v-model="item.active"
              @change="updatePackageActive(item)"
              :readonly="!canPatch(item?.links)"
              :color="
                !canPatch(item?.links) ? 'grey' : 'oablue'
              "
            />
          </span>
        </template>
        <span v-if="!canPatch(item?.links)">{{
          $t('common.notAuthorized')
        }}</span>
      </v-tooltip></template
    >
    <template #item.actions="{ item }">
      <DeleteIcon
        :disabled="
          !configStore.deletingPackages ||
          (!canDelete(item.links) && !item.deleted)
        "
        :name="item.name"
        :hoverMessage="
          !configStore.deletingPackages
            ? $t('config.deletingPackages')
            : undefined
        "
        @setResourceId="choosePackage(item)"
      />
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <td :colspan="columns.length">
        <div class="additional-row">
          <v-card class="additional-row expanded-package">
            <PackageDescription
              class="short expanded-package"
              :packageBagShort="(item as EntityModelPackageDto)"
            />
          </v-card>
        </div>
      </td>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { onMounted } from 'vue'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import {
  EntityModelPackageDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import PackageDescription from './packageDetails/PackageDescription.vue'
import { usePagination } from '@/store/pagination'
import { DataTableOptions } from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { ref, computed } from 'vue'
import { Sort } from '@/models/DataTableOptions'
import { useSort } from '@/composable/sort'
import { useConfigStore } from '@/store/config'

const exp = ref<string[]>([])

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'name', order: 'asc' }]
const sortBy = ref(defaultSort)

const expanded = computed({
  get(): string[] {
    return exp.value
  },
  set(newVal: string[]) {
    exp.value = []
    exp.value.push(newVal[1])
  }
})

const packagesStore = usePackagesStore()
const pagination = usePagination()
const { canDelete, canPatch } = useUserAuthorities()
const configStore = useConfigStore()

const headers = [
  {
    title: i18n.t('columns.package.name'),
    align: 'start',
    key: 'name',
    width: 150
  },
  {
    title: i18n.t('columns.package.version'),
    align: 'start',
    key: 'version',
    width: 100
  },

  {
    title: i18n.t('columns.package.title'),
    align: 'start',
    key: 'title',
    width: 500
  },
  {
    title: i18n.t('columns.package.maintainer'),
    align: 'center',
    key: 'user.name',
    width: 200
  },
  {
    title: i18n.t('columns.package.repository'),
    align: 'center',
    key: 'repository',
    value: 'repository.name',
    width: 200
  },
  {
    title: i18n.t('columns.package.technology'),
    align: 'center',
    key: 'technology',
    width: 100
  },
  {
    title: i18n.t('columns.package.state'),
    align: 'center',
    key: 'submission.state',
    width: 100
  },
  {
    title: i18n.t('columns.package.active'),
    align: 'center',
    key: 'active',
    width: 100
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 100,
    sortable: false
  }
]

const { getStatusIcon, getStatusColor, getTooltipMessage } =
  useSubmissionIcons()

function choosePackage(item: EntityModelPackageDto) {
  packagesStore.chosenPackage = item
}

function updatePackageActive(item: EntityModelPackageDto) {
  if (
    canPatch(item.links) &&
    item.id &&
    item.active != undefined
  ) {
    packagesStore.activatePackage(item)
  }
}

function fetchData(options: DataTableOptions) {
  expanded.value = []
  sortBy.value = getSort(options.sortBy, defaultSort)
  packagesStore.fetchPackagesPage(options)
}

onMounted(async () => {
  packagesStore.fetchPackages()
})
</script>

<style lang="scss">
table {
  background: rgb(var(--v-theme-background)) !important;
}

tr {
  background-color: rgb(var(--v-theme-surface)) !important;
}

.additional-row {
  display: grid;
  animation-duration: 0.2s;
  animation-name: animate-fade;
  animation-fill-mode: forwards;
}

.expanded-package {
  margin: 0.5rem;
  overflow: hidden;
}

@keyframes animate-fade {
  0% {
    grid-template-rows: 0fr;
  }
  100% {
    grid-template-rows: 1fr;
  }
}
</style>

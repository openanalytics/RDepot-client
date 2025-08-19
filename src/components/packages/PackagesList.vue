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
    v-model="packagesStore.packagesSelected"
    v-model:expanded="expanded"
    :headers="filteredHeaders"
    :items="packagesStore.packages"
    :items-length="packagesStore.totalNumber"
    :title="i18n.t('resources.package', 2)"
    item-value="id"
    :show-select="!packagesStore.filtration.deleted"
    :loading="packagesStore.loading"
    expand-on-click
    :sort-by="sortBy"
    @update:options="fetchData"
  >
    <template
      #[`header.data-table-select`]="{
        selectAll,
        allSelected,
        someSelected
      }"
    >
      <MultiActionPackages
        :all-selected="allSelected"
        :some-selected="someSelected"
        @select-all="selectAll(!allSelected)"
      />
    </template>
    <template
      #[`item.data-table-select`]="{
        item,
        toggleSelect,
        internalItem,
        isSelected
      }"
    >
      <SelectBoxPackages
        :item="item"
        :is-selected="isSelected(internalItem)"
        @toggle-select="toggleSelect(internalItem)"
      />
    </template>

    <template #[`item.name`]="{ value, item }">
      <v-list-item
        :id="`packages-list-${value}`"
        lines="two"
        class="px-0 mx-0"
      >
        <template #title>
          {{ value.replaceAll('\\n', ' ') }}
          <small style="opacity: 0.5"
            >v.{{ item.version }}</small
          >
          <TechnologyChip
            size="x-small"
            class="ml-1"
            :technology="item.technology"
          />
        </template>
        <template #subtitle>
          <div>
            <small>
              <div
                class="d-flex justify-start align-center ga-2"
              >
                {{ item.title }}
              </div>
            </small>
          </div>
        </template>
      </v-list-item>
    </template>

    <template #[`item.binary`]="{ item }">
      <BinaryPackage :item="item" />
    </template>

    <template #[`item.active`]="{ item }">
      <ActivatePackage :item="item" />
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span v-else class="d-flex justify-end align-right">
        <DeletePackage :item="item" />
        <GoToButton
          :item="item"
          from="packages"
          :tooltip="
            $t('actions.general.goTo', {
              resource_type: $t(
                'resources.package'
              ).toLowerCase()
            })
          "
        />
      </span>
    </template>
    <template #expanded-row="{ columns, item }">
      <td :colspan="columns.length">
        <div class="additional-row">
          <v-card class="additional-row expanded-package">
            <PackageDescription
              :package-bag-short="
                item as EntityModelPackageDto
              "
            />
          </v-card>
        </div>
      </td>
    </template>
  </OATable>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/options/packages'
import DeletePackage from '@/components/packages/actions/DeletePackage.vue'
import ActivatePackage from '@/components/packages/actions/ActivatePackage.vue'
import BinaryPackage from '@/components/packages/BinaryPackage.vue'
import { EntityModelPackageDto } from '@/openapi'
import PackageDescription from './packageDetails/PackageDescription.vue'
import {
  DataTableHeaders,
  DataTableOptions
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { ref, computed } from 'vue'
import { Sort } from '@/models/DataTableOptions'
import { useSort } from '@/composable/sort'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import MultiActionPackages from './actions/MultiActionPackages.vue'
import SelectBoxPackages from './actions/SelectBoxPackages.vue'
import { usePackagesActions } from '@/composable/packages/packagesActions'
import OATable from '../common/datatable/OATable.vue'
import TechnologyChip from '@/components/common/chips/TechnologyChip.vue'
import GoToButton from '@/components/common/action_icons/GoToButton.vue'

const exp = ref<string[]>([])

const { getSort } = useSort()
const defaultSort: Sort[] = [
  { key: 'name', order: 'asc' },
  { key: 'version', order: 'desc' }
]
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
const { isPending } = usePackagesActions()

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: i18n.t('forms.general.name'),
    align: 'start',
    key: 'name'
  },
  {
    title: i18n.t('resources.maintainer'),
    align: 'start',
    key: 'user.name',
    width: 200
  },
  {
    title: i18n.t('resources.repository'),
    align: 'start',
    key: 'repository',
    value: 'repository.name',
    width: 200
  },
  {
    title: i18n.t('fields.packages.fileType'),
    align: 'center',
    key: 'binary',
    width: 100
  },
  {
    title: i18n.t('fields.packages.submissionState'),
    align: 'center',
    key: 'submission.state',
    width: 100
  },
  {
    title: i18n.t('properties.general.active'),
    align: 'center',
    key: 'active',
    width: 80
  },
  {
    title: i18n.t('fields.general.actions'),
    align: 'center',
    key: 'actions',
    width: 100,
    sortable: false
  }
])

const filteredHeaders = computed(() => {
  if (packagesStore.filtration.deleted) {
    return headers.value.filter(
      (header) => header.key != 'data-table-select'
    )
  }
  return headers.value
})

function fetchData(options: DataTableOptions) {
  expanded.value = []
  sortBy.value = getSort(options.sortBy, defaultSort)
  packagesStore.getPage(options)
}
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

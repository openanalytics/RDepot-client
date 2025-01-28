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
    :title="i18n.t('packages.list')"
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

    <template #[`item.name`]="{ item }">
      {{ item.name.replaceAll('\\n', ' ') }}
    </template>

    <template #[`item.binary`]="{ item }">
      <BinaryPackage :item="item" />
    </template>

    <template #[`item.active`]="{ item }">
      <ActivatePackage :item="item" />
    </template>
    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <DeletePackage v-else :item="item" />
    </template>
    <template #expanded-row="{ columns, item }">
      <td :colspan="columns.length">
        <div class="additional-row">
          <v-card class="additional-row expanded-package">
            <PackageDescription
              class="short expanded-package"
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
const { isPending } = usePackagesActions()

const headers = computed<DataTableHeaders[]>(() => [
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
    width: 500,
    sortable: false
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
    title: i18n.t('columns.package.binary'),
    align: 'center',
    key: 'binary',
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

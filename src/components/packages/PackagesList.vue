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
    v-model:expanded="expanded"
    v-model="packagesStore.packagesSelected"
    :show-select="!packagesStore.filtration.deleted"
    return-object
    :items-per-page="pagination.pageSize"
    :headers="filteredHeaders"
    :items="packagesStore.packages"
    :items-length="packagesStore.totalNumber"
    item-value="id"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    color="oablue"
    :loading="packagesStore.loading"
    expand-on-click
    :sort-by="sortBy"
    :items-per-page-options="pagination.itemsPerPage"
    @update:options="fetchData"
  >
    <template
      #[`header.data-table-select`]="{
        selectAll,
        allSelected,
        someSelected
      }"
    >
      <div class="d-flex align-center">
        <v-checkbox-btn
          id="packages-select-all"
          :model-value="allSelected"
          :indeterminate="someSelected && !allSelected"
          @update:model-value="selectAll"
        />
        <v-speed-dial
          location="bottom center"
          location-strategy="connected"
          transition="fade-transition"
          scroll-strategy="close"
        >
          <template #activator="{ props: activatorProps }">
            <v-btn
              id="packages-multi-actions"
              variant="text"
              size="x-small"
              icon="mdi-dots-vertical"
              color="oablue"
              v-bind="activatorProps"
              style="margin-left: -10px"
            >
            </v-btn>
          </template>
          <v-tooltip location="right">
            <template
              #activator="{ props: tooltipActivator }"
            >
              <div v-bind="tooltipActivator">
                <v-btn
                  id="packages-multi-delete"
                  key="1"
                  icon="mdi-trash-can"
                  color="oared"
                  :disabled="
                    packagesStore.packagesSelected.length ==
                    0
                  "
                  size="small"
                  @click="openDeletePackagesModal"
                ></v-btn>
              </div>
            </template>
            <span
              >{{ i18n.t('common.delete') }}
              <span
                v-if="
                  packagesStore.packagesSelected.length == 0
                "
                >({{ i18n.t('package.chooseOneToEnable') }})
              </span></span
            >
          </v-tooltip>
        </v-speed-dial>
      </div>
    </template>
    <template
      #[`item.data-table-select`]="{
        item,
        toggleSelect,
        internalItem,
        isSelected
      }"
    >
      <template
        v-if="
          packagesStore.promises.find(
            (promise) => promise.packageBag.id == item.id
          )
        "
      >
        <v-progress-circular
          indeterminate="disable-shrink"
          model-value="20"
          class="mr-5"
        ></v-progress-circular>
      </template>
      <template v-else>
        <v-checkbox-btn
          v-if="isSelected(internalItem)"
          :id="`checkbox-actions-${
            item.name
          }-${item.version?.replaceAll('.', '-')}-${
            item.repository?.name
          }`"
          :model-value="true"
          @click.stop
          @update:model-value="toggleSelect(internalItem)"
        />
        <v-checkbox-btn
          v-else
          :id="`checkbox-actions-${
            item.name
          }-${item.version?.replaceAll('.', '-')}-${
            item.repository?.name
          }`"
          :model-value="false"
          @click.stop
          @update:model-value="toggleSelect(internalItem)"
        />
      </template>
    </template>
    <template #top>
      <div class="d-flex justify-space-between mx-3 my-5">
        <h2>{{ i18n.t('packages.list') }}</h2>
      </div>
    </template>

    <template #[`item.technology`]="{ value }">
      <v-chip
        class="mr-5"
        size="small"
        color="oablue"
        style="cursor: pointer"
      >
        {{ value }}</v-chip
      ></template
    >
    <template #[`item.submission.state`]="{ value }">
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
    <template #[`item.active`]="{ item }">
      <v-tooltip
        location="top"
        :disabled="canPatch(item.links)"
      >
        <template #activator="{ props }">
          <span
            v-bind="props"
            style="width: 100%"
            class="d-flex justify-center"
          >
            <v-checkbox-btn
              :id="`checkbox-active-${
                item.name
              }-${item.version?.replaceAll('.', '-')}-${
                item.repository?.name
              }`"
              v-model="item.active"
              hide-details
              :readonly="!canPatch(item?.links)"
              :color="
                !canPatch(item?.links) ? 'grey' : 'oablue'
              "
              class="mr-5"
              @click.stop
              @change="updatePackageActive(item)"
            />
          </span>
        </template>
        <span v-if="!canPatch(item?.links)">{{
          $t('common.notAuthorized')
        }}</span>
      </v-tooltip></template
    >
    <template #[`item.actions`]="{ item }">
      <DeleteIcon
        v-if="item.name && !item.deleted"
        :id="`delete-icon-${
          item.name
        }-${item.version?.replaceAll('.', '-')}-${
          item.repository?.name
        }`"
        :disabled="
          !configStore.deletingPackages ||
          (!canDelete(item.links) && !item.deleted)
        "
        :name="item.name"
        :hover-message="
          !configStore.deletingPackages
            ? $t('config.deletingPackages')
            : undefined
        "
        :overlay-text="
          i18n.t('common.deleteResourcesQuestion', {
            resource_type_plural: i18n
              .t('common.packages')
              .toLocaleLowerCase()
          })
        "
        @set-resource-id="choosePackage(item)"
      />
    </template>
    <template #expanded-row="{ columns, item }">
      <td :colspan="columns.length">
        <div class="additional-row">
          <v-card class="additional-row expanded-package">
            <PackageDescription
              class="short expanded-package"
              :package-bag-short="(item as EntityModelPackageDto)"
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
import {
  DataTableHeaders,
  DataTableOptions
} from '@/models/DataTableOptions'
import { i18n } from '@/plugins/i18n'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { ref, computed } from 'vue'
import { Sort } from '@/models/DataTableOptions'
import { useSort } from '@/composable/sort'
import { useConfigStore } from '@/store/config'
import { useCommonStore } from '@/store/common'
import { OverlayEnum } from '@/enum/Overlay'

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
const commonStore = useCommonStore()
const pagination = usePagination()
const { canDelete, canPatch } = useUserAuthorities()
const configStore = useConfigStore()

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
      (header) =>
        header.key != 'actions' &&
        header.key != 'data-table-select'
    )
  }
  return headers.value
})

const { getStatusIcon, getStatusColor, getTooltipMessage } =
  useSubmissionIcons()

function choosePackage(item: EntityModelPackageDto) {
  packagesStore.packagesToDelete = [item]
}

function openDeletePackagesModal() {
  packagesStore.packagesToDelete =
    packagesStore.packagesSelected

  commonStore.overlayText = i18n.t(
    'common.deleteResourcesQuestion',
    {
      resource_type_plural: i18n
        .t('common.packages')
        .toLocaleLowerCase()
    }
  )
  commonStore.openOverlay(OverlayEnum.enum.Delete)
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
  packagesStore.getPage(options)
}

onMounted(async () => {
  packagesStore.getPackages()
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

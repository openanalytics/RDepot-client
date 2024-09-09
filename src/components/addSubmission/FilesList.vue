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
  <v-card-text class="mb-1">
    <div class="text-overline">
      {{ $t('columns.repository.name') }}
    </div>
    <div id="repository-name" class="text-h4 mb-2">
      {{ chosenRepository?.name }}
    </div>

    <v-divider></v-divider>
    <v-data-table
      :headers="filteredHeaders"
      :items="filesStore.files"
      hover
      hide-default-footer
      items-per-page="-1"
      :no-data-text="$t('datatable.noDataAvailable')"
    >
      <template #[`item.remove`]="{ item }">
        <v-btn
          variant="plain"
          :icon="Icons.get('delete')"
          size="medium"
          class="mr-3"
          color="oared"
          @click="filesStore.removeFile(item)"
        />
      </template>
      <template #[`item.name`]="{ item }">
        <div class="text-left">
          {{ formatFilename(item.name) }}
        </div>
      </template>
      <template
        v-if="
          submissionsStore.repository?.technology !=
          Technologies.enum.Python
        "
        #[`item.manual`]="{ item }"
        ><v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn
              v-if="
                submissionsStore.getGenerateManualForPackage(
                  item
                )
              "
              :icon="Icons.get('checkbox')"
              variant="text"
              v-bind="props"
              class="mx-8"
              @click="
                submissionsStore.removeGenerateManualOptionForPackage(
                  item
                )
              "
            ></v-btn>
            <v-btn
              v-else
              :icon="Icons.get('checkbox-not')"
              class="mx-8"
              variant="text"
              v-bind="props"
              @click="
                submissionsStore.addGenerateManualOptionForPackage(
                  item
                )
              "
            >
            </v-btn>
          </template>
          <span id="tooltip-wait">{{
            $t('packages.generatemanual')
          }}</span>
        </v-tooltip>
      </template>
      <template #[`item.replace`]="{ item }">
        <ReplaceOption
          :disabled="!configStore.replacingPackages"
          :file="item"
        />
      </template>
      <template #[`top`]>
        <v-tooltip
          v-if="!!filesStore.files.length"
          location="top"
          ><template #activator="{ props }">
            <v-btn
              v-if="!!filesStore.files.length"
              size="x-small"
              color="oared mb-1"
              class="reset-opacity"
              variant="outlined"
              v-bind="props"
              style="
                max-width: 15%;
                align-self: end;
                margin-top: 10px;
              "
              @click="resetPackages()"
              >{{ $t('common.clear') }}</v-btn
            >
          </template>
          <span id="tooltip-reset">
            {{ $t('common.clearAll') }}</span
          ></v-tooltip
        >
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script setup lang="ts">
import { useFilesListStore } from '@/store/localFiles'
import { useSubmissionStore } from '@/store/submission'
import { computed } from 'vue'
import ReplaceOption from './ReplaceOption.vue'
import { useFiles } from '@/composable/file'
import { useConfigStore } from '@/store/config'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'
import { useI18n } from 'vue-i18n'
import { DataTableHeaders } from '@/models/DataTableOptions'

const { t } = useI18n()
const submissionsStore = useSubmissionStore()
const filesStore = useFilesListStore()
const configStore = useConfigStore()
const { formatFilename } = useFiles()
const chosenRepository = computed(() => {
  return submissionsStore.repository
})

function resetPackages() {
  console.log(filesStore.files)
  filesStore.files = []
  submissionsStore.setPackages([])
  // reset()
}

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: t('columns.package.name'),
    key: 'name',
    align: 'start',
    sortable: false,
    width: '60%'
  },
  {
    title: t('packages.generatemanual'),
    key: 'manual',
    align: 'center',
    sortable: false
  },
  {
    title: t('packages.replace'),
    key: 'replace',
    align: 'center',
    sortable: false
  },
  {
    title: '',
    key: 'remove',
    align: 'center',
    sortable: false
  }
])

const filteredHeaders = computed(() => {
  if (
    submissionsStore.repository?.technology ===
    Technologies.enum.Python
  ) {
    return headers.value.filter(
      (header) => header.key != 'manual'
    )
  }
  return headers.value
})
</script>

<style lang="scss">
.v-list-item__prepend {
  align-self: center !important;
}

.v-card__underlay {
  display: none;
}

.reset-opacity {
  opacity: 0.8 !important;
  font-weight: 800 !important;
  &:hover {
    transition: opacity ease-in-out 0.3s;
    opacity: 1 !important;
  }
}
</style>

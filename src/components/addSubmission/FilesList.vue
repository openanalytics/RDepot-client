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
  <v-card-text class="mb-1">
    <div class="text-overline">
      {{ $t('resources.repository') }}
    </div>
    <div id="repository-name" class="text-h4 mb-2">
      {{ chosenRepository?.name }}
    </div>

    <v-divider></v-divider>
    <v-data-table
      v-model="selected"
      v-model:expanded="expanded"
      :headers="filteredHeaders"
      :items="filesStore.files"
      hover
      item-value="name"
      hide-default-footer
      items-per-page="-1"
      :no-data-text="$t('messages.general.noDataAvailable')"
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
      <template #[`item.rversion`]="{ item }">
        <validated-input-field
          v-if="submissionsStore.getBinaryForPackage(item)"
          id="upload-package-rversion"
          variant="underlined"
          closable-chips
          :items="submissionsStore.allowedRVersions"
          :errormsg="
            (filesStore.fieldsError as any)[item.name]
              ?.rversion || ''
          "
          name="rversion"
          as="v-select"
          @update:model-value="
            submissionsStore.addRversion($event, item)
          "
          @update:focused="
            validate($event, 'rversion', item)
          "
        ></validated-input-field>
      </template>
      <template #[`item.architecture`]="{ item }">
        <validated-input-field
          v-if="submissionsStore.getBinaryForPackage(item)"
          id="upload-package-architecture"
          variant="underlined"
          closable-chips
          :items="submissionsStore.allowedArchitectures"
          :errormsg="
            (filesStore.fieldsError as any)[item.name]
              ?.architecture
          "
          name="architecture"
          as="v-select"
          @update:model-value="
            submissionsStore.addArchitecture($event, item)
          "
          @update:focused="
            validate($event, 'architecture', item)
          "
        ></validated-input-field>
      </template>
      <template #[`item.distribution`]="{ item }">
        <validated-input-field
          v-if="submissionsStore.getBinaryForPackage(item)"
          id="upload-package-distribution"
          variant="underlined"
          closable-chips
          :items="submissionsStore.allowedDistributions"
          :errormsg="
            (filesStore.fieldsError as any)[item.name]
              ?.distribution
          "
          name="distribution"
          as="v-select"
          @update:model-value="
            submissionsStore.addDistribution($event, item)
          "
          @update:focused="
            validate($event, 'distribution', item)
          "
        ></validated-input-field>
      </template>
      <template #[`item.binary`]="{ item }">
        <BinaryOption :file="item" />
      </template>
      <template #[`item.notes`]="{ item }">
        <NotesOption
          :file="item"
          @expand-notes="expandNotes"
        />
      </template>
      <template
        v-if="
          submissionsStore.repository?.technology !=
          Technologies.enum.Python
        "
        #[`item.manual`]="{ item }"
        ><v-tooltip location="top">
          <template #activator="{ props }">
            <span v-bind="props">
              <v-btn
                v-if="
                  submissionsStore.getGenerateManualForPackage(
                    item
                  ) &&
                  !submissionsStore.getBinaryForPackage(
                    item
                  )
                "
                id="generate-manual-button"
                :icon="Icons.get('checkbox')"
                variant="text"
                class="mx-8"
                @click="
                  submissionsStore.removeGenerateManualOptionForPackage(
                    item
                  )
                "
              ></v-btn>
              <v-btn
                v-else
                id="generate-manual-button"
                :icon="Icons.get('checkbox-not')"
                class="mx-8"
                variant="text"
                :disabled="
                  submissionsStore.getBinaryForPackage(item)
                "
                @click="
                  submissionsStore.addGenerateManualOptionForPackage(
                    item
                  )
                "
              >
              </v-btn>
            </span>
          </template>
          <span id="tooltip-wait"
            >{{ $t('forms.submissions.generateManual') }}
            <span
              v-if="
                submissionsStore.getBinaryForPackage(item)
              "
            >
              ({{
                $t(
                  'forms.submissions.generateManualNotAvailable'
                )
              }})
            </span></span
          >
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
              >{{ $t('actions.general.clear') }}</v-btn
            >
          </template>
          <span id="tooltip-reset">
            {{ $t('actions.general.clear') }}</span
          ></v-tooltip
        >
      </template>
      <template #expanded-row="{ columns, item }">
        <td :colspan="columns.length">
          <div class="additional-row">
            <v-card class="additional-row expanded-package">
              <validated-input-field
                id="upload-package-notes"
                min-width="100%"
                style="padding: 0 0.5rem 0 0.5rem"
                variant="underlined"
                density="compact"
                name="notes"
                rows="5"
                as="v-textarea"
                @update:model-value="
                  submissionsStore.addNote($event, item)
                "
              ></validated-input-field>
            </v-card>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script setup lang="ts">
import { useFilesListStore } from '@/store/options/localFiles'
import { useSubmissionStore } from '@/store/options/submission'
import { computed } from 'vue'
import ReplaceOption from './ReplaceOption.vue'
import BinaryOption from './BinaryOption.vue'
import NotesOption from './NotesOption.vue'
import { useFiles } from '@/composable/file'
import { useConfigStore } from '@/store/options/config'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'
import { useI18n } from 'vue-i18n'
import { DataTableHeaders } from '@/models/DataTableOptions'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { onMounted, ref } from 'vue'

const { t } = useI18n()
const submissionsStore = useSubmissionStore()
const filesStore = useFilesListStore()
const configStore = useConfigStore()
const { formatFilename } = useFiles()
const chosenRepository = computed(() => {
  return submissionsStore.repository
})
const selected = ref([])

function validate(e: any, field: string, item: File) {
  switch (field) {
    case 'rversion':
      if (!submissionsStore.getRVersionForPackage(item)) {
        ;(filesStore.fieldsError as any)[
          item.name
        ].rversion = e ? '' : t('messages.errors.required')
      }
      break
    case 'architecture':
      if (
        !submissionsStore.getArchitectureForPackage(item)
      ) {
        ;(filesStore.fieldsError as any)[
          item.name
        ].architecture = e
          ? ''
          : t('messages.errors.required')
      }
      break
    case 'distribution':
      if (
        !submissionsStore.getDistributionForPackage(item)
      ) {
        ;(filesStore.fieldsError as any)[
          item.name
        ].distribution = e
          ? ''
          : t('messages.errors.required')
      }
      break
    default:
      break
  }
}

function resetPackages() {
  filesStore.files = []
  submissionsStore.packages = []
  submissionsStore.binary = []
  submissionsStore.rversion = []
  submissionsStore.architecture = []
  submissionsStore.distribution = []
  // reset()
}

const expanded = ref<string[]>([])

function expandNotes(file: File) {
  if (expanded.value.includes(file.name)) {
    expanded.value = expanded.value.filter(
      (name) => name !== file.name
    )
  } else {
    expanded.value.push(file.name)
  }
}

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: t('forms.general.name'),
    key: 'name',
    align: 'start',
    sortable: false,
    width: '20%',
    minWidth: '10%'
  },
  {
    title: t('fields.files.rVersion'),
    key: 'rversion',
    align: 'start',
    sortable: false,
    width: '15%'
  },
  {
    title: t('fields.files.architecture'),
    key: 'architecture',
    align: 'start',
    sortable: false,
    width: '15%'
  },
  {
    title: t('fields.files.distribution'),
    key: 'distribution',
    align: 'start',
    sortable: false,
    width: '15%'
  },
  {
    title: t('fields.files.binary'),
    key: 'binary',
    align: 'center',
    sortable: false,
    width: '5%'
  },
  {
    title: t('fields.files.notes'),
    key: 'notes',
    align: 'center',
    sortable: false,
    width: '5%'
  },
  {
    title: t('fields.files.generateManual'),
    key: 'manual',
    align: 'center',
    sortable: false,
    width: '5%'
  },
  {
    title: t('fields.files.replace'),
    key: 'replace',
    align: 'center',
    sortable: false,
    width: '5%'
  },
  {
    title: t('fields.general.actions'),
    key: 'remove',
    align: 'center',
    sortable: false,
    width: '5%'
  }
])

const filteredHeaders = computed(() => {
  if (
    submissionsStore.repository?.technology ===
    Technologies.enum.Python
  ) {
    return headers.value
      .filter(
        (header) =>
          header.key != 'manual' &&
          header.key != 'rversion' &&
          header.key != 'distribution' &&
          header.key != 'architecture'
      )
      .map((header) =>
        header.key === 'name'
          ? { ...header, width: '90%' }
          : header
      )
  } else if (submissionsStore.binary.length === 0) {
    return headers.value
      .filter(
        (header) =>
          header.key != 'rversion' &&
          header.key != 'distribution' &&
          header.key != 'architecture'
      )
      .map((header) =>
        header.key === 'name'
          ? { ...header, width: '80%' }
          : header
      )
  }
  return headers.value
})

onMounted(() => {
  resetPackages()
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

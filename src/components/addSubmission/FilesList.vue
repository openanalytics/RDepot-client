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
      {{ i18n.t('resources.repository') }}
    </div>
    <div id="repository-name" class="text-h4 mb-2">
      {{ repository?.title }}
    </div>
    <v-divider></v-divider>
    <v-data-table
      :headers="filteredHeaders"
      :items="packages"
      hover
      item-value="file"
      hide-default-footer
      items-per-page="-1"
      :no-data-text="errors[0]"
    >
      <template #[`item.remove`]="{ index }">
        <v-btn
          variant="plain"
          :icon="Icons.get('delete')"
          size="medium"
          class="mr-3"
          color="oared"
          @click="removePackage(index)"
        />
      </template>
      <template #[`item.file.name`]="{ value, index }">
        <div class="text-start">
          {{ formatFilename(value) }}
          <v-icon
            v-if="getFileError(index)"
            v-tooltip="getFileError(index)?.split(': ')[1]"
            icon="mdi-alert-circle-outline"
            color="red"
          >
          </v-icon>
        </div>
      </template>
      <template #[`item.rversion`]="{ item, index, value }">
        <validated-input-field
          v-show="item.binary"
          id="upload-package-rversion"
          persistent-hint
          variant="underlined"
          closable-chips
          :items="uploadSubmissionStore.allowedRVersions"
          :name="`packages.${index}.rversion`"
          :hint="
            value
              ? undefined
              : i18n.t('messages.errors.required')
          "
          as="v-select"
        />
      </template>
      <template
        #[`item.architecture`]="{ item, index, value }"
      >
        <validated-input-field
          v-show="item.binary"
          id="upload-package-architecture"
          persistent-hint
          variant="underlined"
          closable-chips
          :items="
            uploadSubmissionStore.allowedArchitectures
          "
          :name="`packages.${index}.architecture`"
          :hint="
            value
              ? undefined
              : i18n.t('messages.errors.required')
          "
          as="v-select"
        />
      </template>
      <template
        #[`item.distribution`]="{ item, index, value }"
      >
        <validated-input-field
          v-show="item.binary"
          id="upload-package-distribution"
          variant="underlined"
          persistent-hint
          closable-chips
          :items="
            uploadSubmissionStore.allowedDistributions
          "
          :name="`packages.${index}.distribution`"
          :hint="
            value
              ? undefined
              : i18n.t('messages.errors.required')
          "
          as="v-select"
        ></validated-input-field>
      </template>
      <template #[`item.binary`]="{ item, index }">
        <div class="d-flex justify-center align-center">
          <validated-input-field
            id="binary-button"
            as="v-checkbox"
            hide-details
            center-affix
            :name="`packages.${index}.binary`"
            :true-icon="Icons.get('checkbox')"
            :false-icon="Icons.get('checkbox-not')"
            @click="
              !item.binary
                ? (item.generateManual = false)
                : ''
            "
          />
        </div>
      </template>
      <template
        #[`item.notes`]="{
          index,
          toggleExpand,
          internalItem
        }"
      >
        <div class="d-flex justify-center align-center">
          <validated-input-field
            id="notes-button"
            as="v-checkbox"
            hide-details
            :name="`packages.${index}.showNotes`"
            :true-icon="Icons.get('checkbox')"
            max-width="40"
            :false-icon="Icons.get('checkbox-not')"
            @click="toggleExpand(internalItem)"
          />
        </div>
      </template>
      <template
        v-if="technology != Technologies.enum.Python"
        #[`item.manual`]="{ item, index }"
      >
        <v-tooltip location="top">
          <template #activator="{ props }">
            <span
              v-bind="props"
              class="d-flex justify-center align-center"
            >
              <validated-input-field
                id="generate-manual-button"
                :name="`packages.${index}.generateManual`"
                :disabled="item.binary"
                as="v-checkbox"
                hide-details
                center-affix
                :true-icon="Icons.get('checkbox')"
                :false-icon="Icons.get('checkbox-not')"
              />
            </span>
          </template>
          <span id="tooltip-wait"
            >{{
              i18n.t('forms.submissions.generateManual')
            }}
            <span v-if="packages[index].binary">
              ({{
                i18n.t(
                  'forms.submissions.generateManualNotAvailable'
                )
              }})
            </span></span
          >
        </v-tooltip>
      </template>
      <template #[`item.replace`]="{ index }">
        <div class="d-flex justify-center align-center">
          <validated-input-field
            id="replace-button"
            :name="`packages.${index}.replace`"
            :disabled="!configStore.replacingPackages"
            as="v-checkbox"
            hide-details
            center-affix
            :true-icon="Icons.get('checkbox')"
            :false-icon="Icons.get('checkbox-not')"
          />
        </div>
      </template>
      <template #[`top`]>
        <v-tooltip
          v-if="packages && !!packages.length"
          location="top"
        >
          <template #activator="{ props }">
            <v-btn
              v-if="packages && !!packages.length"
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
              >{{ i18n.t('actions.general.clear') }}
            </v-btn>
          </template>
          <span id="tooltip-reset">
            {{ i18n.t('actions.general.clear') }}</span
          ></v-tooltip
        >
      </template>
      <template #expanded-row="{ columns, index }">
        <td :colspan="columns.length">
          <div class="additional-row">
            <v-card class="additional-row expanded-package">
              <validated-input-field
                id="upload-package-notes"
                min-width="100%"
                style="padding: 0 0.5rem 0 0.5rem"
                variant="underlined"
                density="compact"
                :name="`packages.${index}.notes`"
                rows="5"
                as="v-textarea"
              ></validated-input-field>
            </v-card>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue'
import { useFiles } from '@/composable/file'
import { useConfigStore } from '@/store/options/config'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'
import { useI18n } from 'vue-i18n'
import { DataTableHeaders } from '@/models/DataTableOptions'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { i18n } from '@/plugins/i18n'
import { useField } from 'vee-validate'
import { useUploadSubmissionStore } from '@/store/setup/uploadSubmission.ts'

const { t } = useI18n()
const uploadSubmissionStore = useUploadSubmissionStore()
const configStore = useConfigStore()
const { formatFilename } = useFiles()

function getFileError(index: number): string | undefined {
  return errors.value.find((err: string) =>
    err.startsWith(`packages.${index}.file:`)
  )
}

const {
  value: packages,
  errors,
  validate,
  setValue
} = useField<
  Array<{
    file: File
    binary: boolean
    showNotes: boolean
    notes: string
    replace: boolean
    generateManual: boolean
  }>
>('packages', {
  initialValue: [], // Add this
  validateOnValueUpdate: true // Add this to ensure validation triggers
})
const { value: technology } = useField('technology')
const { value: repository } = useField<{ title: string }>(
  'repository'
)

async function removePackage(index: number) {
  const newFiles = [...Array.from(packages.value || [])]
  newFiles.splice(index, 1)
  await setValue(newFiles.length ? newFiles : [])
  await nextTick()
  await validate()
}

function resetPackages() {
  packages.value = []
}

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: t('forms.general.name'),
    key: 'file.name',
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
  if (technology.value === Technologies.enum.Python) {
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
  } else if (
    packages.value &&
    !packages.value.find((p) => p.binary)
  ) {
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

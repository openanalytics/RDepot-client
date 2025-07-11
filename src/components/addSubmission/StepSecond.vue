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
  <v-card
    class="mb-12 px-10 py-3 step d-flex flex-column text-center justify-space-between"
    :class="
      files && files.length > 0
        ? 'align-items-end'
        : 'align-items-start'
    "
    min-height="250px"
    height="100%"
  >
    <FilesList />
    <DropZone
      v-slot="{ dropZoneActive }"
      class="drop-area"
      @new-files="updateFiles"
      @click="open()"
    >
      <label for="file-input">
        <span v-if="dropZoneActive">
          {{ i18n.t('dragZone.active') }}
          <i>{{ i18n.t('dragZone.dropzone') }}</i>
        </span>
        <span v-else>
          <span>
            {{ i18n.t('dragZone.inactive') }} <br />
            <small>
              {{ i18n.t('actions.general.or') }}
              <strong>{{
                i18n.t('actions.general.click')
              }}</strong>
              {{ i18n.t('dragZone.click') }}</small
            >
          </span>
        </span>
      </label>
    </DropZone>
    <div class="d-flex"></div>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useFileDialog } from '@vueuse/core'
import DropZone from '@/components/common/files/DropZone.vue'
import FilesList from '@/components/addSubmission/FilesList.vue'
import { Technologies } from '@/enum/Technologies'
import { useField } from 'vee-validate'
import { i18n } from '@/plugins/i18n'
import { useConfigStore } from '@/store/options/config'
import { useUploadSubmissionStore } from '@/store/setup/uploadSubmission.ts'

const { files, open } = useFileDialog({
  accept: 'application/gzip'
})

const uploadSubmissionsStore = useUploadSubmissionStore()

watch(files, (files) => {
  if (files != undefined) {
    updateFiles(files)
  }
})

const { value: packages, setValue: setPackages } = useField<
  Array<{
    file: File
    binary?: boolean
    showNotes?: boolean
    notes?: string
    replace?: boolean
  }>
>('packages', { initialValue: [] })
const { value: technology } = useField('technology')

const configStore = useConfigStore()

function updateFiles(files?: FileList) {
  const newFiles = [...Array.from(files || [])]
  const newPackages = newFiles.map((file) => {
    return {
      file: file,
      binary: false,
      showNotes: false,
      notes: '',
      replace: false,
      generateManual: configStore.generateManuals
    }
  })
  setPackages([...newPackages, ...(packages.value || [])])
}

onMounted(() => {
  if (technology.value !== Technologies.enum.Python) {
    uploadSubmissionsStore.getRConfiguration()
  }
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
  opacity: 0.6;

  &:hover {
    transition: opacity ease-in-out 0.3s;
    opacity: 1;
  }
}

.hoverable:hover {
  background-color: rgb(
    var(--v-theme-background)
  ) !important;
}
</style>

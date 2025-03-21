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
      @new-files="filesStore.updateFilesAddNew"
      @click="open()"
    >
      <label for="file-input">
        <span v-if="dropZoneActive">
          {{ $t('dragzone.active') }}
          <i>{{ $t('dragzone.dropzone') }}</i>
        </span>
        <span v-else>
          <span>
            {{ $t('dragzone.inactive') }} <br />
            <small>
              {{ $t('common.or') }}
              <strong>{{ $t('common.click') }}</strong>
              {{ $t('dragzone.click') }}</small
            >
          </span>
        </span>
      </label>
    </DropZone>

    <div class="d-flex"></div>
  </v-card>

  <div class="d-flex justify-space-between">
    <v-btn
      id="back-button"
      color="oablue"
      @click="$emit('next', 1)"
    >
      {{ $t('common.goBack') }}
    </v-btn>
    <v-btn
      id="next-button"
      color="oablue"
      :disabled="
        filesStore.files.length <= 0 || isNextDisabled
      "
      @click="nextStep"
    >
      {{ $t('common.submit') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { ref } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { watch } from 'vue'
import { onMounted } from 'vue'
import DropZone from '@/components/common/files/DropZone.vue'
import FilesList from '@/components/addSubmission/FilesList.vue'
import { useFilesListStore } from '@/store/options/localFiles'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composable/toasts'
import { Technologies } from '@/enum/Technologies'
import { computed } from 'vue'

const { files, open } = useFileDialog({
  accept: 'application/gzip'
})

const emits = defineEmits(['next'])
const filesStore = useFilesListStore()
const submissionsStore = useSubmissionStore()
const toasts = useToast()
const { t } = useI18n()

const valid = ref<boolean>(true)

watch(files, (files) => {
  filesStore.updateFilesAddNew(files)
})

function savePackagesInStore() {
  valid.value = filesStore.files.every(checkValidity)
  if (valid.value) {
    submissionsStore.packages = filesStore.files
  } else {
    submissionsStore.packages = []
  }
}

const isNextDisabled = computed(() => {
  return !(
    submissionsStore.binary.length ===
      submissionsStore.rversion.length &&
    submissionsStore.rversion.length ===
      submissionsStore.distribution.length &&
    submissionsStore.distribution.length ===
      submissionsStore.architecture.length
  )
})

function checkValidity(file: File) {
  return (
    filesStore.checkValidity(
      file,
      'application/gzip',
      '.tar.gz'
    ) ||
    filesStore.checkValidity(
      file,
      'application/x-gzip',
      '.tar.gz'
    )
  )
}

onMounted(() => {
  filesStore.files = submissionsStore.packages
  if (
    submissionsStore.repository?.technology !==
    Technologies.enum.Python
  ) {
    submissionsStore.getRConfiguration()
  }
})

function nextStep() {
  savePackagesInStore()
  if (submissionsStore.packages.length > 0 && valid.value) {
    emits('next', 3)
    submissionsStore.addSubmissionRequests()
  } else if (!valid.value) {
    toasts.error(t('submissions.wrongExtension'))
  } else {
    toasts.warning(t('submissions.noPackageChosen'))
  }
}
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

<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
    <v-card-text class="mb-1">
      <div class="text-overline">repository</div>
      <div id="repository-name" class="text-h4 mb-2">
        {{ chosenRepository?.name }}
      </div>

      <v-divider></v-divider>

      <v-list class="text-left">
        <v-list-item
          v-if="!!filesLocal.length"
          class="text-overline"
        >
          <template
            v-slot:append
            v-if="
              submissionsStore.repository?.technology !=
              'Python'
            "
          >
            generate manual
          </template>
        </v-list-item>
        <v-list-item
          v-for="file in filesLocal"
          :key="file.name"
          :title="file.name"
          class="hoverable"
        >
          <template v-slot:prepend>
            <v-btn
              @click="removeFile(file)"
              variant="plain"
              icon="mdi-delete"
              width="20"
              class="mr-8"
              :color="
                checkValidity(file) ? 'oared' : 'oared'
              "
            >
            </v-btn>
          </template>

          <template
            v-slot:append
            v-if="
              submissionsStore.repository?.technology !=
              'Python'
            "
          >
            <v-btn
              v-if="
                !submissionsStore.getGenerateManualForPackage(
                  file
                )
              "
              icon="mdi-checkbox-marked-outline"
              variant="text"
              @click="
                submissionsStore.addGenerateManualOptionForPackage(
                  file
                )
              "
            ></v-btn>
            <v-btn
              v-else
              icon="mdi-checkbox-blank-outline"
              variant="text"
              @click="
                submissionsStore.removeGenerateManualOptionForPackage(
                  file
                )
              "
            >
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-form v-model="valid">
      <div
        class="d-flex my-5 px-5"
        :class="
          files && files.length > 0
            ? 'justify-space-between'
            : ''
        "
        :style="
          files && files.length > 0
            ? ''
            : 'align-items: flex-end'
        "
      >
        <v-btn color="" type="button" @click="open()">
          <template #prepend>
            <v-icon icon="mdi-plus"></v-icon>
          </template>
          {{ $t('submissions.choseFiles') }}
        </v-btn>

        <v-btn
          class="mx-3"
          type="button"
          :disabled="!files"
          v-if="files && !!files.length"
          color="oared"
          @click="resetPackages()"
        >
          {{ $t('common.reset') }}
        </v-btn>
      </div>
    </v-form>
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
      :disabled="!!!filesLocal.length"
      @click="nextStep"
    >
      submit
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { useNotification } from '@kyvg/vue3-notification'
import { computed, ref } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { watch } from 'vue'
import { onMounted } from 'vue'
import { i18n } from '@/plugins/i18n'

const { files, open, reset } = useFileDialog({
  accept: 'application/gzip'
})

const chosenRepository = computed(() => {
  return submissionsStore.repository
})

const emits = defineEmits(['next'])
const submissionsStore = useSubmissionStore()
const notifications = useNotification()
const valid = ref<boolean>(true)

const filesLocal = ref<File[]>([])

function removeFile(file: File) {
  filesLocal.value.forEach((fileLocal: File, i: number) => {
    if (fileLocal == file) {
      filesLocal.value.splice(i, 1)
    }
  })
}

function resetPackages() {
  submissionsStore.setPackages([])
  reset()
}

watch(files, (files) => {
  filesLocal.value = Array.from(files || [])
})

function checkValidity(file: File) {
  return file['type'] === 'application/gzip'
}

function savePackagesInStore() {
  valid.value = filesLocal.value.every(checkValidity)
  if (valid.value) {
    submissionsStore.setPackages(filesLocal.value)
  } else {
    submissionsStore.setPackages([])
  }
}

onMounted(() => {
  filesLocal.value = submissionsStore.packages
})

function nextStep() {
  savePackagesInStore()
  if (submissionsStore.packages.length > 0 && valid.value) {
    emits('next', 3)
    submissionsStore.addSubmissionRequests()
  } else if (!valid.value) {
    notifications.notify({
      text: i18n.t('submissions.wrongExtension'),
      type: 'error'
    })
  } else {
    notifications.notify({
      text: i18n.t('submissions.noPackageChosen'),
      type: 'warn'
    })
  }
}
</script>

<style>
.v-list-item__prepend {
  align-self: center !important;
}

.v-card__underlay {
  display: none;
}
</style>

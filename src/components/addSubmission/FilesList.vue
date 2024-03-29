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

    <v-list class="text-left">
      <v-list-item
        v-if="!!filesStore.files.length"
        class="text-overline"
      >
        <template #default color="oared">
          <v-btn
            @click="resetPackages()"
            size="x-small"
            color="oared mb-1"
            class="reset-opacity"
            variant="outlined"
            >reset</v-btn
          >
        </template>

        <template
          #append
          v-if="
            submissionsStore.repository?.technology !=
            'Python'
          "
        >
          {{ $t('packages.generatemanual') }}
        </template>
      </v-list-item>
      <v-list-item
        v-for="file in filesStore.files"
        :key="file.name"
        :title="file.name"
        class="hoverable"
      >
        <template #prepend>
          <v-btn
            @click="filesStore.removeFile(file)"
            variant="plain"
            icon="mdi-delete"
            size="medium"
            class="mr-3"
            color="oared"
          />
          <ReplaceOption :file="file" />
        </template>

        <template
          #append
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
</template>

<script setup lang="ts">
import { useFilesListStore } from '@/store/local_files'
import { useSubmissionStore } from '@/store/submission'
import { computed } from 'vue'
import ReplaceOption from './ReplaceOption.vue'

const submissionsStore = useSubmissionStore()
const filesStore = useFilesListStore()

const chosenRepository = computed(() => {
  return submissionsStore.repository
})

function resetPackages() {
  filesStore.files = []
  submissionsStore.setPackages([])
  // reset()
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
  opacity: 0.8 !important;
  font-weight: 800 !important;
  &:hover {
    transition: opacity ease-in-out 0.3s;
    opacity: 1 !important;
  }
}
</style>

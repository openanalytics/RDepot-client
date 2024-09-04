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
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <AutocompleteField
      id="upload-submission-repository-field"
      class="mt-5"
      :store-id="storeId"
      :label="$t('addSubmission.step1Title')"
      filled
      dense
      clearable
      persistent-hint
      return-object
      :template="true"
      @load-items="loadRepositoriesObjects"
      @filtrate="filtrateRepositoriesObjects"
      @update:model-value="changeRepository"
      @click:clear="clearRepository"
    >
      <template #item="{ item, props }">
        <v-list-item
          v-intersect="loadRepositoriesObjects"
          v-bind="{
            ...props,
            id: `upload-submission-repository-${item.title}`
          }"
        >
          <template #append>
            <v-chip
              text-color="white"
              class="text-body-1"
              size="x-small"
              >{{
                typeof item.raw === 'object' &&
                'props' in item.raw &&
                'technology' in item.raw.props
                  ? item.raw?.props.technology
                  : ''
              }}</v-chip
            >
          </template>
        </v-list-item>
      </template>
    </AutocompleteField>
  </v-card>
  <div class="d-flex justify-end">
    <v-btn
      id="next-button"
      color="oablue"
      :disabled="submissionsStore.repository === undefined"
      @click="nextStep"
    >
      {{ $t('button.continue') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { EntityModelRepositoryDto } from '@/openapi'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import AutocompleteField from '@/components/common/fields/AutocompleteField.vue'
import { onBeforeMount } from 'vue'
import { useRepositoryStore } from '@/store/repositories'

const emits = defineEmits(['next'])
const submissionsStore = useSubmissionStore()
const toasts = useToast()
const { t } = useI18n()

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetRepositoriesPagination
} = useRepositoriesFiltration()

type SelectRepository = {
  title?: string
  value?: number
  props: {
    technology?: string
  }
}

function changeRepository(value: SelectRepository | null) {
  if (value) {
    const repository = {
      name: value.title,
      id: value.value,
      technology: value.props.technology
    } as EntityModelRepositoryDto
    submissionsStore.setRepository(repository)
  }
}

function clearRepository() {
  submissionsStore.repository = undefined
}

function nextStep() {
  if (submissionsStore.repository != null) {
    emits('next', 2)
  } else {
    toasts.warning(t('repositories.empty'))
  }
}

onBeforeMount(() => {
  useRepositoryStore().clearFiltration()
  resetRepositoriesPagination()
})
</script>

<style lang="scss">
.v-input {
  align-items: center !important;
}

.v-file-input {
  .v-file-input__text {
    .v-chip {
      font-size: 1.125em !important;
      margin-bottom: 10px !important;
    }
  }
}
</style>

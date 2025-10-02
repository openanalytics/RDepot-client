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
  <v-card class="mb-12 px-10 py-5 step" height="250px">
    <validated-input-field
      id="upload-submission-repository-field"
      as="autocomplete"
      name="repository"
      class="mt-5"
      :store-id="storeId"
      :label="i18n.t('forms.submissions.stepFirst')"
      filled
      dense
      clearable
      persistent-hint
      return-object
      :template="true"
      max-width="unset"
      @load-items="loadRepositoriesObjects"
      @filtrate="filtrateRepositoriesObjects"
      @update:model-value="changeRepository"
      @click:clear="clearRepository"
    >
      <template #item="{ item, props }">
        <v-list-item
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
    </validated-input-field>
  </v-card>
</template>

<script setup lang="ts">
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { onBeforeMount } from 'vue'
import { useRepositoryStore } from '@/store/options/repositories'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { i18n } from '@/plugins/i18n'
import { useField } from 'vee-validate'

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetRepositoriesPagination
} = useRepositoriesFiltration()

type SelectRepository = {
  title?: string
  value?: string
  props: {
    technology?: string
  }
}

const { setValue: setRepository } = useField('repository')
const { setValue: setTechnology } = useField('technology')

function changeRepository(value: SelectRepository | null) {
  if (value) {
    setTechnology(value.props.technology)
  }
}

function clearRepository() {
  setTechnology(undefined)
  setRepository(undefined)
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

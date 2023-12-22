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
  <v-container
    class="v-expansion mx-8"
    style="padding-left: 0; padding-right: 0"
  >
    <v-row>
      <v-col sm="4">
        <validated-input-field
          @update:modelValue="setFiltration"
          name="name"
          as="v-text-field"
          :label="$t('repositories.filtration.name')"
          color="oablue"
          id="filtration-name"
        />
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          id="filtration-technology"
          :items="technologies"
          name="technologies"
          multiple
          clearable
          as="v-select"
          :label="$t('filtration.technologies')"
        ></validated-input-field>
      </v-col>
      <v-col sm="3">
        <validated-input-field
          @update:modelValue="setFiltration"
          name="maintainer"
          as="autocomplete"
          multiple
          clearable
          :label="$t('packages.filtration.maintainer')"
          @loadItems="loadMaintainers"
          @filtrate="filtrateMaintainers"
          :storeId="storeIdMaintainer"
        ></validated-input-field>
      </v-col>
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          id="filtration-deleted"
          name="deleted"
          :label="$t('packages.filtration.deleted')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-col sm="1">
        <validated-input-field
          @change="setFiltration"
          id="filtration-published"
          name="published"
          :label="$t('repositories.filtration.published')"
          as="v-switch"
          color="oablue"
        ></validated-input-field>
      </v-col>
      <v-col sm="1">
        <v-btn
          class="my-2"
          color="oablue"
          size="large"
          @click="resetValues"
          v-if="!repositoryStore.isDefaultFiltration"
        >
          {{ t('filtration.reset') }}</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import {
  defaultValues,
  RepositoriesFiltration
} from '@/models/Filtration'
import { useI18n } from 'vue-i18n'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/maintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRepositoryStore } from '@/store/repositories'

const { t } = useI18n()
const { technologies } = useEnumFiltration()

const {
  storeIdMaintainer,
  filtrateMaintainers,
  loadMaintainers
} = useRepositoryMaintainersFiltration()
const repositoryStore = useRepositoryStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(RepositoriesFiltration),
  initialValues: repositoryStore.filtration
})

function setFiltration() {
  repositoryStore.setFiltration(
    values as RepositoriesFiltration
  )
}

function resetValues() {
  setValues(defaultValues(RepositoriesFiltration))
  repositoryStore.setFiltration(
    values as RepositoriesFiltration
  )
}
</script>

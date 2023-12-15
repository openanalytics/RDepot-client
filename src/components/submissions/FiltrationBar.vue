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
  <v-container class="mr-12">
    <v-row>
      <v-col sm="4">
        <validated-input-field
          @update:modelValue="setFiltration"
          name="name"
          as="v-text-field"
          :label="
            $t('submissions.filtration.searchPlaceholder')
          "
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
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          id="filtration-state"
          :items="states"
          name="state"
          multiple
          clearable
          as="v-select"
          :label="$t('filtration.state')"
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
      <v-col sm="3">
        <validated-input-field
          @update:modelValue="setFiltration"
          name="repository"
          as="autocomplete"
          multiple
          clearable
          :label="$t('packages.filtration.repository')"
          @loadItems="loadRepositories"
          @filtrate="filtrateRepositories"
          :storeId="storeId"
        ></validated-input-field>
      </v-col>
      <v-col sm="2">
        <div @click="pickDate">
          <validated-input-field
            @update:modelValue="setFiltration"
            name="fromDate"
            as="v-text-field"
            :label="$t('submissions.filtration.fromDate')"
            color="oablue"
            disabled
            id="filtration-fromDate"
          />
        </div>
      </v-col>
      <v-col sm="1">
        <v-btn
          class="my-2"
          color="oablue"
          @click="resetValues"
          v-if="!submissionsStore.isDefaultFiltration"
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
  SubmissionsFiltration
} from '@/models/Filtration'
import { useI18n } from 'vue-i18n'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoryMaintainersFiltration } from '@/composable/filtration/maintainersFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSubmissionStore } from '@/store/submission'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'

const { t } = useI18n()
const { states, technologies } = useEnumFiltration()

const { storeId, filtrateRepositories, loadRepositories } =
  useRepositoriesFiltration()

const {
  storeIdMaintainer,
  filtrateMaintainers,
  loadMaintainers
} = useRepositoryMaintainersFiltration()
const submissionsStore = useSubmissionStore()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(SubmissionsFiltration),
  initialValues: submissionsStore.filtration
})

function setFiltration() {
  submissionsStore.setFiltration(
    values as SubmissionsFiltration
  )
}

function resetValues() {
  setValues(defaultValues(SubmissionsFiltration))
  submissionsStore.setFiltration(
    values as SubmissionsFiltration
  )
}

function pickDate() {
  console.log('date picked')
}
</script>

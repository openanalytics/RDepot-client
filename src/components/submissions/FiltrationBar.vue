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
  <DatePicker
    v-model="showDatepicker"
    :previousDate="fromDatePicker"
    @updateDate="updateDate"
    @closeModal="closeModal"
    @resetDate="resetDate"
  />
  <v-container
    class="v-expansion mx-8"
    style="padding-left: 0; padding-right: 0"
  >
    <v-row>
      <v-col sm="5">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          name="search"
          as="v-text-field"
          :label="
            $t('submissions.filtration.searchPlaceholder')
          "
          color="oablue"
          id="filtration-search"
        />
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
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
          density="compact"
          hide-details
          chips
          closable-chips
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
          density="compact"
          hide-details
          chips
          closable-chips
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
    </v-row>
    <v-row>
      <v-col sm="2">
        <validated-input-field
          @update:focused="selectFromDate"
          density="compact"
          hide-details
          name="fromDate"
          as="v-text-field"
          :label="$t('submissions.filtration.fromDate')"
          color="oablue"
          id="filtration-fromDate"
        />
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:focused="selectToDate"
          density="compact"
          hide-details
          name="toDate"
          as="v-text-field"
          :label="$t('submissions.filtration.toDate')"
          color="oablue"
          id="filtration-toDate"
        />
      </v-col>
      <v-spacer />
      <v-col sm="1" class="reset-button">
        <v-btn
          class="my-2"
          id="reset-button"
          color="oablue"
          density="compact"
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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSubmissionStore } from '@/store/submission'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import DatePicker from '@/components/common/DatePicker.vue'
import { useDatePicker } from '@/composable/datePicker'

const { t } = useI18n()
const { states, technologies } = useEnumFiltration()
const {
  fromDatePicker,
  changedDate,
  showDatepicker,
  selectDate,
  closeModal
} = useDatePicker()
const { storeId, filtrateRepositories, loadRepositories } =
  useRepositoriesFiltration()

const submissionsStore = useSubmissionStore()

const { setValues, values, setFieldValue } = useForm({
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

function selectFromDate(e: boolean) {
  selectDate(e, 'from', values.fromDate)
}

function selectToDate(e: boolean) {
  selectDate(e, 'to', values.toDate)
}

function updateDate(value: Date) {
  if (changedDate.value === 'from') {
    setFieldValue(
      'fromDate',
      value.toLocaleDateString('en-CA')
    )
  } else if (changedDate.value === 'to') {
    setFieldValue(
      'toDate',
      value.toLocaleDateString('en-CA')
    )
  }
  closeModal()
  setFiltration()
}

function resetDate() {
  if (changedDate.value === 'from') {
    setFieldValue('fromDate', undefined)
  } else if (changedDate.value === 'to') {
    setFieldValue('toDate', undefined)
  }
  closeModal()
  setFiltration()
}
</script>

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>

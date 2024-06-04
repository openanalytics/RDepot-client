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
    :previous-date="fromDatePicker"
    :direction="changedDate"
    :allowed-dates="allowedDates"
    @update-date="updateDate"
    @close-modal="closeModal"
    @reset-date="resetDate"
  />
  <div
    class="v-expansion d-flex py-3 ga-3 justify-space-between"
    style="padding-left: 0; padding-right: 0"
  >
    <validated-input-field
      id="filtration-search"
      density="compact"
      hide-details
      name="search"
      as="v-text-field"
      :label="
        $t('submissions.filtration.searchPlaceholder')
      "
      color="oablue"
      @update:model-value="setFiltration"
    />

    <validated-input-field
      id="filtration-technology"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="technologies"
      name="technologies"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.technologies')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="filtration-state"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="states"
      name="state"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.state')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      density="compact"
      hide-details
      chips
      closable-chips
      name="repository"
      as="autocomplete"
      multiple
      clearable
      :label="$t('packages.filtration.repository')"
      :store-id="storeId"
      :template="true"
      @update:model-value="setFiltration"
      @load-items="loadRepositories"
      @filtrate="filtrateRepositoriesObjects"
    >
      <template #item="{ props }">
        <v-list-item
          v-intersect="loadRepositories"
          v-bind="props"
        >
          <template #prepend="{ isActive }">
            <v-list-item-action start>
              <v-checkbox-btn
                :model-value="isActive"
              ></v-checkbox-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </validated-input-field>

    <validated-input-field
      id="filtration-fromDate"
      density="compact"
      hide-details
      name="fromDate"
      as="v-text-field"
      :label="$t('submissions.filtration.fromDate')"
      color="oablue"
      @update:focused="selectFromDate"
    />

    <validated-input-field
      id="filtration-toDate"
      density="compact"
      hide-details
      name="toDate"
      as="v-text-field"
      :label="$t('submissions.filtration.toDate')"
      color="oablue"
      @update:focused="selectToDate"
    />
    <v-spacer />
    <ResetButton
      v-if="!submissionsStore.isDefaultFiltration"
      @reset-values="resetValues"
    />
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSubmissionStore } from '@/store/submission'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import DatePicker from '@/components/common/fields/DatePicker.vue'
import { useDatePicker } from '@/composable/datePicker'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { computed } from 'vue'

const { states, technologies } = useEnumFiltration()
const {
  fromDatePicker,
  changedDate,
  showDatepicker,
  selectDate,
  closeModal
} = useDatePicker()
const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositories
} = useRepositoriesFiltration()

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

const allowedDates = computed(() => {
  switch (changedDate.value) {
    case 'from': {
      return values.toDate
    }
    case 'to': {
      return values.fromDate
    }
    default: {
      return undefined
    }
  }
})

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

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
  <DatePickerField
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
      id="events-filtration-technology"
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
      id="events-filtration-event-type"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="sortValues(eventTypes)"
      name="eventType"
      as="v-select"
      clearable
      multiple
      :label="$t('events.filtration.eventType')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="events-filtration-resource-type"
      density="compact"
      hide-details
      chips
      closable-chips
      :items="sortValues(resourceTypes)"
      name="resourceType"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.resourceType')"
      @update:model-value="setFiltration"
    ></validated-input-field>

    <validated-input-field
      id="events-filtration-from-date"
      density="compact"
      hide-details
      name="fromDate"
      as="v-text-field"
      :label="$t('submissions.filtration.fromDate')"
      color="oablue"
      @update:focused="selectFromDate"
    />

    <validated-input-field
      id="events-filtration-to-date"
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
      v-if="!eventStore.isDefaultFiltration"
      @reset-values="resetValues"
    />
  </div>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import {
  defaultValues,
  EventsFiltration
} from '@/models/Filtration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useEventsStore } from '@/store/options/events'
import DatePickerField from '@/components/common/fields/DatePickerField.vue'
import { useDatePicker } from '@/composable/datePicker'
import ResetButton from '@/components/common/buttons/ResetButton.vue'
import { computed } from 'vue'

const {
  technologies,
  resourceTypes,
  eventTypes,
  sortValues
} = useEnumFiltration()

const {
  fromDatePicker,
  changedDate,
  showDatepicker,
  selectDate,
  closeModal
} = useDatePicker()

const eventStore = useEventsStore()

const { setValues, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(EventsFiltration),
  initialValues: eventStore.filtration
})

const allowedDates = computed(() => {
  switch (changedDate.value) {
    case 'from':
      return values.toDate
    case 'to':
      return values.fromDate
    default:
  }
  return undefined
})

function setFiltration() {
  eventStore.setFiltration(values as EventsFiltration)
}

function resetValues() {
  setValues(defaultValues(EventsFiltration))
  eventStore.setFiltration(values as EventsFiltration)
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

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
          id="filtration-event-type"
          :items="eventTypes"
          name="eventType"
          as="v-select"
          clearable
          multiple
          :label="$t('events.filtration.eventType')"
        ></validated-input-field>
      </v-col>
      <v-col sm="2">
        <validated-input-field
          @update:modelValue="setFiltration"
          density="compact"
          hide-details
          chips
          closable-chips
          id="filtration-resource-type"
          :items="resourceTypes"
          name="resourceType"
          multiple
          clearable
          as="v-select"
          :label="$t('filtration.resourceType')"
        ></validated-input-field>
      </v-col>
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
          density="compact"
          color="oablue"
          @click="resetValues"
          v-if="!eventStore.isDefaultFiltration"
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
  EventsFiltration
} from '@/models/Filtration'
import { useI18n } from 'vue-i18n'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useEventsStore } from '@/store/events'
import DatePicker from '@/components/common/DatePicker.vue'
import { useDatePicker } from '@/composable/datePicker'

const { t } = useI18n()
const { technologies, resourceTypes, eventTypes } =
  useEnumFiltration()

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

<style lang="scss">
.reset-button {
  display: grid;
  align-content: center;
}
</style>

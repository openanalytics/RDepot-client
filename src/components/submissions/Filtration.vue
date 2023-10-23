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
  <filtration-card
    :title="$t('filtration.title')"
    v-on:clear-filtration="resetValues()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
    <form as="v-form" lazy-validation>
      <validated-input-field
        id="filtration-state"
        :items="states"
        name="state"
        as="v-select"
        :label="$t('filtration.state')"
      ></validated-input-field>

      <validated-input-field
        name="package"
        as="autocomplete"
        :label="$t('submissions.filtration.package')"
        v-on:loadItems="loadPackages"
        v-on:filtrate="filtratePackages"
        :storeId="storeId"
      ></validated-input-field>

      <validated-input-field
        name="assignedToMe"
        :label="$t('filtration.assignedToMe')"
        as="v-switch"
      ></validated-input-field>
    </form>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useSubmissionStore } from '@/store/submission'
import { useForm } from 'vee-validate'
import {
  SubmissionsFiltration,
  defaultValues
} from '@/models/Filtration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { toTypedSchema } from '@vee-validate/zod'

const emit = defineEmits(['closeModal'])

const submissionsStore = useSubmissionStore()

const { states } = useEnumFiltration()
const { storeId, loadPackages, filtratePackages } =
  usePackagesFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(SubmissionsFiltration),
  initialValues: submissionsStore.filtration
})

function setFiltration() {
  submissionsStore.setFiltration(values)
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(SubmissionsFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>

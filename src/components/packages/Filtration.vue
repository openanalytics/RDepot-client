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
    <validated-input-field
      id="filtration-state"
      :items="states"
      multiple
      clearable
      name="state"
      as="v-select"
      :label="$t('filtration.state')"
    ></validated-input-field>

    <validated-input-field
      name="repository"
      as="autocomplete"
      multiple
      clearable
      :label="$t('packages.filtration.repository')"
      v-on:loadItems="loadRepositories"
      v-on:filtrate="filtrateRepositories"
      :storeId="storeId"
    ></validated-input-field>

    <validated-input-field
      id="filtration-technology"
      :items="technologies"
      name="technologies"
      multiple
      clearable
      as="v-select"
      :label="$t('filtration.technologies')"
    ></validated-input-field>

    <validated-input-field
      id="filtration-deleted"
      name="deleted"
      :label="$t('packages.filtration.deleted')"
      as="v-switch"
      color="oablue"
    ></validated-input-field>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import {
  defaultValues,
  PackagesFiltration
} from '@/models/Filtration'
import { usePackagesStore } from '@/store/packages'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const emit = defineEmits(['closeModal'])

const { storeId, filtrateRepositories, loadRepositories } =
  useRepositoriesFiltration()
const packageStore = usePackagesStore()

const { states, technologies } = useEnumFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(PackagesFiltration),
  initialValues: packageStore.filtration
})

function setFiltration() {
  packageStore.setFiltration(values as PackagesFiltration)
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(PackagesFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>

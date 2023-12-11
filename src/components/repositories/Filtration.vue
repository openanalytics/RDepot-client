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
    @clear-filtration="resetValues()"
    @set-filtration="setFiltration()"
    @change-dialog-options="cancelModal()"
  >
    <validated-input-field
      name="name"
      as="autocomplete"
      :label="$t('packages.filtration.repository')"
      @loadItems="loadRepositories"
      @filtrate="filtrateRepositories"
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
      color="oablue"
      as="v-switch"
    ></validated-input-field>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { useRepositoryStore } from '@/store/repositories'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'

const emit = defineEmits(['closeModal'])

const repositoryStore = useRepositoryStore()

const { storeId, filtrateRepositories, loadRepositories } =
  useRepositoriesFiltration()
const { technologies } = useEnumFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(RepositoriesFiltration),
  initialValues: repositoryStore.filtration
})

function setFiltration() {
  repositoryStore.setFiltration(
    values as RepositoriesFiltration
  )
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(RepositoriesFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>

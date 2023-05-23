<template>
  <filtration-card
    :title="$t('packages.filtration.title')"
    v-on:clear-filtration="resetValues()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
    <validated-input-field
      id="filtration-state"
      :items="states"
      name="state"
      as="v-select"
      :label="$t('packages.filtration.state')"
    ></validated-input-field>

    <validated-input-field
      name="repository"
      as="autocomplete"
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
      as="v-select"
      :label="$t('repositories.filtration.technology')"
    ></validated-input-field>

    <validated-input-field
      id="filtration-deleted"
      name="deleted"
      :label="$t('packages.filtration.deleted')"
      as="v-switch"
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
const package_store = usePackagesStore()

const { states, technologies } = useEnumFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(PackagesFiltration),
  initialValues: package_store.filtration
})

function setFiltration() {
  package_store.setFiltration(values as PackagesFiltration)
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(PackagesFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>
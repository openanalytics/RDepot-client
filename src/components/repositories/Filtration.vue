<template>
  <filtration-card
    :title="$t('repositories.filtration.title')"
    v-on:clear-filtration="resetValues()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
    <validated-input-field
      name="name"
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

const repository_store = useRepositoryStore()

const { storeId, filtrateRepositories, loadRepositories } =
  useRepositoriesFiltration()
const { technologies } = useEnumFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(RepositoriesFiltration),
  initialValues: repository_store.filtration
})

function setFiltration() {
  repository_store.setFiltration(
    values as RepositoriesFiltration
  )
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(RepositoriesFiltration))
}

function cancelModal() {
  emit('closeModal')
  console.log(values)
}
</script>

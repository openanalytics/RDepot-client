<template>
  <filtration-card
    :title="$t('maintainers.filtration.title')"
    v-on:clear-filtration="resetValues()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
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
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import {
  PackageMaintainersFiltration,
  defaultValues
} from '@/models/Filtration'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const emit = defineEmits(['closeModal'])

const maintainers_store = usePackageMaintainersStore()

const { technologies } = useEnumFiltration()
const { values, setValues } = useForm({
  validationSchema: toTypedSchema(
    PackageMaintainersFiltration
  ),
  initialValues: maintainers_store.filtration
})

function setFiltration() {
  maintainers_store.setFiltration(
    values as PackageMaintainersFiltration
  )
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(PackageMaintainersFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>

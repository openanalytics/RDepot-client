<template>
  <filtration-card
    :title="$t('submissions.filtration.title')"
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
        :label="$t('submissions.filtration.state')"
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
        :label="$t('submissions.filtration.assigned')"
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

const submissions_store = useSubmissionStore()

const { states } = useEnumFiltration()
const { storeId, loadPackages, filtratePackages } =
  usePackagesFiltration()

const { setValues, values } = useForm({
  validationSchema: toTypedSchema(SubmissionsFiltration),
  initialValues: submissions_store.filtration
})

function setFiltration() {
  submissions_store.setFiltration(values)
  cancelModal()
}

function resetValues() {
  setValues(defaultValues(SubmissionsFiltration))
}

function cancelModal() {
  emit('closeModal')
}
</script>

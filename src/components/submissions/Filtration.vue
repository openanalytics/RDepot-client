<template>
  <filtration-card
    :title="$t('submissions.filtration.title')"
    v-on:clear-filtration="clearFiltration()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="changeDialogOptions()"
  >
    <form as="v-form" lazy-validation>
      <validated-input-field
        id="filtration-state"
        :items="stateSelect"
        name="state"
        as="v-select"
        :label="$t('submissions.filtration.state')"
      ></validated-input-field>
      <SelectField
        name="package"
        :label="$t('submissions.filtration.package')"
        v-on:loadItems="loadPackages"
        v-on:filtrate="filtratePackages"
        store_id="packages"
      />
      <validated-input-field
        name="assignedToMe"
        :label="$t('submissions.filtration.assigned')"
        :items="stateSelect"
        as="v-switch"
      ></validated-input-field>
    </form>
  </filtration-card>
</template>

<script setup lang="ts">
import {
  EntityModelPackageDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionStore } from '@/store/submission'
import { ref, onMounted } from 'vue'
import { useObjectActions } from '@/composable/objectActions'
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import SelectField from '@/components/common/fields/SelectField.vue'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { SubmissionsFiltration } from '@/models/Filtration'
import { usePackagesStore } from '@/store/packages'
import { useSelectStore } from '@/store/select_pagination'

const { setAllFields } = useObjectActions()
const submissions_store = useSubmissionStore()
const packages_store = usePackagesStore()
const select_store = useSelectStore('packages')

const stateSelect = ref(
  Object.values(EntityModelSubmissionDtoStateEnum)
)

const localFiltration = ref(submissions_store.filtration)
const emit = defineEmits(['closeModal'])

const { meta, values } = useForm({
  validationSchema: {
    state: EntityModelSubmissionDtoStateEnum,
    package: String,
    assignedToMe: Boolean
  }
})

async function loadPackages() {
  select_store.paginationData =
    await packages_store.fetchPageOfPackages(
      select_store.paginationData.page
    )
  select_store.addItems(
    packages_store.packages.map(
      (packageBag: EntityModelPackageDto) => packageBag.name
    )
  )
}

function filtratePackages(value: string | undefined) {
  if (packages_store.filtration.repository !== value) {
    packages_store.setFiltrationByRepositoryOnly(value)
  }
}

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(submissions_store.filtration)
  )
}

function setFiltration() {
  var submissionFiltration: SubmissionsFiltration = {
    state: values.state,
    package: values.package,
    assignedToMe: values.assignedToMe
  }
  console.log(values)
  emit('closeModal')
  submissions_store.setFiltration(submissionFiltration)
}

function changeDialogOptions() {
  updateFiltration()
  emit('closeModal')
}

onMounted(async () => {
  updateFiltration()
})

function clearFiltration() {
  setAllFields(localFiltration.value, undefined)
}
</script>

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
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import {
  defaultValues,
  SubmissionsFiltration
} from '@/models/Filtration'
import { useUtilities } from '@/composable/utilities'

const submissions_store = useSubmissionStore()
const packages_store = usePackagesStore()
const select_store = useSelectStore('packages')

const stateSelect = ref(
  Object.values(EntityModelSubmissionDtoStateEnum)
)

const localFiltration = ref(submissions_store.filtration)
const emit = defineEmits(['closeModal'])

const { meta, values } = useForm({
    state: EntityModelSubmissionDtoStateEnum,
  validationSchema: {
})
  }
    assignedToMe: Boolean
    package: String,

function updateFiltration() {
  localFiltration.value = deepCopy(
    submissions_store.filtration
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
  localFiltration.value = defaultValues(
    SubmissionsFiltration
  )
}
</script>
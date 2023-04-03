<template>
  <filtration-card
    :title="$t('submissions.filtration.title')"
    v-on:clear-filtration="clearFiltration()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="changeDialogOptions()"
  >
    <v-select
      id="filtration-state"
      v-model="localFiltration.state"
      :items="stateSelect"
      :label="$t('submissions.filtration.state')"
    ></v-select>
    {{ localFiltration.package }}
    <v-combobox
      id="filtration-repository"
      v-model="localFiltration.package"
      :items="package_store.packages"
      item-title="name"
      filter-keys="name"
      :placeholder="placeholder"
      :hide-no-data="false"
      persistent-hint
      :menu-props="{
        location: 'bottom center',
        height: '200px'
      }"
      :label="$t('submissions.filtration.package')"
      autofocus
      @update:search="updateSearch($event)"
      return-object
    >
    </v-combobox>

    <v-switch
      v-model="localFiltration.assignedToMe"
      color="oablue"
      :label="$t('submissions.filtration.assigned')"
    >
    </v-switch>
  </filtration-card>
</template>

<script setup lang="ts">
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import { useSubmissionStore } from '@/store/submission'
import { ref, onMounted } from 'vue'
import { useObjectActions } from '@/composable/objectActions'
import FiltrationCard from '../common/FiltrationCard.vue'

const { setAllFields } = useObjectActions()
const submissions_store = useSubmissionStore()
const package_store = usePackagesStore()

const stateSelect = ref(
  Object.values(EntityModelSubmissionDtoStateEnum)
)
const localFiltration = ref(submissions_store.filtration)
const search = ref('')
const placeholder = ref('')
const emit = defineEmits(['closeModal'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(submissions_store.filtration)
  )
}

function updateSearch(value: string) {
  // if (value.length > 2) {
  // alert(value)
  // package_store.fetchAllPackages()
  // }
}

async function setFiltration() {
  emit('closeModal')
  await submissions_store.setFiltration(
    localFiltration.value
  )
}

function changeDialogOptions() {
  updateFiltration()
  emit('closeModal')
}

onMounted(async () => {
  updateFiltration()
  package_store.fetchAllPackages()
})

function clearFiltration() {
  setAllFields(localFiltration.value, undefined)
}
</script>

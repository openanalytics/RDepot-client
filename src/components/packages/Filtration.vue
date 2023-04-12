<template>
  <filtration-card
    :title="$t('packages.filtration.title')"
    v-on:clear-filtration="clearFiltration()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
    <v-select
      id="filtration-state"
      v-model="localFiltration.state"
      :items="submissionStateSelect"
      :label="$t('packages.filtration.state')"
      data-test="filtration-state"
    ></v-select>
    <v-combobox
      v-model="localFiltration.repository"
      :items="repositoryNameSelect"
      :label="$t('packages.filtration.repository')"
    >
    </v-combobox>

    <v-select
      id="filtration-technology"
      v-model="localFiltration.technologies"
      :items="technologySelect"
      multiple
      :label="$t('repositories.filtration.technology')"
    ></v-select>
    <v-checkbox
      id="filtration-deleted"
      :label="
        localFiltration && $t('packages.filtration.deleted')
      "
      v-model="localFiltration.deleted"
    ></v-checkbox>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import { useObjectActions } from '@/composable/objectActions'
import { TechnologiesEnum } from '@/enum/Technologies'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeModal'])

const { setAllFields } = useObjectActions()
const package_store = usePackagesStore()

const submissionStateSelect = ref(
  Object.values(EntityModelSubmissionDtoStateEnum)
)
const technologySelect = ref(
  Object.values(TechnologiesEnum)
)
const repositoryNameSelect = ref(['repo1', 'repo2'])
let filtration = package_store.filtration
const localFiltration = ref(filtration)

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(package_store.filtration)
  )
}

async function setFiltration() {
  await package_store.setFiltration(localFiltration.value)
  cancelModal()
}

function cancelModal() {
  updateFiltration()
  emit('closeModal')
}

onMounted(() => {
  updateFiltration()
})

function clearFiltration() {
  setAllFields(localFiltration.value, undefined)
}
</script>

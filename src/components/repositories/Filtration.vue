<template>
  <filtration-card
    :title="$t('repositories.filtration.title')"
    v-on:clear-filtration="clearFiltration()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="changeDialogOptions()"
  >
    <v-select
      id="filtration-name"
      v-model="localFiltration.name"
      :items="repository_store.repositories"
      item-value="name"
      item-title="name"
      :label="$t('repositories.filtration.name')"
    ></v-select>

    <v-select
      id="filtration-technology"
      v-model="localFiltration.technologies"
      :items="technologySelect"
      :label="$t('repositories.filtration.technology')"
      multiple
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
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import { Technologies } from '@/enum/Technologies'
import {
  RepositoriesFiltration,
  defaultValues
} from '@/models/Filtration'
import { useUtilities } from '@/composable/utilities'

const repository_store = useRepositoryStore()

const technologySelect = ref(Technologies.options)
let filtration = repository_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['closeModal'])

const { deepCopy } = useUtilities()

function updateFiltration() {
  localFiltration.value = deepCopy(
    repository_store.filtration
  )
  console.log(localFiltration.value)
}

function setFiltration() {
  repository_store.setFiltration(localFiltration.value)
  changeDialogOptions()
}

function changeDialogOptions() {
  updateFiltration()
  emit('closeModal')
}

onMounted(() => {
  updateFiltration()
})

function clearFiltration() {
  localFiltration.value = defaultValues(
    RepositoriesFiltration
  )
}
</script>

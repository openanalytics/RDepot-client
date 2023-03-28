<template>
  <filtration-card
    :title="$t('maintainers.filtration.title')"
    v-on:clear-filtration="clearFiltration()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="changeDialogOptions()"
  >
    <v-select
      multiple
      id="filtration-technology"
      v-model="localFiltration.technologies"
      :items="technologySelect"
      :label="$t('maintainers.filtration.technology')"
    ></v-select>

    <v-checkbox
      id="filtration-deleted"
      :label="
        localFiltration &&
        $t('maintainers.filtration.deleted')
      "
      v-model="localFiltration.deleted"
    ></v-checkbox>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { ref, onMounted } from 'vue'

const maintainers_store = usePackageMaintainersStore()

const technologySelect = ref(['R', 'Python'])
let filtration = maintainers_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['closeModal'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(maintainers_store.filtration)
  )
}

async function setFiltration() {
  await maintainers_store.setFiltration(
    localFiltration.value
  )
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
  localFiltration!.value.technologies = undefined
  localFiltration!.value.deleted = undefined
}
</script>

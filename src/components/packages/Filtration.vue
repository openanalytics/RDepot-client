<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('packages.filtration.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-select
          id="filtrationstate"
          v-model="localFiltration.state"
          :items="submissionStateSelect"
          :label="$t('packages.filtration.state')"
          data-test="filtrationstate"
        ></v-select>

        <v-select
          id="filtrationrepository"
          v-model="localFiltration.repository"
          :items="repositoryNameSelect"
          :label="$t('packages.filtration.repository')"
        ></v-select>

        <v-checkbox
          id="filtrationdeleter"
          :label="
            localFiltration &&
            $t('packages.filtration.deleted')
          "
          v-model="localFiltration.deleted"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row justify="space-between" class="mt-1">
        <v-btn
          id="cancelbutton"
          color="blue darken-1"
          @click="changeDialogOptions"
          class="mx-1"
        >
          <small>
            {{ $t('common.cancel') }}
          </small>
        </v-btn>
        <v-row class="my-0" justify="end">
          <v-btn
            id="resetbutton"
            color="blue darken-1"
            class="mx-1"
            @click="clearFiltration"
          >
            <small>
              {{ $t('common.clearForm') }}
            </small>
          </v-btn>
          <v-btn
            id="setfiltration"
            color="blue darken-1"
            class="mx-1"
            @click="setFiltration"
          >
            <small>
              {{ $t('common.apply') }}
            </small>
          </v-btn>
        </v-row>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { ref, onMounted } from 'vue'

const package_store = usePackagesStore()

const submissionStateSelect = ref(['ACCEPTED', 'CANCELLED'])
const repositoryNameSelect = ref(['repo1', 'repo2'])
let filtration = package_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['changeOptions'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(package_store.filtration)
  )
}

async function setFiltration() {
  await package_store.setFiltration(localFiltration.value)
  changeDialogOptions()
}

function changeDialogOptions() {
  updateFiltration()
  emit('changeOptions')
}

onMounted(() => {
  updateFiltration()
})

function clearFiltration() {
  localFiltration!.value.state = ''
  localFiltration!.value.repository = ''
  localFiltration!.value.deleted = false
}
</script>

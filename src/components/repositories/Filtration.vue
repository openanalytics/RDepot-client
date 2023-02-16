<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('repositories.filtration') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-select
          id="filtrationstate"
          v-model="localFiltration.name.value"
          :items="repositoryNameSelect"
          :label="localFiltration.name.label"
          data-test="filtrationstate"
        ></v-select>

        <v-select
          id="filtrationrepository"
          v-model="localFiltration.technology.value"
          :items="technologySelect"
          :label="localFiltration.technology.label"
        ></v-select>
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
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'

const repository_store = useRepositoryStore()

const technologySelect = ref(['R', 'Python'])
const repositoryNameSelect = ref(['repo1', 'repo2'])
let filtration = repository_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['changeOptions'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(repository_store.filtration)
  )
}

async function setFiltration() {
  await repository_store.setFiltration(
    localFiltration.value
  )
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
  localFiltration!.value.technology.value = ''
  localFiltration!.value.name.value = ''
}
</script>

<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('repositories.filtration.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
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
          v-model="localFiltration.technology"
          :items="technologySelect"
          :label="$t('repositories.filtration.technology')"
          multiple
        ></v-select>
        <v-checkbox
          id="filtration-deleted"
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
          id="cancel-button"
          color="blue darken-1"
          @click="changeDialogOptions()"
          class="mx-1"
        >
          <small>
            {{ $t('common.cancel') }}
          </small>
        </v-btn>
        <v-row class="my-0" justify="end">
          <v-btn
            id="reset-button"
            color="blue darken-1"
            class="mx-1"
            @click="clearFiltration()"
          >
            <small>
              {{ $t('common.clearForm') }}
            </small>
          </v-btn>
          <v-btn
            id="set-filtration"
            color="blue darken-1"
            class="mx-1"
            @click="setFiltration()"
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
let filtration = repository_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['closeModal'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(repository_store.filtration)
  )
  console.log(localFiltration.value)
}

async function setFiltration() {
  await repository_store.setFiltration(
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
  localFiltration!.value.technology = undefined
  localFiltration!.value.name = undefined
  localFiltration!.value.deleted = undefined
}
</script>

<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('repositories.creation.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form">
        <v-text-field
          class="my-2"
          id="repository-name"
          v-model="newRepository.name"
          :label="$t('repositories.creation.name')"
        ></v-text-field>

        <v-text-field
          class="my-2"
          id="repository-technology"
          v-model="newRepository.publicationUri"
          :label="
            $t('repositories.creation.publicationUri')
          "
        ></v-text-field>
        <v-text-field
          class="my-2"
          id="filtration-deleted"
          v-model="newRepository.serverAddress"
          :label="$t('repositories.creation.serverAddress')"
        ></v-text-field>
        <v-select
          class="my-2"
          id="repository-technology"
          v-model="newRepository.technology"
          :items="technologySelect"
          :label="$t('repositories.creation.technology')"
        >
        </v-select>
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
            id="set-filtration"
            color="blue darken-1"
            class="mx-1"
            @click="createRepository()"
          >
            <small>
              {{ $t('common.create') }}
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
import { EntityModelRepositoryDto } from '@/openapi'
import { TechnologiesEnum } from '@/enum/Technologies'

const repository_store = useRepositoryStore()

const technologySelect = ref(
  Object.values(TechnologiesEnum)
)

const newRepository = ref({} as EntityModelRepositoryDto)

const emit = defineEmits(['closeModal'])

async function createRepository() {
  await repository_store.createRepository(
    newRepository.value
  )
  changeDialogOptions()
}

function changeDialogOptions() {
  emit('closeModal')
}

onMounted(() => {})
</script>

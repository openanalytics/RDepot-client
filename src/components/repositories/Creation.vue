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
          class="my-5"
          id="repository-technology"
          v-model="newRepository.publicationUri"
          :label="
            $t('repositories.creation.publicationUri')
          "
          :placeholder="
            $t(
              'repositories.creation.publicationUriPlaceholder'
            )
          "
        ></v-text-field>
        <v-text-field
          class="my-2"
          id="filtration-deleted"
          v-model="newRepository.serverAddress"
          :label="$t('repositories.creation.serverAddress')"
          :placeholder="
            $t(
              'repositories.creation.serverAddressPlaceholder'
            )
          "
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
    <card-actions :buttons="buttons" />
  </v-card>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'
import { EntityModelRepositoryDto } from '@/openapi'
import { TechnologiesEnum } from '@/enum/Technologies'
import CardActions from '../common/CardActions.vue'
import { i18n } from '@/plugins/i18n'

const repository_store = useRepositoryStore()

const technologySelect = ref(
  Object.values(TechnologiesEnum)
)

const buttons = [
  {
    text: i18n.t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    text: i18n.t('common.create'),
    handler: createRepository
  }
]

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

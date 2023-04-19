<template>
  <Form
    as="v-form"
    :validation-schema="validationSchema"
    v-slot="{ values }"
  >
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('repositories.creation.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <validated-input-field
          name="name"
          as="v-text-field"
          :label="$t('repositories.creation.name')"
        ></validated-input-field>
        <validated-input-field
          name="publicationUri"
          as="v-text-field"
          :label="
            $t('repositories.creation.publicationUri')
          "
        ></validated-input-field>
        <validated-input-field
          name="serverAddress"
          as="v-text-field"
          :label="$t('repositories.creation.serverAddress')"
        ></validated-input-field>
        <validated-input-field
          :items="technologySelect"
          name="technology"
          as="v-select"
          :label="$t('repositories.creation.technology')"
        ></validated-input-field>
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
              @click="onSubmit(values)"
            >
              <small>
                {{ $t('common.create') }}
              </small>
            </v-btn>
          </v-row>
        </v-row>
      </v-card-actions>
    </v-card>
  </Form>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'
import { EntityModelRepositoryDto } from '@/openapi'
import { Technologies } from '@/enum/Technologies'
import { repositorySchema } from '@/models/Schamas'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { Form } from 'vee-validate'
import ValidatedInputField from '../common/ValidatedInputField.vue'

const validationSchema = toTypedSchema(
  repositorySchema.pick({
    name: true,
    publicationUri: true,
    serverAddress: true,
    technology: true
  })
)

const repository_store = useRepositoryStore()

const technologySelect = ref(Technologies.options)

const emit = defineEmits(['closeModal'])

function onSubmit(values: EntityModelRepositoryDto) {
  // console.log('Submited with ', values)
  repository_store.createRepository(values)
  changeDialogOptions()
}

function changeDialogOptions() {
  emit('closeModal')
}

onMounted(() => {})
</script>

<style>
.v-input__details {
  display: flex;
}
</style>

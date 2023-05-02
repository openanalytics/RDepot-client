<template>
  <form as="v-form" lazy-validation>
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
          :loading="loading"
          lazy-validation
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
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { useRepositoryStore } from '@/store/repositories'
import { ref, onMounted } from 'vue'
import { Technologies } from '@/enum/Technologies'
import { repositorySchema } from '@/models/Schemas'
import { toTypedSchema } from '@vee-validate/zod/dist/vee-validate-zod'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { notify } from '@kyvg/vue3-notification'
import CardActions from '@/components/common/CardActions.vue'
import { i18n } from '@/plugins/i18n'
import { z } from 'zod'

const repository_store = useRepositoryStore()

const technologySelect = ref(Technologies.options)

const buttons = [
  {
    id: 'cancel-button',
    text: i18n.t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-filtration',
    text: i18n.t('common.create'),
    handler: createRepository
  }
]

const loading = ref(false)
let previousVal = ''
let previousReturn = true

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: repositorySchema.shape.name.refine(
        async (value) => {
          if (previousVal === value) {
            return previousReturn
          }
          previousVal = value
          loading.value = true
          const repositoryWithSameName =
            await repository_store.fetchRepository(value)
          loading.value = false
          previousReturn =
            repositoryWithSameName.length === 0
          return previousReturn
        },
        i18n.t('repositories.creation.duplicateName')
      ),
      publicationUri: repositorySchema.shape.publicationUri,
      serverAddress: repositorySchema.shape.serverAddress,
      technology: repositorySchema.shape.technology
    })
  )
})

const emit = defineEmits(['closeModal'])

function createRepository() {
  if (meta.value.valid) {
    repository_store.createRepository(values)
    changeDialogOptions()
  } else {
    notify({
      type: 'warn',
      text: i18n.t('notifications.invalidform')
    })
  }
}

function changeDialogOptions() {
  emit('closeModal')
}

onMounted(() => {})
</script>

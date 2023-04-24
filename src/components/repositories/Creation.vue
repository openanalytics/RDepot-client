<template>
  <Form
    as="v-form"
    :validation-schema="validationSchema"
    v-slot="{ values, meta }"
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
      <card-actions :buttons="buttons" />
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
import {
  Form,
  useFormValues,
  useIsFormValid
} from 'vee-validate'
import ValidatedInputField from '../common/ValidatedInputField.vue'
import { notify } from '@kyvg/vue3-notification'
import CardActions from '../common/CardActions.vue'
import { i18n } from '@/plugins/i18n'

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

function createRepository() {
  const { value: valid } = useIsFormValid()
  const { value } = useFormValues()
  if (valid) {
    repository_store.createRepository(value)
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

<style>
.v-input__details {
  display: flex;
}
</style>

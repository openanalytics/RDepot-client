<template>
  <Form
    as="v-form"
    ref="form"
    :validation-schema="validationSchema"
    lazy-validation
  >
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          name="user.login"
          as="v-text-field"
          id="edit-package-maintainer-user"
          :value="localMaintainer.user?.login"
          :label="$t('maintainers.editform.user')"
          :disabled="blockedField == 'user'"
        />
        <validated-input-field
          name="repository.id"
          as="v-select"
          id="edit-package-maintainer-repository"
          :modelValue="localMaintainer.repository"
          @update:modelValue="newValue => localMaintainer.repository!.id = newValue"
          :items="repositories"
          item-title="name"
          item-value="id"
          :label="$t('maintainers.editform.repository')"
          :disabled="blockedField == 'repository'"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row justify="space-between" class="mt-1">
          <v-btn
            id="cancel-button"
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
              id="set-filtration"
              color="blue darken-1"
              class="mx-1"
              @click="setMaintainer()"
            >
              <small>
                {{ $t('common.save') }}
              </small>
            </v-btn>
          </v-row>
        </v-row>
      </v-card-actions>
    </v-card>
  </Form>
</template>

<script setup lang="ts">
import {
  EntityModelRepositoryMaintainerDto,
  RepositoryMaintainerDto
} from '@/openapi'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { ref, computed, onMounted } from 'vue'
import { Form } from 'vee-validate'
import ValidatedInputField from '../common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import {
  nonEmptyString,
  repositoryMaintainerSchema
} from '@/models/Schamas'

const validationSchema = toTypedSchema(
  repositoryMaintainerSchema
)
// const validationSchema = toTypedSchema(
//   z.object({
//     login: nonEmptyString,
//     id: z.number()
//   })
// )

const props = defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const maintainers_store = useRepositoryMaintainersStore()

const repositories = computed(() => {
  return maintainers_store.repositories
})

let maintainer: EntityModelRepositoryMaintainerDto =
  JSON.parse(
    JSON.stringify(maintainers_store.chosenMaintainer)
  )

const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

function setMaintainer() {
  maintainers_store.saveMaintainer(localMaintainer.value)
  changeDialogOptions()
}

onMounted(() => maintainers_store.fetchRepositories())

function changeDialogOptions() {
  emit('closeModal')
}
</script>

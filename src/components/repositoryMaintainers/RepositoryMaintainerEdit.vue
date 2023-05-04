<template>
  <form as="v-form" ref="form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          name="userlogin"
          as="v-text-field"
          id="edit-package-maintainer-user"
          :value="localMaintainer.user?.login"
          :label="$t('maintainers.editform.user')"
          :disabled="blockedField == 'user'"
        />
        <validated-input-field
          name="repositoryId"
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
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { ref, computed, onMounted } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { repositoryMaintainerSchema } from '@/models/Schemas'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { z } from 'zod'

const props = defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const buttons = [
  {
    id: 'cancel-button',
    text: i18n.t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-filtration',
    text: i18n.t('common.save'),
    handler: setMaintainer
  }
]

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

const { meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      userlogin:
        repositoryMaintainerSchema.shape.user.shape.login,
      repositoryId:
        repositoryMaintainerSchema.shape.repository.shape.id
    })
  ),
  initialValues: {
    userlogin: maintainer.user?.login,
    repositoryId: maintainer.repository?.id
  }
})

function setMaintainer() {
  if (meta.value.valid) {
    maintainers_store.saveMaintainer(localMaintainer.value)
    changeDialogOptions()
  } else {
    notify({
      type: 'warn',
      text: i18n.t('notifications.invalidform')
    })
  }
}

onMounted(maintainers_store.fetchRepositories)

function changeDialogOptions() {
  emit('closeModal')
}
</script>
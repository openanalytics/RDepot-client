<template>
  <form as="v-form" ref="form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('user.edit.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          name="role"
          as="v-select"
          id="edit-user-role"
          v-model="localRole"
          :items="roles"
          item-title="description"
          :label="$t('user.editform.role')"
          return-object
        />
      </v-card-text>
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { computed, ref } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { notify } from '@kyvg/vue3-notification'
import { i18n } from '@/plugins/i18n'
import { useUserStore } from '@/store/users'
import { UserRoleSchema } from '@/models/Schemas'
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
    id: 'set-role',
    text: i18n.t('common.save'),
    handler: setRole
  }
]

const user_store = useUserStore()

const roles = computed(() => user_store.roles)
const localRole = ref(
  user_store.roleIdToRole(user_store.chosenUser.roleId || 1)
)

const emit = defineEmits(['closeModal'])

const { meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      role: UserRoleSchema
    })
  ),
  initialValues: {
    role: localRole.value
  }
})

function setRole() {
  if (meta.value.valid) {
    const newUser = JSON.parse(
      JSON.stringify(user_store.chosenUser)
    )
    newUser.roleId = localRole.value.value || 0
    user_store.saveUser(newUser)
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
</script>

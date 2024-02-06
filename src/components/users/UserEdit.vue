<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <form as="v-form" ref="form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('users.edit.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          name="role"
          as="v-select"
          id="edit-user-role"
          v-model="localRole"
          :items="userStore.roles"
          item-title="description"
          :label="$t('users.edit.role')"
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
import { ref } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useUserStore } from '@/store/users'
import { UserRoleSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    text: t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-role',
    text: t('common.save'),
    handler: setRole
  }
]

const userStore = useUserStore()

const localRole = ref(
  userStore.roleIdToRole(userStore.chosenUser.roleId || 1)
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

const { deepCopy } = useUtilities()

const toasts = useToast()

async function setRole() {
  if (meta.value.valid) {
    const newUser = deepCopy(userStore.chosenUser)

    newUser.roleId = (localRole.value.value || 0) + 1
    await userStore.saveUser(newUser)
    await userStore.fetchUsers()
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

function changeDialogOptions() {
  emit('closeModal')
}
</script>

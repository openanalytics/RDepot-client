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
  <Form ref="form" as="v-form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('users.edit.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          id="edit-user-role"
          name="role"
          as="v-select"
          :items="roles"
          :label="$t('users.edit.role')"
          max-width="unset"
        />
      </v-card-text>
      <v-divider></v-divider>
      <card-actions
        :buttons="buttons"
        @clicked="handleCardActions"
      />
    </v-card>
  </Form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { ref } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useUserStore } from '@/store/users'
import { UserRoleSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { stringToRole } from '@/enum/UserRoles'

const { t } = useI18n()

defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const { roles } = useEnumFiltration()

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel')
  },
  {
    id: 'set-role',
    text: t('common.save')
  }
]

function handleCardActions(buttonId: string) {
  switch (buttonId) {
    case 'cancel-button': {
      emit('closeModal')
      break
    }
    case 'set-role': {
      setRole()
      break
    }
    default: {
      break
    }
  }
}

const userStore = useUserStore()

const localRole = ref(
  userStore.roleIdToRole(userStore.chosenUser.roleId || 1)
    .name
)

const emit = defineEmits(['closeModal'])

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      role: UserRoleSchema.shape.name
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
    newUser.roleId = stringToRole(values.role || 'user') + 1
    await userStore.saveUser(newUser)
    await userStore.fetchUsers()
    emit('closeModal')
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}
</script>

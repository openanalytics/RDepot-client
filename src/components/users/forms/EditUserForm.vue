<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <form id="editUserForm" ref="form" as="v-form">
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{
          i18n.t('actions.general.editResource', {
            resource_type: i18n.t('resources.user')
          })
        }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          id="edit-user-role"
          name="role"
          as="v-select"
          :items="roles"
          :label="i18n.t('fields.users.role')"
          max-width="unset"
        />

        <v-alert
          v-if="requiresLoggingOut"
          id="edit-user-alert"
          variant="tonal"
          color="warning"
        >
          Your role has been changed. You will be logged out
          and need to login again.
        </v-alert>
      </v-card-text>
      <CardActions
        :valid="meta.valid"
        :touched="meta.dirty"
        @submit="setRole"
      />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useUtilities } from '@/composable/utilities'
import { stringToRole } from '@/enum/UserRoles'
import { useCommonStore } from '@/store/options/common'
import { useUserStore } from '@/store/options/users'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useUserValidationSchema } from '@/composable/user/userSchema'
import { i18n } from '@/plugins/i18n'
import { useAuthorizationStore } from '@/store/options/authorization.ts'
import { computed } from 'vue'

const commonStore = useCommonStore()

const { deepCopy } = useUtilities()
const { roles } = useEnumFiltration()

const userStore = useUserStore()
const authStore = useAuthorizationStore()
const { userRoleSchema } = useUserValidationSchema()

const { meta, values } = useForm({
  validationSchema: toTypedSchema(userRoleSchema),
  initialValues: {
    role: userStore.chosenUser.role
  }
})

const requiresLoggingOut = computed(
  () =>
    userStore.chosenUser.id == authStore.me.id &&
    values.role != authStore.me.role
)

async function setRole() {
  const newUser = deepCopy(userStore.chosenUser)
  newUser.roleId = stringToRole(values.role || 'user') + 1

  const response = await userStore.save(
    newUser,
    !requiresLoggingOut.value
  )

  if (response[3] === 'SUCCESS') {
    if (requiresLoggingOut.value) {
      await authStore.logout()
    } else {
      commonStore.closeOverlay()
    }
  }
}
</script>

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
  <form
    id="editUserForm"
    ref="form"
    as="v-form"
    lazy-validation
  >
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
      <CardActions @submit="setRole" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useToast } from '@/composable/toasts'
import { useUtilities } from '@/composable/utilities'
import { stringToRole } from '@/enum/UserRoles'
import { UserRoleSchema } from '@/models/Schemas'
import { useCommonStore } from '@/store/options/common'
import { useUserStore } from '@/store/options/users'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { z } from 'zod'

const { t } = useI18n()
const commonStore = useCommonStore()

const { deepCopy } = useUtilities()
const { roles } = useEnumFiltration()

const userStore = useUserStore()

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      role: UserRoleSchema.shape.name
    })
  ),
  initialValues: {
    role: userStore.chosenUser.role
  }
})

const toasts = useToast()

async function setRole() {
  if (meta.value.valid) {
    const newUser = deepCopy(userStore.chosenUser)
    newUser.roleId = stringToRole(values.role || 'user') + 1
    await userStore.save(newUser)
    await userStore.getPage()
    commonStore.closeOverlay()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}
</script>

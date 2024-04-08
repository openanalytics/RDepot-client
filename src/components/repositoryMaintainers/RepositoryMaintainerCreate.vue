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
        {{ $t('maintainers.createform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <validated-input-field
          name="userId"
          as="v-select"
          :items="users"
          id="edit-repository-maintainer-user"
          :label="$t('maintainers.editform.user')"
        />
        <validated-input-field
          name="repository"
          as="v-select"
          id="edit-repository-maintainer-repository"
          :items="repositories"
          :label="$t('maintainers.editform.repository')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :template="true"
        >
          <template #item="{ item, props }">
            <v-list-item v-bind="props">
              <template v-slot:append>
                <v-chip
                  text-color="white"
                  class="text-body-1"
                  size="x-small"
                  >{{ item.raw.props.technology }}</v-chip
                >
              </template>
            </v-list-item>
          </template>
        </validated-input-field>
      </v-card-text>
      <v-card-text>
        <v-alert
          style="font-size: 0.75rem"
          :text="t('maintainers.createform.disclaimer')"
          variant="tonal"
          border="start"
          density="compact"
          color="oablue"
        ></v-alert>
      </v-card-text>
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { computed, onMounted } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { repositoryMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/users'
import {
  stringToRole,
  isAtLeastRepositoryMaintainer
} from '@/enum/UserRoles'
import { EntityModelRepositoryDto } from '@/openapi'

const { t } = useI18n()

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-filtration',
    text: t('common.save'),
    handler: setMaintainer
  }
]

const maintainersStore = useRepositoryMaintainersStore()
const userStore = useUserStore()

const users = computed(() => {
  return userStore.userList
    .filter((user) =>
      user.role
        ? isAtLeastRepositoryMaintainer(
            stringToRole(user.role)
          )
        : false
    )
    .map((user) => {
      return { title: user.name, value: user.id }
    })
})

const repositories = computed(function () {
  return maintainersStore.repositories.map((repo) => {
    return {
      title: repo.name,
      value: repo.id,
      props: { technology: repo.technology }
    }
  })
})

const emit = defineEmits(['closeModal'])

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      userId:
        repositoryMaintainerSchema.shape.user.shape.id,
      repository: z.object({
        title:
          repositoryMaintainerSchema.shape.repository.shape
            .name,
        value:
          repositoryMaintainerSchema.shape.repository.shape
            .id,
        props: z.object({
          technology:
            repositoryMaintainerSchema.shape.repository
              .shape.technology
        })
      })
    })
  ),
  initialValues: {
    userId: undefined,
    repository: undefined
  }
})

const toasts = useToast()

function setMaintainer() {
  if (meta.value.valid) {
    const maintainer = {
      user: { id: values.userId },
      repository: { id: values.repository?.value }
    }
    maintainersStore
      .createMaintainer(maintainer)
      .then((res) => {
        changeDialogOptions()
      })
      .catch((err) => {
        if (
          err.response.data.data[0] ===
          "User's permissions are not sufficient to create a maintainer."
        ) {
          toasts.warning(
            t('notifications.insufficientPermissions')
          )
        } else {
          toasts.warning(t(err.response.data.data[0]))
        }
      })
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

onMounted(() => {
  maintainersStore.fetchAllRepositories()
  userStore.fetchAllUsers()
})

function changeDialogOptions() {
  emit('closeModal')
}
</script>

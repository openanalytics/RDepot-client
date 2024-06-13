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
  <form ref="form" as="v-form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.createform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <validated-input-field
          id="edit-repository-maintainer-user"
          name="user"
          as="autocomplete"
          :label="$t('maintainers.editform.user')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :store-id="storeIdUser"
          :template="true"
          max-width="unset"
          @load-items="
            loadUsersObjects('repositoryMaintainer')
          "
          @filtrate="filtrateUsers"
        >
          <template #item="{ props }">
            <v-list-item
              v-intersect="
                loadUsersObjects('repositoryMaintainer')
              "
              v-bind="props"
            >
            </v-list-item>
          </template>
        </validated-input-field>
        <validated-input-field
          id="edit-repository-maintainer-repository"
          name="repository"
          as="autocomplete"
          :label="$t('maintainers.editform.repository')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :template="true"
          :store-id="storeId"
          max-width="unset"
          @load-items="loadRepositoriesObjects"
          @filtrate="filtrateRepositoriesObjects"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-intersect="loadRepositoriesObjects"
              v-bind="props"
            >
              <template #append>
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
      <CardActions @submit="setMaintainer" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { onBeforeMount } from 'vue'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { repositoryMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { useCommonStore } from '@/store/common'

const { t } = useI18n()
const commonStore = useCommonStore()

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetPagination
} = useRepositoriesFiltration()

const {
  storeIdUser,
  loadUsersObjects,
  filtrateUsers,
  resetPaginationUsers
} = useUsersFiltration()

const maintainersStore = useRepositoryMaintainersStore()

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      user: z.object({
        title:
          repositoryMaintainerSchema.shape.user.shape.name,
        value:
          repositoryMaintainerSchema.shape.user.shape.id
      }),
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
    user: undefined,
    repository: undefined
  }
})

const toasts = useToast()

function setMaintainer() {
  if (meta.value.valid) {
    const maintainer = {
      user: { id: values.user?.value },
      repository: { id: values.repository?.value }
    }
    maintainersStore
      .createMaintainer(maintainer)
      .then(() => {
        commonStore.closeOverlay()
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

onBeforeMount(() => {
  resetPagination()
  resetPaginationUsers()
})
</script>

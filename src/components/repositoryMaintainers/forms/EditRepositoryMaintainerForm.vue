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
  <form ref="form" as="v-form">
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{
          i18n.t('actions.general.editResource', {
            resource_type: i18n.t(
              'resources.repositoryMaintainer'
            )
          })
        }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          id="edit-repository-maintainer-user"
          name="user"
          return-object
          as="autocomplete"
          :label="i18n.t('resources.user')"
          disabled
          max-width="unset"
        />
        <validated-input-field
          id="edit-repository-maintainer-repository"
          name="repository"
          as="autocomplete"
          :disabled="!values.user"
          :hint="
            !values.user
              ? i18n.t(
                  'forms.repositoryMaintainers.disabledRepositoryMessage'
                )
              : ''
          "
          :label="i18n.t('resources.repository')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :template="true"
          :store-id="storeId"
          max-width="unset"
          @load-items="
            loadRepositoriesObjects(maintainer.user?.name)
          "
          @filtrate="filtrateRepositoriesObjects"
        >
          <template #item="{ item, props }">
            <v-list-item v-bind="props">
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
          :text="
            t(
              'forms.repositoryMaintainers.hints.disclaimer'
            )
          "
          variant="tonal"
          border="start"
          density="compact"
          color="primary"
        ></v-alert>
      </v-card-text>
      <v-divider></v-divider>
      <CardActions
        :valid="meta.valid"
        :touched="meta.touched || meta.dirty"
        @submit="setMaintainer"
      />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { useRepositoryMaintainersStore } from '@/store/options/repositoryMaintainers'
import { onBeforeMount } from 'vue'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { Technologies } from '@/enum/Technologies'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useCommonStore } from '@/store/options/common'
import { i18n } from '@/plugins/i18n'
import { useRepositoryMaintainerValidationSchema } from '@/composable/repositoryMaintainers/repositoryMaintainerSchema'

const { t } = useI18n()
const commonStore = useCommonStore()

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetRepositoriesPagination
} = useRepositoriesFiltration()

const maintainersStore = useRepositoryMaintainersStore()

const { deepCopy } = useUtilities()
let maintainer: EntityModelRepositoryMaintainerDto =
  deepCopy(maintainersStore.chosenMaintainer)

const { repositoryMaintainerSchema } =
  useRepositoryMaintainerValidationSchema()

const { meta, values } = useForm({
  validationSchema: toTypedSchema(
    repositoryMaintainerSchema
  ),
  initialValues: {
    user: {
      title: maintainer.user?.name,
      value: maintainer.user?.id
    },
    repository: {
      title: maintainer.repository?.name,
      value: maintainer.repository?.id,
      props: {
        technology: maintainer.repository
          ?.technology as Technologies
      }
    }
  }
})

const toasts = useToast()

function setMaintainer() {
  if (meta.value.valid) {
    if (maintainer.repository) {
      maintainer.repository.id = values.repository?.value
    }
    maintainersStore.patch(maintainer)
    commonStore.closeOverlay()
  } else {
    toasts.warning(i18n.t('messages.errors.invalidForm'))
  }
}

onBeforeMount(() => {
  resetRepositoriesPagination()
})
</script>

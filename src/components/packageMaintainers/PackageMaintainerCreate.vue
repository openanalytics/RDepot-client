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
  <form as="v-form" ref="form">
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.createform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          as="autocomplete"
          name="user"
          id="create-package-maintainer-user"
          :label="$t('maintainers.editform.user')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          @loadItems="loadUsersObjects('packageMaintainer')"
          @filtrate="filtrateUsers"
          :storeId="storeIdUser"
          :template="true"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              v-intersect="
                loadUsersObjects('packageMaintainer')
              "
            >
            </v-list-item>
          </template>
        </validated-input-field>
        <validated-input-field
          as="autocomplete"
          name="repository"
          @update:modelValue="resetPackageName"
          id="create-package-maintainer-repository"
          :label="$t('maintainers.editform.repository')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          @loadItems="loadRepositoriesObjects"
          @filtrate="filtrateRepositories"
          :storeId="storeId"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              v-intersect="loadRepositoriesObjects"
            >
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
        <validated-input-field
          as="v-combobox"
          name="packageName"
          id="create-package-maintainer-package"
          @update:modelValue="updatePackageName"
          :items="packages"
          :label="$t('maintainers.editform.package')"
        />
      </v-card-text>
      <v-card-text>
        <v-alert
          style="font-size: 0.75rem"
          :text="
            t('maintainers.createform.disclaimerPackages')
          "
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
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { onBeforeMount, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'

const maintainersStore = usePackageMaintainersStore()
const toasts = useToast()
const { t } = useI18n()
const buttons = [
  {
    id: 'cancelbutton',
    text: t('common.cancel'),
    handler: () => {
      changeDialogOptions()
    }
  },
  {
    id: 'createbutton',
    text: t('common.save'),
    handler: () => {
      createMaintainer()
    }
  }
]

const {
  storeId,
  filtrateRepositories,
  loadRepositoriesObjects,
  resetPagination
} = useRepositoriesFiltration()

const {
  storeIdUser,
  loadUsersObjects,
  filtrateUsers,
  resetPaginationUsers
} = useUsersFiltration()

const packages = computed(() => {
  return maintainersStore.packages
    .filter((packageBag) => {
      if (values.repository) {
        const repoId = values.repository.value as Number
        return packageBag.repository?.id === repoId
      } else {
        return false
      }
    })
    .map((packageBag) => {
      return {
        title: packageBag.name,
        value: packageBag.name,
        props: {
          subtitle:
            packageBag.user !== null
              ? packageBag.user?.name
              : ''
        }
      }
    })
    .filter((obj, pos, arr) => {
      return (
        arr.map((pack) => pack.title).indexOf(obj.title) ===
        pos
      )
    })
})

const emit = defineEmits(['closeModal'])

const { meta, validateField, setFieldValue, values } =
  useForm({
    validationSchema: toTypedSchema(
      z.object({
        user: z.object({
          title:
            packageMaintainerSchema.shape.user.shape.name,
          value: packageMaintainerSchema.shape.user.shape.id
        }),
        repository: z.object({
          title:
            packageMaintainerSchema.shape.repository.shape
              .name,
          value:
            packageMaintainerSchema.shape.repository.shape
              .id,
          props: z.object({
            technology:
              packageMaintainerSchema.shape.repository.shape
                .technology
          })
        }),
        packageName:
          packageMaintainerSchema.shape.packageName
      })
    ),
    initialValues: {
      user: undefined,
      repository: undefined,
      packageName: undefined
    }
  })

async function createMaintainer() {
  if (meta.value.valid) {
    const maintainer = {
      user: { id: values.user?.value },
      packageName: values.packageName,
      repository: { id: values.repository?.value }
    }
    await maintainersStore.createMaintainer(maintainer)
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

function resetPackageName() {
  setFieldValue('packageName', '')
  validateField('packageName')
}

function updatePackageName(newValue: any) {
  setFieldValue(
    'packageName',
    typeof newValue === 'string' ? newValue : newValue.value
  )
}

function changeDialogOptions() {
  emit('closeModal')
}

onBeforeMount(async () => {
  resetPagination()
  resetPaginationUsers()
  maintainersStore.fetchPackages()
})
</script>

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
    <v-card
      class="pa-5"
      width="400"
      :title="
        i18n.t('actions.general.createResource', {
          resource_type: i18n.t(
            'resources.packageMaintainer'
          )
        })
      "
    >
      <v-divider />
      <v-card-text style="height: 300px">
        <validated-input-field
          id="create-package-maintainer-user"
          as="autocomplete"
          name="user"
          :label="i18n.t('resources.user')"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :store-id="storeIdUser"
          :template="true"
          max-width="unset"
          @update:model-value="resetPackageName"
          @load-items="
            loadUsersObjects(Role.enum.packageMaintainer)
          "
          @filtrate="filtrateUsers"
        >
          <template #item="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
          </template>
        </validated-input-field>
        <validated-input-field
          id="create-package-maintainer-repository"
          as="autocomplete"
          name="repository"
          :label="i18n.t('resources.repository')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :store-id="storeId"
          max-width="unset"
          @update:model-value="resetPackageName"
          @load-items="loadRepositoriesObjects"
          @filtrate="filtrateRepositoriesObjects"
        >
          <template #item="{ item, props }">
            <v-list-item v-bind="props">
              <template #append>
                <v-chip
                  text-color="white"
                  class="text-body-1"
                  size="x-small"
                  >{{ item.raw.props.technology }}
                </v-chip>
              </template>
            </v-list-item>
          </template>
        </validated-input-field>
        <validated-input-field
          id="create-package-maintainer-package"
          :disabled="isPackageFieldDisabled"
          :hint="
            isPackageFieldDisabled
              ? t(
                  'forms.packageMaintainers.hints.disabledPackageMessage'
                )
              : undefined
          "
          as="combobox"
          name="package"
          :label="i18n.t('resources.package')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :store-id="storeIdPackage"
          max-width="unset"
          @load-items="loadPackages"
          @filtrate="filtratePackagesObjects"
        >
          <template #item="{ props }">
            <v-list-item v-bind="props"> </v-list-item>
          </template>
        </validated-input-field>
      </v-card-text>
      <v-card-text>
        <v-alert
          style="font-size: 0.75rem"
          :text="
            t(
              'forms.packageMaintainers.hints.disclaimerPackages'
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
        @submit="createMaintainer"
        @cancel="resetFiltration"
      />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { usePackageMaintainersStore } from '@/store/options/packageMaintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/options/packages'
import { useCommonStore } from '@/store/options/common'
import { onBeforeUnmount } from 'vue'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'
import { Role } from '@/enum/UserRoles'
import { usePackageMaintainerValidationSchema } from '@/composable/packageMaintainers/packageMaintainerSchema'

const maintainersStore = usePackageMaintainersStore()
const packagesStore = usePackagesStore()
const commonStore = useCommonStore()
const { t } = useI18n()

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetRepositoriesPagination
} = useRepositoriesFiltration()

const {
  storeIdPackage,
  loadPackagesObjects,
  filtratePackagesObjects,
  resetPaginationPackages
} = usePackagesFiltration()

const {
  storeIdUser,
  loadUsersObjects,
  filtrateUsers,
  resetPaginationUsers
} = useUsersFiltration()

const isPackageFieldDisabled = computed<boolean>(
  () => !(values.user && values.repository)
)

function loadPackages() {
  if (values.user?.title && values.repository?.title) {
    loadPackagesObjects(
      values.user.title,
      values.repository.title
    )
  }
}

const {
  packageMaintainerSchema,
  transformedPackageMaintainerSchema
} = usePackageMaintainerValidationSchema()

const { meta, values, resetField } = useForm({
  validationSchema: toTypedSchema(packageMaintainerSchema),
  initialValues: {
    user: undefined,
    repository: undefined,
    package: undefined
  }
})

async function createMaintainer() {
  const maintainer =
    await transformedPackageMaintainerSchema.parseAsync(
      values
    )
  await maintainersStore.create(maintainer)
  filtratePackagesObjects(undefined)
  filtrateRepositoriesObjects(undefined)
  filtrateUsers(undefined)
  packagesStore.clearFiltration()
  commonStore.overlay = false
}

function resetFiltration() {
  packagesStore.clearFiltration()
}

function resetPackageName() {
  packagesStore.filtration.repository = values.repository
    ?.title
    ? [values.repository.title]
    : undefined
  resetPaginationPackages()
  resetField('package')
  filtratePackagesObjects(undefined)
  loadPackages()
}

function clearFiltration() {
  filtrateUsers(undefined)
  filtratePackagesObjects(undefined)
  filtrateRepositoriesObjects(undefined)
}

onBeforeUnmount(() => {
  clearFiltration()
})

onBeforeMount(() => {
  resetRepositoriesPagination()
  resetPaginationUsers()
  resetPaginationPackages()
  clearFiltration()
})
</script>

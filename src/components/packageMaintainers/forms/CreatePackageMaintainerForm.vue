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
  <form ref="form" as="v-form">
    <v-card
      class="pa-5"
      width="400"
      :title="$t('maintainers.createform.title')"
    >
      <v-divider />
      <v-card-text style="height: 300px">
        <validated-input-field
          id="create-package-maintainer-user"
          as="autocomplete"
          name="user"
          :label="$t('maintainers.editform.user')"
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
          @filtrate="filtrateUsers(undefined)"
        >
          <template #item="{ props }">
            <v-list-item
              v-intersect="
                loadUsersObjects(
                  Role.enum.packageMaintainer
                )
              "
              v-bind="props"
            >
            </v-list-item>
          </template>
        </validated-input-field>
        <validated-input-field
          id="create-package-maintainer-repository"
          as="autocomplete"
          name="repository"
          :label="$t('maintainers.editform.repository')"
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
          @filtrate="filtrateRepositoriesObjects(undefined)"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-intersect="loadRepositoriesObjects()"
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
        <validated-input-field
          id="create-package-maintainer-package"
          :disabled="isPackageFieldDisabled"
          :hint="
            isPackageFieldDisabled
              ? t(
                  'maintainers.createform.disabledPackageMessage'
                )
              : undefined
          "
          as="combobox"
          name="package"
          :label="$t('maintainers.editform.package')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          :store-id="storeIdPackage"
          max-width="unset"
          @update:model-value="updatePackageName"
          @load-items="loadPackages"
          @filtrate="filtratePackagesObjects(undefined)"
        >
          <template #item="{ props }">
            <v-list-item
              v-intersect="loadPackages"
              v-bind="props"
            >
            </v-list-item>
          </template>
        </validated-input-field>
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
      <CardActions
        :valid="meta.valid"
        @submit="createMaintainer"
      />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { onBeforeMount } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { useUsersFiltration } from '@/composable/filtration/usersFiltration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/packages'
import { useCommonStore } from '@/store/common'
import { onBeforeUnmount } from 'vue'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'
import { Role } from '@/enum/UserRoles'

const maintainersStore = usePackageMaintainersStore()
const packagesStore = usePackagesStore()
const commonStore = useCommonStore()
const toasts = useToast()
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

const { meta, setFieldValue, values, resetField } = useForm(
  {
    validationSchema: toTypedSchema(
      z.object({
        user: z.object(
          {
            title:
              packageMaintainerSchema.shape.user.shape.name,
            value:
              packageMaintainerSchema.shape.user.shape.id
          },
          {
            required_error: i18n.t(
              'common.errors.required'
            ),
            invalid_type_error: i18n.t(
              'common.errors.required'
            )
          }
        ),
        repository: z.object(
          {
            title:
              packageMaintainerSchema.shape.repository.shape
                .name,
            value:
              packageMaintainerSchema.shape.repository.shape
                .id,
            props: z.object({
              technology:
                packageMaintainerSchema.shape.repository
                  .shape.technology
            })
          },
          {
            required_error: i18n.t(
              'common.errors.required'
            ),
            invalid_type_error: i18n.t(
              'common.errors.required'
            )
          }
        ),
        package: z.object(
          {
            title:
              packageMaintainerSchema.shape.packageName,
            value:
              packageMaintainerSchema.shape.packageName,
            props: z.object({
              subtitle:
                packageMaintainerSchema.shape.user.shape
                  .name,
              repoId:
                packageMaintainerSchema.shape.repository
                  .shape.id
            })
          },
          {
            required_error: i18n.t(
              'common.errors.required'
            ),
            invalid_type_error: i18n.t(
              'common.errors.required'
            )
          }
        )
      })
    ),
    initialValues: {
      user: undefined,
      repository: undefined,
      package: undefined
    }
  }
)

async function createMaintainer() {
  if (meta.value.valid) {
    const maintainer = {
      user: { id: values.user?.value },
      packageName: values.package?.value,
      repository: { id: values.repository?.value }
    }
    await maintainersStore.createMaintainer(maintainer)
    filtratePackagesObjects(undefined)
    filtrateRepositoriesObjects(undefined)
    filtrateUsers(undefined)
    commonStore.overlay = false
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
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

function getFieldValue(newValue: any) {
  if (typeof newValue === 'string') {
    return {
      title: newValue,
      value: newValue,
      props: { subtitle: 'a', repoId: 1 }
    }
  } else return newValue
}

function updatePackageName(newValue: any) {
  setFieldValue('package', getFieldValue(newValue))
}

function clearFiltration() {
  filtrateUsers(undefined)
  filtratePackagesObjects(undefined)
  filtrateRepositoriesObjects(undefined)
}

onBeforeUnmount(() => {
  clearFiltration()
})

onBeforeMount(async () => {
  resetRepositoriesPagination()
  resetPaginationUsers()
  resetPaginationPackages()
  clearFiltration()
})
</script>

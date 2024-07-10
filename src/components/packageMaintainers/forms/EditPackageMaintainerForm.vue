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
      :title="$t('maintainers.editform.title')"
    >
      <v-divider />
      <v-card-text style="height: 300px">
        <validated-input-field
          id="edit-package-maintainer-user"
          as="v-text-field"
          name="username"
          :label="$t('maintainers.editform.user')"
          disabled
          max-width="unset"
        />
        <validated-input-field
          id="edit-package-maintainer-repository"
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
          @update:model-value="updateForm"
          @load-items="loadRepositoriesObjects"
          @filtrate="filtrateRepositories"
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
        <validated-input-field
          id="edit-package-maintainer-package"
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
          @update:model-value="setPackageName"
          @load-items="
            isFieldDirty('package') ? loadPackages() : null
          "
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
        :valid="isFormValid"
        @submit="editMaintainer"
      />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/overlay/CardActions.vue'
import { usePackageMaintainersStore } from '@/store/packageMaintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/fields/ValidatedInputField.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { Technologies } from '@/enum/Technologies'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/packages'
import { useCommonStore } from '@/store/common'
import { i18n } from '@/plugins/i18n'

const maintainersStore = usePackageMaintainersStore()
const packagesStore = usePackagesStore()
const commonsStore = useCommonStore()
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

let maintainer = maintainersStore.chosenMaintainer
const localMaintainer = ref(maintainer)

const isPackageFieldDisabled = computed(
  () => !(localMaintainer.value.user && values.repository)
)

const isFormValid = computed(
  () =>
    meta.value.valid &&
    (isFieldDirty('repository') || isFieldDirty('package'))
)

function filtrateRepositories(value: string | undefined) {
  if (isFieldDirty('repository')) {
    filtrateRepositoriesObjects(value)
  } else {
    filtrateRepositoriesObjects(undefined)
  }
}

const { meta, setFieldValue, isFieldDirty, values } =
  useForm({
    validationSchema: toTypedSchema(
      z.object({
        username:
          packageMaintainerSchema.shape.user.shape.name,
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
        package: z.object({
          title: packageMaintainerSchema.shape.packageName,
          value: packageMaintainerSchema.shape.packageName,
          props: z.object({
            subtitle:
              packageMaintainerSchema.shape.user.shape.name,
            repoId:
              packageMaintainerSchema.shape.repository.shape
                .id
          })
        })
      })
    ),
    initialValues: {
      username: maintainer?.user?.name,
      repository: {
        title: maintainer.repository?.name,
        value: maintainer.repository?.id,
        props: {
          technology: maintainer.repository
            ?.technology as Technologies
        }
      },
      package: {
        title: maintainer?.packageName,
        value: maintainer.packageName,
        props: {
          subtitle: maintainer.user?.name,
          repoId: maintainer.repository?.id
        }
      }
    }
  })
const { deepCopy } = useUtilities()

function updateMaintainer() {
  localMaintainer.value = deepCopy(
    maintainersStore.chosenMaintainer
  )
}

async function editMaintainer() {
  if (meta.value.valid) {
    await maintainersStore.updateMaintainer(
      localMaintainer.value
    )
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

function updateForm(newValue: any) {
  localMaintainer.value.repository!.id =
    newValue !== null ? newValue.value : undefined
  localMaintainer.value.packageName = ''
  packagesStore.filtration.repository = values.repository
    ?.title
    ? [values.repository.title]
    : undefined
  resetPaginationPackages()
  setFieldValue('package', undefined)
  filtratePackagesObjects(undefined)
  loadPackages()
}

function loadPackages() {
  if (
    localMaintainer.value.user?.name &&
    values.repository?.title
  ) {
    loadPackagesObjects(
      localMaintainer.value.user.name,
      values.repository.title
    )
  }
}

function setPackageName(newValue: any) {
  localMaintainer.value.packageName =
    newValue.value !== null
      ? typeof newValue === 'string'
        ? newValue
        : newValue.value
      : ''
  setFieldValue('package', getFieldValue(newValue))
}

function getFieldValue(newValue: any) {
  if (typeof newValue === 'string') {
    return {
      title: newValue,
      value: newValue,
      props: { subtitle: 'a' }
    }
  } else return newValue
}

function changeDialogOptions() {
  updateMaintainer()
  commonsStore.overlay = false
}

onBeforeMount(() => {
  resetRepositoriesPagination()
  updateMaintainer()
  resetPaginationPackages()
  packagesStore.filtration.repository = localMaintainer
    .value.repository?.name
    ? [localMaintainer.value.repository?.name]
    : undefined
  loadPackages()
})
</script>

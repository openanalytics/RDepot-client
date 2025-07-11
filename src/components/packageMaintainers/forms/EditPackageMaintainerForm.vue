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
        i18n.t('actions.general.editResource', {
          resource_type: i18n.t(
            'resources.packageMaintainer'
          )
        })
      "
    >
      <v-divider />
      <v-card-text style="height: 300px">
        <validated-input-field
          id="edit-package-maintainer-user"
          as="autocomplete"
          name="user"
          return-object
          :label="i18n.t('resources.user')"
          disabled
          max-width="unset"
        />
        <validated-input-field
          id="edit-package-maintainer-repository"
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
                  >{{ item.raw.props.technology }}
                </v-chip>
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
        :touched="meta.dirty"
        @submit="editMaintainer"
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
import { onBeforeMount, computed } from 'vue'
import { useUtilities } from '@/composable/utilities'
import { useI18n } from 'vue-i18n'
import { Technologies } from '@/enum/Technologies'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/options/packages'
import { useCommonStore } from '@/store/options/common'
import { i18n } from '@/plugins/i18n'
import { usePackageMaintainerValidationSchema } from '@/composable/packageMaintainers/packageMaintainerSchema'

const maintainersStore = usePackageMaintainersStore()
const packagesStore = usePackagesStore()
const commonsStore = useCommonStore()
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

const { deepCopy } = useUtilities()
let maintainer = deepCopy(maintainersStore.chosenMaintainer)

const isPackageFieldDisabled = computed(
  () => !(maintainer.user && values.repository)
)

function filtrateRepositories(value: string | undefined) {
  if (isFieldDirty('repository')) {
    filtrateRepositoriesObjects(value)
  } else {
    filtrateRepositoriesObjects(undefined)
  }
}

const { packageMaintainerSchema } =
  usePackageMaintainerValidationSchema()

const { meta, setFieldValue, isFieldDirty, values } =
  useForm({
    validationSchema: toTypedSchema(
      packageMaintainerSchema
    ),
    initialValues: {
      user: {
        title: maintainer?.user.name,
        value: maintainer?.user?.id
      },
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

function updateMaintainer() {
  maintainer = deepCopy(maintainersStore.chosenMaintainer)
}

async function editMaintainer() {
  await maintainersStore.patch(maintainer)
  changeDialogOptions()
}

function updateForm(newValue: any) {
  maintainer.repository!.id =
    newValue !== null ? newValue.value : undefined
  maintainer.packageName = ''
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
  if (maintainer.user?.name && values.repository?.title) {
    loadPackagesObjects(
      maintainer.user.name,
      values.repository.title
    )
  }
}

function setPackageName(newValue: any) {
  maintainer.packageName =
    newValue.value !== null
      ? typeof newValue === 'string'
        ? newValue
        : newValue.value
      : ''
}

function changeDialogOptions() {
  updateMaintainer()
  packagesStore.clearFiltration()
  commonsStore.overlay = false
}

function resetFiltration() {
  packagesStore.clearFiltration()
}

onBeforeMount(() => {
  resetRepositoriesPagination()
  updateMaintainer()
  resetPaginationPackages()
  packagesStore.filtration.repository = maintainer
    .repository?.name
    ? [maintainer.repository?.name]
    : undefined
  loadPackages()
})
</script>

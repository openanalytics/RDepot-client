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
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          as="v-text-field"
          name="username"
          id="edit-package-maintainer-user"
          :label="$t('maintainers.editform.user')"
          disabled
          max-width="unset"
        />
        <validated-input-field
          as="autocomplete"
          name="repository"
          @update:modelValue="updateForm"
          id="edit-package-maintainer-repository"
          :label="$t('maintainers.editform.repository')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          @loadItems="loadRepositoriesObjects"
          @filtrate="filtrateRepositoriesObjects"
          :storeId="storeId"
          max-width="unset"
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
          as="combobox"
          name="package"
          id="create-package-maintainer-package"
          @update:modelValue="setPackageName"
          :label="$t('maintainers.editform.package')"
          :template="true"
          filled
          dense
          clearable
          persistent-hint
          return-object
          @loadItems="
            loadPackagesObjects(localMaintainer.user?.id)
          "
          @filtrate="filtratePackagesObjects"
          :storeId="storeIdPackage"
          max-width="unset"
        >
          <template #item="{ item, props }">
            <v-list-item
              v-bind="props"
              v-intersect="
                loadPackagesObjects(
                  localMaintainer.user?.id
                )
              "
            >
            </v-list-item>
          </template>
        </validated-input-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { ref, onBeforeMount } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { Technologies } from '@/enum/Technologies'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'
import { usePackagesFiltration } from '@/composable/filtration/packagesFiltration'
import { usePackagesStore } from '@/store/packages'

const maintainersStore = usePackageMaintainersStore()
const packagesStore = usePackagesStore()
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
    id: 'setfiltration',
    text: t('common.save'),
    handler: () => {
      editMaintainer()
    }
  }
]

const {
  storeId,
  filtrateRepositoriesObjects,
  loadRepositoriesObjects,
  resetPagination
} = useRepositoriesFiltration()

const {
  storeIdPackage,
  loadPackagesObjects,
  filtratePackagesObjects,
  resetPaginationPackages
} = usePackagesFiltration()

let maintainer = maintainersStore.chosenMaintainer
const localMaintainer = ref(maintainer)
const localRepoName = ref(maintainer.repository?.name)

const emit = defineEmits(['closeModal'])

const { meta, validateField, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username:
        packageMaintainerSchema.shape.user.shape.name,
      repository: z.object({
        title:
          packageMaintainerSchema.shape.repository.shape
            .name,
        value:
          packageMaintainerSchema.shape.repository.shape.id,
        props: z.object({
          technology:
            packageMaintainerSchema.shape.repository.shape
              .technology
        })
      }),
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
  localRepoName.value =
    newValue !== null ? newValue.title : undefined
  resetPaginationPackages()
  packagesStore.filtration.repository = localRepoName.value
    ? [localRepoName.value]
    : undefined
  setFieldValue('package', undefined)
  validateField('package')
  loadPackagesObjects(localMaintainer.value.user?.id)
}

function setPackageName(newValue: any) {
  localMaintainer.value.packageName =
    newValue.value !== null
      ? typeof newValue === 'string'
        ? newValue
        : newValue.value
      : ''
  setFieldValue(
    'package',
    typeof newValue === 'string'
      ? {
          title: newValue,
          value: newValue,
          props: { subtitle: 'a' }
        }
      : newValue
  )
  validateField('package')
}

function changeDialogOptions() {
  updateMaintainer()
  emit('closeModal')
}

onBeforeMount(() => {
  resetPagination()
  updateMaintainer()
  resetPaginationPackages()
  packagesStore.filtration.repository = localMaintainer
    .value.repository?.name
    ? [localMaintainer.value.repository?.name]
    : undefined
})
</script>

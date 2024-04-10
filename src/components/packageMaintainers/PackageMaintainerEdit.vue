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
          :modelValue="localMaintainer.packageName"
          @update:modelValue="setPackageName"
          id="edit-package-maintainer-package"
          :items="packages"
          :label="$t('maintainers.editform.package')"
        />
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
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { Technologies } from '@/enum/Technologies'
import { useRepositoriesFiltration } from '@/composable/filtration/repositoriesFiltration'

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

const packages = computed(() => {
  return maintainersStore.packages
    .filter((packageBag) => {
      return (
        packageBag.repository?.id ==
        localMaintainer.value.repository?.id
      )
    })
    .map((packageBag) => {
      return {
        title: packageBag.name,
        value: packageBag.name,
        props: {
          disabled: packageBag.user === null ? false : true,
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

let maintainer = maintainersStore.chosenMaintainer
const localMaintainer = ref(maintainer)

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
      packageName:
        packageMaintainerSchema.shape.packageName.refine(
          (val) => {
            if (packages.value) {
              return !packages.value.find(
                (pack) => pack.value === val
              )?.props.disabled
            } else {
              return false
            }
          },
          t(
            'package_maintainers.editform.packageHasMaintainer'
          )
        )
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
    packageName: maintainer?.packageName
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
  setFieldValue('packageName', '')
  validateField('packageName')
}

function setPackageName(newValue: string) {
  localMaintainer.value.packageName = newValue
  validateField('packageName')
}

function changeDialogOptions() {
  updateMaintainer()
  emit('closeModal')
}

onBeforeMount(() => {
  resetPagination()
  updateMaintainer()
  maintainersStore.fetchPackages()
})
</script>

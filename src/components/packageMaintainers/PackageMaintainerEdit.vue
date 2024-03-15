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
          as="v-select"
          name="repositoryId"
          :modelValue="localMaintainer.repository!.id"
          @update:modelValue="newValue => {
            localMaintainer.repository!.id = newValue
            validateField('packageName')
          }"
          :items="repositories"
          item-title="name"
          item-value="id"
          id="edit-package-maintainer-repository"
          :label="$t('maintainers.editform.repository')"
        />
        <validated-input-field
          as="v-select"
          name="packageName"
          v-model="localMaintainer.packageName"
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
import { ref, onMounted, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'

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
const repositories = computed(() => {
  return maintainersStore.repositories
})

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

const { meta, validateField } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      username:
        packageMaintainerSchema.shape.user.shape.name,
      repositoryId:
        packageMaintainerSchema.shape.repository.shape.id,
      packageName:
        packageMaintainerSchema.shape.packageName.refine(
          (val) => {
            if (packages.value) {
              return packages.value.includes(val)
            } else {
              return false
            }
          },
          t('package_maintainers.editform.packageNotFound')
        )
    })
  ),
  initialValues: {
    username: maintainer?.user?.name,
    repositoryId: maintainer?.repository?.id,
    packageName: maintainer?.packageName
  },
  initialTouched: {
    username: false,
    repositoryId: false,
    packageName: true
  }
})
const { deepCopy } = useUtilities()

function updateMaintainer() {
  localMaintainer.value = deepCopy(
    maintainersStore.chosenMaintainer
  )
}

async function editMaintainer() {
  await maintainersStore.updateMaintainer(
    localMaintainer.value
  )
  changeDialogOptions()
}

function changeDialogOptions() {
  updateMaintainer()
  emit('closeModal')
}

onMounted(() => {
  updateMaintainer()
  maintainersStore.fetchAllRepositories()
  maintainersStore.fetchPackages()
})
</script>

<style lang="scss">
.v-input--error:not(.v-input--disabled)
  .v-input__details
  .v-messages {
  color: rgb(var(--v-theme-warning));
}

.v-field--error:not(.v-field--disabled)
  .v-label.v-field-label {
  color: rgb(var(--v-theme-warning));
}

.v-field--error:not(.v-field--disabled)
  .v-field__append-inner
  > .v-icon {
  color: rgb(var(--v-theme-warning));
}
</style>

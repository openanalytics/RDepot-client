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
          as="v-select"
          name="userId"
          :items="users"
          id="create-package-maintainer-user"
          :label="$t('maintainers.editform.user')"
        />
        <validated-input-field
          as="v-select"
          name="repositoryId"
          @update:modelValue="
            (newValue) => {
              setFieldValue('packageName', '')
              validateField('packageName')
            }
          "
          :items="repositories"
          item-title="name"
          item-value="id"
          id="create-package-maintainer-repository"
          :label="$t('maintainers.editform.repository')"
        />
        <validated-input-field
          as="v-combobox"
          name="packageName"
          id="create-package-maintainer-package"
          @update:modelValue="
            (newValue) => {
              setFieldValue(
                'packageName',
                typeof newValue === 'string'
                  ? newValue
                  : newValue.value
              )
            }
          "
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
import { ref, onMounted, computed } from 'vue'
import { packageMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/users'
import {
  stringToRole,
  isAtLeastPackageMaintainer
} from '@/enum/UserRoles'

const maintainersStore = usePackageMaintainersStore()
const userStore = useUserStore()
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
const repositories = computed(() => {
  return maintainersStore.repositories
})

const users = computed(() => {
  return userStore.userList
    .filter((user) =>
      user.role
        ? isAtLeastPackageMaintainer(
            stringToRole(user.role)
          )
        : false
    )
    .map((user) => {
      return { title: user.name, value: user.id }
    })
})

const packages = computed(() => {
  return maintainersStore.packages
    .filter((packageBag) => {
      if (values.repositoryId) {
        const repoId = values.repositoryId as Number
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
        userId: packageMaintainerSchema.shape.user.shape.id,
        repositoryId:
          packageMaintainerSchema.shape.repository.shape.id,
        packageName:
          packageMaintainerSchema.shape.packageName
      })
    ),
    initialValues: {
      userId: undefined,
      repositoryId: undefined,
      packageName: undefined
    },
    initialTouched: {
      userId: false,
      repositoryId: false,
      packageName: true
    }
  })

async function createMaintainer() {
  if (meta.value.valid) {
    const maintainer = {
      user: { id: values.userId },
      packageName: values.packageName,
      repository: { id: values.repositoryId }
    }
    await maintainersStore.createMaintainer(maintainer)
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

function changeDialogOptions() {
  emit('closeModal')
}

onMounted(async () => {
  maintainersStore.fetchAllRepositories()
  maintainersStore.fetchPackages()
  userStore.fetchAllUsers()
})
</script>

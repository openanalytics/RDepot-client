<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <form as="v-form" ref="form" lazy-validation>
    <v-card class="pa-5" width="400">
      <v-card-title>
        {{ $t('maintainers.editform.title') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <validated-input-field
          name="userlogin"
          as="v-text-field"
          id="edit-package-maintainer-user"
          :value="localMaintainer.user?.login"
          :label="$t('maintainers.editform.user')"
          :disabled="blockedField == 'user'"
        />
        <validated-input-field
          name="repositoryId"
          as="v-select"
          id="edit-package-maintainer-repository"
          :modelValue="localMaintainer.repository"
          @update:modelValue="newValue => localMaintainer.repository!.id = newValue"
          :items="repositories"
          item-title="name"
          item-value="id"
          :label="$t('maintainers.editform.repository')"
          :disabled="blockedField == 'repository'"
        />
      </v-card-text>
      <v-divider></v-divider>
      <card-actions :buttons="buttons" />
    </v-card>
  </form>
</template>

<script setup lang="ts">
import CardActions from '@/components/common/CardActions.vue'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { ref, computed, onMounted } from 'vue'
import { Form, useForm } from 'vee-validate'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { repositoryMaintainerSchema } from '@/models/Schemas'
import { z } from 'zod'
import { useUtilities } from '@/composable/utilities'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  blockedField: {
    required: false,
    default: 'user',
    validator(value: string) {
      return ['user', 'repository'].includes(value)
    }
  }
})

const buttons = [
  {
    id: 'cancel-button',
    text: t('common.cancel'),
    handler: changeDialogOptions
  },
  {
    id: 'set-filtration',
    text: t('common.save'),
    handler: setMaintainer
  }
]

const maintainersStore = useRepositoryMaintainersStore()

const repositories = computed(() => {
  return maintainersStore.repositories
})
const { deepCopy } = useUtilities()
let maintainer: EntityModelRepositoryMaintainerDto =
  deepCopy(maintainersStore.chosenMaintainer)

const localMaintainer = ref(maintainer)

const emit = defineEmits(['closeModal'])

const { meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      userlogin:
        repositoryMaintainerSchema.shape.user.shape.login,
      repositoryId:
        repositoryMaintainerSchema.shape.repository.shape.id
    })
  ),
  initialValues: {
    userlogin: maintainer.user?.login,
    repositoryId: maintainer.repository?.id
  }
})

const toasts = useToast()

function setMaintainer() {
  if (meta.value.valid) {
    maintainersStore.updateMaintainer(localMaintainer.value)
    changeDialogOptions()
  } else {
    toasts.warning(t('notifications.invalidform'))
  }
}

onMounted(maintainersStore.fetchRepositories)

function changeDialogOptions() {
  emit('closeModal')
}
</script>

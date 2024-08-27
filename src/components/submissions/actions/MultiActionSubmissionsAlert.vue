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
  <span class="d-flex align-center">
    <v-tooltip
      v-if="
        submissionStore.submissionsToEdit?.warnings?.notAuthorizedToEditAndMutableState.find(
          (submission) => submission.id == item.id
        ) &&
        submissionStore.submissionsToEdit?.displayWarning
      "
    >
      <template #activator="{ props }">
        <v-icon
          v-bind="props"
          :icon="Icons.get('alert')"
          color="warning"
        ></v-icon>
      </template>
      <span>
        {{ i18n.t('submissions.multiAction.notEdited') }}
        ({{ i18n.t('common.errors.unauthorized') }})
      </span>
    </v-tooltip>

    <v-tooltip
      v-if="
        submissionStore.submissionsToEdit?.warnings?.notMutableState.find(
          (submission) => submission.id == item.id
        ) &&
        submissionStore.submissionsToEdit?.displayWarning
      "
    >
      <template #activator="{ props }">
        <v-icon
          v-bind="props"
          :icon="Icons.get('alert')"
          color="warning"
        ></v-icon>
      </template>
      <span>
        {{ i18n.t('submissions.multiAction.notEdited') }}
        ({{
          i18n.t('submissions.multiAction.notMutable', {
            actionType: editActionWarning,
            currentState: getTooltipMessage(item.state)
          })
        }})
      </span>
    </v-tooltip>
  </span>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/submission'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { EntityModelSubmissionDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useSubmissionActionTranslations } from '@/composable/submissions/submissionActionTranslations'
import Icons from '@/maps/Icons'

defineProps({
  item: {
    type: Object as () => EntityModelSubmissionDto,
    required: true
  }
})

const submissionStore = useSubmissionStore()

const { getTooltipMessage } = useSubmissionIcons()
const { editActionWarning } =
  useSubmissionActionTranslations()
</script>

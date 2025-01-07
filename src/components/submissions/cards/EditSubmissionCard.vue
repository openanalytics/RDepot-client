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
  <v-card class="pa-5" max-width="800px">
    <template v-if="items.length > 0">
      <v-card-title>
        {{
          i18n.t('common.editResourceQuestion', {
            edit_action: editText,
            resource_type_plural: i18n
              .t('common.submissions')
              .toLocaleLowerCase()
          })
        }}
      </v-card-title>
      <v-virtual-scroll :items="items">
        <template #default="{ item }">
          <v-list-item
            :title="`${item.packageBag?.name} v.${item.packageBag?.version}`"
            :subtitle="item.packageBag?.repository?.name"
          >
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </template>
    <v-empty-state
      v-else
      :headline="
        i18n.t(
          'submissions.multiAction.noSubmissionAvailable'
        )
      "
      :text="
        i18n.t(
          'submissions.multiAction.onSubmissionAvailableText',
          {
            actionType: editActionWarning
          }
        )
      "
      :title="
        i18n.t(
          'submissions.multiAction.onSubmissionAvailableTitle'
        )
      "
    ></v-empty-state>

    <v-alert
      v-if="showAlert"
      class="mt-5"
      variant="tonal"
      color="warning"
      border="start"
      type="warning"
      max-height="300px"
    >
      <template v-if="items.length > 0">
        <div class="px-4">
          {{
            i18n.t('submissions.multiAction.warning', {
              actionType: editActionWarning
            })
          }}
        </div>
        <v-divider
          :thickness="4"
          class="mb-4 mt-4"
        ></v-divider>
      </template>
      <v-virtual-scroll
        max-height="100px"
        :items="[
          ...submissionsStore.submissionsToEdit?.warnings
            ?.notMutableState,
          ...submissionsStore.submissionsToEdit?.warnings
            ?.notAuthorizedToEditAndMutableState
        ]"
      >
        <template #default="{ item }">
          <v-list-item
            :title="`${item.packageBag?.name} v.${item.packageBag?.version}`"
            :subtitle="
              submissionsStore.submissionsToEdit?.warnings?.notMutableState.find(
                (submission) => submission.id == item.id
              )
                ? `${
                    item.packageBag?.repository?.name
                  } (  ${i18n.t(
                    'submissions.multiAction.notMutable',
                    {
                      actionType: editActionWarning,
                      currentState: getTooltipMessage(
                        item.state
                      )
                    }
                  )} )`
                : `${
                    item.packageBag?.repository?.name
                  } (  ${i18n.t(
                    'common.errors.unauthorized'
                  )})`
            "
          />
        </template>
      </v-virtual-scroll>
    </v-alert>
    <CardActions
      :valid="items.length > 0"
      @submit="editSubmission"
    />
  </v-card>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { useSubmissionAuthorizationCheck } from '@/composable/submissions/submissionAuthorities'
import { useSubmissionActionTranslations } from '@/composable/submissions/submissionActionTranslations'
import { i18n } from '@/plugins/i18n'
import { computed } from 'vue'
import CardActions from '@/components/common/overlay/CardActions.vue'
import { useCommonStore } from '@/store/options/common'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'

const { canChangeState } = useSubmissionAuthorizationCheck()
const submissionsStore = useSubmissionStore()
const commonStore = useCommonStore()

const { editText, editActionWarning } =
  useSubmissionActionTranslations()

const { getTooltipMessage } = useSubmissionIcons()

const items = computed(
  () =>
    submissionsStore.submissionsToEdit?.submissions.filter(
      (submission) =>
        canChangeState(
          submission,
          submissionsStore.submissionsToEdit?.editOption
        ) ||
        (submissionsStore.submissionsToEdit?.editOption ===
          SubmissionEditOptions.Enum.download &&
          submission.state ===
            EntityModelSubmissionDtoStateEnum.ACCEPTED)
    ) || []
)

const showAlert = computed(
  () =>
    items.value.length !=
    submissionsStore.submissionsToEdit?.submissions.length
)

function editSubmission() {
  commonStore.closeOverlay()
  submissionsStore.edit()
}
</script>

<style>
.v-empty-state__headline {
  font-size: 2.5rem !important;
}
</style>

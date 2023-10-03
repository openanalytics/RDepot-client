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
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="submission-row"
  >
    <v-col
      id="submission-date"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.date')" />
      <TextRecord v-else text="DATE" />
    </v-col>
    <v-col
      id="submission-package"
      cols="lg-1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package')"
        sortField="packageBag"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.name"
      />
    </v-col>
    <v-col
      id="submission-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository')"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.repository?.name"
      />
    </v-col>
    <v-col
      id="submission-submitter"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.submitter')"
      />
      <TextRecord
        v-else
        :text="submission?.submitter?.name"
      />
    </v-col>

    <v-col
      id="submission-approver"
      cols="lg-4 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.approver')"
      />
      <TextRecord
        v-else
        :text="submission?.approver?.name"
      />
    </v-col>

    <v-col
      id="submission-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.technology')"
        center
      />
      <TextRecord v-else :text="submission?.technology" />
    </v-col>
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.accepted')"
        center
      />
      <v-checkbox
        id="checkbox-accepted"
        color="oablue"
        @click.stop
        disabled
        v-else-if="submission"
        v-model="getAccepted"
      />
    </v-col>
    <v-col
      id="submission-actions"
      cols="lg-2"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        center
        no-sort
      />
      <span
        v-else-if="
          getWaiting &&
          canPatch(submission?.links).fields.includes(
            'state'
          )
        "
        class="d-flex justify-center align-center"
      >
        <v-btn
          id="accept-button"
          color="success"
          class="mx-1"
          @click="acceptSubmission(submission)"
          >ACCEPT</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission(submission)"
          >CANCEL</v-btn
        >
        <v-btn
          v-else
          id="reject-button"
          color="oared"
          @click="rejectSubmission(submission)"
          >REJECT</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelSubmissionDto } from '@/openapi'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import { useAuthorizationStore } from '@/store/authorization'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

const authorizationStore = useAuthorizationStore()
const { canPatch } = useUserAuthorities()
const {
  acceptSubmission,
  cancelSubmission,
  rejectSubmission
} = useSubmissionActions()

const check = computed(() => {
  return (
    authorizationStore.userId ===
    props.submission?.submitter?.id
  )
})

const getAccepted = computed<boolean>(() => {
  return props.submission?.state == 'ACCEPTED'
})

const getWaiting = computed<boolean>(() => {
  return props.submission?.state == 'WAITING'
})
</script>

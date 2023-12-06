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
    id="token-row"
  >
    <v-col
      id="token-expiration-date"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.date')"
        sortKey="columns.tokens.date"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.date"
      />
    </v-col>
    <v-col
      id="token-name"
      cols="lg-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.name')"
        sortKey="columns.tokens.name"
        sortField="packageBag"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.name"
      />
    </v-col>
    <v-col
      id="token-value"
      cols="lg-4 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.value')"
        sortKey="columns.tokens.value"
      />
      <TextRecord
        v-else
        :text="submission?.packageBag?.value"
      />
    </v-col>
    <v-col
      id="token-actions"
      cols="lg-4"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
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
          >DEACTIVATE</v-btn
        >
        <v-btn
          v-if="check"
          id="cancel-button"
          color="oared"
          @click="cancelSubmission(submission)"
          >DELETE</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
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
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.ACCEPTED
  )
})

const getWaiting = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.WAITING
  )
})

const getRejected = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.REJECTED
  )
})

const getCancelled = computed<boolean>(() => {
  return (
    props.submission?.state ==
    EntityModelSubmissionDtoStateEnum.CANCELLED
  )
})

const getRejectedOrCancelled = computed<boolean>(() => {
  return getRejected.value || getCancelled.value
})

const getAcceptedTooltipMessage = computed<string>(() => {
  if (getAccepted.value) return 'accepted'
  if (getWaiting.value) return 'waiting for an action'
  if (getRejected.value) return 'rejected'
  else return 'cancelled'
})
</script>

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
      >{{
        title == true
          ? prepareString($t('submissions.date').toString())
          : submission
          ? 'DATE'
          : ''
      }}</v-col
    >
    <v-col
      id="submission-package"
      cols="lg-1"
      class="d-flex align-center"
      >{{
        title == true
          ? prepareString(
              $t('submissions.package').toString()
            )
          : submission
          ? submission.packageBag?.name
          : ''
      }}</v-col
    >
    <v-col
      id="submission-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.repository').toString()
            )
          : submission
          ? submission.packageBag?.repositoryId
          : ''
      }}</v-col
    >
    <v-col
      id="submission-submitter"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.submitter').toString()
            )
          : submission
          ? submission.submitter?.name
          : ''
      }}</v-col
    >

    <v-col
      id="submission-approver"
      cols="lg-5 sm-2"
      class="d-flex align-center"
    >
      {{
        title == true
          ? prepareString(
              $t('submissions.approver').toString()
            )
          : submission
          ? submission.approver?.name
          : ''
      }}</v-col
    >
    <v-col
      id="submission-accepted"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <span v-if="title == true">
        {{
          prepareString(
            $t('submissions.accepted').toString()
          )
        }}</span
      >

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
      <span v-if="title == true">
        {{
          prepareString(
            $t('submissions.actions').toString()
          )
        }}
      </span>
      <span
        v-else-if="!getAccepted && submission"
        class="d-flex justify-center align-center"
      >
        <v-btn
          id="accept-button"
          color="success"
          class="mx-1"
          @click="acceptSubmission"
          :disabled="acceptDisabled"
          >ACCEPT</v-btn
        >
        <v-btn
          id="cancel-button"
          color="oared"
          @click="cancelSubmission"
          :disabled="cancelDisabled"
          >CANCEL</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EntityModelSubmissionDto, EntityModelSubmissionDtoStateEnum, ResponseDtoEntityModelSubmissionDto, ResponseDtoPagedModelEntityModelSubmissionDto, RSubmissionControllerApiFactory } from '@/openapi'
import { notify, useNotification } from '@kyvg/vue3-notification'
import { useCommonStore } from '@/store/common'
import { i18n } from '@/plugins/i18n'
import { getConfiguration } from '@/services/api_config'
import { openApiRequest } from '@/services/open_api_access'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  submission: Object as () =>
    | EntityModelSubmissionDto
    | undefined
})

const notifications = useNotification()
const common_store = useCommonStore()

const getAccepted = computed<boolean>(() => {
  return props.submission?.state == 'ACCEPTED'
})

const acceptDisabled = ref<boolean>(false)
const cancelDisabled = ref<boolean>(false)

function prepareString(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function acceptSubmission() {
  common_store.setProgressCircularActive(true)
  acceptDisabled.value = true

  const r_submission_api = RSubmissionControllerApiFactory(getConfiguration())
  openApiRequest<EntityModelSubmissionDto>(
      () => r_submission_api.updateSubmission({
        "state": EntityModelSubmissionDtoStateEnum.ACCEPTED
      }, props.submission?.id || 0) // This request currently causes an 400 Bad Request
  ).then(
    () => {
      notifications.notify({
        type: 'success',
        text: i18n.t('notifications.acceptSubmission')
      })
    },
    (msg) => {
      acceptDisabled.value = false
      notify({ text: msg, type: 'error' })
    }
  ).finally(
    () => common_store.setProgressCircularActive(false)
  )
}

function cancelSubmission() {
  common_store.setProgressCircularActive(true)
  cancelDisabled.value = true
  setTimeout(function () {
    notifications.notify({
      type: 'success',
      text: i18n.t('notifications.successCancelSubmission')
    })
    common_store.setProgressCircularActive(false)
    cancelDisabled.value = false
  }, 1000)
}
</script>

<style lang="scss">
.v-col {
  padding: 10px !important;
  font-size: 13px !important;
}
.col {
  line-height: 1.3;
}

.title {
  font-weight: 600 !important;
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}

#repository-row {
  .v-input__details {
    display: none !important;
  }
}

#submission-row {
  .v-input__details {
    display: none !important;
  }
}
</style>

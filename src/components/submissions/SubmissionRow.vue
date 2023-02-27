<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="submissionrow"
  >
    <v-col
      id="submissiondate"
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
      id="submissionpackage"
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
      id="submissionrepository"
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
      id="submissionsubmitter"
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
      id="submissionapprover"
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
      id="submissionaccepted"
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
        id="checkboxactive"
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
        v-else-if="!getAccepted"
        class="d-flex justify-center align-center"
      >
        <v-btn
          color="success"
          class="mx-1"
          @click="acceptSubmission"
          :disabled="acceptDisabled"
          >ACCEPT</v-btn
        >
        <v-btn
          color="oared"
          @click="cancelSubmission"
          :disabled="cancelDisabled"
          >CANCEL</v-btn
        >
        <!-- <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigateicon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="actiondetails">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigateicon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oared"
              class="ml-3"
              >mdi-trash-can</v-icon
            >
          </template>
          <span id="actiondelete">{{
            $t('common.delete')
          }}</span>
        </v-tooltip> -->
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EntityModelSubmissionDto } from '@/openapi'
import { useNotification } from '@kyvg/vue3-notification'
import { useCommonStore } from '@/store/common'
import { i18n } from '@/plugins/i18n'

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
  setTimeout(function () {
    acceptDisabled.value = false
    common_store.setProgressCircularActive(false)
    notifications.notify({
      type: 'success',
      text: i18n.t('notifications.acceptSubmission')
    })
  }, 1000)
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
  padding-top: 16px;
  padding-bottom: 16px;
}

.v-input__control {
  justify-content: center !important;
}

#submissionrow {
  .v-input__details {
    display: none !important;
  }
}
</style>

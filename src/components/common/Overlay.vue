<template>
  <v-overlay
    :absolute="absolute"
    v-model="common_store.overlayModel"
    :opacity="getOpacity"
    contained
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex justify-center align-center"
    @click:outside="overlayValue(false)"
  >
    <PackageFiltration
      v-if="packageFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <EventsFiltration
      v-else-if="eventsFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <RepositoriesFiltration
      v-else-if="repositoryFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <SubmissionsFiltration
      v-else-if="submissionFiltration"
      v-on:changeOptions="overlayValue(false)"
    />
    <QuestionCard
      v-else-if="questionCard"
      :text="common_store.overlayText"
      v-on:sendEvent="overlayValue"
    />
  </v-overlay>
</template>

<script setup lang="ts">
import PackageFiltration from '@/components/packages/Filtration.vue'
import EventsFiltration from '@/components/events/Filtration.vue'
import SubmissionsFiltration from '@/components/submissions/Filtration.vue'
import RepositoriesFiltration from '@/components/repositories/Filtration.vue'
import QuestionCard from '@/components/common/QuestionCard.vue'
import { computed, onMounted } from 'vue'
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { usePackagesStore } from '@/store/packages'
import { useEventsStore } from '@/store/events'
import { useRepositoryStore } from '@/store/repositories'
import { useSubmissionStore } from '@/store/submission'

const common_store = useCommonStore()
const package_store = usePackagesStore()
const event_store = useEventsStore()
const repository_store = useRepositoryStore()
const submission_store = useSubmissionStore()
const absolute = false

const packageFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.PackagesFiltration
  )
})

const eventsFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.EventsFiltration
  )
})

const repositoryFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.RepositoryFiltration
  )
})

const submissionFiltration = computed(() => {
  return (
    common_store.overlayComponent ==
    OverlayEnum.SubmissionsFiltration
  )
})

const getOpacity = computed<number>(() => {
  return common_store.overlayOpacity
})

const questionCard = computed(function () {
  let packagesReset: boolean =
    common_store.overlayComponent ==
    OverlayEnum.PackagesFiltrationReset
  let eventsReset: boolean =
    common_store.overlayComponent ==
    OverlayEnum.EventsFiltrationReset
  let repositoryReset: boolean =
    common_store.overlayComponent ==
    OverlayEnum.RepositoryFiltrationReset
  let submissionsReset: boolean =
    common_store.overlayComponent ==
    OverlayEnum.SubmissionsFiltrationReset
  let deletePackage: boolean =
    common_store.overlayComponent ==
    OverlayEnum.DeletePackage
  return (
    packagesReset ||
    eventsReset ||
    repositoryReset ||
    submissionsReset ||
    deletePackage
  )
})

onMounted(() => {
  document.addEventListener('keyup', (e) => {
    if (e.code == 'Escape') {
      onKeyup()
    }
  })
})

function onKeyup() {
  overlayValue()
}

async function clearFiltration() {
  switch (common_store.overlayComponent) {
    case OverlayEnum.PackagesFiltrationReset: {
      await package_store.clearFiltrationAndFetch()
    }
    case OverlayEnum.EventsFiltrationReset: {
      await event_store.clearFiltrationAndFetch()
    }
    case OverlayEnum.RepositoryFiltrationReset: {
      await repository_store.clearFiltrationAndFetch()
    }
    case OverlayEnum.SubmissionsFiltrationReset: {
      await submission_store.clearFiltrationAndFetch()
    }
  }
}

async function overlayValue(value: boolean = false) {
  common_store.setOverlayModel(false)
  common_store.setProgressCircularActive(true)
  if (value) {
    await clearFiltration()
  }
  common_store.setProgressCircularActive(false)
}
</script>

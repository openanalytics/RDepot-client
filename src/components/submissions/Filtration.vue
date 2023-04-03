<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('submissions.filtration.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-select
          id="filtration-state"
          v-model="localFiltration.state"
          :items="stateSelect"
          :label="$t('submissions.filtration.state')"
        ></v-select>

        <v-select
          id="filtration-repository"
          v-model="localFiltration.packageId"
          :items="packageSelect"
          item-title="name"
          :label="$t('submissions.filtration.package')"
          item-value="id"
        ></v-select>

        <v-switch
          v-model="localFiltration.assignedToMe"
          color="oablue"
          :label="$t('submissions.filtration.assigned')"
        >
        </v-switch>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-row justify="space-between" class="mt-1">
        <v-btn
          id="cancel-button"
          color="blue darken-1"
          @click="changeDialogOptions"
          class="mx-1"
        >
          <small>
            {{ $t('common.cancel') }}
          </small>
        </v-btn>
        <v-row class="my-0" justify="end">
          <v-btn
            id="reset-button"
            color="blue darken-1"
            class="mx-1"
            @click="clearFiltration"
          >
            <small>
              {{ $t('common.clearForm') }}
            </small>
          </v-btn>
          <v-btn
            id="set-filtration"
            color="blue darken-1"
            class="mx-1"
            @click="setFiltration"
          >
            <small>
              {{ $t('common.apply') }}
            </small>
          </v-btn>
        </v-row>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { useCommonStore } from '@/store/common'
import { usePackagesStore } from '@/store/packages'
import { useSubmissionStore } from '@/store/submission'
import { ref, onMounted } from 'vue'

const submissions_store = useSubmissionStore()
const package_store = usePackagesStore()
const common_store = useCommonStore()

const stateSelect = ref(
  Object.values(EntityModelSubmissionDtoStateEnum)
)
const packageSelect = ref(package_store.packages)
let filtration = submissions_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['closeModal'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(submissions_store.filtration)
  )
}

async function setFiltration() {
  emit('closeModal')
  common_store.setProgressCircularActive(true)
  common_store.setOverlayOpacity(0.5)
  await submissions_store.setFiltration(
    localFiltration.value
  )
  common_store.setProgressCircularActive(false)
}

function changeDialogOptions() {
  updateFiltration()
  emit('closeModal')
}

onMounted(async () => {
  updateFiltration()
  await package_store.fetchPackages()
})

function clearFiltration() {
  localFiltration!.value.state = undefined
  localFiltration!.value.packageId = undefined
  localFiltration!.value.assignedToMe = false
}
</script>

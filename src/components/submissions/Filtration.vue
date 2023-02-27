<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('submissions.filtration.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 300px">
      <v-form ref="form" lazy-validation>
        <v-select
          id="filtrationstate"
          v-model="localFiltration.state"
          :items="stateSelect"
          :label="$t('submissions.filtration.state')"
        ></v-select>

        <v-select
          id="filtrationrepository"
          v-model="localFiltration.package"
          :items="packageSelect"
          :label="$t('submissions.filtration.package')"
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
          id="cancelbutton"
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
            id="resetbutton"
            color="blue darken-1"
            class="mx-1"
            @click="clearFiltration"
          >
            <small>
              {{ $t('common.clearForm') }}
            </small>
          </v-btn>
          <v-btn
            id="setfiltration"
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
import { useCommonStore } from '@/store/common'
import { useSubmissionStore } from '@/store/submission'
import { ref, onMounted } from 'vue'

const submissions_store = useSubmissionStore()
const common_store = useCommonStore()

const stateSelect = ref([
  'ACCEPTED',
  'CANCELLED',
  'REJECTED'
])
const packageSelect = ref(['package1', 'package2'])
let filtration = submissions_store.filtration
const localFiltration = ref(filtration)

const emit = defineEmits(['changeOptions'])

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(submissions_store.filtration)
  )
}

async function setFiltration() {
  changeDialogOptions()
  common_store.setProgressCircularActive(true)
  common_store.setOverlayOpacity(0.5)
  await submissions_store.setFiltration(
    localFiltration.value
  )
  common_store.setProgressCircularActive(false)
}

function changeDialogOptions() {
  updateFiltration()
  emit('changeOptions')
}

onMounted(() => {
  updateFiltration()
})

function clearFiltration() {
  localFiltration!.value.state = ''
  localFiltration!.value.package = ''
  localFiltration!.value.assignedToMe = false
}
</script>

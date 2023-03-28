<template>
  <v-card class="pa-5" width="400">
    <v-card-title>
      {{ $t('events.filtration.title') }}
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px">
      <v-form ref="form" lazy-validation>
        <v-select
          id="filtration-event-type"
          v-model="localFiltration.eventType"
          :items="eventTypeSelect"
          :label="$t('events.filtration.eventType')"
          data-test="filtration-event-type"
        ></v-select>

        <v-select
          id="filtration-resource-type"
          v-model="localFiltration.resourceType"
          :items="resourceTypeSelect"
          :label="$t('events.filtration.resourceType')"
          data-test="filtration-resource-type"
        ></v-select>

        <v-select
          id="filtration-technology"
          v-model="localFiltration.technology"
          :items="technologySelect"
          :label="$t('events.filtration.technology')"
          data-test="filtration-technology"
        ></v-select>

        <v-text-field
          id="filtration-resource-id"
          type="number"
          v-model="localFiltration.resourceId"
          :label="$t('events.filtration.resourceId')"
          min="0"
        ></v-text-field>

        <v-text-field
          id="filtration-user-id"
          type="number"
          v-model="localFiltration.userId"
          :label="$t('events.filtration.userId')"
          min="0"
        ></v-text-field>
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
import { useEventsStore } from '@/store/events'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeModal'])
const event_store = useEventsStore()

const eventTypeSelect = ref(['create', 'update', 'delete'])
const technologySelect = ref(['R', 'Python'])
const resourceTypeSelect = ref([
  'package',
  'repository',
  'user',
  'submission',
  'packageMaintainer',
  'repositoryMaintainer'
])

let filtration = event_store.filtration
const localFiltration = ref(filtration)

function updateFiltration() {
  localFiltration.value = JSON.parse(
    JSON.stringify(event_store.filtration)
  )
}

async function setFiltration() {
  await event_store.setFiltration(localFiltration.value)
  changeDialogOptions()
}

function changeDialogOptions() {
  updateFiltration()
  emit('closeModal')
}

onMounted(() => {
  updateFiltration()
})

function clearFiltration() {
  localFiltration!.value.eventType = undefined
  localFiltration!.value.resourceId = undefined
  localFiltration!.value.resourceType = undefined
  localFiltration!.value.technology = undefined
  localFiltration!.value.userId = undefined
}
</script>

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
    <card-actions :buttons="buttons" />
  </v-card>
</template>

<script setup lang="ts">
import { i18n } from '@/plugins/i18n'
import CardActions from '../common/CardActions.vue'
import { useEventsStore } from '@/store/events'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeModal'])
const event_store = useEventsStore()

const buttons = [
  {
    text: i18n.t('common.cancel'),
    handler: () => emit('closeModal')
  },
  {
    spacer: true,
    text: i18n.t('common.clearForm'),
    handler: clearFiltration
  },
  {
    text: i18n.t('common.apply'),
    handler: setFiltration
  }
]

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

function setFiltration() {
  event_store.setFiltration(localFiltration.value)
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

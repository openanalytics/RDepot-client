<template>
  <filtration-card
    :title="$t('events.filtration.title')"
    long
    v-on:clear-filtration="resetForm()"
    v-on:set-filtration="setFiltration()"
    v-on:change-dialog-options="cancelModal()"
  >
    <validated-input-field
      id="filtration-event-type"
      :items="eventTypes"
      name="eventType"
      as="v-select"
      :label="$t('events.filtration.eventType')"
    ></validated-input-field>

    <validated-input-field
      id="filtration-resource-type"
      :items="resourceTypes"
      name="resourceType"
      as="v-select"
      :label="$t('events.filtration.resourceType')"
    ></validated-input-field>

    <validated-input-field
      id="filtration-technology"
      :items="technologies"
      name="technologies"
      multiple
      as="v-select"
      :label="$t('repositories.filtration.technology')"
    ></validated-input-field>

    <validated-input-field
      id="filtration-resource-id"
      type="number"
      name="resourceId"
      min="0"
      :label="$t('events.filtration.resourceId')"
      as="v-text-field"
    ></validated-input-field>

    <validated-input-field
      id="filtration-user-id"
      type="number"
      name="userId"
      min="0"
      :label="$t('events.filtration.userId')"
      as="v-text-field"
    ></validated-input-field>
  </filtration-card>
</template>

<script setup lang="ts">
import FiltrationCard from '@/components/common/FiltrationCard.vue'
import CardActions from '@/components/common/CardActions.vue'
import ValidatedInputField from '@/components/common/ValidatedInputField.vue'
import { i18n } from '@/plugins/i18n'
import { useEventsStore } from '@/store/events'
import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { EventsFiltration } from '@/models/Filtration'

const emit = defineEmits(['closeModal'])
const event_store = useEventsStore()

const { technologies, resourceTypes, eventTypes } =
  useEnumFiltration()

const { resetForm, values } = useForm({
  validationSchema: toTypedSchema(EventsFiltration),
  initialValues: event_store.filtration
})

function setFiltration() {
  event_store.setFiltration(values as EventsFiltration)
  cancelModal()
}

function cancelModal() {
  emit('closeModal')
}
</script>
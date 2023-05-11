<template>
  <EventsModal />
  <v-row class="my-3">
    <FiltrationChips :values="events_store.filtration" />
    <FiltrationButtons />
  </v-row>
  <EventsTimeLine />
</template>

<script setup lang="ts">
import FiltrationButtons from '@/components/common/FiltrationButtons.vue'
import EventsModal from '@/components/events/EventsModal.vue'
import EventsTimeLine from '@/components/events/EventsTimeLine.vue'
import FiltrationChips from '@/components/packages/FiltrationChips.vue'
import { useEventsStore } from '@/store/events'

const events_store = useEventsStore()
</script>
